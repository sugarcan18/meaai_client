import { Component, OnInit, Input, Output } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  public req : any;
  public url : string = <any>'';

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) 
  { 
      this.url = "/api/user/regis"
  }


  public userRegis = {
    fullname : <any>'',
    password : <any>'',
    birthday : <any>'',
    email : <any>''
  } 

  async submit(){
    this.req = await this.coreapi.CoreApiEvent(this.url, this.userRegis )
    this.check_status(this.req.status)
  }

  check_status(value){
      if(value === 'true'){
        Swal.fire({
          icon: 'success',
          text: 'Add Users Success!',
          }
        ).then(()=>{
          this.router.navigate(['/']);
        })
      }
  }
  

  ngOnInit(): void {

  }

}
