import React, {useState, useEffect} from 'react'
import TruflationCard from './TruflationCard'
import truflationABI from './utils/TruflationContract.json';
import { ethers } from "ethers";

const TruflationCardList = () => {

 
  const [foodInflation, setFoodInflation] = useState('');
  const [housingInflation, setHousingInflation] = useState('');
  const [transportationInflation, setTransportationInflation] = useState('');
  const [medicalInflation, setMedicalInflation] = useState('');
  const [educationInflation, setEducationInflation] = useState('');
  const [personalItemInflation, setPersonalItemInflation] = useState('');

    const cardInfo = [
        {
            title: "Food",
            emoji:"🌾",
            description: `${foodInflation} %`,
        },
        {
            title: "Housing",
            emoji:"🏠",
            description: `${housingInflation} %`,
          },
        {
            title: "Transportation ",
            emoji:"🚗",
            description: `${transportationInflation} %`,
        },
        {
          title: "Medical ",
          emoji:"🏥",
          description: `${medicalInflation} %`,
        },
        {
          title: "Education ",
          emoji:"📚",
          description: `${educationInflation} %`,
        },
        {
          title: "Personal Items",
          emoji:"🛍️",
          description: `${personalItemInflation} %`,
        },
    ]

    const contractAddress = "0xaE02354d16019b1A6dA8c2E184Fe9903cEacD785";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const truflationContract = new ethers.Contract(contractAddress, truflationABI, signer);

    
    async function getFoodInflation() {
      truflationContract.foodInflation().then(result=>{
        setFoodInflation(Number(result).toFixed(2));
      });
    }
    async function getHousingInflation() {
      truflationContract.housingInflation().then(result=>{
        setHousingInflation(Number(result).toFixed(2));
      });
    }
    async function getTransportationInflation() {
      truflationContract.transportationInflation().then(result=>{
        setTransportationInflation(Number(result).toFixed(2));
      });
    }
    async function getMedicalInflation() {
      truflationContract.medicalInflation().then(result=>{
        setMedicalInflation(Number(result).toFixed(2));
      });
    }
    async function getEducationInflation() {
      truflationContract.educationInflation().then(result=>{
        setEducationInflation(Number(result).toFixed(2));
      });
    }
    async function getPersonalItemInflation() {
      truflationContract.personalItemInflation().then(result=>{
        setPersonalItemInflation(Number(result).toFixed(2));
      });
    }
    
    useEffect(() => {
      getFoodInflation();
      getHousingInflation();
      getTransportationInflation();
      getMedicalInflation();
      getEducationInflation();
      getPersonalItemInflation();
    }, []);


    const renderCard = (card, index) => {
        console.log(card);

        return (
          <TruflationCard key={index} title={card.title}  emoji={card.emoji} description={card.description}/>
        );
      };

  return (
      <div className='grid grid-cols-3 col-span-3'>
    {cardInfo.map(renderCard)}
    </div>
  )
}

export default TruflationCardList