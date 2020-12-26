import { Component, OnInit } from '@angular/core';
import { CoreApi } from '../../../../services/coreapi.service';
import { observable, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss']
})
export class AddTravelComponent implements OnInit {

  public value_ = {};

  public filesToUpload:string [] = [];
  public filesToUpload_name = [];
  public req : any;
  public req_ : any;
  public travel_type = <any>'';
  public season_type = <any>'';
  public url : string = <any>'';
  public url_getTravel_Type : string = <any>'';
  public url_getSeason_Type : string = <any>'';
  public url_uploadImages : string = <any>'';
  public url_save : string = <any>'';
  public travel = {
                      name: <any>'',
                      description: <any>'',
                      type: <any>'',
                      people : <any>'',
                      season: <any>'',
                      lat: <any>'',
                      lng: <any>''
                  };
  // public travel

  constructor(
    private coreapi: CoreApi,
    private router  : Router,
  ) { 
    this.url_getTravel_Type = "/api/admin/getTravelType"
    this.url_getSeason_Type = '/api/admin/getSeasonType'
    this.url_uploadImages = '/api/admin/uploadImages'
    this.url_save = '/api/admin/saveTravel'
  }

  async getDataType(){
    this.req = await this.coreapi.CoreApiEvent(this.url_getTravel_Type, this.value_)
    this.travel_type = this.req.data
    this.req_ = await this.coreapi.CoreApiEvent(this.url_getSeason_Type, this.value_)
    this.season_type = this.req_.data
  }

  async saveData(){
    this.req = await this.coreapi.CoreApiEvent(this.url_save, this.travel)
    if(this.req.status === 'true'){
        await this.uploadFilesToActivity(this.req.data)
        await this.check_status(this.req)
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

  uploadFilesToActivity(travel_id) {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.coreapi.uploadImages(this.url_uploadImages, this.filesToUpload[i], travel_id)
    }
  }

  ngOnInit(): void {
    this.getDataType()
  }

}
