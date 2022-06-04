import express from "express";
import cors from "cors";
import { createWish, getWishes } from "./service/wish-list.service";
import { config } from "dotenv";
import functions from "firebase-functions";

config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    await createWish(req.body);
    res.send(200);
  } catch (e) {
    res.status(400).send({
      message: "wish is not possible",
    });
  }
});

app.get("/", async (req, res) => {
  const wishes = await getWishes();
  res.send(wishes);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

export const api = functions.https.onRequest(app);
