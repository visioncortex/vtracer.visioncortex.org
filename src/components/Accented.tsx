/** A heading whose middle part takes the brand color: [before, accent, after]. */
export default function Accented({ parts: [before, accent, after] }: { parts: [string, string, string] }) {
  return (
    <>
      {before}
      <span className="accent">{accent}</span>
      {after}
    </>
  );
}
