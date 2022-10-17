<template>
    <button
        type="button"
        v-bind="$attrs"
        class="rounded-md py-2 px-3 font-medium focus:outline-none focus:ring-2 focus:ring-0"
        :class="[buttonColor]"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
    export default {
        // eslint-disable-next-line vue/no-reserved-component-names
        name: "Button",
    };
</script>
<script setup lang="ts">
    import { computed } from "vue";

    type ButtonColor = "primary" | "secondary" | "danger";

    const ButtonColors: Record<ButtonColor, string> = {
        primary: "bg-primary-500 text-white hover:bg-primary-400",
        secondary: "bg-primary-100 text-primary-700 hover:bg-primary-200",
        danger: "bg-red-500 text-white hover:bg-red-400",
    };

    interface ButtonProps {
        color?: ButtonColor;
    }

    const props = withDefaults(defineProps<ButtonProps>(), { color: "primary" });

    const buttonColor = computed(() => ButtonColors[props.color]);
</script>

<style scoped></style>
