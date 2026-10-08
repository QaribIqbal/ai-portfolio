type AuditEmailValues = {
  clinicName: string;
  name: string;
  email: string;
  phone: string;
  smsTool: string;
};

export function buildAuditEmailHref({
  to,
  subject,
  values,
}: {
  to: string;
  subject: string;
  values: AuditEmailValues;
}) {
  const body = [
    `Clinic: ${values.clinicName}`,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "not provided"}`,
    `Patient SMS tool: ${values.smsTool || "not provided"}`,
    "",
    "I confirm this enquiry is about my clinic's own systems. No patient data is included.",
  ].join("\n");

  const query = new URLSearchParams({ subject: `${subject}: ${values.clinicName}`, body })
    .toString()
    .replace(/\+/g, "%20");

  return `mailto:${to}?${query}`;
}
