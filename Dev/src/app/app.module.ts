import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './views/main/main.component';
import { TopicsComponent } from './views/topics/topics.component';
import { DoctagsComponent } from './views/doctags/doctags.component';
import { DoctagDialogComponent } from './dialogs/doctag-dialog/doctag-dialog.component';
import { TopicDialogComponent } from './dialogs/topic-dialog/topic-dialog.component';
import { TopicComponent } from './views/topic/topic.component';
import { ExamplesDialogComponent } from './dialogs/examples-dialog/examples-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
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
        MatProgressSpinnerModule
} from '@angular/material';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollEventModule } from 'ngx-scroll-event';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopicsComponent,
    DoctagsComponent,
    DoctagDialogComponent,
    TopicDialogComponent,
    TopicComponent,
    ExamplesDialogComponent
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
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ScrollToModule.forRoot(),
    ScrollEventModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DoctagDialogComponent, TopicDialogComponent, ExamplesDialogComponent]
})
export class AppModule { }
