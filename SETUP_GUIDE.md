# India Directory – Setup guide (no coding needed)

Do these steps **in order**. Each step tells you exactly where to click and what to copy.

---

## What you need open

- This guide (you can print it or keep it on another screen).
- A browser (Chrome or Edge).
- Your **GitHub** account (already connected to Vercel and Supabase).

---

## Step 1: Put your project on GitHub

Your project lives in a folder on your PC. We need to put it on GitHub so Vercel can use it.

### Option A – You have Git installed (e.g. GitHub Desktop)

1. Open **GitHub Desktop** (or your Git app).
2. **File → Add local repository**.
3. Choose the folder: `C:\Users\subha\india-directory`.
4. If it says "not a Git repository", click **Create repository** so it turns this folder into one.
5. In GitHub.com, create a **new repository** named `india-directory` (empty, no README).
6. In GitHub Desktop, use **Publish repository** and select that new repo. Publish.

### Option B – You don’t have Git / prefer the website

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** (top right) → **New repository**.
3. Name: `india-directory`. Leave "Add a README" **unchecked**. Click **Create repository**.
4. You’ll see a page with "…or upload an existing file". Click **uploading an existing file**.
5. Open File Explorer and go to `C:\Users\subha\india-directory`.
6. **Do not** upload the `node_modules` folder (it’s huge). Upload:
   - All files in the root: `package.json`, `README.md`, `.env.example`, etc.
   - The whole `src` folder.
   - The whole `supabase` folder.
   - The whole `public` folder (if it exists).
   - **Skip** the `.next` folder and `node_modules`.
7. At the bottom, click **Commit changes**.

---

## Step 2: Set up Supabase (database)

1. Go to [app.supabase.com](https://app.supabase.com) and sign in (with GitHub if you like).
2. Click **New project**. Name it e.g. **India Directory**. Choose a password (save it). Click **Create new project** and wait 1–2 minutes.
3. In the left menu, click **SQL Editor**.
4. Click **New query**.
5. Open the file `supabase/migrations/001_initial_schema.sql` from your `india-directory` folder in Notepad. **Select all** (Ctrl+A), **Copy** (Ctrl+C).
6. In Supabase SQL Editor, **Paste** (Ctrl+V). Click **Run** (or Ctrl+Enter). You should see "Success".
7. Click **New query** again. Open `supabase/migrations/002_seed.sql`, copy all, paste into the editor, **Run**. You should see "Success".
8. In the left menu, click **Settings** (gear icon) → **API**.
9. You’ll see:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon public** (a long string)
10. **Copy both** and keep them somewhere safe (e.g. a Notepad file). You’ll need them in Step 4.

---

## Step 3: Connect GitHub to Vercel and deploy

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. Click **Add New…** → **Project**.
3. You should see your GitHub repos. Find **india-directory** and click **Import**.
4. On the next screen, **do not** click Deploy yet. First add environment variables:
   - Under **Environment Variables**, name: `NEXT_PUBLIC_SUPABASE_URL`, value: paste your **Project URL** from Step 2.
   - Click **Add**. Then name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, value: paste your **anon public** key. Click **Add**.
5. Click **Deploy**. Wait 1–2 minutes. When it’s done, you’ll get a link like `https://india-directory-xxx.vercel.app`. That’s your live site.

---

## Step 4: Use your own domain (e.g. business.skmstudio.com)

1. In Vercel, open your **india-directory** project.
2. Go to **Settings** → **Domains**.
3. In "Add", type your domain or subdomain (e.g. `business.skmstudio.com`). Click **Add**.
4. Vercel will show something like: **CNAME** → `cname.vercel-dns.com` (or A records).
5. Open the site where you manage your domain (e.g. GoDaddy, Namecheap, or wherever you bought skmstudio.com).
6. Find **DNS** or **DNS settings**. Add a **CNAME** record:
   - Name/host: `business` (or whatever subdomain you used).
   - Value/target: `cname.vercel-dns.com`.
   - Save.
7. Wait 5–60 minutes. Back in Vercel, the domain should show a green tick. Your site is now live on your domain.

---

## Step 5: Run the site on your PC (optional)

So you can test before or after deploy:

1. Open the folder `C:\Users\subha\india-directory` in File Explorer.
2. In the address bar, type `cmd` and press Enter (a black window opens).
3. Type: `npm install` and press Enter. Wait for it to finish.
4. Create a file named `.env.local` in the same folder (use Notepad and Save As → name it exactly `.env.local`). Put these two lines in it (use **your** Supabase URL and key from Step 2):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. In the same black window, type: `npm run dev` and press Enter.
6. Open the browser and go to: `http://localhost:3000`. You should see your directory site.

---

## Quick checklist

- [ ] Step 1: Project is on GitHub (Option A or B).
- [ ] Step 2: Supabase project created, both SQL files run, URL and anon key copied.
- [ ] Step 3: Vercel project imported, both env vars added, Deploy done.
- [ ] Step 4: Domain added in Vercel and CNAME set at your domain provider.
- [ ] Step 5 (optional): `.env.local` created and `npm run dev` works.

---

## If something doesn’t work

- **Vercel build fails**: Check that both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel (Step 3).
- **Site is blank or errors**: Make sure you ran **both** SQL files in Supabase (001 and 002).
- **Domain not working**: DNS can take up to an hour. Double-check the CNAME name (e.g. `business`) and value (`cname.vercel-dns.com`).

If you tell me which step you’re on and what you see (e.g. a screenshot or the exact error message), I can tell you exactly what to do next.
