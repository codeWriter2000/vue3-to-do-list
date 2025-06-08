<template>

<teleport to="#modal">

    <div
        v-if="this.isVisible"
        id="modal-window" class="container position-fixed top-50 start-50 w-50 translate-middle rounded shadow p-2 my-3 border border-primary bg-body"
    >
        <div class="row align-items-center m-0 p-2">
            <div class="col text-center text-xxl-start p-1">
                <span class="fs-6 fw-bolder">
                    TO-DO APP modal
                </span>
            </div>
            <div class="col-12 text-center col-xxl-1 text-xxl-end">
                <button id="close-modal-btn" class="btn btn-outline-danger" @click="hideModal">
                    <img src="@/../public/icons/cross-icon.png" alt="close" class="icon">
                </button><!--  close modal button  -->
            </div>
        </div>
        <slot name="modal-content"></slot><!--  modal window main content  -->
    </div>

</teleport><!--  teleported modal window  -->

</template>

<script>

export default {
    name: 'ModalWindow',
    emits: ['modalIsClosed'],
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        showModal() {
            this.isVisible = true;
        }, // метод показа модального окна
        hideModal() {
            this.$emit('modalIsClosed');
            this.isVisible = false;
        }, // метод скрытия модального окна
    },
};

</script>

<style scoped>

#modal-window {
    height: auto;
    z-index: 10;
}

</style>
