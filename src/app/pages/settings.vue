<template>
    <div class="pb-16">
        <div class="py-6">
            <div class="divide-y divide-gray-200">
                <GithubSettings />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import GithubSettings from "@/app/components/settings/github-settings.vue";
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
