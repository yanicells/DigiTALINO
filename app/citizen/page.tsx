"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  RotateCw,
  Upload,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";

const steps = ["Applicant Info", "Business Info", "Documents", "Review & Submit"];

const documents = [
  { name: "Barangay Business Clearance", required: true },
  { name: "DTI/SEC/CDA Certificate of Registration", required: true },
  { name: "Contract of Lease or Land Title", required: true },
  { name: "Community Tax Certificate (Cedula)", required: true },
  { name: "Fire Safety Inspection Certificate (from BFP)", required: true },
  { name: "Sanitary Permit (from Municipal Health Office)", required: true },
  { name: "Zoning Clearance", required: true },
  { name: "Previous Year's Business Permit (for renewal)", required: false },
];

const trackingTimeline = [
  { step: "Application Submitted", department: "System", status: "completed" as const, date: "Mar 18, 2026" },
  { step: "Barangay Clearance Verification", department: "Barangay Hall", status: "completed" as const, date: "Mar 18, 2026" },
  { step: "Fire Safety Inspection", department: "BFP", status: "completed" as const, date: "Mar 19, 2026" },
  { step: "Sanitary/Health Clearance", department: "Municipal Health Office", status: "completed" as const, date: "Mar 19, 2026" },
  { step: "Zoning Compliance Check", department: "Zoning Office", status: "in-review" as const, date: "Mar 19, 2026" },
  { step: "Business Permit Assessment", department: "BPLO", status: "pending" as const, date: "—" },
  { step: "Treasury Payment", department: "Treasury", status: "pending" as const, date: "—" },
];

const smsNotifications = [
  { time: "Mar 18, 10:23 AM", message: "Your business permit application BP-2026-00147 has been received. Estimated processing: 1-3 business days." },
  { time: "Mar 18, 2:15 PM", message: "Barangay clearance verified for BP-2026-00147." },
  { time: "Mar 19, 9:41 AM", message: "BFP fire safety inspection cleared for BP-2026-00147." },
  { time: "Mar 19, 11:02 AM", message: "Health/Sanitary clearance approved for BP-2026-00147." },
];

