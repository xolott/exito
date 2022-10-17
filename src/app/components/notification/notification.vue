<template>
    <div
        class="z-40 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
        <div class="p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <component :is="notificationIcon" class="h-6 w-6" :class="notificationColor" aria-hidden="true" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">{{ event.title }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ event.description }}</p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                    <button
                        type="button"
                        class="inline-flex rounded-md bg-white text-primary-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        @click.prevent.stop="() => emit('close')"
                    >
                        <span class="sr-only">Close</span>
                        <IconXMark class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Notification",
    };
</script>

<script setup lang="ts">
    import IconXMark from "~icons/heroicons/x-mark";
    import IconCheckCircle from "~icons/heroicons/check-circle";
    import IconInformationCircle from "~icons/heroicons/information-circle";
    import IconExclamationTriangle from "~icons/heroicons/exclamation-triangle";
    import IconXCircle from "~icons/heroicons/x-circle";
    import { NotificationEvent, NotificationType } from "@/app/composables/use-notification";
    import { computed } from "vue";

    interface NotificationProps {
        event: NotificationEvent;
    }

    const props = defineProps<NotificationProps>();

    const emit = defineEmits(["close"]);

    const notificationIcon = computed(() => {
        switch (props.event.type) {
            case NotificationType.ERROR:
                return IconXCircle;
            case NotificationType.WARNING:
                return IconExclamationTriangle;
            case NotificationType.SUCCESS:
                return IconCheckCircle;
            case NotificationType.INFO:
            default:
                return IconInformationCircle;
        }
    });
    const notificationColor = computed(() => {
        switch (props.event.type) {
            case NotificationType.ERROR:
                return "text-red-400";
            case NotificationType.WARNING:
                return "text-yellow-400";
            case NotificationType.SUCCESS:
                return "text-green-400";
            case NotificationType.INFO:
            default:
                return "text-blue-400";
        }
    });
</script>

<style scoped></style>
