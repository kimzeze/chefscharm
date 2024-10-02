import React from 'react';
import cn from '@/lib/utils/cn';

type TButton = {
  label: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ label, type, className, onClick, disabled }: TButton) {
  return (
    <button
      type={type}
      className={cn(
        'h-[40px] w-full rounded-full border-2 border-white text-[18px] font-semibold active:bg-secondary',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
