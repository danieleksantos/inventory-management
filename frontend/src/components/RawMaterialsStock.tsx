import { useAppSelector } from '../store/hooks';

export function RawMaterialsStock() {
  const { items, loading } = useAppSelector((state) => state.rawMaterials);

  if (loading) return <div className="h-40 bg-inventory-50 animate-pulse rounded-3xl mb-10"></div>;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-black text-inventory-800 uppercase italic mb-6">Níveis de Estoque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items?.map((m) => (
          <div key={m.id} className="bg-white p-5 rounded-2xl border border-inventory-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-inventory-500 text-[10px] uppercase tracking-tighter">
                {m.name}
              </h4>
              <span className="text-[10px] font-bold text-inventory-300 uppercase">
                unid.
              </span>
            </div>
            
            <p className="text-3xl font-black text-inventory-700 tracking-tighter">
              {m.stockQuantity}
            </p>
            
            <div className="mt-4 w-full bg-inventory-50 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-inventory-400 transition-all duration-700"
                style={{ width: `${Math.min((m.stockQuantity / 200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}