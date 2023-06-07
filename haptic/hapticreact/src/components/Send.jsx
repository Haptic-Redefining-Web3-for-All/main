import { React, useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import HapticVibrationService from '../services/HapticVibrationService';
import { useMoralis } from "react-moralis";

const Send = () => {
  const [amount, setAmount] = useState('');
  const [display, setDisplay] = useState('') //display for our message


  const commands = [
    {
      command: 'transfer *',          //command the user says, * is any input
      callback: (name) => setDisplay(`transfer ${name}!`)   //set the display to this response
    },
    {
      command: "transfer * of * to *",
      callback: (coin, recipient, amount) => {
        //MORALIS CODE
        setAmount(`${amount}`);
        // TransferWeth(coin, recipient, amount);
        console.log("Coin is: ", coin, " Receiver is: ", recipient, " Amount is: ", amount);
        // init(coin, recipient, amount);
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
        console.log("transcript has been reset!");
      },
    },
    {
      command: "get balance",
      callback: () => {
        getUserBalance();
        console.log("transcript has been reset!");
      },
    },
    {
      command: "confirm transfer",
      callback: () => {
        TransferWeth("ETH", "BOB", amount);
        console.log("transcript has been reset!");
      },
    },
    ,
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);

  const hapticVibrationService = new HapticVibrationService();
  const { speak } = useSpeechSynthesis();
  const { Moralis } = useMoralis();

  async function handleVibrate() {
    await hapticVibrationService.selectionVibrate(function (fallback) {
      console.log("Vibration encountered an error: ", fallback);
    });
    speak({ text: "Select the Speak button and state which token to transfer and to whom you would like to transfer" });
    resetTranscript();
  }

  async function getDataForTransfer() {
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

  const handleReset = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  async function TransferWeth(coin, recipient, amount) {
    // sending 0.5 ETH
    console.log("===Values in function===");
    console.log("===Amount: ", amount);
    console.log("===Coin: ", coin);
    console.log("===Recipient: ", recipient);

    const options = {
      type: "native",
      amount: Moralis.Units.ETH("0.5"),
      receiver: "0x47430D6f05f1A10484B1082ec27883002eA1eE1F",
    };
    try {
      const transaction = await Moralis.transfer(options);
      const result = await transaction.wait();
      console.log("RESULT IS : ", result);
    } catch (e) {
      console.log("Transfer Failed", e);
    }
  };

  async function getUserBalance() {
    // var user = Moralis.User.current();
    // const balances = await Moralis.Web3.getAllERC20({address:"0x47430D6f05f1A10484B1082ec27883002eA1eE1F"});
    const user = Moralis.User.current();

    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));
    const results = await query.find();
    console.log("balance is: ", results, user);
    // speak({ text: balances });
  }

  async function init(coin, recipient, amount) {
    await Moralis.initPlugins();
    await Moralis.enableWeb3();

    console.log("INIT CALLED");
    await TransferWeth();
  }

  return (
    <div name='dao' className='w-full h-screen justify-center bg-teal-100'>
      <div className='max-w-[300px] mx-auto px-8  justify-center '>
        <br /><br /><br /> <br />
        <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic Transfer</h1>
        <br /><br />
        <div className='max-w-[1000px] mx-auto px-20  justify-center '>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={handleVibrate}>
            Instructions
          </button>
        </div>
        <br /> <br />
      </div>

      <br />
      <div className='absolute flex flex-col py-8 md:min-w-[760px] 
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-gray-500
            border border-slate-300 rounded-xl text-center shadow-xl'>
        <h2 className='text-slate-300 text-2xl'><b>Which Crypo Would you like to send? <br />Please state the recipient as well.</b> </h2>
        <br />
        <div className='max-w-[1000px] mx-auto px-20  justify-center '>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={getDataForTransfer}>
            Speak
          </button>
          <div className='flex justify-between flex-wrap px-4'>
            <p className='flex px-4 py-2 text-slate-300'>
              {transcript}</p>
            <br />
            <p>{display}</p>

          </div>
          <div className='flex justify-between flex-wrap px-4'>
            <p className='flex px-10 py-2 text-teal-300 text-2xl'>{ }</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Send;