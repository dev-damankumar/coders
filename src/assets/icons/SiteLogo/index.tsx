import { NavLink, NavLinkProps, To } from 'react-router-dom';
import logo from '../../images/logos/logo.svg';
import classes from './index.module.css';

type SiteLogoProps = Omit<NavLinkProps, 'to'> & {
  compact?: boolean;
  to?: To;
};

const SiteLogo: React.FC<SiteLogoProps> = ({
  className,
  to = '/',
  compact,
  ...rest
}) => {
  return (
    <NavLink
      {...rest}
      className={`${classes.logo} ${classes.dark} ${className}`}
      to={to}
    >
      <img width={30} height={30} src={logo} />
      {!compact && <p>Coders</p>}
    </NavLink>
  );
};

export default SiteLogo;
