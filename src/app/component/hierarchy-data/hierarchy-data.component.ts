import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DataService } from '../../services/data.service';
import { hierarchyEmployeeDatas } from 'src/app/model/hierarchyInterface';

@Component({
  selector: 'app-hierarchy-data',
  templateUrl: './hierarchy-data.component.html',
  styleUrls: ['./hierarchy-data.component.scss'],
  animations: [       // metadata array
      trigger('animateDetails', [     // trigger block
      state('true', style({      // final CSS following animation
        transform:'translateX(0px)',
        opacity: '1'
      })),
      state('false', style({
        transform:'translateX(400px)',
        opacity: '0'
      })),
      transition('true => false', animate('1000ms linear')),  // animation timing
      transition('false => true', animate('1000ms linear'))
    ])
  ]
})
export class HierarchyDataComponent implements OnInit {

  employees: hierarchyEmployeeDatas[];
  jsonData: hierarchyEmployeeDatas[] = [];

  currentEmployee: hierarchyEmployeeDatas;
  showDetails:boolean = false;
  editableData:hierarchyEmployeeDatas[]=[];
  isEditable:boolean = false;

  constructor(service: DataService) {
    this.jsonData = service.getHierarchyEmployees();
    this.employees = this.getHierarchyJSON();
    this.currentEmployee = this.employees[0];
    console.log(this.employees);
  }

  ngOnInit(): void {
  }

  getHierarchyJSON(){
    function convert(array:hierarchyEmployeeDatas[]) {
      var map:any = {};
      for (let i = 0; i < array.length; i++) {
        var obj = array[i];
        map[obj.text] = obj;
        var parent = obj.rm || "-";

        if (!map[parent]) {
          map[parent] = {
            items: [],
          };
        }
        map[parent].items.push(obj);
      }
      for (let prop in map) {
          if (map[prop].items.length === 0) {
              delete map[prop].items;
          }
      }
      return map["-"].items;
    }
    return convert(this.jsonData);
  }

  selectItem(e:any) {
    this.currentEmployee = e.itemData;
    this.showDetails = true;
  }

  closeDetails(){
    this.showDetails = false;
  }

  editHierarchyData(id:any){
    this.isEditable = true;
    this.editableData = this.jsonData.filter((employee:any) => employee.Id === id);
  }

}
