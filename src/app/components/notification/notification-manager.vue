<template>
    <div
        aria-live="assertive"
        class="z-40 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <transition-group
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            >
                <Alert
                    v-for="notification in notifications"
                    :key="notification.id"
                    :event="notification.event"
                    @close="removeNotification(notification.id)"
                />
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "NotificationManager",
    };
</script>

<script setup lang="ts">
    import { NotificationEvent, useNotification } from "@/app/composables/use-notification";
    import { ref } from "vue";
    import random from "@/core/random";
    import Alert from "@/app/components/notification/alert.vue";

    interface NotificationInstance {
        id: string;
        event: NotificationEvent;
    }

    const notify = useNotification();
    const notifications = ref<NotificationInstance[]>([]);
    notify.on((event) => {
        const notification = { id: random.cssId(), event };
        event.timeout &&
            setTimeout(() => {
                removeNotification(notification.id);
            }, event.timeout);
        notifications.value = [...notifications.value, notification];
    });

    function removeNotification(id: string) {
        notifications.value = notifications.value.filter((n) => n.id !== id);
    }
</script>

<style scoped></style>
