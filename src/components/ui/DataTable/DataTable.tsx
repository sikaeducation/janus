import "./DataTable.scss";
import { pluck } from "lodash/fp";
import useWindowSize from "../../../hooks/use-window-size";

type Field = {
  header: string;
  key: string;
  proportion:
    | string
    | {
        small?: string;
        large: string;
      };
};

type Props<RowType> = {
  fields: Field[];
  tableData: RowType[];
};

export default function DataTable<
  RowType extends { id: string; [key: string]: unknown }
>({ tableData, fields }: Props<RowType>) {
  const size = useWindowSize();
  const normalizedFields =
    size.breakpoint === "small" ? fields.filter(hasSmallProportion) : fields;
  const proportions = normalizedFields.map(getProportion(size));
  const headers = pluck("header")(normalizedFields);
  const columnWidths = proportions.join(" ");

  return (
    <div className="DataTable" role="grid">
      {headers.length ? (
        <div
          role="row"
          style={{ gridTemplateColumns: columnWidths }}
          className="table-row table-headers"
        >
          {headers.map((header) => (
            <span key={header} className="table-header" role="cell">
              {header}
            </span>
          ))}
        </div>
      ) : null}

      {tableData.length > 0
        ? tableData.map((row) => (
            <div
              key={row.id}
              role="row"
              style={{ gridTemplateColumns: columnWidths }}
              className="table-row"
            >
              {normalizedFields.length
                ? normalizedFields.map(({ key }) => (
                    <span
                      title={String(row[key])}
                      className="field"
                      key={key}
                      role="cell"
                    >
                      {row[key || ""] ? row[key] : null}
                    </span>
                  ))
                : null}
            </div>
          ))
        : null}
    </div>
  );
}

function hasSmallProportion(field: Field) {
  return typeof field.proportion === "number" || !!field.proportion.small;
}

function getProportion(size: ReturnType<typeof useWindowSize>) {
  return (field: Field) => {
    return typeof field.proportion === "string"
      ? field.proportion
      : field.proportion[size.breakpoint || "large"];
  };
}
