<template>
    <header
        class="h-[length:var(--toolbar-height)] w-full drag bg-black flex justify-center items-center z-50"
        @dblclick="onDbClick"
    >
        <!--        <div-->
        <!--            class="h-max bg-black flex items-center justify-center fixed inset-x-0 top-0 select-none drag"-->
        <!--            @dblclick="onDbClick"-->
        <!--        >-->
        <span class="drag text-center text-white pointer-events-none">Exito</span>
        <!--        </div>-->
    </header>
</template>

<script setup lang="ts">
    import { WindowToolbar } from "@/infrastructure/window-toolbar";

    function onDbClick() {
        console.log("dbclick");
        WindowToolbar.maxUnmaxWindow();
    }
</script>

<style scoped></style>
