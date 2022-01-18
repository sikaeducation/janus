import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useProgram } from "./program";
import getProgram from "../fixtures/program";

const server = setupServer();
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("program data service fetches data", async () => {
  server.use(
    rest.get(/\/programs\/1/, (request, response, context) => {
      return response(context.json({ program: getProgram() }));
    })
  );
  const { result, waitForNextUpdate } = renderHook(() => useProgram(1));
  await waitForNextUpdate();

  expect(result.current).toEqual(getProgram());
});
