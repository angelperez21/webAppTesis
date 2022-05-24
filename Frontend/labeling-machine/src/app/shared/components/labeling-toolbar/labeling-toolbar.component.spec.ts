import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelingToolbarComponent } from './labeling-toolbar.component';

describe('LabelingToolbarComponent', () => {
  let component: LabelingToolbarComponent;
  let fixture: ComponentFixture<LabelingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelingToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
