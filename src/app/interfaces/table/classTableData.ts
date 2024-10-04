export interface ClassData {
    index: number;
    username: string;
    phone: string;
    class: string;
    tutor?: { username: string };
    course?: { courseName: string };
    preferredTime: string;
    selectedDays: string[];
    classStatus: string;
    approvalStatus: string;
  }