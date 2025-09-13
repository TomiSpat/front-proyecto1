type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string | number;
  step?: string | number;
};

export default function NumberInput({ label, value, onChange, min, step }: Props) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        min={min as number | undefined}
        step={step as number | undefined}
      />
    </div>
  );
}
