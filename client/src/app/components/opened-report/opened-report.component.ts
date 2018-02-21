import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opened-report',
  templateUrl: './opened-report.component.html',
  styleUrls: ['./opened-report.component.css']
})
export class OpenedReportComponent implements OnInit {
  @ViewChild('userReport') userReport;
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

  ngAfterViewInit() {
    console.log(this.userReport);
    console.log(this.userId);
    this.userReport.initReport(this.userId, this.projectId);

  }

}
