import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { ReportService } from '../../services/report.service';
import { UserSession } from '../../services/userSession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {

  @Input() projectId: string;
  private _user: User;
  private _report: string;
  private _reportObject: any;
  private _reportExist: boolean;
  private _projectReports: Array<any>;

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.reportService.getReport('', this.projectId, this._user.username).subscribe(res => {
      let reports: Array<string> = res.json().reports;

      this.reportService.getReportsOfTeam(reports).subscribe(res => {
        this._projectReports = res.json();
        console.log(this._projectReports);
      })
    })
  }

  openReport(report) {
    this.router.navigate(['teamReportOpened', 'Team Leader'], { queryParams: { user: report.owner, projectId: this.projectId } })
  }

  getSubReport(reportId) {
    return this.reportService.getReportById(reportId);
  }

}
