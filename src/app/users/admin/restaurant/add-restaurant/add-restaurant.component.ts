import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {

  public value_ = <any>'';

  public filesToUpload:string [] = [];
  public filesToUpload_name = [];
  public req : any;
  public req_ : any;
  public req_save : any;
  public restaurant_type = <any>'';
  public url : string = <any>'';
  public url_getres_Type : string = <any>'';
  public url_uploadImages : string = <any>'';
  public url_save : string = <any>'';
  public restaurant = {
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
      this.url_getres_Type = '/api/admin/getResType'
      this.url_save = '/api/admin/saveRes'
      this.url_uploadImages = '/api/admin/uploadImages_res'
  }

  async getDataType(){
    this.req = await this.coreapi.CoreApiEvent(this.url_getres_Type, this.value_)
    this.restaurant_type = this.req.data
    // console.log(this.restaurant_type)
  }

  async saveData(){
    this.req_save = await this.coreapi.CoreApiEvent(this.url_save, this.restaurant)
    if(this.req_save.status === 'true'){
      await this.uploadFilesToActivity(this.req_save.data)
      this.check_status(this.req_save)
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

  uploadFilesToActivity(res_id) {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.coreapi.uploadImages(this.url_uploadImages, this.filesToUpload[i], res_id)
    }
  }

  ngOnInit(): void {
    this.getDataType()
  }

}
