const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { INITIAL_SUPPLY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const uniswapLibrary = await deploy("UniswapV2Library", {
    from: deployer,
    args: [],
    log: true,
  })
  log(`UniswapV2Library deployed at ${uniswapLibrary.address}`)

  const uniswapFactory = await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer],
    log: true,
  })
  log(`UniswapV2Factory deployed at ${uniswapFactory.address}`)

  const erc20MockOne = await deploy("MockTokenOne", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
  })
  log(`ERC20MockOne deployed at ${erc20MockOne.address}`)

  const erc20MockTwo = await deploy("MockTokenTwo", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
  })
  log(`ERC20MockTwo deployed at ${erc20MockTwo.address}`)

  const liquidityValueCalculator = await deploy("LiquidityValueCalculator", {
    from: deployer,
    args: [uniswapFactory.address],
    log: true,
  })
  log(
    `LiquidityValueCalculator deployed at ${liquidityValueCalculator.address}`
  )
}

module.exports.tags = ["all"]
