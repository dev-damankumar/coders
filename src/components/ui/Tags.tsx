import If from '../hoc/If';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className='tags'>
      {tags?.map((tag, i) => (
        <If key={`tag_${i}`} cond={!!tag}>
          <div className='tag'>{tag}</div>
        </If>
      ))}
    </div>
  );
};

export default Tags;
