import { React, useState, useEffect } from 'react'
import { RiCoinsFill } from 'react-icons/ri';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import HapticVibrationService from '../services/HapticVibrationService';
import usdPriceABI from './utils/USDPriceConverter.json';
import { ethers } from "ethers";
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import CL from '../assets/chainlink.png';

const Dashboard = () => {

    const { Moralis } = useMoralis();
    const { Web3Api }= useMoralisWeb3Api();


    const commands = [
        {
            command: "get the price of ethereum",
            callback: () => {
                getPriceEth().then(result => console.log(result));
            },
        },
        {
            command: "get the price of bitcoin",
            callback: () => {
                getPriceBtc().then(result => console.log(result));
            },
        },
        {
            command: "get the price of link",
            callback: () => {
                getPriceLink().then(result => console.log(result));
            },
        },
        {
            command: "get the price of ltc",
            callback: () => {
                getPriceLtc().then(result => console.log(result));
            },
        },
        {
            command: "get the price of augur",
            callback: () => {
                getPriceRep().then(result => console.log(result));
            },
        },
        {
            command: "get the price of synthetics",
            callback: () => {
                getPriceSnx().then(result => console.log(result));
            },
        },
        {
            command: "get the price of Tron",
            callback: () => {
                getPriceTrx().then(result => console.log(result));
            },
        },
        {
            command: "get the price of Ripple",
            callback: () => {
                getPriceXrp().then(result => console.log(result));
            },
        },
        {
            command: "get wallet balance",
            callback: () => {
                fetchTokenBalances().then(result => console.log(result));
            },
        },
        {
            command: "reset",
            callback: () => {
                handleReset();
                console.log("transcript has been reset!");
            },
        },
    ];

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);
    const [price, setPrice] = useState(``);
    const [input, setInput] = useState('');

    const hapticVibrationService = new HapticVibrationService();
    const { speak } = useSpeechSynthesis();

    async function handleVibrate() {
        await hapticVibrationService.selectionVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        speak({ text: "Select the Speak button and state which token to retrieve price data for." });
        resetTranscript();
    }

    async function getTokenData() {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.log("Browser Does Not Support Listening");
        }
        setIsListening(true);
        SpeechRecognition.startListening();
        console.log("transcript is: ", transcript);

        await hapticVibrationService.successVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
    }

    ////////////////////////////////////////////////////////////////////////
    /*{ CODE TO FETCH FROM ORACLE: }*/

    const contractAddress = "0xBbdf8aB081eafB5Ea25745EBC1271fA9F8817671";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const usdPriceConverterContract = new ethers.Contract(contractAddress, usdPriceABI.abi, signer);

    async function determineTokenFetch() {
        await hapticVibrationService.successVibrate(function (fallback) {
            console.log("Vibration encountered an error: ", fallback);
        });
        if (input === 'ethereum' || input === 'eth') {
            getPriceEth().then(result => console.log(result));
        } else if (input === 'bitcoin' || input === 'btc') {
            getPriceBtc().then(result => console.log(result));
        } else if (input === 'chainlink' || input === 'link') {
            getPriceLink().then(result => console.log(result));
        } else if (input === 'litecoin' || input === 'ltc') {
            getPriceLtc().then(result => console.log(result));
        } else if (input === 'ripple' || input === 'xrp') {
            getPriceXrp().then(result => console.log(result));
        } else if (input === 'augur' || input === 'rep') {
            getPriceRep().then(result => console.log(result));
        } else if (input === 'synthetix' || input === 'snx') {
            getPriceSnx().then(result => console.log(result));
        } else if (input === 'tron' || input === 'trx') {
            getPriceTrx().then(result => console.log(result));
        }
    }


    async function getPriceEth() {
        let ethPrice = await usdPriceConverterContract.getLatestPriceEth() / 10 ** 8;
        ethPrice = ethPrice.toFixed(2);
        speak({ text: `Price of uh-thee-ree-um is ${ethPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Ethereum is : $${ethPrice}`);
        return ethPrice;
    }

    async function getPriceBtc() {
        let btcPrice = await usdPriceConverterContract.getLatestPriceBtc() / 10 ** 8;
        btcPrice = btcPrice.toFixed(2);
        speak({ text: `Price of Bitcoin is ${btcPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Bitcoin is : $${btcPrice}`);
        return btcPrice;
    }

    async function getPriceLink() {
        let linkPrice = await usdPriceConverterContract.getLatestPriceLink() / 10 ** 8;
        linkPrice = linkPrice.toFixed(2);
        speak({ text: `Price of Chainlink is ${linkPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Chainlink is : $${linkPrice}`);
        return linkPrice;
    }

    async function getPriceLtc() {
        let ltcPrice = await usdPriceConverterContract.getLatestPriceLtc() / 10 ** 8;
        ltcPrice = ltcPrice.toFixed(2);
        speak({ text: `Price of Lite Coin is ${ltcPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Lite Coin is : $${ltcPrice}`);
        return ltcPrice;
    }
    async function getPriceRep() {
        let repPrice = await usdPriceConverterContract.getLatestPriceRep() / 10 ** 8;
        repPrice = repPrice.toFixed(2);
        speak({ text: `Price of Augur is $${repPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Augur is : $${repPrice}`);
        return repPrice;
    }
    async function getPriceSnx() {
        let snxPrice = await usdPriceConverterContract.getLatestPriceSnx() / 10 ** 8;
        snxPrice = snxPrice.toFixed(2);
        speak({ text: `Price of Synthetix is $${snxPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Synthetix is : $${snxPrice}`);
        return snxPrice;
    }
    async function getPriceTrx() {
        let trxPrice = await usdPriceConverterContract.getLatestPriceTrx() / 10 ** 8;
        trxPrice = trxPrice.toFixed(2);
        speak({ text: `Price of Tron is $${trxPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Tron is : $${trxPrice}`);
        return trxPrice;
    }
    async function getPriceXrp() {
        let xrpPrice = await usdPriceConverterContract.getLatestPriceXrp() / 10 ** 8;
        xrpPrice = xrpPrice.toFixed(2);
        speak({ text: `Price of Ripple is $${xrpPrice.toString()}` });
        resetTranscript();
        setPrice(`Price of Ripple is : $${xrpPrice}`);
        return xrpPrice;
    }

    const handleReset = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        resetTranscript();
        setPrice('');
    };

    const fetchTokenBalances = async () => {
        const options = {
            chain: 'rinkeby',
        }
        const balances = await Moralis.Web3API.account.getTokenBalances(options);
        let balance = await Moralis.Web3API.account.getNativeBalance(options);
        balance = (Number(balance.balance) / 10 ** 18).toFixed(4);
        console.log("balance is", balance);


        speak({ text: "User has the following token balances in their connected wallet address." })
        speak({ text: `Porfolio balance of Ethereum is ${(balance).toString()}.` });
        for (let i = 0; i < balances.length; i++) {
            console.log(balances[i]);
            speak({ text: `Porfolio balance of ${balances[i].name} is ${(Number(balances[i].balance) / 10 ** 18).toString()}.` });
        }
    };

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
        <div name='dashboard' className='w-full h-[130vh] justify-center bg-teal-100'>
            <div className='max-w-[500px] mx-auto px-8  justify-center '>
                <br /><br /><br /> <br />
                <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic Dashboard</h1>
                <br /><br />
                <div className='max-w-[1000px] mx-auto px-20  justify-center '>
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={handleVibrate}>
                        Instructions
                    </button>
                </div>
                {/* {console.log(getPriceEth().then(result=>console.log(result)))} */}

                <br /><br />
            </div>

            <br />
            <div className='mx-4 space-y-60'>
                <div className='absolute flex flex-col py-8 md:min-w-[760px] 
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-gray-500
            border border-slate-300 rounded-xl text-center shadow-xl'>
                    <h2 className='text-slate-300 text-2xl'><b>What Crypto would you like the price of?</b> </h2>
                    <br />
                    <div className='max-w-[1000px] mx-auto px-20  justify-center '>
                        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={getTokenData}>
                            Speak
                        </button> &nbsp;
                        {/* <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={fetchTokenBalances}>
                            Get Portfolio Balance
                        </button> */}

                        <br /><br />

                        <div className='flex justify-center flex-wrap px-4 items-center'>
                            <p className='flex px-4 py-2 text-slate-300'><RiCoinsFill className='h-6 text-green-200' />&nbsp;Token Selected :</p>
                        </div>
                        <br />
                        <input value={input} onInput={e => setInput(e.target.value)} className="rounded-full" />&nbsp;

                        <button onClick={determineTokenFetch} className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full">Submit</button>

                        <div className='flex justify-center flex-wrap px-4'>
                            <p className='flex px-10 py-2 text-teal-300 text-2xl'>{transcript}</p>
                            <p className='flex px-10 py-2 text-teal-300 text-2xl'>{price}</p>
                        </div>

                    </div>

                </div>

            </div>
            <br />
            <br />

            <div className='items-center justify-center'>
                <div className='max-w-[500px] mx-auto px-8  justify-center '>

                    <img className=' space-y-3 py-80 px-4 max-w-md max-h-md' src={CL} />
                </div>
            </div>


        </div>
    )
}

export default Dashboard