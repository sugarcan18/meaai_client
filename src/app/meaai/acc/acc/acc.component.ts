import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public acc = <any>'';
  public acc_res = <any>'';
  public url : string = <any>'';

  constructor(
    private coreapi: CoreApi,
    private route: ActivatedRoute,
  ) { 
    this.url = '/api/acc/getAcc'
  }

  async getAcc(){
    let setData = {
      acc_id : this.acc
    }
    this.req = await this.coreapi.CoreApiEvent(this.url, setData)
    this.acc_res = this.req.data
    console.log(this.acc_res)
  }

  ngOnInit(): void {
    this.acc = this.route.snapshot.paramMap.get("id");
    this.getAcc()
  }

}
