const Web3 = require("web3");

const config = require("../config.json");

const web3 = new Web3(config.web3Provider);
const account = web3.eth.accounts.privateKeyToAccount(config.privateKey);

module.exports = { web3, account };
