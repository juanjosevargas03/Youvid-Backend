import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config";

//funcion que se ejecuta automaticamente
(async () => {
  try {
    const mongooseOptions: ConnectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    const db = await mongoose.connect(
      config.MONGO_URI,
      mongooseOptions
    );

    console.log("database is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
