<template>
    <div class="group block w-full flex-shrink-0">
        <div class="flex items-center">
            <div v-if="imageUrl">
                <img class="inline-block h-9 w-9 rounded-full" :src="imageUrl" alt="" />
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ name }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Avatar",
    };
</script>

<script setup lang="ts">
    interface AvatarProps {
        name?: string;
        imageUrl?: string;
    }
    defineProps<AvatarProps>();
</script>

<style scoped></style>
