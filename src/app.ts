import express, { Application, Request, Response, NextFunction } from 'express'
const { getRating } = require('./index')

const app: Application = express()
const port: number = 3000

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals.rating = await getRating(req.query.code)
    next()
}

app.use(authMiddleware)

app.get('/auth', (req: Request, res: Response) => {
    res.send('The user has given the specified video the following rating: ' + res.locals.rating)
    console.log('The user has given the specified video the following rating: ' + res.locals.rating)
    process.exit(0)
});

app.listen(port, () => {
    console.log(`Started litening on port ${port}`)
})