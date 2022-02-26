const program: rawProgram = {
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
      children: [
        "sika-discord-setup",
        "setup-accounts",
        "setup-software",
        "vs-code-config",
        "zsh-config",
        "sika-how-to-do-this-program",
        "sika-school-community",
        "policies-ford",
        "sika-stand-up",
        "warmups",
        "project-presentations",
        "habits-of-excellence",
        "sika-surveys",
        "sika-stand-down",
        "thankful-thursday",
        "feelings-friday",
        "simplified-neuroscience",
        "passive-vs-active-learning",
        "education-myths",
        "dreyfuss-model",
        "zone-of-proximal-development",
        "sika-learning-to-learn",
        "sika-vocabulary",
        "sika-personal-empowerment-protocol",
        "markdown",
        "build-and-burn",
        "pair-programming",
        "sika-screenshots",
      ],
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
      children: [
        "section-reading-code",
        "section-writing-code",
        "section-dom-1",
        "section-api-integration-1",
        "section-dom-2",
        "section-html-forms",
        "section-api-integration-2",
      ],
    },
    {
      type: "unit",
      label: {
        full: "Problem Solving",
        tiny: "3",
      },
      slug: "unit-problem-solving",
      isHidden: true,
      children: [
        "section-testing-1",
        "section-typescript-1",
        "section-polya",
        "section-testing-2",
        "section-typescript-2",
        "section-ts-refactoring",
        "section-oop",
      ],
    },
    {
      type: "unit",
      label: {
        full: "Single-Page Applications with Angular",
        short: "SPAs with Angular",
        tiny: "4",
      },
      slug: "unit-spas-angular",
      isHidden: true,
      children: [
        "section-static-angular",
        "section-dynamic-angular",
        "section-angular-components-1",
        "section-angular-components-2",
      ],
    },
    {
      type: "unit",
      label: {
        full: "Persistence with Java and Spring Boot",
        short: "Persistence",
        tiny: "5",
      },
      slug: "unit-persistence-spring-boot",
      isHidden: true,
      children: [
        "section-java-1",
        "section-spring-boot-1",
        "section-sql-1",
        "section-data-modeling",
        "section-spring-boot-2",
      ],
    },
    {
      type: "unit",
      label: {
        full: "Capstones",
        short: "Capstones",
        tiny: "6",
      },
      slug: "unit-capstones-ford",
      isHidden: true,
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
        "learn-enough-cli",
        "intro-cli-questions",
        "exercise-cli-exercise-1",
        "cli-navigation-1",
        "cli-navigation-questions",
        "cli-wineflix-navigation-exercise",
        "cli-file-management-1",
        "cli-file-management-questions",
        "cli-wineflix-file-management-exercise-1",
        "cli-wineflix-file-management-exercise-2",
        "cli-flags-and-arguments",
        "cli-flags-arguments-questions",
        "guide-common-cli-tasks",
        "concepts-nix",
        "cli-murder-mystery",
        "cli-vocabulary",
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
        "git-staging",
        "git-commits",
        "git-commits-questions",
        "git-repositories",
        "git-remotes",
        "git-remotes-questions",
        "git-remotes-basic-exercise",
        "readmes",
        "guide-common-git-tasks",
        "git-exercise-1",
        "git-exercise-2",
        "git-exercise-3",
        "git-vocabulary",
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
        "internet-questions-1",
        "network-diagram-exercise",
        "web-intro",
        "web-questions-1",
        "diagramming-http-request-exercise",
        "local-file-servers",
        "serve-repo-exercise",
        "local-file-servers-questions",
        "html-intro",
        "html-syntax",
        "html-questions-1",
        "link-css-to-html-exercise",
        "scaffold-from-scratch-exercise",
        "correct-broken-html-exercise",
        "html-div-and-span",
        "html-headings-and-paragraphs",
        "html-images",
        "html-lists",
        "github-pages",
        "css-selectors-1",
        "css-selectors-questions-1",
        "css-diner-exercise",
        "css-syntax",
        "css-units",
        "css-layout-1",
        "css-layout-questions",
        "draw-css-exercise",
        "dev-tools-1",
        "design-colors",
        "css-colors",
        "css-colors-questions",
        "guess-the-color-exercise",
        "guide-color-pallettes",
        "guide-selecting-tags",
        "html-summer-camp-exercise",
        "web-vocabulary-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "Websites: 2",
      },
      slug: "section-websites-2",
      children: [
        "http-intro",
        "http-questions",
        "http-headless-request-exercise",
        "urls-1",
        "urls-questions",
        "url-component-identification-exercise",
        "url-building-exercise",
        "http-status-codes",
        "http-status-codes-questions",
        "http-status-code-table-exercise",
        "dev-tools-2",
        "html-links",
        "html-structure-semantics",
        "html-structure-semantics-questions",
        "html-text-semantics",
        "css-selectors-2",
        "css-selectors-questions-2",
        "css-box-model",
        "css-programming-danger-exercise",
        "css-typography",
        "css-variables",
        "concept-http",
        "web-vocabulary-2",
      ],
    },
    {
      type: "section",
      label: {
        full: "Websites: 3",
      },
      slug: "section-websites-3",
      children: [
        "css-resets",
        "css-flex",
        "css-flexbox-froggy-exercise",
        "css-flex-questions",
        "css-grid",
        "css-grid-questions",
        "css-grid-garden-exercise",
        "css-selectors-3",
        "css-selectors-questions-3",
        "css-media-queries",
        "css-media-queries-questions",
        "css-positioning",
        "css-positioning-questions",
        "design-content-inventories",
        "design-layout-1",
        "guide-css-layout",
        "guide-to-starting-a-website",
        "web-book-promo-page-exercise",
        "implement-wireframe-exercise-group",
        "implement-wireframe-exercise-solo",
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
      type: "guide",
      label: {
        full: "How to Start a Website",
      },
      slug: "guide-to-starting-a-website",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "CLI Exercise 1",
      },
      slug: "exercise-cli-exercise-1",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Setup Accounts",
      },
      slug: "setup-accounts",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Setup Software",
      },
      slug: "setup-software",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Stand-up",
      },
      slug: "sika-stand-up",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Warmups",
      },
      slug: "warmups",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Project Presentations",
      },
      slug: "project-presentations",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Habits of Excellence",
      },
      slug: "habits-of-excellence",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Surveys",
      },
      slug: "sika-surveys",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Stand-down",
      },
      slug: "sika-stand-down",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Feelings Friday",
      },
      slug: "feelings-friday",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Simplified Neuroscience",
      },
      slug: "simplified-neuroscience",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Passive vs. Active Learning",
      },
      slug: "passive-vs-active-learning",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Education Myths",
      },
      slug: "education-myths",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Dreyfuss Model of Skill Acquisition",
        short: "Dreyfuss Model",
      },
      slug: "dreyfuss-model",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Zone of Proximal Development",
        short: "ZPD",
      },
      slug: "zone-of-proximal-development",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Intro to the CLI: Questions",
        short: "CLI Questions",
      },
      slug: "intro-cli-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Learn Enough Command Line To Be Dangerous",
        short: "Learn Enough CLI",
      },
      slug: "learn-enough-cli",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI Navigation Questions",
      },
      slug: "cli-navigation-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI Wineflix Navigation",
      },
      slug: "cli-wineflix-navigation-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI File Management Questions",
      },
      slug: "cli-file-management-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Wineflix File Management Exercise 1",
      },
      slug: "cli-wineflix-file-management-exercise-1",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Wineflix File Management Exercise 2",
      },
      slug: "cli-wineflix-file-management-exercise-2",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Sika Vocabulary",
      },
      slug: "sika-vocabulary",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI Vocabulary",
      },
      slug: "cli-vocabulary",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI Flags & Arguments Questions",
      },
      slug: "cli-flags-arguments-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CLI Murder Mystery",
      },
      slug: "cli-murder-mystery",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Git Commits Questions",
      },
      slug: "git-commits-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Git Remotes Questions",
      },
      slug: "git-remotes-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Git Remotes Exercise",
      },
      slug: "git-remotes-basic-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Git Exercise 1",
      },
      slug: "git-exercise-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Git Exercise 2",
      },
      slug: "git-exercise-2",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Git Exercise 3",
      },
      slug: "git-exercise-3",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Git Vocabulary",
      },
      slug: "git-vocabulary",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Internet Questions",
      },
      slug: "internet-questions-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Network Diagram",
      },
      slug: "network-diagram-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Web Questions",
      },
      slug: "web-questions-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Diagramming HTTP Requests",
      },
      slug: "diagramming-http-request-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Local File Server Questions",
      },
      slug: "local-file-servers-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Web Vocabulary",
      },
      slug: "web-vocabulary-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Serve a Repo",
      },
      slug: "serve-repo-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Scaffold From Scratch",
      },
      slug: "scaffold-from-scratch-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Correct Broken HTML",
      },
      slug: "correct-broken-html-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "CSS Diner",
      },
      slug: "css-diner-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Selector Questions",
      },
      slug: "css-selectors-questions-1",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Layout Questions",
      },
      slug: "css-layout-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Draw CSS",
      },
      slug: "draw-css-exercise",
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
      type: "questions",
      label: {
        full: "CSS Colors Questions",
      },
      slug: "css-colors-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Guess The Color",
      },
      slug: "guess-the-color-exercise",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Code",
      },
      slug: "section-reading-code",
      children: [
        "programming-intro",
        "programming-input-output",
        "programming-input-output-questions",
        "programming-data-types",
        "programming-expressions",
        "programming-expressions-questions",
        "programming-math",
        "programming-math-questions",
        "programming-variables",
        "programming-variables-questions",
        "programming-boolean-logic",
        "programming-boolean-logic-questions",
        "programming-boolean-logic-2",
        "programming-boolean-logic-questions-2",
        "programming-conditional-logic",
        "programming-conditional-logic-questions",
        "programming-functions",
        "programming-functions-questions",
        "programming-variable-scoping",
        "programming-variable-scoping-questions",
        "programming-data-types-2",
        "programming-iteration",
        "programming-iteration-questions",
        "reading-code-exercise-1",
        "reading-code-exercise-2",
        "reading-code-exercise-3",
        "reading-code-exercise-4",
        "reading-code-exercise-5",
        "reading-code-exercise-6",
        "reading-code-exercise-7",
        "reading-code-exercise-8",
        "reading-code-exercise-9",
        "reading-code-exercise-10",
        "reading-code-exercise-11",
        "reading-code-exercise-12",
        "reading-code-exercise-13",
        "reading-code-exercise-14",
        "reading-code-exercise-15",
        "reading-code-vocab",
      ],
    },
    {
      type: "section",
      label: {
        full: "Writing Code",
      },
      slug: "section-writing-code",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "DOM 1",
      },
      slug: "section-dom-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "API Integration 1",
      },
      slug: "section-api-integration-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "DOM 2",
      },
      slug: "section-dom-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "HTML Forms",
      },
      slug: "section-html-forms",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "API Integration 2",
      },
      slug: "section-api-integration-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Testing 1",
      },
      slug: "section-testing-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "TypeScript 1",
      },
      slug: "section-typescript-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Polya's Problem-Solving Method",
        short: "Polya",
      },
      slug: "section-polya",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Testing 2",
      },
      slug: "section-testing-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "TypeScript 2",
      },
      slug: "section-typescript-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "TypeScript Refactoring",
        short: "TS Refactoring",
      },
      slug: "section-ts-refactoring",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "TypeScript OOP",
        short: "TS OOP",
      },
      slug: "section-oop",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Static Angular",
      },
      slug: "section-static-angular",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Dynamic Angular",
      },
      slug: "section-dynamic-angular",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Angular Components 1",
      },
      slug: "section-angular-components-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Angular Components 2",
      },
      slug: "section-angular-components-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Intro to Java",
      },
      slug: "section-java-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Intro to Spring Boot",
      },
      slug: "section-spring-boot-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Intro to SQL",
      },
      slug: "section-sql-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Data Modeling",
      },
      slug: "section-data-modeling",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Spring Boot 2",
      },
      slug: "section-spring-boot-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #1",
      },
      slug: "reading-code-exercise-1",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #2",
      },
      slug: "reading-code-exercise-2",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #3",
      },
      slug: "reading-code-exercise-3",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #4",
      },
      slug: "reading-code-exercise-4",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #5",
      },
      slug: "reading-code-exercise-5",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #6",
      },
      slug: "reading-code-exercise-6",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #7",
      },
      slug: "reading-code-exercise-7",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #8",
      },
      slug: "reading-code-exercise-8",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #9",
      },
      slug: "reading-code-exercise-9",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #10",
      },
      slug: "reading-code-exercise-10",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #11",
      },
      slug: "reading-code-exercise-11",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #12",
      },
      slug: "reading-code-exercise-12",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #13",
      },
      slug: "reading-code-exercise-13",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #14",
      },
      slug: "reading-code-exercise-14",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Reading Exercise #15",
      },
      slug: "reading-code-exercise-15",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Policies",
      },
      slug: "policies-ford",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "VS Code Configuration",
      },
      slug: "vs-code-config",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "`zsh` Configuration",
      },
      slug: "zsh-config",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Markdown",
      },
      slug: "markdown",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "HTML Summer Camp",
      },
      slug: "html-summer-camp-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Link CSS to HTML",
      },
      slug: "link-css-to-html-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Questions",
      },
      slug: "html-questions-1",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Flex Questions",
      },
      slug: "css-flex-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Flexbox Froggy",
      },
      slug: "css-flexbox-froggy-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Grid Garden",
      },
      slug: "css-grid-garden-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Grid Questions",
        short: "Grid Questions",
      },
      slug: "css-grid-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Media Queries Questions",
        short: "Media Queries Questions",
      },
      slug: "css-media-queries-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Positioning Questions",
        short: "Positioning Questions",
      },
      slug: "css-positioning-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "CSS Programming Danger Exercise",
        short: "Programming Danger",
      },
      slug: "css-programming-danger-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Selectors Questions",
      },
      slug: "css-selectors-questions-2",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Selectors Questions",
      },
      slug: "css-selectors-questions-3",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Typography",
      },
      slug: "css-typography",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Structural Semantics Questions",
      },
      slug: "html-structure-semantics-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "HTTP Headless Request Exercise",
      },
      slug: "http-headless-request-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTTP Questions",
      },
      slug: "http-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "HTTP Status Code Table",
      },
      slug: "http-status-code-table-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTTP Status Code Questions ",
      },
      slug: "http-status-codes-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Implement Wireframe (group)",
      },
      slug: "implement-wireframe-exercise-group",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Implement Wireframe (solo)",
      },
      slug: "implement-wireframe-exercise-solo",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "URL Building Exercise",
      },
      slug: "url-building-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "URL Component Identification",
      },
      slug: "url-component-identification-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "URL Questions",
      },
      slug: "urls-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Book Promo Page",
      },
      slug: "web-book-promo-page-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Web Vocabulary",
      },
      slug: "web-vocabulary-2",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Boolean Operators",
      },
      slug: "programming-boolean-logic",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Boolean Comparisons",
      },
      slug: "programming-boolean-logic-2",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Conditional Logic",
      },
      slug: "programming-conditional-logic",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Simple Data Types",
      },
      slug: "programming-data-types",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Complex Data Types",
      },
      slug: "programming-data-types-2",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Expressions",
      },
      slug: "programming-expressions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Functions",
      },
      slug: "programming-functions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Input/Output",
      },
      slug: "programming-input-output",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Programming",
      },
      slug: "programming-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Iteration",
      },
      slug: "programming-iteration",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Programming Math",
      },
      slug: "programming-math",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Variable Scoping",
      },
      slug: "programming-variable-scoping",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Variables",
      },
      slug: "programming-variables",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Reading Code Vocabulary",
        short: "Reading Code Vocab",
      },
      slug: "reading-code-vocab",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Boolean Logic Operators Questions",
      },
      slug: "programming-boolean-logic-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Boolean Logic Comparisons Questions",
      },
      slug: "programming-boolean-logic-questions-2",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Conditional Logic Questions",
      },
      slug: "programming-conditional-logic-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Expressions Questions",
      },
      slug: "programming-expressions-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Functions Questions",
      },
      slug: "programming-functions-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Input/Output Questions",
      },
      slug: "programming-input-output-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Iteration Questions",
      },
      slug: "programming-iteration-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Programming Math Questions",
      },
      slug: "programming-math-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Variable Scoping Questions",
      },
      slug: "programming-variable-scoping-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Variables Questions",
      },
      slug: "programming-variables-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Build and Burn",
      },
      slug: "build-and-burn",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Pair Programming",
      },
      slug: "pair-programming",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Discord Setup",
      },
      slug: "sika-discord-setup",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "How to Do This Program",
      },
      slug: "sika-how-to-do-this-program",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Learning to Learn",
      },
      slug: "sika-learning-to-learn",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "School Community",
      },
      slug: "sika-school-community",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Screenshots",
      },
      slug: "sika-screenshots",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Thankful Thursday",
      },
      slug: "thankful-thursday",
      children: [],
    },
    {
      type: "meta",
      label: {
        full: "Personal Empowerment Protocol",
      },
      slug: "sika-personal-empowerment-protocol",
      children: [],
    },
  ],
};

export default program;
