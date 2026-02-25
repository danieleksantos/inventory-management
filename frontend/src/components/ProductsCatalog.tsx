import { useAppSelector } from '../store/hooks';

export function ProductsCatalog() {
  const { items, loading } = useAppSelector((state) => state.products);

  if (loading) return <div className="h-40 bg-inventory-50 animate-pulse rounded-3xl mb-10"></div>;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-black text-inventory-800 uppercase italic mb-6">Catálogo de Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-inventory-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-bold text-inventory-400 uppercase mb-1">Modelo</p>
            <h4 className="font-black text-inventory-800 uppercase text-lg">{p.name}</h4>
            <div className="mt-3 pt-3 border-t border-inventory-50 flex justify-between items-center">
              <span className="text-[10px] font-bold text-inventory-400 uppercase">Preço</span>
              <span className="font-black text-accent-primary">
                ${p.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}