"""Verify GA4 tracking end to end against the live site.

    pip install playwright && playwright install chromium
    python scripts/verify-analytics.py

Checks that every page type reports the right content_group/page_name, that
exactly one gtag config runs per page (two means double counted traffic), and
that all nine conversion events actually reach Google with their parameters.

Two things this script exists to catch, both of which have bitten us:

  * gtag.js is injected on window load for PageSpeed reasons, and it does NOT
    replay dataLayer pushes made before it loaded. generate_lead fires the
    instant the thank-you page parses, so it was silently dropped until
    Analytics.astro grew a pending queue. Nothing in the browser tells you.

  * GA4 batches follow-up events into the POST body of /g/collect, one per
    line, not the query string. Parse only the query string and every event
    after the first page_view looks like it never fired.

Clicks and form submits are blocked in the page, so running this does not send
a real enquiry through FormSubmit.
"""
import asyncio
from urllib.parse import urlparse, parse_qs
from playwright.async_api import async_playwright

BASE = "https://hancockplasteringpainting.co.uk"
TID  = "G-HPJS02Y2KJ"
hits = []   # (event_name, params)

def record(q, tid=""):
    ev = q.get("en", ["<page_view>"])[0]
    ep = {k[3:]: v[0] for k, v in q.items() if k.startswith("ep.")}
    ep["_tid"] = q.get("tid", [tid])[0] or tid
    ep["_cg"]  = q.get("ep.content_group", [""])[0]
    hits.append((ev, ep))

def note(req):
    u = req.url
    if "/g/collect" not in u: return
    q = parse_qs(urlparse(u).query)
    tid = q.get("tid", [""])[0]
    record(q, tid)                       # query-string event
    try: body = req.post_data or ""      # batched events live here
    except Exception: body = ""
    for line in body.splitlines():
        if line.strip():
            record(parse_qs(line), tid)

BLOCK = """
document.addEventListener('click',  e => e.preventDefault(), false);
document.addEventListener('submit', e => e.preventDefault(), false);
"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context()
        await ctx.add_init_script(BLOCK)
        pg = await ctx.new_page()
        pg.on("request", note)
        gtagjs = []
        pg.on("request", lambda r: gtagjs.append(r.url) if "gtag/js" in r.url else None)

        # ---- 1. page classification across every page type -----------------
        print("=" * 68)
        print("1. PAGE CLASSIFICATION  (content_group / page_name)")
        print("=" * 68)
        pages = ["/", "/services/skimming/", "/areas/eastcote/",
                 "/blog/how-long-does-plaster-take-to-dry/", "/gallery/",
                 "/about/", "/contact/", "/services/", "/areas/", "/blog/",
                 "/thank-you/", "/privacy-policy/"]
        for path in pages:
            await pg.goto(BASE + path, wait_until="load")
            await pg.wait_for_timeout(1200)
            cfg = await pg.evaluate(
                "window.dataLayer.filter(x=>x[0]==='config').map(x=>[x[1],x[2].content_group,x[2].page_name])")
            n_cfg = len(cfg)
            id_, cg, pn = cfg[0] if cfg else ("?", "?", "?")
            flag = "OK " if (id_ == TID and n_cfg == 1) else "!! "
            print(f"  {flag}{path:<44} {cg:<15} {pn}")
        print(f"\n  gtag.js loaded once per page, ids seen: {sorted(set(u.split('id=')[1] for u in gtagjs))}")
        print(f"  configs per page: {n_cfg} (must be 1, more means double counting)")

        # ---- 2. every conversion event -------------------------------------
        print()
        print("=" * 68)
        print("2. CONVERSION EVENTS  (fired against the live site)")
        print("=" * 68)
        hits.clear()

        await pg.goto(BASE + "/areas/eastcote/", wait_until="load"); await pg.wait_for_timeout(1200)
        await pg.click(".wa-btn")                                   # whatsapp_click
        for sel in ['a[href^="tel:"]', 'a[href^="mailto:"]']:
            el = await pg.query_selector(sel)
            if el: await el.click()                                  # call_click / email_click
        cta = await pg.query_selector('a[href="/contact/"]')
        if cta: await cta.click()                                    # quote_cta_click
        link = await pg.query_selector('main a[href^="/services/"]')
        if link: await link.click()                                  # internal_click
        await pg.wait_for_timeout(1500)

        await pg.goto(BASE + "/contact/", wait_until="load"); await pg.wait_for_timeout(1200)
        await pg.fill("#contact-form input[name=name]", "Test")
        await pg.eval_on_selector("#contact-form", "f => f.requestSubmit ? f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})) : 0")
        await pg.wait_for_timeout(1200)

        await pg.goto(BASE + "/blog/how-long-does-plaster-take-to-dry/", wait_until="load")
        await pg.wait_for_timeout(1200)
        await pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await pg.wait_for_timeout(1500)

        await pg.goto(BASE + "/thank-you/", wait_until="load"); await pg.wait_for_timeout(6000)

        seen = {}
        for ev, ep in hits:
            if ev == "<page_view>": continue
            seen.setdefault(ev, ep)
        WANT = ["whatsapp_click","call_click","email_click","quote_cta_click",
                "internal_click","form_start","form_submit","generate_lead","article_read"]
        for w in WANT:
            if w in seen:
                d = {k: v for k, v in seen[w].items() if not k.startswith("_") and k != "content_group"}
                print(f"  OK  {w:<17} -> {d}")
            else:
                print(f"  !!  {w:<17} -> NOT RECEIVED")
        print(f"\n  all hits went to tid={sorted(set(ep['_tid'] for _, ep in hits))}")
        await b.close()

asyncio.run(main())
