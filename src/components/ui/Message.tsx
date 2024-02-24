import { Notification } from '../../providers/Notification';
import Toast from './Toast/Toast';
import React from 'react';

const Message = ({ list }: { list: Notification[] }) => {
  return (
    <div className='message-wrapper'>
      {list.map((l) => {
        return <Toast key={l.id} {...l} />;
      })}
    </div>
  );
};

export default React.memo(Message);
