import { AddedComponent } from './../../snackBars/added/added.component';
import { ExamplesData } from './../../models/examplesData.model'; // Ar man atskirą sukurti, kur su Example Id?
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import { EditedComponent } from './../../snackBars/edited/edited.component';
import { AppDataService } from '../../services/app-data.service';



@Component({
  selector: 'app-edit-example-dialog',
  templateUrl: './edit-example-dialog.component.html',
  styleUrls: ['./edit-example-dialog.component.scss']
})
export class EditExampleDialogComponent implements OnInit {

  constructor(
    private _appDataService: AppDataService,
    public dialogRef: MatDialogRef<EditExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Dar klausimas, kokį modelį čia dėti, greičiausiai naują.
    private _snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }

  public closeEditExampleDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(EditedComponent, {
      duration: 3000
    });
  }

}
