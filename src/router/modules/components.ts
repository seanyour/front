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
    {
      path: 'editor',
      name: 'Editor',
      meta: { title: 'editor', icon: 'i-icon-park-editor' },
      component: () => import('views/Editor/Editor')
    },
  ]

}