import type { Document } from '../domain/document'

import { API_URL, authorizedApiClient } from '@/kernel/api'

export async function generateDocumentPdf(data: Document) {
  return await authorizedApiClient<Blob>({
    url: API_URL.GENERATE_PDF,
    method: 'POST',
    json: data,
    strategyResponse: async (response) => await response.blob()
  })
}

export const documentApi = {
  generateDocumentPdf
}
