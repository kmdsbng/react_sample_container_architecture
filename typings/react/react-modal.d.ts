// Type definitions for react-modal v0.6.1
// Project: 
// Definitions by: 
// Definitions: 

/// <reference path="../react/react.d.ts" />

declare module "react-modal" {
    import Modal = ReactModal.Modal;
    export = Modal;
}

declare var Modal: typeof ReactModal.Modal;

declare namespace ReactModal {
    import React = __React;

    interface Style {
        content?: Object;
        overlay?: Object;
    }

    interface Props extends React.Props<Modal>{
        isOpen?: boolean;
        style?: Style;
        appElement?: Object;
        onRequestClose?: () => void;
        closeTimeoutMS?: number;
        ariaHideApp?: boolean;
    }

    class Modal extends React.Component<Props, {}> {
    }

    namespace Modal {
    }
}

