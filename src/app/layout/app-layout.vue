<template>
    <div class="overflow-hidden flex flex-col h-full">
        <slot name="toolbar"></slot>
        <div class="overflow-y-auto flex-grow basis-0 bg-gray-100 select-none">
            <div class="h-full drag-none">
                <div>
                    <Navigation></Navigation>
                    <div class="flex flex-1 flex-col md:pl-64">
                        <SidebarButton />
                        <main class="flex-1">
                            <div class="py-6">
                                <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                    <div v-if="mustShowTitle" class="px-4 sm:px-6 md:px-0">
                                        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
                                    </div>
                                    <slot> </slot>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Navigation from "@/app/layout/navigation/navigation.vue";
    import SidebarButton from "@/app/layout/navigation/sidebar-button.vue";
    import { computed } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const title = computed(() => {
        return route.meta.title ?? route.name;
    });
    const mustShowTitle = computed(() => !route.meta.hideTitle);
</script>
