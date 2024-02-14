import { joinURL } from '../../../utils';
import classes from './TableRowSkelton.module.css';

const TableRowSkelton = (props: { rows?: number; cols?: number }) => {
  const rows = Array.from(Array(props.rows || 4).keys());
  const cols = Array.from(Array(props.cols || 4).keys());
  return (
    <>
      {rows.map((row, i) => {
        return (
          <tr key={`${row}_${i}`}>
            {cols.map((col, i) => {
              return (
                <td key={`${col}_${i}`}>
                  <div
                    className={joinURL('loading', classes['field-loader'])}
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
