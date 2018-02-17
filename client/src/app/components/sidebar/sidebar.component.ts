import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() sidebarClosed:EventEmitter<any>;
  constructor() {
    this.sidebarClosed = new EventEmitter();
   }

  ngOnInit() {
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    this.sidebarClosed.emit(null);
  }

}
