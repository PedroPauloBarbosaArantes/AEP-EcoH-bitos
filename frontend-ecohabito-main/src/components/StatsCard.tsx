import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Trophy, Zap, Calendar } from 'lucide-react';

const StatsCard: React.FC = () => {
  const { stats, getCompletionPercentage } = useTasks();
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Seu impacto</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pontuação de Impacto</p>
            <p className="text-2xl font-bold text-gray-800">{stats.impactScore}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Sequência Diária</p>
            <p className="text-2xl font-bold text-gray-800">{stats.streak} dias</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Trophy className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tarefas Concluídas</p>
            <p className="text-2xl font-bold text-gray-800">{stats.tasksCompleted}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progresso de Hoje</span>
          <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;