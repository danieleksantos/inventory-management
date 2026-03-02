import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/20 blur-[50px] rounded-full" />
        <div className="relative bg-white p-8 rounded-[40px] border border-inventory-100 shadow-xl">
          <AlertTriangle size={64} className="text-red-500" />
        </div>
      </div>

      <div className="space-y-2 mb-10">
        <p className="text-accent-primary font-black uppercase tracking-[0.3em] text-xs italic">
          Erro 404
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-inventory-800 uppercase italic tracking-tighter leading-none">
          Caminho <span className="text-red-500">Não Encontrado</span>
        </h1>
        <p className="text-inventory-500 font-medium max-w-md mx-auto pt-4">
          A página que você está tentando acessar não existe ou foi movida.
          Verifique a URL ou utilize os botões abaixo para navegar.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <Button
          variant="primary"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
          className="w-full py-5"
        >
          Voltar Página
        </Button>

        <Button
          variant="secondary"
          icon={LayoutDashboard}
          onClick={() => navigate('/dashboard')}
          className="w-full py-5"
        >
          Ir para Dashboard
        </Button>
      </div>
    </div>
  );
}
