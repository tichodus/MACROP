import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-report-opened',
  templateUrl: './team-report-opened.component.html',
  styleUrls: ['./team-report-opened.component.css']
})
export class TeamReportOpenedComponent implements OnInit {

  @ViewChild('teamReport') teamReport;

  private _role: string;
  private projectId: string;
  private userId: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this._role = param.type;
      this.activatedRoute.queryParams.subscribe(param => {
        this.userId = param.user;
        this.projectId = param.projectId;
      })
    });
  }

  initOnFocuse(role: string, userId: string, projectId: string) {

    this.teamReport.initReport(userId, projectId);


    // this.teamReport.initReport(userId, projectId);
  }


  ngAfterViewInit() {
    console.log(this.teamReport);
    console.log(this.userId);

    this.teamReport.initReport(this.userId, this.projectId);

    // this.teamReport.initReport(this.userId, this.projectId);

  }

}
