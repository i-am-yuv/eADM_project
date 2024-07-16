export class Model {
}

export interface Record {

    date: string;
    accountNumber: string;
    status: string;   
}
export interface allRecords {

    date: string;
    fileName: string; 
    noOfRecords?:any;
    status?:any;
}