import React, { useEffect, useState } from 'react';
import classes from './SearchFile.module.css';
import FileListSkelton from '../../ui/Skelton/FileListSkelton';
import SearchIcon from '../../../assets/icons/SearchIcon';
import { getImageByExtension } from '../../../utils';
import { FileType } from '../../../pages/Xcode/Xcode';
import { goBackPaths } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import Image from '../../ui/Image';

type SearchFileType = {
  input?: React.ReactNode;
  dark?: boolean;
  if?: boolean;
  files: FileType[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileType[] | null>>;
  prevPath: string;
  fetchFileContentHandler: (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => Promise<any>;
};
const SearchFile = (props: SearchFileType) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openSearchModel, setOpenSearchModel] = useState(false);
  const files = props.files || [];
  const [searchArray, setSearchArray] = useState(props.files);

  const searchFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();
    const newFileArray = files.filter((v) => {
      if (v.name.toLowerCase().includes(search)) {
        return v;
      }
    });
    setSearchArray(newFileArray);
  };

  useEffect(() => {
    if (Array.isArray(props.files)) {
      props.setFiles(props.files);
      setSearchArray(props.files);
    }
  }, [props.files]);

  const goToXcode = () => {
    const paths = goBackPaths(props.prevPath);
    props.fetchFileContentHandler(paths.name, paths.prevPath, true);
  };

  return (
    <>
      {props.input ? (
        <span
          onClick={() => {
            setOpenSearchModel(true);
          }}
        >
          {props.input}
        </span>
      ) : (
        <input
          spellCheck={false}
          type='text'
          placeholder='Search Files...'
          className='form-input'
          onFocus={() => {
            setOpenSearchModel(true);
          }}
        />
      )}

      {openSearchModel && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as Element;
            if (target.classList.contains(classes['search-overlay'])) {
              setOpenSearchModel(false);
            }
          }}
          className={`${classes['search-overlay']} ${
            props.dark ? classes['search-dark-theme'] : ''
          }`}
        >
          <div className={classes['input-wrapper']}>
            <div className={classes['input-div']}>
              <div className={classes['search-icon']}>
                {props.prevPath !== '/' ? (
                  <button
                    onClick={goToXcode}
                    type='button'
                    className='go-back-search-btn'
                  >
                    <i className='bx bx-arrow-back'></i>
                  </button>
                ) : (
                  ''
                )}
                <SearchIcon />
              </div>
              <input
                type='text'
                value={searchTerm}
                onChange={searchFile}
                placeholder='Search Files'
                autoFocus={true}
              />
            </div>
            <div className={classes['file-wrapper']}>
              {searchArray && searchArray.length === 0 ? (
                <>
                  <FileListSkelton dark={props.dark} />
                  <FileListSkelton dark={props.dark} />
                  <FileListSkelton dark={props.dark} />
                  <FileListSkelton dark={props.dark} />
                  <FileListSkelton dark={props.dark} />
                </>
              ) : (
                searchArray?.map((v, i) => {
                  const extension = v.extension.trim();
                  return (
                    <div key={i} className={classes['file-list']}>
                      <div
                        onClick={async (e) => {
                          e.preventDefault();
                          await props.fetchFileContentHandler(
                            v.name,
                            v.prevPath,
                            extension === 'folder'
                          );
                          setSearchTerm('');
                          setSearchArray(props.files);
                          if (extension !== 'folder') {
                            setOpenSearchModel(false);
                            navigate({
                              search: `?filename=${encodeURIComponent(
                                v.name
                              )}&filepath=${encodeURIComponent(v.prevPath!)}`,
                            });
                          }
                        }}
                        data-file-type={extension}
                        className={classes['file-div']}
                        data-modal-open='x-code'
                      >
                        <div className={classes['file-icon']}>
                          <Image
                            alt='dg'
                            className='x-file-img'
                            src={getImageByExtension(extension)}
                          />
                        </div>
                        <div className={classes['file-info']}>
                          <h3>{v.name}</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Atque, laborum!
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFile;
