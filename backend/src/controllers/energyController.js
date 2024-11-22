export const buyEnergy = async (req, res) => {
  try {
    const { address, amount } = req.body;
    const price = await req.contract.methods.energyPrice().call();
    const totalCost = req.web3.utils.toBN(price).mul(req.web3.utils.toBN(amount));

    const tx = await req.contract.methods.buyEnergy(amount).send({
      from: address,
      value: totalCost,
      gas: 200000
    });

    res.json({ success: true, transaction: tx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sellEnergy = async (req, res) => {
  try {
    const { address, amount } = req.body;
    const tx = await req.contract.methods.sellEnergy(amount).send({
      from: address,
      gas: 200000
    });

    res.json({ success: true, transaction: tx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
