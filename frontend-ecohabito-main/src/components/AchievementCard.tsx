import React from 'react';
import { Achievement } from '../types';
import ProgressBar from './ProgressBar';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const progressPercentage = typeof achievement.progress === 'number' ? achievement.progress : 0;

  return (
    <div 
      className={`p-4 rounded-lg shadow-sm border transition-all duration-300 ${
        achievement.completed 
          ? 'border-yellow-300 bg-yellow-50' 
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3">
          <Trophy className={`h-8 w-8 ${achievement.completed ? 'text-yellow-500' : 'text-gray-400'}`} />
        </div>
        <div>
          <h3 className={`font-medium ${achievement.completed ? 'text-yellow-800' : 'text-gray-800'}`}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </div>
      </div>
      
      <ProgressBar 
        percentage={progressPercentage} 
        color={achievement.completed ? 'bg-yellow-500' : 'bg-blue-500'}
      />
      
      <div className="text-right text-sm text-gray-600">
        {achievement.points} pontos
      </div>
      
      {achievement.completed && (
        <div className="mt-2 text-center">
          <span className="inline-block animate-bounce text-2xl" role="img" aria-label="trophy">
            🏆
          </span>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;