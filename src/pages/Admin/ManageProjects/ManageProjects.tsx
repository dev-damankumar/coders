import React, {
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import CheckBox from "../../../components/Form/Checkbox/Checkbox";
import IfAdmin from "../../../components/IfAdmin/IfAdmin";
import {
  cloneProject,
  deleteProject,
  downloadProject,
} from "../../../utils/services";
import TableRowSkelton from "../../../components/Skelton/TableRowSkelton";
import "../../../pages/Xcode/Xcode.css";
import Http from "../../../hooks/http";
import homeReducer from "../../../reducers/homeReducer";
import placeholder from "../../../assets/images/placeholder.png";
import Switch from "../../../components/Form/Switch/Switch";
import { DModal, DModalClose } from "../../../utils/dModal";
import Loader from "../../../utils/loader";
import Toast from "../../../utils/toast";
import BinIcon from "../../../assets/icons/BinIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import ScriptIcon from "../../../assets/icons/ScriptIcon";
import ImportIcon from "../../../assets/icons/ImportIcon";
import PreIcon from "../../../assets/icons/PreIcon";
import EditRowIcon from "../../../assets/icons/EditRowIcon";
import DeleteRowIcon from "../../../assets/icons/DeleteRowIcon";
import { useAuth } from "../../../providers/Auth";
import Loading from "../../../components/Loading/Loading";
import { env } from "../../../utils";

const Pagination = React.lazy(
  () => import("../../../components/Pagination/Pagination")
);
const DropDown = React.lazy(
  () => import("../../../components/DropDown/DropDown")
);
const ProjectConfig = React.lazy(
  () => import("../../../components/ProjectConfig/ProjectConfig")
);

let rowLoader = <TableRowSkelton rows={5} cols={7} />;

let initialState = {
  projects: null,
  pageNo: 1,
  limit: 10,
  totalProjects: 0,
  nodata: false,
  showDownload: false,
  progress: 0,
  loading: true,
};
let toast = Toast();
let loader = Loader();
const ManageProjects = () => {
  let http = Http();
  let auth = useAuth();
  let [state, dispatch] = useReducer(homeReducer, initialState);
  let [selected, setSelected] = useState({});
  let [checkAll, setcheckAll] = useState(false);
  let projectRef = useRef(null);

  let deleteProjectHandler = async (id) => {
    await deleteProject(id, state.projects, dispatch);
    if (state.projects.length < 2) {
      onPagination(state.pageNo - 1);
    }
  };
  let downloadHandler = (id) => {
    downloadProject(id, dispatch);
  };
  let cloneProjectHandler = async (id) => {
    await cloneProject(id, state.projects, dispatch);
    if (state.projects.length > 9) {
      onPagination(state.pageNo + 1);
    }
  };
  let configHandler = (id) => {
    DModal({
      heading: `Get Prefilled Link`,
      headerIcon: <i className="bx bx-customize"></i>,
      cancelButtonText: "Cancel",
      successButtonText: "Ok",
      size: "sm",
      footer: false,
      body: (
        <Suspense fallback={<Loading />}>
          <ProjectConfig
            downloadProject={() => {
              DModalClose();
              downloadHandler(id);
            }}
            projectId={id}
          />
        </Suspense>
      ),
    });
  };
  let confirmHandler = (id, type) => {
    if (type === `delete`)
      DModal({
        heading: `Delete Project`,
        size: "sm",
        headerIcon: <i className="bx bxs-trash"></i>,
        successButtonText: "Delete",
        body: (
          <p className={`confirm-msg`}>
            Are you sure you want delete this project permanatly?
          </p>
        ),
        onSuccess: () => {
          deleteProjectHandler(id);
        },
      });
    if (type === `clone`)
      DModal({
        heading: `Clone Project`,
        headerIcon: <i className="bx bx-copy-alt"></i>,
        successButtonText: "Clone",
        size: "sm",
        body: (
          <p className={`confirm-msg`}>
            Are you sure you want clone this project?
          </p>
        ),
        onSuccess: () => {
          cloneProjectHandler(id);
        },
      });
  };
  let projectActions = (_id) => {
    return [
      {
        name: "Make a Copy",
        onClick: () => confirmHandler(_id, `clone`),
        icon: <CopyIcon />,
      },
      "divider",
      {
        name: "Move to bin",
        onClick: () => confirmHandler(_id, `delete`),
        icon: <BinIcon />,
      },
      {
        name: "Get pre-filled link",
        onClick: () => configHandler(_id),
        icon: <LinkIcon />,
      },
      {
        name: "ProjectX editor",
        link: "/x-studio",
        icon: <ScriptIcon />,
      },
      "divider",
      {
        name: "Download",
        onClick: () => downloadHandler(_id),
        icon: <ImportIcon />,
      },
      {
        name: "Preferences",
        link: `/admin/edit-project/${_id}`,
        icon: <PreIcon />,
      },
    ];
  };
  useEffect(() => {
    let fetchProjects = async () => {
      try {
        let data = await http.get(
          `${env["REACT_APP_BASE_URL"]}/api/manage-projects?pageNo=${state.pageNo}&limit=${state.limit}`
        );
        let projects = data.data;
        if (projects && projects?.length > 0) {
          dispatch({ type: "SET_TOTAL_PROJECTS", data: data.totalCount });
          dispatch({ type: "SET_PROJECTS", data: projects });
          dispatch({ type: "SET_LOADING", data: false });
        } else {
          dispatch({ type: "SET_PROJECTS", data: [] });
          dispatch({ type: "SET_NO_DATA", data: true });
          dispatch({ type: "SET_LOADING", data: false });
        }
      } catch (e) {
        dispatch({ type: "SET_NO_DATA", data: true });
        dispatch({ type: "SET_LOADING", data: false });
      }
    };
    fetchProjects();
  }, [state.pageNo, state.limit]);
  let selectAll = (e) => {
    let checked = e.target.checked;
    let tempFiles = [...state?.projects];
    let tempSelected = { ...selected };
    if (checked) {
      setcheckAll(true);
      tempFiles.forEach((v) => {
        tempSelected[v._id] = true;
      });
    } else {
      setcheckAll(false);
      tempFiles.forEach((v) => {
        tempSelected[v._id] = false;
      });
    }
    setSelected(tempSelected);
  };
  let deleteMultiFilesHandler = async () => {
    let selectedTemp = Object.keys(selected);

    let fileArray = [...state?.projects];
    let newFile = fileArray.filter(
      (file) => !selectedTemp.find((sel) => file._id === sel)
    );
    loader.show();
    try {
      loader.show();
      let data = await http.post(
        `${env["REACT_APP_BASE_URL"]}/api/delete-projects/`,
        { ids: selectedTemp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.type === "success") {
        dispatch({ type: "SET_PROJECTS", data: newFile });
        loader.hide();
        setSelected({});
        if (newFile.length < 2) {
          onPagination(state.pageNo - 1);
        }
        toast.success(data.message, "Deleted");
      }
    } catch (e) {
      loader.hide();
      toast.error(e.message, "Error Occured");
    }
  };

  let onPagination = (pageNo) => {
    dispatch({ type: "SET_LOADING", data: true });
    dispatch({ type: "SET_PAGE_NO", data: pageNo });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  let setProjectPrivacy = async (e, id) => {
    try {
      loader.show();
      let project = await http.post(
        `${env["REACT_APP_BASE_URL"]}/api/set-privacy/${id}`,
        {
          visibility: e.target.checked,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      loader.hide();
      if (project.type === "error") {
        return toast.error(project.message, "Error Occured");
      }
      if (project.type === "success") {
        let temp = [...state.projects];
        temp.forEach((v, i) => {
          if (v._id === id) {
            temp[i].visibility = !e.target.checked;
          }
        });
        dispatch({ type: "SET_PROJECTS", data: [...temp] });
        return toast.success(project.message, "Successfully Updated");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return (
    <div className="x-code-page">
      <div className="table-responsive">
        <table className="table table-compact table-dark table-striped table-warning">
          <thead className="dark-head">
            <tr className="">
              <th className="">
                <CheckBox checked={checkAll} onChange={selectAll} />
              </th>
              <th className="">
                <div className="">Project Name</div>
              </th>
              <th className="">
                <div className="">Description</div>
              </th>
              <th className="">
                <div className="">Website Url</div>
              </th>
              <th className="">
                <div className="">Executable File</div>
              </th>
              <th className="">
                <div className="">Tags</div>
              </th>
              <th className="">
                <div className="">Visibility</div>
              </th>
              <th className="">
                <div className="">Images</div>
              </th>
              <IfAdmin>
                <th className="">
                  <ul className="x-actions">
                    {Object.keys(selected)?.length === 0 ||
                    Object.keys(selected)?.length === 1 ? (
                      <li className="x-action-li x-action-edit-row">
                        <NavLink
                          to="/x-studio"
                          className="x-btn"
                          data-table-tooltip="Edit Row"
                        >
                          <EditRowIcon />
                          <div className="x-tooltip ">Edit Row</div>
                        </NavLink>
                      </li>
                    ) : (
                      <li className="x-action-li x-action-li-disabled">
                        <a className="x-btn">
                          <EditRowIcon />
                        </a>
                      </li>
                    )}

                    {Object.keys(selected)?.length > 1 ? (
                      <li className="x-action-li x-action-delete-row">
                        <a
                          data-table-tooltip="Delete Row"
                          className="x-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteMultiFilesHandler();
                          }}
                        >
                          <DeleteRowIcon />
                          <div className="x-tooltip ">Delete Row</div>
                        </a>
                      </li>
                    ) : (
                      <li className="x-action-li x-action-li-disabled">
                        <a className="x-btn">
                          <DeleteRowIcon />
                        </a>
                      </li>
                    )}
                  </ul>
                </th>
              </IfAdmin>
            </tr>
          </thead>
          <tbody>
            {state?.projects?.length === 0 && (
              <tr key={`tr`} className="">
                <td style={{ textAlign: "center" }} colSpan={10}>
                  No Data Found
                </td>
              </tr>
            )}
            {!state?.projects
              ? rowLoader
              : state?.projects?.map((project) => {
                  return (
                    <tr className="">
                      <td className="">
                        <CheckBox
                          checked={selected[project._id]}
                          onChange={(e) => {
                            let sels = { ...selected };
                            if (e.target.checked) {
                              sels[project._id] = true;
                            } else {
                              delete sels[project._id];
                            }
                            setSelected(sels);
                          }}
                        />
                      </td>
                      <td className="">
                        <a
                          href={
                            auth?.auth
                              ? "/project-detail/" + project?._id
                              : "/login"
                          }
                          target="_blank"
                          className="open-x-code"
                          onClick={(e) => {}}
                        >
                          <img
                            alt="dg"
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            }}
                            className="x-file-img"
                            src={
                              project.image
                                ? [
                                    env["REACT_APP_BASE_URL"],
                                    project.image,
                                  ].join("/")
                                : placeholder
                            }
                          />
                          {project.title}
                        </a>
                      </td>
                      <td className="">
                        <div
                          className="description"
                          data-table-tooltip="Edit Row"
                        >
                          {project.description.slice(0, 40)}
                          <div className="x-tooltip ">
                            {project.description}
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <div className="url-link">
                          <a
                            title={[
                              env["REACT_APP_BASE_URL"],
                              project.url,
                              project.executableFile,
                            ].join("/")}
                            target="_blank"
                            href={[
                              env["REACT_APP_BASE_URL"],
                              project.url,
                              project.executableFile,
                            ].join("/")}
                          >
                            <button
                              type="button"
                              className="btn btn-small btn-primary live-url-btn"
                            >
                              Live URL <i className="bx bx-link-external"></i>
                            </button>
                          </a>
                          <a
                            title={[
                              env["REACT_APP_BASE_URL"],
                              project.url,
                              project.executableFile,
                            ].join("/")}
                            href={
                              auth?.auth
                                ? "/xcode/" + project?._id
                                : "/admin/login"
                            }
                            target="_blank"
                          >
                            <button
                              type="button"
                              className="btn btn-small btn-dark live-url-btn"
                            >
                              Xcode <i className="bx bx-link-external"></i>
                            </button>
                          </a>
                        </div>
                      </td>
                      <td className="">{project.executableFile}</td>
                      <td className="">
                        <div className="tags">
                          {project.tags.map((tag, tagIndex) => {
                            return (
                              <div className="tag" key={`tag_${tagIndex}`}>
                                {tag}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="">
                        <Switch
                          onChange={(e) => setProjectPrivacy(e, project?._id)}
                          style={{ marginTop: "12px" }}
                          checked={project.visibility}
                        />
                      </td>
                      <td className="">
                        <div className="img-grid-wrap">
                          {project?.imageGrid?.map((img, tagIndex) => {
                            return (
                              <img
                                src={
                                  img
                                    ? [env["REACT_APP_BASE_URL"], img].join("/")
                                    : placeholder
                                }
                                key={`img_${tagIndex}`}
                              />
                            );
                          })}
                        </div>
                      </td>
                      <IfAdmin>
                        <td>
                          <ul className="x-actions">
                            {Object.keys(selected)?.length === 0 ||
                            Object.keys(selected)?.length === 1 ? (
                              <li className="x-action-li x-action-edit-row">
                                <NavLink
                                  to={`/admin/edit-project/${project._id}`}
                                  className="x-btn"
                                  data-table-tooltip="Edit Row"
                                >
                                  <EditRowIcon />
                                  <div className="x-tooltip ">Edit Row</div>
                                </NavLink>
                              </li>
                            ) : (
                              <li className="x-action-li x-action-li-disabled">
                                <a className="x-btn">
                                  <EditRowIcon />
                                </a>
                              </li>
                            )}
                            {Object.keys(selected)?.length === 0 ||
                            Object.keys(selected)?.length === 1 ? (
                              <li className="x-action-li x-action-delete-row">
                                <a
                                  data-table-tooltip="Delete Row"
                                  className="x-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    confirmHandler(project._id, `delete`);
                                  }}
                                >
                                  <DeleteRowIcon />
                                  <div className="x-tooltip ">Delete Row</div>
                                </a>
                              </li>
                            ) : (
                              <li className="x-action-li x-action-li-disabled x-action-delete-row">
                                <a
                                  data-table-tooltip="Delete Row"
                                  className="x-btn"
                                >
                                  <DeleteRowIcon />
                                </a>
                              </li>
                            )}
                            <li className="x-action-li x-action-more-row">
                              <a
                                className="x-btn"
                                data-table-tooltip="More Row"
                              >
                                <Suspense fallback={<Loading />}>
                                  <DropDown
                                    menuClass="dropdown-menu-right"
                                    size="small"
                                    direction="down"
                                    list={projectActions(project._id)}
                                    name=""
                                    icon={
                                      <i className="bx bx-dots-vertical-rounded" />
                                    }
                                  />
                                </Suspense>
                                <div className="x-tooltip ">More</div>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </IfAdmin>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {state?.projects && state.totalProjects > state.projects.length ? (
        <div className="row">
          <div className="col-md-12" style={{ textAlign: "right" }}>
            {state.projects.length > 0 ? (
              <Suspense fallback={""}>
                <Pagination
                  pageNo={state.pageNo}
                  limit={state.limit}
                  total={state.totalProjects}
                  onPagination={onPagination}
                />
              </Suspense>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageProjects;
