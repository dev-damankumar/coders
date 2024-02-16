import { getImageByExtension } from '../../utils/helper';

type XStudioTabsProps = {
  tabs: string[];
  fetchFileContentHandler: (
    name: string,
    prevPath?: string,
    isFolder?: boolean
  ) => Promise<any>;
  activeTab: string;
  closeTab: (name: string) => void;
};
const XStudioTabs = ({
  tabs,
  fetchFileContentHandler,
  activeTab,
  closeTab,
}: XStudioTabsProps) => {
  return (
    tabs &&
    tabs.length > 0 && (
      <div className='x-tabs'>
        {tabs.map((v, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                fetchFileContentHandler(v);
              }}
              className={activeTab === v ? 'x-studio-active-tab' : ''}
            >
              <button title={v} type='button' className='x-tab'>
                <img src={getImageByExtension(v.split('.')[1])} />{' '}
                <span>{v}</span>
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  closeTab(v);
                }}
                className='x-tab-close'
              >
                &times;
              </button>
            </li>
          );
        })}
      </div>
    )
  );
};

export default XStudioTabs;
