import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';
import {Owner} from '../owner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authToken : String | null;
  authTokenOwner : String | null;
  client: Client;
  owner:Owner;
  editPersonal : boolean = false
  editAddress : boolean = false

  constructor(private route: ActivatedRoute) { 
    this.client = {
      name :  "",
      phone : "",
      email: "",
      passwd: "",
      login: "",
      date_of_birth: "",
      document: "",
    };
    this.owner = {
      name :  "",
      phone : "",
      email: "",
      passwd: "",
      login: "",
      date_of_birth: "",
      document: "",
  }
  this.authToken = localStorage.getItem('authToken');

  this.authTokenOwner = localStorage.getItem('authOwner');
  }

  ngOnInit(): void {
    let teirep=localStorage.getItem("authOwner");
    let periet=localStorage.getItem("authToken");
    
    if(teirep==null){
      const clientId = Number(localStorage.getItem('id'));
      this.getClient(clientId);
    }
    else{
      const ownerId = Number(localStorage.getItem('id'));
      this.getOwner(ownerId);
    }

    this.disableInputs('address')
    this.disableInputs('personal')

  }
  async getClient(id:number){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/client/get',
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authToken"),
      }
    };

    var response = await axios(config);
    console.log(response.data)
    this.client = response.data;

    this.client.date_of_birth = this.client.date_of_birth.substring(0, 10).toString();
  }
  async getOwner(id:number){
    var config = {
      method: 'get',
      url: 'http://localhost:5062/owner/get' ,
      headers: { 
        'Authorization': 'Bearer ' +  localStorage.getItem("authOwner"),
      }
    };

    var response = await axios(config);
    console.log(response.data)

    this.owner = response.data;

    this.owner.date_of_birth = this.owner.date_of_birth.substring(0, 10).toString();
  }
  logout(){
    this.authToken = null;
    this.authTokenOwner = null;

    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenOwner');
    localStorage.removeItem('clientName');
    localStorage.removeItem('ownerName');
    localStorage.removeItem('id');
  }

disableInputs(name:string){
    //Desabilita todos os inputs
    var inputs = document.querySelectorAll("input")
    for(var i = 0; i< inputs.length; i++){
      if(inputs[i].name == name)
           inputs[i].disabled =  true
    }
  }


  allowEdit(name :string) {
    var inputs = document.querySelectorAll("input")
  
    for(var i = 0; i< inputs.length; i++){
      if(inputs[i].name == name)
           inputs[i].disabled =  false
    }
    if(name == 'address')
      this.editAddress = true
    if(name == 'personal')
      this.editPersonal = true
    
  }

  saveEdits(name :string){
    if(name == 'address'){
    this.editAddress = false}
    if(name == 'personal')
      this.editPersonal = false
    
      this.disableInputs(name)
    
  }


}
