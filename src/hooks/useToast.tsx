import { useContext } from 'react';

import { ToastContext } from '@src/contexts';

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
};

export { useToast };
