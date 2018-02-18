import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrRemoveUserModalComponent } from './add-or-remove-user.modal.component';

describe('AddOrRemoveUser.ModalComponent', () => {
  let component:AddOrRemoveUserModalComponent;
  let fixture: ComponentFixture<AddOrRemoveUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrRemoveUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrRemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
