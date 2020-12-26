import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-all-acc',
  templateUrl: './all-acc.component.html',
  styleUrls: ['./all-acc.component.scss']
})
export class AllAccComponent implements OnInit {

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

  async getAcc(){
    this.req_ = await this.coreapi.CoreApiEvent(this.url_, this.value_)
    this.acc = this.req_.data
    console.log(this.acc)
  }

  toAcc(value){
    this.router.navigate(['/acc/'+value]);

  }

  ngOnInit(): void {
    this.getAcc()
  }

}
