type SubmissionStatus =  "pending" | "in progress" | "delivered";
export interface SubmissionCreationObect{
    assignmentid: number;
    userid: number;
    status: SubmissionStatus;
    repository_link: string;
    start_date: Date | null;
}

export interface SubmissionDataObect{
    id: number
    assignmentid: number;
    userid: number;
    status: SubmissionStatus;
    repository_link: string;
    start_date: Date | null;
    end_date: Date | null;
    comment: string | null;
}

export interface SubmissionUpdateObject{
    status: SubmissionStatus;
    end_date: Date | null;
    comment: string | null;
}