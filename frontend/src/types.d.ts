type activity = {
  id: number;
  type: string;
  full_label: string;
  short_label: string;
  slug: string;
  section_id: number;
  unit_id: number;
  content: string;
  next?: {
    slug: string;
    label: string;
  };
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
type current = {
  unit: {
    label: string;
    slug: string;
  };
  section: {
    label: string;
    slug: string;
  };
  activity: {
    label: string;
    slug: string;
  };
  content: string;
  next?: {
    label: string;
    slug: string;
  };
};
type crumb = {
  id: number;
  url: string;
  label: string;
};
