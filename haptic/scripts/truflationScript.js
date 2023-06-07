const hre = require("hardhat");

async function main() {
        //Deploy Domain Contract 
        const truflationDataFetcherFactory = await hre.ethers.getContractFactory('TruflationDataFetcher');
        const truflationDataFetcherContract = await truflationDataFetcherFactory.deploy();
        await truflationDataFetcherContract.deployed();
    
        console.log("Contract deployed to:", truflationDataFetcherContract.address);
  
}
//Contract deployed to: 0xA6D660d289509803FD16D478C5ae8Ef95cCE30BD



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });