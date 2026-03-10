# 🗺️ Project Management Guide

This guide explains the 4 separate "work zones" (branches) created for your site. Each zone is kept separate to ensure that nothing breaks your main live site.

## 📁 Total Branches: 4

| Branch Name | Purpose | What's Inside | When to Merge |
| :--- | :--- | :--- | :--- |
| `feature/admin-control` | **Your Dashboard** | Tools for you to approve businesses, change site settings, and manage users. | Once you are happy with how you control the site. |
| `feature/ui-ux-refresh` | **Modern Design** | Beauty, animations, premium colors, and making it easy for customers to use. | Once the design looks "Premium" to you. |
| `feature/business-dashboard` | **Merchant Tools** | A login for business owners to see their own stats and edit their own pages. | Once merchants can manage their listings easily. |
| `feature/interactive-maps` | **Map Features** | Fixing the interactive maps, pins, and location-based searching. | Once the technical map errors are fully fixed. |

---

## 🛠️ How to Manage Branches (Commands)

Since you are not a coder, here is a simple "Cheat Sheet". 

### 1. "Switch to a Work Zone"
To work on a specific feature, use this:
`git checkout [branch-name]`
*Example: `git checkout feature/admin-control`*

### 2. "Save My Progress"
To save what you've changed:
`git add .`
`git commit -m "Describe what you did"`

### 3. "Send to GitHub"
To push your changes to GitHub so they are safe:
`git push origin [branch-name]`

### 4. "The Safety Switch" (Go back to Main)
If you get confused and want to go back to the live site version:
`git checkout main`

---

## ⚠️ Important Rules for Non-Techies
1. **Never Change Main Directly:** Only work in the `feature/` branches.
2. **One at a Time:** Try to finish one branch (like Admin) before moving to the next.
3. **Ask me to Merge:** When you are ready to make a feature "Live", ask me: *"Merge [branch-name] into main"* and I will handle the technical merge for you safely.
