import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ActivityInteraction from ".";
import { PerformanceProvider } from "../../contexts/performance";

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
    <PerformanceProvider>
      <ActivityInteraction
        postPerformance={jest.fn()}
        performances={[]}
        userId="1"
        postSlug="c"
      />
    </PerformanceProvider>
  );

  screen
    .getByRole("button", {
      name: "Unclear",
    })
    .click();
});
