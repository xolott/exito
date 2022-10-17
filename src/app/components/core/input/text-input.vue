<template>
    <div>
        <label v-if="label" :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <div class="relative mt-1 rounded-md shadow-sm">
            <input
                ref="input"
                v-model="value"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                class="block w-full rounded-md shadow-sm sm:text-sm"
                :class="inputClasses"
                :aria-invalid="!!errorMessage"
            />
            <div v-if="errorMessage" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <IconExclamationCircle class="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <p v-if="errorMessage" class="text-sm text-red-600 mt-2 pl-2">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
    export default {
        name: "TextInput",
    };
</script>

<script lang="ts" setup>
    import IconExclamationCircle from "~icons/heroicons/exclamation-circle";
    import { useField } from "vee-validate";
    import { computed, onMounted, ref, toRef } from "vue";
    import _ from "lodash";

    interface TextInputProps {
        name: string;
        label?: string;
        placeholder?: string;
        focus?: boolean;
        type?: "text" | "email" | "password";
    }

    const props = withDefaults(defineProps<TextInputProps>(), {
        type: "text",
        focus: false,
        label: undefined,
        placeholder: undefined,
    });
    const input = ref<HTMLElement>();
    const nameRef = toRef(props, "name");
    const { errorMessage, value } = useField(nameRef);
    const normalClasses = "border-primary-300 placeholder-primary-300 focus:border-primary-500 focus:ring-primary-500";
    const errorClasses =
        "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500";

    const inputClasses = computed(() => ({
        [normalClasses]: _.isNil(errorMessage.value),
        [errorClasses]: !_.isNil(errorMessage.value),
    }));

    onMounted(() => {
        props.focus && input.value?.focus();
    });
</script>

<style scoped></style>
