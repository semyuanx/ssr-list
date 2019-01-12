

import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $fmdialog: Function;
        $errorDialog: Function;
        base: string;
        kaiHu: string;
        cdn: string;
        redirectTo: Function;
        isObject: Function;
    }
}
