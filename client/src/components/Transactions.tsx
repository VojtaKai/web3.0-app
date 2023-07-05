import { useTransactionContext } from '../context/TransactionContext';
import { useFetch } from '../hooks/useFetch';
import { shortenAddress } from '../utils/shortenAddress';

export interface TransactionProps {
    id: number;
    addressTo: string;
    addressFrom: string;
    amount: string;
    url?: string;
    keyword: string
    message: string;
    timestamp: number;
}

const Transaction = (props: TransactionProps) => {
    const { url, addressFrom, addressTo, keyword, amount, timestamp, message } = props

    const gifUrl = useFetch({keyword})

    return (
        <li className='m-2'>
            <div className='flex flex-col min-w-[500px] max-w-[500px] md:min-w-[300px] md:max-w-[300px] lg:min-w-[500px] lg:max-w-[500px] bg-blue-600 rounded-3xl p-4'>
                <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target='_blank'>{`From: ${shortenAddress(addressFrom)}`}</a>
                <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target='_blank'>{`To: ${shortenAddress(addressTo)}`}</a>
                <h1>{`Amount: ${amount} ETH`}</h1>
                { message && <h1>{`Message: ${message}`}</h1> }
                <img src={gifUrl ?? url} referrerPolicy='no-referrer' className='px-2 pt-2 rounded-xl h-64 lg:h-96 self-center object-cover'></img>
                <h1 className='text-white text-center border-black rounded-xl bg-black w-[50%] self-center mt-[-12px]'>{new Date(timestamp).toLocaleString()}</h1>
            </div>
        </li>
    )
}

export const Transactions = () => {
    const context = useTransactionContext()
    if (!context) {
        return
    }
    const {currentAccount, allTransactions} = context

    return (
        <div className='flex flex-col items-center py-10'>
            {currentAccount ? 
                <h1 className='text-3xl mb-4'>Latest transactions</h1>
                :
                <h1 className='text-3xl mb-4'>Connect your wallet to see the latest transactions</h1>
            }
            <ul className='flex flex-row justify-center flex-wrap'>
                {allTransactions.map((transaction: TransactionProps) => <Transaction {...transaction} key={transaction.id}/>)}
            </ul>
        </div>
    )
}