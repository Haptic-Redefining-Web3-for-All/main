const hre = require("hardhat");
const { ethers } = require("ethers");

// const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
// provider is read-only get a signer for on-chain transactions
// const signer = provider.getSigner();

async function main() {
        //Deploy Domain Contract 
        const usdPriceConverterFactory = await hre.ethers.getContractFactory('USDPriceConverter');
        const usdPriceConverterContract = await usdPriceConverterFactory.deploy();
        await usdPriceConverterContract.deployed();
    
        console.log("Contract deployed to:", usdPriceConverterContract.address);
  
}
//Contract deployed to: 0xBbdf8aB081eafB5Ea25745EBC1271fA9F8817671



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });