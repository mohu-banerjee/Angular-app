import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { employeeDatas } from 'src/app/model/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  getemployee: employeeDatas[] =[];
  employeeOnRole:employeeDatas[]=[];
  // deletedData:employeeDatas[] = [];
  // editId:any;
  // modelData:employeeDatas[]=[];
  getUserDatas: any;
  // getUserData: employeeDatas[] = [];

  constructor(private service: DataService) {
    // this.employeeOnRole = service.getUserData();
    this.getemployee = service.getUserData();
  }
  ngOnInit(){
    // throw new Error('Method not implemented.');

  }

  // ngOnInit(): void {
  //   this.getAllEmployee();
  // }

  getUserDetails(role:any){
    this.getUserDatas = this.getemployee.filter((item:any) => item.role === role);
    this.service.getEmployeeOnRole(this.getUserDatas);


  }


  // edit(id:any){
  //   this.editId = id.dataId;
  //   this.modelData = this.getemployee.filter((item:any) => item.Id === this.editId);
  // }

  // delete(id:any){
  //   this.deletedData = this.getemployee.filter((item:any)=> item.Id === id.dataId);
  // }
}
