import { Header } from '../components/Header';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { RawMaterialsStock } from '../components/RawMaterialsStock';
import { OptimizedProduction } from '../components/OptimizedProduction';

export function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <Header
        title="Painel de"
        highlight="Controle"
        subtitle="Monitoramento de Insumos e Inteligência de Produção"
      />

      <div className="space-y-12">
        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-75">
          <OptimizedProduction />
        </section>

        <section className="animate-in slide-in-from-bottom-4 duration-500 delay-150">
          <ProductsCatalog />
        </section>

        <section className="pb-10 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <RawMaterialsStock />
        </section>
      </div>
    </div>
  );
}
