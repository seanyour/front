// @unocss-include
export default {
  path: 'components',
  name: 'Components',
  meta: {title: 'components', icon: 'i-mdi-puzzle-outline'},
  redirect: 'Clipboard',
  children: [
    {
      path: 'clipboard',
      name: 'Clipboard',
      meta: { title: 'clipboard', icon: 'i-mdi-clipboard-check-multiple-outline' },
      component: () => import('views/Clipboard/Clipboard')
    },
  ]

}