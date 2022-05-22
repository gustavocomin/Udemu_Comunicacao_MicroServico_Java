import express from "express";
import * as db from "./scr/config/db/inititalData.js"

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInitalData();

app.get("/api/status", (req, res) => {
    return res.status(200).json({
        service: "Api",
        status: "Up",
        httpStatus: 200,
    });
});

app.listen(PORT, () => {
    console.info(
        `Server started successfully at port http://localhost:${PORT}`
    );
});
