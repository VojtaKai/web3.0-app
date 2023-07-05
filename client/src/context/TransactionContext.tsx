import * as React from 'react'
import {BrowserProvider, Contract, formatEther, parseEther, toBeHex} from 'ethers'
import { contractAbi, contractAddress } from '../utils/constants'
import { FormData } from '../components/Connection';
import { TransactionProps } from '../components/Transactions';

export interface ITransactionContext {
    currentAccount: string | undefined
    sendTransaction: (formData: FormData) => Promise<boolean>
    getWalletAccounts: () => Promise<void>
    transactionCount: number
    isLoading: boolean
    getAllTransactions: () => Promise<void>
    allTransactions: TransactionProps[]
}

type TransactionTuple = [string, string, number, string, number, string]

const { ethereum } = window as any;

export const TransactionContext = React.createContext<ITransactionContext | null>(null);

export const TransactionProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [currentAccount, setCurrentAccount] = React.useState<string | undefined>(undefined)
    const [transactionCount, setTransactionCount] = React.useState<number>(Number(localStorage.getItem('txCount')) ?? 0)
    const [allTransactions, setAllTransactions] = React.useState<TransactionProps[]>([])
    const [transactionContract, setTransactionContract] = React.useState<Contract | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    
    
    React.useEffect(() => {
        const setupContract = async () => {
            const browserProvider = new BrowserProvider(ethereum)
            const signer = await browserProvider.getSigner()
            setTransactionContract(new Contract(contractAddress, contractAbi, signer))
        }

        setupContract()
    }, [])

    React.useEffect(() => {
        const setupTransactionCount = async () => {
            await getTransactionCount()
        }
        
        setupTransactionCount
    }, [transactionContract])



    React.useEffect(() => {
        const setAccount = async () => {
            const accounts = await getWalletAccounts()
            setCurrentAccount(accounts?.[0])
        }

        setAccount()
    }, [])

    const getWalletAccounts = React.useCallback(async () => {
        try {
            if (!ethereum) {
                return alert('Please, install Metamask. More info: https://metamask.io/download/')
            }
    
            return await ethereum.request({ method: 'eth_requestAccounts' });

        } catch (err) {
            throw new Error('Unable to retrieve accounts')
        }
    }, [])


    const sendTransaction = React.useCallback(async (formData: FormData) => {
        if (!transactionContract) {
            throw new Error('Contract failed to setup')
        }

        const {addressTo, amount, keyword, message} = formData

        if (currentAccount === addressTo) {
            throw new Error("Invalid action. One cannot send themselves ether")
        }

        if (!addressTo || !amount || !keyword || !message) {
            return false
        }
        
        let succeeded = false

        try {
            const parsedAmount = parseEther(amount)

            ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: toBeHex('21000'),
                    value: toBeHex(parsedAmount)
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            setIsLoading(true)
            await transactionHash.wait()
            setIsLoading(false)
    
            await getTransactionCount()
            succeeded = true

            await getAllTransactions()
        } catch {
            setIsLoading(false)
            console.error('Sending of a tx failed')
        }

        return succeeded
    }, [transactionContract])

    const getTransactionCount = React.useCallback(async () => {
        if (!transactionContract) {
            throw new Error('Contract failed to setup')
        }
        const transactionCount = await transactionContract.transactionCount()
        localStorage.setItem('txCount', transactionCount)
        setTransactionCount(Number(transactionCount))
    }, [transactionContract])

    const getAllTransactions = React.useCallback(async () => {
        if (!transactionContract) {
            throw new Error('Contract failed to setup')
        }
        const transactionTuples: TransactionTuple[] = await transactionContract.getAllTransactions()
        console.log('transactionTuples', transactionTuples)
        
        const allTransactions: TransactionProps[] = transactionTuples.map(t => {
            return {
                id: Math.random(),
                addressFrom: t[0],
                addressTo: t[1],
                amount: formatEther(t[2]),
                message: t[3],
                timestamp: Number(t[4]) * 1000, // to ms
                keyword: t[5]
            }
        })
        setAllTransactions(allTransactions)
    }, [transactionContract])
    

    return (
        <TransactionContext.Provider value={{
            currentAccount,
            isLoading,
            getWalletAccounts,
            sendTransaction,
            transactionCount,
            getAllTransactions,
            allTransactions
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => React.useContext(TransactionContext)


