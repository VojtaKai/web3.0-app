import * as React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'
interface ServiceCardProps {
    title: string
    description: string
    icon: React.ReactElement
    key: string
}

const ServiceCard = (props: ServiceCardProps) => {
    const {title, description, icon, key} = props
    return (
        <li key={key} className='border-2 rounded-xl border-black p-4 my-4 lg:w-9/12 w-full'>
            <div className='flex'>
                <div className='w-10 h-10 flex justify-center items-center rounded-full bg-blue-800 mr-2'>
                    {icon}
                </div>
                <div>
                    <h1 className='font-semibold'>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </li>
    )
}

export const Services = () => {
    return (
        <div className='flex lg:flex-row flex-col w-full lg:justify-center items-center lg:space-x-16 align-start py-24'>
            <div className="flex-1 flex flex-col justify-start md:items-start items-center lg:pl-36">
                <h1 className='text-5xl text-center md:text-start'>Services that we <br /> continue to improve</h1>
                <h3 className='text-xl mt-4 text-center md:text-start'>Buy, sell, and transfer crypto assets with the user-friendly services we offer</h3>
            </div>
            <ul className='flex flex-col items-center lg:items-start'>
                {[
                    {
                        icon: <BsShieldFillCheck fontSize={21} className='text-white'/>,
                        title: 'Security guarantee',
                        description: 'As a company we hold highly the security and privacy of our customers. Your data is secured with us.',
                        key: 'security'
                    },
                    {
                        icon: <BiSearchAlt fontSize={21} className='text-white'/>,
                        title: 'Best exchange rates',
                        description: 'We are working on our protocol to make the exchange rates as low as possible.',
                        key: 'rates'
                    },
                    {
                        icon: <RiHeart2Fill fontSize={21} className='text-white'/>,
                        title: 'Unlimited Exchange',
                        description: 'Exhange that never stops. Trade crypto assets regardless the time of the day.',
                        key: 'unlimited'
                    }
                ].map(service => ServiceCard(service))}
            </ul>
        </div>
    )
}