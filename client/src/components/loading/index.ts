import { VueType } from "@/types";

export const LoadingComponent = (): Promise<VueType> => import("./Loading.vue");
