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