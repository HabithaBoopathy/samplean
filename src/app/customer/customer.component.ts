import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer'
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer:Customer;
  customers:Customer[];
  updateFlag:boolean = false
constructor(private httpClient: HttpClient,
    private customerService:CustomerService,) {
  
    this.customer = new Customer();
    this.customers = []; 
    // this.sample = new Sample();
    // this.samples = [];
   }

  ngOnInit(): void {
    this.fetchSample();
    this.fetchCustomer();
  }
  reloadData() {
    this.customer= new Customer();
    this.fetchSample();
    this.fetchCustomer();
}

fetchCustomer() {
  this.customerService.getCustomer().subscribe(
  (data) => {
    this.customers = data;
  },
  (err) => {
    console.log(err);
  }
);  
}
fetchSample() {
  this.customerService.getSample().subscribe(
    (data) => {
      this.customer.sampleNo = data[0].sampleNo;
    },
    (err) => {
      console.log(err);
    }
  );
}
validateCustomerData(): boolean {
  let flag = false;
 if (this.customer.sampleDate == '') {
    alert('Please enter the name');
  }
  else if (this.customer.customerName == '') {
    alert('Please enter the name');
  }else {
    flag = true;
  }
  return flag;
}
onRegister() {
  if (this.validateCustomerData()) {
    console.log('Checkpoint 1');
    //asynchronous vs synchronous programming
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => {
        if (data) {
          console.log('Checkpoint 3');
          //increment hotel reference
          this.customerService.incrementSampleNoReference().subscribe(
            (data) => {
              if (data) {
                //reload data since new record has been added
                this.reloadData();
              } else {
                alert('Error while incrementing');
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          alert(
            'Error while creating'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('Checkpoint 2');
  }
}

    // onUpdate():boolean{
    //   let flag = false;
    //   (data) => {
    // if (data) {
    //   this.updateFlag = true;
    //   //reload data since new record has been added
    //   this.customerService.updateCustomer(this.customer).subscribe(
    //     (data) => {
    //       if (data) {
    //         console.log('Checkpoint 3'); 
    // } else {  
    //   alert('Error while update details');
    // }
    onUpdate():boolean {
      let flag = false;
      if (this.validateCustomerData()) {
        this.updateFlag = true;
        this.customerService.updateCustomer(this.customer).subscribe(
          (data) => {
            if (data) {
              this.reloadData();
            } else {
              alert(
                'Error while updating hotel. Please look onto the backend logs'
              );
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
      return flag;
    }
  }
  



