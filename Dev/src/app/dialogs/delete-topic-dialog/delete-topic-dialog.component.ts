import { Component, OnInit, Input } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-delete-topic-dialog',
  templateUrl: './delete-topic-dialog.component.html',
  styleUrls: ['./delete-topic-dialog.component.scss']
})
export class DeleteTopicDialogComponent implements OnInit {

  topicTitle: string;

  constructor(private _appDataService: AppDataService,
              public dialogRef: MatDialogRef<DeleteTopicDialogComponent> ) { }

  ngOnInit() {
  }

  public deleteTopic(id: number): void {
    this._appDataService.deleteTopic(id)
      .then(data => {
        console.log('Deleted topic:' + data);
      });
  }

  public downloadTopic(topicId: number): Subscription {
    return this._appDataService.getTopic(topicId).subscribe(topic => {
      this.topicTitle = topic.Title;
    });
  }

  public closeTopicDeleteDialog(): void {
    this.dialogRef.close();
  }

}
