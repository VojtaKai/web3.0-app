import { Connect } from "./components/Connection"
import { Footer } from "./components/Footer"
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
          <Footer />
      </div >
    </TransactionProvider>
  )
}

export default App
