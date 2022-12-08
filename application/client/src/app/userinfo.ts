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