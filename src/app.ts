import express from "express"
import cors from "cors"

import { Request, Response } from "express"
import { myDataSource } from "../app-data-source"
const routes = require('./routes/index');
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())

app.use('/', routes); 
app.get("/", async function (req: Request, res: Response) {
    res.json({success:true})
})

app.listen(3000,()=>{console.log("server listen on port 3000")})
