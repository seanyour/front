import { defineComponent } from 'vue';
import { useAppStores } from '@/stores/modules/app';
import Expand from 'components/Expand/Expand';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';

export default defineComponent({
  setup() {
    const appStores = useAppStores();
    return () => (
      <>
        <Expand/>
        <Breadcrumb/>
      </>
    );
  }
});