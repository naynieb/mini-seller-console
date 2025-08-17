import { useState, useCallback } from 'react';

export function useFormState<T>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  })), []);
  
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setError(null);
    setSuccess(null);
  }, [initialData]);
  
  const showSuccess = useCallback((message: string) => {
    setSuccess(message);
    setError(null);
    
    const timer = setTimeout(() => setSuccess(null), 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const showError = useCallback((message: string) => {
    setError(message);
    setSuccess(null);
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    success,
    setSuccess,
    showSuccess,
    showError,
    resetForm
  };
}
