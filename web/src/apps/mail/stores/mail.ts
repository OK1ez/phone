import { writable } from "svelte/store";

interface Mail {
  id: string;
  subject: string;
  sender: string;
  timestamp: string;
  content: string;
}

const initialMails: Mail[] = [
  {
    id: "1",
    subject: "Quarterly Report Due",
    sender: "boss@company.com",
    timestamp: "23:32",
    content: "Dear Team,\n\nThis is a reminder that the quarterly report is due by the end of this week. Please ensure all your sections are completed and reviewed.\n\nBest regards,\nJohn Smith\nCEO",
  },
  {
    id: "2",
    subject: "Invitation: Annual Company Picnic",
    sender: "hr@company.com",
    timestamp: "14:04",
    content: "Hello Everyone,\n\nYou're invited to our annual company picnic on Saturday, April 15th, at Sunset Park. Food and drinks will be provided. Feel free to bring your families!\n\nPlease RSVP by April 1st.\n\nBest,\nHR Department",
  },
  {
    id: "3",
    subject: "New Project Kick-off Meeting",
    sender: "projectmanager@company.com",
    timestamp: "12:00",
    content: "Team,\n\nWe're kicking off the new client project next Monday. There will be a meeting at 10 AM in Conference Room A to discuss roles and timelines.\n\nLooking forward to working with you all on this exciting venture.\n\nRegards,\nEmily Johnson\nProject Manager",
  },
  {
    id: "4",
    subject: "IT System Maintenance Notice",
    sender: "itsupport@company.com",
    timestamp: "11:10",
    content: "Dear Colleagues,\n\nPlease be advised that we will be performing system maintenance this Saturday from 10 PM to 2 AM. During this time, email and intranet services may be intermittently unavailable.\n\nWe apologize for any inconvenience.\n\nIT Support Team",
  },
  {
    id: "5",
    subject: "Reminder: Expense Reports Due",
    sender: "finance@company.com",
    timestamp: "Yesterday",
    content: "Hello,\n\nThis is a friendly reminder that all expense reports for the past month are due by this Friday. Please submit them through the company portal.\n\nIf you have any questions, don't hesitate to reach out.\n\nThank you,\nFinance Department",
  }
];

export const ACTIVE_PAGE = writable("inbox");
export const MAILS = writable<Mail[]>(initialMails);
export const SELECTED_MAIL_ID = writable<string | null>(null);

export function openMail(id: string) {
  SELECTED_MAIL_ID.set(id);
  ACTIVE_PAGE.set("view");
}


