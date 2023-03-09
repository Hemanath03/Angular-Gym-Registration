import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: any[] = ['id', 'firstname', 'lastname', 'mobile', 'email', 'date', 'bmiResult', 'action']
  public dataSource: any
  userlist: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //public users!: User[];
  
  

  constructor(private api: ApiService, private router: Router, private activate: ActivatedRoute) { }
  ngOnInit(): void {
    this.fetchAllUser()
  }


  fetchAllUser() {
    this.api.getAllUser().subscribe({
      next: (res) => {
        this.userlist = res;
        this.dataSource = new MatTableDataSource(this.userlist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  editor(num: number) {
    this.router.navigate(['edit', num])
  }
  delete(id: number) {
    this.api.deleteUser(id).subscribe();
    this.fetchAllUser()
  }

}
