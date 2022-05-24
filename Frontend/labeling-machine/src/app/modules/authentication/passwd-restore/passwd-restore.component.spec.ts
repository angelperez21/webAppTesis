import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswdRestoreComponent } from './passwd-restore.component';

describe('PasswdRestoreComponent', () => {
  let component: PasswdRestoreComponent;
  let fixture: ComponentFixture<PasswdRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswdRestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswdRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
