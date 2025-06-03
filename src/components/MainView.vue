<template>
    <ModalWindow ref="modal">
        <template #modal-content>
            <TaskForm :task="{}" @closeModal="closeModalWindow"/>
        </template>
    </ModalWindow><!--  component w teleport to index.html (modal form container)  -->
    <div id="main-content" class="container p-3">
        <h1 id="app-header" class="fs-1 text-uppercase fw-bold">Vue TO-DO app</h1>
        <AppHeaderBtnBlock
            @showInfo="showInfoBanner"
            @addNewTask="showModalWindow"
        />
        <AppTaskWrap/>
    </div>
    <BannerWrap ref="banner"/><!--  component w teleport to index.html (modal info banner)  -->
</template>

<script>

import AppHeaderBtnBlock from '@/components/AppHeaderBtnBlock.vue';
import AppTaskWrap from '@/components/AppTaskWrap.vue';
import BannerWrap from '@/components/BannerWrap.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import TaskForm from '@/components/TaskForm.vue';

export default {
    name: 'MainAppView',
    emits: [],
    components: {
        AppHeaderBtnBlock,
        AppTaskWrap,
        BannerWrap,
        ModalWindow,
        TaskForm,
    },
    data() {
        return {};
    },
    methods: {
        showInfoBanner() {
            const info = 'Информация';
            this.$refs.banner.showBanner(info);
        },
        showModalWindow() {
            this.$refs.modal.showModal();
        },
        closeModalWindow() {
            this.$refs.modal.hideModal();
        },
    },
};

</script>

<style>

#main-content {
    height: 100vh;
}

</style>
