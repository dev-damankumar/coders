import img from '../../assets/images/profile.svg';
import Image from '../Image/Image';

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
  console.log('id', id);
  return (
    <a
      href={`/profile/${!isOwner ? id : ''}`}
      target='_blank'
      data-table-tooltip='true'
      className={`author-wrap ${isOwner ? 'author-self' : ''}`}
    >
      <Image className='author-img' src={src + 'g'} defaultImg={img} />
      <p className='author-name'>
        <span className='x-tooltip x-tooltip-up'>{name || 'anonymous'}</span>
        {name || 'anonymous'}
      </p>
    </a>
  );
};

export default AuthorCard;
