import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import { BarChartIcon, TrendingUp } from 'lucide-react';

const ImpactVisualizer: React.FC = () => {
  const { stats } = useTasks();
  
  const co2Saved = stats.tasksCompleted * 0.5; 
  const waterSaved = stats.tasksCompleted * 10; 
  const energySaved = stats.tasksCompleted * 0.2; 
  const wasteDiverted = stats.tasksCompleted * 0.3;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Seu impacto ambiental</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-5 rounded-lg">
          <div className="flex items-center mb-4">
            <BarChartIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">Recursos Economizados</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Água Economizada</span>
                <span className="font-medium">{waterSaved.toFixed(1)} litros</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(waterSaved / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Energia Economizada</span>
                <span className="font-medium">{energySaved.toFixed(1)} kWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(energySaved / 5 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-5 rounded-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Emissões & Resíduos</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">CO₂ Emissões Evitadas</span>
                <span className="font-medium">{co2Saved.toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(co2Saved / 10 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resíduos Desviados</span>
                <span className="font-medium">{wasteDiverted.toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(wasteDiverted / 5 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Equivalente de Sustentabilidade</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-green-700 text-3xl font-bold mb-1">
              {(co2Saved / 8).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Árvores plantadas por um ano</p>
          </div>
          
          <div className="text-center">
            <div className="text-blue-700 text-3xl font-bold mb-1">
              {(waterSaved / 40).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Banhos economizados</p>
          </div>

          <div className="text-center">
            <div className="text-yellow-700 text-3xl font-bold mb-1">
              {(energySaved / 0.1).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Horas de uso de lâmpadas economizadas</p>
          </div>

          <div className="text-center">
            <div className="text-purple-700 text-3xl font-bold mb-1">
              {(wasteDiverted / 0.1).toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Garrafas plásticas desviadas de aterros</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactVisualizer;