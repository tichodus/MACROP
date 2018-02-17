import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTaskComponent } from './empty-task.component';

describe('EmptyTaskComponent', () => {
  let component: EmptyTaskComponent;
  let fixture: ComponentFixture<EmptyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
