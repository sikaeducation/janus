import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useContext } from "react";
import { ActivityProvider, activityContext } from "./activity";

const server = setupServer();
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("activity service posts activities", async () => {
  server.use(
    rest.post(/\/activities/, (request, response, context) => {
      expect(request.body).toMatchObject({
        userId: 1,
        postSlug: "c",
        payload: {
          type: "topic-view",
          confidenceLevel: 1,
        },
      });
      return response(context.status(201));
    })
  );
  function Consumer() {
    const { postActivity } = useContext(activityContext);
    postActivity({
      userId: 1,
      postSlug: "c",
      payload: {
        type: "topic-view",
        confidenceLevel: 1,
      },
    });
    return <p>Ignore</p>;
  }
  render(
    <ActivityProvider>
      <Consumer />
    </ActivityProvider>
  );
});
