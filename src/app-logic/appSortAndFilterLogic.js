// file with logic of working with local storage, task sorting and tasks filters

import { ref, watch } from 'vue';
import { priorityDict, taskStatusDict } from '@/app-logic/staticData';

const filterKeyName = 'filterStorage'; // local storage key of filter's list

const priorityKeys = Object.keys(priorityDict);
const statusKeys = Object.keys(taskStatusDict);

const defaultStatusFilters = Object.fromEntries(
    statusKeys.map(key => [key, true])
);
const defaultPriorityFilters = Object.fromEntries(
    priorityKeys.map(key => [key, true])
);

const defaultFilters = {
    statusFilter: { ...defaultStatusFilters },
    priorityFilter: { ...defaultPriorityFilters },
}; // object with filters for tasks

export function appFilterInit() {
    const filters = localStorage.getItem(filterKeyName);

    if (filters === null) {
        console.log('[TO-DO APP]: where is no filter storage -> FILTER STORAGE INITIALIZE');
        localStorage.setItem(filterKeyName, JSON.stringify(defaultFilters)); // local filter storage initializing
    } else {
        console.log('[TO-DO APP]: start working with initialized before filter storage');
    }

    const fsRef = ref(filters ? JSON.parse(filters) : defaultFilters); // initializing reactive vue variable
    
    watch(fsRef, (newValue) => {
        localStorage.setItem(filterKeyName, JSON.stringify(newValue))
    }, {deep: true}) // data synchronization

    return fsRef;
}
