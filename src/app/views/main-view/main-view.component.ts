import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import { ModalComponent } from '../../components/modal-dialog/modal-dialog.component';
import { User } from '../../interface/data-list.interface';
import { ListUserService } from '../../services/list-user.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  dataList: User[] = [];
  dataListFilter: User[] = [];
  isLoading: boolean = false;
  showModalUser: boolean = false;
  public dialog = inject(MatDialog);

  constructor(
    private readonly listService: ListUserService,
    private readonly eventBus: NgEventBus
  ) {}
  ngOnInit(): void {
    this.eventBus.on('list').subscribe(() => {
      this.onListProduct();
    });
    this.eventBus.on('update').subscribe(() => {
      this.onListProduct();
    });
    this.eventBus.on('delete').subscribe(() => {
      this.onListProduct();
    });
    this.onListProduct();
  }

  onButtonAdd() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onListProduct(): void {
    this.isLoading = true;
    this.listService.getLists().subscribe((data) => {
      this.isLoading = false;
      this.dataList = data;
      this.dataListFilter = data;
    });
  }
}
