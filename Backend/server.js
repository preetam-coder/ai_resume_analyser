require("dotenv").config()
const app = require("./src/app")


app.listen(3000, "127.0.0.1", () => {
    console.log("Server is running on port 3000")
})
