import { TreeNavGroupItemType } from '@/components/tree-nav-group.tsx'

export class TreeNavGroupUtils {
  /**
   * 트리 구조에서 ID에 해당하는 항목을 찾습니다.
   * @param id
   * @param items
   * @returns 첫 번째로 발견된 아이템 또는 null
   */
  static getItemById(
    id: number,
    items: Array<TreeNavGroupItemType>
  ): TreeNavGroupItemType | null {
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
