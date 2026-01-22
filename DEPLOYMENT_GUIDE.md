
## Step 1: Push to a **new** GitHub repo (not the referral one)

1. On GitHub: **Create a new repository** (e.g. `asoldi-employment-form`). Don’t initialize with README.
2. Open a terminal in the **employment-form** folder:
   ```bash
   cd "c:\Asoldi\Asoldi code\employment-form"
   ```
3. If this folder isn’t a git repo yet:
   ```bash
   git init
   git add .
   git commit -m "Initial employment form"
   ```
4. Add the new repo as `origin` and push (replace `YOUR_USERNAME` / `asoldi-employment-form` with yours):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/asoldi-employment-form.git
   git branch -M main
   git push -u origin main
   ```

**Do not use `asoldi-referal-section`.** That repo is for the referral form. Pushing employment-form code there would overwrite it and break `asoldi-referal-section.vercel.app`.

**Alternative:** Use GitHub Desktop — create a new repo, add **only** the `employment-form` folder, push.

**OR** deploy from the folder with Vercel CLI (Step 2, Option B) — no GitHub needed.

---

## Step 2: Deploy to Vercel (new project)

### Option A: Deploy from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"** (or **"New Project"**)
3. **Import** the **employment-form** GitHub repo (`asoldi-employment-form` or whatever you named it). **Do not** import `asoldi-referal-section`.
4. **Important:** This must be a **new** Vercel project. Use a different name from the referral one, e.g.:
   - Project name: `asoldi-employment-form` (or `asoldi-soknad`)
5. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **"Deploy"**

### Option B: Deploy from Local Folder (Vercel CLI)

1. Install Vercel CLI: `npm i -g vercel`
2. Open terminal in `c:\Asoldi\Asoldi code\employment-form\`
3. Run: `vercel`
4. Follow prompts (create new project, name it `asoldi-employment-form`)

---

## Step 3: EmailJS credentials

**Option A – Paste in code (same as referral form)**  
Edit `src/components/Page2.tsx` and replace the fallback strings with your real values:

- `'service_83hq0el'` → your EmailJS **Service ID**
- `'template_l0zlwva'` → your **employment** EmailJS **Template ID**
- `'8FEJnnbeR9l93wSu4'` → your EmailJS **Public Key**

No Vercel env vars needed. Deploy and you’re done.

**Option B – Use Vercel Environment Variables**  
If you prefer not to keep credentials in the repo:

1. In Vercel → your **employment-form project** → **Settings** → **Environment Variables**
2. Add: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
3. **Redeploy** after adding them.

The app uses env vars when set; otherwise it uses the values in `Page2.tsx`.

---

## Step 4: Get Your EmailJS Credentials

### Service ID & Public Key
- These can be the **same** as your referral form (same EmailJS account)
- Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
- **Service ID:** Email Services → Your service → Copy Service ID
- **Public Key:** Account → API Keys → Copy Public Key

### Template ID (NEW - for employment form)
1. Go to **Email Templates** → **Create New Template**
2. Name it: "Employment Form" or "Søknad"
3. **To Email:** `daracha777@gmail.com`
4. **Subject:** `{{subject}}`
5. **Content:** 
   ```
   {{message}}
   ```
   (Or use a custom template with `{{from_name}}`, `{{from_email}}`, `{{from_phone}}`, `{{cv_file_name}}`)
6. **Save** and copy the **Template ID** (e.g. `template_abc123`)

---

## Step 5: Test

1. Visit your deployment URL: `https://asoldi-employment-form.vercel.app` (or your custom domain)
2. Fill out the form and submit
3. Check `daracha777@gmail.com` for the email

---

## Troubleshooting

### "EmailJS template for søknad er ikke satt"
- You forgot to add `VITE_EMAILJS_TEMPLATE_ID` in Vercel Environment Variables
- Or you didn't redeploy after adding it

### Form doesn't send emails
- Check that all 3 environment variables are set in Vercel
- Check that you redeployed after adding variables
- Check EmailJS template uses correct variable names (`{{from_name}}`, not `{{name}}`)

### Can't find the code
- The code is in: `c:\Asoldi\Asoldi code\employment-form\`
- It's **not** in the referral form folder (`Referal code`)
- It's a **separate project** that needs its own Vercel deployment

---

## Summary

1. ✅ Code location: `c:\Asoldi\Asoldi code\employment-form\`
2. ✅ Deploy to Vercel as a **NEW project** (not the referral one)
3. ✅ EmailJS: paste credentials in `Page2.tsx` (like referral form) **or** use Vercel env vars
4. ✅ Use the deployment URL in your iframe HTML
