import { data, getCurrentActivity, getSlugs } from "../data";

export function getCrumbs(current: current) {
  const crumbs = [];
  if (current.unit.slug) {
    crumbs.push({
      id: 1,
      label: current.unit.label,
      url: current.unit.slug,
    });
  }
  if (current.section.slug) {
    crumbs.push({
      id: 2,
      label: current.section.label,
      url: `${current.unit.slug}/${current.section.slug}`,
    });
  }
  if (current.activity.slug) {
    crumbs.push({
      id: 3,
      label: current.activity.label,
      url: `${current.unit.slug}/${current.section.slug}/${current.activity.slug}`,
    });
  }

  return crumbs;
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
