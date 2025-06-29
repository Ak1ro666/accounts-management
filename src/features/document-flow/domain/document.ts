export type Document = { title: string; content: string }

export const createUrl = (blob: Blob) => {
  return window.URL.createObjectURL(blob)
}
export const createDownloadLink = (url: string) => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'report.pdf')
  return link
}
