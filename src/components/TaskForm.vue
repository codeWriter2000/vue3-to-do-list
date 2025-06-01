<template>

<div>

    <form class="container">
        <div id="form-title" class="row">
            <p class="p-0 m-0 text-center fw-bolder">
                {{ formTitle }}
            </p>
        </div><!--  form title  -->
        <div class="row">
            <label for="task-title" class="form-label">
                Наименование задачи:
                <input id="task-title" class="form-control my-1" type="text" placeholder="Введите текст ..." v-model="localTask.title">
            </label><!--  task title  -->
        </div>
        <div class="row">
            <label for="task-priority" class="form-label col-12 col-lg-6">
                Приоритет задачи:
                <select  id="task-priority" class="form-select my-1" v-model="localTask.priority">
                    <option v-for="(item, idx) in taskPriority" :key="idx" :id="idx" :value="idx">{{item}}</option>
                </select>
            </label><!--  task priority  -->
            <label for="task-dead-end" class="form-label col-12 col-lg-6">
                Срок контроля:
                <input id="task-dead-end" class="form-control my-1" type="date" v-model="formattedDateOfDeadEnd">
            </label><!--  task dead end date  -->
        </div>
        <div class="row">
            <label for="task-comment" class="form-label">
                Комментарий:
                <textarea id="task-comment" class="form-control my-1" rows="4" placeholder="Введите текст ..." v-model="localTask.comment"></textarea>
            </label><!--  task comment  -->
        </div>
        <div class="row justify-content-center my-3">
            <button @click.prevent="saveBtnClick" id="save-btn" class="btn btn-primary col-4">
                Сохранить
            </button>
        </div>
    </form>

</div><!--  create / edit task form  -->

</template>

<script>

import { inject } from 'vue';
import { priorityDict } from '@/app-logic/staticData';
import { addNewTask } from '@/app-logic/appLocalStorageLogic';

export default {
    name: 'TaskForm',
    emits: [],
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup() {
        const taskStorage = inject('taskStorage');
        return { taskStorage };
    },
    data() {
        return {
            taskPriority: { ...priorityDict },
            localTask: { ...this.task },
        };
    },
    computed: {
        formTitle() {
            return Object.keys(this.task).length ? 'Редактирование задачи' : 'Добавление задачи';
        },
        formattedDateOfDeadEnd: {
            get() {
                let exStr;

                if (this.localTask.deadEnd) {
                    exStr = this.localTask.deadEnd.toISOString().split('T')[0];
                } else {
                    exStr = '';
                }
                
                return exStr;
            },
            set(value) {
                this.localTask.deadEnd = value ? new Date(value) : null;
            }
        },
    },
    methods: {
        saveBtnClick() {
            console.log(this.taskStorage);
            addNewTask(this.localTask, this.taskStorage);
        }
    },
};

</script>

<style></style>
