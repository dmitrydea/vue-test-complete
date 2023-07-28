<script lang="ts" setup>

</script>

<template>
    <div class="preloader">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
</template>

<style scoped>
    .preloader {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>