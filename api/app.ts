import express, {Request, Response} from "express"
const app = express()

import sampleData from "./data/sample_program"

app.get("/", (request: Request, response: Response) => {
  response.status(200).send()
})

app.get("/programs/:programId", (request: Request, response: Response) => {
  response.json({program: sampleData.program})
})

export default app
