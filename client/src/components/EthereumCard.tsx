import {LiaEthereum} from 'react-icons/lia'
import {IoMdInformationCircle} from 'react-icons/io'
import {FaMoneyCheckDollar} from 'react-icons/fa6'
import { IconContext } from 'react-icons';
import { useTransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

interface WhitenedElementProps {
    El: string
    stylingProps?: {[key: string]: string}
}

function WhitenedElement({El, stylingProps}: WhitenedElementProps) {
    return (
      <IconContext.Provider
        value={{ color: 'white', ...stylingProps}}
      >
        <El />
      </IconContext.Provider>
    );
  }

export const EthereumCard = () => {

    const context = useTransactionContext()

    if (!context) {
        return
    }
    const {currentAccount} = context
    return (
        <div className='bg-red border-2 border-black w-72 rounded-xl pl-2 blue-ethereum-card p-2'>
            <ul className='flex pb-10 justify-between'>
                <li>
                    <WhitenedElement El={LiaEthereum} stylingProps={{size: '40px'}}/>
                </li>
                <li>
                    <WhitenedElement El={IoMdInformationCircle} stylingProps={{size: '24px'}}/>
                </li>
            </ul>

            {
                currentAccount ? 
                <h3 className='text-black text-md'>{shortenAddress(currentAccount)}</h3>
                :
                <h3 className='text-black text-lg'>...</h3>
            }
            <ul className='flex justify-between items-center'>
                <li className='text-black font-bold text-lg'>Ethereum</li>
                <li>
                    <WhitenedElement El={FaMoneyCheckDollar} stylingProps={{size: '24px'}}/>
                </li>
            </ul>
        </div>
    )
}