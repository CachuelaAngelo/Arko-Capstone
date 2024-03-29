import { Component, OnInit, Inject, ViewChild,TemplateRef } from '@angular/core';
import { order } from 'src/app/shares/models/merchOrder.model';
import { FormService } from 'src/app/shares/services/Form.service';
import { ArchivingService } from 'src/app/shares/services/Archiving.service';
import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { StringLiteralLike } from 'typescript';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-merchorder',
  templateUrl: './admin-merchorder.component.html',
  styleUrls: ['./admin-merchorder.component.css']
})
export class AdminMerchorderComponent implements OnInit {

  constructor(private fService: FormService,
    private arService: ArchivingService, 
    public datepipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showOrder();
    this.showOrders();
  }
  pipe = new DatePipe('en-US');
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild('callAPIDialogz') callAPIDialogz: TemplateRef<any>;  
  p: number = 1;
  orders: order[] = [];
  id: number;
  title: String = "Orders of "
  dateToday = new Date();
  latest: String = this.datepipe.transform(this.dateToday, 'yyyy');
  finalTitle :string = this.title + " " + this.latest;

  showOrder(){
    this.fService.GET_Orders().subscribe((data=>{
      this.orders = data;
      this.orders.reverse();
    }))
  }
  showOrders(){
    this.fService.GET_Orders().subscribe((data=>{
      this.merchOrders = data;
      this.merchOrders.reverse();
    }))
  }
  exportElmToExcel(order):void {
    if(confirm('Are you sure??')){
      this.arService.exportAsExcelFile(this.orders, this.finalTitle);
      this.archiveApplicants(order);
      }
 }

 archiveApplicants(order){
  for(let i = 0 ; i <= this.orders.length; i++){
    this.orders[i];
      this.fService.DELETE_Order(this.orders[i].id).subscribe(data=>{ 
})

  }
}

year:String;
section: String;
contactNo: number;
address: String;
studentNo: String;
modeOfPayment: String;
whatMerchNext: String;
price: number
name: String;
merchName: String;
email: String;
quantity: Number;

openDialog(id: Number) {
  this.fService.GET_Order(id).subscribe((data=>{
    this.name = data.name;
    this.email = data.ustEmail
    this.merchName = data.merchName;
    this.quantity = data.quantity;
    this.year = data.year;
    this.section = data.section;
    this.contactNo = data.contactNo;
    this.address = data.address;
    this.modeOfPayment = data.modeOfPayment;
    this.whatMerchNext = data.whatMerchNext;
    this.studentNo = data.studentNo;
    this.price = data.price;
   
  }))
  let dialogRef = this.dialog.open(this.callAPIDialog,{
    width: '400px',

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

openDialogz() {
  this.fService.GET_Orders().subscribe((data=>{
   this.orders = data.reverse();
  }))
  let dialogRef = this.dialog.open(this.callAPIDialogz,{
    width: '1500px',
    height: '500px'

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
merchOrders: order[] = [];
applyFilter(form : NgForm) {
  console.log(form.value.startzDate);

  const startuDate = this.pipe.transform(form.value.startzDate, 'MM/dd/YYYY')
  const enduDate = this.pipe.transform(form.value.endzDate, 'MM/dd/YYYY')

  this.fService.GET_Orders().subscribe(data=>{
   
    this.merchOrders = data.reverse().filter(data=>{
      const dateJoinedz = this.pipe.transform(data.dateOrdered, 'MM/dd/YYYY')
      return dateJoinedz >= startuDate && dateJoinedz <= enduDate
    
      
    }) 
    
  })
}
}
