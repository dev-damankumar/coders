import React, {
  Suspense,
  useEffect,
  useReducer,
  useState,
  lazy,
  memo,
  useRef,
} from 'react';
import './Xcode.css';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import CheckBox from '../../components/ui/Form/CheckBox/CheckBox';
import TableRowSkelton from '../../components/ui/Skelton/TableRowSkelton';
import Loading from '../../components/ui/Loading';
import ImportIcon from '../../assets/icons/ImportIcon';
import DeleteRowIcon from '../../assets/icons/DeleteRowIcon';
import addIcon from '../../assets/images/add.png';
import If from '../../components/hoc/If';
import IfPrimiumUser from '../../components/hoc/IfPrimiumUser';
import IfStandardUser from '../../components/hoc/IfStandardUser';
import xcodeReducer from '../../reducers/xcodeReducer';
import FileRow from '../../components/project/FileRow';
import { useAuth } from '../../providers/Auth';
import {
  createFile,
  deleteMultiFiles,
  uploadFile,
  fetchFileContent,
} from '../../services/files';
import { ProjectDetailType } from '../ProjectDetail/ProjectDetail';
import { useNotification } from '../../providers/Notification';
import { goBackPaths, sortObjectByName } from '../../utils/helper';
import { extensions } from '../../utils/extension';

const ProjectConfig = lazy(
  () => import('../../components/project/ProjectConfig/ProjectConfig')
);
const UploadFile = lazy(
  () => import('../../components/ui/Form/UploadFile/UploadFile')
);

const SearchFile = lazy(
  () => import('../../components/project/SearchFile/SearchFile')
);
const Modal = lazy(() => import('../../components/ui/Modal/Modal'));

type XcodeIntialState = {
  showDownload: boolean;
  progress: number;
};
const initialState = {
  showDownload: false,
  progress: 0,
};

