const Web3 = require("web3");

const config = require("../config.json");

const web3 = new Web3(config.web3Provider);
const account = web3.eth.accounts.privateKeyToAccount(config.privateKey);
let nextNonce = null;

const prepareNonce = async function() {
  nextNonce = await web3.eth.getTransactionCount(account.address);
  return nextNonce;
};

const getNonce = function() {
  return nextNonce++;
};

module.exports = { web3, account, prepareNonce, getNonce };
