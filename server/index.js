const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("./mongo");
const PORT = 3001;
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: "1mb",
  })
);
app.use(bodyParser.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/api", require("./routes/todos.rout"));
app.listen(PORT, (_) => console.log("info", `Server started on port ${PORT}`));
