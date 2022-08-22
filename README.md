# UniswapV2 Quick Start

## Notes

### pairInfo()

`pairFor()` will only return the same address created by `createPair()` if the pre-built contract at '@uniswap/v2-core/build/UniswapV2Factory.json' is used. Otherwise, the initial code hash used in the UniswapV2Library must be recomputed.

### computeLiquidityShareValue()

Will only work if reserves and total supply have been updated in the UniswapV2Pair in the first place. Otherwise, an "invalid opcode" error will be thrown for trying to perform division by 0.