import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-example-dialog',
  templateUrl: './delete-example-dialog.component.html',
  styleUrls: ['./delete-example-dialog.component.scss']
})
export class DeleteExampleDialogComponent implements OnInit {

  constructor(private _appDataService: AppDataService,
              public dialogRef: MatDialogRef<DeleteExampleDialogComponent>) { }

  ngOnInit() {
  }

  public deleteExample(id: number): void {
    this._appDataService.deleteExample(id)
      .then(data => {
        console.log('Deleted topic:' + data);
      });
  }

  public closeTopicDeleteDialog(): void {
    this.dialogRef.close();
  }

}
