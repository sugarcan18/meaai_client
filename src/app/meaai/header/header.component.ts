import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private token_login = <any>'';
  public username = <any>'';
  public type_user = <any>'';
  public req : any;
  public url : string = <any>'';

  login = {
    status : false
  }

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) { 
    this.url = "/api/user/logout"
  }

  getLocal(){
      this.token_login = localStorage.getItem("token_login")
      this.username = localStorage.getItem("username")
      this.type_user = localStorage.getItem("type_user")

      if(this.token_login){
        this.login.status = true;
      }else{
        this.login.status = false;
      }
  }

  async logout(){
    let setData = {
      "token_login" : this.token_login
    }
    this.req = await this.coreapi.CoreApiEvent(this.url, setData )
    this.check_status(this.req.status)
  }

  check_status(value){
    if(value === 'true'){
      Swal.fire({
        icon: 'success',
        text: this.req.messages,
        }
      ).then(()=>{
          localStorage.clear()
          this.login.status = false;
      })
    }
      else{
        Swal.fire({
          icon: 'error',
          text: this.req.messages,
          }
        )
        this.login.status = true;
      }
  }

  ngOnInit(): void {
    this.getLocal()
  }

}
