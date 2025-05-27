<template>

<div id="header-btn-block" class="navbar">
    <div id="btn-container" class="container-fluid justify-content-start m-0 p-0">

        <button id="theme-switch" class="btn btn-outline-primary">
            <img src="@/../public/icons/moon-icon.png" alt="switch-2-night" class="icon">
        </button><!--  light / dark toggle  -->

        <button id="about-app" class="btn btn-outline-primary">
            <img src="@/../public/icons/info-icon.png" alt="info" class="icon">
        </button><!--  info about app  -->

        <button id="add-tusk" class="btn btn-outline-primary col-2 ms-auto fw-bold fs-6">
            Добавить
        </button><!--  add new tusk  -->

    </div>
</div><!--  AppHeaderBtnBlock  -->

</template>

<script></script>

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