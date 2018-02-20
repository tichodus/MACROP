import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private _role: string;
  private _projectId: string;
  constructor(private location: PlatformLocation, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.location.onPopState = () => { document.getElementById("main").className = 'transition'; }
    this.activatedRoute.params.subscribe(res => {
      this._role = res.role;
    });
    this.activatedRoute.queryParams.subscribe(param => {
      this._projectId = param.projectId;
    })
  }

}
