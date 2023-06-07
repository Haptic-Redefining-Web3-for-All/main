import React, {useEffect} from 'react'
import DaoCardList from './DaoCardList'
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';
import DaoProposalModal from './DaoProposalModal';
import { useMoralis } from 'react-moralis';


const Dao = () => {

    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();
    const { Moralis } = useMoralis();

    async function instructions() {
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: `Haptic dow is the actual dow of the dapp. Below this button is a button to add
                       proposals for what features the dapp developers should develop next. You may also 
                       select existing proposals to hear them aloud and then upvote or downvote on their 
                       usefullness. Voting or adding proposals will charge a small amount of our governance
                       HG token to prevent spamming. ` });
    }

    async function init() {
        await Moralis.initPlugins();
        await Moralis.enableWeb3();
        console.log("Moralis init");
    }

    useEffect(() => {
        async function switchChains() {
            await init();
            await Moralis.switchNetwork("0x4");
        }
        switchChains();
    },[] );

    return (
        <>
            <div name='dao' className='w-full h-screen justify-center bg-teal-100'>
                <div className='max-w-[300px] mx-auto px-8  justify-center '>
                    <br /><br /><br /> <br />
                    <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>DAO</h1>
                    <br /><br />
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 items-center rounded-full" onClick={instructions}>
                        Instructions
                    </button>
                    <br/><br/>           
                    <DaoProposalModal/>
                    <br /><br />
              

                </div>

                <DaoCardList />

            </div>
        </>
    )
}

export default Dao