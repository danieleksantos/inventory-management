import { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StockCard } from './components/StockCard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchRawMaterials } from './store/rawMaterialSlice';

function App() {
  const dispatch = useAppDispatch();
  const { items: materials, loading, error } = useAppSelector((state) => state.rawMaterials);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const totalStock = materials.reduce((acc, curr) => acc + curr.stockQuantity, 0);

  return (
    <div className="flex min-h-screen bg-surface-base font-sans text-inventory-900">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-inventory-800">
              Inventory <span className="text-accent-primary">Management</span>
            </h1>
            <p className="text-inventory-600 font-medium">Controle de insumos e produção industrial</p>
          </div>
          
          <div className="bg-inventory-100 text-inventory-700 px-4 py-2 rounded-full text-sm font-bold border border-inventory-200 shadow-sm">
            System Online • 2026
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-inventory-900/5 border border-inventory-100 transition-transform hover:scale-[1.02]">
            <h2 className="font-bold text-inventory-500 text-xs uppercase tracking-widest mb-2">Total Stock Balance</h2>
            <p className="text-4xl font-black text-inventory-800">
              {loading ? '...' : totalStock.toLocaleString()} <span className="text-sm text-inventory-400">units</span>
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-inventory-900/5 border border-inventory-100 transition-transform hover:scale-[1.02]">
            <h2 className="font-bold text-inventory-500 text-xs uppercase tracking-widest mb-2">Production Sugestions</h2>
            <p className="text-4xl font-black text-accent-primary">-- <span className="text-sm text-accent-primary/60">units</span></p>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-inventory-800">Raw Materials Stock</h2>
            <div className="h-px flex-1 bg-inventory-100 mx-6 hidden md:block"></div>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl">
              {error} - Certifique-se que o backend Quarkus está rodando!
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <StockCard key={material.id} material={material} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;