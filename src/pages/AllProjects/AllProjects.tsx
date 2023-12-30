import React, { useEffect, useRef, Suspense, useReducer } from "react";
import "../Home/Home.css";
import CardRowSkelton from "../../components/Skelton/CardRowSkelton";
import { DModalClose, DModal } from "../../utils/dModal";
import Http from "../../hooks/http";
import {
  downloadProject,
  cloneProject,
  deleteProject,
} from "../../utils/services";
import homeReducer from "../../reducers/homeReducer";
import Loading from "../../components/Loading/Loading";
import ImportIcon from "../../assets/icons/ImportIcon";
import FilterTags from "../../components/FilterTags/FilterTags";
import { useLocation } from "react-router";
import If from "../../components/If/If";
import Heading from "../../components/Heading/Heading";
import { env } from "../../utils";

const ProjectCard = React.lazy(
  () => import("../../components/ProjectCard/ProjectCard")
);
const ProjectConfig = React.lazy(
  () => import("../../components/ProjectConfig/ProjectConfig")
);
const Modal = React.lazy(() => import("../../components/Modal/Modal"));
const NoData = React.lazy(() => import("../../components/NoData/NoData"));
const Pagination = React.lazy(
  () => import("../../components/Pagination/Pagination")
);
let initialState = {
  projects: [],
  pageNo: 1,
  filterTags: null,
  filterCount: 1,
  limit: 10,
  totalProjects: 0,
  nodata: false,
  showDownload: false,
  progress: 0,
  loading: true,
};

