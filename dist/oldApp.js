"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const { getRating } = require('./index')
const app = (0, express_1.default)();
const port = 3000;
// const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     res.locals.rating = await getRating(req.query.code)
//     next()
// }
// app.use(authMiddleware)
// app.get('/auth', (req: Request, res: Response) => {
//     res.send('The user has given the specified video the following rating: ' + res.locals.rating)
//     console.log('The user has given the specified video the following rating: ' + res.locals.rating)
//     process.exit(0)
// });
app.listen(port, () => {
    console.log(`Started litening on port ${port}`);
});
