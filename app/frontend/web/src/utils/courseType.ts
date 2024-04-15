export type Course = {
  Subject: string;
  Course: number;
  "Course Title": string;
  "Average Grade": number;
  "Primary Instructor": string;
  "Professor Rating": number;
};

export type GenEdCourse = Course & {
  ACP: "" | "ACP";
  CS: "" | "WCC" | "NW" | "US";
  HUM: "" | "LA" | "HP";
  NAT: "SS" | "BS" | "";
  QR: "QR1" | "QR2" | "";
  SBS: "LS" | "PS" | "";
};

export type FlexibleCourse = Course & Partial<GenEdCourse>;
