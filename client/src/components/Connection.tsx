import * as React from 'react'
import {GrConnect} from 'react-icons/gr'
import { EthereumCard } from './EthereumCard'
import { Loader } from './Loader'
import { useTransactionContext } from '../context/TransactionContext'

interface InputProps {
    id: string
    value: string
    placeholder: string
    prop: keyof FormData
    handler: (prop: keyof FormData, newValue: string) => void
    type?: string
}

export interface FormData {
    addressTo: string,
    amount: string,
    keyword: string,
    message: string
}

const Input = ({type, id, placeholder, prop, handler, value}: InputProps) => {
    return <input type={type ?? 'text'} id={id} key={id} placeholder={placeholder} value={value} onChange={e => handler(prop, (e.target?.value as string) ?? '')} className='m-2 px-2 border-black border-2 w-80'></input>
}

interface LinesProps {
    styleProps: string
    title: string
}

interface ValidData {
    valid: boolean
    errorMessage?: string
}

const Guarantee = (props: LinesProps) => {
    const baseStyle = 'border-4 border-black w-32 text-center py-1 bg-blue-400 cursor-pointer'
    return <li className={`${baseStyle} ${props.styleProps}`}><h1 className='hover:font-bold hover:text-blue-700 font-openSans'>{props.title}</h1></li>
}

export const Connect = () => {
    const [formData, setFormData] = React.useState<FormData>({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })

    const [isValidData, setIsValidData] = React.useState<ValidData>({
        valid: false
    })

    const context = useTransactionContext()

    if (!context) {
        throw new Error('Context undefined')
    }

    const {currentAccount, sendTransaction, getWalletAccounts, isLoading} = context

    const inputHandler = React.useCallback((prop: keyof FormData, newValue: string) => {
        setFormData(prevFormData => {
            const newFormData = {...prevFormData}
            newFormData[prop] = newValue
            return newFormData
        })
    }, [formData])

    const validateFormData = React.useCallback((formData: FormData) => {
        const {addressTo, amount, keyword, message} = formData
        if (!addressTo || !amount || !keyword || !message) {
            setIsValidData({
                valid: false,
                errorMessage: 'Invalid input. All fields must be filled.'
            })
        }
        else {
            setIsValidData({
                valid: true
            })
        }
    }, [])

    const submitHandler = React.useCallback(async () => {
        validateFormData(formData)
        const succeeded = await sendTransaction(formData)
        if (succeeded) {
            setFormData({
                addressTo: '',
                amount: '',
                keyword: '',
                message: ''
            })
        }
    }, [sendTransaction, formData])

    return (
        <div className='md:flex md:flex-row block md:justify-evenly justify-center w-full md:mt-[90px] mt-0'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl mt-4 md:mt-0'>Connect with the World</h1>
                <h1 className='text-3xl md:self-start mt-4 md:mt-0'>Send transactions across the world <br /> with immediate affect</h1>
                {
                    !currentAccount && 
                        <button 
                            className='flex space-x-2 justify-between items-center py-2 px-8 bg-blue-500 border-2 border-black rounded-2xl my-8'
                            onClick={getWalletAccounts}
                        >
                            <GrConnect />
                            <h3 className='hover:font-bold'>Connect Your Wallet</h3>
                        </button>
                }
                <div className='pt-16'>
                    <ul className='flex'>
                        {[['Secure', 'border-r-2 border-b-2 rounded-tl-full'], ['Reliable', 'border-x-2 border-b-2'], ['Web 3.0', 'border-l-2 border-b-2 rounded-tr-full']]
                        .map(([title, styling]) =>(<Guarantee key={(Math.random() * 1000000000).toString()} title={title} styleProps={styling} />))}
                    </ul>
                    <ul className='flex'>
                    {[['Immediate', 'border-r-2 border-t-2 rounded-bl-full'], ['Worldwide', 'border-x-2 border-t-2 '], ['Blockchain', 'border-l-2 border-t-2 rounded-br-full']]
                        .map(([title, styling]) =>(<Guarantee key={(Math.random() * 1000000000).toString()} title={title} styleProps={styling} />))}
                    </ul>
                </div>
            </div>
            <div className='flex flex-col items-center mt-[40px] md:mt-0'>
                <EthereumCard />
                <div className='flex flex-col border-black border-4 m-2 rounded-xl mt-5'>
                    <Input id='Address To' prop='addressTo' value={formData.addressTo} placeholder='Address To' handler={inputHandler}/>
                    <Input id='Amount (ETH)' prop='amount' value={formData.amount} placeholder='Amount (ETH)' handler={inputHandler}/>
                    <Input id='Keyword (GIF)' prop='keyword' value={formData.keyword} placeholder='Keyword (GIF)' handler={inputHandler}/>
                    <Input id='Enter Message' prop='message' value={formData.message} placeholder='Enter Message' handler={inputHandler}/>
                    <div className='flex self-center w-[92%] h-[1px] bg-black px-'></div>
                    {
                        isLoading ? 
                        <Loader /> : 
                        <div className='flex justify-center p-2'>
                            <button className='px-2 py-1 border-2 rounded-xl border-black bg-blue-400 hover:bg-blue-600' onClick={submitHandler}>  
                                <h1 className='hover:font-medium'>Send Transaction</h1>
                            </button>
                        </div>
                    }
                    {
                        !isValidData.valid && <h1 className="text-red-500 self-center">{isValidData.errorMessage}</h1>
                    }
                </div>
            </div>
        </div>
    )
}