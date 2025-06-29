import type { Document } from '../domain/document'

import { useState } from 'react'

import { createDownloadLink, createUrl } from '../domain/document'

export type DocumentApi<T extends Document> = {
  generateDocumentPdf: (data: T) => Promise<Blob>
}

export function useDocument<T extends Document>({
  data,
  api
}: {
  data: T
  api: DocumentApi<T>
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const exportDocument = async () => {
    try {
      setIsLoading(true)
      setError(undefined)

      const documentBlob = await api.generateDocumentPdf(data)

      if (documentBlob) {
        const url = createUrl(documentBlob)
        const link = createDownloadLink(url)

        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 100)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    exportDocument
  } as const
}
