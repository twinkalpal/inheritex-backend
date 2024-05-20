import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config();

export const myDataSource = new DataSource({
    type: "mongodb",
    host: process.env.MOGODB_HOST,
    port: Number(process.env.MOGODB_PORT),
    database:process.env.DATABSE_NAME,
    synchronize: true, 
    logging: false, 
    entities: [ 
        "src/model/**/*.ts" 
     ], 
     migrations: [ "src/migration/**/*.ts" 
     ], 
     subscribers: [ "src/subscriber/**/*.ts" 
     ]

})