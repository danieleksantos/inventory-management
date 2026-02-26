import { useAppSelector } from '../store/hooks';
import {
  TrendingUp,
  Package,
  BarChart3,
  ArrowUpRight,
  Box,
} from 'lucide-react';

export function OptimizedProduction() {
  const { data, loading } = useAppSelector((state) => state.production);

  if (loading)
    return (
      <div className="h-112.5 bg-inventory-900 animate-pulse rounded-[40px] mb-10 border border-white/5"></div>
    );

  const totalRevenue =
    data?.suggestions?.reduce(
      (acc, sug) => acc + sug.quantity * (sug.unitPrice || 0),
      0,
    ) || 0;

  return (
    <section className="mb-10 bg-inventory-900 p-8 md:p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden border border-white/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 blur-[120px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] -ml-20 -mb-20" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              Sugestão de <span className="text-accent-primary">Produção</span>
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-bold text-inventory-400 uppercase tracking-widest">
                Receita Estimada Total
              </p>
              <p className="text-3xl font-black text-white italic">
                R${' '}
                {totalRevenue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="p-4 bg-accent-primary rounded-2xl shadow-lg shadow-accent-primary/20">
              <TrendingUp size={24} className="text-inventory-900" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={14} className="text-inventory-500" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-inventory-500">
                Produtos
              </h4>
            </div>

            {data?.suggestions && data.suggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.suggestions.map((sug, i) => (
                  <div
                    key={i}
                    className="group bg-white/5 hover:bg-white/10 p-6 rounded-4xl border border-white/5 hover:border-accent-primary/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-inventory-800 rounded-2xl group-hover:scale-110 transition-transform">
                        <Package size={20} className="text-accent-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-accent-primary font-black italic text-sm">
                        <ArrowUpRight size={14} />
                        <span>PRODUZIR</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-black text-xl uppercase tracking-tight mb-1 group-hover:text-accent-primary transition-colors">
                        {sug.productName}
                      </p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-light text-inventory-400">
                          {sug.quantity}{' '}
                          <span className="text-[10px] font-black uppercase tracking-widest ml-1">
                            Unid.
                          </span>
                        </p>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-inventory-500 uppercase">
                            Subtotal
                          </p>
                          <p className="font-bold text-white tracking-tighter">
                            R${' '}
                            {(
                              sug.quantity * (sug.unitPrice || 0)
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 p-12 rounded-4xl border border-dashed border-white/10 text-center">
                <p className="text-sm text-inventory-500 italic font-medium">
                  Aguardando dados de estoque para processar otimização...
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[40px] border border-white/10">
            <div className="flex items-center gap-2 mb-8">
              <Box size={14} className="text-inventory-500" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-inventory-500">
                Resíduo de Estoque
              </h4>
            </div>

            <div className="space-y-3">
              {data?.remainders && data.remainders.length > 0 ? (
                data.remainders.map((rem, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-inventory-800/50 rounded-2xl border border-white/5 group hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(255,165,0,0.6)]" />
                      <span className="text-[10px] uppercase font-black text-inventory-300 tracking-tighter">
                        {rem.materialName}
                      </span>
                    </div>
                    <span className="font-black text-white italic group-hover:text-accent-primary transition-colors">
                      {rem.remainingQuantity}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-[10px] text-inventory-600 font-bold uppercase italic">
                    Eficiência de Uso: 100%
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
              <p className="text-[9px] text-accent-primary font-black uppercase leading-tight">
                * Projeção baseada na disponibilidade atual de insumos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
