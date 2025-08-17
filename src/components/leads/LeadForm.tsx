import React from 'react';
import type { Lead } from '../../types';
import Button from '../ui/Button';
import TextInput from '../ui/form/TextInput';
import SelectInput from '../ui/form/SelectInput';
import { useFormState } from '../../hooks/useFormState';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface LeadFormProps {
  lead: Lead;
  onSubmit: (leadId: string, data: Partial<Lead>) => Promise<{ success: boolean, error?: Error }>;
  onCancel: () => void;
  successMessage?: string | null;
}

export default function LeadForm({ lead, onSubmit, onCancel, successMessage }: LeadFormProps) {
  const {
    formData,
    handleChange,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    showSuccess,
    success
  } = useFormState<Partial<Lead>>(lead);
  
  const validateForm = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit(lead.id, formData);
      
      if (result.success) {
        showSuccess('Lead updated successfully');
      } else {
        setError(result.error?.message || 'Failed to update lead');
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
      setError('Failed to update lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displaySuccess = successMessage || success;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      {displaySuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          {displaySuccess}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lead ID</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm">
            {lead.id}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {lead.name}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {lead.company}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <TextInput
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {lead.source}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
            {lead.score}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <SelectInput
            label="Status"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            options={['New', 'Contacted', 'Qualified']}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
