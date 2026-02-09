import React, { useState, MouseEvent, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Ripple Effect Component ---
interface RippleProps {
  color?: string;
}

const Ripple: React.FC<RippleProps> = ({ color = 'rgba(255, 255, 255, 0.3)' }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (ripples.length > 0) {
      timeout = setTimeout(() => {
        setRipples([]);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [ripples]);

  const addRipple = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples([...ripples, { x, y, id }]);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden rounded-none" 
      onMouseDown={addRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '200%',
            paddingBottom: '200%',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

// --- Material Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'accent' | 'default';
  fullWidth?: boolean;
}

export const MatButton: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'contained', 
  color = 'primary', 
  fullWidth,
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-bold tracking-wider uppercase transition-all duration-200 rounded-none disabled:opacity-50 disabled:cursor-not-allowed";
  const sizeStyles = "px-4 py-2 text-sm";
  
  const colors = {
    primary: {
      contained: "bg-[#3F51B5] text-white hover:bg-[#303F9F] shadow-md hover:shadow-lg active:shadow-xl",
      text: "text-[#3F51B5] hover:bg-[#3F51B5]/10",
      outlined: "border border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5]/10",
    },
    accent: {
      contained: "bg-[#FF4081] text-white hover:bg-[#F50057] shadow-md hover:shadow-lg active:shadow-xl",
      text: "text-[#FF4081] hover:bg-[#FF4081]/10",
      outlined: "border border-[#FF4081] text-[#FF4081] hover:bg-[#FF4081]/10",
    },
    default: {
      contained: "bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm hover:shadow-md",
      text: "text-gray-700 hover:bg-gray-900/10",
      outlined: "border border-gray-400 text-gray-700 hover:bg-gray-900/10",
    }
  };

  const variantClass = colors[color][variant];
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={cn(baseStyles, sizeStyles, variantClass, widthClass, className)} 
      {...props}
    >
      {children}
      <Ripple color={variant === 'contained' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'} />
    </button>
  );
};

// --- Material FAB ---
interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'accent';
  mini?: boolean;
}

export const MatFAB: React.FC<FABProps> = ({ 
  children, 
  className, 
  color = 'accent', 
  mini = false,
  ...props 
}) => {
  const baseStyles = "relative flex items-center justify-center rounded-none transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-2xl z-10";
  const sizeStyles = mini ? "w-10 h-10" : "w-14 h-14";
  
  const colorStyles = color === 'accent' 
    ? "bg-[#FF4081] text-white hover:bg-[#F50057]" 
    : "bg-[#3F51B5] text-white hover:bg-[#303F9F]";

  return (
    <button 
      className={cn(baseStyles, sizeStyles, colorStyles, className)} 
      {...props}
    >
      {children}
      <Ripple />
    </button>
  );
};

// --- Material Card ---
export const MatCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn("bg-white rounded-none shadow-sm transition-shadow duration-200", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

// --- Material Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const MatInput: React.FC<InputProps> = ({ label, icon, className, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative pt-4 pb-2 w-full", className)}>
      {label && (
        <label 
          className={cn(
            "absolute left-0 transition-all duration-200 pointer-events-none font-bold",
            focused || props.value ? "top-0 text-xs text-[#3F51B5]" : "top-4 text-base text-gray-900",
            icon && !focused && !props.value ? "left-8" : "left-0"
          )}
        >
          {label}
        </label>
      )}
      <div className="flex items-center">
        {icon && <span className={cn("mr-2", focused ? "text-[#3F51B5]" : "text-gray-900")}>{icon}</span>}
        <input
          className="w-full bg-transparent border-b-2 border-gray-400 py-1 focus:outline-none focus:border-[#3F51B5] focus:border-b-2 transition-colors font-bold text-black"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
    </div>
  );
};
