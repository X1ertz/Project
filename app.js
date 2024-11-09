const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5500;

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.render("verify");
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});