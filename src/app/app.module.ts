import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgEventBus } from 'ng-event-bus';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { ListUserService } from './services/list-user.service';
import { MainViewComponent } from './views/main-view/main-view.component';
import { ModalComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    TableListComponent,
    ModalDeleteComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    provideAnimationsAsync(),
    ListUserService,
    NgEventBus,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
