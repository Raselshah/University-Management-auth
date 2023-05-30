// getting-started.js
import mongoose from "mongoose";
import app from "./api";
import config from "./config/index";

async function run() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(` Database connected successfully`);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    // console.log(`faild database connect ${err.message}`);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
run().catch((err) => console.log(err));
