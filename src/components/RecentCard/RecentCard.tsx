import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

const RecentCard = ({
  imageGrid,
  description,
  tags,
  title,
  url,
  imgSrc,
  image,
  index,
}) => {
  let auth = useAuth();
  return (
    <div className="item">
      <div className="project-box">
        <div className="row">
          <div className="col-lg-7 col-md-6 col-sm-12">
            <div className="image">
              <img
                loading="lazy"
                src={[imgSrc, image].join("/")}
                alt={`slider-img_${index}`}
              />
              <div className="project-overlay" />
            </div>
          </div>
          <div className="col-md-5">
            <div className="content">
              <h6 className="sub-title">
                <a href="#">Best Projects</a>
              </h6>
              <h4>
                <NavLink to={auth?.user ? url : "/login"}>{title}</NavLink>
              </h4>
              <div className="platform">
                {tags.map((tag, tagIndex) => {
                  return (
                    <span className="plat" key={`tag_${tagIndex}`}>
                      # {tag}
                    </span>
                  );
                })}
              </div>
              <p>{description}</p>
              <div className="image-gallery">
                {imageGrid?.map((img, imgIndex) => {
                  if (imgIndex < 2) {
                    return (
                      <img
                        loading="lazy"
                        alt={imgIndex}
                        key={imgIndex}
                        src={[imgSrc, img].join("/")}
                      />
                    );
                  }
                })}
              </div>
              <NavLink
                className="button btn read-more"
                to={auth?.user ? url : "/login"}
              >
                Read More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCard;
