<template>
    <div id="main-content" class="container p-3">
        <h1 id="app-header" class="fs-1 text-uppercase fw-bold">Vue TO-DO app</h1>
        <AppHeaderBtnBlock/>
    </div>
</template>

<script>

import AppHeaderBtnBlock from '@/components/AppHeaderBtnBlock.vue';

export default {
    name: 'MainAppView',
    emits: [],
    components: {
        AppHeaderBtnBlock,
    },
    data() {
        return {};
    },
};

</script>

<style></style>
