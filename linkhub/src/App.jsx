import './App.css'
import {Button} from './components/ui/button'

export default function App() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-900">
        Tailwind is working!
      </h1>
      <Button>Click me</Button>
    </div>
  )
}
