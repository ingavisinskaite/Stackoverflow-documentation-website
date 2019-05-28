import { AppDataService } from '../../services/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Examples } from '../../models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ExamplesDialogComponent } from '../../dialogs';
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
@Injectable()
export class TopicComponent implements OnInit {

  examples: Array<Examples>;
  topicTitle: string;
  topicId: number;
  panelOpenState = false;
  firstExampleId: number;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  windowScrolled = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private _appDataService: AppDataService,
    private _dialog: MatDialog,
    private _scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.topicId = this._activatedRoute.snapshot.params['topicId'];
    this.downloadTopic(this.topicId);
    this.downloadExamples(this.topicId);
  }

  private downloadTopic(topicId: number): Subscription {
    return this._appDataService.getTopic(topicId).subscribe(topic => {
      this.topicTitle = topic.Title;
    });
  }

  private async downloadExamples(topicId: number): Promise<void> {
    return this._appDataService.getExamples(topicId)
      .then(data => {
        this.examples = data;
        this.firstExampleId = data[0].Id;
        console.log(data);
      });
  }

  public showExampleFormDialog() {
    const dialogRef = this._dialog.open(ExamplesDialogComponent, {
      data: { name: 'test', animal: 'dog' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) { return; } else {
          result.DocTopicId = this.topicId;
          this._appDataService.addExample(result).subscribe(data => {
            console.log('Inserted example:');
            console.log(data);
          });
        }
      });
  }

  public triggerScrollTo() {
    const config: ScrollToConfigOptions = {
      target: 'top'
    };
    this._scrollToService.scrollTo(config);
  }


  public handleScroll(event: ScrollEvent) {
    this.windowScrolled = true;
    if (event.isReachingTop) {
    this.windowScrolled = false;
    }
  }

}
