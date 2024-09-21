// src/api.ts
import axios from 'axios';

// API TODO
const api = axios.create({
  baseURL: 'https://todo-caio.azurewebsites.net/api',
});

// Endpoints de Targets
export const getTargets = () => api.get('/target');
export const getTodosByTarget = (targetId: string) => api.get(`/target/${targetId}/todos`);
export const createTarget = (name: string) => api.post('/target', { name });
export const updateTarget = (targetId: string, name: string) => api.put(`/target/${targetId}`, { name });
export const deleteTarget = (targetId: string) => api.delete(`/target/${targetId}`);

// Endpoints de TODOs
export const createTodo = (targetId: string) => api.get(`/todo/${targetId}`);
export const updateTodo = (todoId: string) => api.put(`/todo/${todoId}`);
export const deleteTodo = (todoId: string) => api.delete(`/todo/${todoId}`);
export const getTodoById = (todoId: string) => api.get(`/todo/${todoId}`);

// WeatherAPI
const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
});

export const getWeather = (location: string) =>
  weatherApi.get(`/current.json?key=b00348fabad849f1957233131242009&q=${location}`); // Substitua YOUR_API_KEY pela sua chave
