import { defineComponent, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { $ref } from 'vue/macros';
import { Menu } from 'ant-design-vue';

const AsideItem = defineComponent({
  props: ['route'],
  setup(props) {
    return () => (
      <>
        {
          !props.route.children ? (
            <Menu.Item key={props.route.name} title={props.route.meta.title}
                       icon={<div class={props.route.meta.icon}/>} class='flex items-center'>
              <RouterLink to={{ name: props.route.name }}>
                {props.route.name}
              </RouterLink>
            </Menu.Item>

          ) : (
            <Menu.SubMenu key={props.route.name} title={props.route.meta.title}
                          icon={<div class={props.route.meta.icon } />}>
              {
                props.route.children.map((el: any) => (
                  <AsideItem route={el} />
                ))
              }
            </Menu.SubMenu>
          )
        }

      </>
    );
  }
});

export default defineComponent({
  setup() {

    const route = useRoute();
    const router = useRouter();
    let activeMenu: string[] = $ref(['Dashboard']);

    watch(
      route,
      () => {
        const name = route.name as string;
        activeMenu = [];
        activeMenu.push(name);
      },
      {
        deep: true,
        immediate: true
      }
    );

    return () => (
      <>
        <Menu v-model:selectedKeys={activeMenu} mode='inline'>
          {
            router.options.routes[0].children?.map(item => <AsideItem route={item} />)
          }
        </Menu>
      </>
    );
  }
});