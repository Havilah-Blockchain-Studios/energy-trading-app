export const getBalance = async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await req.contract.methods.getBalance().call({ from: address });
    res.json({ 
      success: true, 
      energyBalance: balance[0], 
      accountBalance: balance[1],
      isProducer: balance[2]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const registerProducer = async (req, res) => {
  try {
    const { address } = req.body;
    const tx = await req.contract.methods.registerProducer().send({
      from: address,
      gas: 200000
    });
    res.json({ success: true, transaction: tx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const unregisterProducer = async (req, res) => {
  try {
    const { address } = req.body;
    const tx = await req.contract.methods.unregisterProducer().send({
      from: address,
      gas: 200000
    });
    res.json({ success: true, transaction: tx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
