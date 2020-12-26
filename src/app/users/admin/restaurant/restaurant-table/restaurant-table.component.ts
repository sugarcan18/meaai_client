import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss']
})
export class RestaurantTableComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public req_delete : any;
  public req_update : any;
  public restaurant_type = <any>'';
  public url : string = <any>'';
  public url_delete : string = <any>'';
  public url_update : string = <any>'';
  public url_getres_Type : string = <any>'';
  public res = '';
  public itemDelete = <any>'';
  public itemUpdate = <any>'';
  public res_update = {
                          id: <any>'',
                          name: <any>'',
                          description: <any>'',
                          type: <any>'',
                          time_open: <any>'',
                          time_close: <any>'',
                          address: <any>'',
                          phone: <any>'',
                          website: <any>'',
                  };

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) { 
    this.url = '/api/admin/getRes'
    this.url_delete = '/api/admin/delteRes'
    this.url_update = '/api/admin/updateRes'
    this.url_getres_Type = '/api/admin/getResType'
  }

  checkDelete(value){
    this.itemDelete = this.req.data.find(element => element.id === value);
 }

  async getRes(){
    this.req = await this.coreapi.CoreApiEvent(this.url, this.value_)
    this.res = this.req.data
  }

  async DeleteItem(){
    this.req_delete = await this.coreapi.CoreApiEvent(this.url_delete, this.itemDelete)
    this.check_status(this.req_delete)
  }

  async updateData(){
    this.req_update = await this.coreapi.CoreApiEvent(this.url_update, this.res_update)
    this.check_status(this.req_update)
  }

  async getDataType(){
    this.req = await this.coreapi.CoreApiEvent(this.url_getres_Type, this.value_)
    this.restaurant_type = this.req.data
  }

  checkUpdate(value){
    this.itemUpdate = this.req.data.find(element => element.id === value);
    this.res_update.id = this.itemUpdate.restaurant_id
    this.res_update.name = this.itemUpdate.restaurant_name
    this.res_update.description = this.itemUpdate.description
    this.res_update.type = this.itemUpdate.restaurant_type[0].restaurant_type_id
    this.res_update.time_open = this.itemUpdate.time_open
    this.res_update.time_close = this.itemUpdate.time_close
    this.res_update.address = this.itemUpdate.address
    this.res_update.phone = this.itemUpdate.phone
    this.res_update.website = this.itemUpdate.website
    // console.log(this.travel_update)
  }

  check_status(value){
    if(value.status === 'true'){
      Swal.fire({
        icon: 'success',
        text: value.messages,
        }
      )
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
    this.getDataType()
    this.getRes()
  }

}
