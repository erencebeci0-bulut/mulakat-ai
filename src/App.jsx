import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MaasHesaplamaPage = lazy(() => import('./pages/MaasHesaplamaPage'));
const IstifaPage = lazy(() => import('./pages/IstifaPage'));
const CvBuilderPage = lazy(() => import('./pages/CvBuilderPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const SeoPage = lazy(() => import('./pages/SeoPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const InterviewQuestionsPage = lazy(() => import('./pages/InterviewQuestionsPage'));
const JobRoleSeoPage = lazy(() => import('./pages/JobRoleSeoPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AiInterviewSimulatorPage = lazy(() => import('./pages/AiInterviewSimulatorPage'));
const InterviewPracticePage = lazy(() => import('./pages/interview-practice.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const ContentRemovalPage = lazy(() => import('./pages/ContentRemovalPage'));
const GenericLegalPage = lazy(() => import('./pages/GenericLegalPage'));
import AnalyticsTracker from './components/AnalyticsTracker';

export default function App() {
  const [sessionData, setSessionData] = useState({
    cvText: '',
    role: null,
    answers: [],
    report: null,
    email: '',
  });

  const updateSession = (updates) => {
    setSessionData(prev => ({ ...prev, ...updates }));
  };

  const resetSession = () => {
    setSessionData({ cvText: '', role: null, answers: [], report: null, email: '' });
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}><div className="loading-pulse">Yükleniyor...</div></div>}>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Deprecated Legacy Interview flow -> Redirect to unified simulator */}
          <Route path="/cv" element={<Navigate to="/ai-interview" replace />} />
          <Route path="/rol" element={<Navigate to="/ai-interview" replace />} />
          <Route path="/mulakat" element={<Navigate to="/ai-interview" replace />} />
          <Route path="/sonuc" element={<Navigate to="/ai-interview" replace />} />

          {/* Tools */}
          <Route path="/maas-hesaplama" element={<MaasHesaplamaPage />} />
          <Route path="/istifa-dilekcesi" element={<IstifaPage />} />
          <Route path="/cv-hazirla" element={<CvBuilderPage />} />
          <Route path="/cv-builder" element={<CvBuilderPage />} />
          <Route path="/ai-interview" element={<AiInterviewSimulatorPage />} />
          <Route path="/interview-practice" element={<InterviewPracticePage />} />

          {/* Data Platform Base */}
          <Route path="/company/:companyId" element={<CompanyPage />} />
          <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
          <Route path="/interview-questions/:category" element={<InterviewQuestionsPage />} />

          {/* SEO Landing Magnets */}
          <Route path="/maas/:jobSlug-maasi" element={<JobRoleSeoPage />} />
          <Route path="/maas/:jobSlug-maas" element={<JobRoleSeoPage />} />
          {/* Support legacy paths for previously shared links */}
          <Route path="/:jobSlug-maasi" element={<JobRoleSeoPage />} />
          <Route path="/:jobSlug-maas" element={<JobRoleSeoPage />} />

          {/* Community */}
          <Route path="/liderlik-tablosu" element={<LeaderboardPage />} />

          {/* Programmatic SEO - Top Level Keywords */}
          {['yazilim', 'satis', 'pazarlama', 'ik', 'finans', 'musteri', 'mezun', 'genel'].map(role => (
            <Route key={role} path={`/${role}-mulakat-sorulari`} element={<SeoPage />} />
          ))}
          {/* Legacy & Category Index */}
          <Route path="/mulakat-sorulari" element={<SeoPage />} />
          <Route path="/mulakat-sorulari/:roleSlug" element={<SeoPage />} />

          <Route path="/kvkk" element={<GenericLegalPage title="KVKK ve Aydınlatma Metni" contentBlocks={[{ text: 'Türkiye Cumhuriyeti Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında verileriniz güvendedir.' }, { subtitle: 'İşlenen Veriler', text: 'CV ve mülakat kayıtlarınız anonimleştirilir.' }]} />} />
          <Route path="/cerez-politikasi" element={<GenericLegalPage title="Çerez Politikası" contentBlocks={[{ text: 'Platformumuzda temel oturum yönetimi ve anonim analiz için gerekli çerezler kullanılmaktadır.' }]} />} />
          <Route path="/hakkimizda" element={<GenericLegalPage title="Hakkımızda" description="Mülakat.com, Türkiye'nin lider kariyer veri ve mülakat deneyimi platformudur." contentBlocks={[{ text: 'Misyonumuz, iş arama sürecini tamamen şeffaf ve yapay zeka destekli hale getirmektir. İletişim: hello@mulakatim.com' }]} />} />
          <Route path="/iletisim" element={<GenericLegalPage title="İletişim" contentBlocks={[{ subtitle: 'E-Posta', text: 'hello@mulakatim.com' }, { subtitle: 'Destek', text: 'İçerik kaldırma talepleri için lütfen "İçerik Kaldırma Talebi" formunu kullanın.' }]} />} />
          <Route path="/icerik-kaldirma" element={<ContentRemovalPage />} />

          {/* Admin & Security */}
          <Route path="/yonetim-merkezi" element={<AdminDashboardPage />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
