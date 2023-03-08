import {defineComponent} from 'vue';
import { useAppStores } from '@/stores/modules/app';
import { Button } from 'ant-design-vue';

export default defineComponent({
  render(){
    const appStores = useAppStores();
    const {toggle} = appStores;
    return (
      <>
        {
          appStores.isCollapsed ? (
            <Button type="text" icon={<div class="i-ant-design-menu-unfold-outlined" />} onClick={toggle}></Button>
          ) : (
            <Button type="text" icon={<div class="i-ant-design-menu-fold-outlined" /> } onClick={toggle}></Button>
          )
        }

      </>
    )
  }
})