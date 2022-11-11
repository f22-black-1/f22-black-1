export interface responses {
    sort_order: number,
    incidentid: string,
    threadid: string,
    userid: string,
    createdate: Date,
    subject: string,
    comment: string,
}

export interface responseTable {
    responseid: string,
    threadid: string,
    userid: string,
    responsedate: Date,
    comment: string,
}