const program: dehydratedProgram = {
  id: 1,
  label: "Ford: Full-Stack Web Development",
  root: {
    type: "root",
    label: {
      full: "Ford: Full-Stack Web Development",
      short: "Full-Stack Web Development",
    },
    slug: "ford-full-stack",
    children: [
      "unit-getting-started-ford",
      "unit-websites",
      "unit-web-apps",
      "unit-problem-solving",
      "unit-spas-angular",
      "unit-persistence-spring-boot",
      "unit-capstones-ford",
    ],
  },
  posts: [
    {
      type: "unit",
      label: {
        full: "Getting Started",
        tiny: "0",
      },
      slug: "unit-getting-started-ford",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Websites",
        tiny: "1",
      },
      slug: "unit-websites",
      children: [
        "section-cli-1",
        "section-git-1",
        "section-websites-1",
        "section-websites-2",
        "section-websites-3",
      ],
    },
    {
      type: "unit",
      label: {
        full: "Web Apps",
        tiny: "2",
      },
      slug: "unit-web-apps",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Problem Solving",
        tiny: "3",
      },
      slug: "unit-problem-solving",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Single-Page Applications with Angular",
        short: "SPAs with Angular",
        tiny: "4",
      },
      slug: "unit-spas-angular",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Persistence with Java and Spring Boot",
        short: "Persistence",
        tiny: "5",
      },
      slug: "unit-persistence-spring-boot",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Capstones",
        short: "Capstones",
        tiny: "6",
      },
      slug: "unit-capstones-ford",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Intro to CLI",
        short: "CLI: Intro",
      },
      slug: "section-cli-1",
      children: [
        "cli-intro",
        "cli-navigation-1",
        "cli-file-management-1",
        "cli-flags-and-arguments",
        "guide-common-cli-tasks",
        "concepts-nix",
      ],
    },
    {
      type: "section",
      label: {
        full: "Intro to Git",
        short: "Git: Intro",
      },
      slug: "section-git-1",
      children: [
        "git-intro",
        "git-commits",
        "git-staging",
        "git-repositories",
        "git-remotes",
        "readmes",
        "guide-common-git-tasks",
        "concepts-git",
      ],
    },
    {
      type: "section",
      label: {
        full: "Websites: 1",
      },
      slug: "section-websites-1",
      children: [
        "internet-intro",
        "web-intro",
        "local-file-servers",
        "html-intro",
        "html-syntax",
        "html-div-and-span",
        "html-headings-and-paragraphs",
        "html-images",
        "html-lists",
        "github-pages",
        "css-selectors-1",
        "css-syntax",
        "css-units",
        "css-layout-1",
        "dev-tools-1",
        "design-colors",
        "css-colors",
        "guide-color-pallettes",
        "guide-selecting-tags",
        "concept-file-serving",
      ],
    },
    {
      type: "section",
      label: {
        full: "Websites: 2",
      },
      slug: "section-websites-2",
      children: [
        "html-structure-semantics",
        "css-box-model",
        "html-text-semantics",
        "html-links",
        "css-typography",
        "css-web-fonts",
        "css-selectors-2",
        "css-variables",
        "http-intro",
        "urls-1",
        "http-status-codes",
        "dev-tools-2",
        "concept-http",
        "concept-networking",
        "concept-client-server",
        "concept-web-vs-internet",
      ],
    },
    {
      type: "section",
      label: {
        full: "Websites: 3",
      },
      slug: "section-websites-3",
      children: [
        "design-content-inventories",
        "design-layout-1",
        "css-resets",
        "css-flex",
        "css-grid",
        "guide-css-layout",
        "css-selectors-3",
        "css-media-queries",
        "css-positioning",
        "guide-css-specificity",
        "guide-responsive-design",
        "concept-how-browsers-work",
        "guide-to-working-on-a-feature",
        "guide-to-starting-a-website",
        "guide-debugging-websites",
      ],
    },
    {
      type: "topic",
      label: {
        full: "Intro to the Command Line",
        short: "Intro to CLI",
      },
      slug: "cli-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CLI Navigation",
      },
      slug: "cli-navigation-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CLI: File Management",
      },
      slug: "cli-file-management-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CLI: Flags and Arguments",
      },
      slug: "cli-flags-and-arguments",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Common CLI Tasks",
      },
      slug: "guide-common-cli-tasks",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding *nix",
      },
      slug: "concepts-nix",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Git",
      },
      slug: "git-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Git: Staging",
      },
      slug: "git-staging",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Git: Commits",
      },
      slug: "git-commits",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Git Repositories",
      },
      slug: "git-repositories",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Git Remote Repositories",
        short: "Git Remotes",
      },
      slug: "git-remotes",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "READMEs",
      },
      slug: "readmes",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Common Git Tasks",
        short: "Common Git Task Guide",
      },
      slug: "guide-common-git-tasks",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding Git",
      },
      slug: "concepts-git",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to the Internet",
      },
      slug: "internet-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to the Web",
      },
      slug: "web-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Local File Servers",
      },
      slug: "local-file-servers",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to HTML",
      },
      slug: "html-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML Syntax",
      },
      slug: "html-syntax",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: <div> & <span>",
        short: "<div> & <span>",
      },
      slug: "html-div-and-span",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Headings & Paragraphs",
        short: "Headings & Paragraphs",
      },
      slug: "html-headings-and-paragraphs",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Images",
        short: "Images",
      },
      slug: "html-images",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Lists",
        short: "Lists",
      },
      slug: "html-lists",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "GitHub Pages",
      },
      slug: "github-pages",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Selectors: 1",
      },
      slug: "css-selectors-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Syntax",
      },
      slug: "css-syntax",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Units",
      },
      slug: "css-units",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Layout",
      },
      slug: "css-layout-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Browser Dev Tools 1",
        short: "Dev Tools",
      },
      slug: "dev-tools-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Design: Colors",
      },
      slug: "design-colors",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How to Build a Color Pallette",
      },
      slug: "guide-color-pallettes",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Colors",
      },
      slug: "css-colors",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How to Select HTML Tags",
        short: "Selecting HTML Tags",
      },
      slug: "guide-selecting-tags",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding Static File Serving",
      },
      slug: "concept-file-serving",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Box Model",
      },
      slug: "css-box-model",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Typography",
      },
      slug: "css-typography",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Web Fonts",
      },
      slug: "css-web-fonts",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Structural Semantics",
      },
      slug: "html-structure-semantics",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Links",
      },
      slug: "html-links",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML: Text Semantics",
      },
      slug: "html-text-semantics",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Selectors 2",
      },
      slug: "css-selectors-2",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "URLs",
      },
      slug: "urls-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTTP Status Codes",
      },
      slug: "http-status-codes",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Browser Dev Tools 2",
      },
      slug: "dev-tools-2",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to HTTP",
      },
      slug: "http-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Variables",
      },
      slug: "css-variables",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding HTTP",
      },
      slug: "concept-http",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding Networking",
      },
      slug: "concept-networking",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding Client-Server Communication",
      },
      slug: "concept-client-server",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Distinguishing Between the Web and the Internet",
        short: "Web vs. Internet",
      },
      slug: "concept-web-vs-internet",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Designing with Content Inventories",
      },
      slug: "design-content-inventories",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Designing Web Layouts",
      },
      slug: "design-layout-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Resets",
      },
      slug: "css-resets",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Flexbox",
      },
      slug: "css-flex",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Grid",
      },
      slug: "css-grid",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Layout with CSS",
      },
      slug: "guide-css-layout",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Selectors 3",
      },
      slug: "css-selectors-3",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Media Queries",
      },
      slug: "css-media-queries",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS: Positioning",
      },
      slug: "css-positioning",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Understanding CSS Specificity",
      },
      slug: "guide-css-specificity",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Responsive Design",
      },
      slug: "guide-responsive-design",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "How Browsers Work",
      },
      slug: "concept-how-browsers-work",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How to Work on a Feature",
      },
      slug: "guide-to-working-on-a-feature",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How to Start a Website",
      },
      slug: "guide-to-starting-a-website",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How to Debug a Website",
      },
      slug: "guide-debugging-websites",
      children: [],
    },
  ],
};

export default program;
