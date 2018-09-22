import "reflect-metadata";
import { createConnection } from "typeorm";

import app from "./app";

createConnection({
  database: "tmp/sqlite.sql",
  // FIXME: This won't work when compiling to ./dist
  entities: ["src/entity/**/*.ts"],
  logging: true,
  synchronize: true,
  type: "sqlite"
})
  .then(() => {
    const port = 3000;
    app.listen(port, () => console.log(`Express server listening on port ${port}`));
  })
  .catch(error => console.log("Error creating connection", error));
