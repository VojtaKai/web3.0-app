import * as React from 'react'
import { Twirl as Hamburger } from 'hamburger-react'

export const Navbar = () => {
    const [isToggled, setIsToggled] = React.useState(false) 

    const onToggle = () => {
        setIsToggled(prevState => !prevState)
    }

    const onLogin = () => {
        console.log('LOGIN CLICKEEEED')
    }
    return (
        <>
            <nav className="flex">
                <ul className="flex flex-row w-full justify-start">
                    <ol className="md:w-3/12 w-6/12">
                        <li className="w-full cursor-pointer"><img src="/src/assets/chain-wallet-new.png"/></li>
                    </ol>
                    <ol className="w-9/12 md:inline-flex hidden justify-end" >
                        <li className="p-2 text-purple-700 font-medium self-center">Check Markets</li>
                        <li className="p-2 text-purple-700 font-medium self-center">Add wallet</li>
                        <li className="p-2 text-purple-700 font-medium self-center">Visible wallets</li>
                        <li className="m-2 text-purple-700 font-bold self-center">
                            <button className="py-2 px-10 bg-purple-300 border-2 border-purple-800 rounded-3xl" onClick={onLogin}>
                                Login
                            </button>
                        </li>
                    </ol>
                </ul>
                <div className="flex justify-end md:hidden z-20">
                    <Hamburger onToggle={onToggle} toggled={isToggled}/>
                </div>
                {isToggled && (
                    <ul
                        className="z-10 fixed mt-8 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="mx-4 py-2 text-purple-700 font-medium flex-wrap">Check Markets</li>
                        <li className="mx-4 py-2 text-purple-700 font-medium flex-wrap">Add wallet</li>
                        <li className="mx-4 py-2 text-purple-700 font-medium flex-wrap">Visible wallets</li>
                        <li className="p-2 text-purple-700 font-bold flex-nowrap">
                            <button className="py-2 px-10 bg-purple-300 border-2 border-purple-800 rounded-3xl" onClick={onLogin}>
                                Login
                            </button>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    )
}