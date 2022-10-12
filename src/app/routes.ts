import { useLink } from "vue-router";
import IconHomeOutline from "~icons/heroicons/home";
import IconGearOutline from "~icons/heroicons/cog-6-tooth";
import { VueElement } from "vue";

export interface Route {
    name: string;
    link: ReturnType<typeof useLink>;
    icon: VueElement;
}

export const getRoutes = () => [
    {
        name: "Home",
        link: useLink({ to: "/" }),
        icon: IconHomeOutline,
    },
    {
        name: "Settings",
        link: useLink({ to: "/settings" }),
        icon: IconGearOutline,
    },
];
