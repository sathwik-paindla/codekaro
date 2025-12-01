
export default function CodeEditor({ code, setCode, language }) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full h-96 font-mono text-sm p-3 border rounded bg-gray-800 text-white"
      spellCheck="false"
    />
  );
}
