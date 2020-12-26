import { Component, OnInit, Input, Output } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterLink } from "@angular/router";
declare var $: any;


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  // providers: [UserLoginComponent]
})
export class UserLoginComponent implements OnInit {

  @Input() email : string = <any>'';
  @Input() password : string = <any>'';
  @Output() url : string = <any>'';
  @Output() data = {
    "email"  : <any>'',
    "password" : <any>''
  }

  public req : any;
  public token_login = <any>''
  public type_user = <any>''

  constructor(
    private coreapi: CoreApi,
    private router  : Router
  ) { 
      this.url = "/api/user/login"
    }

  async Login(){
    this.data = {
      "email" : this.email,
      "password" : this.password
    }
    
     this.req = await this.coreapi.CoreApiEvent(this.url, this.data)
     console.log(this.req);
     this.check_login(this.req.status);
  }

  check_login(value) {
    if (value === "true") {
      Swal.fire({
        icon: "success",
        text: this.req.messages,
      }).then(()=>{
        this.setLocalSr();
        this.checkTypeUser();
      })
    } else {
      Swal.fire({
        icon: "error",
        text: this.req.messages,
      });
    }
  }

  checkLogin(){
    this.token_login = localStorage.getItem("token_login")
    if(this.token_login){
      Swal.fire({
        icon: "success",
        text: 'คุณเข้าสู่ระบบอยู่แล้ว',
      }).then(()=>{
        this.type_user = localStorage.getItem("type_user")      
        if(this.type_user == 1){
          this.router.navigate(['/']);
        }else if(this.type_user == 2){
          this.router.navigate(['/users/admin/travel-table']);
        }
      })
    }
  }

  setLocalSr(){
    localStorage.setItem("token_login" , this.req.data[0].token_login)
    localStorage.setItem("username" , this.req.data[0].username)
    localStorage.setItem("type_user" , this.req.data[0].type_user_id)
  }

  checkTypeUser(){
      switch (this.req.data[0].type_user_id) {
        case 1:
            this.router.navigate(['/']);
            break;
        case 2:
            this.router.navigate(['/users/admin/travel-table']);
            break;
      }
  }

  ngOnInit(): void {
    this.checkLogin()
  }

}
