"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_entity_1 = require("./entity/user.entity");
const app_data_source_1 = require("../app-data-source");
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
console.log(app_data_source_1.myDataSource, "myDataSource");
// create and setup express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// register routes
app.get("/users", async function (req, res) {
    const users = await app_data_source_1.myDataSource.getRepository(user_entity_1.User).find();
    res.json(users);
});
app.get("/", async function (req, res) {
    // const users = await myDataSource.getRepository(User).find()
    res.json({ success: true });
});
// app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
// })
// app.post("/users", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).create(req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })
// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })
app.delete("/users/:id", async function (req, res) {
    const results = await app_data_source_1.myDataSource.getRepository(user_entity_1.User).delete(req.params.id);
    return res.send(results);
});
// start express server
app.listen(3000);
console.log("hello word", "test=====>");
