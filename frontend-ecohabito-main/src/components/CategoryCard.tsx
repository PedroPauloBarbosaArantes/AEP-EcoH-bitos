import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { getCategoryCompletionPercentage } = useTasks();
  const completionPercentage = getCategoryCompletionPercentage(category.id);
  
  const renderIcon = (iconName: string) => {
    const Icon = ((LucideIcons as unknown) as Record<string, React.FC<{ className?: string }>>)[iconName];
    return Icon ? (
      <Icon className="h-10 w-10 text-white" />
    ) : null;
  };

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className={`${category.color} p-4`}>
        <div className="flex justify-between items-center">
          <div className="bg-white bg-opacity-30 rounded-full p-2">
            {renderIcon(category.icon)}
          </div>
          <div className="text-white text-lg font-bold">{completionPercentage}%</div>
        </div>
        <h3 className="text-white text-xl font-semibold mt-3">{category.name}</h3>
      </div>
      
      <div className="bg-white p-3">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`${category.color.replace('bg-', 'bg-')} h-2 rounded-full transition-width duration-700`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;