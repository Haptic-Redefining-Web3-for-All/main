import React from 'react'
import { FaArrowsAltH, FaThList, FaVoteYea, FaRegChartBar } from 'react-icons/fa';
import Card from './Card';
import { useSpeechSynthesis } from 'react-speech-kit';
import HapticVibrationService from '../services/HapticVibrationService';


const MainPage = () => {

  const hapticVibrationService = new HapticVibrationService();
  const { speak } = useSpeechSynthesis();

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


  async function instructions() {
    await hapticVibrationService.selectionVibrate(function (fallback) {
      console.log("Vibration encountered an error: ", fallback);
    });
    speak({
      text: `Our dapp currently has four features. Please select which feature
                 you would like to navigate to. From Left to Right, or Top to bottom 
                 for mobile users, the features are: Dashboard to view prices and wallet 
                 balances. Dao for governance. Dex for swapping tokens. And lastly 
                 truflation for up-to-date inflation data. Users may find the login 
                 button in the upper right hand corner. Currently we allow users 
                 to login via Metamask only, but we will be supporting other wallets
                 and email login as well.` });
  }

  return (

    <div name='dao' className='w-full h-screen justify-center bg-teal-100'>
      <div className='max-w-[300px] mx-auto px-8  justify-center '>
        <br /><br /><br /> <br />
        <h1 className='text-4xl sm:text-7xl font-bold items-center justify-center text-gray-500'>Haptic Features</h1>
        <br /><br />
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold px-10 py-2 items-center rounded-full" onClick={instructions}>
          Instructions
        </button>
        <br /> <br />

      </div>

      <div>

        {/* Card Container */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>

          {/* Card */}
          <Card icon={<FaThList size={40} />} heading='Haptic Dashboard' text='Dashboard For viewing your tokens and NFTs' page='dashboard' choice={selectDashboard} />
          <Card icon={<FaVoteYea size={40} />} heading='Haptic Dao' text='Voting page for updates to the applcation. Can upvote or downvote on features that should be prioritized for development.' page='dao' choice={selectDao} />
          {/* <Card icon={<FaBtc size={40} />} heading='Haptic Transfer' text='Transfer from any valid chain that our application supports to recipients addresses on the respective chain.' page='send' choice={selectSend}/> */}
          <Card icon={<FaArrowsAltH size={40} />} heading='Haptic DEX' text='Decentralized exchange that empowers users to trade their crypto-currencies with ease.' page='swap' choice={selectSwap} />
          <Card icon={<FaRegChartBar size={40} />} heading='Haptic Truflation' text="Powered by Truflation's API running on Chainlink, haptic truflation displays and verbally states live, up-to-date inflation data." page='truflation' choice={selectTruflation} />
          {/* <Card icon={<FaStore size={40} />} heading='Haptic Market' text='NFT Marketplace that meets the needs of the community. Buy/sell NFTs on the marketplace for 0 fees and select your own royalty policies.'page='marketplace' choice={selectMarketplace}/> */}
        </div>
      </div>

    </div>


  )
}

export default MainPage