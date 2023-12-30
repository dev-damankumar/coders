import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-json";
import React from "react";
import { env } from "../../utils";

function Editor({
  mode,
  theme,
  style,
  onChange,
  value,
  showMode,
  fileData,
  tabs,
  disabled,
}) {
  let modeArray = {
    html: "html",
    htm: "html",
    js: "javascript",
    javascript: "javascript",
    tsx: "tsx",
    jsx: "jxs",
    css: "css",
    sass: "sass",
    ts: "typescript",
    typescript: "typescript",
    py: "python",
    mysql: "mysql",
    json: "json",
    scss: "css",
  };

  return (
    <div className="editor dark-preview" id="editor">
      {showMode.show && tabs.length >= 1 ? (
        <>
          {fileData.mimeType === "image" ? (
            <img
              src={"data:image/jpeg;base64," + fileData.data}
              className="x-studio-img-preview"
            />
          ) : fileData.extension === "pdf" ? (
            <iframe
              className="iframe-wrapper"
              src={[env["REACT_APP_BASE_URL"], fileData.data].join("/")}
            />
          ) : tabs.length > 0 ? (
            <AceEditor
              readOnly={disabled}
              mode={modeArray[mode] || "html"}
              theme={theme || "eclipse"}
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              value={value || ""}
              style={style || {}}
              editorProps={{
                $blockScrolling: true,
              }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
              }}
            ></AceEditor>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="no-file-preview">
          <h1>{showMode.heading}</h1>
          <p>{showMode.description}</p>
        </div>
      )}
    </div>
  );
}

export default Editor;
