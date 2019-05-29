import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-examples-dialog',
  templateUrl: './examples-dialog.component.html',
  styleUrls: ['./examples-dialog.component.scss']
})
export class ExamplesDialogComponent implements OnInit {


  examplesForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExamplesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.createExampleForm();
  }


  private createExampleForm() {
    this.examplesForm = new FormGroup({
      // tslint:disable-next-line
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
      bodyHtml: new FormControl('', [Validators.required, Validators.minLength(3) ]),
      bodyMarkdown: new FormControl('', [Validators.required, Validators.minLength(3) ]),
    });
  }

  public submitExample() {
    console.log(this.examplesForm.value);
    this.onNoExampleFormClick();
  }

  onNoExampleFormClick(): void {
    this.dialogRef.close(this.examplesForm.value);
  }
  closeExampleDial() {
    this.dialogRef.close();
  }
}
