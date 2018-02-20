import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToTaskModalComponent } from './add-user-to-task-modal.component';

describe('AddUserToTaskModalComponent', () => {
  let component: AddUserToTaskModalComponent;
  let fixture: ComponentFixture<AddUserToTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
