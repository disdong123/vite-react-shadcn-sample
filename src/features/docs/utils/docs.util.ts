import { TreeNavGroupItemType } from '@/components/tree-nav-group.tsx'

export class DocsUtil {
  /**
   * 트리 구조에서 ID 에 해당하는 항목을 찾습니다.
   * @param docs
   * @param id
   */
  static findDocById(
    docs: Array<TreeNavGroupItemType>,
    id: number
  ): TreeNavGroupItemType | null {
    for (const doc of docs) {
      if (doc.id === id) {
        return doc
      }

      if (doc.subItems.length > 0) {
        const found = DocsUtil.findDocById(doc.subItems, id)
        if (found) {
          return found
        }
      }
    }
    return null
  }
}
