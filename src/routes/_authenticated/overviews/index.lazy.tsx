import { createLazyFileRoute } from '@tanstack/react-router'
import Overviews from '@/features/overviews'

export const Route = createLazyFileRoute('/_authenticated/overviews/')({
  component: Overviews,
})
