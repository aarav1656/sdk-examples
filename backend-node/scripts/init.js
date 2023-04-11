const fs = require("fs").promises;
const path = require("path");
const prettier = require("prettier");
const { Wallet, utils } = require("ethers");
const chalk = require('chalk');
const { ChainId } = require("@biconomy-devx/core-types");

const INIT_CONFIG = {
  privateKey: Wallet.fromMnemonic(
    utils.entropyToMnemonic(utils.randomBytes(32))
  ).mnemonic.phrase,
};

const CONFIG_PATH = path.resolve(__dirname, "../config.json");

const init = async (chainId) => {
  if (chainId === 'mumbai') {
    INIT_CONFIG.chainId = ChainId.POLYGON_MUMBAI;
    INIT_CONFIG.rpcUrl = "https://rpc-mumbai.maticvigil.com";
    INIT_CONFIG.dappAPIKey = "C-tKDuijb.2110a35a-08bd-4c35-8301-cf3424ba1c7b";
  } else {
    INIT_CONFIG.chainId = ChainId.GOERLI;
    INIT_CONFIG.rpcUrl = "https://rpc.ankr.com/eth_goerli";
    INIT_CONFIG.dappAPIKey = "gUv-7Xh-M.aa270a76-a1aa-4e79-bab5-8d857161c561";
  }
  fs.writeFile(
    CONFIG_PATH,
    prettier.format(JSON.stringify(INIT_CONFIG, null, 2), { parser: "json" })
  );
  console.log(chalk.green(`Config written to ${CONFIG_PATH}`))
}

module.exports = { init };