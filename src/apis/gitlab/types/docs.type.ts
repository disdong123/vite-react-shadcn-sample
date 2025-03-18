export interface DocsType {
  id: number
  title: string
  type: string
  docsUrl: string | null
  subItems: Array<DocsType>
}
