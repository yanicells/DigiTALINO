"use client";

import { useState } from "react";
import { applications, type Application } from "@/data/applications";
import {
  CheckCircle2,
  XCircle,
  RotateCw,
  Eye,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  X,
  Bot,
  Loader2,
} from "lucide-react";

export default function StaffPortal() {
  const [appList, setAppList] = useState(applications);
  const [selected, setSelected] = useState<Application | null>(null);
  const [actionDone, setActionDone] = useState<string | null>(null);

  const stats = {
    today: 12,
    pending: appList.filter(
      (a) => a.status === "For Review" || a.status === "In Review",
    ).length,
    approved: appList.filter((a) => a.status === "Approved").length,
    rejected: appList.filter((a) => a.status === "Rejected").length,
  };

  function handleAction(refNo: string, action: "Approved" | "Rejected") {
    setAppList((prev) =>
      prev.map((a) => (a.refNo === refNo ? { ...a, status: action } : a)),
    );
    setActionDone(`${refNo} — ${action}. SMS notification sent to applicant.`);
    setSelected(null);
    setTimeout(() => setActionDone(null), 4000);
  }

  return (
    <div className="min-h-full">
      <div className="px-8 py-6 border-b border-border bg-white">
        <h1 className="text-xl font-semibold text-text-primary">
          Zoning Office — Application Review Queue
        </h1>
        <p className="text-sm text-text-secondary mt-1">Staff Portal</p>
      </div>

      {/* Stats */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard label="Applications Today" value={stats.today} />
          <StatCard
            label="Pending Review"
            value={stats.pending}
            color="text-accent-amber"
          />
          <StatCard
            label="Approved Today"
            value={stats.approved}
            color="text-accent-green"
          />
          <StatCard
            label="Rejected Today"
            value={stats.rejected}
            color="text-accent-red"
          />
        </div>

        {/* Action confirmation */}
        {actionDone && (
          <div className="mb-4 px-4 py-3 bg-accent-green/10 border border-accent-green/20 rounded text-sm text-accent-green flex items-center gap-2">
            <CheckCircle2 size={16} />
            {actionDone}
          </div>
        )}

        {/* Application Queue Table */}
        <div className="bg-white border border-border rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Ref. No.
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Applicant
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Business Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Type
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Date Filed
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary text-xs uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appList.map((app) => (
                <tr
                  key={app.refNo}
                  className="border-b border-border last:border-0 hover:bg-surface/50"
                >
                  <td className="px-4 py-3 font-mono text-xs">{app.refNo}</td>
                  <td className="px-4 py-3">{app.applicant}</td>
                  <td className="px-4 py-3">{app.businessName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        app.type === "New"
                          ? "bg-primary/10 text-primary"
                          : "bg-surface text-text-secondary"
                      }`}
                    >
                      {app.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {app.dateFiled}
                  </td>
                  <td className="px-4 py-3">
                    <AppStatusBadge
                      status={app.status}
                      detail={app.statusDetail}
                    />
                  </td>
                  <td className="px-4 py-3">
                    {app.status === "For Review" ? (
                      <button
                        onClick={() => setSelected(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                      >
                        <ClipboardCheck size={12} />
                        Review
                      </button>
                    ) : app.status === "AI Review" ? (
                      <button
                        onClick={() => setSelected(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-violet-600 border border-violet-200 rounded hover:bg-violet-50 transition-colors"
                      >
                        <Loader2 size={12} className="animate-spin" />
                        Processing
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelected(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Eye size={12} />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/20 flex justify-end z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-140 bg-white h-full overflow-y-auto shadow-lg border-l border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-text-primary">
                  {selected.refNo}
                </h2>
                <p className="text-xs text-text-secondary">
                  {selected.applicant} — {selected.businessName}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-text-muted hover:text-text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Applicant Details */}
              <DetailSection title="Applicant Details">
                <DetailRow
                  label="Full Name"
                  value={selected.applicantInfo.fullName}
                />
                <DetailRow
                  label="PhilSys ID"
                  value={selected.applicantInfo.philsysId}
                />
                <DetailRow
                  label="Contact"
                  value={selected.applicantInfo.contact}
                />
                <DetailRow label="Email" value={selected.applicantInfo.email} />
                <DetailRow
                  label="Address"
                  value={selected.applicantInfo.address}
                />
              </DetailSection>

              {/* Business Details */}
              <DetailSection title="Business Details">
                <DetailRow
                  label="Business Name"
                  value={selected.businessInfo.businessName}
                />
                <DetailRow
                  label="Type"
                  value={selected.businessInfo.businessType}
                />
                <DetailRow
                  label="Address"
                  value={selected.businessInfo.businessAddress}
                />
                <DetailRow
                  label="Industry"
                  value={selected.businessInfo.lineOfBusiness}
                />
                <DetailRow
                  label="DTI/SEC No."
                  value={selected.businessInfo.dtiSecNumber}
                />
                <DetailRow
                  label="Capitalization"
                  value={selected.businessInfo.capitalization}
                />
              </DetailSection>

              {/* Documents */}
              <DetailSection title="Uploaded Documents">
                <div className="space-y-2">
                  {selected.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-text-primary flex items-center gap-2">
                        <FileText size={14} className="text-text-muted" />
                        {doc.name}
                      </span>
                      {doc.status === "uploaded" ? (
                        <button className="text-xs text-primary hover:underline">
                          View Document
                        </button>
                      ) : (
                        <span className="text-xs text-text-muted">N/A</span>
                      )}
                    </div>
                  ))}
                </div>
              </DetailSection>

              {/* AI Pre-Check */}
              <DetailSection title="AI Document Pre-Check Results">
                {selected.status === "AI Review" && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-violet-50 border border-violet-100 rounded">
                    <Loader2
                      size={13}
                      className="text-violet-500 animate-spin shrink-0"
                    />
                    <span className="text-xs text-violet-700 font-medium">
                      AI scanner in progress — cross-referencing against
                      government registries
                    </span>
                  </div>
                )}
                <div className="space-y-2">
                  {selected.aiCheck.map((check, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      {check.status === "pass" ? (
                        <CheckCircle2
                          size={16}
                          className="text-accent-green mt-0.5 shrink-0"
                        />
                      ) : check.status === "warning" ? (
                        <AlertTriangle
                          size={16}
                          className="text-accent-amber mt-0.5 shrink-0"
                        />
                      ) : (
                        <Loader2
                          size={16}
                          className="text-violet-400 mt-0.5 shrink-0 animate-spin"
                        />
                      )}
                      <span
                        className={
                          check.status === "info"
                            ? "text-text-secondary"
                            : "text-text-primary"
                        }
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </DetailSection>

              {/* Actions */}
              {selected.status === "For Review" && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => handleAction(selected.refNo, "Approved")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-accent-green text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle2 size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(selected.refNo, "Rejected")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-accent-red text-white rounded hover:bg-red-700 transition-colors"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-white border border-border rounded p-4">
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color || "text-text-primary"}`}>
        {value}
      </div>
    </div>
  );
}

function AppStatusBadge({
  status,
  detail,
}: {
  status: Application["status"];
  detail?: string;
}) {
  switch (status) {
    case "Approved":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-green">
          <CheckCircle2 size={12} />
          Approved
        </span>
      );
    case "Rejected":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-red">
          <XCircle size={12} />
          Rejected{detail ? ` — ${detail}` : ""}
        </span>
      );
    case "For Review":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
          <RotateCw size={12} />
          For Review
        </span>
      );
    case "In Review":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-amber">
          <RotateCw size={12} />
          In Review
        </span>
      );
    case "AI Review":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">
          <Bot size={12} />
          AI Review
        </span>
      );
  }
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-wide text-text-muted mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm py-1">
      <span className="text-text-muted w-28 shrink-0">{label}</span>
      <span className="text-text-primary">{value}</span>
    </div>
  );
}
