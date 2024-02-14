import { baseURL } from '../../constants';
import { joinURL } from '../../utils';

const GallaryGrid = ({ images }: { images: string[] }) => {
  return (
    <div className='gallery-grid'>
      {images?.map((image: string, i: number) => (
        <div className='gallery-item' key={`image_${i}`}>
          <img
            alt={image}
            src={joinURL(baseURL, image)}
            className='rounded-image thumbnail'
          />
        </div>
      ))}
    </div>
  );
};

export default GallaryGrid;
