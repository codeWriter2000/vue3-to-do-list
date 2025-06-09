// file with logic of working with local storage, task sorting and tasks filters

import { ref, watch } from 'vue';
import { priorityDict, priorityMap, taskStatusDict, sortingTypesDict } from '@/app-logic/staticData';

const filterKeyName = 'filterStorage'; // local storage key of filter's list
const sortingKeyName = 'sortingTypeStorage'; // local storage key of chosen sorting type

const priorityKeys = Object.keys(priorityDict);
const statusKeys = Object.keys(taskStatusDict);
const sortingTypeKeys = Object.keys(sortingTypesDict);

const defaultStatusFilters = Object.fromEntries(
    statusKeys.map(key => [key, true])
);
const defaultPriorityFilters = Object.fromEntries(
    priorityKeys.map(key => [key, true])
);
const defaultSorting = sortingTypeKeys[0]; // id of the first element in sortingTypesDict object

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

export function appSortingInit() {
    const sortingType = localStorage.getItem(sortingKeyName);

    if (sortingType) {
        console.log('[TO-DO APP]: where is no sorting type storage -> SORTING TYPE STORAGE INITIALIZE');
        localStorage.setItem(sortingKeyName, JSON.stringify(defaultSorting)); // local filter storage initializing
    } else {
        console.log('[TO-DO APP]: start working with initialized before sorting type storage');
    }

    const stRef = ref(sortingType ? JSON.parse(sortingType) : defaultSorting); // initializing reactive vue variable
    
    watch(stRef, (newValue) => {
        localStorage.setItem(sortingKeyName, JSON.stringify(newValue))
    }, {deep: true}) // data synchronization

    return stRef;
}

export function sortTaskList(taskList, sortingType) {
    // taskList - list with task objects
    // sortingType - type of sorting task objects in list

    let exList;

    if (taskList.length > 1) {

        if (sortingType === 'sortByDateAsc') {
            exList = taskList.sort((a, b) => new Date(a.create) - new Date(b.create));
        } // sorting by creation date ASC

        if (sortingType === 'sortByDateDesc') {
            exList = taskList.sort((a, b) => new Date(b.create) - new Date(a.create));
        } // sorting by creation date DESC

        if (sortingType === 'sortByPriorityAsc') {
            exList = taskList.sort((a, b) => {
                const aIdx = priorityMap[a.priority] ?? Infinity;
                const bIdx = priorityMap[b.priority] ?? Infinity;
                return aIdx - bIdx;
            });
        } // sorting by task priority ASC

        if (sortingType === 'sortByPriorityDesc') {
            exList = taskList.sort((a, b) => {
                const aIdx = priorityMap[a.priority] ?? Infinity;
                const bIdx = priorityMap[b.priority] ?? Infinity;
                return bIdx - aIdx;
            });
        } // sorting by task priority DESC

    } else {
        exList = taskList;
    }

    return exList;
} // sorting tasks by chosen type of sorting
