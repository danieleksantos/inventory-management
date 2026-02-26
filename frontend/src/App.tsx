import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { RawMaterialsPage } from './pages/RawMaterialsPage';
import { RecipesPage } from './pages/RecipesPage';
import { useAppDispatch } from './store/hooks';
import { fetchRawMaterials } from './store/rawMaterialSlice';
import { fetchProducts } from './store/productSlice';
import { fetchSuggestions } from './store/productionSlice';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRawMaterials());
    dispatch(fetchProducts());
    dispatch(fetchSuggestions());
  }, [dispatch]);

  const renderPage = () => {
  switch (activePage) {
    case 'dashboard': 
      return <DashboardPage />;
    case 'products': 
      return <ProductsPage />;
    case 'materials': 
      return <RawMaterialsPage />;
    case 'recipes': 
      return <RecipesPage />;
    default: 
      return <DashboardPage />;
  }
};

  return (
    <div className="flex min-h-screen bg-[#FDFCFB] font-sans text-inventory-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}