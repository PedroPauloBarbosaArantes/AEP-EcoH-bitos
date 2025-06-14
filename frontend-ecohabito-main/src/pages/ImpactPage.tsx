import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import ImpactVisualizer from '../components/ImpactVisualizer';
import { Calendar, CalendarCheck, Info } from 'lucide-react';

const ImpactPage: React.FC = () => {
  const { stats } = useTasks();
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nenhuma atividade ainda';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8 border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Seu Impacto Sustentável</h2>
        <p className="text-gray-700">
          Veja como suas ações sustentáveis diárias se acumulam para fazer uma diferença real para o planeta.
          Cada pequena ação contribui para uma mudança ambiental positiva significativa.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Linha do Tempo de Atividades</h3>
          </div>
          
          <div className="border-l-2 border-green-300 pl-4 ml-3 space-y-4">
            <div className="relative">
              <div className="absolute -left-[1.625rem] w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm text-gray-500">Última Atividade</p>
                <p className="font-medium">{formatDate(stats.lastCompletedDate)}</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[1.625rem] w-4 h-4 rounded-full bg-green-300"></div>
              <div>
                <p className="text-sm text-gray-500">Sequência Iniciada</p>
                <p className="font-medium">
                  {stats.streak > 0 
                    ? formatDate(new Date(Date.now() - ((stats.streak - 1) * 86400000)).toDateString()) 
                    : 'Ainda não iniciado'}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[1.625rem] w-4 h-4 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-500">Primeiro Acesso</p>
                <p className="font-medium">Hoje</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center mb-4">
            <CalendarCheck className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Estatísticas de Sustentabilidade</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Sequência Atual</span>
              <span className="font-semibold text-lg">{stats.streak} dias</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Total de Ações Concluídas</span>
              <span className="font-semibold text-lg">{stats.tasksCompleted}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Pontuação de impacto</span>
              <span className="font-semibold text-lg">{stats.impactScore} pontos</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avaliação de Consistência</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} role="img" aria-label="leaf" className={i < Math.min(stats.streak, 5) ? 'text-green-500' : 'text-gray-300'}>
                    🍃
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ImpactVisualizer />
      
      <div className="mt-8 bg-blue-50 rounded-lg p-5 border border-blue-200">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-1">Sobre os Cálculos de Impacto</h3>
            <p className="text-gray-700 text-sm">
              Esses cálculos são estimativas com base no uso médio de recursos e fatores de emissão.
              O impacto ambiental exato varia com base na sua localização, fontes de energia específicas
              e outros fatores. O objetivo é fornecer uma medida relativa do seu impacto positivo
              por meio de hábitos sustentáveis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;