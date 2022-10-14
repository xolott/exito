<template>
    <AppLayout class="overflow-hidden">
        <template #toolbar>
            <ToolBar v-if="settings.isElectron" />
        </template>
        <router-view />
    </AppLayout>
</template>

<script setup lang="ts">
    import ToolBar from "@/app/components/toolbar.vue";
    import AppLayout from "@/app/layout/app-layout.vue";
    import { useSettings } from "@/app/composables/use-injectable";

    const settings = useSettings();
</script>
