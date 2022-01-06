/* eslint @typescript-eslint/no-shadow: "off" */
import data from "../data";

function getCurrentActivity(
  program: program,
  unitSlug: string,
  sectionSlug = "",
  activitySlug = ""
) {
  const current = {
    unit: {
      slug: unitSlug,
      label: "",
    },
    section: {
      slug: sectionSlug,
      label: "",
    },
    activity: {
      slug: activitySlug,
      label: "",
    },
    content: "",
  };
  const unit = program.units.find((unit) => unit.slug === unitSlug);
  if (!unit) return current;
  current.unit = {
    slug: unit.slug,
    label: unit.short_label,
  };
  if (!sectionSlug) {
    return {
      ...current,
      content: unit.table_of_contents,
    };
  }
  const section = unit.sections.find((section) => section.slug === sectionSlug);
  if (!section) return current;

  current.section = {
    slug: section.slug,
    label: section.short_label,
  };
  if (!activitySlug && section) {
    return {
      ...current,
      content: section.table_of_contents,
    };
  }
  const currentActivity = section.activities.find(
    (activity) => activity.slug === activitySlug
  );
  if (!currentActivity) return current;

  current.activity = {
    slug: currentActivity.slug,
    label: currentActivity.short_label,
  };
  return {
    ...current,
    content: currentActivity.content,
  };
}

function makeCrumb(id: number, label: string, url: string) {
  return { id, label, url };
}

function slugToPath(slug: string, index: number, originalSlugs: string[]) {
  const path = originalSlugs
    .slice(index + 1)
    .reverse()
    .join("/");
  return `${path}/${slug}`;
}

function getCrumbs({ unit, section, activity }: current) {
  const parts = [unit, section, activity].filter((part) => part.slug);
  const paths = parts
    .map((crumb) => crumb.slug)
    .reverse()
    .map(slugToPath)
    .reverse();

  const crumbs: crumb[] = [];
  return parts.reduce((previousCrumbs, crumb, index) => {
    return [...previousCrumbs, makeCrumb(index, crumb.label, paths[index])];
  }, crumbs);
}

function getSlugs(path: string) {
  const normalizedPath = path.substring(1);
  const segments = normalizedPath.split("/");
  return {
    unit: segments[0] || "",
    section: segments[1] || "",
    activity: segments[2] || "",
  };
}

export default function currentContent(pathname: string) {
  const { program } = data; // Fetch or get from localStorage
  const { unit, section, activity } = getSlugs(pathname);
  const currentActivity = getCurrentActivity(program, unit, section, activity);
  const currentCrumbs = getCrumbs(currentActivity);

  return {
    crumbs: currentCrumbs,
    content: currentActivity.content,
  };
}
