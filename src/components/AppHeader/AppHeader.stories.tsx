import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import { ReactNode } from "react";
import AppHeader from ".";

type MockStoreProps = {
  user?: {
    email: string;
    name: string;
    picture: string;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  children: ReactNode;
};

function Mockstore({ user, children }: MockStoreProps) {
  return (
    <Provider
      store={configureStore({
        reducer: {
          user: createSlice({
            name: "user",
            initialState: user ?? {
              email: "",
              name: "",
              picture: "",
              isAuthenticated: false,
              isLoading: false,
            },
            reducers: {},
          }).reducer,
        },
      })}
    >
      {children}
    </Provider>
  );
}

export default {
  title: "App/AppHeader",
  component: AppHeader,
  decorators: [withRouter],
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = () => (
  <Mockstore>
    <AppHeader />
  </Mockstore>
);

export const LoggedOut = Template.bind({});
