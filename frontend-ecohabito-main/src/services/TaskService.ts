import { SustainableTask } from '../types';

class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  async getAll(): Promise<SustainableTask[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  async create(task: Partial<SustainableTask>): Promise<SustainableTask> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async update(id: number, task: Partial<SustainableTask>): Promise<SustainableTask> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}

export const taskService = new TaskService(); 