const AllProjects = React.memo((props) => {
  let [state, dispatch] = useReducer(homeReducer, initialState);
  let http = Http();
  let projectRef = useRef(null);
  let location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let tag = location.hash.replace("#", "");
      if (tag === "all") {
        tag = null;
      }
      let projects = [...state.projects];
      if (tag) {
        let projectCount = projects.filter((v) => {
          return v.tags.includes(tag);
        });
        dispatch({ type: "SET_FILTER_COUNT", data: projectCount.length });
      }
      dispatch({ type: "SET_FILTER_TAG", data: tag });
    }
  }, [location.hash]);
  useEffect(() => {
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: "smooth" });
    }
    window.addEventListener("fetch-progress", (e) => {
      setProgressbarValue(e.detail);
    });
  }, []);
  useEffect(() => {
    let fetchProjects = async () => {
      try {
        let data = await http.get(
          `${env["REACT_APP_BASE_URL"]}/api/projects?pageNo=${state.pageNo}&limit=${state.limit}`
        );
        let projects = data.data;
        if (projects && projects?.length > 0) {
          dispatch({
            type: "SET_TOTAL_PROJECTS",
            data: data.totalCount,
          });
          dispatch({ type: "SET_PROJECTS", data: projects });
          dispatch({ type: "SET_LOADING", data: false });
        } else {
          dispatch({ type: "SET_NO_DATA", data: true });
          dispatch({ type: "SET_LOADING", data: false });
        }
        if (projectRef && projectRef.current) {
          projectRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        dispatch({ type: "SET_NO_DATA", data: true });
        dispatch({ type: "SET_LOADING", data: false });
      }
    };
    fetchProjects();
  }, [state.pageNo, state.limit]);

  let confirmHandler = (id, type) => {
    if (type === `delete`)
      DModal({
        heading: `Delete Project`,
        size: "sm",
        headerIcon: <i className="bx bxs-trash"></i>,
        successButtonText: "Delete",
        body: (
          <p className={`confirm-msg`}>
            Are you sure you want delete this project permanatly?
          </p>
        ),
        onSuccess: async () => {
          await deleteProjectHandler(id);
        },
      });
    if (type === `clone`)
      DModal({
        heading: `Clone Project`,
        headerIcon: <i className="bx bx-copy-alt"></i>,
        successButtonText: "Clone",
        size: "sm",
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
  let cloneProjectHandler = async (id) => {
    await cloneProject(id, state.projects, dispatch);
    if (state.projects.length > 9) {
      onPagination(state.pageNo + 1);
    }
  };
  let deleteProjectHandler = async (id) => {
    await deleteProject(id, state.projects, dispatch);
    if (state.projects.length < 2) {
      onPagination(state.pageNo - 1);
    }
  };
  let downloadHandler = (id) => {
    downloadProject(id, dispatch);
  };
  let setProgressbarValue = (payload) => {
    const { receivedLength, length } = payload;
    const value = ((receivedLength / length) * 100).toFixed(2);
    if (!isNaN(value)) {
      dispatch({ type: "SET_PROGRESS", data: value });
      return value;
    }
  };
  let configHandler = (id) => {
    DModal({
      heading: `Get Prefilled Link`,
      headerIcon: <i className="bx bx-customize"></i>,
      cancelButtonText: "Cancel",
      successButtonText: "Ok",
      size: "sm",
      footer: false,
      body: (
        <Suspense fallback={<Loading />}>
          <ProjectConfig
            downloadProject={() => {
              DModalClose();
              downloadHandler(id);
            }}
            projectId={id}
          />
        </Suspense>
      ),
    });
  };
  let onPagination = (pageNo) => {
    dispatch({ type: "SET_LOADING", data: true });
    dispatch({ type: "SET_PAGE_NO", data: pageNo });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Modal
          heading={`Downloading...`}
          headerIcon={<i className="bx bx-cloud-download" />}
          show={state.showDownload}
          onClose={() => {
            dispatch({ type: "SET_DOWNLOAD", data: false });
          }}
          body={
            <div className={`download-wrap`}>
              <p className={`confirm-msg`}>
                Your file is downloading. It will take some time please wait...
              </p>
              <ImportIcon />
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: state.progress + `%` }}
                >
                  <span className={`progress-span`}>{state.progress}%</span>
                </div>
              </div>
            </div>
          }
        />
      </Suspense>
      <section
        className="section form-creation-wrap"
        style={{ paddingTop: "10px", marginTop: "-100px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12" ref={projectRef}>
              <Heading
                as="h2"
                id="my-projects"
                className="main-h"
                style={{ marginBottom: "30px", paddingTop: "100px" }}
              >
                Collaborative Projects
              </Heading>
            </div>
            <FilterTags tags={state?.filterTags} dispatch={dispatch} />
            <Suspense fallback={""}>
              <NoData if={state.projects.length <= 0 && state.nodata} />
            </Suspense>

            <NoData if={state?.filterCount === 0} />
            <If
              cond={
                !(
                  (state.projects.length === 0 && !state.nodata) ||
                  state.loading
                )
              }
              else={<CardRowSkelton />}
            >
              {state.projects.map((v, i) => {
                return (
                  <Suspense key={i} fallback={<CardRowSkelton />}>
                    <ProjectCard
                      image={v.image}
                      filterTags={state?.filterTags}
                      author={v.user_id}
                      index={i}
                      description={v.description}
                      visibility={v.visibility}
                      tags={v.tags}
                      title={v.title}
                      url={"/project-detail/" + v._id}
                      imgSrc={env["REACT_APP_BASE_URL"]}
                      confirmHandler={confirmHandler}
                      downloadProjectHandler={downloadHandler}
                      _id={v._id}
                      configHandler={configHandler}
                    />
                  </Suspense>
                );
              })}
            </If>
          </div>
          <If
            cond={
              state?.totalProjects > state?.projects?.length &&
              state?.totalProjects > 10
            }
          >
            <div className="row">
              <div className="col-md-12" style={{ textAlign: "right" }}>
                <If cond={state.projects.length > 0}>
                  <Suspense fallback={""}>
                    <Pagination
                      pageNo={state.pageNo}
                      limit={state.limit}
                      total={state.totalProjects}
                      onPagination={onPagination}
                    />
                  </Suspense>
                </If>
              </div>
            </div>
          </If>
        </div>
      </section>
    </>
  );
});

export default React.memo(AllProjects);
