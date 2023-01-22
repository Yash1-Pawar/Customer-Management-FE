import * as bootstrap from "bootstrap";

export class ToastUtility {

    static showToast(toastMessage: string, toastBgc: string) {
        const toastLiveExample = document.getElementById('toast') as HTMLElement;
        let toastBody = toastLiveExample.getElementsByClassName('toast-body').item(0);
        toastBody!.innerHTML = toastMessage;
        toastBody!.className = 'toast-body ' + toastBgc;
        console.log(toastLiveExample);
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    }

}