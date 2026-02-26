import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { CompositionModal } from '../components/CompositionModal';
import { Button } from '../components/Button';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Plus, Edit3, Loader2, Package, Beaker } from 'lucide-react';
import { fetchCompositions } from '../store/productCompositionSlice';
import { fetchProducts } from '../store/productSlice';
import { fetchRawMaterials } from '../store/rawMaterialSlice';
import type { ProductComposition } from '../types/inventory';

export function CompositionsPage() {
  const dispatch = useAppDispatch();

  const { items: compositions, loading: loadingComp } = useAppSelector(
    (state) => state.productCompositions,
  );
  const { items: products } = useAppSelector((state) => state.products);
  const { items: materials } = useAppSelector((state) => state.rawMaterials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
    dispatch(fetchCompositions());
  }, [dispatch]);

  const groupedCompositions = compositions.reduce(
    (acc, curr) => {
      const productId = curr.product?.id || 0;
      if (!acc[productId]) {
        acc[productId] = {
          productName: curr.product?.name || 'Produto Não Identificado',
          items: [],
        };
      }
      acc[productId].items.push(curr);
      return acc;
    },
    {} as Record<number, { productName: string; items: ProductComposition[] }>,
  );

  const handleOpenCreate = () => {
    setSelectedProductId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (productId: string) => {
    setSelectedProductId(Number(productId));
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <Header
        title="Estrutura de"
        highlight="Composição"
        subtitle="Gerencie os materiais necessários para cada produto"
      />

      <div className="mb-10">
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleOpenCreate}
          className="w-full md:w-auto py-5 md:py-4"
        >
          Nova Composição
        </Button>
      </div>

      <div className="relative">
        {loadingComp && (
          <div className="absolute inset-0 bg-white/50 z-10 flex justify-center p-12">
            <Loader2 className="animate-spin text-accent-primary" size={40} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedCompositions).map(([productId, group]) => (
            <div
              key={productId}
              className="bg-white rounded-[40px] border border-inventory-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-xl hover:shadow-accent-primary/5"
            >
              <div className="bg-inventory-50 p-8 border-b border-inventory-100 flex-none">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-accent-primary" size={18} />
                  <span className="text-[10px] font-black text-inventory-400 uppercase tracking-widest">
                    Produto Final
                  </span>
                </div>
                <h3 className="text-xl font-black text-inventory-800 italic uppercase tracking-tighter leading-tight">
                  {group.productName}
                </h3>
              </div>

              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-2 mb-6">
                  <Beaker className="text-inventory-300" size={16} />
                  <span className="text-[10px] font-black text-inventory-500 uppercase tracking-widest italic">
                    Insumos Vinculados
                  </span>
                </div>

                <div className="space-y-4 mb-8 grow">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-inventory-50 pb-3 last:border-0"
                    >
                      <span className="text-sm font-bold text-inventory-700">
                        {item.rawMaterial?.name}
                      </span>
                      <span className="text-xs font-black text-accent-primary italic">
                        {item.quantityNeeded.toLocaleString('pt-BR')} un.
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    variant="secondary"
                    icon={Edit3}
                    onClick={() => handleOpenEdit(productId)}
                    className="w-full py-3! px-5! text-[10px]! rounded-2xl! shadow-lg shadow-accent-primary/10 transition-transform active:scale-95"
                  >
                    Editar Composição
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(groupedCompositions).length === 0 && !loadingComp && (
          <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-inventory-100">
            <p className="text-inventory-400 italic font-medium">
              Nenhuma composição cadastrada ainda.
            </p>
          </div>
        )}
      </div>

      <CompositionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={selectedProductId}
        products={products}
        materials={materials}
        compositions={compositions}
      />
    </div>
  );
}
