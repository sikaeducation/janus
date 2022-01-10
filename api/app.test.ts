import supertest from "supertest"
import app from "./app"

test("GET /", async () => {
  await supertest(app)
    .get("/")
    .expect(200)
})
