import { useState } from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import AchievementsPage from './pages/AchievementsPage';
import ImpactPage from './pages/ImpactPage';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'impact':
        return <ImpactPage />;
      default:
        return <TasksPage />;
    }
  };

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-grow py-6">
          {renderContent()}
        </main>
        <footer className="bg-green-900 text-green-100 py-4 text-center text-sm">
          <div className="container mx-auto">
            <p>EcoHábitos: Construindo Lares Sustentáveis Uma Ação por Vez</p>
            <p className="mt-1 text-xs text-green-300">© 2025 Iniciativa de Sustentabilidade</p>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;