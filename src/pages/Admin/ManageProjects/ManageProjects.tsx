import React, {
  Suspense,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import CheckBox from '../../../components/Form/Checkbox/Checkbox';
import IfAdmin from '../../../components/IfAdmin/IfAdmin';
import TableRowSkelton from '../../../components/Skelton/TableRowSkelton';
import '../../../pages/Xcode/Xcode.css';
import Http from '../../../hooks/http';
import homeReducer from '../../../reducers/homeReducer';
import placeholder from '../../../assets/images/placeholder.png';
import Switch from '../../../components/Form/Switch/Switch';
import { DModal, DModalClose } from '../../../utils/dModal';
import { loader } from '../../../utils/';
import BinIcon from '../../../assets/icons/BinIcon';
import LinkIcon from '../../../assets/icons/LinkIcon';
import CopyIcon from '../../../assets/icons/CopyIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import PreIcon from '../../../assets/icons/PreIcon';
import EditRowIcon from '../../../assets/icons/EditRowIcon';
import DeleteRowIcon from '../../../assets/icons/DeleteRowIcon';
import { useAuth } from '../../../providers/Auth';
import Loading from '../../../components/Loading/Loading';
import { env } from '../../../utils';
import {
  cloneProject,
  deleteProject,
  downloadProject,
} from '../../../services/project';
import { useNotification } from '../../../providers/Notification';
import { ProjectsState } from '../../AllProjects/AllProjects';
import Projects from '../../../components/project/Projects';

const Pagination = React.lazy(
  () => import('../../../components/Pagination/Pagination')
);
const DropDown = React.lazy(
  () => import('../../../components/DropDown/DropDown')
);
const ProjectConfig = React.lazy(
  () => import('../../../components/ProjectConfig/ProjectConfig')
);

let rowLoader = <TableRowSkelton rows={5} cols={7} />;

type ManagePropjectState = Omit<ProjectsState, 'filterTags' | 'filterCount'>;

const initialState: ManagePropjectState = {
  projects: [],
  pageNo: 1,
  limit: 10,
  totalProjects: 0,
  nodata: false,
  showDownload: false,
  progress: 0,
  loading: true,
};

const ManageProjects = () => {
  const http = Http();
  const notification = useNotification();
  const auth = useAuth();
  const [state, dispatch] = useReducer(
    homeReducer<ManagePropjectState>,
    initialState
  );
  const [selected, setSelected] = useState({});
  const [checkAll, setcheckAll] = useState(false);
  const projectRef = useRef(null);

  const deleteProjectHandler = async (id) => {
    await deleteProject(id, state.projects, dispatch);
    if (state.projects.length < 2) {
      onPagination(state.pageNo - 1);
    }
  };
  let downloadHandler = (id) => {
    downloadProject(id, dispatch);
  };
  let cloneProjectHandler = async (id) => {
    await cloneProject(id, state.projects, dispatch);
    if (state.projects.length > 9) {
      onPagination(state.pageNo + 1);
    }
  };
  let configHandler = (id) => {
    DModal({
      heading: `Get Prefilled Link`,
      headerIcon: <i className='bx bx-customize'></i>,
      cancelButtonText: 'Cancel',
      successButtonText: 'Ok',
      size: 'sm',
      footer: false,
      body: (
        <Suspense fallback={<Loading />}>
          <ProjectConfig isAuthor={isAuthor} dispatch={dispatch} />
        </Suspense>
      ),
    });
  };
  let confirmHandler = (id, type) => {
    if (type === `delete`)
      DModal({
        heading: `Delete Project`,
        size: 'sm',
        headerIcon: <i className='bx bxs-trash'></i>,
        successButtonText: 'Delete',
        body: (
          <p className={`confirm-msg`}>
            Are you sure you want delete this project permanatly?
          </p>
        ),
        onSuccess: () => {
          deleteProjectHandler(id);
        },
      });
    if (type === `clone`)
      DModal({
        heading: `Clone Project`,
        headerIcon: <i className='bx bx-copy-alt'></i>,
        successButtonText: 'Clone',
        size: 'sm',
        body: (
          <p className={`confirm-msg`}>
            Are you sure you want clone this project?
          </p>
        ),
        onSuccess: () => {
          cloneProjectHandler(id);
        },
      });
  };
  let projectActions = (_id) => {
    return [
      {
        name: 'Make a Copy',
        onClick: () => confirmHandler(_id, `clone`),
        icon: <CopyIcon />,
      },
      'divider',
      {
        name: 'Move to bin',
        onClick: () => confirmHandler(_id, `delete`),
        icon: <BinIcon />,
      },
      {
        name: 'Get pre-filled link',
        onClick: () => configHandler(_id),
        icon: <LinkIcon />,
      },
      {
        name: 'ProjectX editor',
        link: '/x-studio',
        icon: <ScriptIcon />,
      },
      'divider',
      {
        name: 'Download',
        onClick: () => downloadHandler(_id),
        icon: <ImportIcon />,
      },
      {
        name: 'Preferences',
        link: `/admin/edit-project/${_id}`,
        icon: <PreIcon />,
      },
    ];
  };
  useEffect(() => {
    let fetchProjects = async () => {
      try {
        let data = await http.get(
          `${env['REACT_APP_BASE_URL']}/api/manage-projects?pageNo=${state.pageNo}&limit=${state.limit}`
        );
        let projects = data.data;
        if (projects && projects?.length > 0) {
          dispatch({ type: 'SET_TOTAL_PROJECTS', data: data.totalCount });
          dispatch({ type: 'SET_PROJECTS', data: projects });
          dispatch({ type: 'SET_LOADING', data: false });
        } else {
          dispatch({ type: 'SET_PROJECTS', data: [] });
          dispatch({ type: 'SET_NO_DATA', data: true });
          dispatch({ type: 'SET_LOADING', data: false });
        }
      } catch (e) {
        dispatch({ type: 'SET_NO_DATA', data: true });
        dispatch({ type: 'SET_LOADING', data: false });
      }
    };
    fetchProjects();
  }, [state.pageNo, state.limit]);
  let selectAll = (e) => {
    let checked = e.target.checked;
    let tempFiles = [...state?.projects];
    let tempSelected = { ...selected };
    if (checked) {
      setcheckAll(true);
      tempFiles.forEach((v) => {
        tempSelected[v._id] = true;
      });
    } else {
      setcheckAll(false);
      tempFiles.forEach((v) => {
        tempSelected[v._id] = false;
      });
    }
    setSelected(tempSelected);
  };
  let deleteMultiFilesHandler = async () => {
    let selectedTemp = Object.keys(selected);

    let fileArray = [...state?.projects];
    let newFile = fileArray.filter(
      (file) => !selectedTemp.find((sel) => file._id === sel)
    );
    loader.show();
    try {
      loader.show();
      let data = await http.post(
        `${env['REACT_APP_BASE_URL']}/api/delete-projects/`,
        { ids: selectedTemp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (data.type === 'success') {
        dispatch({ type: 'SET_PROJECTS', data: newFile });
        loader.hide();
        setSelected({});
        if (newFile.length < 2) {
          onPagination(state.pageNo - 1);
        }
        toast.success(data.message, 'Deleted');
      }
    } catch (e) {
      loader.hide();
      toast.error(e.message, 'Error Occured');
    }
  };

  let onPagination = (pageNo) => {
    dispatch({ type: 'SET_LOADING', data: true });
    dispatch({ type: 'SET_PAGE_NO', data: pageNo });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  let setProjectPrivacy = async (e, id) => {
    try {
      loader.show();
      let project = await http.post(
        `${env['REACT_APP_BASE_URL']}/api/set-privacy/${id}`,
        {
          visibility: e.target.checked,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      loader.hide();
      if (project.type === 'error') {
        return toast.error(project.message, 'Error Occured');
      }
      if (project.type === 'success') {
        let temp = [...state.projects];
        temp.forEach((v, i) => {
          if (v._id === id) {
            temp[i].visibility = !e.target.checked;
          }
        });
        dispatch({ type: 'SET_PROJECTS', data: [...temp] });
        return toast.success(project.message, 'Successfully Updated');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return (
    <div className='x-code-page'>
      <div className='table-responsive'>
        <table className='table table-compact table-dark table-striped table-warning'>
          <thead className='dark-head'>
            <tr className=''>
              <th className=''>
                <div className=''>Project Name</div>
              </th>
              <th className=''>
                <div className=''>Description</div>
              </th>
              <th className=''>
                <div className=''>Website Url</div>
              </th>
              <th className=''>
                <div className=''>Executable File</div>
              </th>
              <th className=''>
                <div className=''>Tags</div>
              </th>
              <th className=''>
                <div className=''>Visibility</div>
              </th>
              <th className=''>
                <div className=''>Images</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <Projects
              layout='row'
              filterTags=''
              projects={state?.projects}
              nodata={state?.nodata}
            />
          </tbody>
        </table>
      </div>
      {state.totalProjects > state.projects.length && (
        <div className='row'>
          <div className='col-md-12' style={{ textAlign: 'right' }}>
            <Suspense fallback={''}>
              <Pagination
                pageNo={state.pageNo}
                limit={state.limit}
                total={state.totalProjects}
                onPagination={onPagination}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
