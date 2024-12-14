import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import {
  Department,
  Post,
} from '../../interface/data-list.interface';
import { ListUserService } from '../../services/list-user.service';


@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],

})
export class ModalComponent implements OnInit {
  isCreate = true;
  showModalClose = false;
  showUpdate = false;
  selectDepart: Department[] = [];
  selectPost: Post[] = [];
  form: FormGroup = this.fb.group({
    id: [''],
    user: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    firstName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    middleName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    firstSurname: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    secondLastName: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    department: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    ],
    post: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    ],

    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private listService: ListUserService,
    private readonly eventBus: NgEventBus,
    @Inject(MAT_DIALOG_DATA) public updateData: any
  ) {
    (this.selectDepart = [
      {
        nameDepa: 'Technology',
      },
      {
        nameDepa: 'People',
      },
      {
        nameDepa: 'Redes',
      },
      {
        nameDepa: 'Marketing',
      },
    ]),
      (this.selectPost = [
        {
          namePost: 'Desarrollador',
        },
        {
          namePost: 'Administrador',
        },
        {
          namePost: 'Analista de redes',
        },
        {
          namePost: 'Analista de marketing',
        },
      ]);
  }

  ngOnInit(): void {
    if (this.updateData) {
      this.isCreate = false;
      this.onListChanges();
    }
  }

  onListAdd() {
    this.form.patchValue({
      id: Math.random().toString(16).slice(2),
    });
    this.listService.addProduct(this.form.value).subscribe((data) => {
      this.eventBus.cast('list', data);
      this.showModalClose = true
    });
  }

  onListUpdate() {
    this.listService.updateProduct(this.form.value).subscribe((data) => {
      this.eventBus.cast('update', data);
      this.showModalClose = true
    });
  }

  onListChanges() {
    this.form.setValue({
      id: this.updateData.id,
      user: this.updateData.user,
      firstName: this.updateData.firstName,
      middleName: this.updateData.middleName,
      firstSurname: this.updateData.firstSurname,
      secondLastName: this.updateData.secondLastName,
      department: this.updateData.department,
      post: this.updateData.post,
      email: this.updateData.email,
    });
  }
}
