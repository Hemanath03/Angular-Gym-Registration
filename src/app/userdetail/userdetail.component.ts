import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit{

  public  userID!:number;
  userDetail!:User;
  constructor(private api:ApiService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.params.subscribe(val=>{
      this.userID = val['id'];
      this.fetchRecord(this.userID);
    })
  }

  fetchRecord(_number:number){
    this.api.getResgisterId(this.userID).subscribe(res=>{
      this.userDetail = res;
      console.log(this.userDetail)
    })
  }
}
