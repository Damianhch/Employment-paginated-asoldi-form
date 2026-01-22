# Asoldi Employment Form — Embed & Deploy

This is a **separate app** from the Asoldi referral form. It has its own:

- **Vercel project** (deploy independently)
- **iframe embed URL and HTML** (do not reuse the referral iframe `src`)

---

## Do I need another Vercel deployment?

**Yes.** You need a **separate Vercel deployment** for the employment form. A different iframe HTML alone is not enough.

- The iframe `src` must point to a URL where **this** app (employment-form) is built and served.
- The referral Vercel project only serves the referral app; the employment-form code does not exist there.
- So: **2 apps → 2 Vercel projects → 2 iframe `src` URLs.**

---

## Email (søknad innhold i e-post)

Søknaden sends the applicant’s answers (navn, e-post, telefon, CV-filnavn) to your email via **EmailJS**, like the referral form.  
Setup: see **EMAIL_SETUP.md** (new EmailJS template, env vars in the employment-form Vercel project).

---

## 1. Deploy to Vercel (own project)

1. Push this `employment-form` repo (or connect the `employment-form` folder) to GitHub.
2. In [Vercel](https://vercel.com): **Add New Project** → Import this repo/folder.
3. **Do not** use the same project as the referral form. Create a **new** Vercel project (e.g. `asoldi-employment-form`).
4. Vercel will use `vercel.json`:
   - Build: `npm run build` → output in `dist`
   - SPA rewrites to `index.html`
   - `frame-ancestors *` so it can be embedded in iframes
5. Deploy. Your URL will look like:  
   `https://asoldi-employment-form.vercel.app` (or your custom domain).

---

## 2. Iframe HTML (for this app only)

Replace `https://YOUR-EMPLOYMENT-FORM-URL.vercel.app` with your real deployment URL.

**Desktop (≤1024px width):** max-height 440px so it fits with other fixed-height blocks:

```html
<iframe
  src="https://YOUR-EMPLOYMENT-FORM-URL.vercel.app"
  title="Asoldi - Søknad"
  width="100%"
  height="440"
  style="max-height: 440px; border: none;"
  loading="lazy"
></iframe>
```

**From 1024px down (tablet/mobile):** flexible height, e.g.:

```html
<iframe
  src="https://YOUR-EMPLOYMENT-FORM-URL.vercel.app"
  title="Asoldi - Søknad"
  width="100%"
  style="min-height: 400px; max-height: 90vh; border: none;"
  loading="lazy"
></iframe>
```

**Single snippet that works for both** (CSS on the parent can override `height` in a media query if needed):

```html
<iframe
  src="https://YOUR-EMPLOYMENT-FORM-URL.vercel.app"
  title="Asoldi - Søknad"
  width="100%"
  height="440"
  style="max-height: 440px; border: none; min-height: 400px;"
  loading="lazy"
></iframe>
```

---

## 3. Do not mix with the referral form

| | Referral form | Employment form |
|---|---|---|
| **Repo/folder** | `Referal code` | `employment-form` |
| **Vercel project** | e.g. `asoldi-referal-section` | e.g. `asoldi-employment-form` |
| **iframe `src`** | `asoldi-referal-section.vercel.app` (or your URL) | `YOUR-EMPLOYMENT-FORM-URL.vercel.app` |

Use the employment iframe HTML only where the **job application / søknad** block is; use the referral iframe only for the **referral** block.
