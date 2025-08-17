import React from 'react';
import type { Opportunity, OpportunityStage } from '../../types';
import Button from '../ui/Button';
import TextInput from '../ui/form/TextInput';
import SelectInput from '../ui/form/SelectInput';
import { useFormState } from '../../hooks/useFormState';
import { Square3Stack3DIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface OpportunityFormProps {
  initialData: {
    name: string;
    stage: OpportunityStage;
    amount: string;
    accountName: string;
  };
  onSubmit: (data: Omit<Opportunity, 'id'>) => Promise<{ success: boolean, error?: Error }>;
  onCancel: () => void;
}

export default function OpportunityForm({ initialData, onSubmit, onCancel }: OpportunityFormProps) {
  const {
    formData,
    handleChange,
    isSubmitting,
    setIsSubmitting,
    error,
    setError
  } = useFormState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.accountName) {
      setError('Name and Account Name are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit({
        name: formData.name,
        stage: formData.stage as OpportunityStage,
        amount: formData.amount ? parseFloat(formData.amount) : undefined,
        accountName: formData.accountName
      });
    } catch (err) {
      console.error('Failed to create opportunity:', err);
      setError('Failed to create opportunity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
          <Square3Stack3DIcon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Create Opportunity</h3>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <TextInput
            label="Opportunity Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter opportunity name"
            required
          />
        </div>
        
        <div>
          <SelectInput
            label="Stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            options={['Discovery', 'Proposal', 'Negotiation', 'Closed']}
            required
          />
        </div>
        
        <div>
          <TextInput
            label="Amount (Optional)"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            placeholder="0.00"
          />
        </div>
        
        <div className="md:col-span-2">
          <TextInput
            label="Account Name"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Enter account name"
            required
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
          variant="success"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Opportunity'}
        </Button>
      </div>
    </form>
  );
}
