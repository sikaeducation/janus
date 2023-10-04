import { createPortal } from "react-dom";
import "./ModalView.scss";
import type { ReactNode } from "react";

type props = {
	onClose: () => void;
	children: ReactNode;
};

export default function ModalView({ onClose, children }: props) {
	return createPortal(<div id="modal-wrapper">
			<div id="modal">
				<div role="presentation" id="modal-shadow" onClick={onClose}>
					&nbsp;
				</div>
				<div id="modal-content">{children}</div>
			</div>
		</div>,
		document.querySelector("#modal-container")!);
}
