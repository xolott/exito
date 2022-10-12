<template>
    <div class="h-screen flex items-center justify-center flex-col">
        <NoConnectionEmptyState />
        <span class="text-center text-2xl">Oh no! We lost connection with GitHub.</span>
        <span class="text-center text-gray-500 mb-2"> Please, update your API token</span>
        <button class="bg-indigo-400 px-2 py-1 rounded">Go to settings</button>
        <hr />
    </div>
</template>

<script setup lang="ts">
    import NoConnectionEmptyState from "@/app/assets/empty-states/no-connection.svg?component";
</script>

<route>
{
    name: "home",
    meta: {
        title: "Home"
    }
}
</route>
