import { useNavigateHome } from './model/use-navigate-home'
import { ForbidenAction } from './ui/forbiden-actions'
import { Root } from './ui/root'

function Page() {
  const navigateHome = useNavigateHome()

  return (
    <Root
      title={'403 - Доступ запрещен'}
      description={'У вас нет прав для доступа к этой странице.'}
      actions={<ForbidenAction onNavigationRequested={navigateHome} />}
    />
  )
}

export const Component = Page