export type FileType = {
  extension: string;
  lastModified: string;
  name: string;
  path?: string;
  // filepath?: string[];
  size: string;
  type: 'file' | 'folder';
  prevPath?: string;
  // data?: string;
};
const Xcode = memo(() => {
  const params = useParams();
  const notification = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryFilepath = decodeURIComponent(query.get('filepath') || '');
  const projectId = params.id!;
  const auth = useAuth();
  const [state, dispatch] = useReducer(
    xcodeReducer<XcodeIntialState>,
    initialState
  );
  const [files, setfiles] = useState<FileType[] | null>(null);
  const [projectDetail, setProjectDetail] = useState<ProjectDetailType>(null);
  const [filepath, setFilePath] = useState(queryFilepath || '/');
  const filesRef = useRef<HTMLTableSectionElement>(null);

  const isStandardAndAbove = auth?.user?.type === 1 || auth?.user?.type === 2;
  const isAuthor = projectDetail?.author === auth?.user?._id;

  const [selected, setSelected] = useState({});
  const [checkAll, setcheckAll] = useState(false);
  const filename = useRef<HTMLInputElement>(null);
  const [fileExtention, setfileExtention] = useState('txt');
  const [openCreateFile, setopenCreateFile] = useState(false);
  const [uploadFileOpen, setuploadFileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('fetch-progress', (e: any) => {
      const progress = e.detail;
      setProgressbarValue(progress);
    });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const project = await fetchFileContent<FileType[]>(
        '',
        projectId,
        filepath
      );
      if ('error' in project) {
        notification.add({
          type: 'error',
          message: project.message,
        });
        return navigate('/');
      }
      if (project.data) {
        setFilePath(project.prevPath);
        setfiles(project.data);
        setProjectDetail(project.projectDetail);
      }
    };
    fetchProjects();
  }, [projectId]);

  const fetchFileContentHandler = async (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => {
    if (files?.length === 0) return;
    if (!isFolder) {
      return openFile(name, prevPath || filepath);
    }

    const details = await fetchFileContent<FileType[]>(
      name,
      projectId,
      prevPath || filepath
    );
    if (details.type === 'error') {
      return notification.error(details.message);
    }

    if (details.type === 'success') {
      setFilePath(details.prevPath);
      setfiles(details.data);
      navigate(
        `/xcode/${projectId}?filepath=${encodeURIComponent(details.prevPath!)}`
      );
    }
  };

  const setProgressbarValue = (payload: {
    receivedLength: number;
    length: number;
    done: boolean;
  }) => {
    if (files?.length === 0) return;
    const { receivedLength, length } = payload;
    const value = Number(((receivedLength / length) * 100).toFixed(2));
    if (isNaN(value)) return;
    dispatch({ type: 'SET_PROGRESS', data: value });
    return value;
  };

  const createNewFile = (e: React.MouseEvent) => {
    if (files?.length === 0) return;
    e.preventDefault();
    setopenCreateFile(true);
  };

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const checked = e.target.checked;
    const tempFiles = [...files];
    const tempSelected: { [any: string]: boolean } = { ...selected };
    setcheckAll(!!checked);
    tempFiles.forEach((v) => {
      tempSelected[v.name] = checked;
      if (!checked) delete tempSelected[v.name];
    });
    setSelected(tempSelected);
  };

  const deleteMultiFilesHandler = async () => {
    if (!files) return;
    const selectedFilesArray = Object.keys(selected);
    const filesToDelete = files.filter((file) =>
      selectedFilesArray.includes(file.name)
    );
    const newFiles = files.filter(
      (file) => !selectedFilesArray.includes(file.name)
    );

    const data = await deleteMultiFiles(filesToDelete, projectId, filepath);
    if ('error' in data) {
      return notification.add({
        type: 'error',
        message: data.message,
      });
    }
    setfiles(newFiles);
    setSelected({});
    notification.add({
      type: 'success',
      message: data.message,
    });
  };

  const createFileHandler = async () => {
    if (!files) return;
    if (!filename.current)
      return notification.add({
        type: 'error',
        message: 'Can not find filename.',
      });
    const file = `${filename.current.value}.${fileExtention}`;

    console.log('file, projectId, filepath', file, projectId, filepath);
    const details = await createFile(file, projectId, filepath);
    if ('error' in details)
      return notification.add({
        type: 'error',
        message: details.messsage,
      });
    const fileArray = [...files];
    const newFile: FileType = {
      name: details.file,
      type: 'file',
      size: details.size,
      lastModified: details.lastModified,
      extension: details.extension,
    };
    fileArray.push(newFile);
    fileArray.sort(sortObjectByName);
    setfiles(fileArray);
    notification.add({ type: 'success', message: details.message });
    setopenCreateFile(false);
  };

  const uploadFileHandler = async (file: File) => {
    if (!files) return;

    const details = await uploadFile(file, projectId, filepath);
    if ('error' in details)
      return notification.add({
        type: 'error',
        message: details.message,
      });

    const fileArray = [...files];
    const newFile: FileType = {
      name: details.file,
      type: 'file',
      size: details.size,
      lastModified: details.lastModified,
      extension: details.extension,
    };
    const fileNames = fileArray.map((v) => v.name);
    if (!fileNames.includes(details.file)) {
      fileArray.push(newFile);
      fileArray.sort(sortObjectByName);
      setfiles(fileArray);
    }
    notification.add({
      type: 'success',
      message: details.message,
    });
    setuploadFileOpen(false);
  };

  const goBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const paths = goBackPaths(filepath);
    fetchFileContentHandler(paths.name, paths.prevPath, true);
  };

  const openFile = (name: string, prevPath?: string) => {
    console.log('sending...', {
      name,
      prevPath,
      projectId,
      files,
    });
    navigate(
      `/file-preview/${projectId}?filename=${encodeURIComponent(
        name
      )}&filepath=${encodeURIComponent(prevPath!)}`,
      {
        state: {
          files,
        },
      }
    );
  };

  return (
    <>
      <If cond={isStandardAndAbove}>
        <Suspense fallback={<Loading />}>
          <UploadFile
            onClose={() => {
              setuploadFileOpen(false);
            }}
            show={uploadFileOpen}
            onUpload={uploadFileHandler}
            title='Upload a file'
          />
        </Suspense>
      </If>
      <If cond={isStandardAndAbove}>
        <Suspense fallback={<Loading />}>
          <Modal
            heading={`Downloading...`}
            headerIcon={<i className='bx bx-cloud-download'></i>}
            show={state?.showDownload}
            onClose={() => {
              dispatch({ type: 'SET_DOWNLOAD', data: false });
            }}
            body={
              <div className={`download-wrap`}>
                <p className={`confirm-msg`}>
                  Your file is downloading. It will take some time please
                  wait...
                </p>
                <ImportIcon />
                <div className='progress'>
                  <div
                    className='progress-bar'
                    style={{ width: state?.progress + `%` }}
                  >
                    {state?.progress}%
                  </div>
                </div>
              </div>
            }
          />
        </Suspense>
      </If>

      <If cond={isStandardAndAbove && openCreateFile}>
        <Modal
          onClose={() => {
            setopenCreateFile(false);
          }}
          heading='Add File'
          headerIcon={<i className='bx bx-file' />}
          onSuccess={() => {
            createFileHandler();
          }}
          body={
            <>
              <div className='form-group '>
                <label htmlFor='email'>File Name:</label>
                <div className='input-group'>
                  <input
                    type='text'
                    autoFocus={true}
                    placeholder='Enter Your Name'
                    name='name'
                    id='name'
                    ref={filename}
                    className='form-input'
                  />
                  <div className='input-group-append'>
                    <select
                      onChange={(e) => {
                        setfileExtention(e.target.value);
                      }}
                      style={{ width: '100px' }}
                      value={fileExtention}
                      className='form-input'
                    >
                      {Object.keys(extensions)?.map((extension, index) => {
                        if (
                          extension !== 'folder' &&
                          extension !== 'fallback'
                        ) {
                          return (
                            <option key={index} value={extension}>
                              {extension}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </If>
      <div className='x-code-page'>
        <section className='section' style={{ paddingTop: '20px' }}>
          <section className='container x-div'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='table-wrap'>
                  <div className='x-customize-div x-filter-div'>
                    <div
                      className='x-filter-item search-filter-div'
                      style={{ marginRight: 'auto' }}
                    >
                      <If cond={filepath !== '/'}>
                        <button
                          onClick={goBack}
                          type='button'
                          className='go-back-search-btn'
                        >
                          <i className='bx bx-arrow-back' />
                        </button>
                      </If>
                      <div className='x-search-wrap'>
                        <Suspense fallback={<Loading />}>
                          <SearchFile
                            files={files}
                            fetchFileContentHandler={fetchFileContentHandler}
                            setFiles={setfiles}
                            prevPath={filepath}
                          />
                        </Suspense>
                      </div>
                    </div>
                    <If cond={isAuthor && !!files}>
                      <IfPrimiumUser>
                        <div className='x-filter-item'>
                          <div
                            className='s-dropdown dropdown'
                            style={{ display: 'flex' }}
                          >
                            <a
                              data-table-tooltip='true'
                              onClick={createNewFile}
                              className='header-btn add-header-btn'
                            >
                              <img src={addIcon} />
                              <div className='tooltip tooltip-up'>Add File</div>
                            </a>
                          </div>
                        </div>
                        <div className='x-filter-item'>
                          <div className='s-dropdown dropdown'>
                            <a
                              data-table-tooltip='true'
                              onClick={(e) => {
                                e.preventDefault();
                                setuploadFileOpen(true);
                              }}
                              className='header-btn upload-header-btn'
                            >
                              <i className='bx bx-upload' />
                              <div className='tooltip tooltip-up'>
                                Upload File
                              </div>
                            </a>
                          </div>
                        </div>
                      </IfPrimiumUser>
                    </If>
                    <If cond={isAuthor && auth?.user?.type === 2}>
                      <div className='x-filter-item'>
                        <div
                          data-no-close={true}
                          className=' s-dropdown download-dropdown dropdown'
                        >
                          <a
                            data-table-tooltip='true'
                            className='menu-link header-btn bg-success'
                            data-toggle='dropdown'
                          >
                            <i className='bx bx-download' />
                            <div className='tooltip tooltip-up'>Download</div>
                          </a>
                          <div className='dropdown-menu dropdown-menu-right'>
                            <Suspense fallback={<Loading />}>
                              <ProjectConfig
                                isAuthor={isAuthor}
                                dispatch={dispatch}
                              />
                            </Suspense>
                          </div>
                        </div>
                      </div>
                    </If>
                    <IfPrimiumUser>
                      <div className='x-filter-item'>
                        <div
                          data-no-close={true}
                          className=' s-dropdown download-dropdown dropdown'
                        >
                          <a
                            data-table-tooltip='true'
                            className='menu-link header-btn bg-success'
                            data-toggle='dropdown'
                          >
                            <i className='bx bx-download' />
                            <div className='tooltip tooltip-up'>Download</div>
                          </a>
                          <div className='dropdown-menu dropdown-menu-right'>
                            <Suspense fallback={<Loading />}>
                              <ProjectConfig
                                isAuthor={isAuthor}
                                dispatch={dispatch}
                              />
                            </Suspense>
                          </div>
                        </div>
                      </div>
                      <div className='x-filter-item'>
                        <div className='s-dropdown dropdown'>
                          <NavLink
                            data-table-tooltip='true'
                            to={`/x-studio/${projectId}`}
                            className='view-x-studio header-btn'
                          >
                            <i className='bx bx-code-alt' />
                            <div className='tooltip tooltip-up'>XStudio</div>
                          </NavLink>
                        </div>
                      </div>
                    </IfPrimiumUser>
                  </div>
                  <div className='table-responsive'>
                    <table className='table table-compact table-dark table-striped table-warning'>
                      <thead className='dark-head'>
                        <tr>
                          <If cond={isAuthor}>
                            <IfStandardUser>
                              <th className='w-35p'>
                                <CheckBox
                                  checked={checkAll}
                                  onChange={selectAll}
                                />
                              </th>
                            </IfStandardUser>
                          </If>
                          <th>
                            <div>Folders/Files</div>
                          </th>
                          <th>
                            <div>Type</div>
                          </th>
                          <th>
                            <div>Last Modified</div>
                          </th>
                          <If cond={isAuthor}>
                            <IfStandardUser>
                              <th>
                                <ul className='x-actions'>
                                  <li className='x-action-li x-action-edit-row'>
                                    <a
                                      className='x-btn'
                                      style={{
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                      }}
                                    />
                                  </li>
                                  <If
                                    cond={Object.keys(selected)?.length > 1}
                                    else={
                                      <li className='x-action-li x-action-li-disabled'>
                                        <a className='x-btn'>
                                          <DeleteRowIcon />
                                        </a>
                                      </li>
                                    }
                                  >
                                    <li className='x-action-li x-action-delete-row'>
                                      <a
                                        data-table-tooltip='Delete Row'
                                        className='x-btn'
                                        onClick={() => {
                                          deleteMultiFilesHandler();
                                        }}
                                      >
                                        <DeleteRowIcon />
                                        <div className='tooltip '>
                                          Delete Row
                                        </div>
                                      </a>
                                    </li>
                                  </If>
                                </ul>
                              </th>
                            </IfStandardUser>
                          </If>
                        </tr>
                      </thead>
                      <tbody ref={filesRef}>
                        <If cond={files?.length === 0}>
                          <tr key={`tr`}>
                            <td style={{ textAlign: 'center' }} colSpan={8}>
                              No Data Found
                            </td>
                          </tr>
                        </If>
                        <If cond={!!files} else={<TableRowSkelton rows={6} />}>
                          <FileRow
                            filepath={filepath}
                            fetchFileContentHandler={fetchFileContentHandler}
                            selected={selected}
                            setSelected={setSelected}
                            files={files}
                            setfiles={setfiles}
                            isAuthor={isAuthor}
                          />
                        </If>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
});

export default Xcode;
