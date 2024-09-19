import { defineNuxtPlugin } from '#app';
import { Plugin } from 'vue';
import Toast, { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default defineNuxtPlugin((nuxtApp: { vueApp: { use: (arg0: Plugin) => void; }; }) => {
  nuxtApp.vueApp.use(Toast);

  return {
    provide: {
      toast: useToast(),
    },
  };
});