import type { Document } from '../domain/document'

import { documentApi } from '../lib/api'
import { useDocument } from '../model/use-document'
import { Root } from '../ui/root'

export function PdfExportButton({ data }: { data: Document }) {
  const document = useDocument({
    api: documentApi,
    data
  })

  return (
    <Root
      disabled={document.isLoading}
      onClick={document.exportDocument}
      content={document.isLoading ? 'Генерация...' : 'Экспорт в PDF'}
      error={document.error}
    />
  )
}
