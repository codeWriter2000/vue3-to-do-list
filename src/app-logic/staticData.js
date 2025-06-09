// file with static data for app

export const priorityDict = {
    p0: 'стандартный приоритет', // routine task
    p1: 'низкий приоритет', // low priority task
    p2: 'высокий приоритет', // highest priority task
};

const priorityOrder = ['p1', 'p0', 'p2']; // sorted keys of priority dictionary object

export const priorityMap = priorityOrder.reduce((acc, item, idx) => {
    acc[item] = idx;
    return acc;
}, {}); // array => object to fast working 
        
export const taskStatusDict = {
    ts0: 'невыполненные задачи', // task status is 'false'
    ts1: 'выполненные задачи', // task status is 'true'
};

export const sortingTypesDict = {
    sortByDateAsc: 'Сортировка по дате создания (от старых к новым)', // sorting by creation date ASC
    sortByDateDesc: 'Сортировка по дате создания (от новых к старым)', // sorting by creation date DESC
    sortByPriorityAsc: 'Сортировка по приоритету задач (по возрастанию значимости)', // sorting by task priority ASC
    sortByPriorityDesc: 'Сортировка по приоритету задач (по уменьшению значимости)', // sorting by task priority DESC
};
