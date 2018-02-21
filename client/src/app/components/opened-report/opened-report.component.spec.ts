import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedReportComponent } from './opened-report.component';

describe('OpenedReportComponent', () => {
  let component: OpenedReportComponent;
  let fixture: ComponentFixture<OpenedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
