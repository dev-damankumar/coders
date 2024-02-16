import React, { Suspense, useState } from 'react';
import { getImageByExtension } from '../../utils/helper';
import FileLoader from './FileLoader';
import fileIcon from '../../assets/images/add-project.png';
import AddIcon from '../../assets/icons/AddIcon';
import cutIcon from '../../assets/images/cut.png';
import CopyIcon from '../../assets/icons/CopyIcon';
import pasteIcon from '../../assets/images/paste.png';
import EditRowIcon from '../../assets/icons/EditRowIcon';
import DeleteRowIcon from '../../assets/icons/DeleteRowIcon';
import { loader } from '../../utils/loader';
import { extensions } from '../../utils/extension';
import If from '../hoc/If';
import {
  copyFile,
  createFile,
  deleteSingleFile,
  renameFile,
} from '../../services/files';
import { useAuth } from '../../providers/Auth';
import { useParams } from 'react-router-dom';
import { ProjectDetailType } from '../../pages/ProjectDetail/ProjectDetail';
import { FileType } from '../../pages/Xcode/Xcode';
import { useNotification } from '../../providers/Notification';
import { useStudio } from '../../providers/StudioProvider';

const Modal = React.lazy(() => import('../ui/Modal/Modal'));
const ContextMenu = React.lazy(() => import('./ContextMenu'));

export type XstudionFileType =
  | FileType & { isOpened?: boolean; data?: XstudionFileType[] };

