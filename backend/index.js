const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const path = require('path');
require("./database/database.js")
const userRouter = require("./Routes/user.route");
const assetsRouter = require("./Routes/assets.route.js");
const documentsRouter = require("./Routes/documents.route.js");
const groupRouter = require("./Routes/group.route.js");
const locationRouter = require("./Routes/location.route.js");
const softwereRouter = require("./Routes/softwere.route.js");
const ticketRouter = require('./Routes/ticket.route.js');
const dashboardRouter = require('./Routes/dashboard.js');
// Define a route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json()); 
app.use(cors())


app.use("/user", userRouter);
app.use("/assets", assetsRouter);
app.use("/documents", documentsRouter);
app.use("/location", locationRouter);
app.use("/softwere", softwereRouter);
app.use("/group", groupRouter);
app.use("/ticket", ticketRouter);
app.use("/dashboard", dashboardRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
