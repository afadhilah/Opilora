import React from 'react';

interface NetworkGraphProps {
  nodes: { id: string; label: string; size: number; color?: string }[];
  height?: number;
}

export function NetworkGraph({ nodes, height = 300 }: NetworkGraphProps) {
  const centerX = 50;
  const centerY = 50;
  const radius = 35;

  return (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <line key={`line-${node.id}`} x1={centerX} y1={centerY} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="0.3" />
          );
        })}
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const nodeSize = 2 + (node.size / 100) * 4;
          return (
            <g key={node.id}>
              <circle cx={x} cy={y} r={nodeSize} fill={node.color || '#3b6bfa'} opacity={0.8} />
              <text x={x} y={y + nodeSize + 3} textAnchor="middle" fontSize="2.5" fill="#64748b">{node.label}</text>
            </g>
          );
        })}
        <circle cx={centerX} cy={centerY} r={3} fill="#3b6bfa" />
        <text x={centerX} y={centerY + 6} textAnchor="middle" fontSize="2.5" fill="#0f172a" fontWeight="600">Hub</text>
      </svg>
    </div>
  );
}
