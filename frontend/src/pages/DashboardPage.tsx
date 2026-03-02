import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/productSlice';
import { fetchRawMaterials } from '../store/rawMaterialSlice';
import { fetchSuggestions } from '../store/productionSlice';
import { Toast } from '../utils/alerts';
import { Header } from '../components/Header';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { RawMaterialsStock } from '../components/RawMaterialsStock';
import { OptimizedProduction } from '../components/OptimizedProduction';

export function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          dispatch(fetchProducts()).unwrap(),
          dispatch(fetchRawMaterials()).unwrap(),
          dispatch(fetchSuggestions()).unwrap(),
        ]);
      } catch (error) {
        console.error('Falha na sincronização do Dashboard:', error);

        Toast.fire({
          icon: 'error',
          title: 'ERRO AO CARREGAR DADOS',
        });
      }
    };

    loadDashboardData();
  }, [dispatch]);

  return (
    <main
      className="animate-in fade-in duration-700 pb-10 focus:outline-none"
      role="main"
    >
      <Header
        title="Painel de"
        highlight="Controle"
        subtitle="Monitoramento de Insumos e Inteligência de Produção"
      />

      <div className="space-y-12">
        <section
          className="animate-in slide-in-from-bottom-4 duration-500 delay-75"
          aria-label="Sugestões de produção otimizada"
        >
          <OptimizedProduction />
        </section>

        <section
          className="animate-in slide-in-from-bottom-4 duration-500 delay-150"
          aria-label="Catálogo de produtos"
        >
          <ProductsCatalog />
        </section>

        <section
          className="pb-10 animate-in slide-in-from-bottom-4 duration-500 delay-300"
          aria-label="Estoque de matérias-primas"
        >
          <RawMaterialsStock />
        </section>
      </div>
    </main>
  );
}
