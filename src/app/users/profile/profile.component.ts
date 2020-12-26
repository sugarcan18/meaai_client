import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  
  public value_ = {};

  public req : any;
  public user : any;
  public nationality : any;
  public url : string = <any>'';
  public url_update = <any>'';
  public url_nationality = <any>'';
  public token_login = <any>'';

  public userProfile = {
    token_login : <any>'',
    user_id : <any>'',
    fullname : <any>'',
    password : <any>'',
    birthday : <any>'',
    email : <any>'',
    phone : <any>'',
    nationality : <any>'',
  }

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
    private datePipe: DatePipe
  ) { 
      this.url = "/api/user/get_users"
      this.url_nationality = "/api/user/get_nationality"
      this.url_update ="/api/user/update_profile"
    }

  async get_user(){
    this.user = await this.coreapi.CoreApiEvent(this.url, this.userProfile )
    this.userProfile.user_id = this.user.data[0].user_id
    this.userProfile.fullname = this.user.data[0].username
    this.userProfile.password = this.user.data[0].password
    this.userProfile.birthday = this.user.data[0].birth
    this.userProfile.email = this.user.data[0].email
    this.userProfile.phone = this.user.data[0].phone
    this.userProfile.nationality = this.user.data[0].nationality
  }
    
  async get_nationality(){
    this.req = await this.coreapi.CoreApiEvent(this.url_nationality, this.value_ )
    this.nationality = this.req.data
  }

  async update(){
    this.req = await this.coreapi.CoreApiEvent(this.url_update, this.userProfile )
    await this.check_status(this.req)
    this.get_user()
  }


  check_status(value){
    if(value.status === 'true'){
      Swal.fire({
        icon: 'success',
        text: value.messages,
        }
      ).then(()=>{
          localStorage.clear()
      })
    }
      else{
        Swal.fire({
          icon: 'error',
          text: value.messages,
          }
        )
      }
  }

  ngOnInit(): void {
    this.get_nationality()
    this.userProfile.token_login = localStorage.getItem("token_login");
    this.get_user()
    // console.log(this.token_login)
  }

}
