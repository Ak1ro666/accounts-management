import { ReactNode } from 'react'

import { Account } from '@/kernel/account'

export function Layout({
  items,
  renderItem
}: {
  items: Account[]
  renderItem: (item: Account) => ReactNode
}) {
  return <>{items.map(renderItem)}</>
}
