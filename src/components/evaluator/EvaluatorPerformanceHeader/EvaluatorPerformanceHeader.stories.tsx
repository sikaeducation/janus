import { ComponentStory, ComponentMeta } from "@storybook/react";

import EvaluatorPerformanceHeader from ".";

export default {
	title: "Evaluator/EvaluatorPerformanceHeader",
	component: EvaluatorPerformanceHeader,
} as ComponentMeta<typeof EvaluatorPerformanceHeader>;

const Template: ComponentStory<typeof EvaluatorPerformanceHeader> = (args) => (
  <EvaluatorPerformanceHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
	setAll: (status: string) => console.log(status),
};
