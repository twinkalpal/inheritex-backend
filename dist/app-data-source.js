"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: ["src/migration/**/*.ts"
    ],
    subscribers: ["src/subscriber/**/*.ts"
    ]
});
