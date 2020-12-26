import { Component, OnInit } from "@angular/core";
import { CoreApi } from "../../../../services/coreapi.service";
import { observable, Observable } from "rxjs";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-travel-table",
  templateUrl: "./travel-table.component.html",
  styleUrls: ["./travel-table.component.scss"],
})
export class TravelTableComponent implements OnInit {
  public value_ = {};
  public req: any;
  public req_: any;
  public req__ = <any>"";
  public acc = [];
  public res = [];
  public req_delete: any;
  public req_update: any;
  public travel_acc = <any>"";
  public travel_res = <any>"";
  public travel_type = <any>"";
  public season_type = <any>"";
  public url: string = <any>"";
  public url_delete: string = <any>"";
  public url_update: string = <any>"";
  public url_getTravel_Type: string = <any>"";
  public url_getSeason_Type: string = <any>"";
  public url_acc: string = <any>"";
  public url_res: string = <any>"";
  public travel = <any>"";
  public itemDelete = <any>"";
  public itemUpdate = <any>"";
  public update_travel_acc = <any>"";
  public update_travel_res = <any>"";
  public req_acc = <any>"";
  public req_res = <any>"";
  public travel_update = {
    id: <any>"",
    name: <any>"",
    description: <any>"",
    type: <any>"",
    season: <any>"",
    people : <any>'',
    lat: <any>"",
    lng: <any>"",
  };

  constructor(private coreapi: CoreApi, private router: Router) {
    this.url = "/api/admin/gettravel";
    this.url_delete = "/api/admin/deletetravel";
    this.url_update = "/api/admin/updatetravel";
    this.url_getTravel_Type = "/api/admin/getTravelType";
    this.url_getSeason_Type = "/api/admin/getSeasonType";
    this.url_acc = "/api/admin/getAcc";
    this.url_res = "/api/admin/getRes";
    this.update_travel_acc = "/api/admin/updateTravelAcc"
    this.update_travel_res = "/api/admin/updateTravelRes"

  }

  async getDataType() {
    this.req = await this.coreapi.CoreApiEvent(
      this.url_getTravel_Type,
      this.value_
    );
    this.travel_type = this.req.data;
    this.req_ = await this.coreapi.CoreApiEvent(
      this.url_getSeason_Type,
      this.value_
    );
    this.season_type = this.req_.data;
  }

  async getTravel() {
    this.req = await this.coreapi.CoreApiEvent(this.url, this.value_);
    this.travel = this.req.data;
    console.log(this.travel);
  }

  checkDelete(value) {
    this.itemDelete = this.req.data.find((element) => element.id === value);
  }

  checkUpdate(value) {
    this.itemUpdate = this.req.data.find((element) => element.id === value);
    console.log(this.itemUpdate)
    this.travel_update.id = this.itemUpdate.id;
    this.travel_update.name = this.itemUpdate.travel_name;
    this.travel_update.description = this.itemUpdate.travel_detail;
    this.travel_update.type = this.itemUpdate.travel_type_id[0].travel_type_id;
    this.travel_update.season = this.itemUpdate.season_id[0].season_type_id;
    this.travel_update.people = this.itemUpdate.people;
    this.travel_update.lat = this.itemUpdate.lat;
    this.travel_update.lng = this.itemUpdate.lng;
    // console.log(this.travel_update)
  }

  async DeleteItem() {
    this.req_delete = await this.coreapi.CoreApiEvent(
      this.url_delete,
      this.itemDelete
    );
    this.check_status(this.req_delete);
  }

  async updateData() {
    this.req_update = await this.coreapi.CoreApiEvent(
      this.url_update,
      this.travel_update
    );
    this.check_status(this.req_update);
  }

  async check_TravelAcc(travel_id) {
    console.log(travel_id)
    this.acc = []
    await this.getAcc();
    for (let i = 0; i <= this.travel.length - 1; i++) {
      if (travel_id === this.travel[i].travel_id) {
        if (this.travel[i].travel_acc !== "false") {
          for (let k = 0; k <= this.travel[i].travel_acc.length - 1; k++) {
            for (let j = 0; j <= this.acc.length - 1; j++) {
              if (this.acc[j].id === this.travel[i].travel_acc[k].acc_id) {
                this.acc[j].status = this.travel[i].travel_acc[k].is_active?true:false;
                this.acc[j].travel_id = travel_id
              }
              this.acc[j].travel_id = travel_id
            }
          }
        }else{
          for (let j = 0; j <= this.acc.length - 1; j++) {
              this.acc[j].travel_id = travel_id
          }
        }
      }
    }
    console.log(this.acc);
  }

  async check_TravelRes(travel_id) {
    this.res = []
    await this.getRes();
    for (let i = 0; i <= this.travel.length - 1; i++) {
      if (travel_id === this.travel[i].travel_id) {
        if (this.travel[i].travel_res !== "false") {
          for (let k = 0; k <= this.travel[i].travel_res.length - 1; k++) {
            for (let j = 0; j <= this.res.length - 1; j++) {
              if (this.res[j].id === this.travel[i].travel_res[k].res_id) {
                this.res[j].status = this.travel[i].travel_res[k].is_active?true:false;
                this.res[j].travel_id = travel_id
              }
            }
          }
        }else{
          for (let j = 0; j <= this.res.length - 1; j++) {
              this.res[j].travel_id = travel_id
          }
        }
      }
    }
    console.log(this.res);
  }

  async getAcc() {
    this.req__ = await this.coreapi.CoreApiEvent(this.url_acc, this.value_);
    for (let i = 0; i <= this.req__.data.length - 1; i++) {
      this.acc.push({
        id: this.req__.data[i].accommodation_id,
        name: this.req__.data[i].accommodation_name,
        travel_id: <any>'',
        status: false,
      });
    }
  }

  async getRes() {
    this.req__ = await this.coreapi.CoreApiEvent(this.url_res, this.value_);
    for (let i = 0; i <= this.req__.data.length - 1; i++) {
      this.res.push({
        id: this.req__.data[i].restaurant_id,
        name: this.req__.data[i].restaurant_name,
        travel_id: <any>'',
        status: false,
      });
    }
    // console.log(this.res)
  }

  async UpdateTravel_acc(){
    let setData = {
      travel_acc : this.acc
    }
    console.log(setData)
    this.req_acc = await this.coreapi.CoreApiEvent(this.update_travel_acc, setData);
    this.check_status(this.req_acc);
  }

  async UpdateTravel_res(){
    let setData = {
      travel_res : this.res
    }
    this.req_res = await this.coreapi.CoreApiEvent(this.update_travel_res, setData);
    this.check_status(this.req_res);
  }

  async checkstatus_acc(id){
    for(let i = 0; i <= this.acc.length - 1; i++ ){
        if(this.acc[i].id === id){
            this.acc[i].status = !this.acc[i].status
        }
    }
  }

  async checkstatus_res(id){
    for(let i = 0; i <= this.res.length - 1; i++ ){
        if(this.res[i].id === id){
            this.res[i].status = !this.res[i].status
        }
    }
  }

  check_status(value) {
    if (value.status === "true") {
      Swal.fire({
        icon: "success",
        text: value.messages,
      }).then(() => {
        this.getTravel();
      });
    } else {
      Swal.fire({
        icon: "error",
        text: value.messages,
      });
    }
  }

  ngOnInit(): void {
    this.getDataType();
    this.getTravel();
    // this.getAcc();
    this.getRes();
  }
}
