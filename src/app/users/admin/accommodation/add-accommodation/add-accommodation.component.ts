import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.scss']
})
export class AddAccommodationComponent implements OnInit {
  public value_ = {};
  public accommodation = {
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
                            email: <any>'',
                        }
  public acc_type = <any>'';
  public room_type = <any>'';
  public req = <any>'';
  public req_ = <any>'';
  public req_save = <any>'';
  public url_get_acc = <any>'';
  public url_get_room = <any>'';
  public url_save = <any>'';
  public url_uploadImages : string = <any>'';
  public filesToUpload:string [] = [];
  public filesToUpload_name = [];

  constructor(
    private coreapi: CoreApi,
  ) { 
    this.url_get_acc = "/api/admin/getAccType"
    this.url_get_room = "/api/admin/getRoomType"
    this.url_save = "/api/admin/saveAcc"
    this.url_uploadImages = "/api/admin/uploadImageAcc"
  }


  async getDataType(){
    this.req = await this.coreapi.CoreApiEvent(this.url_get_acc, this.value_)
    this.acc_type = this.req.data
    this.req_ = await this.coreapi.CoreApiEvent(this.url_get_room, this.value_)
    this.room_type = this.req_.data

  }

  async saveData(){
    this.req_save = await this.coreapi.CoreApiEvent(this.url_save, this.accommodation)
    if(this.req_save.status === 'true'){
      await this.uploadFilesToActivity(this.req_save.data)
      await this.check_status(this.req_save)
    }
  }

  check_status(value){
    if(value.status === 'true'){
      Swal.fire({
        icon: 'success',
        text: value.messages,
        }
      ).then(()=>{
          localStorage.clear()
      })
    }
      else{
        Swal.fire({
          icon: 'error',
          text: value.messages,
          }
        )
      }
  }

  uploadImages(event){
    this.filesToUpload = [];
    for (var i = 0; i < event.target.files.length; i++) { 
        this.filesToUpload.push(event.target.files[i]);
        this.filesToUpload_name.push(event.target.files[i].name);
    }
  }

  uploadFilesToActivity(acc_id) {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.coreapi.uploadImages(this.url_uploadImages, this.filesToUpload[i], acc_id)
    }
  }

  ngOnInit(): void {
    this.getDataType()
  }

}
