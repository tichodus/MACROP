import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToProjectModalComponent } from './add-user-to-project-modal.component';

describe('AddUserToProjectModalComponent', () => {
  let component: AddUserToProjectModalComponent;
  let fixture: ComponentFixture<AddUserToProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
