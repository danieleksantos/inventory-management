import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SystemWakeUp } from './components/SystemWakeUp';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { RawMaterialsPage } from './pages/RawMaterialsPage';
import { CompositionsPage } from './pages/CompositionsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function App() {
  const [isServerReady, setIsServerReady] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const checkServer = async () => {
      try {
        await axios.get(`${API_URL}/hello`, { timeout: 8000 });
        console.log('✅ Servidor pronto!');
        setIsServerReady(true);
      } catch {
        console.warn('⏳ Servidor em repouso, tentando novamente em 5s...');
        setRetryCount((prev) => prev + 1);
        timer = setTimeout(checkServer, 5000);
      }
    };

    checkServer();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!isServerReady) {
    return <SystemWakeUp retryCount={retryCount} />;
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#FDFCFB] font-sans text-inventory-900 selection:bg-accent-primary selection:text-white">
        <Sidebar />

        <main
          id="main-content"
          className="flex-1 p-6 md:p-10 overflow-y-auto focus:outline-none"
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/materials" element={<RawMaterialsPage />} />
            <Route path="/compositions" element={<CompositionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
