import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  customerName: string = 'Mohuya';
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    // console.log(form.value);
    this.http.post('url', form.value).subscribe();
  }
}
