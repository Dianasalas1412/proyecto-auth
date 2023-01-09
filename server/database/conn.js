import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import ENV from "../config.js";

async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Se ha conectado a la base de datos!");
  return db;
}

export default connect;
