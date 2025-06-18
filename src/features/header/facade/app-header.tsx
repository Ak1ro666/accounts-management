import { useLogout } from '../model/use-logout'
import { useSession } from '../model/use-session'
import { Navigation } from '../ui/navigation'
import { NavigationActions } from '../ui/navigation-actions'
import { NavigationTitle } from '../ui/navigation-title'
import { Root } from '../ui/root'

export function AppHeader() {
  const logout = useLogout()
  const session = useSession()

  return (
    <Root
      title={<NavigationTitle />}
      navigation={
        <Navigation
          email={session?.email}
          actions={<NavigationActions logout={logout} />}
        />
      }
    />
  )
}
