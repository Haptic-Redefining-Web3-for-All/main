const hre = require("hardhat");
const { ethers } = require("ethers");

// const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
// provider is read-only get a signer for on-chain transactions
// const signer = provider.getSigner();

async function main() {
        //Deploy Domain Contract 
        const maticFactory = await hre.ethers.getContractFactory('Matic');
        const maticContract = await maticFactory.deploy();
        await maticContract.deployed();
    
        console.log("Contract deployed to:", maticFactory.address);

        const ohmFactory = await hre.ethers.getContractFactory('Ohm');
        const ohmContract = await ohmFactory.deploy();
        await ohmContract.deployed();
    
        console.log("Contract deployed to:", ohmContract.address);

//Contract deployed to: 

//Ohm Contract deployed to: 0x2d54BA788dC932c55c13bbB461b9509566A158a8

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });