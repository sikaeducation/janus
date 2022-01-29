import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ActivityInteraction from ".";
import { ActivityProvider } from "../../contexts/activity";

const server = setupServer();
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("<ActivityInteraction /> submits activities", async () => {
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
  render(
    <ActivityProvider>
      <ActivityInteraction activities={[]} userId="1" postSlug="c" />
    </ActivityProvider>
  );

  screen
    .getByRole("button", {
      name: "Unclear",
    })
    .click();
});
