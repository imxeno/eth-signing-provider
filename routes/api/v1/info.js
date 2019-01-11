const { web3, account } = require("../../../utils/eth");

const config = require("../../../config.json");

module.exports = async (req, res) => {
  try {
    res.json({
      success: true,
      address: account.address,
      balance: await web3.eth.getBalance(account.address),
      whitelist: config.whitelist
    });
  } catch (err) {
    res.json({ success: false, error: "Unknown" });
  }
};
