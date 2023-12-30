import React, { Suspense, useState } from "react";
import getImageByExtension from "../../utils/getImageByExtension";
import FileLoader from "../FileLoader/FileLoader";
import fileIcon from "../../assets/images/add-project.png";
import AddIcon from "../../assets/icons/AddIcon";
import cutIcon from "../../assets/images/cut.png";
import CopyIcon from "../../assets/icons/CopyIcon";
import pasteIcon from "../../assets/images/paste.png";
import EditRowIcon from "../../assets/icons/EditRowIcon";
import DeleteRowIcon from "../../assets/icons/DeleteRowIcon";
import Toast from "../../utils/toast";
import Loader from "../../utils/loader";
import extensions from "../../utils/extension";
import If from "../If/If";
import {
  copyFile,
  createFile,
  deleteSingleFile,
  renameFile,
} from "../../services/files";

let toast = Toast();
let loader = Loader();
const Modal = React.lazy(() => import("../Modal/Modal"));
const ContextMenu = React.lazy(() => import("../ContextMenu/ContextMenu"));

const XStudioExplorer = ({
  id,
  prevPath,
  openSide,
  projectDetail,
  files,
  fetchFileContentHandler,
  setFiles,
  context,
}) => {
  let [currentData, setCurrentData] = useState({});
  let [filename, setfilename] = useState("");
  let [rename, setrename] = useState("");
  let [fileExtention, setfileExtention] = useState("txt");
  let [createFolder, setcreateFolder] = useState(false);
  let [openCreateFile, setopenCreateFile] = useState(false);
  let [openRenameFile, setopenRenameFile] = useState(false);
  let [currentActionFile, setCurrentActionFile] = useState(null);
  let closeContextMenu = () => {
    if (projectDetail?.user_id === context?.user._id) {
      let menu = document.querySelector("#x-studio-context-menu");
      menu.style.top = "0";
      menu.style.left = "0";
      menu.style.transform = "scale(0)";
    }
  };
  let deleteFile = async () => {
    if (projectDetail?.user_id === context?.user._id) {
      closeContextMenu();
      let fileArray = [...files];
      let { name, prevPath } = currentData;
      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== "") {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.findIndex((file) => {
        let previousPath = [""];
        if (prevPath) {
          previousPath = prevPath;
        }
        let path = [...previousPath, name].join("/");
        if (file.path === path) {
          return true;
        }
      });

      tempFile.splice(currentItem, 1);
      let currentDelItem = fileArray.findIndex((file) => {
        let previousPath = [""];
        if (prevPath) {
          previousPath = prevPath;
        }
        let path = [...previousPath, name].join("/");
        if (file.path === path) {
          return true;
        }
      });
      fileArray.splice(currentDelItem, 1);
      setFiles(fileArray);
      loader.show();
      let details = await deleteSingleFile(name, id, prevPath);
      if (details.type === "error") {
        return toast.error(details.message, "Error Occured");
      }

      if (details.type === "success") {
        setFiles(fileArray);
        loader.hide();
        toast.success(details.message, "Deleted");
      }
    }
  };
  let copyFileHandler = async (type) => {
    if (projectDetail?.user_id === context?.user._id) {
      closeContextMenu();
      let fileArray = [...files];
      let { name, prevPath } = currentData;
      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== "") {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.find((file) => {
        let previousPath = [""];
        if (prevPath) {
          previousPath = prevPath;
        }
        let path = [...previousPath, name].join("/");
        if (file.path === path) {
          return true;
        }
      });
      if (currentItem) {
        setCurrentActionFile({ ...currentItem, method: type });
      }
    }
  };
  let pasteFile = async () => {
    if (projectDetail?.user_id === context?.user._id) {
      closeContextMenu();
      let fileArray = [...files];
      let { name, prevPath, type } = currentData;
      let { method } = currentActionFile;

      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== "") {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.find((file) => {
        let previousPath = [""];
        if (prevPath) {
          previousPath = prevPath;
        }
        let path = [...previousPath, name].join("/");
        if (file.path === path) {
          return true;
        }
      });
      let sourcePath = [...currentActionFile.prevPath, currentActionFile.name];
      let destinationPath = ["", currentActionFile.name];
      if (currentItem) {
        destinationPath = [
          ...currentItem.prevPath,
          currentItem.name,
          currentActionFile.name,
        ];
        if (currentActionFile.type === "folder") {
          if (type === "folder") {
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
        currentActionFile.type === "folder",
        method
      );
      if (details.type === "error") {
        loader.hide();
        return toast.error(details.message, "Error Occured");
      }
      if (details.type === "success") {
        if (method === "cut") {
          let temp = [...currentActionFile.prevPath];
          let tempFile = [...fileArray];
          temp.forEach((v) => {
            if (v !== "") {
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
          if (type === "folder") {
            fileArray.splice(index, 1);
          }
          /*fileArray.splice(index,1)*/
        }

        let tempcurrentActionFile = { ...currentActionFile };
        if (currentItem) {
          if (type === "folder") {
            tempcurrentActionFile.prevPath = [
              ...currentItem.prevPath,
              currentItem.name,
            ];
            tempcurrentActionFile.path = [...destinationPath].join("/");
          } else {
            tempcurrentActionFile.prevPath = [...currentItem.prevPath];
            tempcurrentActionFile.path = [...destinationPath].join("/");
          }
        } else {
          if (type === "folder") {
            tempcurrentActionFile.prevPath = [""];
            tempcurrentActionFile.path = [...destinationPath].join("/");
          } else {
            tempcurrentActionFile.prevPath = [""];
            tempcurrentActionFile.path = [...destinationPath].join("/");
          }
        }

        if (currentItem?.data) {
          currentItem.data.push(tempcurrentActionFile);
        }
        setFiles([...fileArray, tempcurrentActionFile]);
        setCurrentActionFile(null);
        loader.hide();
        toast.success(details.message, "File Copied");
      }
    }
  };
  let contextMenu =
    projectDetail?.user_id === context?.user._id
      ? [
          {
            name: "New File",
            icon: <img src={fileIcon} />,
            onClick: () => {
              setopenCreateFile(true);
            },
          },
          {
            name: "New Folder",
            icon: <AddIcon />,
            onClick: () => {
              setcreateFolder(true);
              setopenCreateFile(true);
            },
          },
          "divider",
          {
            name: "Cut",
            icon: <img src={cutIcon} />,
            onClick: (e) => {
              copyFileHandler("cut");
            },
          },
          {
            name: "Copy",
            icon: <CopyIcon />,
            onClick: (e) => {
              copyFileHandler("copy");
            },
          },
          {
            id: "paste",
            name: "Paste",
            icon: <img src={pasteIcon} />,
            onClick: pasteFile,
          },
          "divider",
          {
            name: "Rename",
            icon: <EditRowIcon />,
            onClick: () => {
              closeContextMenu();
              setcreateFolder(currentData.type === "folder");
              setrename(currentData.name);
              setopenRenameFile(true);
            },
          },
          {
            name: "Delete",
            icon: <DeleteRowIcon />,
            onClick: () => {
              deleteFile();
            },
          },
        ]
      : [];

  let renderList = (v) => {
    let extension = v.extension.trim();
    return (
      <>
        <li
          key={v.name + "_" + v.prevPath}
          className={v.isOpened ? "parent" : ""}
          onClick={(e) => {
            fetchFileContentHandler(e, v.name, v.prevPath);
          }}
          onContextMenu={(e) => {
            contextHandler(e, v.name, v.prevPath, v.type);
          }}
        >
          {v.isOpened ? (
            <span className={`caret caret-down`}>
              <i className="bx bx-chevron-right caret-i" />
              <img
                alt={v.name}
                className="file-icon"
                src={getImageByExtension(extension)}
              />
              {v.name}
            </span>
          ) : (
            <>
              <i className="bx bx-chevron-right caret-i" />
              <img
                alt={v.name}
                className="file-icon"
                src={getImageByExtension(extension)}
              />
              {v.name}
            </>
          )}

          <ul className={`nested ${v.isOpened ? "file-expand" : ""}`}>
            {v.data.map((j, i) => {
              let extension = j.extension.trim();
              if (j.data) {
                return renderList(j);
              } else {
                return (
                  <li
                    key={`${v}_${j}_${i}`}
                    onClick={(e) => {
                      fetchFileContentHandler(e, j.name, j.prevPath);
                    }}
                    onContextMenu={(e) => {
                      contextHandler(e, j.name, j.prevPath, j.type);
                    }}
                    data-target-context="x-studio-context-menu"
                  >
                    {j.type === "folder" && (
                      <i className="bx bx-chevron-right caret-i" />
                    )}
                    <img
                      alt={j.name}
                      className="file-icon"
                      src={getImageByExtension(extension)}
                    />
                    {j.name}
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
    if (projectDetail?.user_id === context?.user._id) {
      closeContextMenu();
      let file = createFolder ? filename : `${filename}.${fileExtention}`;
      loader.show();
      let details = await createFile(file, id, prevPath, createFolder);
      if (details.type === "error") {
        loader.hide();
        setopenCreateFile(false);
        return toast.error(details.message, "Error Occured");
      }

      if (details.type === "success") {
        let fileArray = [...files];
        let newFile = {
          name: details.file,
          type: "file",
          size: details.size,
          lastModified: details.lastModified,
          extension: details.extension,
          path: details.path,
          prevPath: details.prevPath,
        };
        let tempFile = [...fileArray];
        let temp = [...prevPath];
        temp.forEach((v) => {
          if (v !== "") {
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
        setfilename("");
        setfileExtention("txt");
        setopenCreateFile(false);
        loader.hide();
        toast.success(details.message, "File Created");
      }
    }
  };

  let contextHandler = async (e, name, prePath, type) => {
    if (projectDetail?.user_id === context?.user._id) {
      e.stopPropagation();
      e.preventDefault();
      var el = e.target;
      if (e.target.closest(`[data-target-context]`)) {
        el = e.target.closest(`[data-target-context]`);
      }
      setCurrentData({ ...currentData, name: name, prevPath: prePath, type });
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
    if (projectDetail?.user_id === context?.user._id) {
      loader.show();
      let fileArray = [...files];
      let { name, prevPath, type } = currentData;

      let temp = [...prevPath];
      let tempFile = [...fileArray];
      temp.forEach((v) => {
        if (v !== "") {
          tempFile = tempFile.filter((f) => {
            return f.name === v;
          })[0].data;
        }
      });

      let currentItem = tempFile.find((file) => {
        let path = [...prevPath, name].join("/");
        if (file.path === path) {
          return true;
        }
      });

      let path = [...prevPath];
      currentItem.name = rename;

      let details = await renameFile(path, id, name, rename);
      if (details.type === "error") {
        return toast.error(details.message, "Error Occured");
      }

      if (details.type === "success") {
        setopenRenameFile(false);
        setrename("");
        setFiles([...tempFile]);
        loader.hide();
        toast.success(details.message, "File Created");
      }
    }
  };
  return (
    <>
      <If cond={projectDetail?.user_id === context?.user._id}>
        {openCreateFile ? (
          <Suspense fallback={""}>
            <Modal
              dark={true}
              heading={"Create A File"}
              size="sm"
              headerIcon={<i className="bx bx-file-blank"></i>}
              body={
                <div className="container create-div-modal">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <input
                          type="text"
                          autoFocus={true}
                          placeholder={`Enter ${
                            createFolder ? "Folder" : "File"
                          } Name`}
                          name="name"
                          id="name"
                          value={filename}
                          className="form-input"
                          onChange={(e) => {
                            setfilename(e.target.value);
                          }}
                        />
                        {!createFolder && (
                          <div className="input-group-append">
                            <select
                              onChange={(e) => {
                                setfileExtention(e.target.value);
                              }}
                              value={fileExtention}
                              className="form-input"
                            >
                              {Object.keys(extensions).map((extension) => {
                                if (
                                  extension !== "folder" &&
                                  extension !== "fallback"
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
                      className="col-sm-12"
                      style={{ textAlign: "right", marginTop: "15px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-small btn-primary create-btn"
                        onClick={createFileHandler}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="btn btn-small btn-dark create-btn"
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
          ""
        )}
        {openRenameFile ? (
          <Suspense fallback={""}>
            <Modal
              dark={true}
              heading={`Rename A ${createFolder ? "Folder" : "File"}`}
              size="sm"
              headerIcon={<i className="bx bx-file-blank"></i>}
              onClose={() => {
                setopenRenameFile(false);
              }}
              body={
                <div className="container create-div-modal">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <input
                          type="text"
                          autoFocus={true}
                          placeholder={`Enter ${
                            createFolder ? "Folder" : "File"
                          } Name`}
                          name="name"
                          id="name"
                          value={rename}
                          className="form-input"
                          onChange={(e) => {
                            setrename(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-sm-12"
                      style={{ textAlign: "right", marginTop: "15px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-small btn-primary create-btn"
                        onClick={renameFileHandler}
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        className="btn btn-small btn-dark create-btn"
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
          ""
        )}
        <div className="x-studio-context-menu">
          <Suspense fallback={""}>
            <ContextMenu
              disablePaste={currentActionFile}
              list={contextMenu}
              id="x-studio-context-menu"
              menuClass="dark-x-studio-menu x-studio-dropdown-menu"
            />
          </Suspense>
        </div>
      </If>

      <div className={`x-file-view-div ${openSide ? "x-file-view-open" : ""}`}>
        {projectDetail?.title && files.length > 0 ? (
          <ul id="file-explorer" className="file-expand">
            <li
              className="parent"
              data-target-context="x-studio-context-menu"
              onContextMenu={(e) => {
                contextHandler(e, "", [""], "folder");
              }}
            >
              <span className="caret caret-down">
                <i className="bx bx-chevron-right" />
                {projectDetail?.title}
              </span>
              <ul className="nested file-expand">
                {files.map((v, i) => {
                  let date = new Date(`2021-06-04T07:59:54.690Z`);
                  let extension = v.extension.trim();
                  if (v.prevPath.length <= 1) {
                    if (v.data) {
                      return renderList(v);
                    } else {
                      return (
                        <li
                          key={i}
                          onClick={(e) => {
                            fetchFileContentHandler(e, v.name, v.prevPath);
                          }}
                          onContextMenu={(e) => {
                            contextHandler(e, v.name, v.prevPath, v.type);
                          }}
                          name={v.name}
                          data-target-context="x-studio-context-menu"
                        >
                          {v.type === "folder" ? (
                            <i className="bx bx-chevron-right caret-i" />
                          ) : (
                            ""
                          )}
                          <img
                            alt={v.name}
                            className="file-icon"
                            src={getImageByExtension(extension)}
                          />
                          {v.name}
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </li>
          </ul>
        ) : (
          <FileLoader dark={true} />
        )}
      </div>
    </>
  );
};

export default XStudioExplorer;
