import React, { useEffect, useState, Suspense } from 'react';
import {
  Navigate,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './XStudio.css';
import ThemeIcon from '../../assets/icons/ThemeIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import DeleteRowIcon from '../../assets/icons/DeleteRowIcon';
import { loader } from '../../utils/';
import Image from '../../components/ui/Image';
import ImgIcon from '../../assets/icons/ImgIcon';
import Editor from '../../components/xstudio/Editor';
import SaveRowIcon from '../../assets/icons/SaveRowIcon';
import XStudioSidebar from '../../components/xstudio/XStudioSidebar';
import XStudioExplorer, {
  XstudionFileType,
} from '../../components/xstudio/XStudioExplorer';
import XStudioTabs from '../../components/xstudio/XStudioTabs';
import LinkIcon from '../../assets/icons/LinkIcon';
import IfPrimiumUser from '../../components/hoc/IfPrimiumUser';
import If from '../../components/hoc/If';
import { env, joinURL } from '../../utils/';
import { useAuth } from '../../providers/Auth';
import {
  FileDetailsType,
  fetchFileContent,
  saveFile,
} from '../../services/files';
import { fetchProjectList } from '../../services/project';
import { FileType } from '../Xcode/Xcode';
import { ProjectDetailType } from '../ProjectDetail/ProjectDetail';
import { useNotification } from '../../providers/Notification';
import { useStudio } from '../../providers/StudioProvider';
import SearchIconWhite from '../../assets/icons/SearchIconWhite';

const SearchFile = React.lazy(
  () => import('../../components/project/SearchFile/SearchFile')
);
const DropDown = React.lazy(() => import('../../Dropdown/Dropdown1'));

type ProjectListType = {
  name: string;
  icon: React.ReactNode;
  link: string;
  id: string;
  selected?: boolean;
};
function XStudio() {
  const location = useLocation();
  const params = useParams();
  const studio = useStudio();
  const navigate = useNavigate();
  const auth = useAuth();
  const notification = useNotification();
  const projectId = params.id! || '';

  const [projectList, setProjectList] = useState<ProjectListType[]>([]);
  const [selectedProject, setselectedProject] =
    useState<ProjectListType | null>(null);

  const [filepath, setfilepath] = useState('/');
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [fileData, setfileData] = useState<FileDetailsType<string> | null>(
    null
  );
  const [files, setFiles] = useState<XstudionFileType[] | null>(null);

  const [tempdata, setTempData] = useState({ data: fileData?.data || '' });
  const [projectDetail, setprojectDetail] = useState<ProjectDetailType>(null);
  const [showSearchField, setShowSearchFeild] = useState(false);

  useEffect(() => {
    resetEditor();
    setFiles(null);
    const fetchProjectListArray = async () => {
      const projectList = await fetchProjectList();
      if ('error' in projectList) {
        return notification.error(projectList.message);
      }
      if (projectList.data) {
        const arr = projectList.data;
        const list = arr.map((item) => {
          const data: ProjectListType = {
            name: item.title,
            id: item._id,
            icon: <Image src={item.image} />,
            link: `/x-studio/${item._id}`,
          };
          if (item._id === projectId) {
            data.selected = true;
            setselectedProject(data);
          }
          return data;
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
      if (projectId) {
        const project = await fetchFileContent<FileType[]>(
          '',
          projectId,
          filepath
        );
        if ('error' in project) {
          return notification.error(project.message);
        }
        if (project.data) {
          project.data.sort((a) => (a.type === 'folder' ? -1 : 1));
          setfilepath(project.prevPath);
          setFiles(project.data);
          setprojectDetail(project.projectDetail);
          const selected = projectList.find((v) => v.id === projectId);
          if (selected) setselectedProject(selected);
        }
      }
    };
    fetchProjects();
  }, [projectId]);

  useEffect(() => {
    const fetchFile = async () => {
      if (files) return;
      if (!(location?.state?.filename && location?.state?.path)) return;
      await fetchFileContentHandler('', filepath, true);
      navigate(`/x-studio/${projectId}`);
    };
    fetchFile();
  }, [files]);

  const resetEditor = () => {
    setTabs([]);
    setfilepath('/');
    setActiveTab('');
    setTempData({ data: fileData?.data || '' });
    setfileData(null);
  };

  const setContent = (value: string) => {
    const content = { ...tempdata, data: value };
    setTempData(content);
  };

  const fetchFileContentHandler = async (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => {
    if (!files) return;
    loader.show();
    try {
      const tempFile = [...files];
      const currentItem = tempFile.find((file) => {
        const path = [prevPath, name].join('/');
        if (file.path === path) {
          setfilepath(file.prevPath!);
          return true;
        }
      })!;
      currentItem.isOpened = !currentItem.isOpened;
      if (currentItem.data) {
        setFiles(tempFile);
        return;
      }
      const details = await fetchFileContent<FileType[] | string>(
        name,
        projectId,
        prevPath || filepath
      );
      if ('error' in details) {
        return notification.error(details.message);
      }
      if (!isFolder) {
        if (typeof (details as FileDetailsType<string>).data === 'string') {
          setfileData(details as FileDetailsType<string>);
          setActiveTab(name);
          let tempTabs = [...tabs];
          if (!tempTabs.includes(name)) {
            tempTabs.push(name);
            setTabs(tempTabs);
          }
        }
        return;
      }

      const newFiles = details.data as FileType[];
      currentItem.isOpened = true;
      currentItem.data = newFiles;
      setfilepath(details.prevPath);
      setFiles(tempFile);
    } catch (error) {
      if (error instanceof Error) return notification.error(error.message);
    } finally {
      loader.hide();
    }
  };

  const saveFileHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!projectId) return;
    const file = activeTab;
    if (!file) return;
    loader.show();
    const data = tempdata.data;
    const details = await saveFile(file, projectId, filepath, data);
    loader.hide();
    if (details.type === 'error') return notification.error(details.message);
    notification.success(details.message);
  };

  const moreMenu = [
    Object.keys(projectDetail || {}).length > 0
      ? {
          name: 'Live Preview',
          icon: <LinkIcon />,
          link: `${joinURL(
            env.REACT_APP_BASE_URL,
            projectDetail?.url,
            projectDetail?.executableFile
          )}`,
          target: '_blank',
        }
      : {},
    'divider',
    {
      name: 'Preferences',
      icon: <ThemeIcon />,
    },
    {
      name: 'My Settings',
      icon: <SettingsIcon />,
      link: '/my-settings',
    },
    'divider',
    projectDetail?.author === auth.user?._id
      ? {
          name: 'Save',
          icon: <SaveRowIcon />,
          onClick: saveFileHandler,
        }
      : {},

    {
      name: 'Exit',
      icon: <DeleteRowIcon />,
      link: '/',
    },
  ];

  const closeTab = (name: string) => {
    const tempTabs = [...tabs];
    const index = tabs.findIndex((v) => v === name);
    tempTabs.splice(index, 1);
    setTabs(tempTabs);
    if (name === activeTab) {
      if (tempTabs.length >= 1) {
        fetchFileContentHandler(tempTabs[0]);
        setActiveTab(tempTabs[0]);
      } else {
      }
    }
  };

  return (
    <IfPrimiumUser else={<Navigate to={'/'} />}>
      <div className='x-studio-page'>
        <div className='x-studio-editor x-studio-dark-theme'>
          <div className='x-studio-wrapper'>
            <XStudioSidebar
              search={
                <Suspense fallback=''>
                  <SearchFile
                    input={<SearchIconWhite />}
                    prevPath={filepath}
                    files={files}
                    setFiles={setFiles}
                    if={showSearchField}
                    fetchFileContentHandler={fetchFileContentHandler}
                  />
                </Suspense>
              }
            />
            <div className='x-studio-content'>
              <div className='x-studio-editor-header'>
                <div className='x-studio-editor-header-item project-div'>
                  <Suspense fallback={''}>
                    <DropDown
                      list={projectList}
                      linkClass='userMenu'
                      icon={
                        selectedProject?.icon ? (
                          selectedProject?.icon
                        ) : (
                          <ImgIcon />
                        )
                      }
                      name={
                        selectedProject?.name
                          ? selectedProject?.name
                          : 'Select Project'
                      }
                      menuClass='dark-x-studio-menu x-studio-dropdown-menu'
                    />
                  </Suspense>
                </div>
                <div className='x-studio-editor-header-item'>
                  <div className='editor-view'>
                    <a
                      className='header-btn'
                      onClick={(e) => {
                        e.preventDefault();
                        studio.sidebar.changeView('left');
                      }}
                    >
                      <i className='bx bx-dock-left' />
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        studio.sidebar.changeView('right');
                      }}
                      className='header-btn'
                    >
                      <i className='bx bx-dock-right' />
                    </a>
                  </div>
                  <Suspense fallback={''}>
                    <DropDown
                      list={moreMenu}
                      icon={<i className='bx bx-dots-vertical-rounded' />}
                      name={''}
                      menuClass='dropdown-menu dropdown-menu-right more-dropdown x-studio-dropdown-menu dark-x-studio-menu'
                      className='editor-view dropdown'
                      linkClass='header-btn'
                    />
                  </Suspense>
                </div>
              </div>

              <div
                className={`x-studio-body ${
                  studio.sidebar.view === 'right' ? 'x-studio-right-view' : ''
                }`}
              >
                <XStudioExplorer
                  prevPath={filepath}
                  setFiles={setFiles}
                  fetchFileContentHandler={fetchFileContentHandler}
                  projectDetail={projectDetail}
                  files={files}
                />
                <div className='x-studio-code-place'>
                  <XStudioTabs
                    tabs={tabs}
                    closeTab={closeTab}
                    activeTab={activeTab}
                    fetchFileContentHandler={fetchFileContentHandler}
                  />
                  <Editor
                    // disabled={projectDetail?.author !== auth.user?._id}
                    fileData={fileData}
                    tabs={tabs}
                    theme='eclipse'
                    style={{ height: '100%', width: '100%' }}
                    onChange={(value: string) => {
                      setContent(value);
                    }}
                  />
                  <div
                    className='x-breadcrumb'
                    style={{ justifyContent: 'flex-end' }}
                  >
                    <If cond={!!projectDetail}>
                      <a
                        target='_blank'
                        href={joinURL(
                          env.REACT_APP_BASE_URL,
                          projectDetail?.url,
                          projectDetail?.executableFile
                        )}
                        className='console-x-breadcrumb console-x-breadcrumb-right'
                      >
                        <i className='bx bx-link-external' /> Preview
                      </a>
                      <If cond={projectDetail?.author === auth.user?._id}>
                        <a
                          onClick={saveFileHandler}
                          className='console-x-breadcrumb'
                        >
                          <i className='bx bx-check-circle' />
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
