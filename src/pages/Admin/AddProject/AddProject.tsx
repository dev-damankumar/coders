import { useEffect, useState } from 'react';
import Form, { onChangeHandler } from '../../../components/Form/Form';
import Steps from '../../../components/Steps/Steps';
import Http from '../../../hooks/http';
import { loader } from '../../../utils/';
import {
  formStructure,
  executableStructure,
} from '../../../models/addProjectModel';
import { NavLink } from 'react-router-dom';
import { env } from '../../../utils';

function AddProject() {
  let mainformStructure = JSON.parse(JSON.stringify(formStructure));
  let mainexecutableStructure = JSON.parse(JSON.stringify(executableStructure));
  let [formConfig, setFormConfig] = useState(
    JSON.parse(JSON.stringify(formStructure))
  );
  let [exeConfig, setExeConfig] = useState(
    JSON.parse(JSON.stringify(executableStructure))
  );
  let [initialStep, setStep] = useState(1);
  let [done, setDone] = useState([]);
  let [projectId, setProjectId] = useState();
  let http = Http();
  useEffect(() => {
    let errorEl = document.querySelector('.hasError');
    if (errorEl) {
      errorEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [formConfig]);

  let onSubmitHandler = async (e) => {
    document
      .querySelector('#main-scroll')
      .scrollIntoView({ behavior: 'smooth' });
    e.preventDefault();
    let isInvalid = isFormInvalid();
    if (isInvalid) {
      Object.keys(formConfig).forEach((formInput) => {
        let newForm = { ...formConfig };
        newForm[formInput].touched = true;
        setFormConfig(newForm);
      });
    } else {
      loader.show();
      let form = new FormData(e.target);
      form.append('executableFile', 'default');
      let tags = formConfig.tags.options.map((v) => {
        return v.text;
      });
      form.append('tags', tags);

      let project = await http.post(
        `${env['REACT_APP_BASE_URL']}/api/add-project/`,
        form,
        {
          formData: true,
        }
      );
      loader.hide();
      if (project.type === 'error') {
        return toast.error(project.message, 'Error Occured');
      }

      if (project.code === 'LIMIT_FILE_SIZE') {
        return toast.error(project.message, 'Error Occured');
      }

      if (project.type === 'success') {
        let prevDone = [...done];
        prevDone.push(initialStep);
        setDone(prevDone);
        setStep(initialStep + 1);
        let data = project.data;
        let options = data.map((v) => {
          return {
            value: v.name,
            config: {
              id: v.name,
              name: v.name,
            },
          };
        });
        let exes = { ...executableStructure };
        exes.executableFile.options = options;
        setProjectId(project.project._id);
        setExeConfig(exes);
      }
    }
  };
  let onExeHandler = async (e) => {
    document
      .querySelector('#main-scroll')
      .scrollIntoView({ behavior: 'smooth' });
    e.preventDefault();
    loader.show();
    let form = new FormData(e.target);
    var body = { id: projectId };
    form.forEach(function (value, key) {
      body[key] = value;
    });
    let project = await http.post(
      `${env['REACT_APP_BASE_URL']}/api/add-exe/`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (project.type === 'error') {
      loader.hide();
      return toast.error(project.message, 'Error Occured');
    }

    if (project.type === 'success') {
      loader.hide();
      let prevDone = [...done];
      prevDone.push(initialStep);
      setDone(prevDone);
      setStep(initialStep + 1);
      resetHandler();
      return toast.success(project.message, 'Success');
    }
  };

  let isFormInvalid = () => {
    return Object.keys(formConfig).some((formInput) => {
      return formConfig[formInput].valid === false;
    });
  };
  let onChangeHandle = (e, fieldName, state) => {
    let formState = onChangeHandler(e, fieldName, state);
    setFormConfig(formState);
  };

  let resetHandler = () => {
    setFormConfig({ ...mainformStructure });
    setExeConfig({ ...mainexecutableStructure });
  };

  let resetForm = (e) => {
    e.preventDefault();
    setStep(1);
    setDone([]);
    setProjectId(null);
  };

  let steps = [
    <div id={'step-1'} key={'step-1'}>
      <div className='col-md-12'>
        <Form
          style={{ padding: '10px 0' }}
          onSubmit={onSubmitHandler}
          config={formConfig}
          action={'#'}
          onChange={onChangeHandle}
        />
      </div>
    </div>,
    <div id={'step-2'} key={'step-2'}>
      <div className='col-md-12'>
        <h2
          className='main-h'
          style={{ marginBottom: '30px', padding: '10px' }}
        >
          Select <span>Excecutable</span>
        </h2>
      </div>
      <div className='col-md-12'>
        <Form
          style={{ padding: '10px 0' }}
          onSubmit={onExeHandler}
          config={exeConfig}
          action={'#'}
          onChange={onChangeHandle}
        />
      </div>
    </div>,
    <div id={'step-3'} key={'step-3'}>
      <div className='alert alert-success'>
        <h1>Project Uploaded Successfully</h1>
        <p>
          Your project has been uploaded and you can view it now on home page
        </p>
        <NavLink to='/'>
          <button type='button' className='btn btn-small btn-light'>
            Go To Home Page
          </button>
        </NavLink>
        <a href='#' onClick={resetForm}>
          <button
            style={{ marginLeft: '10px' }}
            className='btn btn-small btn-primary'
          >
            Add New Project
          </button>
        </a>
      </div>
    </div>,
  ];
  return (
    <section style={{ paddingTop: '10px' }}>
      <div className='row'>
        <div className='col-md-12'>
          <Steps
            titles={[
              { subTitle: 'General Setup', title: '' },
              { subTitle: 'Select Executable File', title: '' },
            ]}
            initialStep={initialStep}
            steps={steps}
            done={done}
          />
        </div>
      </div>
    </section>
  );
}

export default AddProject;
