import { AppDataService } from '../../services/app-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Examples } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  examples: Array<Examples>;
  topicTitle: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _appDataService: AppDataService) {
   }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.params['topicId'];
    this.downloadTopic(id);
    this.downloadExamples(id);
  }

  private downloadTopic(topicId: string): Subscription {
    return this._appDataService.getTopic(topicId).subscribe(topic => {
      this.topicTitle = topic.Title;
    });
  }

  private async downloadExamples(topicId: string): Promise<void> {
    return this._appDataService.getExamples(topicId)
      .then(data => {
        this.examples = data;
        console.log(data);
      });
  }

}
