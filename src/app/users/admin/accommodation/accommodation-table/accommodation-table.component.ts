import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-accommodation-table',
  templateUrl: './accommodation-table.component.html',
  styleUrls: ['./accommodation-table.component.scss']
})
export class AccommodationTableComponent implements OnInit {

  public value_ = {};
  public req : any;
  public req_ : any;
  public req_delete : any;
  public req_update : any;
  public acc = <any>'';
  public acc_type = <any>'';
  public room_type = <any>'';
  public url : string = <any>'';
  public url_delete : string = <any>'';
  public url_update : string = <any>'';
  public url_get_acc = <any>'';
  public url_get_room = <any>'';
  public itemDelete = <any>'';
  public itemUpdate = <any>'';
  public accommodation_update = {
                        id: <any>'',
                        accommodation_id: <any>'',
                        accommodation_name: <any>'',
                        description: <any>'',
                        accommodation_type: <any>'',
                        room: <any>'',
                        room_type: <any>'',
                        period_start_price: <any>'',
                        period_end_price: <any>'',
                        address: <any>'',
                        phone: <any>'',
                        website: <any>'',
                        email: <any>''
                  };

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) {
    this.url = '/api/admin/getAcc'
    this.url_delete = '/api/admin/deleteAcc'
    this.url_update = '/api/admin/updateAcc'
    this.url_get_acc = '/api/admin/getAccType'
    this.url_get_room = '/api/admin/getRoomType'
   }

   async getDataType(){
    this.req = await this.coreapi.CoreApiEvent(this.url_get_acc, this.value_)
    this.req_ = await this.coreapi.CoreApiEvent(this.url_get_room, this.value_)
    this.acc_type = this.req.data
    this.room_type = this.req_.data
  }

  async getAcc(){
    this.req = await this.coreapi.CoreApiEvent(this.url, this.value_)
    this.acc = this.req.data
  }

  checkDelete(value){
    this.itemDelete = this.req.data.find(element => element.id === value);
 }

 checkUpdate(value){
   this.itemUpdate = this.req.data.find(element => element.id === value);
   this.accommodation_update.id = this.itemUpdate.id
   this.accommodation_update.accommodation_id = this.itemUpdate.accommodation_id
   this.accommodation_update.accommodation_name= this.itemUpdate.accommodation_name
   this.accommodation_update.description = this.itemUpdate.description
   this.accommodation_update.accommodation_type = this.itemUpdate.accommodation_type[0].accommodation_type_id
   this.accommodation_update.room_type = this.itemUpdate.room_type[0].room_type_id
   this.accommodation_update.room = this.itemUpdate.room
   this.accommodation_update.period_start_price = this.itemUpdate.period_start_price
   this.accommodation_update.period_end_price = this.itemUpdate.period_end_price
   this.accommodation_update.address = this.itemUpdate.address
   this.accommodation_update.phone = this.itemUpdate.phone
   this.accommodation_update.website = this.itemUpdate.website
   this.accommodation_update.email = this.itemUpdate.email
 }

 async DeleteItem(){
    this.req_delete = await this.coreapi.CoreApiEvent(this.url_delete, this.itemDelete)
    this.check_status(this.req_delete)
    // this.getAcc()
  }

async updateData(){
    this.req_update = await this.coreapi.CoreApiEvent(this.url_update, this.accommodation_update)
    this.check_status(this.req_update)
    // this.getAcc()
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
    this.getAcc()
  }

}
