import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-res',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.scss']
})
export class ResComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public res = <any>'';
  public res_res = <any>'';
  public url : string = <any>'';

  constructor(
    private coreapi: CoreApi,
    private route: ActivatedRoute,
  ) { 
    this.url = '/api/res/getRes'
  }

  async getRes(){
    let setData = {
      res_id : this.res
    }
    this.req = await this.coreapi.CoreApiEvent(this.url, setData)
    this.res_res = this.req.data
    console.log(this.res_res)
  }

  ngOnInit(): void {
    this.res = this.route.snapshot.paramMap.get("id");
    this.getRes()
  }


}
