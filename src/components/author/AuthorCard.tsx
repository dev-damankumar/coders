import img from '../../assets/images/profile.svg';
import Image from '../ui/Image';
import classes from './index.module.css';

type AuthorCardProps = {
  name: string;
  src: string;
  isAuthor: boolean;
  id: string;
};
const AuthorCard = ({ name, src, isAuthor, id }: AuthorCardProps) => {
  console.log('name', name);
  if (isAuthor) {
    name = 'You';
  }
  return (
    <a
      href={`/profile/${!isAuthor ? id : ''}`}
      target='_blank'
      data-table-tooltip='true'
      className={`${classes.authorWrap} ${isAuthor ? classes.authorSelf : ''}`}
    >
      <Image className={classes.authorImg} src={src + 'g'} defaultImg={img} />
      <p className={classes.authorName}>
        <span className='tooltip tooltip-up'>{name || 'anonymous'}</span>
        {name || 'anonymous'}
      </p>
    </a>
  );
};

export default AuthorCard;