type XStudioExplorerProps = {
  prevPath: string;
  projectDetail: ProjectDetailType;
  files: XstudionFileType[] | null;
  fetchFileContentHandler: (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => Promise<void>;
  setFiles: React.Dispatch<React.SetStateAction<FileType[] | null>>;
};
const XStudioExplorer = ({
  prevPath,
  projectDetail,
  files,
  fetchFileContentHandler,
  setFiles,
}: XStudioExplorerProps) => {
  const auth = useAuth();
  const params = useParams();
  const studio = useStudio();
  console.log('studio', studio);
  const notification = useNotification();
  const id = params.id;
  const [currentData, setCurrentData] = useState<{
    name: string;
    prevPath: string;
    type: string;
  } | null>(null);
  const [filename, setfilename] = useState('');
  const [rename, setrename] = useState('');
  const [fileExtention, setfileExtention] = useState('txt');
  const [createFolder, setcreateFolder] = useState(false);
  const [openCreateFile, setopenCreateFile] = useState(false);
  const [openRenameFile, setopenRenameFile] = useState(false);
  const [currentActionFile, setCurrentActionFile] = useState<{
    type: 'folder' | 'file';
    method: string;
  } | null>(null);

  const closeContextMenu = () => {
    if (projectDetail?.author === auth.user?._id) {
      const menu = document.querySelector<HTMLDivElement>(
        '#x-studio-context-menu'
      );
      if (menu) {
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.transform = 'scale(0)';
      }
    }
  };

  const deleteFile = async () => {
    if (!files || !currentData) return;
    if (projectDetail?.author === auth.user?._id) {
      closeContextMenu();
      const fileArray = [...files];
      const { name, prevPath } = currentData;
      const temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== '') {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      const currentItem = tempFile.findIndex((file) => {
        let previousPath = '/';
        if (prevPath) {
          previousPath = prevPath;
        }
        const path = [...previousPath, name].join('/');
        if (file.path === path) {
          return true;
        }
      });

      tempFile.splice(currentItem, 1);
      const currentDelItem = fileArray.findIndex((file) => {
        let previousPath = '/';
        if (prevPath) {
          previousPath = prevPath;
        }
        const path = [...previousPath, name].join('/');
        if (file.path === path) {
          return true;
        }
      });
      fileArray.splice(currentDelItem, 1);
      setFiles(fileArray);
      loader.show();
      const details = await deleteSingleFile(name, id, prevPath);
      if (details.type === 'error') {
        return notification.error(details.message);
      }

      if (details.type === 'success') {
        setFiles(fileArray);
        loader.hide();
        notification.success(details.message);
      }
    }
  };
  let copyFileHandler = async (type) => {
    if (!files || !currentData) return;
    if (projectDetail?.author === auth?.user?._id) {
      closeContextMenu();
      let fileArray = [...files];
      let { name, prevPath } = currentData;
      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== '') {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.find((file) => {
        let previousPath = '/';
        if (prevPath) {
          previousPath = prevPath;
        }
        let path = [...previousPath, name].join('/');
        if (file.path === path) {
          return true;
        }
      });
      if (currentItem) {
        setCurrentActionFile({ ...currentItem, method: type });
      }
    }
  };

  const pasteFile = async () => {
    if (!files || !currentData || !currentActionFile) return;
    if (projectDetail?.author === auth.user?._id) {
      closeContextMenu();
      let fileArray = [...files];
      let { name, prevPath, type } = currentData;
      let { method } = currentActionFile;

      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== '') {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      const currentItem = tempFile.find((file) => {
        let previousPath = '/';
        if (prevPath) {
          previousPath = prevPath;
        }
        const path = [...previousPath, name].join('/');
        if (file.path === path) {
          return true;
        }
      });
      let sourcePath = [...currentActionFile.prevPath, currentActionFile.name];
      let destinationPath = ['', currentActionFile.name];
      if (currentItem) {
        destinationPath = [
          ...currentItem.prevPath,
          currentItem.name,
          currentActionFile.name,
        ];
        if (currentActionFile.type === 'folder') {
          if (type === 'folder') {
            destinationPath = [
              ...currentItem.prevPath,
              currentItem.name,
              currentActionFile.name,
            ];
          } else {
            destinationPath = [...currentItem.prevPath, currentActionFile.name];
          }
        }
      }

      let details = await copyFile(
        sourcePath,
        destinationPath,
        id,
        currentActionFile.type === 'folder',
        method
      );
      if (details.type === 'error') {
        loader.hide();
        return toast.error(details.message, 'Error Occured');
      }

      if (details.type === 'success') {
        if (method === 'cut') {
          let temp = [...currentActionFile.prevPath];
          let tempFile = [...fileArray];
          temp.forEach((v) => {
            if (v !== '') {
              tempFile = tempFile.filter((f) => {
                return f.name === v;
              })[0].data;
            }
          });
          let index = tempFile.findIndex((file) => {
            if (file.path === currentActionFile.path) {
              return true;
            }
          });
          tempFile.splice(index, 1);
          if (type === 'folder') {
            fileArray.splice(index, 1);
          }
          /*fileArray.splice(index,1)*/
        }

        let tempcurrentActionFile = { ...currentActionFile };
        if (currentItem) {
          if (type === 'folder') {
            tempcurrentActionFile.prevPath = [
              ...currentItem.prevPath,
              currentItem.name,
            ];
            tempcurrentActionFile.path = [...destinationPath].join('/');
          } else {
            tempcurrentActionFile.prevPath = [...currentItem.prevPath];
            tempcurrentActionFile.path = [...destinationPath].join('/');
          }
        } else {
          if (type === 'folder') {
            tempcurrentActionFile.prevPath = [''];
            tempcurrentActionFile.path = [...destinationPath].join('/');
          } else {
            tempcurrentActionFile.prevPath = [''];
            tempcurrentActionFile.path = [...destinationPath].join('/');
          }
        }

        if (currentItem?.data) {
          currentItem.data.push(tempcurrentActionFile);
        }
        setFiles([...fileArray, tempcurrentActionFile]);
        setCurrentActionFile(null);
        loader.hide();
        toast.success(details.message, 'File Copied');
      }
    }
  };
  let contextMenu =
    projectDetail?.author === auth?.user?._id
      ? [
          {
            name: 'New File',
            icon: <img src={fileIcon} />,
            onClick: () => {
              setopenCreateFile(true);
            },
          },
          {
            name: 'New Folder',
            icon: <AddIcon />,
            onClick: () => {
              setcreateFolder(true);
              setopenCreateFile(true);
            },
          },
          'divider',
          {
            name: 'Cut',
            icon: <img src={cutIcon} />,
            onClick: (e) => {
              copyFileHandler('cut');
            },
          },
          {
            name: 'Copy',
            icon: <CopyIcon />,
            onClick: (e) => {
              copyFileHandler('copy');
            },
          },
          {
            id: 'paste',
            name: 'Paste',
            icon: <img src={pasteIcon} />,
            onClick: pasteFile,
          },
          'divider',
          {
            name: 'Rename',
            icon: <EditRowIcon />,
            onClick: () => {
              closeContextMenu();
              setcreateFolder(currentData.type === 'folder');
              setrename(currentData.name);
              setopenRenameFile(true);
            },
          },
          {
            name: 'Delete',
            icon: <DeleteRowIcon />,
            onClick: () => {
              deleteFile();
            },
          },
        ]
      : [];

  const renderList = (file: XstudionFileType) => {
    if (!file) return;
    console.log('in', file);
    return (
      <>
        <li
          key={file.name + '_' + file.prevPath}
          className={file.isOpened ? 'parent' : ''}
          onClick={(e) => {
            e.preventDefault();
            fetchFileContentHandler(
              file.name,
              file.prevPath,
              file.extension === 'folder'
            );
          }}
          onContextMenu={(e) => {
            contextHandler(e, file.name, file.prevPath, file.type);
          }}
        >
          {file.isOpened ? (
            <span className={`caret caret-down`}>
              <i className='bx bx-chevron-right caret-i' />
              <img
                alt={file.name}
                className='file-icon'
                src={getImageByExtension(file.extension)}
              />
              {file.name}
            </span>
          ) : (
            <>
              <i className='bx bx-chevron-right caret-i' />
              <img
                alt={file.name}
                className='file-icon'
                src={getImageByExtension(file.extension)}
              />
              {file.name}
            </>
          )}

          <ul className={`nested ${file.isOpened ? 'file-expand' : ''}`}>
            {file.data &&
              file.data.map((j, i) => {
                const nestedFile = j;
                if (!nestedFile) return;
                if (nestedFile.type === 'folder' && nestedFile.data) {
                  return renderList(nestedFile);
                } else {
                  return (
                    <li
                      key={`${file}_${nestedFile}_${i}`}
                      onClick={(e) => {
                        e.preventDefault();
                        fetchFileContentHandler(
                          nestedFile.name,
                          nestedFile.prevPath,
                          nestedFile.extension === 'folder'
                        );
                      }}
                      onContextMenu={(e) => {
                        contextHandler(
                          e,
                          nestedFile.name,
                          nestedFile.prevPath,
                          nestedFile.type
                        );
                      }}
                      data-target-context='x-studio-context-menu'
                    >
                      {nestedFile.type === 'folder' && (
                        <i className='bx bx-chevron-right caret-i' />
                      )}
                      <img
                        alt={nestedFile.name}
                        className='file-icon'
                        src={getImageByExtension(nestedFile.extension)}
                      />
                      {nestedFile.name}
                    </li>
                  );
                }
              })}
          </ul>
        </li>
      </>
    );
  };

  let createFileHandler = async () => {
    if (projectDetail?.author === auth?.user._id) {
      closeContextMenu();
      let file = createFolder ? filename : `${filename}.${fileExtention}`;
      loader.show();
      let details = await createFile(file, id, prevPath, createFolder);
      if (details.type === 'error') {
        loader.hide();
        setopenCreateFile(false);
        return toast.error(details.message, 'Error Occured');
      }

      if (details.type === 'success') {
        let fileArray = [...files];
        let newFile = {
          name: details.file,
          type: 'file',
          size: details.size,
          lastModified: details.lastModified,
          extension: details.extension,
          path: details.path,
          prevPath: details.prevPath,
        };
        let tempFile = [...fileArray];
        let temp = [...prevPath];
        temp.forEach((v) => {
          if (v !== '') {
            tempFile = tempFile.filter((f) => {
              return f.name === v;
            })[0].data;
          }
        });
        fileArray.push(newFile);
        if (tempFile) {
          tempFile.push(newFile);
        }

        setFiles(fileArray);
        setfilename('');
        setfileExtention('txt');
        setopenCreateFile(false);
        loader.hide();
        toast.success(details.message, 'File Created');
      }
    }
  };

  let contextHandler = async (e, name, prePath, type) => {
    if (projectDetail?.author === auth?.user._id) {
      e.stopPropagation();
      e.preventDefault();
      var el = e.target;
      if (e.target.closest(`[data-target-context]`)) {
        el = e.target.closest(`[data-target-context]`);
      }
      setCurrentData({ ...currentData, name, prevPath: prePath, type });
      let target = document.querySelector(`#${el.dataset.targetContext}`);
      target.style.transform = `scale(1)`;
      let innerWidth = window.innerWidth - target.clientWidth;
      let innerHeight = window.innerHeight - target.clientHeight;
      let corrds = { left: e.pageX, top: e.pageY };
      target.style.left = `${corrds.left}px`;
      if (corrds.left > innerWidth) {
        target.style.left = `${innerWidth - 5}px`;
      }
      target.style.top = `${corrds.top}px`;
      if (corrds.top > innerHeight) {
        target.style.top = `${innerHeight - 5}px`;
      }
    }
  };

  let renameFileHandler = async () => {
    if (projectDetail?.author === auth?.user._id) {
      loader.show();
      let fileArray = [...files];
      let { name, prevPath, type } = currentData;

      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== '') {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.find((file) => {
        let path = [...prevPath, name].join('/');
        if (file.path === path) {
          return true;
        }
      });

      let path = [...prevPath];
      currentItem.name = rename;

      let details = await renameFile(path, id, name, rename);
      if (details.type === 'error') {
        return toast.error(details.message, 'Error Occured');
      }

      if (details.type === 'success') {
        setopenRenameFile(false);
        setrename('');
        setFiles([...tempFile]);
        loader.hide();
        toast.success(details.message, 'File Created');
      }
    }
  };

  return (
    <>
      <If cond={projectDetail?.author === auth.user?._id}>
        {openCreateFile ? (
          <Suspense fallback={''}>
            <Modal
              dark={true}
              heading={'Create A File'}
              size='sm'
              headerIcon={<i className='bx bx-file-blank'></i>}
              body={
                <div className='container create-div-modal'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='input-group'>
                        <input
                          type='text'
                          autoFocus={true}
                          placeholder={`Enter ${
                            createFolder ? 'Folder' : 'File'
                          } Name`}
                          name='name'
                          id='name'
                          value={filename}
                          className='form-input'
                          onChange={(e) => {
                            setfilename(e.target.value);
                          }}
                        />
                        {!createFolder && (
                          <div className='input-group-append'>
                            <select
                              onChange={(e) => {
                                setfileExtention(e.target.value);
                              }}
                              value={fileExtention}
                              className='form-input'
                            >
                              {Object.keys(extensions).map((extension) => {
                                if (
                                  extension !== 'folder' &&
                                  extension !== 'fallback'
                                ) {
                                  return (
                                    <option key={extension} value={extension}>
                                      {extension}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className='col-sm-12'
                      style={{ textAlign: 'right', marginTop: '15px' }}
                    >
                      <button
                        type='button'
                        className='btn btn-small btn-primary create-btn'
                        onClick={createFileHandler}
                      >
                        Create
                      </button>
                      <button
                        type='button'
                        className='btn btn-small btn-dark create-btn'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              }
              footer={false}
            />
          </Suspense>
        ) : (
          ''
        )}
        {openRenameFile ? (
          <Suspense fallback={''}>
            <Modal
              dark={true}
              heading={`Rename A ${createFolder ? 'Folder' : 'File'}`}
              size='sm'
              headerIcon={<i className='bx bx-file-blank'></i>}
              onClose={() => {
                setopenRenameFile(false);
              }}
              body={
                <div className='container create-div-modal'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='input-group'>
                        <input
                          type='text'
                          autoFocus={true}
                          placeholder={`Enter ${
                            createFolder ? 'Folder' : 'File'
                          } Name`}
                          name='name'
                          id='name'
                          value={rename}
                          className='form-input'
                          onChange={(e) => {
                            setrename(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className='col-sm-12'
                      style={{ textAlign: 'right', marginTop: '15px' }}
                    >
                      <button
                        type='button'
                        className='btn btn-small btn-primary create-btn'
                        onClick={renameFileHandler}
                      >
                        Rename
                      </button>
                      <button
                        type='button'
                        className='btn btn-small btn-dark create-btn'
                        onClick={() => {
                          setopenRenameFile(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              }
              footer={false}
            />
          </Suspense>
        ) : (
          ''
        )}
        <div className='x-studio-context-menu'>
          <Suspense fallback={''}>
            <ContextMenu
              disablePaste={currentActionFile}
              list={contextMenu}
              id='x-studio-context-menu'
              menuClass='dark-x-studio-menu x-studio-dropdown-menu'
            />
          </Suspense>
        </div>
      </If>

      <div
        className={`x-file-view-div ${
          studio.sidebar.isOpen ? 'x-file-view-open' : ''
        }`}
      >
        <If cond={!!id}>
          {projectDetail?.title && files ? (
            <ul id='file-explorer' className='file-expand'>
              <li
                className='parent'
                data-target-context='x-studio-context-menu'
                onContextMenu={(e) => {
                  contextHandler(e, '', [''], 'folder');
                }}
              >
                <span className='caret caret-down'>
                  <i className='bx bx-chevron-right' />
                  {projectDetail?.title}
                </span>
                <ul className='nested file-expand'>
                  {files &&
                    files.map((file, i) => {
                      if (file.type === 'folder' && file.data) {
                        console.log('file', file);
                        return renderList(file);
                      } else {
                        return (
                          <li
                            key={i}
                            onClick={(e) => {
                              fetchFileContentHandler(
                                file.name,
                                file.prevPath,
                                file.extension === 'folder'
                              );
                            }}
                            onContextMenu={(e) => {
                              contextHandler(
                                e,
                                file.name,
                                file.prevPath,
                                file.type
                              );
                            }}
                            id={file.name}
                            data-target-context='x-studio-context-menu'
                          >
                            {file.type === 'folder' ? (
                              <i className='bx bx-chevron-right caret-i' />
                            ) : (
                              ''
                            )}
                            <img
                              alt={file.name}
                              className='file-icon'
                              src={getImageByExtension(file.extension)}
                            />
                            {file.name}
                          </li>
                        );
                      }
                    })}
                </ul>
              </li>
            </ul>
          ) : (
            <FileLoader dark={true} />
          )}
        </If>
      </div>
    </>
  );
};

export default XStudioExplorer;
