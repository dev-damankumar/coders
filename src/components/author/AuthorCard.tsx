import img from '../../assets/images/profile.svg';
import Image from '../ui/Image';
import classes from './index.module.css';

type AuthorCardProps = {
  name: string;
  src: string;
  isOwner: boolean;
  id: string;
};
const AuthorCard = ({ name, src, isOwner, id }: AuthorCardProps) => {
  if (isOwner) {
    name = 'You';
  }
  return (
    <a
      href={`/profile/${!isOwner ? id : ''}`}
      target='_blank'
      data-table-tooltip='true'
      className={`${classes.authorWrap} ${isOwner ? classes.authorSelf : ''}`}
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
