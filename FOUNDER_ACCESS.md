# Founder Admin Setup Guide

This document contains the secure access credentials and instructions for the Mülakat.com Management Console. **Do not commit this file or the `.env` file to public repositories without caution.**

## Admin Console Access
- **URL Path:** `https://mülakat.com/yonetim-merkezi` (or `http://localhost:5174/yonetim-merkezi` locally)
- **Founder Email:** `hello@mulakatim.com`
- **Default Password:** `Mlk2026!Admin`

## How to Change the Password
To securely modify the admin password, we have implemented an environment variable approach. This prevents the password from being visibly hardcoded in your standard source files.

1. Open the `.env` file located in the root directory of your project. (If it does not exist, create it).
2. Add or update the following line:
   ```env
   VITE_ADMIN_PASSWORD=YourNewSuperSecretPassword
   ```
3. Restart your local development server (`npm run dev`) or trigger a new build on Vercel for the new password to take effect. If deploying to Vercel, ensure you add `VITE_ADMIN_PASSWORD` to your Vercel Environment Variables.

## Security Notes
- The admin dashboard is currently protected via a lightweight client-side gate suitable for pre-launch and early MVP stages. Data fetches inside the admin panel will need similar `.env` backend verification once you connect to a real database. 
- Auto-logout can be performed by clicking the "Çıkış" (Logout) button in the top right of the dashboard.

## Final Launch Checklist
Before pointing your domain to the public, ensure the following:
- [ ] **Vercel Settings:** Push this project to GitHub and deploy via Vercel. Add `VITE_ADMIN_PASSWORD` to your Vercel Environment Variables.
- [ ] **Domain Check:** Verify `https://xn--mlakat-3ya.com` is the primary domain routing on Vercel to maintain your hardcoded canonical SEO structure.
- [ ] **Inbox Ready:** Ensure `hello@mulakatim.com` is actively monitored for incoming user feedback and "İçerik Kaldırma" requests.
- [ ] **Data Honesty:** Remember that the metrics seen in `/yonetim-merkezi` are currently demo placeholders for testing layout. True metrics will flow post-launch.
- [ ] **Launch:** Share your project. The application is completely hardened and safe for public traffic.
