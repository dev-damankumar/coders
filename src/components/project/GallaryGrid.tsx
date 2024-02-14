import Image from '../ui/Image';

const GallaryGrid = ({ images }: { images: string[] }) => {
  return (
    <div className='gallery-grid'>
      {images?.map((image: string, i: number) => (
        <div className='gallery-item' key={`image_${i}`}>
          <Image alt={image} src={image} className='rounded-image thumbnail' />
        </div>
      ))}
    </div>
  );
};

export default GallaryGrid;
