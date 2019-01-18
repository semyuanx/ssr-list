

import Vue from 'vue';

interface DialogParam {
    message: string;
    title?: string;
    type?: string;
    duration?: number;
    isSingle?: boolean;
    confirmBtnText?: string;
    cancelBtnText?: string;
    onConfirm?: Function;
    onCancel?: Function;
    showClose?: boolean;
}

declare module 'vue/types/vue' {
    interface Vue {
        $fmdialog: (config: DialogParam) => any;
        $errorDialog: Function;
        base: string;
        kaiHu: string;
        cdn: string;
        redirectTo: Function;
        isObject: Function;
    }
}
