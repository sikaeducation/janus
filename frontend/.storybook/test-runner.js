const { injectAxe, configureAxe, getViolations } = require("axe-playwright");
const { getStoryContext } = require("@storybook/test-runner");

module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    const storyContext = await getStoryContext(page, context);
    await configureAxe(page, {
      rules: [
        {
          id: "color-contrast",
          selector: "*:not(.Button.primary-button)",
        },
        ...storyContext.parameters.a11y.config.rules
      ]
    })
    const violations = await getViolations(page, "#root");
    if (violations.length > 0) {
      const violationMessages = violations.map(formatViolation).join("\n\n");
      throw new Error(violationMessages);
    }
  },
};

function formatViolation(violation) {
  const { help } = violation
  const nodes = violation.nodes.reduce((nodes, node) => {
    return [...nodes, `${node.target}:\n${node.failureSummary}`]
  }, []).join("\n\n")

  return `${help}.\n\n${nodes}`
}
