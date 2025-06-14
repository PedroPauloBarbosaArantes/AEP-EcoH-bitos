import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { SustainableTask } from '../types';
import TaskModal from './TaskModal';
import CategoryFilter from './CategoryFilter';
import { CheckCircle, Circle } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

interface TaskItemProps {
  task: SustainableTask;
  onEdit: (task: SustainableTask) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onToggle }) => {
  return (
    <div 
      className={`relative mb-4 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ${
        task.completed ? 'bg-green-50' : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start">
        <div 
          className="flex-shrink-0 cursor-pointer text-2xl mr-3" 
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? (
            <CheckCircle className="text-green-600 h-6 w-6" />
          ) : (
            <Circle className="text-gray-400 hover:text-green-600 h-6 w-6" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 
              className={`text-lg font-medium mb-1 ${
                task.completed ? 'text-green-700' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          
          <div className="flex gap-2 flex-wrap">
            <div 
              className={`text-xs px-3 py-1 rounded-full inline-block ${
                task.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              Impacto: {task.impact}
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800">
              {task.difficulty}
            </div>
          </div>
        </div>
      </div>
      
      {task.completed && (
        <div 
          className="absolute -right-1 -top-1 w-5 h-5 animate-pulse"
          style={{
            animation: 'leaf-float 2s ease-in-out'
          }}
        >
          <span role="img" aria-label="leaf">🍃</span>
        </div>
      )}
    </div>
  );
};

const TaskList: React.FC = () => {
  const { tasks, createTask, updateTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<SustainableTask | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleOpenModal = (task?: SustainableTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(false);
  };

  const handleSubmit = async (taskData: Partial<SustainableTask>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Minhas Tarefas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Nova Tarefa
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar tarefas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <CategoryFilter
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
        />
      </Box>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleOpenModal}
            onToggle={toggleTask}
          />
        ))}
      </div>

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default TaskList; 