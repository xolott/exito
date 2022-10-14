<template>
    <div class="z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden" :class="classes">
        <button
            type="button"
            class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
            <span class="sr-only">Open sidebar</span>
            <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { useSettings } from "@/app/composables/use-injectable";

    const settings = useSettings();
    const classes = computed(() => {
        return {
            "top-[length:var(--toolbar-height)]": settings.isElectron,
        };
    });
</script>

<style scoped></style>
