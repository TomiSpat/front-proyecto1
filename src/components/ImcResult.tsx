import type { ImcResult as ImcResultType } from "../types/imc";

type Props = {
  result: ImcResultType | null;
};

export default function ImcResult({ result }: Props) {
  if (!result) return null;
  return (
    <div className="result-box text-center">
      <p className="imc-value text-4xl font-bold text-green-600 mb-2">
        IMC: {result.imc.toFixed(2)}
      </p>
      <span className="imc-category inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
        Categoria: {result.categoria}
      </span>
    </div>
  );
}
