import {React} from 'react'
import Hands3D from './3DHands';
import { useSpeechSynthesis } from 'react-speech-kit';
import HapticVibrationService from '../services/HapticVibrationService';
import Auth from './Auth';
import MainPage from './MainPage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const Home = () => {
    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    async function handleVibrate() {
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Entering The Application" });
        return(
         <Routes>
            <Route path="/main" exact element={<MainPage/>} />
         </Routes>
        );
    }

    return (

        <div name='home' className='w-full h-screen justify-center bg-teal-100'>
            <div className='max-w-[500px] mx-auto px-8  justify-center '>
                <br /><br /><br /> <br />

                <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic DAO</h1>
                <br /><br />
                <br /><br />

            </div>

            <div className='max-w-[200px] mx-auto px-8  justify-center '>
                <Link className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded-full" to='/main' onClick={handleVibrate}>
                   ENTER APP
                </Link>
            </div>
            <br />

            



            {/* Hide 3D Design on Mobile to show menu */}
            <div className='hidden md:flex mx-auto px-8  justify-center'>
                {/* <Hands3D /> */}
            <iframe title="3D Hands" src='https://my.spline.design/hapticlogo-fb22e1ef24b65fc8f1b9fe2b5b3f7010/' frameborder='0' width='600px' height='600px' >
            </iframe>
            </div>

        </div>

    )
}
export default Home;

