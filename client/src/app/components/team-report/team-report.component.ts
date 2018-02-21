import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { UserSession } from '../../services/userSession.service';
import { ReportService } from '../../services/report.service';
import { UserReport } from '../../models/report/user-report';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.css']
})
export class TeamReportComponent implements OnInit {

  @Input() projectId: string;
  private _user: User;
  private _report: string;
  private _reportObject: any;
  private _reportExist: boolean;
  private _teamReports: Array<any>;

  rendered: EventEmitter<any>;

  constructor(private reportService: ReportService, private router: Router) {
    this._reportExist = false;
    this.rendered = new EventEmitter();
  }

  ngOnInit() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.reportService.getReport(this._user._id, this.projectId, this._user.username).subscribe(res => {
      let reports: Array<string>;
      if (res.json() && res.json().reports)
        reports = res.json().reports;
      this.reportService.getReportsOfTeam(reports).subscribe(res => {
        this._teamReports = res.json();
      })
      this.rendered.emit(null);
    });
  }

  public initReport(userId: string, projectId: string) {
    this._user._id = userId;
    this.projectId = projectId;
    this.reportService.getReport(this._user._id, this.projectId, this._user.username).subscribe(res => {
      let reports: Array<string> = res.json().reports;
      this.reportService.getReportsOfTeam(reports).subscribe(res => {
        this._teamReports = res.json();
      })
    });
  }
  openReport(report) {
    this.router.navigate(['openedReport', 'user'], { queryParams: { user: report.owner, projectId: this.projectId } })
  }

}
