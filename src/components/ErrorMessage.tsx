type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <div className="alert error">
      <p>{message}</p>
    </div>
  );
}
