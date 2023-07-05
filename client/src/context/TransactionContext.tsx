import * as React from 'react'
import {BrowserProvider, Contract, formatEther, parseEther, toBeHex} from 'ethers'
import { contractAbi, contractAddress } from '../utils/constants'
import { FormData } from '../components/Connection';
import { TransactionProps } from '../components/Transactions';
import { BigNumberish } from 'ethers';

export interface ITransactionContext {
    currentAccount: string | undefined
    sendTransaction: (formData: FormData) => Promise<boolean>
    getWalletAccounts: () => Promise<void>
    transactionCount: number
    isLoading: boolean
    allTransactions: TransactionProps[]
}

type TransactionTuple = [string, string, BigNumberish, string, BigNumberish, string]

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
    
    const getWalletAccounts = React.useCallback(async () => {
        try {
            if (!ethereum) {
                return alert('Please, install Metamask. More info: https://metamask.io/download/')
            }
    
            return await ethereum.request({ method: 'eth_requestAccounts' });

        } catch (err) {
            throw new Error('Unable to retrieve accounts')
        }
    }, [ethereum])


    const getTransactionCount = React.useCallback(async () => {
        if (!transactionContract) {
            return
        }
        const transactionCount = await transactionContract.transactionCount()
        localStorage.setItem('txCount', transactionCount)
        setTransactionCount(Number(transactionCount))
    }, [transactionContract])

    const getSortedTransactions = React.useCallback(async () => {
        if (!transactionContract) {
            return []
        }
        const transactionTuples: TransactionTuple[] = await transactionContract.getAllTransactions()
        
        const allTransactions: TransactionProps[] = transactionTuples.map(t => ({
            id: Math.random(),
            addressFrom: t[0],
            addressTo: t[1],
            amount: formatEther(t[2]),
            message: t[3],
            timestamp: Number(t[4]) * 1000, // to ms
            keyword: t[5]
        }))
        return allTransactions.sort((t1, t2) => t1.timestamp > t2.timestamp ? -1 : 1)
    }, [transactionContract])

    const setAccount = React.useCallback(async () => {
        const accounts = await getWalletAccounts()
        setCurrentAccount(accounts?.[0])
    }, [getWalletAccounts])

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

            setAllTransactions(await getSortedTransactions())
        } catch {
            setIsLoading(false)
            console.error('Sending of a tx failed')
        }

        return succeeded
    }, [transactionContract, currentAccount, setAccount, getSortedTransactions])

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
    }, [getTransactionCount])

    React.useEffect(() => {
        setAccount()
    }, [setAccount])

    React.useEffect(() => {
        const setupTransactions = async () => {
            const sortedTransactions = await getSortedTransactions()
            setAllTransactions(sortedTransactions)
        }

        setupTransactions()
    }, [getSortedTransactions])

    React.useEffect(() => {
        if(ethereum) {
            ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }
    })

    return (
        <TransactionContext.Provider value={{
            currentAccount,
            isLoading,
            getWalletAccounts,
            sendTransaction,
            transactionCount,
            allTransactions
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionContext = () => React.useContext(TransactionContext)


