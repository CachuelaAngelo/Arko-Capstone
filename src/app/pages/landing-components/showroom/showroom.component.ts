import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterUser } from '../../../shares/models/RegisterUser.model'
import { Form, NgForm} from '@angular/forms';
import { regis } from 'src/app/shares/models/regis.model';
import { ShowroomService } from 'src/app/shares/services/Showroom.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import { showroom } from '../../../shares/models/showroomint.model';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {
  ngOnInit(): void {
    this.showShowrooms();
  }
  
  firstname: String;
  lastname: String;


  
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>; 
  @ViewChild('callAPIDialogz') callAPIDialogz: TemplateRef<any>; 

  //name = 'Angular';
  constructor(public dialog: MatDialog, 
    private Shservice: ShowroomService,
    private router: Router,
    private cookieService: CookieService) { }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:true,
      autoplayTimeout:4500,
      dots: false,
      navSpeed: 700,
      navText: ["<i class='fa fa-arrow-left' aria-hidden='true'></i>","<i class='fa fa-arrow-right' aria-hidden='true'></i>"],
      responsive: {
        0: {
          items: 1
        }
      },
  
    }
    imageURL = this.Shservice.PhotoUrl

    showrooms: showroom[] = [];
    showShowrooms(){
      this.Shservice.GET_showroomsReadOnly().subscribe(data=>{
        this.showrooms=data;
        this.showrooms.reverse();
      
      });
    
    }

  openDialog() {
    const timeout = 10;
    let dialogRef = this.dialog.open(this.callAPIDialog,{
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
              
            } else if (result === 'no') {
             
            }
        }
    })
   
}

openReg(){
  let dialogRef = this.dialog.open(this.callAPIDialogz,{
    width: '300px',
    height: '300px',

  });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
               
            } else if (result === 'no') {
              
            }
        }
    })
}

closeDialog(){
  
}

ticket:String ="";
getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  this.ticket;
  for ( var i = 0; i < length; i++ ) {
      this.ticket += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return this.ticket;
}
_token: any;
onSend(form: NgForm){

  const val = form.value;
  const regisAccount = new regis(val.email, val.password);
  this.Shservice.regLogin(regisAccount).subscribe((results: any)=>{
    this._token = this.cookieService.set('mr-token', results.token);
  
   this.dialog.closeAll();
    this.router.navigate(['Showroom-page']);
  },
  error => {
    alert("Invalid Input")
  })

}


onReg(form: NgForm){
  
  if(confirm("Are you Sure you with your Input?")){
   

    }
}




}
