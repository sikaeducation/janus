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
        "setup-accounts",
        "setup-software",
        "sika-stand-up",
        "warmups",
        "project-presentations",
        "habits-of-excellence",
        "sika-surveys",
        "sika-stand-down",
        "feelings-friday",
        "simplified-neuroscience",
        "passive-vs-active-learning",
        "education-myths",
        "dreyfuss-model",
        "zone-of-proximal-development",
        "sika-vocabulary",
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
        "intro-cli-questions",
        "learn-enough-cli",
        "cli-navigation-1",
        "cli-navigation-questions",
        "cli-wineflix-navigation-exercise",
        "cli-file-management-1",
        "cli-file-management-questions",
        "cli-wineflix-file-management-exercise-1",
        "cli-wineflix-file-management-exercise-2",
        "exercise-cli-exercise-1",
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
        "git-commits",
        "git-commits-questions",
        "git-staging",
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
        "network-diagram-exercise",
        "internet-questions-1",
        "web-intro",
        "diagramming-http-request-exercise",
        "web-questions-1",
        "local-file-servers",
        "serve-repo-exercise",
        "local-file-servers-questions",
        "html-intro",
        "html-syntax",
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
        "draw-css-exercise",
        "css-layout-questions",
        "dev-tools-1",
        "design-colors",
        "css-colors",
        "css-colors-questions",
        "guess-the-color-exercise",
        "guide-color-pallettes",
        "guide-selecting-tags",
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
        "html-structure-semantics",
        "css-box-model",
        "html-text-semantics",
        "html-links",
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
      children: [],
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
  ],
};

export default program;
