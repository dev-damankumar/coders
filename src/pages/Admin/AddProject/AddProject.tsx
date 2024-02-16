import React, { useEffect, useState } from 'react';
import Steps from '../../../components/ui/Steps/Steps';
import { loader } from '../../../utils/';
import {
  formStructure,
  executableStructure,
} from '../../../models/addProjectModel';
import { NavLink } from 'react-router-dom';
import { addExe, addProject } from '../../../services/project';
import { useNotification } from '../../../providers/Notification';

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
  let [done, setDone] = useState<string[]>([]);
  let [projectId, setProjectId] = useState();
  const notification = useNotification();
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

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const div = document.querySelector('#main-scroll');
    if (div) div.scrollIntoView({ behavior: 'smooth' });

    loader.show();
    const form = new FormData(e.target!);
    form.append('executableFile', 'default');
    const tags = formConfig.tags.options.map((v: { text: string }) => {
      return v.text;
    });
    form.append('tags', tags);

    const project = await addProject(form);
    loader.hide();
    if ('error' in project) {
      return notification.error(project.message);
    }

    if (project.data.code === 'LIMIT_FILE_SIZE') {
      return notification.error(project.message);
    }

    const prevDone = [...done];
    // prevDone.push(initialStep);
    setDone(prevDone);
    setStep(initialStep + 1);
    // const data = project.data;
    // const options = data.map((v) => {
    //   return {
    //     value: v.name,
    //     config: {
    //       id: v.name,
    //       name: v.name,
    //     },
    //   };
    // });
    // const exes = { ...executableStructure };
    // exes.executableFile.options = options;
    // setProjectId(project.project._id);
    // setExeConfig(exes);
  };

  const onExeHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    loader.show();
    const div = document.querySelector('#main-scroll');
    if (div) div.scrollIntoView({ behavior: 'smooth' });
    e.preventDefault();
    const form = new FormData(e.target);
    const body: any = { id: projectId };
    form.forEach(function (value: any, key: any) {
      body[key] = value;
    });
    try {
      const project = await addExe(body);
      if ('error' in project) {
        return notification.error(project.message);
      }

      const prevDone = [...done];
      // prevDone.push(initialStep);
      setDone(prevDone);
      setStep(initialStep + 1);
      resetHandler();
      return notification.success(project.message);
    } catch (error) {
    } finally {
      loader.hide();
    }
  };

  let onChangeHandle = (e, fieldName, state) => {
    // let formState = onChangeHandler(e, fieldName, state);
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

  const steps = [
    <div id={'step-1'} key={'step-1'}>
      <div className='col-md-12'>
        {/* <Form
          style={{ padding: '10px 0' }}
          onSubmit={onSubmitHandler}
          config={formConfig}
          action={'#'}
          onChange={onChangeHandle}
        /> */}
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
        {/* <Form
          style={{ padding: '10px 0' }}
          onSubmit={onExeHandler}
          config={exeConfig}
          action={'#'}
          onChange={onChangeHandle}
        /> */}
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
