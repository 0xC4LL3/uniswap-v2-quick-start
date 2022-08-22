require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy")
require("keccak256")

module.exports = {
  paths: {
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    user1: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.5.16",
      },
    ],
  },
}
