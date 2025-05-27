<template>

<div class="row rounded border shadow py-2 align-items-center">
    <div class="col">
        <span class="">{{ task.title }}</span>&ensp;
        <span>(от {{ creationDate }})</span>
    </div><!--  name of task  -->
    <div class="col-2 text-end">
        <span class="">
            {{ deadEndDate }}
        </span>
    </div><!--  date of create  -->
    <div id="btn-interface" class="col-3 text-end">
        <button class="btn btn-outline-danger">
            <img src="@/../public/icons/trash-can-icon.png" alt="delete" class="icon">
        </button><!--  delete  -->
        <button class="btn btn-outline-warning">
            <img src="@/../public/icons/edit-icon.png" alt="edit" class="icon">
        </button><!--  edit  -->
        <button class="btn btn-outline-primary" @click="changeVisibility">
            <img v-if="this.isShow" src="@/../public/icons/hide-icon.png" alt="hide" class="icon">
            <img v-else src="@/../public/icons/show-icon.png" alt="show" class="icon">
        </button><!--  show comment  -->
        <button :class="['btn', isDone ? 'btn-success' : 'btn-outline-success']" @click="changeTaskStatus"
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

</template>

<script>

export default {
    name: 'TaskBlock',
    emits: [],
    props: {
        task: {
            type: Object,
            required: true,
        },
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
                exStr = this.task.create.toLocaleDateString('ru-RU', options);
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
            const dateCondition = this.task.deadEnd.getDate() === now.getDate();
            const monthCondition = this.task.deadEnd.getMonth() === now.getMonth();
            const yearCondition = this.task.deadEnd.getFullYear() === now.getFullYear();

            if (this.task.deadEnd) {
                if (dateCondition && monthCondition && yearCondition) {
                    exStr = 'срок сегодня';
                } else {
                    exStr = `срок до ${this.task.deadEnd.toLocaleDateString('ru-RU', options)}`;
                }
            } else {
                exStr = '';
            }

            return exStr;
        }, // свойство вычисляющее конечную дату выполнения задачи (русская локаль)
    },
    methods: {
        changeVisibility() {
            this.isShow = !this.isShow;
        }, // смена состояния отображения комментария к задаче
        changeTaskStatus() {
            this.isDone = !this.isDone;
        }, // смена статуса задачи
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
