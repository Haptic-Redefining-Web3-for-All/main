const hre = require("hardhat");

async function main() {
        //Deploy Domain Contract 
        const hapticFactory = await hre.ethers.getContractFactory('HAPTIC');
        const hapticContract = await hapticFactory.deploy();
        await hapticContract.deployed();
    
        console.log("Contract deployed to:", hapticContract.address);
  
}
//Contract deployed to: 0xE198949B13390b2411b82D34B3C5a4945a0EE5C1



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });