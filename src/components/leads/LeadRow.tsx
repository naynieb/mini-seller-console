import { memo } from 'react';
import StatusBadge from '../ui/StatusBadge';
import type { Lead } from '../../types';

interface LeadRowProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

function LeadRow({ lead, onClick }: LeadRowProps) {
  return (
    <tr 
      onClick={() => onClick(lead)} 
      className="hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{lead.company}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{lead.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{lead.source}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{lead.score}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={lead.status} />
      </td>
    </tr>
  );
}

export default memo(LeadRow);
