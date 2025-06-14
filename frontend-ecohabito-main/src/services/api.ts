import axios from 'axios';
import { SustainableTask, Achievement, UserStats } from '../types';

const API_URL = 'http://localhost:8081/api';

const taskService = {
  getAll: () => axios.get<SustainableTask[]>(`${API_URL}/tasks`),
  getById: (id: string) => axios.get<SustainableTask>(`${API_URL}/tasks/${id}`),
  getByCategory: (category: string) => axios.get<SustainableTask[]>(`${API_URL}/tasks/category/${category}`),
  create: (task: Partial<SustainableTask>) => axios.post<SustainableTask>(`${API_URL}/tasks`, task),
  update: (id: string, task: Partial<SustainableTask>) => axios.put<SustainableTask>(`${API_URL}/tasks/${id}`, task),
  toggle: (id: string) => axios.patch<SustainableTask>(`${API_URL}/tasks/${id}/toggle`),
  delete: (id: string) => axios.delete(`${API_URL}/tasks/${id}`)
};

const achievementService = {
  getAll: () => axios.get<Achievement[]>(`${API_URL}/achievements`),
  getById: (id: string) => axios.get<Achievement>(`${API_URL}/achievements/${id}`),
  getUnlocked: () => axios.get<Achievement[]>(`${API_URL}/achievements/unlocked`),
  create: (achievement: Partial<Achievement>) => axios.post<Achievement>(`${API_URL}/achievements`, achievement),
  update: (id: string, achievement: Partial<Achievement>) => axios.put<Achievement>(`${API_URL}/achievements/${id}`, achievement),
  delete: (id: string) => axios.delete(`${API_URL}/achievements/${id}`)
};

const statsService = {
  get: () => axios.get<UserStats>(`${API_URL}/stats`),
  update: (stats: Partial<UserStats>) => axios.put<UserStats>(`${API_URL}/stats`, stats),
  reset: () => axios.patch(`${API_URL}/stats/reset`)
};

export { taskService, achievementService, statsService }; 