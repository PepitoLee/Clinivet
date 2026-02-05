import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && String(props.value).length > 0;

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>
            {icon}
          </span>
        )}
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-4 ${icon ? 'pl-12' : ''} pt-6
            border rounded-xl
            transition-all duration-300
            placeholder-transparent
            focus:outline-none
            ${isDark
              ? 'bg-white/[0.03] border-white/[0.08] text-slate-200 focus:bg-white/[0.06] focus:border-white/20'
              : 'bg-vet-warm border-vet-blue-dark/[0.08] text-vet-blue-dark focus:bg-white focus:border-vet-blue-dark/20'
            }
            ${error
              ? 'border-red-400/60 focus:border-red-500'
              : ''
            }
            ${className}
          `}
          placeholder={label}
        />
        <motion.label
          className={`
            absolute left-4 ${icon ? 'left-12' : ''} pointer-events-none
            transition-all duration-300
            ${error ? 'text-red-500' : isFocused ? 'text-vet-orange-deep' : isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}
          `}
          animate={{
            top: isFocused || hasValue ? '0.5rem' : '50%',
            y: isFocused || hasValue ? 0 : '-50%',
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && String(props.value).length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-4 pt-6 min-h-[120px] resize-none
            border rounded-xl
            transition-all duration-300
            placeholder-transparent
            focus:outline-none
            ${isDark
              ? 'bg-white/[0.03] border-white/[0.08] text-slate-200 focus:bg-white/[0.06] focus:border-white/20'
              : 'bg-vet-warm border-vet-blue-dark/[0.08] text-vet-blue-dark focus:bg-white focus:border-vet-blue-dark/20'
            }
            ${error
              ? 'border-red-400/60 focus:border-red-500'
              : ''
            }
            ${className}
          `}
          placeholder={label}
        />
        <motion.label
          className={`
            absolute left-4 pointer-events-none
            transition-all duration-300
            ${error ? 'text-red-500' : isFocused ? 'text-vet-orange-deep' : isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}
          `}
          animate={{
            top: isFocused || hasValue ? '0.5rem' : '1.5rem',
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && String(props.value).length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <select
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-4 pt-6
            border rounded-xl
            transition-all duration-300
            appearance-none cursor-pointer
            focus:outline-none
            ${isDark
              ? 'bg-white/[0.03] border-white/[0.08] text-slate-200 focus:bg-white/[0.06] focus:border-white/20'
              : 'bg-vet-warm border-vet-blue-dark/[0.08] text-vet-blue-dark focus:bg-white focus:border-vet-blue-dark/20'
            }
            ${error
              ? 'border-red-400/60 focus:border-red-500'
              : ''
            }
            ${className}
          `}
        >
          <option value="">{label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <motion.label
          className={`
            absolute left-4 pointer-events-none
            transition-all duration-300
            ${error ? 'text-red-500' : isFocused ? 'text-vet-orange-deep' : isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}
          `}
          animate={{
            top: isFocused || hasValue ? '0.5rem' : '50%',
            y: isFocused || hasValue ? 0 : '-50%',
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
        {/* Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors ${isFocused ? 'text-vet-orange-deep' : isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
