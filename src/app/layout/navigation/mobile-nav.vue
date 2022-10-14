<template>
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
        <!--
          Off-canvas menu backdrop, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" :class="classes"></div>

        <div class="fixed inset-0 z-40 flex" :class="classes">
            <!--
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            -->
            <div class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <!--
                  Close button, show/hide based on off-canvas menu state.

                  Entering: "ease-in-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in-out duration-300"
                    From: "opacity-100"
                    To: "opacity-0"
                -->
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                        type="button"
                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <span class="sr-only">Close sidebar</span>
                        <!-- Heroicon name: outline/x-mark -->
                        <svg
                            class="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div class="flex flex-shrink-0 items-center px-4">
                        <img
                            class="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                    </div>
                    <nav class="mt-5 space-y-1 px-2">
                        <NavItem v-for="route in routes" :key="route.name" :route="route" :sm="true"></NavItem>
                    </nav>
                </div>
            </div>

            <div class="w-14 flex-shrink-0 w">
                <!-- Force sidebar to shrink to fit close icon -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import NavItem from "@/app/layout/navigation/nav-item.vue";

    import { getRoutes } from "@/app/routes";
    import { useSettings } from "@/app/composables/use-injectable";

    const routes = getRoutes();
    const settings = useSettings();
    const classes = computed(() => {
        return {
            "top-[length:var(--toolbar-height)]": settings.isElectron,
        };
    });
</script>
