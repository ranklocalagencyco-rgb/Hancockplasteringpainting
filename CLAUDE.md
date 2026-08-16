## Development

Always run commands from the project root: `C:\Users\user\Hancock-plastering-painting`
(the `Desktop\...\uploads` folder only holds source photos — it has no `package.json`,
so `npm run dev` fails there with "Missing script: dev").

When starting the dev server, use background mode:

```
npx astro dev --background
```

Manage the background server with `npx astro dev stop`, `npx astro dev status`, and
`npx astro dev logs`. Astro auto-detects AI-agent environments and forces background
mode anyway, so a plain `astro dev` behaves the same when run by an agent.

Notes:

- Requires Astro >= 7.2 on Windows. Astro 7.0.x spawned the Unix `.bin/astro` shim
  without a shell, so background mode failed with "Failed to spawn background dev
  server process". Escape hatch if that ever recurs: `ASTRO_DEV_BACKGROUND=1 npx astro dev`
  runs in the foreground (the env var also disables agent detection).
- Killing the wrapper shell does not kill the detached server. Always stop it with
  `npx astro dev stop`, or the next start reports "already running" against the old
  (possibly stale-code) process on port 4321.
- Network-touching npm/npx commands need `NODE_OPTIONS=--use-system-ca` on this machine
  (corporate CA), e.g. `NODE_OPTIONS=--use-system-ca npm install`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
