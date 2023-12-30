export default function getLines(data: string) {
  let lines = data.split("\n");
  let spans = [];
  let count = lines.length > 1 ? lines.length : 1;
  for (let i = 0; i < count; i++) {
    let span = <span key={i}></span>;
    spans.push(span);
  }
  let linerows = <div className={"line-numbers"}>{spans}</div>;

  return linerows;
}
