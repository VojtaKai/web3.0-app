import { BsFacebook, BsInstagram,  } from 'react-icons/bs'
import { BiLogoGmail } from 'react-icons/bi'
import { FaTiktok } from 'react-icons/fa'


export const Footer = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between items-center px-10'>
                <h1 className='w-3/12 md:text-left text-center'>CHAIN WALLET Ltd. (Fake Name)</h1>
                <ul className='flex flex-col md:flex-row md:justify-evenly items-center md:w-9/12 w-full flex-wrap'>
                    <li className="mx-8 py-2 text-blue-700 font-medium flex-wrap">Check Markets</li>
                    <li className="mx-8 py-2 text-blue-700 font-medium flex-wrap">Add wallet</li>
                    <li className="mx-8 py-2 text-blue-700 font-medium flex-wrap">Visible wallets</li>
                </ul>
            </div>
            <div className='flex flex-col items-center pt-4 pb-2'>
                <h3>Send, trade and invest with us!</h3>
                <h3 className='flex flex-row'><a href = "mailto: info@chainwallet.eu"><BiLogoGmail fontSize={24} /></a>info@chainwallet.eu</h3>
            </div>
            <div className='h-[0.25px] bg-black my-4 mx-4'></div>
            <div className='flex flex-row justify-between mx-10 pb-4'>
                <div className='flex flex-row md:w-[400px] w-full justify-evenly'>
                    <h3>Get in Touch with us</h3>
                    <a href = "mailto: info@chainwallet.eu"><BiLogoGmail fontSize={24} className={'text-yellow-400'} /></a>
                    <a href="https://www.facebook.com/groups/1998388220463236" target='_blank' rel="noreferrer"><BsFacebook fontSize={24} className={'text-blue-800'} /></a>
                    <a href = "https://www.instagram.com/cryptocomofficial" target='_blank' rel="noreferrer"><BsInstagram fontSize={24} className={'text-[#833AB4]'}/></a>
                    <a href = "https://www.tiktok.com/@tradingface" target='_blank' rel="noreferrer">< FaTiktok fontSize={24} className={'text-red-700'} /></a>
                </div>
                <h4>All rights reserved</h4>
            </div>
        </div>
    )
}