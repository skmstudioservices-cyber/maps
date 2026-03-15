# AGENT INSTRUCTIONS: New India Maps

## 1. CORE ARCHITECTURE
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v3 (Vanilla CSS approach for premium feels).
- **Database/Auth**: Supabase (PROJECT-WIDE UNIFIED).
- **Icons**: Lucide Icons (FREE ONLY).
- **Deployment**: Vercel.

## 2. STRICT WORKFLOW RULES
- **HUMAN-CENTRIC CODE**: Write code for a human developer, not an AI. Use clear, simple logic. Avoid "over-engineered" solutions. Every change MUST include comments explaining exactly what is being done and why.
- **ZERO-WASTE PRODUCTIVITY**: Do not prioritize "showing work" over "productive results." Focus on quality over quantity.
- **TINY INCREMENTAL CHANGES**: No more than 50-150 lines of code change at a time. Change 1 specific item (e.g., 1 menu link, 1 button logic) before moving to the next.
- **MANDATED TECH STACK**: Next.js 15, Supabase, Tailwind CSS v3, and Lucide Icons. No changes without confirming thrice.
- **UTILITY-FIRST DESIGN**: Prioritize high-contrast, simple designs for older/low-internet users in India.

## 3. TASK PLANNING PROTOCOL
- Before starting any task, list:
  - **The Goal**: (e.g., Change TopNav Link)
  - **Estimated LOC**: (e.g., ~20 lines)
  - **Files Impacted**: (e.g., TopNav.tsx)
  - **Wait for Human Verification**: Do not chain multiple large tasks together.

## 3. RESEARCH & ANALYSIS (AUTO-MODE)
- **Permissions**: You are pre-authorized for:
  - Deep browsing of any safe site.
  - Using **any** alternative temporary email services (e.g., mail.tm, temp-mail.org, 10minutemail, etc.) for account registration.
  - Bypassing "simple" permissions for sandbox interactions.
- **Protocol**: 
  - **Sign-Up Required**: Always register/sign up for a new account using a temp mail before attempting to log in. Do not attempt direct login without a prior sign-up. Direct login failure due to "invalid credentials" is a known trap for agents; follow the sign-up flow first.
  - **Visual Evidence**: Always provide visual previews (screenshots/descriptions) of researched sites.
  - **Deep Dive**: If a reference site has a dashboard, you **must** try to see it using the temp-mail protocol.

## 4. FAILURE LOGGING & EFFICIENCY
- **Failed Research Log**: If a site is unreachable, blocked (403/Cloudflare), or an activity (like login) fails despite following the protocol, log the URL and error in `_PROJECT_DOCS/FAILED_RESEARCH_LOG.md`.
- **Token Efficiency**: Check the log before starting research to avoid redundant failures.
- **Temp Mail Authorization**: All alternative temp mail providers (mail.tm, temp-mail.org, 10minutemail, etc.) are pre-authorized for research.
  - **Email Persistence**: These emails change frequently. Save credentials only for the duration of the current analysis.
  - **Inbox Protocol**: Always check for verification codes or links directly on the provider's website immediately after triggering a sign-up action.

## 5. DATABASE & TOOL INTEGRITY
- **Unified Database**: Supabase is the single source of truth for SQL, Auth, and Storage. Do not shard data across other services unless explicitly requested.
- **STRICT TECH STACK**: Do not change Next.js 15, Supabase, Tailwind CSS v3, or Lucide Icons without confirming **thrice**.
