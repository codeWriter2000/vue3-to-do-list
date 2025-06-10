<template>

<div class="container">

    <div class="row px-5">
        <p class="p-0 m-0 text-center fw-bolder">
            О приложении VUE TO-DO
        </p>

        <p class="my-2 text-justify">
            &emsp;Приложение <strong>VUE TO-DO</strong> &mdash; классическое одностраничное web приложение (single&nbsp;page&nbsp;application), выполненное с использованием прогрессивного фреймворка&nbsp;<strong>VUE.js</strong>. Приложение создано в целях отработки практических навыков программирования и предназначено <strong>для некоммерческого использования</strong>.
        </p>

        <p class="mt-2 mb-0 text-justify fw-bolder">
            &emsp;Функционал VUE TO-DO:
        </p>

        <ul class="mx-3">
            <li>добавление, изменение, хранение и удаление задач;</li>
            <li>фильтрация и сортировка задач</li>
        </ul>

        <p class="my-2 text-justify">
            &emsp;Для хранения задач используется <strong>local storage браузера</strong>! Учитывайте это при работе с приложением.
        </p>

    </div>

    <div class="row justify-content-center my-3">
        <button @click.prevent="closeInfo" class="btn btn-primary col-4">
            Все ясно
        </button>
    </div>

</div>

</template>

<script>

export default {
    name: 'AboutInfo',
    emits: ['closeModal'],
    methods: {
        closeInfo() {
            this.$emit('closeModal');
        },
    },
};

</script>
