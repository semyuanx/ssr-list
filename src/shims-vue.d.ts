

import Vue from 'vue';

interface DialogParam {
    message: any;
    title?: string;
    type?: string;
    duration?: number;
    isSingle?: boolean;
    confirmBtnText?: any;
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
        log: Function;
        isBrowser: () => boolean;
    }
}
