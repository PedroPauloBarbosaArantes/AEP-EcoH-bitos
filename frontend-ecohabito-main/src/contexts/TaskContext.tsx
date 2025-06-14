import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SustainableTask, Achievement, UserStats } from '../types';
import { tasks as initialTasks } from '../data/tasks';
import { taskService, achievementService, statsService } from '../services/api';

interface TaskContextType {
  tasks: SustainableTask[];
  achievements: Achievement[];
  stats: UserStats;
  toggleTask: (id: number) => Promise<void>;
  resetDailyTasks: () => Promise<void>;
  getCompletionPercentage: () => number;
  getCategoryCompletionPercentage: (category: string) => number;
  createTask: (task: Partial<SustainableTask>) => Promise<void>;
  updateTask: (id: number, task: Partial<SustainableTask>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<SustainableTask[]>(initialTasks);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<UserStats>({
    tasksCompleted: 0,
    streak: 0,
    impactScore: 0,
    lastCompletedDate: new Date().toISOString()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, achievementsResponse, statsResponse] = await Promise.all([
          taskService.getAll(),
          achievementService.getAll(),
          statsService.get()
        ]);

        const fetchedTasks = tasksResponse.data;
        // Combina as tarefas do backend com as tarefas pré-carregadas
        const allTasks = [...initialTasks, ...fetchedTasks];
        // Remove duplicatas baseado no ID
        const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values());
        setTasks(uniqueTasks);
        setAchievements(achievementsResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Em caso de erro, mantém as tarefas pré-carregadas
        setTasks(initialTasks);
      }
    };

    fetchData();
  }, []);

  const createTask = async (taskData: Partial<SustainableTask>) => {
    try {
      const response = await taskService.create(taskData);
      const newTask = response.data;
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      // Em caso de erro, adiciona a tarefa localmente
      const newTask = {
        ...taskData,
        id: Math.max(...tasks.map(t => t.id)) + 1,
        completed: false
      } as SustainableTask;
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };

  const updateTask = async (id: number, taskData: Partial<SustainableTask>) => {
    try {
      const response = await taskService.update(id.toString(), taskData);
      const updatedTask = response.data;
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      // Em caso de erro, atualiza localmente
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === id ? { ...task, ...taskData } : task
      ));
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.delete(id.toString());
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      // Em caso de erro, remove localmente
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const response = await taskService.toggle(id.toString());
        const updatedTask = response.data;
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === id ? updatedTask : task
        ));
      } catch (error) {
        console.error('Erro ao alternar status da tarefa:', error);
        // Em caso de erro, atualiza localmente
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      }
    }
  };

  const resetDailyTasks = async () => {
    try {
      // Atualiza todas as tarefas para não completadas
      const updatedTasks = tasks.map(task => ({ ...task, completed: false }));
      await Promise.all(updatedTasks.map(task => taskService.update(task.id.toString(), task)));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Erro ao resetar tarefas diárias:', error);
    }
  };

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  const getCategoryCompletionPercentage = (category: string) => {
    const categoryTasks = tasks.filter(task => task.category === category);
    if (categoryTasks.length === 0) return 0;
    const completedCategoryTasks = categoryTasks.filter(task => task.completed).length;
    return (completedCategoryTasks / categoryTasks.length) * 100;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        achievements,
        stats,
        toggleTask,
        resetDailyTasks,
        getCompletionPercentage,
        getCategoryCompletionPercentage,
        createTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};
