import "./Table.scss";

export default function Table({ items }) {
  const keys = Object.keys(items[0]);
  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr>
            {keys.map((column) => (
              <td key={row[column]}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
