export interface PortalEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  totalCapacity: number;
  registeredCount: number;
  checkedInCount: number;
  status: "Active" | "Upcoming" | "Completed";
  image?: string;
  featured?: boolean;
}

export interface PortalRegistration {
  id: string;
  userName: string;
  userEmail: string;
  eventTitle: string;
  registeredAt: string;
  status: "Confirmed" | "Checked In" | "Waitlist";
  ticketType: "Standard" | "Student" | "VIP Speaker";
  avatarBg: string;
}

export type UserRole = "Super Admin" | "Chapter Admin" | "Organizer" | "Member";

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accountType: "admin" | "user";
  title: string;
  initials: string;
  avatarBg: string;
  status: "Active" | "Pending" | "Suspended";
  googleAccount: boolean;
  joinedDate: string;
  eventsCount: number;
}

export const INITIAL_EVENTS: PortalEvent[] = [
  {
    id: "evt-googlers-workshop",
    title: "Workshop with Googlers • Cloud Next Pre-Event",
    category: "Featured Pre-Event",
    date: "10 July 2026 • 2:00 PM PKT",
    location: "Islamabad • On-site & Hybrid Stream",
    totalCapacity: 200,
    registeredCount: 185,
    checkedInCount: 142,
    status: "Active",
    image: "/image/raw/509268537_1245814630888240_9045050149244473425_n.jpg",
    featured: true,
  },
  {
    id: "evt-cloud-devfest",
    title: "Cloud DevFest Islamabad 2026",
    category: "Flagship Annual Conference",
    date: "18 October 2026 • 9:00 AM PKT",
    location: "Convention Center Islamabad",
    totalCapacity: 600,
    registeredCount: 512,
    checkedInCount: 0,
    status: "Upcoming",
    featured: false,
  },
  {
    id: "evt-gemini-ai",
    title: "Build with AI & Gemini Labs",
    category: "Hands-on Code Lab",
    date: "25 August 2026 • 3:00 PM PKT",
    location: "National Incubation Center, Islamabad",
    totalCapacity: 120,
    registeredCount: 120,
    checkedInCount: 0,
    status: "Upcoming",
    featured: false,
  },
  {
    id: "evt-liftoff",
    title: "Google Cloud LiftOff: Kubernetes & Cloud Run",
    category: "Technical Skill-Up Track",
    date: "15 May 2026 • 4:00 PM PKT",
    location: "Tech City Campus, Rawalpindi",
    totalCapacity: 150,
    registeredCount: 148,
    checkedInCount: 139,
    status: "Completed",
    featured: false,
  },
];

