import { type LucideIcon, Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  loading,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-inventory-800 text-white hover:bg-inventory-700 shadow-lg shadow-inventory-900/10',

    secondary:
      'bg-accent-primary text-white hover:brightness-110 shadow-lg shadow-accent-primary/20',

    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200',
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-2 
        px-6 py-4 rounded-2xl font-black uppercase tracking-widest 
        transition-all duration-200 active:scale-[0.98] disabled:opacity-50 
        disabled:cursor-not-allowed text-xs cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
}
