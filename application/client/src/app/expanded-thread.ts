export interface responses {
    sort_order: number,
    incidentid: string,
    threadid: string,
    userid: string,
    createdate: Date,
    subject: string,
    comment: string,
    username: string,
    positive_feedback: number,
    negative_feedback: number,
    currentuserfeedback: number,
}

export interface responseTable {
    responseid: string,
    threadid: string,
    userid: string,
    responsedate: Date,
    comment: string,
}

export interface newResponse {
    threadid: string,
    userid: string,
    responsedate: Date,
    comment: string,
}


export interface feedback {
    responseid: string,
    threadid: string,
    submitterid: string,
    userid: string,
    positive: boolean,
    inappropriate: boolean,
    submitdate: Date,
}