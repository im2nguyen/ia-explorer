interface MarkdownInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownInput = ({ value, onChange }: MarkdownInputProps) => (
  <textarea
    className="w-full h-full p-4 font-mono text-sm border border-gray-300 rounded-md"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default MarkdownInput;