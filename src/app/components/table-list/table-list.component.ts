import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interface/data-list.interface';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ModalComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  @Input() dataList: User[] = [];
  @Output() listEvent = new EventEmitter();

  listProduct: User[] = [];
  showModalDelete = false;
  selectList: User = {
    id: '',
    user: '',
    firstName: '',
    middleName: '',
    firstSurname: '',
    secondLastName: '',
    department: '',
    post: '',
    email: '',
  };
  public dialog = inject(MatDialog);

  constructor() {}
  ngOnInit(): void {
    console.log(this.listProduct)
  }

   ngOnChanges(changes: SimpleChanges): void {
     this.listProduct = changes?.['dataList'].currentValue.slice(0, 5);
   }

   onDropDown(e: any) {
     this.listProduct = this.dataList.slice(0, e.target.value);
   }

  onButtonEdit(item: User) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onButtonDelete(item: User) {
    this.selectList = item;
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: this.selectList,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
