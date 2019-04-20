import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatDialogModule, MatTableModule, MatMenuModule, MatProgressSpinnerModule, MatSidenavModule, MatSelectModule, MatGridListModule, MatListModule, MatSnackBarModule, MatTooltipModule, MatRadioModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:[],
    imports:[
        BrowserModule,
        MatInputModule,
        AppRoutingModule,
        MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
        MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,FormsModule,CommonModule,
        MatRadioModule,
        MatDialogModule,
        HttpClientModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatMenuModule,
        MatChipsModule,
        MatTooltipModule, MatGridListModule,
        FormsModule
    ],
    exports:[
        BrowserModule,
        MatInputModule,
        AppRoutingModule,
        MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
        MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,FormsModule,CommonModule,
        MatRadioModule,
        MatDialogModule,
        HttpClientModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatMenuModule,
        MatChipsModule,
        MatTooltipModule, MatGridListModule,
    ]
})
export class Material {
}
