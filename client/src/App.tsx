import { Connect } from "./components/Connection"
import { Navbar } from "./components/Navbar"
import { Services } from "./components/Services"
import { Transactions } from "./components/Transactions"
import { TransactionProvider } from "./context/TransactionContext"

function App() {

  return (
    <TransactionProvider>
      <div className="main-theme">
          <Navbar />
          <Connect />
          <Services />
          <Transactions />
      </div >
    </TransactionProvider>
  )
}

export default App
