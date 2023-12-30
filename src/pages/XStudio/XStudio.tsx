import React, { useEffect, useState, Suspense } from "react";
import {
  Navigate,
  useParams,
  useLocation,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import "./XStudio.css";
import ThemeIcon from "../../assets/icons/ThemeIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import DeleteRowIcon from "../../assets/icons/DeleteRowIcon";
import Toast from "../../utils/toast";
import Loader from "../../utils/loader";
import Image from "../../components/Image/Image";
import ImgIcon from "../../assets/icons/ImgIcon";
import Editor from "../../components/Editor/Editor";
import SaveRowIcon from "../../assets/icons/SaveRowIcon";
import XStudioSidebar from "../../components/XStudioSidebar/XStudioSidebar";
import XStudioExplorer from "../../components/XStudioExplorer/XStudioExplorer";
import XStudioTabs from "../../components/XStudioTabs/XStudioTabs";
import LinkIcon from "../../assets/icons/LinkIcon";
import IfPrimiumUser from "../../components/IfPrimiumUser";
import If from "../../components/If/If";
import { env, joinURL } from "../../utils";
import { useAuth } from "../../providers/Auth";
import { fetchFileContent, saveFile } from "../../services/files";
import { fetchProjectList } from "../../services/project";
import { FileType } from "../Xcode/Xcode";

const SearchFile = React.lazy(
  () => import("../../components/SearchFile/SearchFile")
);
const DropDown = React.lazy(() => import("../../components/DropDown/DropDown"));
let toast = Toast();
let loader = Loader();

function XStudio(props) {
  const { id } = useParams();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [selectedProject, setselectedProject] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [prevPath, setPrevPath] = useState("/");
  const [openSide, setopenSide] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [filesData, setFilesData] = useState({});
  const [fileData, setfileData] = useState({ data: "", extension: "" });
  const [files, setFiles] = useState<FileType[] | null>(null);
  const [sideView, setsideView] = useState(
    localStorage.getItem("sideView") || "left"
  );
  const projectId = params.id! || "";
  const [showMode, setshowMode] = useState({
    show: false,
    heading: "No File Opened",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, laudantium!",
  });
  const [tempdata, setTempData] = useState({ [props.name]: fileData?.data });
  const [projectDetail, setprojectDetail] = useState({});
  const [showSearchField, setShowSearchFeild] = useState(false);

  useEffect(() => {
    resetEditor();
    setFiles(null);
    const fetchProjectListArray = async () => {
      const projectList = await fetchProjectList();
      if ("error" in projectList) {
        return toast.error(projectList.message, "Error Occured");
      }
      if (projectList.data) {
        const arr = projectList.data;
        const list = arr.map((v) => {
          if (v._id === id) {
            setselectedProject({
              title: v.title,
              image: <Image src={v.image} />,
            });
          }
          return {
            name: v.title,
            icon: <Image src={v.image} />,
            link: `/x-studio/${v._id}`,
          };
        });
        setProjectList(list);
      }
    };
    fetchProjectListArray();
  }, []);

  useEffect(() => {
    resetEditor();
    setFiles(null);
    const fetchProjects = async () => {
      if (id) {
        const project = await fetchFileContentHandler("", prevPath, true);
        if (project.type === "error") {
          return toast.error(project.message, "Error Occured");
        }
        if (project.data) {
          const first = [];
          project.data.forEach((v) => {
            if (v.type === "folder") {
              first.unshift(v);
            } else {
              first.push(v);
            }
          });
          console.log("first", first);
          setPrevPath(project.prevPath);
          setFiles(first);
          setprojectDetail(project.projectDetail);
        }
      }
    };
    fetchProjects();
  }, [id]);

  useEffect(() => {
    const fetchFile = async () => {
      if (files) return;
      if (!(location?.state?.filename && location?.state?.path)) return;
      console.log("prevPath", prevPath);
      await fetchFileContentHandler("", prevPath, true);
      navigate(`/x-studio/${id}`);
    };
    fetchFile();
  }, [files]);

  const resetEditor = () => {
    setTabs([]);
    setPrevPath("/");
    setActiveTab("");
    setFilesData({});
    setTempData({ [props.name]: fileData?.data });
    setfileData({ data: "", extension: "" });
    setshowMode({
      show: false,
      heading: "No File Opened",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, laudantium!",
    });
  };

  const setContent = (value) => {
    const content = { ...tempdata, [props.name]: value };
    setTempData(content);
  };

  const fetchFileContentHandler = async (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => {
    if (files?.length === 0) return;
    if (!isFolder) {
      // return openFile(name, prevPath || filepath);
    }
    loader.show();
    let details = await fetchFileContent(
      name,
      projectId || "",
      prevPath || "/"
    );
    setshowMode({ ...showMode, show: true });
    if (!filesData[name]) {
      e?.preventDefault();
      let tempFiles = [...files];
      let currentItem = tempFiles.find((file) => {
        let previousPath = [""];
        if (prePath) {
          previousPath = prePath;
        }
        let path = [...previousPath, name].join("/");
        if (file.path === path) {
          setPrevPath(file.prevPath);
          return true;
        }
      });
      if (!currentItem?.data) {
        loader.show();
        let prevPath = currentItem?.prevPath || [""];
        let details = await fetchFileContent(
          name,
          id,
          prePath ? prePath : prevPath
        );
        if (details.type === "error") {
          return toast.error(details.message, "Error Occured");
        }

        if (details.type === "success") {
          if (details.mimeType === "binary") {
            setshowMode({
              ...showMode,
              show: false,
              heading: "Binary File Can't be preview",
            });
            loader.hide();
          } else {
            if (details.mimeType !== "folder") {
              let filesDataTemp = { ...filesData };
              filesDataTemp[name] = details;
              setFilesData(filesDataTemp);
              setfileData({ ...details, name, extension: name.split(".")[1] });
              setTempData({
                [props.name]: details.data,
              });
              setActiveTab(name);
              setPrevPath(details.prevPath);
              let tempTabs = [...tabs];
              if (!tempTabs.includes(name)) {
                tempTabs.push(name);
                setTabs(tempTabs);
              }
              setShowSearchFeild(false);
            } else {
              setPrevPath(details.prevPath);
              if (currentItem) {
                currentItem.isOpened = true;
                currentItem.data = details.data;
              }
              setFiles([...tempFiles, ...details.data]);
            }
            loader.hide();
          }
        }
      } else {
        currentItem.isOpened = !currentItem.isOpened;
        setFiles([...tempFiles]);
      }
    } else {
      if (
        filesData[name].mimeType !== "folder" &&
        filesData[name].mimeType !== "binary"
      ) {
        setfileData({
          ...filesData[name],
          name,
          extension: name.split(".")[1],
        });
        setActiveTab(name);
        let tempTabs = [...tabs];
        if (!tempTabs.includes(name)) {
          tempTabs.push(name);
          setTabs(tempTabs);
        }
      }
      loader.hide();
    }
  };
  let openSidebar = (e) => {
    e.preventDefault();
    setopenSide(!openSide);
  };
  let saveFileHandler = async (e) => {
    e.preventDefault();
    let file = activeTab;
    if (!file) return;
    loader.show();
    let data = tempdata[props.name];
    let details = await saveFile(file, id, prevPath, data);
    loader.hide();
    if (details.type === "error")
      return toast.error(details.message, "Error while saving file");
    toast.success(details.message, "File Saved Successfully");
  };
  let changeView = (e, name) => {
    localStorage.setItem("sideView", name);
    setsideView(name);
  };
  let moreMenu = [
    Object.keys(projectDetail).length > 0
      ? {
          name: "Live Preview",
          icon: <LinkIcon />,
          link: `${joinURL(
            env.REACT_APP_BASE_URL,
            projectDetail?.url,
            projectDetail?.executableFile
          )}`,
          target: "_blank",
        }
      : {},
    "divider",
    {
      name: "Preferences",
      icon: <ThemeIcon />,
    },
    {
      name: "My Settings",
      icon: <SettingsIcon />,
      link: "/my-settings",
    },
    "divider",
    projectDetail?.user_id === auth?.user._id
      ? {
          name: "Save",
          icon: <SaveRowIcon />,
          onClick: saveFileHandler,
        }
      : {},

    {
      name: "Exit",
      icon: <DeleteRowIcon />,
      link: "/",
    },
  ];

  let closeTab = (e, name) => {
    e.stopPropagation();
    let tempTabs = [...tabs];
    let index = tabs.findIndex((v) => v === name);
    tempTabs.splice(index, 1);
    setTabs(tempTabs);
    if (name === activeTab) {
      if (tempTabs.length >= 1) {
        fetchFileContentHandler(e, tempTabs[0]);
        setActiveTab(tempTabs[0]);
      } else {
        setshowMode({ ...showMode, show: false });
      }
    }
  };

  let closeSearch = (e) => {
    if (e.target.className.includes("search-overlay"))
      setShowSearchFeild(false);
  };

  return (
    <IfPrimiumUser else={<Navigate to={"/"} />}>
      <div className="x-studio-page">
        <Suspense fallback={""}>
          <SearchFile
            prevPath={prevPath}
            files={files}
            setFiles={setFiles}
            if={showSearchField}
            fetchFileContentHandler={fetchFileContentHandler}
          />
        </Suspense>
        <div className="x-studio-editor x-studio-dark-theme">
          <div className="x-studio-wrapper">
            <XStudioSidebar
              openSidebar={openSidebar}
              setShowSearchFeild={setShowSearchFeild}
            />
            <div className="x-studio-content">
              <div className="x-studio-editor-header">
                <div className="x-studio-editor-header-item project-div">
                  <Suspense fallback={""}>
                    <DropDown
                      list={projectList}
                      linkClass="userMenu"
                      icon={
                        selectedProject?.image ? (
                          selectedProject?.image
                        ) : (
                          <ImgIcon />
                        )
                      }
                      name={
                        selectedProject?.title
                          ? selectedProject?.title
                          : "Select Project"
                      }
                      menuClass="dark-x-studio-menu x-studio-dropdown-menu"
                    />
                  </Suspense>
                </div>
                <div className="x-studio-editor-header-item">
                  <div className="editor-view">
                    <a
                      className="header-btn"
                      onClick={(e) => {
                        changeView(e, "left");
                      }}
                    >
                      <i className="bx bx-dock-left" />
                    </a>
                    <a
                      onClick={(e) => {
                        changeView(e, "right");
                      }}
                      className="header-btn"
                    >
                      <i className="bx bx-dock-right" />
                    </a>
                  </div>
                  <Suspense fallback={""}>
                    <DropDown
                      list={moreMenu}
                      icon={<i className="bx bx-dots-vertical-rounded" />}
                      name={""}
                      menuClass="dropdown-menu dropdown-menu-right more-dropdown x-studio-dropdown-menu dark-x-studio-menu"
                      className="editor-view dropdown"
                      linkClass="header-btn"
                    />
                  </Suspense>
                </div>
              </div>

              <div
                className={`x-studio-body ${
                  sideView === "right" ? "x-studio-right-view" : ""
                }`}
              >
                <XStudioExplorer
                  auth={auth}
                  prevPath={prevPath}
                  id={id}
                  setFiles={setFiles}
                  fetchFileContentHandler={fetchFileContentHandler}
                  openSide={openSide}
                  projectDetail={projectDetail}
                  files={files}
                />
                <div className="x-studio-code-place">
                  <XStudioTabs
                    tabs={tabs}
                    closeTab={closeTab}
                    activeTab={activeTab}
                    fetchFileContentHandler={fetchFileContentHandler}
                  />
                  <Editor
                    disabled={projectDetail?.user_id !== auth?.user._id}
                    showMode={showMode}
                    fileData={fileData}
                    tabs={tabs}
                    mode={fileData?.extension}
                    name="x-studio"
                    theme="eclipse"
                    setReadOnly={false}
                    style={{ height: "100%", width: "100%" }}
                    onChange={(value) => {
                      setContent(value);
                    }}
                    value={tempdata[props.name]}
                  />
                  <div
                    className="x-breadcrumb"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <If cond={Object.keys(projectDetail).length > 0}>
                      <a
                        target="_blank"
                        href={joinURL(
                          env.REACT_APP_BASE_URL,
                          projectDetail?.url,
                          projectDetail?.executableFile
                        )}
                        className="console-x-breadcrumb console-x-breadcrumb-right"
                      >
                        <i className="bx bx-link-external" /> Preview
                      </a>
                      <If cond={projectDetail?.user_id === auth?.user._id}>
                        <a
                          onClick={saveFileHandler}
                          className="console-x-breadcrumb"
                        >
                          <i className="bx bx-check-circle" />
                          Save
                        </a>
                      </If>
                    </If>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IfPrimiumUser>
  );
}

export default XStudio;
