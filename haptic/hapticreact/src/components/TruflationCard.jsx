import React from 'react'
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';

const TruflationCard = (props) => {

    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    async function readCard(){
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: `The Rate for ${props.title} is ${props.description}` });
        console.log(props.description);
    }

    return (
        <div className="w-full py-6 px-4 gap-8 flex-wrap flex justify-center items-center bg-teal-100" onClick={readCard}>
        <div className="w-80 p-4 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <div className="p-2">
                {/* <!-- Heading --> */}
                <h2 className="font-bold text-lg mb-2 ">{props.title} {props.emoji}</h2>
            </div>
            {/* <!-- Rate --> */}
            <p className="text-sm text-gray-600">Rate is:  {props.description}</p>

        </div>
        </div>
    )
}

export default TruflationCard