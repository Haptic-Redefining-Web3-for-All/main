import React, { useState, useEffect } from 'react'
import DaoCard from './DaoCard'
import hapticDAO from './utils/HapticDao.json';
import { ethers } from "ethers";

const DaoCardList = () => {

  const [arrDaoCards, setArrDaoCards] = useState([]);

  const contractAddress = "0x49Bf054E5Dc02998ECd4C31F94cAB38821c5983f";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const hapticDAOContract = new ethers.Contract(contractAddress, hapticDAO.abi, signer);


  const renderCard = (card, index) => {
    console.log(card);

    return (
      <DaoCard key={index} title={card.title} description={card.description} score={card.score} />
    );
  };

  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const amountCards = await hapticDAOContract.getAmountCards();
    console.log("Amount of cards: ", amountCards);
    let cardsArr = [];
    for (let i = 0; i < amountCards; i++) {
      let entry = await hapticDAOContract.daoCards(i);
      let mapItem = await hapticDAOContract.titleToCardMap(entry.title);

      cardsArr.push({
        title: entry.title,
        description: entry.description,
        score: Number(mapItem.score)
      });
      console.log("Entry at ", i, " is ", cardsArr[i]);
      // console.log("CARDINFO at ", i, " is ", cardInfo[i]);

    }
    console.log("CARDSARR:  ", cardsArr);
    setArrDaoCards(cardsArr);

  }

  return (
    <div className='grid grid-cols-3 col-span-1'>
      {console.log("ENTIRE ARRAY IS ", arrDaoCards)}
      {arrDaoCards.map(renderCard)}
    </div>
  )
}

export default DaoCardList;