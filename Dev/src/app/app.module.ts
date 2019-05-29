import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './views/main/main.component';
import { TopicsComponent } from './views/topics/topics.component';
import { DoctagsComponent } from './views/doctags/doctags.component';
import { TopicComponent } from './views/topic/topic.component';

import { ExamplesDialogComponent,
         TopicDialogComponent,
         DoctagDialogComponent,
         DoctagVersionsDialogComponent } from './dialogs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatSelectModule,
         MatButtonModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatDialogModule,
         MatAutocompleteModule,
         MatExpansionModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopicsComponent,
    DoctagsComponent,
    DoctagDialogComponent,
    TopicDialogComponent,
    TopicComponent,
    ExamplesDialogComponent,
    DoctagVersionsDialogComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DoctagDialogComponent, TopicDialogComponent, ExamplesDialogComponent, DoctagVersionsDialogComponent]
})
export class AppModule { }
