import React, { useEffect, useState } from 'react';
import './EditProject.css';
import placeholder from '../../../assets/images/placeholder.png';
import { WithContext as ReactTags } from 'react-tag-input';
import { joinURL, loader } from '../../../utils/';
import Radio from '../../../components/ui/Form/Radio/Radio';
import { useNavigate } from 'react-router-dom';
import Http from '../../../hooks/http';
import Loading from '../../../components/ui/Loading';
import { env } from '../../../utils';
import { baseImageSrc, baseURL } from '../../../constants';
const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};
let toast = Toast();

const delimiters = [...KeyCodes.enter, KeyCodes.comma];
const EditProject = (props: any) => {
  let http = Http();
  let history = useNavigate();
  let id = props.match.params.id;
  let token = localStorage.getItem('token');
  let [projectDetail, setProjectDetail] = useState();
  let [isOwnProject, setisOwnProject] = useState(false);
  let [projectGridImages, setProjectGridImages] = useState([]);
  let [isTouched, setTouched] = useState(false);
  let [prevImages, setPrevImages] = useState([]);
  const handleDelete = (i: any, data: any) => {
    if (i > -1) {
      data.splice(i, 1);
    }
  };
  const handleAddition = (tag, data) => {
    data.push(tag);
  };

  const onChangeHandler = (type, value) => {
    setTouched(true);
    let obj = { ...projectDetail };
    if (type === 'visibility') {
      if (value === 'public') {
        obj[type] = true;
      } else {
        obj[type] = false;
      }
      setProjectDetail({ ...obj });
    } else if (type === 'image' || type === 'imageGrid') {
      let files = value;
      let tempImage = [...projectGridImages];
      Object.keys(files).forEach((v) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (type === 'image') {
            obj[type] = reader.result;
          }
          if (type === 'imageGrid') {
            obj[type].push(reader.result);
          }
          setProjectDetail({ ...obj });
        };

        tempImage.push(files[v]);
        reader.readAsDataURL(files[v]);
      });
      setProjectGridImages([...tempImage]);
    } else {
      obj[type] = value;
      setProjectDetail({ ...obj });
    }
  };

  const deleteImage = (i) => {
    setTouched(true);
    let project = { ...projectDetail };
    let imgs = [...project.imageGrid];
    let mainImage = [...prevImages];
    imgs.splice(i, 1);
    mainImage.splice(i, 1);
    project.imageGrid = imgs;
    setProjectDetail(project);
    setPrevImages(mainImage);
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    if (isTouched) {
      loader.show();
      let tags = projectDetail.tags.map((v) => {
        return v.text;
      });
      let formData = new FormData(e.target);
      formData.append('tags', tags);
      formData.delete('visibility');
      formData.append('visibility', projectDetail.visibility);
      formData.append('prevImgGrid', prevImages);
      let project = await http.post(
        `${baseURL}/api/edit-project/${id}`,
        formData,
        {
          formData: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (project) {
        toast.success(project.message, 'Project Updated');
        loader.hide();
      }
    }
  };
  useEffect(() => {
    let fetchProject = async () => {
      let project = await http.get(`${baseURL}/api/edit-project/${id}`);
      if (project) {
        if (project.type === 'error') {
          toast.error(project.message);
          history('/');
          return;
        }
        setisOwnProject(true);
        let tags = [...project.tags];
        tags.forEach((v, i) => {
          tags[i] = { id: `${v}_${i}`, text: v };
        });
        let image = project.image;
        image = joinURL(baseImageSrc, image);
        let images = project?.imageGrid ? [...project?.imageGrid] : [];
        setPrevImages(project?.imageGrid ? [...project?.imageGrid] : []);
        images.forEach((v, i) => {
          images[i] = joinURL(baseImageSrc, v);
        });
        setProjectDetail({
          ...project,
          tags: [...tags],
          imageGrid: images,
          image,
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetchProject();
  }, [id]);

  return isOwnProject ? (
    <section
      className='section edit-project-section'
      style={{ paddingTop: '10px' }}
    >
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2
                id='main-heading'
                className='main-h'
                style={{ marginBottom: '30px' }}
              >
                My <span>Projects</span>
              </h2>
            </div>
            <div className='col-md-12'>
              <form onSubmit={saveHandler}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group  '>
                      <label htmlFor='email'>Project Name:</label>
                      <input
                        type='text'
                        placeholder='Enter Your Name'
                        name='title'
                        id='name'
                        className='form-input'
                        value={projectDetail?.title || ''}
                        onChange={(e) => {
                          onChangeHandler('title', e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group  '>
                      <label htmlFor='email'>Description:</label>
                      <input
                        type='text'
                        placeholder='Enter Your Name'
                        name='description'
                        id='name'
                        className='form-input '
                        value={projectDetail?.description || ''}
                        onChange={(e) => {
                          onChangeHandler('description', e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group form-file-group '>
                      <label htmlFor='email'>Select Image:</label>
                      <div className='form-img-group'>
                        <div className='img-wrap-form'>
                          <img
                            alt='select image'
                            src={
                              projectDetail?.image
                                ? projectDetail?.image
                                : placeholder
                            }
                          />
                        </div>
                        <div className='main-file-wrap'>
                          <div className='file-make-div file-sm-div'>
                            <input
                              type='file'
                              name='image'
                              id='image'
                              className='form-input '
                              onChange={(e) => {
                                onChangeHandler('image', e.target.files);
                              }}
                            />
                            <i className='bx bx-plus'></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group form-file-group '>
                      <label htmlFor='email'>Project Images:</label>
                      <div className='form-img-group'>
                        {projectDetail?.imageGrid?.map((img, i) => {
                          return (
                            <div className='img-wrap-form'>
                              <img alt={img} src={img ? img : placeholder} />
                              <a
                                href='#'
                                onClick={() => {
                                  deleteImage(i);
                                }}
                                className='close-form-img'
                              >
                                <i className='bx bx-x'></i>
                              </a>
                            </div>
                          );
                        })}

                        <div className='main-file-wrap'>
                          <div className='file-make-div file-sm-div'>
                            <input
                              type='file'
                              name='imageGrid'
                              id='image'
                              className='form-input '
                              multiple={true}
                              onChange={(e) => {
                                onChangeHandler('imageGrid', e.target.files);
                              }}
                            />
                            <i className='bx bx-plus'></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group  '>
                      <label htmlFor='email'>Tags:</label>
                      {projectDetail?.tags ? (
                        <ReactTags
                          autofocus={false}
                          tags={projectDetail.tags}
                          handleDelete={(i) => {
                            handleDelete(i, projectDetail.tags);
                          }}
                          handleAddition={(i) => {
                            handleAddition(i, projectDetail.tags);
                          }}
                          delimiters={delimiters}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group  '>
                      <label htmlFor='email'>Set Privacy:</label>
                      <div className='form-group '>
                        <div className='inline-form'>
                          <Radio
                            label='Public'
                            name='visibility'
                            id='public'
                            value='public'
                            onChange={(e) => {
                              onChangeHandler('visibility', e.target.value);
                            }}
                            checked={projectDetail?.visibility === true}
                          />

                          <Radio
                            label='Public'
                            name='visibility'
                            id='private'
                            value='private'
                            onChange={(e) => {
                              onChangeHandler('visibility', e.target.value);
                            }}
                            checked={projectDetail?.visibility === true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group '>
                      <label htmlFor='email'>Select Executable:</label>
                      <select
                        name='executableFile'
                        className='form-input '
                        onChange={(e) => {
                          onChangeHandler('executableFile', e.target.value);
                        }}
                      >
                        {projectDetail?.executables.map((option) => {
                          return (
                            <option
                              selected={
                                projectDetail?.executableFile === option.name
                              }
                            >
                              {option.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='form-group' style={{ marginTop: '20px' }}>
                      <button type='submit' className='btn btn-dark'>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  ) : (
    <Loading />
  );
};

export default EditProject;
