import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserSession } from '../../services/userSession.service';
import { ReportService } from '../../services/report.service';
import { UserReport } from '../../models/report/user-report';

@Component({
  selector: 'team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.css']
})
export class TeamReportComponent implements OnInit {

  @Input() projectId: string;
  @ViewChild("userReportModal") modalRef;
  private _user: User;
  private _report: string;
  private _reportObject: any;
  private _reportExist: boolean;
  private _teamReports: Array<UserReport>
  constructor(private reportService: ReportService) {
    this._reportExist = false;
  }

  ngOnInit() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.reportService.getReport(this._user._id, this.projectId, this._user.username).subscribe(res => {
      console.log(res);
    })
  }

}
