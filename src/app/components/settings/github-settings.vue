<template>
    <div class="space-y-1">
        <div class="flex items-center">
            <IconGithub class="mr-2" />
            <h3 class="text-lg font-medium leading-6 text-gray-900">GitHub</h3>
        </div>

        <p class="max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you share.
        </p>
    </div>
    <div class="mt-6">
        <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">API Token</dt>
                <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <template v-if="githubServer">
                        <span class="flex-grow" data-test-id="github-settings-token">
                            {{ githubServer.auth.safeString }}
                        </span>
                        <span class="ml-4 flex-shrink-0 flex gap-3">
                            <Button @click="updateToken"> Update </Button>
                            <Button color="danger" @click="deleteToken"> Delete </Button>
                        </span>
                    </template>
                    <span v-else class="flex justify-end w-full">
                        <Button @click="updateToken"> Add </Button>
                    </span>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script setup lang="ts">
    import IconGithub from "~icons/mdi/github";
    import { useGithubServer } from "@/app/composables/use-github-server";
    import { Button } from "@/app/components/core";
    import GithubApiTokenModal from "@/app/components/settings/github-api-token-modal.vue";
    import { useModal } from "@/app/composables";
    import { useUserSettingsStore } from "@/app/plugins/store/modules/user-settings";
    import _ from "lodash";
    import { useNotification } from "@/app/composables/use-notification";

    const githubServer = useGithubServer();
    const userSettings = useUserSettingsStore();
    const notify = useNotification();
    const { show } = useModal<string>(GithubApiTokenModal);

    async function updateToken() {
        const token = await show();
        if (_.isNil(token)) return;
        userSettings.updateGithubSettings({ apiKey: token });
        notify.success({ title: "Github API Token updated", timeout: 3000 });
    }

    async function deleteToken() {
        userSettings.updateGithubSettings({ apiKey: null });
        notify.success({ title: "Github API Token deleted", timeout: 3000 });
    }
</script>

<style scoped></style>
