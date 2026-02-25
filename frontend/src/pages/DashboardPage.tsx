import { Header } from '../components/Header';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { RawMaterialsStock } from '../components/RawMaterialsStock';
import { OptimizedProduction } from '../components/OptimizedProduction';

export function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <Header 
        title="Painel de" 
        highlight="Controle" 
        subtitle="Monitoramento de Insumos e Inteligência de Produção" 
      />

      <div className="space-y-12">
        <section>
          <ProductsCatalog />
        </section>
        <section>
          <RawMaterialsStock />
        </section>

        <section className="pb-10">
          <OptimizedProduction />
        </section>
      </div>
    </div>
  );
}