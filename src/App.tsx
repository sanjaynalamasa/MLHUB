import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PromotionalBanner } from './components/layout/PromotionalBanner';
import { Home } from './pages/Home';
import { ChatPage } from './pages/ChatPage';
import { VisionPage } from './pages/VisionPage';
import { LogsPage } from './pages/LogsPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ModerationPage } from './pages/ModerationPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <PromotionalBanner />
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/moderation" element={<ModerationPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}