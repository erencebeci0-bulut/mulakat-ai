import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const CVUploadPage = lazy(() => import('./pages/CVUploadPage'));
const RoleSelectionPage = lazy(() => import('./pages/RoleSelectionPage'));
const InterviewPage = lazy(() => import('./pages/InterviewPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const MaasHesaplamaPage = lazy(() => import('./pages/MaasHesaplamaPage'));
const IstifaPage = lazy(() => import('./pages/IstifaPage'));
const CvBuilderPage = lazy(() => import('./pages/CvBuilderPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const SeoPage = lazy(() => import('./pages/SeoPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AiInterviewSimulatorPage = lazy(() => import('./pages/AiInterviewSimulatorPage'));

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
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Interview flow */}
          <Route path="/cv" element={<CVUploadPage sessionData={sessionData} updateSession={updateSession} />} />
          <Route path="/rol" element={<RoleSelectionPage sessionData={sessionData} updateSession={updateSession} />} />
          <Route path="/mulakat" element={<InterviewPage sessionData={sessionData} updateSession={updateSession} />} />
          <Route path="/sonuc" element={<ResultsPage sessionData={sessionData} updateSession={updateSession} resetSession={resetSession} />} />

          {/* Tools */}
          <Route path="/maas-hesaplama" element={<MaasHesaplamaPage />} />
          <Route path="/istifa-dilekcesi" element={<IstifaPage />} />
          <Route path="/cv-hazirla" element={<CvBuilderPage />} />
          <Route path="/cv-builder" element={<CvBuilderPage />} />
          <Route path="/ai-interview" element={<AiInterviewSimulatorPage />} />

          {/* Legal */}
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Community */}
          <Route path="/liderlik-tablosu" element={<LeaderboardPage />} />

          {/* Programmatic SEO */}
          <Route path="/mulakat-sorulari" element={<SeoPage />} />
          <Route path="/mulakat-sorulari/:role" element={<SeoPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
