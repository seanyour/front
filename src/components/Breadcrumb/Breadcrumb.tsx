import { defineComponent, ref, watch } from 'vue';
import { type RouteLocationMatched, RouterLink, useRoute, useRouter } from 'vue-router';
import { Breadcrumb } from 'ant-design-vue';
import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
import { $ref } from 'vue/macros';

export default defineComponent({
  render(){
    const route = useRoute();
    const router = useRouter();
    let breadcrumbList: RouteLocationMatched[] = $ref([]);

    watch(
      route,
      () => {
        getBreadcrumb();
      },
      {
        deep: true,
        immediate: true,
      }
    )
    function getBreadcrumb(){
      let matched = route.matched.filter(item => item.meta && item.meta.title);

      if (!isDashBoard(matched[0])){
        matched = ([{ path: '/dashboard', name: 'Dashboard', meta: { title: 'dashboard' } }] as unknown as RouteLocationMatched[]).concat(matched);
      };

      breadcrumbList = matched;
    };

    function isDashBoard(route: any){
      const name = route && route.name;

      if (!name){
        return false;
      };

      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    };

    return(
      <>
        <Breadcrumb>
          {
            breadcrumbList.map(item => (
              <Breadcrumb.Item>
                {
                  breadcrumbList.indexOf(item) === breadcrumbList.length -1 ? (
                    <span>{item.name}</span>
                  ) : (
                    <RouterLink to={{name: item.name}}>
                      {item.name}
                    </RouterLink>
                  )
                }
              </Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      </>
    )
  }
})