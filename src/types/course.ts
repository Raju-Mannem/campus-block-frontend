export interface Section {
    _id: string;
    type: "Text" | "Quiz" | "Video" | "Pdf";
    sectionTitle: string;
    sectionDescription?: string;
    content: string;
    mediaJob?: string;
    videoStatus?: "pending" | "processing" | "completed" | "failed";
    videoManifestKey?: string;
    videoError?: string;
    videoMetadata?: {
      duration: number;
      width: number;
      height: number;
      format: string;
    };
  }
  
  export interface Course {
    _id: string;
    title: string;
    description?: string;
    instructorName: string
    category: string;
    image?: string;
    price: number;
    discount?: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Drafts" | "Published";
    sections: Section[];
    enrollments: { userID: string }[];
  }
  