// WebMCP origin trial token (Chrome 149-156, expires 17 Nov 2026).
//
// This token was issued as a THIRD-PARTY token. Chrome ignores third-party
// tokens supplied via <meta>, an inline script, or an HTTP header — they must
// be injected by an EXTERNAL script file served from the token's origin.
// That's why this lives in its own file rather than inline in the layout.
(function () {
  var token =
    'Awheq01S+a3S3KIw7QUsBJeZmwfS/xmGq78kfS9tRmLrH8ou29aRbUidyWXlLAPcg7E8CqYLfd9f13GYQl5CIQcAAACGeyJvcmlnaW4iOiJodHRwczovL2hhbmNvY2twbGFzdGVyaW5ncGFpbnRpbmcuY28udWs6NDQzIiwiZmVhdHVyZSI6IldlYk1DUCIsImV4cGlyeSI6MTc5NDg3MzYwMCwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=';
  var meta = document.createElement('meta');
  meta.httpEquiv = 'origin-trial';
  meta.content = token;
  (document.head || document.documentElement).appendChild(meta);
})();
