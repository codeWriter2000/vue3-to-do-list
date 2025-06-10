<template>
    <ModalWindow ref="modal" @modalIsClosed="hideInnerContent">
        <template #modal-content>
            <TaskForm v-if="isAddingTask" :task="{}" @closeModal="closeModalWindow('Добавлена новая задача')"/>
            <FilterAndSortForm v-if="isFiltering"/>
            <AppAboutComponent v-if="isAboutInfo" @closeModal="closeModalWindow"/>
        </template>
    </ModalWindow><!--  component w teleport to index.html (modal form container)  -->
    <div id="main-content" class="container p-3">
        <h1 id="app-header" class="fs-1 text-uppercase fw-bold">Vue TO-DO app</h1>
        <AppHeaderBtnBlock
            @themeChanged="this.$refs.banner.showBanner('Тема приложения изменена')"
            @showInfo="showInfoBanner"
            @changeFilters="startSortingAndFiltering"
            @addNewTask="startAddingTask"
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
import FilterAndSortForm from '@/components/FilterAndSortForm.vue';
import AppAboutComponent from '@/components/AppAboutComponent.vue';

export default {
    name: 'MainAppView',
    emits: [],
    components: {
        AppHeaderBtnBlock,
        AppTaskWrap,
        BannerWrap,
        ModalWindow,
        TaskForm,
        FilterAndSortForm,
        AppAboutComponent,
    },
    data() {
        return {
            isAddingTask: false,
            isFiltering: false,
            isAboutInfo: false,
        };
    },
    methods: {
        showModalWindow() {
            this.$refs.modal.showModal();
        },
        showInfoBanner() {
            this.isAboutInfo = true;
            this.showModalWindow();
        },
        startSortingAndFiltering() {
            this.isFiltering = true;
            this.showModalWindow();
        },
        startAddingTask() {
            this.isAddingTask = true;
            this.showModalWindow();
        },
        hideInnerContent() {
            this.isAddingTask = false;
            this.isFiltering = false;
            this.isAboutInfo = false;
        },
        closeModalWindow(bannerText) {
            this.isAddingTask = false;
            this.isFiltering = false;
            this.isAboutInfo = false;
            this.$refs.modal.hideModal();
            if (bannerText) {
                this.$refs.banner.showBanner(bannerText);
            }
        },
    },
};

</script>

<style>

#main-content {
    height: 100vh;
}

</style>
