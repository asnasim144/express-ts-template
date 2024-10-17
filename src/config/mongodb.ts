/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from ".";

const mongodbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: "messaging",
    });
    console.log("DB Connected");
  } catch (err) {
    console.log(`Error: db connection, cause: ${err}`);
  }
};

export default mongodbConnection;
