export interface SummaryThread_Prev {
    threadid: string; 
    incidentid: number;
    locid: number;
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
    imagepath: string;
    iconpath: string;
    record_count: number;
    total_positive: number;
}

export interface SummaryThread {
    threadid: number;
    incidentid: number;
    locid: number; //comment out
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
    imagePath: string;
    iconPath: string;
    views: number;
    responses: number;
    positiveFeedback: number;
    negativeFeedback: number; //comment out
    locVerified: boolean; //comment out
    imgVerified: boolean; //comment out
}