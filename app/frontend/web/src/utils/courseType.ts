export type Course = {
  Subject: string;
  Course: number;
  "Course Title": string;
  "Average Grade": number;
  "Primary Instructor": string;
  "Professor Rating": number;
};

export type GenEdCoourse = Course & {
  ACP: string;
  CS: string;
  HUM: string;
  NAT: string;
  QR: string;
  SBS: string;
};
