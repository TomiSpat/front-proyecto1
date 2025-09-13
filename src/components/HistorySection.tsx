import { useMemo, useState } from "react";
import type { ImcRecord } from "../types/imc";
import HistoryFilter from "./HistoryFilter";
import HistoryTable from "./HistoryTable";

type Props = {
  records: ImcRecord[];
};

export default function HistorySection({ records }: Props) {
  const [range, setRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  const filtered = useMemo(() => {
    if (!range.from && !range.to) return records;
    const fromDate = range.from ? new Date(range.from) : null;
    const toDate = range.to ? new Date(range.to) : null;
    // Ensure end of day for 'to'
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }
    return records.filter((r) => {
      const d = new Date(r.fecha);
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return true;
    });
  }, [records, range]);

  return (
    <section className="card">
      <h2 className="section-title text-center">Historial</h2>
      <HistoryFilter from={range.from} to={range.to} onChange={setRange} />
      <HistoryTable records={filtered} />
    </section>
  );
}
