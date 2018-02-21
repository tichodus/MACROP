import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReportOpenedComponent } from './team-report-opened.component';

describe('TeamReportOpenedComponent', () => {
  let component: TeamReportOpenedComponent;
  let fixture: ComponentFixture<TeamReportOpenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReportOpenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReportOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
