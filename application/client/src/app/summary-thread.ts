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
    reportdate: Date;
    pestid: string;
    pesttype: string;
    username: string;
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
<<<<<<< HEAD

export interface PestTypeFilter {
    pesttype: string;
}
=======
>>>>>>> df1be1bb9d8e10cd8435e4e65a7ca12097bbc8b2
