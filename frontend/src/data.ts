export const data = {
  program: {
    id: 1,
    label: "Ford: Full-Stack Web Development",
    units: [
      {
        id: 1,
        full_label: "Websites",
        short_label: "Websites",
        tiny_label: "1",
        slug: "websites",
        table_of_contents:
          "# Websites \n\n## Check these [links](#some-link) to sections",
        sections: [
          {
            id: 1,
            full_label: "Websites 1",
            short_label: "Websites 1",
            slug: "websites-1",
            table_of_contents: "# Websites 1\n\n## Check this out",
            activities: [
              {
                id: 1,
                type: "topic",
                full_label: "HTML: <div> and <span>",
                short_label: "<div> & <span>",
                slug: "html-div-span",
                section_id: 1,
                unit_id: 1,
                content:
                  "# HTML: `<div>` and `<span>`\r\n\r\nHTML is for structuring content. What does that mean? When content is unstructured, it doesn't follow any particular format. For example, an unstructured menu at a restaurant might look like this:\r\n\r\n>We serve cheese pizza ($9.99), you can add pepperoni for 2 bucks, and we serve salads starting at $5.\r\n\r\nThe same content might look like this with structure:\r\n\r\n```html\r\n<div>\r\n  <div>\r\n    <span>Cheese Pizza</span> - <span>$9.99</span>\r\n  </div>\r\n  <div>\r\n    <span>Pepperoni Pizza</span> - <span>$11.99</span>\r\n  </div>\r\n  <div>\r\n    <span>Salad</span> - <span>$5.00+</span>\r\n  </div>\r\n</div>\r\n```\r\n\r\nWhen content is structured you can target specific parts of it, which helps with styling and programming it.\r\n\r\n## Block and Inline Content\r\n\r\nThe simplest and most generic way that content can be structured is categorizing it as either \"block\" or \"inline.\"\r\n\r\n### Block content\r\n\r\nContent that would ordinarily take up an entire row when presented. Examples include headings and paragraphs.\r\n\r\n```html\r\n<div>A heading</div>\r\n<div>An entire paragraph of content could go here</div>\r\n```\r\n\r\n### Inline content\r\n\r\nContent that would ordinarily not break the flow of content when presented. Examples include emphasized text in a passage and links.\r\n\r\n```html\r\n<div>An <span>emphasized</span> heading</div>\r\n<div>An entire paragraph of <span>linked content</span> could go here</div>\r\n```\r\n\r\nInline content usually occurs inside of block content.\r\n\r\n### `<div>` and `<span>`\r\n\r\nGeneric block content is represented in HTML by putting it in between `<div>` tags. `<span>` is used the same way for inline content.\r\n\r\nHTML features over 100 tags that are reserved for specific purposes (including headings, paragraphs, emphasis, and links). When none of the existing tags are appropriate for your structure, `<div>` and `<span>` can be used as custom tags.\r\n\r\n## Watch Out!\r\n\r\nIt's tempting to use `<div>` and `<span>` for everything in an HTML document, and many developers do exactly this. This is a bad practice for web development. As you learn more semantic tags, you should use those first and only use `<div>` and `<span>` when there aren't existing tags that are more appropriate.\r\n\r\n## Additional Resources\r\n\r\n| Resource | Description |\r\n| --- | --- |\r\n| [MDN: `<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) | MDN's reference on `<div>` |\r\n| [MDN: `<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) | MDN's reference on `<span>` |\r\n",
              },
            ],
          },
        ],
      },
    ],
  },
};

type activity = {
  id: number;
  type: string;
  full_label: string;
  short_label: string;
  slug: string;
  section_id: number;
  unit_id: number;
  content: string;
};
type section = {
  id: number;
  full_label: string;
  short_label: string;
  slug: string;
  table_of_contents: string;
  activities: activity[];
};
type unit = {
  id: number;
  full_label: string;
  short_label: string;
  tiny_label: string;
  slug: string;
  table_of_contents: string;
  sections: section[];
};
type program = {
  id: number;
  label: string;
  units: unit[];
};

function findUnit(units: unit[], id: number) {
  return units.find((unit) => unit.id === id);
}

function findSection(sections: section[], id: number) {
  return sections.find((section) => section.id === id);
}

export function getUnitLinks(units: unit[]) {
  return units.map((unit) => ({
    id: unit.id,
    label: unit.tiny_label,
    url: `/${unit.slug}`,
  }));
}

export function getCrumbs(
  units: unit[],
  sections: section[],
  activity: activity
) {
  return [
    {
      id: 1,
      label: findUnit(units, activity.unit_id)?.short_label || "",
      url: findUnit(units, activity.unit_id)?.slug || "",
    },
    {
      id: 2,
      label: findSection(sections, activity.unit_id)?.short_label || "",
      url: findSection(sections, activity.unit_id)?.slug || "",
    },
    {
      id: 3,
      label: activity.short_label,
      url: activity.slug,
    },
  ];
}
export function getSections(program: program) {
  return program.units.flatMap((unit) => unit.sections);
}
