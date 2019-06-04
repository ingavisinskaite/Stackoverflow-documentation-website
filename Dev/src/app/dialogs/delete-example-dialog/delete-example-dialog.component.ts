import { DeletedComponent } from './../../snackBars/deleted/deleted.component';
import { ExampleDialogData } from './../../models/exampleDialogData.model';
import { Component, OnInit, Inject } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';


@Component({
  selector: 'app-delete-example-dialog',
  templateUrl: './delete-example-dialog.component.html',
  styleUrls: ['./delete-example-dialog.component.scss']
})
export class DeleteExampleDialogComponent implements OnInit {

  constructor(private _appDataService: AppDataService,
              public dialogRef: MatDialogRef<DeleteExampleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ExampleDialogData,
              private _snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }

<<<<<<< HEAD
  // public deleteExample(id: number): void {
  //   this._appDataService.deleteExample(id)
  //     .then(data => {
  //       console.log('Deleted topic:' + data);
  //     });
  // }
=======
  public deleteExample(id: number): void {
    this._appDataService.deleteExample(id)
      .then(data => {
        console.log('Deleted example' + data);
      });
    this.closeExampleDeleteDialog();
    this.openSnackBar();
  }
>>>>>>> b6c9898b42211d5cdfdd902641718f5dd865f84f

  public closeExampleDeleteDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DeletedComponent, {
      duration: 3000
    });
  }

}
