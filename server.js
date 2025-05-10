const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const VALID_PASSWORD = "VIP1X";

app.get('/', (req, res) => {
  res.send('Aviator Signal API is live');
});

app.post('/signal', (req, res) => {
  const { password, continent, app: bettingApp } = req.body;

  if (password !== VALID_PASSWORD) {
    return res.status(401).json({ status: "error", message: "Invalid password" });
  }

  res.json({
    status: "success",
    continent,
    bettingApp,
    cashoutTime: "1.92",
    message: "This is your VIP signal"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
