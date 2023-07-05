import { useTransactionContext } from '../context/TransactionContext';
import { useFetch } from '../hooks/useFetch';
import dummyData from '../utils/dummyData'

interface TransactionProps {
    id?: number;
    url?: string;
    keyword?: string
    message?: string;
    timestamp?: string;
    addressFrom?: string;
    amount?: string;
    addressTo?: string;
}

const Transaction = (props: TransactionProps) => {
    const { url, addressFrom, addressTo, keyword, amount, timestamp} = props
    let gifUrl

    if (keyword) {
        gifUrl = useFetch({keyword})
        
    }

    return (
        <li className='md:3/12 m-2'>
            <div className='flex flex-col bg-blue-600 rounded-3xl md:4/12 p-2'>
                <a href={``} target='_blank'>{`From: ${addressFrom}`}</a>
                <a href={``} target='_blank'>{`To: ${addressTo}`}</a>
                <h1>{`Amount: ${amount}`}</h1>
                <img src={gifUrl ?? url} className='px-2 rounded-xl w-96 h-96 self-center'></img>
                <text className='text-white text-center border-black rounded-xl bg-black w-[50%] self-center mt-[-12px]'>{timestamp}</text>
            </div>
        </li>
    )
}

export const Transactions = () => {
    const context = useTransactionContext()
    if (!context) {
        return
    }
    const {currentAccount} = context
    return (
        <div className='flex flex-col items-center py-10'>
            {currentAccount ? 
                <h1 className='text-3xl mb-4'>Latest transactions</h1>
                :
                <h1 className='text-3xl mb-4'>Connect your wallet to see the latest transactions</h1>
            }
            <ul className='flex flex-row justify-center flex-wrap'>
                {dummyData.reverse().map((transaction: TransactionProps) => <Transaction {...transaction} key={transaction.id}/>)}
            </ul>
        </div>
    )
}