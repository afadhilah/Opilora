import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface ComparisonTableProps {
  headers: string[];
  rows: (string | number)[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-200">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left py-3 px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-surface-700 transition-colors">
                  {h}
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 text-surface-700 tabular-nums">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
