import React, {useState} from 'react';
import hapticDAO from './utils/HapticDao.json';
import { ethers } from "ethers";
import HapticVibrationService from '../services/HapticVibrationService';
import { useSpeechSynthesis } from 'react-speech-kit';

const DaoProposalModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

     //Amount to send for voting
     const options = {value: ethers.utils.parseEther("0.01")};

     const contractAddress = "0x49Bf054E5Dc02998ECd4C31F94cAB38821c5983f";
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner()
     const hapticDAOContract = new ethers.Contract(contractAddress, hapticDAO.abi, signer);

     const hapticVibrationService = new HapticVibrationService();
     const { speak } = useSpeechSynthesis();
 
    async function handleSubmit () {
        console.log("title is :", title);
        console.log("description is :", description);
        
        //Submit will persist Proposal to the blockchain
        await hapticDAOContract.addDaoCard(title, description, options);
        speak({text: `You proposal to the DAO for feature ${title} with description ${description}
                     has been successfully submitted. Please wait for the transaction to persist
                     to the blockchain. Upon completion you will be able to view your proposal.`})
       //reset upon submission
       setTitle('');
       setDescription('');           
    }

  return (
      <>
 <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 justify-center items-center rounded-full"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Proposal
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-teal-500 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Feature Proposal For Haptic DAO
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                
                <p>Title:</p>
                <input value={title} onInput={e => setTitle(e.target.value)} className="rounded-full" />&nbsp;
                {/* <button onClick={null} className="bg-teal-700 hover:bg-teal-300 text-white font-bold px-10 py-2 rounded-full">Submit</button> */}
                <p>Description:</p>
                <textarea value={description} onInput={e => setDescription(e.target.value)} className="rounded-half" />&nbsp;
                 
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button onClick={handleSubmit} className="bg-teal-700 hover:bg-teal-300 text-white font-bold px-10 py-2 rounded-full">Submit</button>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      </>
  )
}

export default DaoProposalModal