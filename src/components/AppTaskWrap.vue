<template>

<div id="task-wrap" class="container-fluid d-flex flex-column rounded border border-primary shadow">
    <div id="task-header" class="row py-2 align-items-center justify-content-center border-bottom">
        <div class="col">
            <span class="fs-6 fw-bolder">Список задач</span>
        </div>
    </div><!--  task header  -->
    <div id="task-container" class="row overflow-auto flex-grow-1 py-2 px-2 el-w-scroll">
        <div v-if="localTaskList.length">
            <div v-if="filteredAndSortedTasks.length">
                <TaskBlock v-for="(item, idx) in filteredAndSortedTasks" :key="idx" :task="item" :id="item.id" @goodbye="showMsgAboutDeletedTask"/>
            </div>
            <div v-else>
                <p class="fs-4 fw-bolder fst-italic text-center mt-5">
                    Задач, удовлетворяющих фильтрам, нет...
                </p>
            </div>
        </div>
        <div v-else>
            <p class="fs-4 fw-bolder fst-italic text-center mt-5">
                Сейчас задач нет. Добавьте новую!
            </p>
        </div>
    </div><!--  task container  -->
</div><!--  AppTaskWrap  -->

<BannerWrap ref="banner"/><!--  component w teleport to index.html (modal info banner)  -->

</template>

<script>

import { inject } from 'vue';
import { sortTaskList } from '@/app-logic/appSortAndFilterLogic'
import TaskBlock from '@/components/TaskBlock.vue';
import BannerWrap from '@/components/BannerWrap.vue';

export default {
    name: 'AppTaskWrap',
    components: {
        TaskBlock,
        BannerWrap
    },
    setup() {
        const taskStorage = inject('taskStorage');
        const filterStorage = inject('filterStorage');
        const sortingStorage = inject('sortingStorage');
        return { taskStorage, filterStorage, sortingStorage };
    },
    data() {
        return {
            localTaskList: this.taskStorage, // список объектов задач
            localStatusApproved: this.filterStorage.statusFilter, // объект содержащий булевы значения видимости задач в зависимости от их статуса
            localPriorityApproved: this.filterStorage.priorityFilter, // объект содержащий булевы значения видимости задач в зависимости от их приоритета
        };
    },
    methods: {
        isVisible(localTaskObj) {
            let decision;

            const priority = localTaskObj.priority;
            const status = localTaskObj.status ? 'ts1' : 'ts0'; // приводим в соответствие ключи статичного словаря и значение свойства объекта task

            const priorityCondition = this.localPriorityApproved[priority]; // условие фильтрации по приоритету задачи
            const statusCondition = this.localStatusApproved[status]; // условие фильтрации по статусу задачи

            if (priorityCondition && statusCondition) {
                decision = true;
            } else {
                decision = false;
            }

            return decision
        },
        showMsgAboutDeletedTask() {
            this.$refs.banner.showBanner('Задача безвозвратно удалена!');
        },
    },
    computed: {
        filteredAndSortedTasks() {
            let exList = [];

            for (let i = 0; i < this.localTaskList.length; i += 1) {
                let task = this.localTaskList[i];
                if (this.isVisible(task)) {
                    exList.push(task);
                }
            }

            if (exList.length) {
                exList = sortTaskList(exList, this.sortingStorage);
            }

            return exList;
        },
    },
};

</script>

<style>

#task-wrap {
    height: 80vh;
    max-height: 80vh;
}

</style>