require("dotenv").config();
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { StatusCodes: status } = require("http-status-codes");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./helpers/swagger.helper");
const routes = require("./routes/index");
const { apiResponse, apiNotFoundResponse } = require("./utils/apiResponse.utils");
const { swaggerAccess } = require("./middlewares/swagger.middleware");
const { limiter } = require("./middlewares/limiter.middleware");
require("./utils/scheduler.utils");

const app = express();
const port = process.env.PORT;

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(limiter);

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api", routes);
app.use(
    "/documentation",
    swaggerAccess,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => res.status(status.OK).json(
        apiResponse(status.OK, "OK", "Welcome to Angkasa API Application.")
    )
);

app.use((req, res) => res.status(status.NOT_FOUND).json(apiNotFoundResponse('The requested resource could not be found')));

app.use((err, req, res, next) => res.status(status.INTERNAL_SERVER_ERROR).json(
        apiResponse(status.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", err.message)
    )
);

app.listen(port, () => {
    console.info(`Server is running on port ${port}.`);
});
