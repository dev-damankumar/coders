import classes from "./TableRowSkelton.module.css";

const TableRowSkelton = (props: { rows?: number; cols?: number }) => {
  let rows = Array.from(Array(props.rows || 4).keys());
  let cols = Array.from(Array(props.cols || 4).keys());
  return (
    <>
      {rows.map((row, i) => {
        return (
          <tr key={`${row}_${i}`}>
            {cols.map((col, i) => {
              return (
                <td key={`${col}_${i}`}>
                  <div
                    className={["loading", classes["field-loader"]].join(" ")}
                  ></div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default TableRowSkelton;
