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

  updateProfiles(block: boolean, role: string) {
    let updUserList: Array<User> = [];
    for (let i = 0, n = this.selection.selected.length; i < n; i++) {
      let updProfile: User = { role: role, blocked: block, email: this.selection.selected[i].email, username: null, id: null };
      updUserList.push(updProfile);
    }
    this.users.updateProfiles(updUserList)
      .subscribe(data => {
        this.getUsersList();
        this.selection.clear();
      });
  }

  blockProfiles() {
    this.updateProfiles(true, null);
  }

  unblockProfiles() {
    this.updateProfiles(false, null);
  }

  setAdmins() {
    this.updateProfiles(null, "ROLE_ADMIN");
  }

  deleteProfiles() {
    let deleteUserList: Array<User> = [];
    for (let i = 0, n = this.selection.selected.length; i < n; i++) {
      let deleteUser: User = { role: null, blocked: null, email: this.selection.selected[i].email, username: null, id:null };
      deleteUserList.push(deleteUser);
    }
    this.users.deleteUsers(deleteUserList)
      .subscribe(data => {
        this.getUsersList();
        this.selection.clear();
      });
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
