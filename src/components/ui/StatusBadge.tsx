interface StatusBadgeProps {
  status: string;
  variant?: 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'auto';
}

export default function StatusBadge({ status, variant = 'auto' }: StatusBadgeProps) {
  const getVariantClass = () => {
    if (variant !== 'auto') {
      return {
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
        green: 'bg-green-100 text-green-800 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        orange: 'bg-orange-100 text-orange-800 border-orange-200',
        red: 'bg-red-100 text-red-800 border-red-200'
      }[variant];
    }

    switch (status) {
      case 'New':
      case 'Discovery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
      case 'Proposal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Qualified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVariantClass()}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${status === 'New' || status === 'Discovery' ? 'bg-blue-400' : 
        status === 'Contacted' || status === 'Proposal' ? 'bg-yellow-400' : 
        status === 'Qualified' ? 'bg-green-400' : 
        status === 'Negotiation' ? 'bg-orange-400' : 
        status === 'Closed' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
      {status}
    </span>
  );
}
