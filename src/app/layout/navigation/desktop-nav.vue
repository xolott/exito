<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col" :class="classes">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                    <img
                        class="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                </div>
                <nav class="mt-5 flex-1 space-y-1 px-2">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <NavItem v-for="route in routes" :key="route.name" :route="route"></NavItem>
                </nav>
            </div>

            <div class="flex flex-shrink-0 bg-gray-700 p-4">
                <div class="group block w-full flex-shrink-0">
                    <Avatar></Avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { settings } from "@/infrastructure/settings";
    import NavItem from "@/app/layout/navigation/nav-item.vue";
    import Avatar from "@/app/components/avatar.vue";
    import { getRoutes } from "@/app/routes";

    const routes = getRoutes();

    const classes = computed(() => {
        return {
            // "md:top-[length:var(--toolbar-height)]": settings.isElectron,
            "md:top-0": settings.isElectron,
            "md:mt-[length:var(--toolbar-height)]": settings.isElectron,
        };
    });
</script>

<style scoped></style>
