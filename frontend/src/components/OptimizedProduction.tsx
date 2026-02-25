import { useAppSelector } from '../store/hooks';

export function OptimizedProduction() {
  const { data, loading } = useAppSelector((state) => state.production);

  if (loading) return <div className="h-64 bg-inventory-800 animate-pulse rounded-[40px] mb-10"></div>;

  return (
    <section className="mb-10 bg-inventory-800 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent-primary">Planejamento de Fabricação</h3>
          {data?.suggestions && data.suggestions.length > 0 ? (
            data.suggestions.map((sug, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/10">
                <div>
                  <p className="font-black text-lg uppercase tracking-tight">{sug.productName}</p>
                  <p className="text-xs text-inventory-400">{sug.quantity} unidades</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-inventory-500 font-bold uppercase tracking-tighter">Receita Total</p>
                  <p className="font-bold text-accent-primary text-xl">
                    ${(sug.quantity * (sug.unitPrice || 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-inventory-500 italic">Nenhuma produção sugerida no momento.</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-inventory-400">Projeção de Sobras no Estoque</h3>
          <div className="grid grid-cols-2 gap-3">
            {data?.remainders && data.remainders.length > 0 ? (
              data.remainders.map((rem, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-inventory-500 tracking-tighter">{rem.materialName}</span>
                  <span className="font-black text-white">{rem.remainingQuantity}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-inventory-500 italic col-span-2">Sem dados de sobra.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}