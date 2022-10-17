<template>
    <Modal :size="5" :model-value="true" @update:model-value="() => emit('close')">
        <div>
            <div class="mt-3 sm:mt-5">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Add your Github API token
                </DialogTitle>
                <div class="mt-2 text-sm text-gray-500">
                    <p>
                        Go to your
                        <a href="https://github.com/settings/tokens" target="_blank" class="font-bold text-primary-900"
                            >account personal access tokens (https://github.com/settings/tokens)</a
                        >. Remember that you won't be able to see the api token after it's generated
                    </p>
                    <p class="mt-2">Follow these steps:</p>
                    <ul class="list-disc list-inside">
                        <li class="my-1">Click on the <strong>Generate new token</strong> button</li>
                        <li class="my-1">Set the token <strong>Note</strong>. Something like: Exito's API token</li>
                        <li class="my-1">
                            Set the <strong>Expiration</strong>. Remember that you would need to do this again when the
                            token expires, so choose wisely and balance convenience with security
                        </li>
                        <li class="my-1">
                            Enable these scopes:
                            <ul class="pl-7">
                                <li v-for="scope in scopes" :key="scope.name">
                                    <span class="font-bold">{{ scope.name }}</span>
                                    <span v-if="scope.description">: {{ scope.description }}</span>
                                    <ul v-if="scope.subScopes" class="pl-7">
                                        <li v-for="subScope in scope.subScopes" :key="subScope.name">
                                            {{ subScope.name }}: {{ scope.description }}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="my-1">Click on <strong>Generate Token</strong></li>
                        <li class="my1">Copy the generated token and paste it in the next input box</li>
                    </ul>
                </div>
            </div>
        </div>
        <form class="mt-5 sm:mt-6" @submit.prevent="onSubmit">
            <TextInput name="github-api-token" class="mb-5 sm:mb-6" placeholder="API Token" :focus="true" />
            <div class="sm:flex sm:flex-row-reverse">
                <Button type="submit" class="inline-flex w-full justify-center sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </Button>
                <Button
                    color="secondary"
                    class="inline-flex w-full justify-center sm:mt-0 sm:w-auto sm:text-sm"
                    @click="() => emit('close')"
                >
                    Cancel
                </Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
    import { object as yupObject, string as yupString } from "yup";
    import { DialogTitle } from "@headlessui/vue";
    import { useForm } from "vee-validate";
    import { Modal, Button } from "@/app/components/core";
    import { ModalEvents } from "@/app/composables/use-modal";
    import TextInput from "@/app/components/core/input/text-input.vue";

    interface GithubApiTokenModalEvents<T> extends ModalEvents<T> {}

    const emit = defineEmits<GithubApiTokenModalEvents<string>>();

    const scopes = [
        {
            name: "repo",
            description: "just because",
            subScopes: [
                {
                    name: "public_repo",
                    description: "just because",
                },
            ],
        },
    ];

    const validationSchema = yupObject({
        "github-api-token": yupString()
            .required()
            .matches(/^ghp_/, "This field doesn't match the expected format. Must start with ghp_"),
    });
    const { handleSubmit } = useForm({ validationSchema });
    const onSubmit = handleSubmit((values) => {
        // eslint-disable-next-line vue/require-explicit-emits
        emit("success", values["github-api-token"]);
    });
</script>

<script lang="ts">
    export default {
        name: "GithubApiTokenModal",
    };
</script>

<style scoped></style>
