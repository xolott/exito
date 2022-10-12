<template>
    <div class="pb-16">
        <div class="py-6">
            <!-- Description list with inline editing -->
            <div class="divide-y divide-gray-200">
                <div class="space-y-1">
                    <div class="flex items-center">
                        <IconGithub class="mr-2" />
                        <h3 class="text-lg font-medium leading-6 text-gray-900">GitHub</h3>
                    </div>

                    <p class="max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <div class="mt-6">
                    <dl class="divide-y divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500">API Token</dt>
                            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span class="flex-grow">ASF-ASD-***-***-***-***</span>
                                <span class="ml-4 flex-shrink-0 flex gap-3">
                                    <button
                                        type="button"
                                        class="rounded-md py-2 px-3 bg-gray-500 font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-0"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        class="rounded-md py-2 px-3 bg-red-500 font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-0"
                                    >
                                        Delete
                                    </button>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="mt-10 divide-y divide-gray-200">
                <div class="space-y-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Linear</h3>

                    <p class="max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <div class="mt-6">
                    <dl class="divide-y divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500">API Token</dt>
                            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span class="flex-grow">lin_api_BRoEy********IdDW</span>
                                <span class="ml-4 flex-shrink-0 flex gap-3">
                                    <button
                                        type="button"
                                        class="rounded-md py-2 px-3 bg-gray-500 font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-0"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        class="rounded-md py-2 px-3 bg-red-500 font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-0"
                                    >
                                        Delete
                                    </button>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import IconGithub from "~icons/mdi/github";
</script>

<style scoped></style>

<route>
{
    name: "settings",
    meta: {
        title: "Settings"
    }
}
</route>
