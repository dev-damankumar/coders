import DeleteRowIcon from "../../assets/icons/DeleteRowIcon";
import SaveRowIcon from "../../assets/icons/SaveRowIcon";

const Steps = (props) => {
  let stepsArray = ["step-1", "step-2", "step-3", "step-4"];
  let initialStep = stepsArray[props.initialStep - 1];
  let done = props.done;
  let errorStep = props.errorStep;
  console.log("initialStep", initialStep);
  console.log("done", done);
  if (done.includes(initialStep)) {
    throw new Error(`Active step can't be included in done props`);
  }

  let steps = props.steps;
  let activeStep = steps.filter((s) => {
    if (s.props.id === initialStep) {
      return s;
    }
  });

  return (
    <>
      <div className="card step-card">
        <div className={"steps"}>
          {props.titles.map((step, index) => {
            return (
              <a
                key={index}
                href="#step-1"
                className={`${
                  errorStep === index + 1 ? "error-step" : ""
                } step ${
                  initialStep === `step-${index + 1}` && !errorStep
                    ? "active-step"
                    : ""
                } ${props.initialStep > index + 1 ? "done-step" : ""}`}
              >
                {errorStep === index + 1 ? (
                  <DeleteRowIcon />
                ) : props.initialStep !== index + 1 &&
                  props.initialStep > index + 1 ? (
                  <SaveRowIcon />
                ) : (
                  ""
                )}
                <div className="step-info-wrap">
                  <h3>{step.title || `Step ${index + 1}`}</h3>
                  {step.subTitle ? <p>{step.subTitle}</p> : ""}
                </div>
              </a>
            );
          })}
        </div>
      </div>
      {activeStep}
    </>
  );
};

export default Steps;
