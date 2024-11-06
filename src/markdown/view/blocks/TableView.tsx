import React, { useCallback, useRef } from "react";
import { TableGroup } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const getAlignmentStyle = (alignment: 'left' | 'center' | 'right' | 'none') => {
  switch (alignment) {
    case 'center': return { textAlign: 'center' as const };
    case 'right': return { textAlign: 'right' as const };
    case 'left': return { textAlign: 'left' as const };
    default: return {};
  }
};

const TableCell: React.FC<{ 
  cell: string; 
  alignment: 'left' | 'center' | 'right' | 'none' 
}> = ({ cell, alignment }) => {
  const ref = useRef<HTMLTableDataCellElement>(null);

  useParseBlockContent(ref, cell);

  return (
    <td 
      ref={ref} 
      style={{ 
        border: "1px solid #dddddd",
        padding: "8px",
        ...getAlignmentStyle(alignment)
      }}
    >
      {cell}
    </td>
  );
};

const TableView: React.FC<TableGroup> = ({ headers, alignments, rows }) => {
  const maxColumns = Math.max(
    headers.length,
    ...rows.map((cells) => cells.length)
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
    <table style={{ 
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "1rem"
    }}>
      <thead>
        <tr>
          {normalizeArr(headers).map((header, index) => (
            <th 
              key={index}
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                backgroundColor: "#f8f9fa",
                ...getAlignmentStyle(alignments[index] || 'none')
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, rowIndex) => (
          <tr key={rowIndex}>
            {normalizeArr(cells).map((cell, cellIndex) => (
              <TableCell 
                key={cellIndex} 
                cell={cell}
                alignment={alignments[cellIndex] || 'none'}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TableView };
