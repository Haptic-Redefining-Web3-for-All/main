import React from 'react'
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';
import hapticDAO from './utils/HapticDao.json';
import { ethers } from "ethers";

const DaoCard = (props) => {
  
    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    //Amount to send for voting
    const options = {value: ethers.utils.parseEther("0.01")};

    const contractAddress = "0x49Bf054E5Dc02998ECd4C31F94cAB38821c5983f";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const hapticDAOContract = new ethers.Contract(contractAddress, hapticDAO.abi, signer);
  

    async function readCard(){
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: `Feature ${props.title}. This feature would ${props.description}.
                       The Current Score for this feature is ${props.score}` });
        console.log(props.description);
    }

    async function upvote() {
        await hapticDAOContract.increaseScore(props.title, options);
        console.log("Successfully upvoted");
        speak({text: `You have successfully up voted the ${props.title} feature.
                      The score will be updated once the transaction is complete.`})
    }
    async function downvote() {
        await hapticDAOContract.decreaseScore(props.title, options);
        console.log("Successfully upvoted");
        speak({text: `You have successfully down voted the ${props.title} feature.
                        The score will be updated once the transaction is complete.`})
    }
    

    return (
        <div className="w-full py-2 gap-4 flex-wrap flex justify-center items-center bg-teal-100" >
            <div className="w-80 p-4 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl" onClick={readCard}>
                <div className="p-2">
                    {/* <!-- Heading --> */}
                    <h2 className="font-bold text-lg mb-2 ">{props.title}</h2>
                    {/* <!-- Description --> */}
                    <p className="text-sm text-gray-600">{props.description}</p>
                </div>
                <br/>
                <p className="text-sm text-gray-600">Score is : {props.score}</p>

                <div className="m-2">
                    <a role='button' className="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-700" onClick={upvote}>Upvote</a>
                    &nbsp;
                    <a role='button' className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700" onClick={downvote}>Downvote</a>
                </div>
            </div>

        </div>
    )
}

export default DaoCard;