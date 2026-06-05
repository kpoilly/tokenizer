require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Configuration Hardhat pour le projet Agent42
//
// Reseaux configures :
// - hardhat : reseau local pour les tests (par defaut)
// - bscTestnet : BNB Smart Chain Testnet pour le deploiement

module.exports = {
  solidity: "0.8.20",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [],
    },
  },
};
