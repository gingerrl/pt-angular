import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListUserService } from '../../services/list-user.service';
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent {
  @Output() closeModal = new EventEmitter();

  constructor(
    private readonly deleteService: ListUserService,
    private readonly eventBus: NgEventBus,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onButtonCancel(): void {
    this.closeModal.emit();
  }
  onButtonConfirm(): void {
    this.deleteService.delete(this.data.id).subscribe(() => {
      this.eventBus.cast('delete');
    });
  }
}
