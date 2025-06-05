<template>

<div>
    <form class="container">
        <div id="form-title" class="row mb-2">
            <p class="p-0 m-0 text-center fw-bolder">
                Сортировка и фильтрация
            </p>
        </div><!--  form title  -->
        <div class="row mx-2 mb-3">
            <div id="filter-title" class="col-12 text-center">
                <span>Фильтры</span>
            </div>
            <div id="priority-filter" class="col-12 col-xxl-6 mt-2 text-center border-start border-end">
                <span class="col-12 text-decoration-underline">по приоритету:</span>
                <div class="container">
                    <label v-for="(item, idx) in taskPriority" :key="idx" :for="idx" class="row form-check-label col-12 my-1 align-items-center">
                        <input :id="idx" class="form-check-input col-1" type="checkbox" v-model="localFilters.priorityFilter[idx]">
                        <span class="col">{{ item }}</span>
                    </label>
                </div>
            </div><!--  priority filters  -->
            <div id="priority-filter" class="col-12 col-xxl-6 mt-2 text-center border-start border-end">
                <span class="col-12 text-decoration-underline">по статусу:</span>
                <div class="container">
                    <label v-for="(item, idx) in taskStatus" :key="idx" :for="idx" class="row form-check-label col-12 my-1 align-items-center">
                        <input :id="idx" class="form-check-input col-1" type="checkbox" v-model="localFilters.statusFilter[idx]">
                        <span class="col">{{ item }}</span>
                    </label>
                </div>
            </div><!--  task status filters  -->
        </div><!--  filters  -->
    </form>
</div>

</template>

<script>

import { inject } from 'vue';
import { priorityDict, taskStatusDict } from '@/app-logic/staticData';

export default {
    name: 'FilteringAndSorting',
    setup() {
        const filterStorage = inject('filterStorage');
        return { filterStorage }
    },
    data() {
        return {
            taskPriority: priorityDict,
            taskStatus: taskStatusDict,
            localFilters: { ...this.filterStorage },
        };
    },
    methods: {},
};

</script>

<style></style>
