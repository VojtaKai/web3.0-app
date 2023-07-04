import { Connect } from "./components/Connection"
import { Navbar } from "./components/Navbar"
import { TransactionProvider } from "./context/TransactionContext"

function App() {

  return (
    <TransactionProvider>
      <div>
          <Navbar />
          <Connect />
      </div >
    </TransactionProvider>
  )
}

export default App
