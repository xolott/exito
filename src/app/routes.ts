import { useLink } from "vue-router";
import IconHomeOutline from "~icons/heroicons/home";
import IconGearOutline from "~icons/heroicons/cog-6-tooth";
import { FunctionalComponent } from "vue";

export interface Route {
    name: string;
    link: ReturnType<typeof useLink>;
    icon: FunctionalComponent;
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
