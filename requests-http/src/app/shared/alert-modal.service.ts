import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertType {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})

export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertType, timeout?: number) {
    const _bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    _bsModalRef.content.type = type;
    _bsModalRef.content.message = message;

    if (timeout) {
      setTimeout(() => _bsModalRef.hide(), timeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertType.DANGER);
  }
  
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertType.SUCCESS, 3000);
  }

  showConfirm(
    title: string,
    message: string,
    okText?: string,
    cancelText?: string) {
      
      const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
      bsModalRef.content.title = title;
      bsModalRef.content.message = message;

      if (okText) {
        bsModalRef.content.okText = okText;
      }

      if (cancelText) {
        bsModalRef.content.cancelText = cancelText;
      }

      return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
