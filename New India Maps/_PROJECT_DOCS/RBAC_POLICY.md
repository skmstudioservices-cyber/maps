# RBAC POLICY: New India Maps
**VERSION**: 1.0 (Draft)
**GOAL**: Secure, scalable access control for a community-driven knowledge network.

---

## 🔑 ROLE DEFINITIONS & LIMITS

### 1. 👑 SUPER ADMIN
- **Description**: Technical owner and site caretaker.
- **Use Case**: Global configurations, branding, and system integrity.
- **Access Limits**:
  - **Site Settings**: Full control over Logo, Site Title, and Theme (stored in Supabase `site_config`).
  - **User Management**: Can promote/demote any role, ban spam accounts.
  - **Financial**: View pricing tier performance and revenue (if applicable).
  - **DB Access**: Raw access to all Supabase tables.

### 2. 🛡️ MODERATOR
- **Description**: Truth-verifier for the community.
- **Use Case**: Approving business listings and visit proofs.
- **Access Limits**:
  - **Queue Management**: Verify, Reject, or Request Changes on "Pending" listings.
  - **Review Support**: Delete abusive comments or fake scores.
  - **Contributor Points**: Can manually award/deduct points for quality work.
  - **NO Access**: Cannot change site branding or touch system-level config.

### 3. 🏢 OWNER (SHOP/BUSINESS)
- **Description**: The business personality on the map.
- **Use Case**: Managing their own profile and responding to leads.
- **Access Limits**:
  - **Dashboard**: View calls, WhatsApp clicks, and views for *their* shops only.
  - **Profile Edit**: Update phone, timing, and photos for their listings.
  - **Reply Logic**: Respond to customer queries.
  - **NO Access**: Cannot edit other businesses or see global moderation queues.

### 4. 🧭 CONTRIBUTOR (TRUSTED GUIDE)
- **Description**: The boots-on-the-ground scanners.
- **Use Case**: Adding data, taking photos, and earning reputation points.
- **Access Limits**:
  - **Submission**: Can add new listings (start as 'Pending').
  - **Proof Upload**: Can upload visit-proof photos to listings.
  - **Points Tracking**: View personal leaderboard rank and point history.
  - **NO Access**: Cannot change business details once verified by a Moderator.

### 5. 👤 VISITOR (PUBLIC)
- **Description**: The information seeker.
- **Use Case**: Searching for maps, doctors, and shops.
- **Access Limits**:
  - **Read-Only**: View all verified businesses and maps.
  - **Interaction**: Trigger "Call" or "WhatsApp" actions.
  - **NO Access**: Cannot write comments or add businesses without registering.

---

## 🛠️ IMPLEMENTATION STRATEGY
1. **Supabase Auth Metadata**: Roles will be stored in the `app_metadata` field of the user session.
2. **Server-Side Checks**: Next.js Middleware will block unauthorized access to `/admin` or `/owner` routes.
3. **RLS (Row Level Security)**: Database-level protection ensuring Users only see what they are allowed to.
