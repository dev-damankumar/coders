import DeleteRowIcon from '../../../assets/icons/DeleteRowIcon';
import SaveRowIcon from '../../../assets/icons/SaveRowIcon';

type Title = { subTitle: string; title: string };
type StepsProps = {
  done: string[];
  initialStep: number;
  errorStep: number;
  steps: JSX.Element[];
  titles: Title[];
};

const Steps = (props: StepsProps) => {
  const stepsArray = ['step-1', 'step-2', 'step-3', 'step-4'];
  const initialStep = stepsArray[props.initialStep - 1];
  const done = props.done;
  const errorStep = props.errorStep;

  if (done.includes(initialStep)) {
    throw new Error(`Active step can't be included in done props`);
  }

  const steps = props.steps;
  const activeStep = steps.filter((s) => {
    if (s.props.id === initialStep) {
      return s;
    }
  });

  return (
    <>
      <div className='card step-card'>
        <div className={'steps'}>
          {props.titles.map((step, index) => {
            return (
              <a
                key={index}
                href='#step-1'
                className={`${
                  errorStep === index + 1 ? 'error-step' : ''
                } step ${
                  initialStep === `step-${index + 1}` && !errorStep
                    ? 'active-step'
                    : ''
                } ${props.initialStep > index + 1 ? 'done-step' : ''}`}
              >
                {errorStep === index + 1 ? (
                  <DeleteRowIcon />
                ) : props.initialStep !== index + 1 &&
                  props.initialStep > index + 1 ? (
                  <SaveRowIcon />
                ) : (
                  ''
                )}
                <div className='step-info-wrap'>
                  <h3>{step.title || `Step ${index + 1}`}</h3>
                  {step.subTitle ? <p>{step.subTitle}</p> : ''}
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
