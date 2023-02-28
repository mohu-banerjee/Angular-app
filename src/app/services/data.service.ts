import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {employeeDatas} from '../model/interface'
import EMPLOYEE from '../Json/employee';
import hierarchyEmployees from '../Json/hierarchy'
import {hierarchyEmployeeDatas} from '../model/hierarchyInterface'
// import {DecimalPipe} from '@angular/common';

import {debounceTime, delay, switchMap, tap, map} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../directive/sortable.directive';

interface SearchResult {
  countries: employeeDatas[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: employeeDatas[], column: SortColumn, direction: string): employeeDatas[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...EMPLOYEE].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employee: employeeDatas, term: string) {
  return employee.text.toLowerCase().includes(term.toLowerCase())
    // || pipe.transform(country.area).includes(term)
    // || pipe.transform(country.population).includes(term);
}

@Injectable({providedIn: 'root'})
export class DataService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<employeeDatas[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  employeeOnTabs:any;

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http : HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe((result: any) => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  getHierarchyEmployees(): hierarchyEmployeeDatas[] {
    return hierarchyEmployees;
  }
  getUserData(): employeeDatas[] {
    return EMPLOYEE;
  }
  getEmployeeOnRole(data:employeeDatas[]){
    this.employeeOnTabs = data;
    console.log(this.employeeOnTabs)
  }


  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(EMPLOYEE, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(EMPLOYEE => matches(EMPLOYEE, searchTerm));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
  pipe(country: employeeDatas, searchTerm: string, pipe: any): unknown {
    throw new Error('Method not implemented.');
  }
// Prashant's code being added
  postEmployee(data : any){
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployeeDetails(){
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map((res:any)=>{
      return res;
    }))

  }

  updateEmployeeDetails(data : any, id : number){
    return this.http.put<any>('http://localhost:3000/posts/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployeeDetails(id : number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
