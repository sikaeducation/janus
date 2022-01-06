import { data, getCurrentActivity } from "../data";

function makeCrumb(id: number, label: string, url: string) {
  return { id, label, url };
}

function getCrumbs(current: current) {
  const { unit, section, activity } = current;
  const parts = [unit, section, activity].filter((part) => part.slug);
  const slugs = parts.map((crumb) => crumb.slug);
  const paths = slugs
    .reverse()
    .map((slug, index) => {
      const otherSlugs = slugs.slice(index + 1);
      const path = otherSlugs.join("/");
      return `${path}/${slug}`;
    })
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
  const { program } = data;
  const slugs = getSlugs(pathname);
  const currentActivity = getCurrentActivity(
    program,
    slugs.unit,
    slugs.section,
    slugs.activity
  );
  const currentCrumbs = getCrumbs(currentActivity);

  return {
    crumbs: currentCrumbs,
    content: currentActivity.content,
  };
}
