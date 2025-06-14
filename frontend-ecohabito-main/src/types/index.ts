export enum TaskCategory {
  ENERGIA = 'ENERGIA',
  AGUA = 'AGUA',
  RECICLAGEM = 'RECICLAGEM',
  ALIMENTACAO = 'ALIMENTACAO'
}

export enum TaskDifficulty {
  FACIL = 'FACIL',
  MEDIO = 'MEDIO',
  DIFICIL = 'DIFICIL'
}

export interface SustainableTask {
  id: number;
  title: string;
  description: string;
  category: TaskCategory;
  impact: string;
  difficulty: TaskDifficulty;
  completed: boolean;
}

export interface Category {
  id: TaskCategory;
  name: string;
  icon: string;
  color: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  points: number;
  completed: boolean;
}

export interface UserStats {
  id?: string;
  tasksCompleted: number;
  streak: number;
  impactScore: number;
  lastCompletedDate: string;
  createdAt?: string;
  updatedAt?: string;
}