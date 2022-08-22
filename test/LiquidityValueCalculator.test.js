const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { INIT_CODE_HASH } = require("../helper-hardhat-config")

describe("LiquidityValueCalculator Test", () => {
  let uniswapLibrary,
    uniswapV2Factory,
    mockTokenOne,
    mockTokenTwo,
    liquidityValueCalculator,
    deployer
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer

    await deployments.fixture(["all"])

    uniswapLibrary = await ethers.getContract("UniswapV2Library", deployer)
    uniswapV2Factory = await ethers.getContract("UniswapV2Factory", deployer)
    mockTokenOne = await ethers.getContract("MockTokenOne", deployer)
    mockTokenTwo = await ethers.getContract("MockTokenTwo", deployer)
    liquidityValueCalculator = await ethers.getContract(
      "LiquidityValueCalculator",
      deployer
    )
  })
  it("was deployed", async () => {
    assert(liquidityValueCalculator.address)
  })
  describe("constructor", () => {
    it("should have correct factory", async () => {
      const factory = await liquidityValueCalculator.factory()
      assert.equal(factory, uniswapV2Factory.address)
    })
  })
  describe("createPair", () => {
    it("should create token pair", async () => {
      const txResponse = await uniswapV2Factory.createPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      const txReceipt = await txResponse.wait(1)
      const pairAddress = txReceipt.events[0].args.pair
      assert(pairAddress)
      console.log(pairAddress.toString())
    })
  })
  describe("pairInfo", () => {
    it("should return reserves and total supply", async () => {
      const txResponse = await uniswapV2Factory.createPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      await txResponse.wait(1)
      const { reserveA, reserveB, totalSupply } =
        await liquidityValueCalculator.pairInfo(
          mockTokenOne.address,
          mockTokenTwo.address
        )
      assert(reserveA, reserveB, totalSupply)
      console.log(reserveA.toString())
      console.log(reserveB.toString())
      console.log(totalSupply.toString())
    })
  })
  describe("computeLiquidityShareValue", () => {
    it("should return token amounts", async () => {
      const txResponse = await uniswapV2Factory.createPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      const txReceipt = await txResponse.wait(1)
      const pairAddress = txReceipt.events[0].args.pair
      console.log(pairAddress.toString())
      const [tokenA, tokenB] =
        await liquidityValueCalculator.computeLiquidityShareValue(
          10,
          mockTokenOne.address,
          mockTokenTwo.address
        )
      assert(tokenA)
      assert(tokenB)
      console.log(tokenA, tokenB)
    })
  })
  describe("returnPair", () => {
    it("should return the correct pair", async () => {
      const txResponse = await uniswapV2Factory.createPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      const txReceipt = await txResponse.wait(1)
      const factoryPair = txReceipt.events[0].args.pair
      const libraryPair = await liquidityValueCalculator.returnPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      assert.equal(factoryPair.toString(), libraryPair.toString())
    })
  })
  describe("returnReserves", () => {
    it("should return the correct reserves", async () => {
      const txResponse = await uniswapV2Factory.createPair(
        mockTokenOne.address,
        mockTokenTwo.address
      )
      await txResponse.wait(1)
      const { reserveA, reserveB } =
        await liquidityValueCalculator.returnReserves(
          mockTokenOne.address,
          mockTokenTwo.address
        )
      assert(reserveA, reserveB)
      console.log(reserveA)
      console.log(reserveB)
    })
  })
})
