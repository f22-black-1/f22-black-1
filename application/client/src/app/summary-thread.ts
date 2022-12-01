// export interface SummaryThread_Prev {
//     threadid: string; 
//     incidentid: number;
//     locid: number;
//     creatorid: string;
//     createdate: Date;
//     subject: string;
//     comment: string;
//     imagepath: string;
//     iconpath: string;
//     record_count: number;
//     total_positive: number;
//     reportdate: Date;
//     pestid: string;
//     pesttype: string;
//     username: string;
// }

export interface SummaryThread_Prev {
    reportid: string;
    incidentid: string;
    threadid: string;
    locid: string;
    submitterid: string;
    reportsubmitterusername: string;
    repcreationdate: Date;
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
    pestimage: string;
    iconpath: string;
    record_count: number;
    total_positive: number;
    pesttype: string;
    pestid: string;
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

export interface PestTypeFilter {
    pesttype: string;
}


export interface SummaryThreadwPestReport {
    reportid: string;
    incidentid: string;
    threadid: string;
    locid: string;
    submitterid: string;
    reportsubmitterusername: string;
    repcreationdate: Date;
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
    pestimage: string;
    iconpath: string;
    record_count: number;
    total_positive: number;
    pesttype: string;
    pestid: string;
    username: string;
}

export interface ThreadInput {
    title: string;
    comment: string;
  }

//used in step 1 of discussion thread creation
  export interface IncidentData {
    reportid: string;
    locid: string;
    submitterid: string;
    pestid: string;
    reportdate: Date;
  }

  export interface PestRepID {
    reportid: string;
  }

 export interface NewThreadData {
    incidentid: string;
    locid: string;
    creatorid: string;
    createdate: Date;
    subject: string;
    comment: string;
 }
