<template>

<div id="header-btn-block" class="navbar">
    <div id="btn-container" class="container-fluid justify-content-start m-0 p-0">

        <button id="theme-switch" class="btn btn-outline-primary shadow" @click="changeTheme">
            <img v-if="theme" src="@/../public/icons/moon-icon.png" alt="switch-2-dark" class="icon">
            <img v-else src="@/../public/icons/sun-icon.png" alt="switch-2-light" class="icon">
        </button><!--  light / dark toggle  -->

        <button id="about-app" class="btn btn-outline-primary shadow" @click="$emit('showInfo')">
            <img src="@/../public/icons/info-icon.png" alt="info" class="icon">
        </button><!--  info about app  -->

        <button id="sort-btn" class="btn btn-outline-primary col col-lg-2 ms-auto fw-bold fs-6 shadow">
            Сортировка&ensp;
            <img src="@/../public/icons/sort-icon.png" alt="sort" class="icon">
        </button>

        <button id="add-tusk" class="btn btn-outline-primary col col-lg-2 fw-bold fs-6 shadow">
            Добавить
        </button><!--  add new tusk  -->

    </div>
</div><!--  AppHeaderBtnBlock  -->

</template>

<script>

export default {
    name: 'AppHeaderBlock',
    emits: ['showInfo'],
    data() {
        return {
            theme: true,
        };
    },
    methods: {
        changeTheme() {
            this.theme = !this.theme;
        },
    },
};

</script>

<style>

#btn-container button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

#btn-container button:first-child {
    margin-left: 0;
    margin-right: 0;
}

#btn-container button:last-child {
    margin-left: 0;
    margin-right: 0;
}

</style>