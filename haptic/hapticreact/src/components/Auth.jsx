import React, { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';

const Auth = () => {

    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const [button, setButton] = useState(false);
    const handleClick = () => setButton(!button);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Authenticated");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = async () => {
        if (!isAuthenticated) {

            await authenticate({ signingMessage: "Login using Moralis" })
                .then(function (user) {
                    console.log("logged in user:", user);
                    console.log(user.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
            var status = await hapticVibrationService.successVibrate(function (fallback) {
                console.log("Vibration encountered an error: ", fallback);
            });
            speak({ text: "Logged in" });

        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
        var status = await hapticVibrationService.failVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Logged out" });
    }

    return (
        <div onClick={handleClick} className=''>
            {!button ? <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded-full justify-left" onClick={login}>Login</button>
                : <button onClick={logOut} disabled={isAuthenticating} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-5 rounded-full">Logout</button>}
        </div>
    );
}

export default Auth;