// file with the logic of working with local storage

import { ref, watch } from 'vue';

const keyName = 'taskStorage'; // local storage key

function genTaskID() {
    const randNum = Math.random();
    return randNum.toString().split('.')[1];
} // task id generation

export function ToDoAppInit() {
    const ts = localStorage.getItem(keyName);
    const defaultVal = [];

    if (ts === null) {
        console.log('[TO-DO APP]: where is no task storage -> TASK STORAGE INITIALIZE');
        localStorage.setItem(keyName, JSON.stringify(defaultVal)); // local task storage initializing
    } else {
        console.log('[TO-DO APP]: start working with initialized before task storage');
    }

    const tsRef = ref(ts ? JSON.parse(ts) : defaultVal); // initializing reactive vue variable

    watch(tsRef, (newValue) => {
        localStorage.setItem(keyName, JSON.stringify(newValue))
    }, {deep: true}) // data synchronization

    return tsRef;
} // initialize tasks local storage 

export function addNewTask(taskObj, taskListRef) {
    // taskObj - object with task data and information
    // taskListRef - reactive array with task objects

    taskObj.id = genTaskID(); // task ID
    taskObj.create = new Date(); // creation date
    taskObj.status = false; // task status (default)
    taskListRef.push(taskObj); // pushing into reactive variable
} // function to push new task object into task array

export function delTask(id, taskListRef) {
    // id - id of deleting task object
    // taskListRef - reactive array with task objects

    const index = taskListRef.findIndex(obj => obj.id === id);
    taskListRef.splice(index, 1);
} // function to delete task from local storage task array

export function changeTaskStatus(id, taskListRef) {
    // id - id of updating task object
    // taskListRef - reactive array with task objects

    const index = taskListRef.findIndex(obj => obj.id === id);
    taskListRef[index].status = !taskListRef[index].status;
} // function to change status of task

export function editTask(taskObj, taskListRef) {
    // taskObj - object with task data and information
    // taskListRef - reactive array with task objects

    const index = taskListRef.findIndex(obj => obj.id === taskObj.id);
    Object.assign(taskListRef[index], taskObj);
} // function to edit data about task
