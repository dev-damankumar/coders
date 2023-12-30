import { useAuth } from "../../providers/Auth";

const SocialIcons = () => {
  const auth = useAuth();
  return (
    <div className="social-wrap">
      <p className="mb-hide">Follow me on</p>
      <div className="social-icon-wrap">
        <a
          target="_blank"
          href={auth?.user?.social?.youtube}
          className="youtube"
        >
          <i className="bx bxl-youtube" />
        </a>
        <a
          target="_blank"
          href={auth?.user?.social?.linkedin}
          className="linkedin"
        >
          <i className="bx bxl-linkedin" />
        </a>
        <a
          target="_blank"
          href={auth?.user?.social?.instagram}
          className="instagram"
        >
          <i className="bx bxl-instagram" />
        </a>
        <a
          target="_blank"
          href={auth?.user?.social?.facebook}
          className="facebook"
        >
          <i className="bx bxl-facebook" />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
