import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { RawMaterialsPage } from './pages/RawMaterialsPage';
import { CompositionsPage } from './pages/CompositionsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#FDFCFB] font-sans text-inventory-900 selection:bg-accent-primary selection:text-white">
        <Sidebar />

        <main
          id="main-content"
          className="flex-1 p-6 md:p-10 overflow-y-auto focus:outline-none"
          role="main"
          aria-label="Conteúdo Principal"
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
