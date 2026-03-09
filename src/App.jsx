import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages
import LandingPage from './pages/LandingPage';
import CVUploadPage from './pages/CVUploadPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import InterviewPage from './pages/InterviewPage';
import ResultsPage from './pages/ResultsPage';
import MaasHesaplamaPage from './pages/MaasHesaplamaPage';
import IstifaPage from './pages/IstifaPage';
import CvBuilderPage from './pages/CvBuilderPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SeoPage from './pages/SeoPage';

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

        {/* Community */}
        <Route path="/liderlik-tablosu" element={<LeaderboardPage />} />

        {/* Programmatic SEO */}
        <Route path="/mulakat-sorulari" element={<SeoPage category="genel" />} />
        <Route path="/yazilim-mulakat-sorulari" element={<SeoPage category="yazilim" />} />
        <Route path="/satis-mulakat-sorulari" element={<SeoPage category="satis" />} />
        <Route path="/ik-mulakat-sorulari" element={<SeoPage category="ik" />} />
        <Route path="/staj-mulakat-sorulari" element={<SeoPage category="staj" />} />
        <Route path="/pazarlama-mulakat-sorulari" element={<SeoPage category="pazarlama" />} />
        <Route path="/urun-yonetimi-mulakat-sorulari" element={<SeoPage category="urun" />} />
        <Route path="/veri-analisti-mulakat-sorulari" element={<SeoPage category="veri" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
