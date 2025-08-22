import { LangSwitcher } from '../../../lang-switcher'
import { Root } from '../../ui/root'

import { PdfExportButton } from '@/domains/core/document-flow'

export function Sidebar() {
  return (
    <Root
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
