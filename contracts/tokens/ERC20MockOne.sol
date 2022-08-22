pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockTokenOne is ERC20 {
  constructor(uint256 initialSupply) ERC20("MockTokenOne", "MTO") {
    _mint(msg.sender, initialSupply);
  }
}
