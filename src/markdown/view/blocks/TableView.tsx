import React, { useCallback } from "react";
import { TableGroup } from "../../common/types";

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
      <tr>
        {normalizeArr(props.headers).map((header, index) => (
          <th key={index} style={{ border: "1px solid #dddddd" }}>
            {header}
          </th>
        ))}
      </tr>
      {props.rows.map((cells, index) => (
        <tr key={index}>
          {normalizeArr(cells).map((cell, index) => (
            <td key={index} style={{ border: "1px solid #dddddd" }}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export { TableView };
