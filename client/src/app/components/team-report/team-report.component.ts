import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserSession } from '../../services/userSession.service';
import { ReportService } from '../../services/report.service';

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
  constructor(private reportService: ReportService) {
    this._reportExist = false;
  }

  ngOnInit() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.reportService.getReport(this._user._id, this.projectId, this._user.username).subscribe(report => {
      this._reportObject = report.json();
      console.log(report.json());
      if (report.json()) {
        this._report = this._reportObject.data;
        this._reportExist = true;
      }
    })
  }

}
