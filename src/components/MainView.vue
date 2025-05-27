<template>
    <div id="main-content" class="container p-3">
        <h1 id="app-header" class="fs-1 text-uppercase fw-bold">Vue TO-DO app</h1>
        <AppHeaderBtnBlock/>
        <AppTaskWrap/>
    </div>
</template>

<script>

import AppHeaderBtnBlock from '@/components/AppHeaderBtnBlock.vue';
import AppTaskWrap from '@/components/AppTaskWrap.vue';


export default {
    name: 'MainAppView',
    emits: [],
    components: {
        AppHeaderBtnBlock,
        AppTaskWrap,
    },
    data() {
        return {};
    },
};

</script>

<style>

#main-content {
    height: 100vh;
}

</style>
