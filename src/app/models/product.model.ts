import { jsonIgnore } from "json-ignore";

// export class Product {
export class Product{
    id?: any;
    name?: string;
    ownerName?: string;
    masterName?: string;  
    startDate?: string;  
    methodology?: string;    
    location?: string;
    developers?: string

    @jsonIgnore()
    isEdit?: boolean;    

	constructor(id?: any,name?: string,ownerName?: string, masterName?: string,
        startDate?: string, methodology?: string, location?: string, developers?: string) {

	}    
    
}

export const ProductColumns = [

    {
      key: 'id',
      type: 'text',
      label: 'id',
    },
    {
      key: 'name',
      type: 'text',
      label: 'Name',
    },
    {
      key: 'ownerName',
      type: 'text',
      label: 'Owner Name',
      required: true,
    },
    {
       key: 'masterName',
       type: 'text',
       label: 'Master Name',
       required: true,
    },
    {
       key: 'methodology',
       type: 'text',
       label: 'Methodology',
       required: true,
    },
    {
        key: 'startDate',
        type: 'date',
        label: 'Start Date',
        required: true,
     },   
     {
        key: 'developers',
        type: 'object',
        label: 'Developers',
        required: true,
     },        
    {
       key: 'location',
       type: 'text',
       label: 'Location',
       required: true,
    },                 
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];