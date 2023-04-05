import api from "./src/api";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: ReturnType<typeof api>;
  }
}