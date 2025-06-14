import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  SelectChangeEvent
} from '@mui/material';
import { SustainableTask, TaskCategory, TaskDifficulty } from '../types';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<SustainableTask>) => Promise<void>;
  task?: SustainableTask;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState<Partial<SustainableTask>>({
    title: '',
    description: '',
    category: TaskCategory.ENERGIA,
    impact: '',
    difficulty: TaskDifficulty.FACIL,
    completed: false
  });

  useEffect(() => {
    if (task) {
      // Converte os valores para o formato correto
      setFormData({
        ...task,
        category: task.category.toUpperCase() as TaskCategory,
        difficulty: task.difficulty.toUpperCase() as TaskDifficulty
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: TaskCategory.ENERGIA,
        impact: '',
        difficulty: TaskDifficulty.FACIL,
        completed: false
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<TaskCategory>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value as TaskCategory
    }));
  };

  const handleDifficultyChange = (e: SelectChangeEvent<TaskDifficulty>) => {
    setFormData(prev => ({
      ...prev,
      difficulty: e.target.value as TaskDifficulty
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando dados do formulário:', formData);
    
    // Converte a categoria para minúsculo e mantém a dificuldade no formato do enum
    const taskData = {
      ...formData,
      category: formData.category?.toLowerCase() as TaskCategory,
      difficulty: formData.difficulty as TaskDifficulty
    };
    
    await onSubmit(taskData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Título"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="description"
              label="Descrição"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                label="Categoria"
              >
                {Object.values(TaskCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="impact"
              label="Impacto"
              value={formData.impact}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Dificuldade</InputLabel>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleDifficultyChange}
                label="Dificuldade"
              >
                {Object.values(TaskDifficulty).map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            {task ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskModal; 