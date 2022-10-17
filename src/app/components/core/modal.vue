<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6"
                            :class="dialogPanelClasses"
                        >
                            <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button
                                    type="button"
                                    class="rounded-md bg-white text-primary-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    @click="open = false"
                                >
                                    <span class="sr-only">Close</span>
                                    <IconXMark class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <slot></slot>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
    import IconXMark from "~icons/heroicons/x-mark";
    import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
    import { useVModel } from "@vueuse/core";
    import { computed } from "vue";
    import { Dictionary } from "@/types";

    interface ModalProps {
        modelValue: boolean;
        size?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    }

    const props = withDefaults(defineProps<ModalProps>(), { size: 0 });

    const emit = defineEmits(["update:modelValue"]);
    const open = useVModel(props, "modelValue", emit);

    const ModalSizes: Dictionary<string> = {
        0: "sm:max-w-sm",
        1: "sm:max-w-md",
        2: "sm:max-w-xl",
        3: "sm:max-w-1xl",
        4: "sm:max-w-2xl",
        5: "sm:max-w-3xl",
        6: "sm:max-w-4xl",
        7: "sm:max-w-5xl",
        8: "sm:max-w-6xl",
        9: "sm:max-w-7xl",
    };
    const dialogPanelClasses = computed(() => ModalSizes[props.size]);
</script>

<script lang="ts">
    export default {
        name: "Modal",
    };
</script>

<style scoped></style>
