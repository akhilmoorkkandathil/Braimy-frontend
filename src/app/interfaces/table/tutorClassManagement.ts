export interface TutorClassManagement {
    index: number;
    username: string;
    phone: string;
    classStatus: string;
    approvalStatus: string;
    class: string;
    tutor?: { username: string };
    course?: { courseName: string };
    preferredTime: string;
    selectedDays: string[];
  }
  