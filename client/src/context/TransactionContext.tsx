import * as React from 'react'
import {BrowserProvider, Contract, JsonRpcSigner, parseEther, toBeHex} from 'ethers'
import { contractAbi, contractAddress } from '../utils/constants'
import { FormData } from '../components/ConnectSection';

export interface ITransactionContext {
    transactionManager: TransactionManager,
    currentAccount: string | undefined
}

export const TransactionContext = React.createContext<ITransactionContext | null>(null);

export const TransactionProvider = ({children}: {
    children: React.ReactNode
}) => {
    const { ethereum } = window as any;
    const [transactionManager, setTransactionManager] = React.useState<TransactionManager | undefined>(undefined)
    const [currentAccount, setCurrentAccount] = React.useState<string | undefined>(undefined)

    React.useEffect(() => {
        const loadSigner = async () => {
            const browserProvider = new BrowserProvider(ethereum)
            const signer = await browserProvider.getSigner()
            const transactionContract = new Contract(contractAddress, contractAbi, signer)
            setTransactionManager(new TransactionManager(ethereum, browserProvider, signer, transactionContract))
        }

        loadSigner()
    }, [])


    React.useEffect(() => {
        const setAccount = async () => {
            const accounts = await transactionManager?.getWalletAccounts()
            setCurrentAccount(accounts?.[0])
        }

        setAccount()
    }, [transactionManager])

    if (!transactionManager) {
        return
    }
    

    return (
        <TransactionContext.Provider value={{
            transactionManager: transactionManager,
            currentAccount: currentAccount
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => React.useContext(TransactionContext)

class TransactionManager {
    private ethereum
    private browserProvider
    private signer
    private transactionContract
    constructor(ethereum: any, browserProvider: BrowserProvider, signer: JsonRpcSigner, transactionContract: Contract) {
        this.ethereum = ethereum
        this.browserProvider = browserProvider
        this.signer = signer
        this.transactionContract = transactionContract

        this.getWalletAccounts = this.getWalletAccounts.bind(this)
        this.sendTransaction = this.sendTransaction.bind(this)
        this.getTransactionCount = this.getTransactionCount.bind(this)
    }

    public getWalletAccounts = async () => {
        try {
            if (!this.ethereum) {
                return alert('Please, install Metamask. More info: https://metamask.io/download/')
            }
    
            return await this.ethereum.request({ method: 'eth_requestAccounts' });

        } catch (err) {
            throw new Error('Unable to retrieve accounts')
        }
    }

    public sendTransaction = async (formData: FormData, currentAccount: string) => {
        const {addressTo, amount, keyword, message} = formData

        if (!addressTo || !amount || !keyword || !message) {
            return console.error('Invalid form data')
        }

        const parsedAmount = parseEther(amount)
        const params = [{
            from: currentAccount,
            to: addressTo,
            gas: toBeHex('40000'),
            value: toBeHex(parsedAmount)
        }]

        this.ethereum.request({
            method: 'eth_sendTransaction',
            params: params
        })

        return await this.transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
    }

    public getTransactionCount = async () => {
        return await this.transactionContract.transactionCount()
    }
}


