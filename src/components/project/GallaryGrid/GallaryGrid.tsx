import Image from '../../ui/Image';
import classes from './GallaryGrid.module.css';
const GallaryGrid = ({ images }: { images: string[] }) => {
  console.log('images.length', images);
  if (images.length <= 0) return;
  return (
    <div className={classes['gallery-grid']}>
      {images?.map((image: string, i: number) => (
        <div className={classes['gallery-item']} key={`image_${i}`}>
          <Image alt={image} src={image} className='rounded-image thumbnail' />
        </div>
      ))}
    </div>
  );
};

export default GallaryGrid;
