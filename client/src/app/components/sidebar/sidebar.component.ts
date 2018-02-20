import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() sidebarClosed: EventEmitter<any>;
  @Output() onTaskCreate: EventEmitter<any>;
  @Input() projectId: string;
  @Input() role: string;
  private _removeUser: boolean;

  constructor(private router: Router) {
    this._removeUser = false;
    this.sidebarClosed = new EventEmitter();
    this.onTaskCreate = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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

  createTask() {
    this.onTaskCreate.emit(null);
  }

  removeUser(removeUserModal) {
    removeUserModal.open();
  }

  addUser(addUserModal) {
    addUserModal.open();
  }

  openReport() {
    document.getElementById("main").style.marginLeft = '0';
    document.getElementById("main").className = 'no-transition';
    this.router.navigate(['/report', this.role], { queryParams: { projectId: this.projectId } });
  }


}

