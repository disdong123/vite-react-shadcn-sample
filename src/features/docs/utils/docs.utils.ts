import { DocsType } from '@/apis/gitlab/types/docs.type.ts'

export class DocsUtils {
  /**
   * 트리 구조에서 ID 에 해당하는 항목을 찾습니다.
   * @param items
   * @param id
   */
  static getDocById(id: number, items: Array<DocsType>): DocsType | null {
    const queue = [...items]

    while (queue.length > 0) {
      const current = queue.shift()
      if (!current) {
        continue
      }

      if (current.id === id) {
        return current
      }

      if (current.subItems.length > 0) {
        queue.push(...current.subItems)
      }
    }

    return null
  }
}
