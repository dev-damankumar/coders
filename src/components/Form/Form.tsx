import React, { useState } from "react";
import FormControl from "../FormControl/FormControl";
import { WithContext as ReactTags } from "react-tag-input";
import filePlaceholder from "../../assets/images/file-img.png";
import If from "../If/If";
import { useNotification } from "../../providers/Notification";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

type Option = {
  value: string;
  checked: boolean;
  config: Config;
};

type InputElementsTypes = "radio" | "checkbox" | "file";
type Config = {
  disabled: boolean;
  checked: boolean;
  value: string;
  type: InputElementsTypes;
};
type FormStateObject = {
  touched: boolean;
  options: Option[];
  config: Config;
  valid: boolean;
  selected: boolean;
  preview: string[];
  selectedName: string;
};
let onChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string,
  state: {
    [key: string]: FormStateObject;
  }
) => {
  let formState = { ...state };
  if (formState[fieldName]) {
    formState[fieldName].touched = true;
    if (!formState[fieldName].config.disabled) {
      switch (e.target.type) {
        case "radio" || "checkbox":
          var options = formState[fieldName].options;
          options.filter((v) => {
            if (v.value === e.target.value) {
              v.config.checked = !v.config.checked;
            }
          });
          break;
        case "file":
          const files = e.target.files || [];
          const preview = [];
          for (let file of files) {
            if (file.type.includes("image")) {
              preview.push(URL.createObjectURL(file));
            } else {
              preview.push(filePlaceholder);
            }
          }
          formState[fieldName].preview = preview;
          formState[fieldName].valid = !!e.target.value.trim();
          formState[fieldName].touched = true;
          if (formState[fieldName].config.type === `file`) {
            formState[fieldName].selected = true;
            formState[fieldName].selectedName = e.target.files?.[0]?.name || "";
          }
          break;
        default:
          formState[fieldName].valid = !!e.target.value.trim();
          formState[fieldName].touched = true;
          formState[fieldName].config.value = e.target.value;
      }
    }
  }
  return formState;
};

type FormType = React.ComponentProps<"form"> & {
  config: any;
  externalSubmit: React.ReactNode;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    state: any
  ) => void;
};
const Form = (props: FormType) => {
  const notification = useNotification();
  const [error, setError] = useState(false);

  const handleDelete = (i: number, data: string[]) => {
    if (i > -1) {
      data.splice(i, 1);
    }
  };

  const handleAddition = (tag: string, data: string[]) => {
    data.push(tag);
  };

  const inputRender = () => {
    let formArray: any = [];
    if (typeof props.config == "object") {
      Object.keys(props.config).forEach((formInput) => {
        formArray.push({
          id: formInput,
          data: props.config[formInput],
        });
      });

      return formArray.map(
        (value: { id: string; data: any }, index: number) => {
          if (
            value.data.config.multiple === true &&
            value.data.config.type === "select"
          ) {
            return (
              <div className="form-group" key={index}>
                <label htmlFor="select">{value.data.label}</label>
                <ReactTags
                  tags={value.data.options}
                  autofocus={false}
                  handleDelete={(i) => {
                    handleDelete(i, value.data.options);
                  }}
                  handleAddition={(i) => {
                    handleAddition(i.id, value.data.options);
                  }}
                  delimiters={delimiters}
                />
              </div>
            );
          } else {
            return (
              <FormControl
                key={index}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.onChangeHandler(e, value.id, props.config);
                }}
                shouldValidate={value.data.validation}
                invalid={!value.data.valid}
                touched={value.data.touched}
                value={value.data.config.value}
                element={value.data.el}
                config={value.data.config}
                options={value.data.options}
                label={value.data.label}
                labelClass={value.data.labelClass}
                className={value.data.className}
                selected={value.data.selected}
                selectedName={value.data.selected}
                preview={value?.data?.preview || []}
              />
            );
          }
        }
      );
    } else {
      setError(true);
      notification.add({
        message: "argument must be of type object",
        type: "error",
      });
    }
  };

  return (
    <If cond={!error}>
      <form
        style={{ ...props.style }}
        action={props.action ? props.action : ""}
        className={props.className ? props.className : ""}
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : () => {
                return false;
              }
        }
        encType={props.encType ? props.encType : ""}
      >
        {inputRender()}
        <div className="form-group col-md-12">
          {props.externalSubmit ? props.externalSubmit : ""}
        </div>
      </form>
    </If>
  );
};

export default Form;
export { onChangeHandler };
