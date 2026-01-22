# Employment Form — Email (EmailJS)

Søknaden sends the applicant’s answers to your email via **EmailJS**, in the same way as the referral form.

---

## 1. You need a **separate EmailJS template** for the employment form

Use your existing EmailJS account (same as the referral form). Create a **new template** for “Søknad”:

1. [EmailJS](https://www.emailjs.com/) → **Email Templates** → **Create New Template**.

2. **To Email:** `daracha777@gmail.com` (or the address you want).

3. **Subject:** e.g. `{{subject}}` or `Ny søknad - telefon selger`.

4. **Content** — use these variables (they are sent from the form):

   | Variable       | Example                     |
   |----------------|-----------------------------|
   | `{{to_email}}` | daracha777@gmail.com        |
   | `{{from_name}}`| Applicant’s full name       |
   | `{{from_email}}`| Applicant’s email          |
   | `{{from_phone}}`| +47 123 45 678             |
   | `{{cv_file_name}}`| Filename or "Ikke lastet opp" |
   | `{{subject}}`  | Ny søknad - telefon selger  |
   | `{{message}}`  | Full text of the application |

   Easiest: set the body to `{{message}}`. It already contains:

   - Navn, E-post, Telefon, CV (filename or "Ikke lastet opp").

5. Save the template and copy its **Template ID** (e.g. `template_xxxx`).

---

## 2. Env vars for the employment-form Vercel project

**Where to add these:** In Vercel → Your employment-form project → **Settings** → **Environment Variables**

In the **employment-form** Vercel project (not the referral one):

| Variable | Value | Where to get it |
|----------|--------|----------------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS **Service ID** | EmailJS Dashboard → Email Services → Your service → Service ID (can be same as referral) |
| `VITE_EMAILJS_TEMPLATE_ID` | The **new** employment template ID from step 1 | EmailJS Dashboard → Email Templates → Your new "Søknad" template → Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS **Public Key** | EmailJS Dashboard → Account → API Keys → Public Key (can be same as referral) |

**Steps:**
1. Go to Vercel → Your employment-form project
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"** for each variable above
4. Paste the **Name** and **Value**
5. Check all environments: **Production**, **Preview**, **Development**
6. Click **Save**
7. **Redeploy** (Deployments → ... → Redeploy)

**See `DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.**

---

## 3. CV (file) and email

Only the **filename** is included in the email (e.g. `"CV_ Ole_Nordmann.pdf"`).  
The file itself is **not** attached. EmailJS in the browser does not attach user-uploaded files.

If you need the actual file:

- Use a form service that supports file upload (e.g. Formspree, Custom Form), or  
- Add a small backend that receives the file and forwards it (e.g. to storage or email with attachment).

---

## 4. Recipient

The form sends to `daracha777@gmail.com` by default. To change it, either:

- Set **To Email** in the EmailJS template to the desired address, or  
- Extend the code to send `to_email` from an env var and use `{{to_email}}` in the template.
