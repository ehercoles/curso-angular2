import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertType {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})

export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertType) {
    const _bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    _bsModalRef.content.type = type;
    _bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertType.DANGER);
  }
  
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertType.SUCCESS);
  }
}
