import './App.css'
import { Button } from '@/components/ui/button'
import Layout from "@/layout";

function App() {
  return (
      <div>
          <div className="flex flex-col items-center justify-center min-h-svh">
              <Button>Click me</Button>
          </div>
          <Layout><div>hello</div></Layout>
      </div>
  )
}

export default App
