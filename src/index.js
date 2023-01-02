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
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const app = express();
const port = process.env.PORT;
process.env.TZ = "Asia/Jakarta";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    sampleRate: 1.0,
});

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
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

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

app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => res.status(status.INTERNAL_SERVER_ERROR).json(
        apiResponse(status.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", err.message)
    )
);

app.listen(port, () => {
    console.info(`Server is running on port ${port}.`);
});
