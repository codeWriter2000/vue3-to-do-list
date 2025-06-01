// eslint-disable-next-line
import { createApp, provide } from 'vue';
import App from './App.vue';
import { ToDoAppInit } from '@/app-logic/appLocalStorageLogic';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const app = createApp(App)

const taskStorage = ToDoAppInit(); // task local storage initializing

app.provide('taskStorage', taskStorage);
app.mount('#app')
