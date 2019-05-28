import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesDialogComponent } from './examples-dialog.component';

describe('ExamplesDialogComponent', () => {
  let component: ExamplesDialogComponent;
  let fixture: ComponentFixture<ExamplesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
