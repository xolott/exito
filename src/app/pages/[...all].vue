<template>
    <div class="h-screen flex items-center justify-center flex-col">
        <NotFoundEmptyState />
        <span class="text-center text-2xl mb-4">Oh no! Looks like you are lost.</span>
        <router-link to="/">
            <button class="bg-indigo-400 px-2 py-1 rounded">Go to home</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import NotFoundEmptyState from "@/app/assets/empty-states/not-found.svg";
</script>

<route>
{
    meta: {
        hideTitle: true
    }
}
</route>
