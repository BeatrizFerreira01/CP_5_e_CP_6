// src/api.ts
import axios from 'axios';

// API TODO
const api = axios.create({
  baseURL: 'https://todo-caio.azurewebsites.net/api',
});

// Endpoints de Targets
export const getTargets = () => api.get('/Targets');
export const getTodosByTarget = (targetId: string) => api.get(`/targets/${targetId}/todos`);
export const createTarget = (name: string) => api.post('/targets', { title: name }); // Corrigido o endpoint
export const updateTarget = (targetId: string, name: string) => api.put(`/targets/${targetId}`, { name }); // Corrigido o endpoint
export const deleteTarget = (targetId: string) => api.delete(`/targets/${targetId}`); // Verifique aqui

// Endpoints de TODOs
export const createTodo = (targetId: string, todoDescription: string) => api.post(`/Todo`, { targetId, todoDescription }); // Corrigido o método
export const updateTodo = (todoId: string) => api.put(`/todos/ ${todoId}`); // Corrigido o método`);
export const deleteTodo = (todoId: string) => api.delete(`/todos/${todoId}`);
export const getTodoById = (todoId: string) => api.get(`/todos/${todoId}`);

// WeatherAPI
const weatherApi = axios.create({
baseURL: 'https://api.weatherapi.com/v1',
});

export const getWeather = (location: string) =>
weatherApi.get(`/current.json?key=b00348fabad849f1957233131242009&q=${location}`);
