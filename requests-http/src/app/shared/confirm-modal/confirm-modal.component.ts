import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() cancelText = 'Cancelar';
  @Input() okText = 'Ok';

  confirmResult!: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }

  onClose() {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }
}
