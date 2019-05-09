import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { RouterModule } from '@angular/router';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { NoteComponent } from './component/note/note.component';
import { IconComponent } from './component/icon/icon.component';
import { DialogboxComponent } from './component/dialogbox/dialogbox.component';
import { TrashComponent } from './component/trash/trash.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    DashBoardComponent,
    AddNoteComponent,
    NoteComponent,
    IconComponent,
    DialogboxComponent,
    TrashComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule
  ],
  providers: [],
  entryComponents:[DialogboxComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
