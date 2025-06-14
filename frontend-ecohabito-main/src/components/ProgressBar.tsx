import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  color = 'bg-green-500', 
  height = 8,
  label
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`${color} transition-all duration-700 ease-in-out`} 
          style={{ width: `${percentage}%`, height: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;