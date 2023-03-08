import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStores = defineStore('app', () => {
  const isCollapsed = ref(false);

  function toggle(){
    isCollapsed.value = !isCollapsed.value;
  }

  return {
    isCollapsed,
    toggle
  }
})