import { useLocation } from 'react-router-dom'

import { LangSwitcher } from '../../../lang-switcher'
import { NAV_ITEMS } from '../../lib/data'
import { Item } from '../../ui/item'
import { Root } from '../../ui/root'

import { PdfExportButton } from '@/domains/core/document-flow'

export function Sidebar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <Root
      items={NAV_ITEMS}
      renderItem={(item) => (
        <Item
          item={item}
          isActive={isActive}
        />
      )}
      actions={
        <>
          <LangSwitcher />
          <PdfExportButton
            data={{
              title: 'Мой отчет',
              content: 'Это пример содержимого отчета, которое будет в PDF.'
            }}
          />
        </>
      }
    />
  )
}
