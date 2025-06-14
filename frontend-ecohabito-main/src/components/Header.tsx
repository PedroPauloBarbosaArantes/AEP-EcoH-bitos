import React from 'react';
import { Leaf } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-300 mr-2" />
            <h1 className="text-2xl font-bold">EcoHábitos</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'tasks' 
                  ? 'bg-white text-green-800' 
                  : 'text-green-100 hover:bg-green-600'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              Tarefas
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'achievements' 
                  ? 'bg-white text-green-800' 
                  : 'text-green-100 hover:bg-green-600'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              Conquistas
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'impact' 
                  ? 'bg-white text-green-800' 
                  : 'text-green-100 hover:bg-green-600'
              }`}
              onClick={() => setActiveTab('impact')}
            >
              Impacto
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;