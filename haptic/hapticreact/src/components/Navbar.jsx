import React, { useState } from 'react';
import Logo from '../assets/hdLogo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import Auth from './Auth';



const Navbar = () => {
    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    async function selectSend() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Transfer" });
    }
    async function selectDao() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        //DAO pronunciation lol
        speak({ text: "dow" });
    }
    async function selectSwap() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Dex" });
    }
    async function selectMarketplace() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Marketplace" });
    }
    async function selectHome() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Home" });
    }
    async function selectDashboard() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Dashboard" });
    }
    async function selectTruflation() {
        var status = await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "true-flay-shun" });
    }

    return (
        <div className='fixed w-full h-[100px] flex justify-between items-center px-4 bg-teal-100 text-gray-500'>
            <div>
                <Link to='/' onClick={selectHome}>
                    <img src={Logo} alt="Logo Image" style={{ width: '60px' }} />
                </Link>
            </div>

            <div>
                <ul className='hidden md:flex'>
                {/* <Link to='/send' onClick={selectSend}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>TRANSFER</li></Link> */}
                <Link to='/dashboard' onClick={selectDashboard}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>DASHBOARD</li></Link>
                <Link to='/dao' onClick={selectDao}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>DAO</li></Link>
                    <Link to='/truflation' onClick={selectTruflation}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>Truflation</li></Link>           
                <Link to='/swap' onClick={selectSwap}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>DEX</li></Link>
                {/* <Link to='/marketplace' onClick={selectMarketplace}>
                    <li className='bg-transparent hover:bg-teal-500 hover:text-white rounded-2xl px-2 py-6'>MARKET</li></Link> */}
    
                    <li><Auth/></li>

                </ul>
            </div>

            
            {/* Menu bars */}
            <div onClick={handleClick} className='md:hidden z-10'>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>
        
         

            {/* Menu for Mobile */}
            <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-teal-100 flex flex-col justify-center items-center'}>
            <Auth/>
                {/* <li className='py-6 text-4xl'><Link to='/send' className='hover:bg-teal-500 hover:text-white' onClick={selectSend}>TRANSFER</Link></li> */}
                <li className='py-6 text-4xl'><Link to='/dashboard' className='hover:bg-teal-500 hover:text-white' onClick={selectDashboard}>DASHBOARD</Link></li>
                <li className='py-6 text-4xl'><Link to='/dao' className='hover:bg-teal-500 hover:text-white' onClick={selectDao}>DAO</Link></li>
                <li className='py-6 text-4xl'><Link to='/truflation' className='hover:bg-teal-500 hover:text-white' onClick={selectTruflation}>Truflation</Link></li>
                <li className='py-6 text-4xl'><Link to='/swap' className='hover:bg-teal-500 hover:text-white' onClick={selectSwap}>DEX</Link></li>

                {/* <li className='py-6 text-4xl'><Link to='/marketplace' className='hover:bg-teal-500 hover:text-white' onClick={selectMarketplace}>MARKET</Link></li> */}
            </ul>


        </div>
    )
}

export default Navbar