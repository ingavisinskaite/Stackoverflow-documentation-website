import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {

  topicForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.createTopicForm();
  }

  private createTopicForm() {
    this.topicForm = new FormGroup({
      // tslint:disable-next-line
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
      introductionHtml: new FormControl('', [Validators.required, Validators.minLength(3)]),
      syntaxHtml: new FormControl('', [Validators.required, Validators.minLength(3)]),
      parametersHtml: new FormControl('', [Validators.required, Validators.minLength(3)]),
      remarksHtml: new FormControl('', [Validators.required, Validators.minLength(3)]),
      introductionMarkdown: new FormControl('', [Validators.required, Validators.minLength(3)]),
      syntaxMarkdown: new FormControl('', [Validators.required, Validators.minLength(3)]),
      parametersMarkdown: new FormControl('', [Validators.required, Validators.minLength(3)]),
      remarksMarkdown: new FormControl('', [Validators.required, Validators.minLength(3)]),
      helloWorldVersionsHtml: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public submitTopic() {
    console.log(this.topicForm.value);
    this.onNoTopicFormClick();
  }

  onNoTopicFormClick(): void {
    this.dialogRef.close(this.topicForm.value);
  }
  closeTopicDial() {
    this.dialogRef.close();
  }

}

