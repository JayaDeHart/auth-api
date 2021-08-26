const express = require("express");
const app = express();
const errorHandler = require("./error-handlers/error-handler");
const userRoutes = require("./routes/userRoutes")
const v1Routes = require("./routes/v1Routes")
const v2Routes = require("./routes/v2Routes")



app.use(express.json())

app.use(userRoutes)
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);


app.use(errorHandler);

function start(port) {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
}

module.exports = {
    app,
    start,
};
