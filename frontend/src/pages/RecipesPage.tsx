import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Plus } from 'lucide-react';

export function RecipesPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <Header 
        title="Gestão de" 
        highlight="Receitas" 
        subtitle="Vínculo entre produtos e matérias-primas" 
      />

      <div className="mb-8">
        <Button variant="primary" icon={Plus} className="w-full md:w-auto py-5 md:py-4">
          Nova Receita
        </Button>
      </div>

      <div className="bg-white rounded-4xl border border-inventory-100 p-12 text-center text-inventory-400 font-bold italic uppercase tracking-widest">
        Lista de receitas em desenvolvimento
      </div>
    </div>
  );
}