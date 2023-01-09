import "./DataTable.scss";
import { pluck } from "lodash/fp";
import { KeyboardEvent } from "react";
import classNames from "classnames";
import useWindowSize, { Size } from "../../../hooks/use-window-size";

export type Field = {
  header: string;
  key: string;
  proportion:
    | string
    | {
        small?: string;
        large: string;
      };
  action?: (id?: string) => void;
};

type Props<RowType> = {
  fields: Field[];
  tableData: RowType[];
  activeId?: string;
};

export default function DataTable<
  RowType extends { id: string; [key: string]: unknown }
>({ tableData, fields, activeId }: Props<RowType>) {
  const size = useWindowSize();
  const normalizedFields = normalizeFields(size, fields);
  const proportions = normalizedFields.map(getProportion(size));
  const headers = pluck("header")(normalizedFields);
  const columnWidths = proportions.join(" ");
  const handleKey =
    (action?: (id?: string) => void, id?: string) =>
    (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.code === "Enter" && action) {
        action(id);
      }
    };

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
              className={classNames({
                "table-row": true,
                active: row.id === activeId,
              })}
            >
              {normalizedFields.length
                ? normalizedFields.map(({ key, title, action }) => (
                    <span
                      onClick={() => action && action(row.id)}
                      onKeyDown={(event) =>
                        action && handleKey(action, row.id)(event)
                      }
                      title={title}
                      className="field"
                      key={key}
                      tabIndex={0}
                      role="gridcell"
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

function normalizeFields(size: Size, fields: Field[]) {
  return (
    size.breakpoint === "small" ? fields.filter(hasSmallProportion) : fields
  ).map((field) => ({
    ...field,
    title: typeof field.key === "string" ? field.key : "icon",
  }));
}
