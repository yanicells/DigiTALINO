export interface Application {
  refNo: string;
  applicant: string;
  businessName: string;
  type: "New" | "Renewal";
  dateFiled: string;
  status: "Approved" | "Rejected" | "For Review" | "In Review";
  statusDetail?: string;
  applicantInfo: {
    fullName: string;
    philsysId: string;
    contact: string;
    email: string;
    address: string;
  };
  businessInfo: {
    businessName: string;
    businessType: string;
    businessAddress: string;
    lineOfBusiness: string;
    dtiSecNumber: string;
    capitalization: string;
  };
  documents: {
    name: string;
    status: "uploaded" | "na";
  }[];
  aiCheck: {
    label: string;
    status: "pass" | "warning" | "info";
  }[];
}

export const applications: Application[] = [
  {
    refNo: "BP-2026-00143",
    applicant: "Maria Santos",
    businessName: "Santos Sari-Sari Store",
    type: "Renewal",
    dateFiled: "Mar 16, 2026",
    status: "Approved",
    applicantInfo: {
      fullName: "Maria Santos",
      philsysId: "PSN-2019-00234567",
      contact: "0917-234-5678",
      email: "maria.santos@email.com",
      address: "123 Rizal St., Brgy. Poblacion, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Santos Sari-Sari Store",
      businessType: "Sole Proprietorship",
      businessAddress: "123 Rizal St., Brgy. Poblacion, Bagong Pag-asa",
      lineOfBusiness: "Retail Trade",
      dtiSecNumber: "DTI-2024-001234",
      capitalization: "₱150,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "uploaded" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "uploaded" },
    ],
    aiCheck: [
      { label: "All required documents detected", status: "pass" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Approved", status: "pass" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
  {
    refNo: "BP-2026-00144",
    applicant: "Roberto Cruz",
    businessName: "Cruz Auto Repair",
    type: "New",
    dateFiled: "Mar 17, 2026",
    status: "Approved",
    applicantInfo: {
      fullName: "Roberto Cruz",
      philsysId: "PSN-2020-00345678",
      contact: "0918-345-6789",
      email: "roberto.cruz@email.com",
      address: "45 Bonifacio Ave., Brgy. Riverside, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Cruz Auto Repair",
      businessType: "Sole Proprietorship",
      businessAddress: "45 Bonifacio Ave., Brgy. Riverside, Bagong Pag-asa",
      lineOfBusiness: "Automotive Services",
      dtiSecNumber: "DTI-2026-005678",
      capitalization: "₱500,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "uploaded" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "na" },
    ],
    aiCheck: [
      { label: "All required documents detected", status: "pass" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Approved", status: "pass" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
  {
    refNo: "BP-2026-00145",
    applicant: "Ana Reyes",
    businessName: "Reyes Pharmacy",
    type: "New",
    dateFiled: "Mar 17, 2026",
    status: "Rejected",
    statusDetail: "Incomplete docs",
    applicantInfo: {
      fullName: "Ana Reyes",
      philsysId: "PSN-2021-00456789",
      contact: "0919-456-7890",
      email: "ana.reyes@email.com",
      address: "78 Mabini St., Brgy. Centro, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Reyes Pharmacy",
      businessType: "Sole Proprietorship",
      businessAddress: "78 Mabini St., Brgy. Centro, Bagong Pag-asa",
      lineOfBusiness: "Pharmaceutical Retail",
      dtiSecNumber: "DTI-2026-007890",
      capitalization: "₱800,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "na" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "na" },
    ],
    aiCheck: [
      { label: "Missing document: Sanitary Permit from Municipal Health Office", status: "warning" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Awaiting this department's review", status: "warning" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
  {
    refNo: "BP-2026-00146",
    applicant: "Pedro Lim",
    businessName: "Lim Hardware",
    type: "Renewal",
    dateFiled: "Mar 18, 2026",
    status: "Approved",
    applicantInfo: {
      fullName: "Pedro Lim",
      philsysId: "PSN-2019-00567890",
      contact: "0920-567-8901",
      email: "pedro.lim@email.com",
      address: "12 Quezon Blvd., Brgy. Hilltop, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Lim Hardware",
      businessType: "Sole Proprietorship",
      businessAddress: "12 Quezon Blvd., Brgy. Hilltop, Bagong Pag-asa",
      lineOfBusiness: "Hardware & Construction Supplies",
      dtiSecNumber: "DTI-2023-003456",
      capitalization: "₱1,200,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "uploaded" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "uploaded" },
    ],
    aiCheck: [
      { label: "All required documents detected", status: "pass" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Approved", status: "pass" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
  {
    refNo: "BP-2026-00147",
    applicant: "Juan Dela Cruz",
    businessName: "Dela Cruz Trading",
    type: "New",
    dateFiled: "Mar 18, 2026",
    status: "For Review",
    applicantInfo: {
      fullName: "Juan Dela Cruz",
      philsysId: "PSN-2020-00678901",
      contact: "0917-678-9012",
      email: "juan.delacruz@email.com",
      address: "56 Aguinaldo St., Brgy. Poblacion, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Dela Cruz Trading",
      businessType: "Sole Proprietorship",
      businessAddress: "56 Aguinaldo St., Brgy. Poblacion, Bagong Pag-asa",
      lineOfBusiness: "General Merchandise",
      dtiSecNumber: "DTI-2026-009012",
      capitalization: "₱350,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "uploaded" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "na" },
    ],
    aiCheck: [
      { label: "All required documents detected", status: "pass" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Awaiting this department's review", status: "warning" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
  {
    refNo: "BP-2026-00148",
    applicant: "Elena Ramos",
    businessName: "Ramos Bakery",
    type: "New",
    dateFiled: "Mar 19, 2026",
    status: "For Review",
    applicantInfo: {
      fullName: "Elena Ramos",
      philsysId: "PSN-2021-00789012",
      contact: "0921-789-0123",
      email: "elena.ramos@email.com",
      address: "89 Luna St., Brgy. Centro, Bagong Pag-asa",
    },
    businessInfo: {
      businessName: "Ramos Bakery",
      businessType: "Sole Proprietorship",
      businessAddress: "89 Luna St., Brgy. Centro, Bagong Pag-asa",
      lineOfBusiness: "Food & Bakery",
      dtiSecNumber: "DTI-2026-010123",
      capitalization: "₱250,000",
    },
    documents: [
      { name: "Barangay Business Clearance", status: "uploaded" },
      { name: "DTI/SEC/CDA Certificate of Registration", status: "uploaded" },
      { name: "Contract of Lease or Land Title", status: "uploaded" },
      { name: "Community Tax Certificate (Cedula)", status: "uploaded" },
      { name: "Fire Safety Inspection Certificate", status: "uploaded" },
      { name: "Sanitary Permit", status: "uploaded" },
      { name: "Zoning Clearance", status: "uploaded" },
      { name: "Previous Year's Business Permit", status: "na" },
    ],
    aiCheck: [
      { label: "All required documents detected", status: "pass" },
      { label: "DTI Registration: Valid format, number matches records", status: "pass" },
      { label: "Barangay Clearance: Current year, correct barangay", status: "pass" },
      { label: "Zoning Clearance: Awaiting this department's review", status: "warning" },
      { label: "Fire Safety Certificate: Valid, issued by BFP Pag-asa", status: "pass" },
    ],
  },
];

export const trackingTimeline = [
  { step: "Application Submitted", department: "System", status: "completed" as const, date: "Mar 18, 2026" },
  { step: "Barangay Clearance Verification", department: "Barangay Hall", status: "completed" as const, date: "Mar 18, 2026" },
  { step: "Fire Safety Inspection", department: "BFP", status: "completed" as const, date: "Mar 19, 2026" },
  { step: "Sanitary/Health Clearance", department: "Municipal Health Office", status: "completed" as const, date: "Mar 19, 2026" },
  { step: "Zoning Compliance Check", department: "Zoning Office", status: "in-review" as const, date: "Mar 19, 2026" },
  { step: "Business Permit Assessment", department: "BPLO", status: "pending" as const, date: "—" },
  { step: "Treasury Payment", department: "Treasury", status: "pending" as const, date: "—" },
];

export const smsNotifications = [
  { time: "Mar 18, 10:23 AM", message: "Your business permit application BP-2026-00147 has been received. Estimated processing: 1-3 business days." },
  { time: "Mar 18, 2:15 PM", message: "Barangay clearance verified for BP-2026-00147." },
  { time: "Mar 19, 9:41 AM", message: "BFP fire safety inspection cleared for BP-2026-00147." },
  { time: "Mar 19, 11:02 AM", message: "Health/Sanitary clearance approved for BP-2026-00147." },
];
