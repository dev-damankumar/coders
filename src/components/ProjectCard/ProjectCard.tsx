import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/images/placeholder.png";
import Switch from "../Form/Switch/Switch";
import Http from "../../hooks/http";
import DropDown, { TypeList } from "../DropDown/DropDown";
import BinIcon from "../../assets/icons/BinIcon";
import LinkIcon from "../../assets/icons/LinkIcon";
import ScriptIcon from "../../assets/icons/ScriptIcon";
import CopyIcon from "../../assets/icons/CopyIcon";
import ImportIcon from "../../assets/icons/ImportIcon";
import PreIcon from "../../assets/icons/PreIcon";
import IfPrimiumUser from "../IfPrimiumUser";
import AuthorCard from "../AuthorCard/AuthorCard";
import { env, loader, toast } from "../../utils";
import If from "../If/If";
import Tags from "../Tags/Tags";
import { useAuth } from "../../providers/Auth";
import { TypeAuthor } from "../Projects/Projects";

export type TypeProjectCard = {
  author: TypeAuthor;
  filterTags: string;
  visibility: boolean;
  description: string;
  tags: string[];
  title: string;
  url: string;
  image: string;
  index: number;
  _id: string;
  hideContext: true;
};

type ExtraProjectsProps = {
  author: TypeAuthor;
  filterTags: string;
  visibility: boolean;
  description: string;
  tags: string[];
  title: string;
  url: string;
  image: string;
  index: number;
  _id: string;
  hideContext: false;
  configHandler: (...args: any[]) => void;
  confirmHandler: (...args: any[]) => void;
  downloadProjectHandler: (...args: any[]) => void;
};
const ProjectCard = ({
  author,
  filterTags,
  hideContext,
  visibility,
  description,
  tags,
  title,
  url,
  image,
  index,
  _id,
  ...props
}: TypeProjectCard | ExtraProjectsProps) => {
  const imgSrc = env["REACT_APP_BASE_URL"];
  let [visible, setVisibility] = useState(visibility);
  let http = Http();
  let auth = useAuth();
  let setProjectPrivacy = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setVisibility(e.target.checked);
    try {
      loader.show();
      let project = await http.post(
        `${env["REACT_APP_BASE_URL"]}/api/set-privacy/${id}`,
        { visibility: e.target.checked },
        { headers: { "Content-Type": "application/json" } }
      );
      loader.hide();
      if (project.type === "error")
        return toast.error(project.message, "Error Occurred");
      if (project.type === "success")
        return toast.success(project.message, "Successfully Updated");
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      console.error(e);
    }
  };
  let projectActions;
  if (!hideContext) {
    projectActions = [
      {
        name: "Make a Copy",
        onClick: () =>
          (props as ExtraProjectsProps).confirmHandler(_id, `clone`),
        icon: <CopyIcon />,
      },
      "divider",
      {
        name: "Get pre-filled link",
        onClick: () => (props as ExtraProjectsProps).configHandler(_id),
        icon: <LinkIcon />,
      },
      {
        name: "ProjectX editor",
        link: `/x-studio/${_id}`,
        icon: <ScriptIcon />,
      },
      "divider",
      {
        name: "Download",
        onClick: () =>
          (props as ExtraProjectsProps).downloadProjectHandler(_id),
        icon: <ImportIcon />,
      },
      {
        name: "Preferences",
        link: `/admin/edit-project/${_id}`,
        icon: <PreIcon />,
      },
    ];
    if (author?._id === auth?.user?._id) {
      projectActions.splice(1, 0, {
        name: "Move to bin",
        onClick: () =>
          (props as ExtraProjectsProps).confirmHandler(_id, `delete`),
        icon: <BinIcon />,
      });
    }
  }

  let projectCard = (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"
      id={`slider_${index}`}
    >
      <div className="jumbotron project-card">
        <div className="project-img-wrap">
          <img
            loading="lazy"
            src={image ? [imgSrc, image].join("/") : img}
            alt={`slider-img_${index}`}
          />
          <div className="project-overlay" />
        </div>

        <div className="project-details">
          <h3>
            <NavLink to={auth?.user ? url : "/login"}>{title}</NavLink>
          </h3>
          <p>{description.slice(0, 60)}</p>
          <Tags tags={tags} />
        </div>
        <>
          <div className="dropdown-divider" />
          <div className="form-control-footer">
            <AuthorCard
              id={author._id}
              name={author.name}
              src={author.image}
              self={author?._id === auth.user?._id}
            />
            <If cond={!hideContext}>
              <IfPrimiumUser>
                <Switch
                  id={"req" + _id}
                  name="example1"
                  value={visible}
                  checked={visible}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProjectPrivacy(e, _id)
                  }
                />
                <div className="divider-hr" />
                <DropDown
                  menuClass="dropdown-menu-right card-auth-menu"
                  direction="up"
                  list={projectActions as TypeList[]}
                  name=""
                  icon={<i className="bx bx-dots-vertical-rounded" />}
                />
              </IfPrimiumUser>
            </If>
          </div>
        </>
      </div>
    </div>
  );

  return filterTags ? tags.includes(filterTags) && projectCard : projectCard;
};

export default ProjectCard;
