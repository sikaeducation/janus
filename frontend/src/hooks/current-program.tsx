import data from "../data";

function getUnitLinks(units: unit[]) {
  return units.map((unit) => ({
    id: unit.id,
    label: unit.tiny_label,
    url: `/${unit.slug}`,
  }));
}

export default function currentContent() {
  const { program } = data; // Fetch or read from localStorage
  const unitLinks = getUnitLinks(program.units);

  return {
    program,
    unitLinks,
  };
}