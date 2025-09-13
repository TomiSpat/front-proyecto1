import type { ImcRecord } from "../types/imc";

type Props = {
  records: ImcRecord[];
};

export default function HistoryTable({ records }: Props) {
  if (!records.length) {
    return <p>No hay registros aún.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Peso (kg)</th>
            <th>Altura (m)</th>
            <th>IMC</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.fecha).toLocaleString()}</td>
              <td>{r.peso}</td>
              <td>{r.altura}</td>
              <td>{r.imc.toFixed(2)}</td>
              <td>{r.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
