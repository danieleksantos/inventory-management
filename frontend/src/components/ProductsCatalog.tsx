import { useAppSelector } from '../store/hooks';

export function ProductsCatalog() {
  const { items, loading } = useAppSelector((state) => state.products);

  // Skeleton premium com bordas arredondadas sincronizadas
  if (loading) {
    return (
      <div className="h-64 bg-inventory-100/50 animate-pulse rounded-4xl border-2 border-dashed border-inventory-200 mb-10" />
    );
  }

  // Fallback para catálogo vazio
  if (!items || items.length === 0) {
    return (
      <div className="p-12 bg-white rounded-4xl border border-inventory-100 text-center text-inventory-400 font-bold italic uppercase tracking-widest">
        Nenhum produto catalogado
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-accent-primary rounded-full" />
        <h2 className="text-sm font-black text-inventory-800 uppercase italic tracking-tighter">
          Catálogo de <span className="text-accent-primary">Produtos</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div
            key={p.id}
            className="group bg-white p-7 rounded-4xl border border-inventory-100 shadow-sm transition-all"
          >
            <div className="space-y-1 mb-4">
              <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                Produto
              </p>
              <h4 className="font-black text-inventory-800 uppercase text-lg italic tracking-tighter leading-tight wrap-break-word">
                {p.name}
              </h4>
            </div>

            <div className="pt-4 border-t border-inventory-50 flex justify-between items-end">
              <div className="space-y-0.5">
                <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                  Valor
                </p>
                <p className="font-black text-xl text-inventory-800 italic tracking-tighter">
                  <span className="text-xs not-italic mr-1 text-inventory-400">
                    R$
                  </span>
                  {p.price?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* Badge decorativo industrial */}
              <div className="h-2 w-8 bg-inventory-100 rounded-full mb-2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
