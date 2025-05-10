const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const decodeCrash = (hash) => {
  if (typeof BigInt === 'undefined') return 2;
  const n = 52n;
  const x = BigInt('0x' + hash.slice(0, Number(n / 4n)));
  const e = 1n << n;
  return x === 0n ? 1 : Number(((100n * e - x) / (e - x))) / 100;
};

app.get('/api/signal', async (req, res) => {
  try {
    const response = await axios.get('https://aviator-api.vercel.app/history?limit=1');
    const hash = response.data[0].hash;
    const multiplier = decodeCrash(hash);
    res.json({ multiplier: multiplier.toFixed(2), time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch signal' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});