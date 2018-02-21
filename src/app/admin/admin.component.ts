import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import { User } from '../user';
import {Router} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort, MatSortHeaderIntl, MatTableDataSource} from '@angular/material';
import {forEach} from '@angular/router/src/utils/collection';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Array<User>;
  initialSelection = [];
  allowMultiSelect = true;
  columnsToDisplay = ['select', 'email', 'userName', 'role', 'IsBlocked'];
  selection = new SelectionModel<User>(this.allowMultiSelect, this.initialSelection);

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }

  redirectionToCabinet() {
    this.router.navigate(['user/' + this.selection.selected[0].email]);
  }



  getUsersList() {
    this.users.getAll()
      .subscribe(data => {
        this.userList = JSON.parse(data);
      });
  }

  isNotSelectedOne() {
    return this.selection.selected.length !== 1;
  }

  isNotAnySelected() {
    return this.selection.selected.length === 0;
  }

  getEmailList() {
    let emailList: string[];
    for (let i = 0, n = this.selection.selected.length; i < n; i++) {
      emailList.push(this.selection.selected[i].email);
    }
    return emailList;
  }

  blockList() {
    this.users.block(this.getEmailList());
    this.masterToggle();
  }

  unblockList() {
    this.users.unblock(this.getEmailList());
    this.masterToggle();
  }

  setAdmins() {
    this.users.setAdmins(this.getEmailList());
    this.masterToggle();
  }

  deleteUsers() {
    this.users.deleteUsers(this.getEmailList());
    this.masterToggle();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userList.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.userList.forEach(row => this.selection.select(row));
  }

}