export const INITIAL_USERS: PortalUser[] = [
  // Admin Accounts
  {
    id: "usr-1",
    name: "Irum Zahra",
    email: "irum.zahra@gdgcloud.pk",
    role: "Super Admin",
    accountType: "admin",
    title: "Co-Manager • WTM Ambassador",
    initials: "IZ",
    avatarBg: "#4285F4",
    status: "Active",
    googleAccount: true,
    joinedDate: "Jan 10, 2024",
    eventsCount: 18,
  },
  {
    id: "usr-2",
    name: "Ershian Anwar",
    email: "ershian.anwar@gdgcloud.pk",
    role: "Super Admin",
    accountType: "admin",
    title: "Co-Manager • Product Lead",
    initials: "EA",
    avatarBg: "#EA4335",
    status: "Active",
    googleAccount: true,
    joinedDate: "Feb 15, 2024",
    eventsCount: 16,
  },
  {
    id: "usr-3",
    name: "Sarmad Gardezi",
    email: "sarmad.gardezi@gdgcloud.pk",
    role: "Chapter Admin",
    accountType: "admin",
    title: "Lead • Social Media & PR",
    initials: "SG",
    avatarBg: "#34A853",
    status: "Active",
    googleAccount: true,
    joinedDate: "Mar 01, 2024",
    eventsCount: 15,
  },
  {
    id: "usr-4",
    name: "Abdul Ahad Mehmood",
    email: "abdul.ahad@gdgcloud.pk",
    role: "Chapter Admin",
    accountType: "admin",
    title: "Lead • Sponsorships & Outreach",
    initials: "AA",
    avatarBg: "#FBBC04",
    status: "Active",
    googleAccount: true,
    joinedDate: "Mar 12, 2024",
    eventsCount: 12,
  },
  {
    id: "usr-5",
    name: "Maryam Zahra",
    email: "maryam.zahra@gdgcloud.pk",
    role: "Organizer",
    accountType: "admin",
    title: "Operations & Logistics Lead",
    initials: "MZ",
    avatarBg: "#673ab7",
    status: "Active",
    googleAccount: true,
    joinedDate: "Apr 05, 2024",
    eventsCount: 10,
  },
  {
    id: "usr-6",
    name: "Bisma Qamar",
    email: "bisma.qamar@gdgcloud.pk",
    role: "Organizer",
    accountType: "admin",
    title: "Registration & Experience Lead",
    initials: "BQ",
    avatarBg: "#009688",
    status: "Active",
    googleAccount: true,
    joinedDate: "Apr 20, 2024",
    eventsCount: 9,
  },

  // Regular Users & Attendees
  {
    id: "usr-7",
    name: "Hamza Tariq",
    email: "hamza.tariq@gmail.com",
    role: "Member",
    accountType: "user",
    title: "Backend Engineer @ TechLogix",
    initials: "HT",
    avatarBg: "#1e88e5",
    status: "Active",
    googleAccount: true,
    joinedDate: "May 10, 2024",
    eventsCount: 6,
  },
  {
    id: "usr-8",
    name: "Zainab Malik",
    email: "zainab.malik@outlook.com",
    role: "Member",
    accountType: "user",
    title: "CS Student @ NUST",
    initials: "ZM",
    avatarBg: "#e91e63",
    status: "Active",
    googleAccount: false,
    joinedDate: "Jun 02, 2024",
    eventsCount: 4,
  },
  {
    id: "usr-9",
    name: "Bilal Ahmed",
    email: "bilal.ahmed99@gmail.com",
    role: "Member",
    accountType: "user",
    title: "Cloud DevOps Associate",
    initials: "BA",
    avatarBg: "#43a047",
    status: "Active",
    googleAccount: true,
    joinedDate: "Jul 15, 2024",
    eventsCount: 5,
  },
  {
    id: "usr-10",
    name: "Fatima Noor",
    email: "fatima.noor@gmail.com",
    role: "Member",
    accountType: "user",
    title: "AI Research Fellow @ FAST-NUCES",
    initials: "FN",
    avatarBg: "#fb8c00",
    status: "Active",
    googleAccount: true,
    joinedDate: "Aug 01, 2024",
    eventsCount: 3,
  },
  {
    id: "usr-11",
    name: "Usman Raza",
    email: "usman.raza@arbisoft.com",
    role: "Member",
    accountType: "user",
    title: "Senior Full Stack Dev",
    initials: "UR",
    avatarBg: "#8e24aa",
    status: "Active",
    googleAccount: true,
    joinedDate: "Sep 14, 2024",
    eventsCount: 7,
  },
  {
    id: "usr-12",
    name: "Ayesha Siddiqui",
    email: "ayesha.siddiqui@gmail.com",
    role: "Member",
    accountType: "user",
    title: "Cloud Security Enthusiast",
    initials: "AS",
    avatarBg: "#00acc1",
    status: "Pending",
    googleAccount: true,
    joinedDate: "Oct 08, 2024",
    eventsCount: 1,
  },
  {
    id: "usr-13",
    name: "Omar Farooq",
    email: "omar.farooq@gmail.com",
    role: "Member",
    accountType: "user",
    title: "Software Architect @ Systems Ltd",
    initials: "OF",
    avatarBg: "#3949ab",
    status: "Active",
    googleAccount: true,
    joinedDate: "Oct 22, 2024",
    eventsCount: 8,
  },
  {
    id: "usr-14",
    name: "Mahnoor Khan",
    email: "mahnoor.khan@gmail.com",
    role: "Member",
    accountType: "user",
    title: "Undergrad Student @ COMSATS",
    initials: "MK",
    avatarBg: "#d81b60",
    status: "Active",
    googleAccount: true,
    joinedDate: "Nov 02, 2024",
    eventsCount: 2,
  },
];

export const INITIAL_REGISTRATIONS: PortalRegistration[] = [
  {
    id: "REG-9014",
    userName: "Hamza Tariq",
    userEmail: "hamza.tariq@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "Today, 4:15 PM",
    status: "Confirmed",
    ticketType: "Standard",
    avatarBg: "#1e88e5",
  },
  {
    id: "REG-9013",
    userName: "Zainab Malik",
    userEmail: "zainab.malik@outlook.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "Today, 2:40 PM",
    status: "Checked In",
    ticketType: "Student",
    avatarBg: "#e91e63",
  },
  {
    id: "REG-9012",
    userName: "Bilal Ahmed",
    userEmail: "bilal.ahmed99@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "Yesterday, 8:12 PM",
    status: "Confirmed",
    ticketType: "Standard",
    avatarBg: "#43a047",
  },
  {
    id: "REG-9011",
    userName: "Fatima Noor",
    userEmail: "fatima.noor@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "Yesterday, 5:30 PM",
    status: "Checked In",
    ticketType: "VIP Speaker",
    avatarBg: "#fb8c00",
  },
  {
    id: "REG-9010",
    userName: "Usman Raza",
    userEmail: "usman.raza@arbisoft.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "2 days ago",
    status: "Confirmed",
    ticketType: "Standard",
    avatarBg: "#8e24aa",
  },
  {
    id: "REG-9009",
    userName: "Ayesha Siddiqui",
    userEmail: "ayesha.siddiqui@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "3 days ago",
    status: "Waitlist",
    ticketType: "Student",
    avatarBg: "#00acc1",
  },
  {
    id: "REG-9008",
    userName: "Omar Farooq",
    userEmail: "omar.farooq@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "3 days ago",
    status: "Checked In",
    ticketType: "Standard",
    avatarBg: "#3949ab",
  },
  {
    id: "REG-9007",
    userName: "Mahnoor Khan",
    userEmail: "mahnoor.khan@gmail.com",
    eventTitle: "Workshop with Googlers • Cloud Next",
    registeredAt: "4 days ago",
    status: "Confirmed",
    ticketType: "Student",
    avatarBg: "#d81b60",
  },
];

