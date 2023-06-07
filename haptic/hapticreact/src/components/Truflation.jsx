import React, { useEffect, useState }  from 'react'
import TruflationCardList from './TruflationCardList';
import truflationYoyABI from './utils/TruflationContract.json';
import { ethers } from "ethers";
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useMoralis } from 'react-moralis';


const Truflation = () => {

  const [yoyInflation, setYoyInflation] = useState('');
  const hapticVibrationService = new HapticVibrationService();
  const { speak } = useSpeechSynthesis();
  const { Moralis } = useMoralis();

  const contractAddress = "0xA6D660d289509803FD16D478C5ae8Ef95cCE30BD";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const truflationContract = new ethers.Contract(contractAddress, truflationYoyABI, signer);

  async function getYoYInflation() {
    console.log("calling ... ")
    truflationContract.yoyInflation().then(result=>{
      setYoyInflation(Number(result).toFixed(2));
      console.log("inflation is: ",result)
    });
  }

  useEffect(() => {
    getYoYInflation();
  });

  async function readInflation(){
    await hapticVibrationService.selectionVibrate(function (fallback) {
        console.log("Vibration encountered an error: ", fallback);
    });
    speak({ text: `The Rate for why oh why Inflation is approximately ${yoyInflation} %` });
}

async function instructions(){
  await hapticVibrationService.selectionVibrate(function (fallback) {
      console.log("Vibration encountered an error: ", fallback);
  });
  speak({ text: `For each inflation category, select its corresponding card in order to hear its respective inflation data.` });
}

async function sync(){
  await hapticVibrationService.successVibrate(function (fallback) {
      console.log("Vibration encountered an error: ", fallback);
  });
  speak({ text: `Syncing the latest inflation data from chainlink oracle.` });
  truflationContract.requestYoyInflation().then(result=>{
    console.log("Completed request");
    speak({text: 'Requested data sync has been completed. Please refresh the page.'});
  })
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
    <div name='dao' className='w-full h-[130vh] justify-center bg-teal-100'>
      <div className='max-w-[300px] mx-auto px-8  justify-center '>
        <br /><br /><br /> <br />
        <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic Truflation</h1>
        <br /><br />
        <div className='max-w-[1000px] mx-auto px-20  justify-center'>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={instructions}>
            Instructions
          </button>
        </div>
        <br /> <br />
      </div>

      <br />
      <div className="mx-4 space-y-60">

      <div className='absolute flex flex-col py-8 md:min-w-[760px] 
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-gray-500
            border border-slate-300 rounded-xl text-center shadow-xl'>
        <h2 className='text-slate-300 text-2xl'><b>Inflation Data Powered by chainlink oracles. <br/>Currently fetches Yoy inflation<br /></b> </h2>
        <br />
        <div className='max-w-[1000px] mx-auto px-20  justify-center '>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 rounded-full" onClick={sync}>
            Sync Inflation
          </button>
          <br/> <br/>   

            <div className="w-80 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl" onClick={readInflation}>
            <div className="p-2">
                {/* <!-- Heading --> */}
                <h2 className="font-bold mb-2 text-teal-500 text-2xl ">Yoy Inflation: {yoyInflation} %</h2>
            </div>

        </div>

        
            <br />

        </div>

      </div>

      <div className='absolute flex flex-col py-8 md:min-w-[760px] 
            mx-1 md:left-1/2 transform md:-translate-x-1/2'>
            <TruflationCardList/>

     </div>


     </div>


    </div>
  )
}

export default Truflation