import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import AchievementCard from '../components/AchievementCard';

const AchievementsPage: React.FC = () => {
  const { achievements } = useTasks();
  
  const unlockedAchievements = achievements.filter(achievement => achievement.completed);
  const lockedAchievements = achievements.filter(achievement => !achievement.completed);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Sua Jornada de Sustentabilidade</h2>
        <p className="text-gray-700">
          Acompanhe seu progresso e conquiste realizações enquanto constrói hábitos sustentáveis.
          Cada conquista representa um marco em seu estilo de vida ecológico.
        </p>
      </div>
      
      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Conquistas Desbloqueadas</h2>
            <div className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
              {unlockedAchievements.length} de {achievements.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {unlockedAchievements.length > 0 ? 'Next Challenges' : 'Conquistas Desbloqueáveis'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lockedAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
      
      {unlockedAchievements.length === achievements.length && (
        <div className="mt-8 text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Todas as Conquistas Desbloqueadas!</h3>
          <p className="text-gray-700">
            Parabéns por se tornar um campeão da sustentabilidade! Seu compromisso com
            hábitos ecológicos está fazendo uma diferença real.
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;