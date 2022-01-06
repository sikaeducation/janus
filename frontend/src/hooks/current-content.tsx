/* eslint @typescript-eslint/no-shadow: "off" */
import data from "../data";

function locate<T extends { slug: string }>(collection: T[], slug: string) {
  return collection.find((item) => item.slug === slug);
}

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
  const unit = locate<unit>(program.units, unitSlug);
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
  const section = locate<section>(unit.sections, sectionSlug);
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
  const activity = locate<activity>(section.activities, activitySlug);
  if (!activity) return current;

  current.activity = {
    slug: activity.slug,
    label: activity.short_label,
  };
  return {
    ...current,
    content: activity.content,
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
