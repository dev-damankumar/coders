import { Notification } from "../providers/Notification";
import Toast from "./Toast/Toast";
import React from "react";

const Message = ({ list }: { list: Notification[] }) => {
  return (
    <div className="fixed bottom-2 right-2 flex gap-2 flex-col z-50">
      {list.map((l) => {
        return <Toast key={l.id} {...l} />;
      })}
    </div>
  );
};

export default React.memo(Message);
