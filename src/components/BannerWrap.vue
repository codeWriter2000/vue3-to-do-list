<template>

<teleport to="#banner-block">

    <div
        v-if="this.isVisible"
        v-html="content"
        @click="hideBanner"
        id="banner" class="container fixed-bottom mb-5 rounded shadow p-2 my-3 border border-info"
    ></div>

</teleport><!--  teleported information banner  -->

</template>

<script>

export default {
    name: 'BannerWrap',
    data() {
        return {
            isVisible: false,
            content: '',
            timeoutId: null,
        };
    },
    methods: {
        showBanner(content, duration = 3000) {
            this.content = content;
            this.isVisible = true;

            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }

            this.timeoutId = setTimeout(() => {
                this.isVisible = false;
                this.timeoutId = null;
            }, duration);
        }, // метод показа баннера
        hideBanner() {
            this.isVisible = false;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        }, // метод скрытия баннера
    },
};

</script>

<style>

#banner {
    width: 75vw;
    height: auto;
    z-index: 10;
    cursor: pointer;
}

</style>