export default function getLines(data: string) {
  const lines = data.split('\n');
  const spans = [];
  const count = lines.length > 1 ? lines.length : 1;
  for (let i = 0; i < count; i++) {
    const span = <span key={i}></span>;
    spans.push(span);
  }
  const linerows = <div className={'line-numbers'}>{spans}</div>;

  return linerows;
}
