type Props = {
  from: string;
  to: string;
  onChange: (next: { from: string; to: string }) => void;
};

export default function HistoryFilter({ from, to, onChange }: Props) {
  return (
    <div className="filter">
      <label className="label">
        Desde
        <input
          className="input"
          type="date"
          value={from}
          onChange={(e) => onChange({ from: e.target.value, to })}
        />
      </label>
      <label className="label">
        Hasta
        <input
          className="input"
          type="date"
          value={to}
          onChange={(e) => onChange({ from, to: e.target.value })}
        />
      </label>
    </div>
  );
}
