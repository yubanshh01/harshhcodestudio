# harshhcodestudio

This repository was hardened to remove public admin secrets and client-side authentication logic that was exposed in the browser.

Important security notes:
- Never store real admin credentials, OTP values, or session tokens in frontend JavaScript.
- Do not expose anonymous Supabase keys or Formspree credentials inside a public GitHub repository.
- For a production admin portal, use a real backend or managed auth service (for example: Supabase Auth, Firebase Auth, Auth.js, or a server-side auth API).
- The admin portal is now disabled by default until secure backend authentication is configured.

The public frontend can still work for marketing pages, but admin actions must be protected by a server-side login flow.
