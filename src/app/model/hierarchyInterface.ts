export interface hierarchyEmployeeDatas {
  Id: string;

  sapId: Number;

  role?:string;

  text: string;

  designation?:string;

  email?:string;

  location?:string;

  gender?: string;

  rm?:string;

  contact?:number;

  expanded?: boolean;

  items?: hierarchyEmployeeDatas[];

  employeeStatus?: string;

  image?: string

}

