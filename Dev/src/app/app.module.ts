import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './views/main/main.component';
import { TopicsComponent } from './views/topics/topics.component';
import { DoctagsComponent } from './views/doctags/doctags.component';
import { TopicComponent } from './views/topic/topic.component';
<<<<<<< HEAD
import { ExamplesDialogComponent } from './dialogs/examples-dialog/examples-dialog.component';
import { LogoComponent } from './views/logo/logo.component';
=======

import { ExamplesDialogComponent,
         TopicDialogComponent,
         DoctagDialogComponent,
         DoctagVersionsDialogComponent } from './dialogs';
>>>>>>> b13dd6178ee22ecc280da4e98aa3d4a4049e4c64

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
<<<<<<< HEAD
import {
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatTabsModule
} from '@angular/material';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollEventModule } from 'ngx-scroll-event';
=======
import { MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatSelectModule,
         MatButtonModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatDialogModule,
         MatAutocompleteModule} from '@angular/material';
>>>>>>> d978c1b4bd747faa3c8899cfb6b34681adc94e67


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopicsComponent,
    DoctagsComponent,
    DoctagDialogComponent,
    TopicDialogComponent,
    TopicComponent,
<<<<<<< HEAD
    ExamplesDialogComponent
    LogoComponent
=======
    ExamplesDialogComponent,
    DoctagVersionsDialogComponent
>>>>>>> b13dd6178ee22ecc280da4e98aa3d4a4049e4c64
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ScrollToModule.forRoot(),
    ScrollEventModule,
    MatTabsModule
=======
    MatAutocompleteModule
>>>>>>> d978c1b4bd747faa3c8899cfb6b34681adc94e67
  ],
  providers: [],
  bootstrap: [AppComponent],
<<<<<<< HEAD
  entryComponents: [DoctagDialogComponent, TopicDialogComponent, ExamplesDialogComponent]
  entryComponents: [DoctagDialogComponent, TopicDialogComponent]
=======
  entryComponents: [DoctagDialogComponent, TopicDialogComponent, ExamplesDialogComponent, DoctagVersionsDialogComponent]
>>>>>>> b13dd6178ee22ecc280da4e98aa3d4a4049e4c64
})
export class AppModule { }
