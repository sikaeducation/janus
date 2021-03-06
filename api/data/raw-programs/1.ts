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
        "sika-vocabulary",
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
        "sika-personal-empowerment-protocol",
        "how-to-ask-questions",
        "markdown",
        "build-and-burn",
        "sika-screenshots",
        "git-updating-from-upstream",
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
      children: [
        "section-polya",
        "section-javascript-2",
        "section-testing-1",
        "section-typescript-1",
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
      children: [
        "section-oop",
        "section-static-angular",
        "section-dynamic-angular",
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
      children: ["section-java-1", "section-sql-1", "section-spring-boot-1"],
    },
    {
      type: "unit",
      label: {
        full: "Capstones",
        short: "Capstones",
        tiny: "6",
      },
      slug: "unit-capstones-ford",
      children: [
        "capstone-requirements-simple",
        "capstone-ideas",
        "capstone-presentations",
        "full-stack-capstone-exercise",
      ],
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
        "dev-tools-2",
        "html-links",
        "html-structure-semantics",
        "html-structure-semantics-questions",
        "html-text-semantics",
        "css-selectors-2",
        "css-selectors-questions-2",
        "css-box-model",
        "css-programming-danger-exercise",
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
        "css-images",
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
        "web-book-promo-page-exercise",
        "implement-wireframe-exercise-group",
        "implement-wireframe-exercise-solo",
        "web-vocabulary-3",
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
      type: "topic",
      label: {
        full: "CSS: Colors",
      },
      slug: "css-colors",
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
      children: [
        "habits-learn-your-tools",
        "habits-clean-workspace",
        "habits-work-small",
        "habits-work-together",
        "habits-automate",
      ],
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
      isRequired: true,
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
      isRequired: true,
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
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Git Exercise 2",
      },
      slug: "git-exercise-2",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Git Exercise 3",
      },
      slug: "git-exercise-3",
      children: [],
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "Git Vocabulary",
      },
      slug: "git-vocabulary",
      children: [],
      isRequired: true,
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
        full: "Network Diagram (Group)",
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
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "Web Vocabulary",
      },
      slug: "web-vocabulary-3",
      children: [],
      isRequired: true,
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
        "js-programming-concepts-review",
      ],
    },
    {
      type: "section",
      label: {
        full: "Writing Code",
      },
      slug: "section-writing-code",
      children: [
        "js-running-code",
        "js-running-node-projects",
        "js-strings",
        "js-strings-questions",
        "js-arrays",
        "js-arrays-questions",
        "js-arrays-exercise",
        "js-objects",
        "js-objects-questions",
        "comments",
        "comments-questions",
        "js-foreach",
        "js-foreach-questions",
        "js-find-filter",
        "js-find-filter-questions",
        "js-map",
        "js-map-questions",
        "candy-shop-item-and-sale-combiner-exercise",
        "applicative-programming-js",
        "beyonce-object-exercise",
        "writing-code-vocab",
      ],
    },
    {
      type: "section",
      label: {
        full: "DOM 1",
      },
      slug: "section-dom-1",
      children: [
        "dom-1",
        "dom-questions",
        "draw-dom-exercise",
        "data-structures-intro",
        "data-structures-questions",
        "data-structures-trees",
        "data-structures-trees-questions",
        "dom-query-selectors",
        "dom-query-selectors-questions",
        "dom-create-append-elements",
        "dom-create-append-elements-questions",
        "corgi-dom-manipulation-exercises",
        "dom-vocab-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "API Integration 1",
      },
      slug: "section-api-integration-1",
      children: [
        "api-intro",
        "insomnia",
        "js-fetch-1",
        "js-fetch-questions",
        "json",
        "json-questions",
        "js-then-catch",
        "js-then-catch-questions",
        "pokemon-library-exercise",
        "star-wars-library-exercise-group",
        "api-integration-vocab-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "DOM 2",
      },
      slug: "section-dom-2",
      children: [
        "dom-manipulation",
        "dom-manipulation-questions",
        "dom-events",
        "dom-events-questions",
        "add-event-listener-exercise",
        "html-buttons",
        "html-buttons-questions",
        "boom-goes-the-dynamite-exercise",
        "email-repeater-exercise",
        "js-read-inputs-exercise",
        "underpants-gnomes-exercise",
        "dom-classlist",
        "dom-classlist-questions",
        "album-previewer-exercise",
        "dom-calculator-exercise",
        "dom-vocab-2",
      ],
    },
    {
      type: "section",
      label: {
        full: "HTML Forms",
      },
      slug: "section-html-forms",
      children: [
        "html-forms",
        "html-forms-questions",
        "html-form-inputs",
        "html-form-inputs-questions",
        "html-form-submission",
        "html-form-submission-questions",
        "css-forms",
        "css-forms-questions",
        "query-strings",
        "query-strings-questions",
        "html-forms-vocab",
      ],
    },
    {
      type: "section",
      label: {
        full: "API Integration 2",
      },
      slug: "section-api-integration-2",
      children: [
        "http-status-codes",
        "http-status-codes-questions",
        "http-status-code-table-exercise",
        "js-async-await",
        "js-async-await-questions",
        "async-await-refactoring-exercise",
        "js-promises",
        "js-promises-questions",
        "programming-async",
        "js-promise-all",
        "js-promise-all-questions",
        "js-local-storage",
        "js-local-storage-questions",
        "production-website-exercise",
        "api-integration-vocab-2",
      ],
    },
    {
      type: "section",
      label: {
        full: "Unit Testing with Jest",
      },
      slug: "section-testing-1",
      children: [
        "testing-intro",
        "testing-questions",
        "test-haters-advocate",
        "jest-intro",
        "testing-jest-questions",
        "jest-setup-build-and-burn",
        "simple-testing-jest",
        "simple-testing-jest-questions",
        "jest-matchers",
        "jest-matchers-questions",
        "jest-matchers-exercises",
        "test-naming",
        "test-naming-questions",
        "test-naming-exercise-factorial",
        "test-organization",
        "test-organization-questions",
        "jest-spies",
        "jest-spies-questions",
        "test-spy-practice",
        "equivalence-partitioning",
        "equivalence-partitioning-questions",
        "guide-jest-browser-js",
        "simple-unit-testing-exercise",
        "testing-jest-vocabulary-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "TypeScript 1",
      },
      slug: "section-typescript-1",
      children: [
        "ts-intro",
        "ts-questions",
        "ts-configuration",
        "ts-configuration-questions",
        "ts-basic-types",
        "ts-types-questions-1",
        "ts-functions",
        "ts-functions-questions",
        "ts-object-types",
        "ts-object-types-questions",
        "ts-dom",
        "ts-dom-questions",
        "pokemon-library-exercise-2",
        "ts-vocabulary-1",
        "ts-jest",
      ],
    },
    {
      type: "section",
      label: {
        full: "Polya's Problem-Solving Method",
        short: "Polya",
      },
      slug: "section-polya",
      children: [
        "problem-analysis-intro",
        "polya-understanding-the-problem",
        "polya-understanding-the-problem-questions",
        "parts-of-the-problem-exercises",
        "unsolvable-problems-exercises",
        "problem-visualization-exercises",
        "problem-sequence-exercises",
        "veracity-exercises",
        "polya-enumerating-solutions",
        "polya-enumerating-solutions-questions",
        "solution-visualization-exercises",
        "problem-simplification-exercises",
        "solution-enumeration-exercises",
        "polya-work-the-problem",
        "pseudocode",
        "pseudocode-exercises",
        "polya-reflect",
        "polya-reflect-questions",
        "spot-the-error-exercise",
        "store-inventory-manager-exercise",
        "problem-solving-vocabulary",
      ],
    },
    {
      type: "section",
      label: {
        full: "Static Angular",
      },
      slug: "section-static-angular",
      children: [
        "angular-intro",
        "angular-getting-started",
        "angular-tutorial",
        "angular-templates",
        "angular-templates-questions",
        "angular-components",
        "angular-components-questions",
        "angular-forms",
        "angular-tutorial-forms",
        "deployment-spa-netlify",
        "naming-conventions-angular",
        "wineflix-ng",
        "angular-vocabulary-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "Dynamic Angular",
      },
      slug: "section-dynamic-angular",
      children: [
        "angular-event-emitters",
        "light-switch-exercise-ng",
        "angular-dependency-injection",
        "angular-services",
        "angular-api-integration",
        "angular-http-guide-exercise",
        "spa-routing-intro",
        "angular-router",
        "angular-router-tutorial",
        "sika-shoes-ng",
        "angular-vocabulary-2",
      ],
    },
    {
      type: "section",
      label: {
        full: "Intro to Java",
      },
      slug: "section-java-1",
      children: [
        "java-intro",
        "java-syntax",
        "java-hello-world-exercise",
        "java-basic-types",
        "java-variable-practice-exercise",
        "java-math-practice-exercise",
        "java-flow-control",
        "java-looping-practice-exercise",
        "rental-car-estimator-exercise",
        "java-arrays",
        "java-calculate-averages-exercise",
        "java-classes",
        "java-list-technologies-exercise",
        "java-dice-roll-exercise",
        "java-packages",
        "java-collections",
        "java-arraylist",
        "java-hashmap",
        "java-lambdas",
        "java-dealership-exercise",
        "java-basics-quiz",
        "java-fill-in-the-blank",
        "java-vocabulary-1",
      ],
    },
    {
      type: "section",
      label: {
        full: "Intro to Spring Boot",
      },
      slug: "section-spring-boot-1",
      children: [
        "http-rest",
        "spring-boot-intro",
        "spring-boot-cli",
        "spring-boot-basics",
        "spring-boot-basics-exercise",
        "spring-boot-basics-questions",
        "spring-boot-models",
        "spring-boot-repositories",
        "spring-boot-services",
        "spring-boot-controllers",
        "environment-variables",
        "environment-variables-dotenv-java",
        "cloud-deployment-intro",
        "cloud-deployment-heroku",
        "spring-boot-deployment",
        "spring-boot-deployment-exercise",
        "spring-boot-guide-to-simple-apis",
        "pokemon-api-exercise",
        "spring-boot-vocab",
      ],
    },
    {
      type: "section",
      label: {
        full: "Intro to SQL",
      },
      slug: "section-sql-1",
      children: [
        "databases-intro",
        "database-questions-1",
        "postgres-installation",
        "sql-intro",
        "sql-questions-1",
        "postgres-psql",
        "psql-questions",
        "sql-hair-and-eye-color",
        "sql-select",
        "sql-zoo-select-quiz",
        "sql-where",
        "sql-zoo-bbc-quiz",
        "sql-zoo-nobel-quiz",
        "sql-card-game",
        "sql-inner-joins",
        "sql-left-joins",
        "sql-joins-questions",
        "sql-join-quiz",
        "sql-full-quiz",
        "sql-vocabulary-1",
      ],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #1",
      },
      slug: "reading-code-exercise-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #2",
      },
      slug: "reading-code-exercise-2",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #3",
      },
      slug: "reading-code-exercise-3",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #4",
      },
      slug: "reading-code-exercise-4",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #5",
      },
      slug: "reading-code-exercise-5",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #6",
      },
      slug: "reading-code-exercise-6",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #7",
      },
      slug: "reading-code-exercise-7",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #8",
      },
      slug: "reading-code-exercise-8",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #9",
      },
      slug: "reading-code-exercise-9",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #10",
      },
      slug: "reading-code-exercise-10",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #11",
      },
      slug: "reading-code-exercise-11",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #12",
      },
      slug: "reading-code-exercise-12",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #13",
      },
      slug: "reading-code-exercise-13",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #14",
      },
      slug: "reading-code-exercise-14",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Reading Exercise #15",
      },
      slug: "reading-code-exercise-15",
      children: [],
      isRequired: true,
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
      isRequired: true,
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
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Implement Wireframe (solo)",
      },
      slug: "implement-wireframe-exercise-solo",
      children: [],
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "URL Building Exercise",
      },
      slug: "url-building-exercise",
      children: [],
    },
    {
      type: "questions",
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
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "Web Vocabulary",
      },
      slug: "web-vocabulary-2",
      children: [],
      isRequired: true,
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
      isRequired: true,
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
    {
      type: "exercise",
      label: {
        full: "Add Event Listener Exercise",
      },
      slug: "add-event-listener-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Album Previewer Exercise",
      },
      slug: "album-previewer-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "API Integration Vocabulary",
      },
      slug: "api-integration-vocab-1",
      children: [],
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "API Integration Vocabulary",
      },
      slug: "api-integration-vocab-2",
      children: [],
      isRequired: true,
    },
    {
      type: "topic",
      label: {
        full: "Intro to APIs",
      },
      slug: "api-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Applicative Programming",
      },
      slug: "applicative-programming-js",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "`async`/`await` Refactoring Exercise",
      },
      slug: "async-await-refactoring-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Beyonce Exercise",
      },
      slug: "beyonce-object-exercise",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Boom Goes The Dynamite",
      },
      slug: "boom-goes-the-dynamite-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Candy Shop: Item & Sale Combiner",
      },
      slug: "candy-shop-item-and-sale-combiner-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Comments",
      },
      slug: "comments",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Comments Questions",
      },
      slug: "comments-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Corgi DOM Manipulation Exercises",
      },
      slug: "corgi-dom-manipulation-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "CSS Forms",
      },
      slug: "css-forms",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "CSS Forms Questions",
      },
      slug: "css-forms-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Data Structures",
      },
      slug: "data-structures-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Data Structures Questions",
      },
      slug: "data-structures-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Data Structures: Trees",
      },
      slug: "data-structures-trees",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to the DOM",
      },
      slug: "dom-1",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "DOM Calculator",
      },
      slug: "dom-calculator-exercise",
      isRequired: true,
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "DOM: `.classList`",
      },
      slug: "dom-classlist",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM: `.classList` Questions",
      },
      slug: "dom-classlist-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Creating and Appending DOM Elements",
      },
      slug: "dom-create-append-elements",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Creating and Appending DOM Elements Questions",
      },
      slug: "dom-create-append-elements-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "DOM Events",
      },
      slug: "dom-events",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM Events Questions",
      },
      slug: "dom-events-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "DOM Manipulation",
      },
      slug: "dom-manipulation",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM Manipulation Questions",
      },
      slug: "dom-manipulation-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "DOM: Query Selectors",
      },
      slug: "dom-query-selectors",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM: Query Selectors Questions",
      },
      slug: "dom-query-selectors-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM Questions",
      },
      slug: "dom-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "DOM Vocabulary",
      },
      slug: "dom-vocab-1",
      children: [],
      isRequired: true,
    },
    {
      type: "questions",
      label: {
        full: "DOM Vocabulary",
      },
      slug: "dom-vocab-2",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Draw the DOM",
      },
      slug: "draw-dom-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Email Repeater Exercise",
      },
      slug: "email-repeater-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML Buttons",
      },
      slug: "html-buttons",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Buttons Questions",
      },
      slug: "html-buttons-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML Form Inputs",
      },
      slug: "html-form-inputs",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Form Inputs Questions",
      },
      slug: "html-form-inputs-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML Form Submission",
      },
      slug: "html-form-submission",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Form Submission Questions",
      },
      slug: "html-form-submission-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "HTML Forms",
      },
      slug: "html-forms",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Forms Questions",
      },
      slug: "html-forms-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "HTML Forms Vocabulary",
      },
      slug: "html-forms-vocab",
      children: [],
      isRequired: true,
    },
    {
      type: "topic",
      label: {
        full: "Insomnia",
      },
      slug: "insomnia",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Arrays",
      },
      slug: "js-arrays",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Arrays Questions",
      },
      slug: "js-arrays-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "JavaScript Arrays Exercise",
      },
      slug: "js-arrays-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`async`/`await`",
      },
      slug: "js-async-await",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`async`/`await` Questions",
      },
      slug: "js-async-await-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`fetch`",
      },
      slug: "js-fetch-1",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`fetch` Questions",
      },
      slug: "js-fetch-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript `.find()`/`.filter()`",
      },
      slug: "js-find-filter",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript `.find()`/`.filter()` Questions",
      },
      slug: "js-find-filter-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript `.forEach()`",
      },
      slug: "js-foreach",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript `.forEach()` Questions",
      },
      slug: "js-foreach-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`localStorage`",
      },
      slug: "js-local-storage",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`localStorage` Questions",
      },
      slug: "js-local-storage-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript `.map()`",
      },
      slug: "js-map",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript `.map()` Questions",
      },
      slug: "js-map-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Objects",
      },
      slug: "js-objects",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Objects Questions",
      },
      slug: "js-objects-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Promises",
      },
      slug: "js-promises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Promises Questions",
      },
      slug: "js-promises-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`Promise.all()`",
      },
      slug: "js-promise-all",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`Promise.all()` Questions",
      },
      slug: "js-promise-all-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "JavaScript Read Inputs Exercise",
      },
      slug: "js-read-inputs-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Strings",
      },
      slug: "js-strings",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Strings Questions",
      },
      slug: "js-strings-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`.then()`/`.catch()`",
      },
      slug: "js-then-catch",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`.then()`/`.catch()` Questions",
      },
      slug: "js-then-catch-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JSON",
      },
      slug: "json",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JSON Questions",
      },
      slug: "json-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Pokemon Library Exercise",
      },
      slug: "pokemon-library-exercise",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Production Website Exercise",
      },
      slug: "production-website-exercise",
      children: [],
      isRequired: true,
    },
    {
      type: "topic",
      label: {
        full: "Asynchronus Programming",
        short: "Async Programming",
      },
      slug: "programming-async",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Query Strings",
      },
      slug: "query-strings",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Query Strings Questions",
      },
      slug: "query-strings-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Star Wars Library Group Exercise",
      },
      slug: "star-wars-library-exercise-group",
      children: [],
      isRequired: true,
    },
    {
      type: "exercise",
      label: {
        full: "Underpants Gnomes",
      },
      slug: "underpants-gnomes-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Writing Code Vocab",
      },
      slug: "writing-code-vocab",
      children: [],
      isRequired: true,
    },
    {
      type: "section",
      label: {
        full: "Learn Your Tools",
      },
      slug: "habits-learn-your-tools",
      children: [
        "touch-typing",
        "browser-shortcuts",
        "window-management-shortcuts",
        "vs-code-shortcuts",
      ],
    },
    {
      type: "topic",
      label: {
        full: "Touch Typing",
      },
      slug: "touch-typing",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Browser Shortcuts",
      },
      slug: "browser-shortcuts",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Work Together",
      },
      slug: "habits-work-together",
      children: ["pair-programming"],
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
      type: "topic",
      label: {
        full: "CSS: Images",
      },
      slug: "css-images",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Window Management Shortcuts",
      },
      slug: "window-management-shortcuts",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "How To Ask Questions",
      },
      slug: "how-to-ask-questions",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "VS Code Shortcuts",
      },
      slug: "vs-code-shortcuts",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Updating From An Upstream Repo",
      },
      slug: "git-updating-from-upstream",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Running JavaScript Code",
      },
      slug: "js-running-code",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Running Node Projects",
      },
      slug: "js-running-node-projects",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Trees Questions",
      },
      slug: "data-structures-trees-questions",
      children: [],
    },
    {
      type: "concept",
      label: {
        full: "Programming Concepts",
      },
      slug: "js-programming-concepts-review",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Programming Concepts",
      },
      slug: "section-javascript-2",
      children: [
        "js-procedural-programming",
        "js-procedural-programming-questions",
        "js-modern-style",
        "js-modern-style-exercises",
        "js-spread-exercises",
        "js-function-syntax-exercises",
        "js-short-circuit-exercises",
        "js-modules",
        "js-modules-exercises",
        "node-intro",
        "node-intro-questions",
        "npm",
        "npm-questions",
        "js-modules-browser",
        "js-modules-browser-exercise",
        "modern-javascript-refactoring-exercise",
        "js-vocabulary-2",
      ],
    },
    {
      type: "topic",
      label: {
        full: "Procedural Programming in JavaScript",
      },
      slug: "js-procedural-programming",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Procedural Programming Questions",
      },
      slug: "js-procedural-programming-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Modern JavaScript Style",
      },
      slug: "js-modern-style",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Modern JavaScript Style Exercises",
      },
      slug: "js-modern-style-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Spread Exercises",
      },
      slug: "js-spread-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Function Syntax Exercises",
      },
      slug: "js-function-syntax-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Short Circuit Exercises",
      },
      slug: "js-short-circuit-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Modules",
      },
      slug: "js-modules",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Modules Exercises",
      },
      slug: "js-modules-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Node",
      },
      slug: "node-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Node Questions",
      },
      slug: "node-intro-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "npm",
      },
      slug: "npm",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "npm Questions",
      },
      slug: "npm-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Modules in the Browser",
      },
      slug: "js-modules-browser",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "JavaScript Modules in the Browser Exercises",
      },
      slug: "js-modules-browser-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Modern JavaScript Refactoring Exercise",
      },
      slug: "modern-javascript-refactoring-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Intermediate JavaScript Vocabulary",
      },
      slug: "js-vocabulary-2",
      isRequired: true,
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Habits of Excellence: Work Small",
        short: "Work Small",
      },
      slug: "habits-work-small",
      children: ["agile-user-stories"],
    },
    {
      type: "section",
      label: {
        full: "Habits of Excellence: Clean Your Workspace",
        short: "Clean Your Workspace",
      },
      slug: "habits-clean-workspace",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "User Stories",
      },
      slug: "agile-user-stories",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Problem Analysis",
      },
      slug: "problem-analysis-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Understanding the Problem",
      },
      slug: "polya-understanding-the-problem",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Understanding the Problem Questions",
      },
      slug: "polya-understanding-the-problem-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Parts of the Problem Exercises",
      },
      slug: "parts-of-the-problem-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Unsolvable Problems Exercises",
      },
      slug: "unsolvable-problems-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Problem Visualization Exercises",
      },
      slug: "problem-visualization-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Problem Sequence Exercises",
      },
      slug: "problem-sequence-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Veracity Exercises",
      },
      slug: "veracity-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Enumerating Solutions",
      },
      slug: "polya-enumerating-solutions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Enumerating Solutions Questions",
      },
      slug: "polya-enumerating-solutions-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Solution Visualization Exercises",
      },
      slug: "solution-visualization-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Problem Simplification Exercises",
      },
      slug: "problem-simplification-exercises",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Solution Enumeration Exercises",
      },
      slug: "solution-enumeration-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Work the Problem",
      },
      slug: "polya-work-the-problem",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Pseudocode",
      },
      slug: "pseudocode",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Pseudocode Exercises",
      },
      slug: "pseudocode-exercises",
      isRequired: true,
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Reflect",
      },
      slug: "polya-reflect",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Reflect Questions",
      },
      slug: "polya-reflect-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Spot the Error",
      },
      slug: "spot-the-error-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Store Inventory Manager Exercise",
      },
      slug: "store-inventory-manager-exercise",
      isRequired: true,
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Problem Solving Vocabulary",
      },
      slug: "problem-solving-vocabulary",
      isRequired: true,
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Testing",
      },
      slug: "testing-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Testing Questions",
      },
      slug: "testing-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Test Hater's Advocate",
      },
      slug: "test-haters-advocate",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Jest",
      },
      slug: "jest-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Jest Questions",
      },
      slug: "testing-jest-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Jest Setup: Build & Burn",
      },
      slug: "jest-setup-build-and-burn",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Simple Testing with Jest",
      },
      slug: "simple-testing-jest",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Simple Testing with Jest Questions",
      },
      slug: "simple-testing-jest-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Jest Matchers",
      },
      slug: "jest-matchers",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Jest Matchers Questions",
      },
      slug: "jest-matchers-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Jest Matchers Exercises",
      },
      slug: "jest-matchers-exercises",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Test Naming",
      },
      slug: "test-naming",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Test Naming Questions",
      },
      slug: "test-naming-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Factorial Test Naming Exercise",
      },
      slug: "test-naming-exercise-factorial",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Test Organization",
      },
      slug: "test-organization",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Test Organization Questions",
      },
      slug: "test-organization-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Jest Spies",
      },
      slug: "jest-spies",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Jest Spies Questions",
      },
      slug: "jest-spies-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Test Spy Practice",
      },
      slug: "test-spy-practice",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Equivalence Partitioning",
      },
      slug: "equivalence-partitioning",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Equivalence Partitioning Questions",
      },
      slug: "equivalence-partitioning-questions",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Using Jest in the Browser",
      },
      slug: "guide-jest-browser-js",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Simple Unit Testing Exercise",
      },
      slug: "simple-unit-testing-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Testing Vocabulary",
      },
      slug: "testing-jest-vocabulary-1",
      isRequired: true,
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to TypeScript",
      },
      slug: "ts-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript Questions",
      },
      slug: "ts-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Configuring TypeScript",
      },
      slug: "ts-configuration",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript Configuration Questions",
      },
      slug: "ts-configuration-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Basic TypeScript Types",
      },
      slug: "ts-basic-types",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Basic TypeScript Types Questions",
      },
      slug: "ts-types-questions-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "TypeScript Functions",
      },
      slug: "ts-functions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript Functions Questions",
      },
      slug: "ts-functions-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "TypeScript Object Types",
      },
      slug: "ts-object-types",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript Object Types Questions",
      },
      slug: "ts-object-types-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "TypeScript DOM",
      },
      slug: "ts-dom",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript DOM Questions",
      },
      slug: "ts-dom-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Pokemon Library (TS Edition)",
      },
      slug: "pokemon-library-exercise-2",
      isRequired: true,
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "TypeScript Vocabulary",
      },
      slug: "ts-vocabulary-1",
      isRequired: true,
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide to Using Jest TypeScript",
      },
      slug: "ts-jest",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Automate",
      },
      slug: "habits-automate",
      children: ["linting", "eslint"],
    },
    {
      type: "topic",
      label: {
        full: "Linting",
      },
      slug: "linting",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "ESLint",
      },
      slug: "eslint",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Object-Oriented Programming with TypeScript",
        short: "OOP",
      },
      slug: "section-oop",
      children: [
        "oop-intro",
        "oop-questions",
        "js-classes",
        "js-classes-questions",
        "ts-classes",
        "triangle-exercise-ts",
        "robot-name-ts",
        "dnd-character-ts",
        "ts-decorators",
        "oop-vocabulary",
      ],
    },
    {
      type: "topic",
      label: {
        full: "Intro to OOP",
      },
      slug: "oop-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "OOP Questions",
      },
      slug: "oop-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "JavaScript Classes",
      },
      slug: "js-classes",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "JavaScript Classes Questions",
      },
      slug: "js-classes-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "TypeScript Classes",
      },
      slug: "ts-classes",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Triangle",
      },
      slug: "triangle-exercise-ts",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Robot Name",
      },
      slug: "robot-name-ts",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Dungeons and Dragons Characters",
        short: "DnD Characters",
      },
      slug: "dnd-character-ts",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "TypeScript Decorators",
      },
      slug: "ts-decorators",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "OOP Vocabulary",
      },
      slug: "oop-vocabulary",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Angular",
      },
      slug: "angular-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Getting Started With Angular",
      },
      slug: "angular-getting-started",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Tutorial",
      },
      slug: "angular-tutorial",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Templates",
      },
      slug: "angular-templates",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Template Questions",
      },
      slug: "angular-templates-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Components",
      },
      slug: "angular-components",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Components Questions",
      },
      slug: "angular-components-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Forms",
      },
      slug: "angular-forms",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Deployment SPA Angular",
      },
      slug: "deployment-spa-netlify",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Naming Conventions in Angular",
      },
      slug: "naming-conventions-angular",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Wineflix",
      },
      slug: "wineflix-ng",
      isRequired: true,
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Vocabulary",
      },
      slug: "angular-vocabulary-1",
      isRequired: true,
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Form Tutorial",
      },
      slug: "angular-tutorial-forms",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Event Emitters",
      },
      slug: "angular-event-emitters",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Light Switch",
      },
      slug: "light-switch-exercise-ng",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Dependency Injection",
      },
      slug: "angular-dependency-injection",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Services",
      },
      slug: "angular-services",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular API Integration",
      },
      slug: "angular-api-integration",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular HTTP Guide",
      },
      slug: "angular-http-guide-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to SPA Routing",
      },
      slug: "spa-routing-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Angular Routing",
      },
      slug: "angular-router",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Angular Router Tutorial",
      },
      slug: "angular-router-tutorial",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Angular Vocabulary",
      },
      slug: "angular-vocabulary-2",
      isRequired: true,
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Sika Shoes",
      },
      isRequired: true,
      slug: "sika-shoes-ng",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Java",
      },
      slug: "java-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Syntax",
      },
      slug: "java-syntax",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Hello World",
      },
      slug: "java-hello-world-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java: Basic Types",
      },
      slug: "java-basic-types",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Java Variable Practice",
      },
      slug: "java-variable-practice-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Java Math Practice",
      },
      slug: "java-math-practice-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java: Flow Control",
      },
      slug: "java-flow-control",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Java Looping",
      },
      slug: "java-looping-practice-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Rental Car Estimator",
      },
      slug: "rental-car-estimator-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Arrays",
      },
      slug: "java-arrays",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Calculate Averages",
      },
      slug: "java-calculate-averages-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Classes",
      },
      slug: "java-classes",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "List Technologies",
      },
      slug: "java-list-technologies-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Dice Roll",
      },
      slug: "java-dice-roll-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Packages",
      },
      slug: "java-packages",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Collections",
      },
      slug: "java-collections",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java `ArrayList`s",
      },
      slug: "java-arraylist",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java `HashMap`s",
      },
      slug: "java-hashmap",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Java Lambdas",
      },
      slug: "java-lambdas",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Java Basics",
      },
      isRequired: true,
      slug: "java-basics-quiz",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Java Dealership",
      },
      slug: "java-dealership-exercise",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Fill In The Blank",
      },
      slug: "java-fill-in-the-blank",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Java Vocabulary",
      },
      isRequired: true,
      slug: "java-vocabulary-1",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "SQL Vocabulary",
      },
      isRequired: true,
      slug: "sql-vocabulary-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Database",
      },
      slug: "databases-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Database Questions",
      },
      slug: "database-questions-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to SQL",
      },
      slug: "sql-intro",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "SQL Questions",
      },
      slug: "sql-questions-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`psql`",
      },
      slug: "postgres-psql",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "`psql` Questions",
      },
      slug: "psql-questions",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "SQL: Hair and Eye Color",
      },
      slug: "sql-hair-and-eye-color",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "SQL Select",
      },
      slug: "sql-select",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Zoo: `SELECT` Quiz",
      },
      slug: "sql-zoo-select-quiz",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "SQL `WHERE`",
      },
      slug: "sql-where",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Zoo: BBC Quiz",
      },
      slug: "sql-zoo-bbc-quiz",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Zoo: Nobel Quiz",
      },
      slug: "sql-zoo-nobel-quiz",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Card Game",
      },
      slug: "sql-card-game",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "SQL Inner Joins",
      },
      slug: "sql-inner-joins",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "SQL Left Joins",
      },
      slug: "sql-left-joins",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "SQL Joins Questions",
      },
      slug: "sql-joins-questions",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Join Quiz",
      },
      slug: "sql-join-quiz",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "SQL Full Quiz",
      },
      isRequired: true,
      slug: "sql-full-quiz",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Capstone Requirements",
      },
      slug: "capstone-requirements-simple",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Capstone Ideas",
      },
      slug: "capstone-ideas",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Capstone Presentations",
      },
      slug: "capstone-presentations",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Capstones",
      },
      isRequired: true,
      slug: "full-stack-capstone-exercise",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "REST",
      },
      slug: "http-rest",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Spring Boot",
      },
      slug: "spring-boot-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot CLI",
      },
      slug: "spring-boot-cli",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Basics",
      },
      slug: "spring-boot-basics",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Spring Boot Basics Exercise",
      },
      slug: "spring-boot-basics-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Spring Boot Basics Questions",
      },
      slug: "spring-boot-basics-questions",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Models",
      },
      slug: "spring-boot-models",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Repositories",
      },
      slug: "spring-boot-repositories",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Services",
      },
      slug: "spring-boot-services",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Controllers",
      },
      slug: "spring-boot-controllers",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Environment Variables",
      },
      slug: "environment-variables",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "`dotenv`",
      },
      slug: "environment-variables-dotenv-java",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Cloud Deployment With Heroku",
      },
      slug: "cloud-deployment-heroku",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Spring Boot Deployment",
      },
      slug: "spring-boot-deployment",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Spring Boot Deployment Exercise",
      },
      slug: "spring-boot-deployment-exercise",
      children: [],
    },
    {
      type: "guide",
      label: {
        full: "Guide To Building Simple APIs With Spring Boot",
      },
      slug: "spring-boot-guide-to-simple-apis",
      children: [],
    },
    {
      type: "exercise",
      label: {
        full: "Pokemon API",
      },
      isRequired: true,
      slug: "pokemon-api-exercise",
      children: [],
    },
    {
      type: "questions",
      label: {
        full: "Spring Boot Vocabulary",
      },
      isRequired: true,
      slug: "spring-boot-vocab",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to Cloud Deployment",
      },
      slug: "cloud-deployment-intro",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Installing PostgreSQL",
      },
      slug: "postgres-installation",
      children: [],
    },
  ],
};

export default program;
