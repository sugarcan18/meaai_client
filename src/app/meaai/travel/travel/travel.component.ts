import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public travel = <any>'';
  public travel_res = <any>'';
  public url : string = <any>'';

  constructor(
    private coreapi: CoreApi,
    private route: ActivatedRoute,
    private router  : Router
  ) { 
    this.url = '/api/travel/getTravel'
  }


  async getTravel(){
    let setData = {
      travel_id : this.travel
    }
    this.req = await this.coreapi.CoreApiEvent(this.url, setData)
    this.travel_res = this.req.data
    console.log(this.travel_res)
  }

  toMap(){
    location.href = "https://www.google.com/maps/search/?api=1&query="+this.travel_res[0].lat+","+this.travel_res[0].lng
  }

  toAcc(value){
    this.router.navigate(['/acc/'+value]);

  }

  toRes(value){
    this.router.navigate(['/res/'+value]);
  }

  ngOnInit(): void {
    this.travel = this.route.snapshot.paramMap.get("id");
    this.getTravel()
  }

}
