import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-json";
import { env } from "../../utils";
import React from "react";
import { FileDetailsType } from "../../services/files";

const modeArray = {
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
} as const;

export type Mode = keyof typeof modeArray;

type EditorProps = {
  theme: string;
  style: React.CSSProperties;
  onChange: (value: string) => void;
  fileData: FileDetailsType<string> | null;
  tabs: string[];
  disabled?: boolean;
};

function Editor({
  theme,
  style,
  onChange,
  fileData,
  tabs,
  disabled,
}: EditorProps) {
  console.log("fileData", fileData);
  return (
    <div className="editor dark-preview" id="editor">
      {fileData ? (
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
              mode={modeArray[fileData.extension as Mode] || "html"}
              theme={theme || "eclipse"}
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              value={fileData.data || ""}
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
          <h1>No File Opened</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            amet.
          </p>
        </div>
      )}
    </div>
  );
}
export default React.memo(Editor);
