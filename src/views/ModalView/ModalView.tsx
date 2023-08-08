/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createPortal } from "react-dom";
import "./ModalView.scss";
import type { ReactNode } from "react";

type props = {
  close: () => void;
  children: ReactNode;
};

export default function ModalView({ close, children }: props) {
  return createPortal(
    <div id="modal-wrapper">
      <div id="modal">
        <div role="presentation" id="modal-shadow" onClick={close}>
          &nbsp;
        </div>
        <div id="modal-content">{children}</div>
      </div>
    </div>,
    document.querySelector("#modal-container")!,
  );
}
