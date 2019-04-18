const { web3, account, getNonce } = require("../../../utils/eth");
const config = require("../../../config.json");

module.exports = async (req, res) => {
  console.log("Received a sign request!");
  let tx = req.body;
  console.log(tx);
  if (!isValidTransaction(tx)) {
    res.json({
      success: false,
      error: "Input is not a valid transaction object."
    });
    return;
  }
  if (!isWhitelistedAddress(tx.to)) {
    res.json({
      success: false,
      error: "Transaction recipient is not whitelisted."
    });
    return;
  }
  tx.nonce = getNonce();
  try {
    if (typeof tx.gas === "undefined") tx.gas = await web3.eth.estimateGas(tx);
    const signed = await account.signTransaction(tx);
    try {
      web3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("transactionHash", txid => {
          console.log("Signed and sent txid: " + txid);
          res.send({ success: true, txid });
        });
    } catch (err) {
      res.json({ success: false, error: "Transaction sending error." });
      console.log(err);
    }
  } catch (err) {
    res.json({ success: false, error: "Transaction signing error." });
    console.log(err);
  }
};

const isValidTransaction = tx => {
  const keys = Object.keys(tx);
  if (keys.indexOf("to") === -1) return false;
  for (const key in tx) {
    const val = tx[key];
    switch (key) {
      case "to":
        if (!web3.utils.isAddress(val)) return false;
        break;
      case "gas":
        if (typeof val !== "number") return false;
        break;
      case "data":
        if (!web3.utils.isHex(val)) return false;
        break;
      // Illegal arguments:
      case "from":
      case "value":
      case "gasPrice":
      case "nonce":
      default:
        return false;
    }
  }
  return true;
};

const isWhitelistedAddress = address => {
  return (
    config.whitelist
      .map(a => a.toLowerCase())
      .indexOf(address.toLowerCase()) !== -1
  );
};
