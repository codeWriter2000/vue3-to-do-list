// eslint-disable-next-line
import { createApp, provide } from 'vue';
import App from './App.vue';
import { ToDoAppInit } from '@/app-logic/appTaskLogic';
import { appFilterInit, appSortingInit } from '@/app-logic/appSortAndFilterLogic';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const app = createApp(App);

const taskStorage = ToDoAppInit(); // task local storage initializing
const filterStorage = appFilterInit(); // filter local storage initializing
const sortingStorage = appSortingInit(); // sorting type local storage initializing

app.provide('taskStorage', taskStorage); // reactive list with task objects
app.provide('filterStorage', filterStorage); // reactive variable with task filters
app.provide('sortingStorage', sortingStorage); // reactive variable with sorting type
app.mount('#app');
