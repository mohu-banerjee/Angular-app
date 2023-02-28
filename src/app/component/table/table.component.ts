import { Component, EventEmitter, Input, OnInit,OnChanges, Output, ViewChildren, QueryList } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms'
import {employeeDatas} from '../../model/interface';
import {DataService} from '../../services/data.service';
import {NgbdSortableHeader, SortEvent} from '../../directive/sortable.directive';
import {EmployeeModel} from '../table/table.model'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
[x: string]: any;
  formValue !: FormGroup;
  //employeeData: Employees[] = employee;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  // @Input() tabsData: employeeDatas[] =[];
  // @Output() deleteData = new EventEmitter<{dataId:string}>();
  // @Output() editData = new EventEmitter<{dataId:string}>();
  countries$: Observable<employeeDatas[]>;
  total$: Observable<number>;
  constructor(public service: DataService,private formbuilder: FormBuilder) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  console.log(this.countries$)
   }

   ngOnChanges(){
    // console.log("tabs",this.service.total$);
   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      sapId : [''],
      text : [''],
      email : [''],
      gender : [''],
      contact : [''],
      rm : [''],
      location : [''],
      // role : [''],
      // designation: [''],
      // employeeStatus : [''],
      // image : [''],

    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmplyeeDetails(){
    this.employeeModelObj.sapId = this.formValue.value.sapID;
    this.employeeModelObj.text = this.formValue.value.firstName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.rm = this.formValue.value.rm;
    // this.employeeModelObj.location = this.formValue.value.location;
    // this.employeeModelObj.designation = this.formValue.value.designation;
    // this.employeeModelObj.role = this.formValue.value.role;
    // this.employeeModelObj.employeeStatus = this.formValue.value.employeeStatus;

    this.service.postEmployee(this.employeeModelObj)
    .subscribe((res:any)=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("somthing went Wrong");
    }
    )
  }

  getAllEmployee(){
    this.service.getEmployeeDetails()
    .subscribe((res: any)=>{
      this.employeeData = res;
    })
  }

  deleteEmploye(row : any){
    this.service.deleteEmployeeDetails(row.id)
    .subscribe((res:any)=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['sapId'].setValue(row.sapID);
    this.formValue.controls['text'].setValue(row.firstName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['rm'].setValue(row.rm);
    // this.formValue.controls['location'].setValue(row.rm);
    // this.formValue.controls['role'].setValue(row.role);
    // this.formValue.controls['employeeStatus'].setValue(row.employeeStatus);
    // this.formValue.controls['image'].setValue(row.image);
  }
  updateEmplyeeDetails(){
    this.employeeModelObj.sapId = this.formValue.value.sapID;
    this.employeeModelObj.text = this.formValue.value.firstName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.contact = this.formValue.value.contact;
    this.employeeModelObj.rm = this.formValue.value.rm;
    // this.employeeModelObj.location = this.formValue.value.location;
    // this.employeeModelObj.role = this.formValue.value.role;
    // this.employeeModelObj.employeeStatus = this.formValue.value.employeeStatus;
    // this.employeeModelObj.image = this.formValue.value.image;

    this.service.updateEmployeeDetails(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe((res:any)=>{
      alert("Updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  // editDetails(id:string){
  //   this.editData.emit({
  //     dataId: id
  //   })
  // }

  // deleteDetails(id:any){
  //   this.deleteData.emit({
  //     dataId: id
  //   })
  //   this.employeeData = this.employeeData.filter((item:any) => item.Id !== id);
  // }

    // onSort({column, direction}: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }
}
