import express, {Request, Response} from "express"
const app = express()

app.get("/", (request: Request, response: Response) => {
  response.status(200).send()
})

export default app
