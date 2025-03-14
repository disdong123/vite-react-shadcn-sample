import { createLazyFileRoute } from '@tanstack/react-router'
import Docs from '@/features/docs'

export const Route = createLazyFileRoute('/_authenticated/docs/')({
  component: Docs,
})
