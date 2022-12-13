export class UserInfo {
    userid: string;
    total_messages: number;
    positive_feedback: number;
    negative_feedback: number;
}

export class UserInfoThread {
    threadid: string;
    userid: string;
    subject: string;
    message_count: number;
    total_positive: number;
    total_negative: number;
}

export class CurrentUser_t {
    userid: string;
    username: string;
    threadid: string;
  }

  export class UserAccountInfo {
    userid: string;
    locid: string;
    username: string;
    email: string;
    usertype: string;
    firstname: string;
    lastname: string;
    password: string;
  }