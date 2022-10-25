// export interface SummaryThread {
//     pestId: number;
//     userName: string;
//     threadSubject: string;
//     threadComment: string;
//     incidentReportDate: Date;
// }

export interface SummaryThread {
    threadid: number;
    incidentid: number;
    locid: number;
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
}