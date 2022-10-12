<template>
    <router-link
        class="group flex items-center px-2 py-2 font-medium rounded-md"
        :class="linkStyles.a"
        :to="route.link.route"
    >
        <Component
            :is="route.icon"
            class="text-gray-400 group-hover:text-gray-300 flex-shrink-0 h-6 w-6"
            :class="linkStyles.icon"
        />

        {{ route.name }}
    </router-link>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { Route } from "@/app/routes";

    interface NavItemProps {
        sm?: boolean;
        route: Route;
    }

    const props = withDefaults(defineProps<NavItemProps>(), { sm: false });

    const linkStyles = computed(() => {
        return {
            a: {
                "text-sm": !props.sm,
                "text-base": props.sm,
                "text-gray-300 hover:bg-gray-700 hover:text-white": !props.route.link.isExactActive.value,
                "bg-gray-900 text-white": props.route.link.isExactActive.value,
            },
            icon: {
                "mr-3": !props.sm,
                "mr-4": props.sm,
            },
        };
    });
</script>

<style scoped></style>
