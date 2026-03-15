# Current Project Audit

## 1. Router Type
The project is a standard React Single Page Application (SPA). It uses `react-router-dom` for client-side routing, configured inside `src/App.jsx`. It does NOT use a folder-based router like Next.js or Remix. 
Routing relies heavily on React's `lazy` and `Suspense` for code splitting.

## 2. Existing Pages
The application has several primary routes/pages built:
- **Core Product**: `LandingPage`, `CvBuilderPage`, `AiInterviewSimulatorPage` (which replaced legacy `/cv` and `/mulakat` routes).
- **Tools**: `MaasHesaplamaPage`, `IstifaPage`.
- **Data/Platform pages**: `CompanyPage` (`/company/:companyId`), `InterviewQuestionsPage` (`/interview-questions/:category`).
- **SEO Pages**: `JobRoleSeoPage` (e.g., `/maas/:jobSlug-maasi`), `SeoPage` (`/:role-mulakat-sorulari`).
- **Admin**: `AdminDashboardPage` (`/yonetim-merkezi`).
- **Legal/Misc**: `PrivacyPage`, `TermsPage`, `GenericLegalPage`, `DisclaimerPage`, `LeaderboardPage`, `ContentRemovalPage`.

## 3. Reusable Components
Located in `src/components/`, current components include:
- `NavBar`, `AuthModal`
- `AnalyticsTracker`, `SEOHead`
- `Breadcrumbs`, `TagInput`, `RankBadge`
- `ImagePlaceholders`
- Data submission forms: `InterviewExperienceForm`, `SalarySubmissionForm`

## 4. Current Admin / Dashboard Status
There is an admin panel located at `src/pages/admin/AdminDashboardPage.jsx` associated with the route `/yonetim-merkezi`. The standard `/admin` route redirects to the home page, adding a layer of obfuscation.

## 5. Current Styling Approach
The project is styled using **Tailwind CSS**. It includes `postcss` and `autoprefixer` dependencies. Global styles are defined in `src/index.css` and `src/App.css`. The design uses modern React patterns with class-based utilities.

## 6. Current Deployment State
Based on `.env.example` existence and configurations, the app is structured for deployments using vite build. The setup uses `concurrently` in `package.json` to run both the Vite frontend (`dev:frontend`) and an Express backend (`server/index.js` via `dev:backend`). It's production-ready for platforms like Vercel (for frontend) and basic Node hosting (for backend).
