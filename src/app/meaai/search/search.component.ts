import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public req__ : any;
  public travel = <any>'';
  public travel_ = <any>'';
  public acc = '';
  public res = '';
  public travel_show = <any>'';
  public url : string = <any>'';
  public url_ : string = <any>'';
  public url__ : string = <any>'';
  public search_ = {
       type : <any>'',
       season : <any>'',
       people : <any>'',
  }
  

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
    this.travel_ = this.req.data
    console.log(this.travel_)
  }

  totTravel(value){
    this.router.navigate(['/travel/'+value]);
  }

  search(){
    this.travel = [];
    for(let i = 0; i <= this.travel_.length -1; i++){
      if(this.search_.type === this.travel_[i].travel_type_id[0].travel_type_name  && this.search_.season ===  this.travel_[i].season_id[0].season_type_name && this.travel_[i].people >= this.search_.people ){
            this.travel.push(this.travel_[i])
      }
    }
    if(this.travel.length === 0){
      Swal.fire({
        icon: 'error',
        text: 'ไม่พบสถานที่ท่องเที่ยวตรงตามเงื่อนไข',
        }
      )
    }
  }

  ngOnInit(): void {
    this.getTravel()
  }

}
