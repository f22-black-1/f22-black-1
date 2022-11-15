export interface Pest {
    pestid: string;
    pestname: string;
    pesttype: string;
    severity: string;
    pestdescription: string;
    pestimage: string;
  }

  export interface Incident {
    incidentid: string;
    locid: string;
    submitterid: string;
    pestid: string;
    reportdate: string;
    xcoord: number;
    ycoord: number;
  }

  export interface PestReport {
    reportid: string;
    incidentid: string;
    locid: string;
    submitterid: string;
    pestid: string;
    reportdate: string;
    reporttext: string;
    xcoord: number;
    ycoord: number;
    pestname: string;
    pesttype: string;
    severity: string;
    pestdescription: string;
    pestimage: string;
  }

  export interface PestType {
    pesttype: string;
  }

  export interface PestMin {
    pesttype: string;
    xcoord: number;
    ycoord: number;
  }