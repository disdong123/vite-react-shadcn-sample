import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/overview/')({
  component: () => <div>overviews...</div>,
})
