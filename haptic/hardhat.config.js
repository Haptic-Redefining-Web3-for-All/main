require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");


const  SPEEDY_RINKEBY_NODE  = process.env.SPEEDY_RINKEBY_NODE;
const  PRIVATE_KEY = process.env.PRIVATE_KEY;
const  ETHERSCAN_API = process.env.ETHERSCAN_API;


/**
 * Flattener Tasks for Etherscan Verification
 */

 task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
 .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
 .setAction(async ({ files }, hre) => {
   let flattened = await hre.run("flatten:get-flattened-sources", { files });
   
   // Remove every line started with "// SPDX-License-Identifier:"
   flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
   flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

   // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
   flattened = flattened.replace(/pragma experimental ABIEncoderV2;\n/gm, ((i) => (m) => (!i++ ? m : ""))(0));
   console.log(flattened);
 });


//  https://hardhat.org/config/ 

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
  	rinkeby: {
      url: SPEEDY_RINKEBY_NODE,
      accounts: [PRIVATE_KEY],
  	},
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};
