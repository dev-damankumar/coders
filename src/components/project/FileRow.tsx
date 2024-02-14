import If from '../hoc/If';
import IfStandardUser from '../hoc/IfStandardUser';
import CheckBox from '../ui/Form/CheckBox/CheckBox';
import { getImageByExtension } from '../../utils';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import EditRowIcon from '../../assets/icons/EditRowIcon';
import DeleteRowIcon from '../../assets/icons/DeleteRowIcon';
import { deleteSingleFile } from '../../services/files';
import { useNotification } from '../../providers/Notification';
import { FileType } from '../../pages/Xcode/Xcode';
import Image from '../ui/Image';

type FileRowType = {
  files: FileType[] | null;
  setfiles: React.Dispatch<React.SetStateAction<FileType[] | null>>;
  selected: { [any: string]: boolean };
  setSelected: React.Dispatch<React.SetStateAction<{}>>;
  fetchFileContentHandler: (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => Promise<any>;
  isAuthor: boolean;
  filepath: string;
};
const FileRow = ({
  files,
  setfiles,
  selected,
  setSelected,
  fetchFileContentHandler,
  isAuthor,
  filepath,
}: FileRowType) => {
  const notification = useNotification();
  const params = useParams();
  const navigate = useNavigate();
  const projectId = params.id!;
  const handleSingleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (!files) return;
    let checked = e.target.checked;
    let newSelected: { [any: string]: boolean } = { ...selected };
    if (checked) {
      newSelected[name] = true;
    } else {
      delete newSelected[name];
    }
    setSelected(newSelected);
  };

  const deleteFile = async (name: string, index: number) => {
    if (!files) return;
    const fileArray = [...files];
    const details = await deleteSingleFile(name, projectId, filepath);
    if (details.type === 'error')
      return notification.add({
        type: 'error',
        message: details.message,
      });
    if (details.type === 'success') {
      fileArray.splice(index, 1);
      setfiles(fileArray);
      return notification.add({
        type: 'success',
        message: details.message,
      });
    }
  };
  return (
    files &&
    files.map((v, i) => {
      const date = new Date(`2021-06-04T07:59:54.690Z`);
      const extension = v.extension.trim();
      return (
        <tr key={`tr_${i}`}>
          <If cond={isAuthor}>
            <IfStandardUser>
              <td>
                <CheckBox
                  id={v.name}
                  name={v.name}
                  checked={selected[v.name]}
                  onChange={(e) => {
                    handleSingleChange(e, v.name);
                  }}
                />
              </td>
            </IfStandardUser>
          </If>
          <td style={{ width: '250px' }}>
            <a
              className='open-x-code'
              onClick={(e) => {
                e.preventDefault();
                if (extension === 'folder') {
                  navigate(
                    `/xcode/${projectId}?filepath=${encodeURIComponent(
                      v.prevPath!
                    )}`
                  );
                }
                fetchFileContentHandler(
                  v.name,
                  undefined,
                  extension === 'folder'
                );
              }}
            >
              <Image
                alt='dg'
                className='x-file-img'
                src={getImageByExtension(extension)}
              />
              {v.name}
            </a>
          </td>
          <td>
            <div>{extension}</div>
          </td>
          <td>
            <div>{date.toDateString().split(':')[0]}</div>
          </td>
          <If cond={isAuthor}>
            <IfStandardUser>
              <td>
                <ul className='x-actions'>
                  <If
                    cond={
                      Object.keys(selected)?.length === 0 ||
                      Object.keys(selected)?.length === 1
                    }
                    else={
                      <>
                        <li className='x-action-li x-action-li-disabled'>
                          <a className='x-btn'>
                            <EditRowIcon />
                          </a>
                        </li>
                        <li className='x-action-li x-action-li-disabled x-action-delete-row'>
                          <a data-table-tooltip='Delete Row' className='x-btn'>
                            <DeleteRowIcon />
                          </a>
                        </li>
                      </>
                    }
                  >
                    <li className='x-action-li x-action-edit-row'>
                      <NavLink
                        to={`/x-studio/${projectId}`}
                        state={{ filename: v.name, path: v.prevPath }}
                        className='x-btn'
                        title='Edit Row'
                      >
                        <EditRowIcon />
                      </NavLink>
                    </li>
                    <li className='x-action-li x-action-delete-row'>
                      <a
                        title='Delete Row'
                        className='x-btn'
                        onClick={() => {
                          deleteFile(v.name, i);
                        }}
                      >
                        <DeleteRowIcon />
                      </a>
                    </li>
                  </If>
                </ul>
              </td>
            </IfStandardUser>
          </If>
        </tr>
      );
    })
  );
};

export default FileRow;
