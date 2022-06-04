import { IntegerType } from "mongodb";
import { getDb } from "../gateway/mongo";

export interface Wish {
  name: string;
  prob: number;
  isGranted: boolean | undefined;
  id: string;
}

export const getWishesCollection = async () => {
  const db = await getDb();
  return db.collection<Wish>("wishes");
};

export const createWish = async (wish: Wish) => {
  const col = await getWishesCollection();
  const { insertedId } = await col.insertOne(wish);
  return insertedId.toString();
};

export const getWishes = async () => {
  const col = await getWishesCollection();
  return col.find().toArray();
};
