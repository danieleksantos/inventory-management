import { useAppSelector } from '../store/hooks';

export function RawMaterialsStock() {
  const { items, loading } = useAppSelector((state) => state.rawMaterials);

  if (loading) return <div className="h-32 bg-inventory-50 animate-pulse rounded-4xl mb-10" />;

  return (
    <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-accent-primary rounded-full" />
        <h2 className="text-sm font-black text-inventory-800 uppercase italic tracking-tighter">
          Estoque <span className="text-accent-primary">Disponível</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items?.map((m) => (
          <div 
            key={m.id} 
            className="bg-white p-6 rounded-3xl border border-inventory-100 shadow-sm flex flex-col justify-center min-h-30"
          >
            <div className="space-y-1">
              {/* Nome do Produto: Limpo e sem indicadores */}
              <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                Insumo
              </p>
              <h4 className="text-sm font-black text-inventory-800 uppercase italic tracking-tighter leading-tight truncate">
                {m.name}
              </h4>
            </div>

            <div className="mt-4 pt-4 border-t border-inventory-50 flex items-baseline gap-2">
              {/* Quantidade: O dado principal em destaque */}
              <span className="text-4xl font-black text-inventory-800 italic tracking-tighter">
                {m.stockQuantity}
              </span>
              <span className="text-[10px] font-black text-inventory-400 uppercase italic">
                unidades
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}