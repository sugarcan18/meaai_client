import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public value_ = {};
  public req : any;
  public req_ : any;
  public req__ : any;
  public travel = '';
  public acc = '';
  public res = '';
  public url : string = <any>'';
  public url_ : string = <any>'';
  public url__ : string = <any>'';

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) { 
    this.url = '/api/admin/gettravel'
    this.url_ = '/api/admin/getacc'
    this.url__ = '/api/admin/getres'
  }

  
  async getTravel(){
    this.req = await this.coreapi.CoreApiEvent(this.url, this.value_)
    this.travel = this.req.data
  }

  async getAcc(){
    this.req_ = await this.coreapi.CoreApiEvent(this.url_, this.value_)
    this.acc = this.req_.data
    console.log(this.acc)
  }

  async getRes(){
    this.req__ = await this.coreapi.CoreApiEvent(this.url__, this.value_)
    this.res = this.req__.data
    console.log(this.res)
  }

  totTravel(value){
    this.router.navigate(['/travel/'+value]);
  }

  toAcc(value){
    this.router.navigate(['/acc/'+value]);

  }

  toRes(value){
    this.router.navigate(['/res/'+value]);
  }

  ngOnInit(): void {
    this.getTravel()
    this.getAcc()
    this.getRes()
  }

}
