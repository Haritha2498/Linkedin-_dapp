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
      accounts:["private_key"]
    },
  },
  solidity: "0.8.24",
};
