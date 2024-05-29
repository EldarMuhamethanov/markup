import React, { useCallback, useRef } from "react";
import { TableGroup } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const TableCell: React.FC<{ cell: string }> = ({ cell }) => {
  const ref = useRef<HTMLTableDataCellElement>(null);

  useParseBlockContent(ref, cell);

  return (
    <td ref={ref} style={{ border: "1px solid #dddddd" }}>
      {cell}
    </td>
  );
};

const TableView: React.FC<TableGroup> = (props) => {
  const maxColumns = Math.max(
    props.headers.length,
    ...props.rows.map((cells) => cells.length)
  );

  const normalizeArr = useCallback(
    (arr: string[]) => {
      const sliced = arr.slice(0, maxColumns);
      while (sliced.length < maxColumns) {
        sliced.push("");
      }
      return sliced;
    },
    [maxColumns]
  );

  return (
    <table style={{ borderSpacing: 0, borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {normalizeArr(props.headers).map((header, index) => (
            <th key={index} style={{ border: "1px solid #dddddd" }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((cells, index) => (
          <tr key={index}>
            {normalizeArr(cells).map((cell, index) => (
              <TableCell key={index} cell={cell} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableView };
