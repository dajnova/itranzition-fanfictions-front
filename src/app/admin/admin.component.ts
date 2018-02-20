import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import { User } from '../user';
import {Router} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort, MatSortHeaderIntl, MatTableDataSource} from '@angular/material';

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

  constructor(private users: UsersService, private router: Router, private sort: MatSortHeaderIntl) { }

  ngOnInit() {
    this.getUsersList();
    this.sort.sortDescriptionLabel(' ', 'asc' );
    this.sort.sortDescriptionLabel(' ', 'desc' );
  }

  redirectionToCabinet(email: any) {
    this.router.navigate(['user/' + email]);
  }

  getUsersList() {
    this.users.getAll()
      .subscribe(data => {
        this.userList = JSON.parse(data);
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
