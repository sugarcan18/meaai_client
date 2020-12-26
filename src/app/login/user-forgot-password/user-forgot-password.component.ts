import { Component, OnInit, Input, Output } from "@angular/core";
import { CoreApi } from "../../services/coreapi.service";
import { observable, Observable } from "rxjs";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterLink } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-user-forgot-password",
  templateUrl: "./user-forgot-password.component.html",
  styleUrls: ["./user-forgot-password.component.scss"],
})
export class UserForgotPasswordComponent implements OnInit {
  public req: any;
  public url_code: string = <any>"";
  public url_reset: string = <any>"";

  user_f = {
    email: <any>"",
    code: <any>"",
    pass: <any>"",
    pass_c: <any>"",
  };

  error = {
    status: false,
    message: <any>"",
  };

  resetCode = {
    status: false,
  };

  setPass = {
    status: false,
  };

  constructor(
    private coreapi: CoreApi, 
    private router: Router) 
  {
    this.url_code = "/api/user/reset"
    this.url_reset = "/api/user/pass-update"
  }

  async sendcode() {
    this.req = await this.coreapi.CoreApiEvent(this.url_code, this.user_f);
    this.check_status(this.req.status);
  }

  check_status(value) {
    if (value === "true") {
      this.resetCode.status = true;
    } else {
      Swal.fire({
        icon: "error",
        text: this.req.status,
      });
    }
  }

  async update_pass(){
    this.req = await this.coreapi.CoreApiEvent(this.url_reset, this.user_f);
    this.check_status_update(this.req.status);
  }

  check_status_update(value){
    if (value === "true") {
      Swal.fire({
        icon: "success",
        text: this.req.messages,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: this.req.messages,
      });
    }
  }

  checkcode(){
    if(this.req.data === this.user_f.code){
        this.setPass.status = true;
    }
  }

  ngOnInit(): void {}
}
