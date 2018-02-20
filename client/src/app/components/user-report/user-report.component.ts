import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';
import { User } from '../../models/user';
import { ReportService } from '../../services/report.service';
import { UserSession } from '../../services/userSession.service';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild("userReportModal") modalRef;
  private _user: User;
  private _report: string;
  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
  }


  writeReport() {
    let reqObject = this.reportService.createReportObject(this._user._id, this.projectId, this._report, 'userReport', this._user.username, []);
    this.reportService.updateReport(reqObject);
  }




}
