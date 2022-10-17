<template>
    <div class="z-40 pointer-events-auto overflow-hidden rounded-md p-4" :class="colors.background">
        <div class="flex">
            <div class="flex-shrink-0">
                <component :is="icon" class="h-5 w-5" :class="colors.icon" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium" :class="colors.title">{{ event.title }}</h3>
                <div class="mt-2 text-sm" :class="colors.description">
                    <p>
                        {{ event.description }}
                    </p>
                </div>
            </div>
            <div v-if="!event.timeout" class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button
                        type="button"
                        class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                        :class="colors.closeButton"
                        @click="() => emit('close')"
                    >
                        <span class="sr-only">Dismiss</span>
                        <IconXMark class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Alert",
    };
</script>
<script setup lang="ts">
    import IconCheckCircle from "~icons/heroicons-solid/check-circle";
    import IconInformationCircle from "~icons/heroicons-solid/information-circle";
    import IconExclamationTriangle from "~icons/heroicons-solid/exclamation-triangle";
    import IconXCircle from "~icons/heroicons-solid/x-circle";
    import IconXMark from "~icons/heroicons/x-mark";
    import { NotificationEvent, NotificationType } from "@/app/composables/use-notification";
    import { computed } from "vue";

    interface AlertProps {
        event: NotificationEvent;
    }

    const props = defineProps<AlertProps>();
    const emit = defineEmits(["close"]);

    const icon = computed(() => {
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
    const colors = computed(() => {
        switch (props.event.type) {
            case NotificationType.ERROR:
                return {
                    title: "text-red-800",
                    description: "text-red-700",
                    background: "bg-red-50",
                    icon: "text-red-400",
                    closeButton:
                        "bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50",
                };
            case NotificationType.WARNING:
                return {
                    title: "text-yellow-800",
                    description: "text-yellow-700",
                    background: "bg-yellow-50",
                    icon: "text-yellow-400",
                    closeButton:
                        "bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50",
                };
            case NotificationType.SUCCESS:
                return {
                    title: "text-green-800",
                    description: "text-green-700",
                    background: "bg-green-50",
                    icon: "text-green-400",
                    closeButton:
                        "bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50",
                };
            case NotificationType.INFO:
            default:
                return {
                    title: "text-blue-800",
                    description: "text-blue-700",
                    background: "bg-blue-50",
                    icon: "text-blue-400",
                    closeButton:
                        "bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50",
                };
        }
    });
</script>
