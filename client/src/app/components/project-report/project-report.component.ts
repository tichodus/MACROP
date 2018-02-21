import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {
  @Input() projectId: string;
  constructor() { }

  ngOnInit() {
  }

}
