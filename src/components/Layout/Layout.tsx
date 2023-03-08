import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import { RouterView } from 'vue-router';
import { useAppStores } from '@/stores/modules/app';
import { storeToRefs } from 'pinia';

export default defineComponent({
  render() {
    const appStores = useAppStores();
    const {isCollapsed} = storeToRefs(appStores);

    return (
      <Layout class="w-100% h-100%">
        <Layout.Sider v-model:collapsed={isCollapsed.value} trigger={null} collapsible class="bg-white">
          <Aside />
        </Layout.Sider>
        <Layout>
          <Layout.Header class="bg-white h-48px leading-48px p-x-20px flex items-center">
            <Header />
          </Layout.Header>
          <Layout.Content class="bg-white m-10px p-20px">
            <RouterView />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
});