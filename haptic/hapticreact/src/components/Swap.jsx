import { React, useState, useEffect } from 'react'
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useMoralis } from "react-moralis";

const Swap = () => {

    const { Moralis } = useMoralis();
    let dex = Moralis.Plugins.oneInch;

    /**
     *  Tokens we support on polygon mainnet chain are in TokenMap.
     *  This list represents a subset of what is available on 1Inch.
     */
    let tokenMap = new Map();

    //gOhm
    tokenMap.set('geome', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');
    tokenMap.set('giong', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');
    tokenMap.set('gion', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');
    tokenMap.set('g home', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');
    tokenMap.set('ohm', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');
    tokenMap.set('home', '0xd8ca34fd379d9ca3c6ee3b3905678320f5b45195');

    tokenMap.set('comp', '0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c');
    tokenMap.set('Celsius', '0xd85d1e945766fea5eda9103f918bd915fbca63e');
    tokenMap.set('Mana', '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4');
    tokenMap.set('avalanche', '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b');
    tokenMap.set('Klima', '0x4e78011ce80ee02d2c3e649fb657e45898257815');
    tokenMap.set('ethereum', '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619');
    tokenMap.set('die', '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'); //dai lol
    tokenMap.set('Sushi', '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a');
    //Matic
    tokenMap.set('Matic', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    tokenMap.set('Maddock', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

    tokenMap.set('Ave', '0xd6df932a45c0f255f85145f286ea0b292b21c90b'); //aave
    tokenMap.set('frax', '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89');
    tokenMap.set('chain-link', '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39');
    tokenMap.set('chain link', '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39');
    tokenMap.set('link', '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39');
    tokenMap.set('uni', '0xb33eaad8d922b1083446dc23f610c2567fb5180f');
    tokenMap.set('uniswap', '0xb33eaad8d922b1083446dc23f610c2567fb5180f');

    const commands = [
        {
            command: "swap * of * to *",
            callback: (amount, token1, token2) => {
                swapTokens(amount, token1, token2).then(result => console.log(result));
            },
        },
        {
            command: "get tokens list",
            callback: () => {
                getSupportedTokens().then(result => console.log(result));
            },
        },
        {
            command: "quote * of * to *",
            callback: (amount, token1, token2) => {
                getQuote(amount, token1, token2).then(result => console.log(result));
            },
        },
        {
            command: "reset",
            callback: () => {
                handleReset();
                console.log("Transcript has been reset!")
            },
        },
    ]
    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);
    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    async function instructions() {
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({
            text: `Haptic dex uses uniswaps dex to allow you to swap tokens.
                        If you are signed into Haptic Dao you are automatically connected
                        to uniswap with your wallet and may begin trading. Alternatively there 
                        is a speak button below the instructions where you may request a token swap 
                        quote. After finding out the quote amount you may then request that swap.
                        Strong vibrations will indicate that a swap is occurring.` });
    }

    async function getSupportedTokens() {
        const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
            chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
        });
        console.log(tokens);
    }

    async function callCommands() {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.log("Browser Does Not Support Listening");
        }
        setIsListening(true);
        SpeechRecognition.startListening();
        console.log("transcript is: ", transcript);

        await hapticVibrationService.warningVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
    }
    const handleReset = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    async function getQuote(amount, token1, token2) {
        const quote = await Moralis.Plugins.oneInch.quote({
            chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
            fromTokenAddress: tokenMap.get(token1), // The token you want to swap --> gOhm
            toTokenAddress: tokenMap.get(token2), // The token you want to receive --> Pool
            amount: amount,
        });
        console.log(quote);
        console.log("Amount of token 2 is :", quote.toTokenAmount);

        await hapticVibrationService.successVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: `Amount of ${token2} you would be receiving for ${amount} of ${token1} is: ${quote.toTokenAmount}` });

    }

    async function swapTokens(amount, token1, token2) {

        let currentUser = Moralis.User.current();
        if (!currentUser) {
            currentUser = Moralis.authenticate();
        }

        console.log("Current User is : ", currentUser);
        console.log("Current User Address is : ", currentUser.get("ethAddress"));

        console.log("Amount is : ", amount);
        console.log("token 1 is  : ", token1);
        console.log("token 1 Address is  : ", tokenMap.get(token1));
        console.log("token 2 is  : ", token2);
        console.log("token 2 Address is  : ", tokenMap.get(token2));

        const options = {
            chain: "polygon",
            fromTokenAddress: tokenMap.get(token1),
            toTokenAddress: tokenMap.get(token2),
            amount: Number(amount) * 10 ** 18,
            fromAddress: currentUser.get("ethAddress"),
            slippage: 5
        }

        let receipt = await dex.swap(options)
        console.log(receipt);

        await hapticVibrationService.warningVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({
            text: `Transaction for swapping ${amount} of ${token1} to ${token2} is being processed. 
        Upon completion you may check your wallet balance on the dashboard screen.` });

    }

    async function init() {
        await Moralis.initPlugins();
        await Moralis.enableWeb3();
        console.log("Moralis init");
    }

    useEffect(() => {
        async function switchChains() {
            await init();
            await Moralis.switchNetwork("0x89");
        }
        switchChains();
    },[] );



    return (
        <div name='dex' className='w-full h-[120vh] justify-center bg-teal-100'>
            <div className='max-w-[500px] mx-auto px-8  justify-center '>
                <br /><br /><br /> <br />
                <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic DEX</h1>
                <br />
                <div className='max-w-[1000px] mx-auto px-20  justify-center'>
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={instructions}>
                        Instructions
                    </button>
                    <br /><br />
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={callCommands}>
                        Speak Swap
                    </button>
                </div>
            </div>

            <br />
            <iframe name='uniswap' src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
                title="uniswap"
                height="660px"
                width="100%"
                style={{
                    border: 0, margin: '0 auto', marginBottom: '0.5rem',
                    display: 'block', borderRadius: '10px', maxWidth: '960px', minWidth: '300px'
                }}
            />

        </div>
    )
}

export default Swap