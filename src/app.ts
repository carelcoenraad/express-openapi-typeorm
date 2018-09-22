import * as bodyParser from "body-parser";
import * as express from "express";
import * as openapi from "express-openapi";
import * as helmet from "helmet";

import { apiDoc } from "./api-doc";
import routes from "./routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();
app.use(helmet());
app.use(bodyParser.json());

openapi.initialize({
  apiDoc,
  app,
  paths: routes
});

app.use(errorHandler);

export default app;
