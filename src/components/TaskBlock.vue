<template>

<ModalWindow ref="modal">
    <template #modal-content>
        <TaskForm :task="task" @closeModal="closeModalWindow('В существующую задачу внесены правки')"/>
    </template>
</ModalWindow><!--  component w teleport to index.html (modal form container)  -->

<div class="row rounded border shadow py-2 align-items-center mb-2">
    <div class="col-12 text-center col-xxl text-xxl-start">
        <span class="">{{ task.title }}</span>&ensp;
        <span>(от {{ creationDate }})</span>
    </div><!--  name of task  -->
    <div class="col-12 text-center col-xxl-2">
        <span class="">
            {{ taskPriority }}
        </span>
    </div><!--  priority of task  -->
    <div class="col-12 text-center col-xxl-2">
        <span :class="deadEndClass" v-html="deadEndDate"></span>
    </div><!--  date of create  -->
    <div id="btn-interface" class="col-12 text-center col-xxl-3 text-xxl-end">
        <button class="btn btn-outline-danger" @click="deleteMe">
            <img src="@/../public/icons/trash-can-icon.png" alt="delete" class="icon">
        </button><!--  delete  -->
        <button class="btn btn-outline-warning" @click="showModalWindow">
            <img src="@/../public/icons/edit-icon.png" alt="edit" class="icon">
        </button><!--  edit  -->
        <button class="btn btn-outline-primary" @click="changeVisibility">
            <img v-if="this.isShow" src="@/../public/icons/hide-icon.png" alt="hide" class="icon">
            <img v-else src="@/../public/icons/show-icon.png" alt="show" class="icon">
        </button><!--  show comment  -->
        <button class="btn btn-outline-success" @click="changeStatus"
        >
            <img src="@/../public/icons/done-icon.png" alt="done" class="icon">
        </button><!--  change status  -->
    </div><!--  work with interface  -->
    <div v-if="this.isShow" id="comment-about-task" class="col-12">
        <hr>
        <p v-if="task.comment" class="fst-italic text-start">
            {{ task.comment }}
        </p>
        <p v-else class="fw-bolder fst-italic text-center">
            Комментарий по данной задаче отсутствует...
        </p>
    </div>
</div><!-- TaskBlock  -->
<BannerWrap ref="banner"/><!--  component w teleport to index.html (modal info banner)  -->

</template>

<script>

import ModalWindow from '@/components/ModalWindow.vue';
import TaskForm from '@/components/TaskForm.vue';
import BannerWrap from '@/components/BannerWrap.vue';

import { inject } from 'vue';
import { priorityDict } from '@/app-logic/staticData';
import { delTask, changeTaskStatus } from '@/app-logic/appTaskLogic';

export default {
    name: 'TaskBlock',
    emits: ['goodbye'],
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    components: {
        ModalWindow,
        TaskForm,
        BannerWrap,
    },
    setup() {
        const taskStorage = inject('taskStorage');
        return { taskStorage };
    },
    data() {
        return {
            isShow: false,
            isDone: this.task.status,
        };
    },
    computed: {
        creationDate() {
            let exStr;
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            if (this.task.create) {
                const creationDate = new Date(this.task.create);
                exStr = creationDate.toLocaleDateString('ru-RU', options);
            } else {
                exStr = '...'
            }

            return exStr;
        }, // свойство вычисляющее дату создания задачи (русская локаль)
        deadEndDate() {
            let exStr;
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            const now = new Date();

            if (this.task.deadEnd && !this.task.status) {
                const deadEnd = new Date(this.task.deadEnd);

                const dateCondition = deadEnd.getDate() === now.getDate();
                const monthCondition = deadEnd.getMonth() === now.getMonth();
                const yearCondition = deadEnd.getFullYear() === now.getFullYear();

                if (dateCondition && monthCondition && yearCondition) {
                    exStr = 'срок сегодня';
                } else {
                    if (deadEnd > now) {
                        exStr = `срок до ${deadEnd.toLocaleDateString('ru-RU', options)}`;
                    } else {
                        exStr = `просрочена<br>${deadEnd.toLocaleDateString('ru-RU', options)}`;
                    }
                }
            } else if (this.task.status) {
                exStr = 'задача выполнена';
            }

            return exStr;
        }, // свойство вычисляющее конечную дату выполнения задачи (русская локаль)
        taskPriority() {
            return this.task.priority ? priorityDict[this.task.priority] : 'приоритет не задан';
        },
        deadEndClass() {
            let exClassTxt;
            const now = new Date();
            if (this.task.deadEnd && !this.task.status) {
                const deadEnd = new Date(this.task.deadEnd);
                if (deadEnd < now) {
                    exClassTxt = 'text-danger fw-bolder';
                } else {
                    exClassTxt = '';
                }
            } else if (this.task.status) {
                exClassTxt = 'text-success fw-bolder';
            }
            return exClassTxt;
        }
    },
    methods: {
        changeVisibility() {
            this.isShow = !this.isShow;
        }, // смена состояния отображения комментария к задаче
        changeStatus() {
            this.isDone = !this.isDone;
            changeTaskStatus(this.task.id, this.taskStorage);
        }, // смена статуса задачи
        deleteMe() {
            const decision = confirm(`Вы удаляете задачу с названием - ${this.task.title}`);
            if (decision) {
                this.$emit('goodbye');
                delTask(this.task.id, this.taskStorage);
            }
        }, // удаление задачи из local storage
        showModalWindow() {
            this.$refs.modal.showModal();
        },
        closeModalWindow(bannerText) {
            this.$refs.modal.hideModal();            
            if (bannerText) {
                this.$refs.banner.showBanner(bannerText);
            }
        },
    },
};

</script>

<style>

#btn-interface button {
    margin-left: 0.5rem;
}

#btn-interface button:first-child {
    margin-left: 0;
}

</style>
