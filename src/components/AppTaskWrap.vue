<template>

<div id="task-wrap" class="container-fluid d-flex flex-column rounded border border-primary shadow">
    <div id="task-header" class="row py-2 align-items-center justify-content-center border-bottom">
        <div class="col">
            <span class="fs-6 fw-bolder">Список задач</span>
        </div>
    </div><!--  task header  -->
    <div id="task-container" class="row overflow-auto flex-grow-1 py-2 px-2 el-w-scroll">
        <div v-if="localTaskList">
            <TaskBlock v-for="(item, idx) in localTaskList" :key="idx" :task="item" :id="idx"/>
        </div>
        <div v-else>
            <p class="fs-4 fw-bolder fst-italic text-center mt-5">
                Сейчас задач нет. Добавьте новую!
            </p>
        </div>
    </div><!--  task container  -->
</div><!--  AppTaskWrap  -->

</template>

<script>

import TaskBlock from '@/components/TaskBlock.vue';

export default {
    name: 'AppTaskWrap',
    components: {
        TaskBlock,
    },
    data() {
        return {
            localTaskList: {
                'tusk-1': {
                    create: new Date(),
                    deadEnd: new Date(),
                    priority: 0,
                    title: 'Новая задача',
                    comment: 'Сопроводительный текст к нашей задаче',
                    status: false,

                },
            }, // объект объектов задач
        };
    },
};

</script>

<style>

#task-wrap {
    height: 80vh;
    max-height: 80vh;
}

</style>