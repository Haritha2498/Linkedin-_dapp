require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"infura",
  networks:{
    localhost:{
      url:" http://127.0.0.1:8545/"
    },
    infura:{
      url:"https://sepolia.infura.io/v3/66d60f103eac4256995259d73ede2b51",
      accounts:["d2f2533358a02b95e5372feeda3b6015631625919f8e0067f1ecf298ad310f14"]
    },
  },
  solidity: "0.8.24",
};
