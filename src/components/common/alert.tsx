"use client";

import { alertActionClassName, useAlertStore } from "@/stores";
import { useEffect } from "react";

export const Alert = () => {
  const { visible, title, message, actions, dismiss } = useAlertStore();
  useEffect(() => {
    if (!document) return;

    if (visible) {
      (document as any).getElementById("root_alert").showModal();
    } else {
      (document as any).getElementById("root_alert").close();
    }
  }, [visible]);

  return (
    <dialog id="root_alert" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <div className="space-x-4">
            {actions?.map((action, index) => (
              <button
                key={index}
                className={alertActionClassName(action?.style)}
                onClick={action?.onClick ?? dismiss}
              >
                {action?.lable}
              </button>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
};