export default function CitizenPortal() {
  const [activeTab, setActiveTab] = useState<"apply" | "track">("apply");
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(true);
  const [trackRef, setTrackRef] = useState("BP-2026-00147");
  const [showTracking, setShowTracking] = useState(false);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [form, setForm] = useState({
    fullName: "Juan Dela Cruz",
    philsysId: "PSN-2020-00678901",
    contact: "0917-678-9012",
    email: "juan.delacruz@email.com",
    address: "56 Aguinaldo St., Brgy. Poblacion, Bagong Pag-asa",
    businessName: "Dela Cruz Trading",
    businessType: "Sole Proprietorship",
    businessAddress: "56 Aguinaldo St., Brgy. Poblacion, Bagong Pag-asa",
    lineOfBusiness: "General Merchandise",
    dtiSecNumber: "DTI-2026-009012",
    capitalization: "350000",
  });

  useEffect(() => {
    const activeStepButton = stepRefs.current[currentStep];
    if (!activeStepButton) return;

    activeStepButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentStep]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 3;

  return (
    <div className="min-h-full">
      <div className="px-4 sm:px-8 py-6 border-b border-border bg-white">
        <h1 className="text-xl font-semibold text-text-primary">
          Citizen Portal
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Business Permit Application — Municipality of Bagong Pag-asa
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-8 bg-white border-b border-border overflow-x-auto hide-scrollbar">
        <div className="flex gap-0 min-w-max">
          <button
            onClick={() => setActiveTab("apply")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "apply"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FileText size={15} />
              Apply for Business Permit
            </span>
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "track"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Search size={15} />
              Track Application
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        {activeTab === "apply" && !submitted && (
          <>
            {/* Stepper - scrollable on mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    onClick={() => setCurrentStep(i)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                      i === currentStep
                        ? "bg-primary text-white"
                        : i < currentStep
                        ? "bg-accent-green/10 text-accent-green"
                        : "bg-surface text-text-muted"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-semibold border-current">
                      {i < currentStep ? "✓" : i + 1}
                    </span>
                    {label}
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight size={14} className="text-text-muted" />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Applicant Info */}
            {currentStep === 0 && (
              <div className="bg-white border border-border rounded p-4 sm:p-6">
                <h2 className="font-semibold text-text-primary mb-4">
                  Applicant Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                  <Field label="PhilSys / eGovPH ID" value={form.philsysId} onChange={(v) => setForm({ ...form, philsysId: v })} />
                  <Field label="Contact Number" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} />
                  <Field label="Email Address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <div className="sm:col-span-2">
                    <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Info */}
            {currentStep === 1 && (
              <div className="bg-white border border-border rounded p-4 sm:p-6">
                <h2 className="font-semibold text-text-primary mb-4">
                  Business Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Business Name" value={form.businessName} onChange={(v) => setForm({ ...form, businessName: v })} />
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Business Type
                    </label>
                    <select
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm bg-white text-text-primary"
                    >
                      <option>Sole Proprietorship</option>
                      <option>Partnership</option>
                      <option>Corporation</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Business Address" value={form.businessAddress} onChange={(v) => setForm({ ...form, businessAddress: v })} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Line of Business / Industry
                    </label>
                    <select
                      value={form.lineOfBusiness}
                      onChange={(e) => setForm({ ...form, lineOfBusiness: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm bg-white text-text-primary"
                    >
                      <option>General Merchandise</option>
                      <option>Food & Beverage</option>
                      <option>Retail Trade</option>
                      <option>Automotive Services</option>
                      <option>Pharmaceutical Retail</option>
                      <option>Hardware & Construction</option>
                      <option>Professional Services</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                  <Field label="DTI/SEC Registration Number" value={form.dtiSecNumber} onChange={(v) => setForm({ ...form, dtiSecNumber: v })} />
                  <Field label="Capitalization Amount (₱)" value={form.capitalization} onChange={(v) => setForm({ ...form, capitalization: v })} />
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 2 && (
              <div className="bg-white border border-border rounded p-4 sm:p-6">
                <h2 className="font-semibold text-text-primary mb-4">
                  Required Documents Upload
                </h2>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border border-border rounded"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <Upload size={16} className="text-text-muted" />
                        <span className="text-sm text-text-primary wrap-break-word">
                          {doc.name}
                        </span>
                      </div>
                      {doc.required ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                          <CheckCircle2 size={12} />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">N/A (New Application)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 3 && (
              <div className="bg-white border border-border rounded p-4 sm:p-6">
                <h2 className="font-semibold text-text-primary mb-4">
                  Review & Submit
                </h2>
                <div className="space-y-4 mb-6">
                  <ReviewSection title="Applicant Information">
                    <ReviewRow label="Full Name" value={form.fullName} />
                    <ReviewRow label="PhilSys ID" value={form.philsysId} />
                    <ReviewRow label="Contact" value={form.contact} />
                    <ReviewRow label="Email" value={form.email} />
                    <ReviewRow label="Address" value={form.address} />
                  </ReviewSection>
                  <ReviewSection title="Business Information">
                    <ReviewRow label="Business Name" value={form.businessName} />
                    <ReviewRow label="Business Type" value={form.businessType} />
                    <ReviewRow label="Business Address" value={form.businessAddress} />
                    <ReviewRow label="Line of Business" value={form.lineOfBusiness} />
                    <ReviewRow label="DTI/SEC Number" value={form.dtiSecNumber} />
                    <ReviewRow label="Capitalization" value={`₱${Number(form.capitalization).toLocaleString()}`} />
                  </ReviewSection>
                  <ReviewSection title="Documents">
                    <div className="text-sm text-accent-green">
                      7 of 7 required documents uploaded
                    </div>
                  </ReviewSection>
                </div>
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    I consent to the processing of my personal data in accordance
                    with the Data Privacy Act of 2012 (RA 10173)
                  </span>
                </label>
                <button
                  disabled={!consent}
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Application
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:justify-between sm:items-center gap-2 mt-4">
              <button
                onClick={() => {
                  if (isFirstStep) return;
                  setCurrentStep(Math.max(0, currentStep - 1));
                }}
                aria-disabled={isFirstStep}
                className={`inline-flex h-11 items-center justify-center gap-1 rounded border border-border bg-white px-4 py-2 text-sm font-medium text-text-secondary transition-colors ${
                  isLastStep ? "col-span-2 sm:col-span-1" : "col-span-1"
                } ${
                  isFirstStep
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-surface hover:text-text-primary"
                }`}
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              {!isLastStep && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="col-span-1 inline-flex h-11 items-center justify-center gap-1 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </>
        )}

        {/* Success Modal */}
        {activeTab === "apply" && submitted && (
            <div className="bg-white border border-border rounded p-5 sm:p-8 text-center max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-accent-green" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Application Submitted Successfully
            </h2>
            <div className="bg-surface rounded p-4 mb-4">
              <div className="text-xs text-text-muted mb-1">Reference Number</div>
              <div className="text-lg font-bold text-primary">BP-2026-00147</div>
            </div>
            <div className="text-sm text-text-secondary space-y-2 text-left mb-6">
              <p>
                Your application has been submitted and routed to all required
                departments for parallel processing.
              </p>
              <p>
                You will receive SMS updates at <strong>0917-XXX-XXXX</strong> as
                your application progresses.
              </p>
              <p>
                Expected processing time: <strong>1–3 business days</strong>
              </p>
              <p>
                You will need to visit the municipal hall only for permit pickup.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
                setConsent(false);
              }}
              className="px-4 py-2 text-sm text-primary hover:underline"
            >
              Submit Another Application
            </button>
          </div>
        )}

        {/* Track Application */}
        {activeTab === "track" && (
          <>
            <div className="bg-white border border-border rounded p-4 sm:p-6 mb-6">
              <h2 className="font-semibold text-text-primary mb-3">
                Track Your Application
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  placeholder="Enter Reference Number (e.g., BP-2026-00147)"
                  className="flex-1 px-3 py-2 border border-border rounded text-sm"
                />
                <button
                  onClick={() => setShowTracking(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-dark transition-colors"
                >
                  Track
                </button>
              </div>
            </div>

            {showTracking && (
              <>
                {/* Visual Timeline */}
                <div className="bg-white border border-border rounded p-4 sm:p-6 mb-6">
                  <h3 className="font-semibold text-text-primary mb-1">
                    Application Timeline
                  </h3>
                  <p className="text-xs text-text-muted mb-6">
                    Reference: {trackRef} — All departments process simultaneously
                  </p>
                  <div className="space-y-0">
                    {trackingTimeline.map((item, i) => (
                      <div key={i} className="flex gap-3 sm:gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              item.status === "completed"
                                ? "bg-accent-green text-white"
                                : item.status === "in-review"
                                ? "bg-primary text-white"
                                : "bg-surface text-text-muted border border-border"
                            }`}
                          >
                            {item.status === "completed" ? (
                              <CheckCircle2 size={16} />
                            ) : item.status === "in-review" ? (
                              <RotateCw size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                          </div>
                          {i < trackingTimeline.length - 1 && (
                            <div
                              className={`w-0.5 h-10 ${
                                item.status === "completed"
                                  ? "bg-accent-green"
                                  : "bg-border"
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-6 min-w-0">
                          <div className="text-sm font-medium text-text-primary wrap-break-word">
                            {item.step}
                          </div>
                          <div className="text-xs text-text-secondary wrap-break-word">
                            {item.department}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={item.status} />
                            <span className="text-xs text-text-muted">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notification Log */}
                <div className="bg-white border border-border rounded p-4 sm:p-6">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <MessageSquare size={16} />
                    SMS Notifications
                  </h3>
                  <div className="space-y-3">
                    {smsNotifications.map((sms, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row gap-1 sm:gap-3 px-4 py-3 bg-surface rounded text-sm"
                      >
                        <span className="text-xs text-text-muted font-medium shrink-0">
                          {sms.time}
                        </span>
                        <span className="text-text-secondary wrap-break-word">{sms.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-border rounded text-sm text-text-primary bg-white"
      />
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-text-muted mb-3">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-0">
      <span className="text-xs text-text-muted w-auto sm:w-36 shrink-0">{label}</span>
      <span className="text-sm text-text-primary wrap-break-word">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: "completed" | "in-review" | "pending" }) {
  if (status === "completed")
    return (
      <span className="text-[11px] font-medium text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded">
        Completed
      </span>
    );
  if (status === "in-review")
    return (
      <span className="text-[11px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
        In Review
      </span>
    );
  return (
    <span className="text-[11px] font-medium text-text-muted bg-surface px-1.5 py-0.5 rounded border border-border">
      Pending
    </span>
  );
}
