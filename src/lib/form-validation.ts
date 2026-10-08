export type ChecklistFormValues = {
  name: string;
  email: string;
  agencySize: string;
  biggestBottleneck: string;
};

export type AuditFormValues = {
  name: string;
  email: string;
  agencySize: string;
  primaryServices: string;
  biggestPain: string;
  timeline: string;
};

type ValidationErrors<T extends Record<string, string>> = Partial<Record<keyof T, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const agencySizeOptions = ["1-5", "6-10", "11-20", "20+"] as const;
export const auditTimelineOptions = ["Immediately", "1-2 weeks", "1 month+"] as const;

const agencySizeSet = new Set<string>(agencySizeOptions);
const auditTimelineSet = new Set<string>(auditTimelineOptions);

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function validateName(value: string) {
  const normalized = normalize(value);

  if (!normalized) {
    return "Please enter your name.";
  }

  if (normalized.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (normalized.length > 80) {
    return "Name is too long. Keep it under 80 characters.";
  }

  return undefined;
}

function validateEmail(value: string) {
  const normalized = normalize(value);

  if (!normalized) {
    return "Please enter your work email.";
  }

  if (normalized.length > 120) {
    return "Email is too long. Keep it under 120 characters.";
  }

  if (!emailPattern.test(normalized)) {
    return "Please enter a valid email address.";
  }

  return undefined;
}

function validateAgencySize(value: string) {
  if (!value) {
    return "Please select your agency size.";
  }

  if (!agencySizeSet.has(value)) {
    return "Please choose a valid agency size option.";
  }

  return undefined;
}

export function sanitizeChecklistForm(values: ChecklistFormValues): ChecklistFormValues {
  return {
    ...values,
    name: normalize(values.name),
    email: normalize(values.email),
    biggestBottleneck: normalize(values.biggestBottleneck),
  };
}

export function validateChecklistField(
  field: keyof ChecklistFormValues,
  values: ChecklistFormValues,
) {
  switch (field) {
    case "name":
      return validateName(values.name);
    case "email":
      return validateEmail(values.email);
    case "agencySize":
      return validateAgencySize(values.agencySize);
    case "biggestBottleneck": {
      const normalized = normalize(values.biggestBottleneck);
      if (!normalized) {
        return undefined;
      }

      if (normalized.length > 600) {
        return "Please keep this under 600 characters.";
      }

      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateChecklistForm(
  values: ChecklistFormValues,
): ValidationErrors<ChecklistFormValues> {
  const errors: ValidationErrors<ChecklistFormValues> = {};

  (Object.keys(values) as Array<keyof ChecklistFormValues>).forEach((field) => {
    const message = validateChecklistField(field, values);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}

export function sanitizeAuditForm(values: AuditFormValues): AuditFormValues {
  return {
    ...values,
    name: normalize(values.name),
    email: normalize(values.email),
    primaryServices: normalize(values.primaryServices),
    biggestPain: normalize(values.biggestPain),
  };
}

export function validateAuditField(field: keyof AuditFormValues, values: AuditFormValues) {
  switch (field) {
    case "name":
      return validateName(values.name);
    case "email":
      return validateEmail(values.email);
    case "agencySize":
      return validateAgencySize(values.agencySize);
    case "primaryServices": {
      const normalized = normalize(values.primaryServices);
      if (!normalized) {
        return "Please list your primary services.";
      }

      if (normalized.length < 4) {
        return "Please add at least one clear service.";
      }

      if (normalized.length > 140) {
        return "Please keep this under 140 characters.";
      }

      return undefined;
    }
    case "biggestPain": {
      const normalized = normalize(values.biggestPain);
      if (!normalized) {
        return "Please describe your biggest pain point right now.";
      }

      if (normalized.length < 16) {
        return "Please add a little more context (at least 16 characters).";
      }

      if (normalized.length > 800) {
        return "Please keep this under 800 characters.";
      }

      return undefined;
    }
    case "timeline": {
      if (!values.timeline) {
        return "Please choose a timeline.";
      }

      if (!auditTimelineSet.has(values.timeline)) {
        return "Please choose one of the timeline options.";
      }

      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateAuditForm(values: AuditFormValues): ValidationErrors<AuditFormValues> {
  const errors: ValidationErrors<AuditFormValues> = {};

  (Object.keys(values) as Array<keyof AuditFormValues>).forEach((field) => {
    const message = validateAuditField(field, values);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}

export type DentalAuditFormValues = {
  clinicName: string;
  name: string;
  email: string;
  phone: string;
  smsTool: string;
  consent: boolean;
};

export type DentalAuditFormErrors = Partial<Record<keyof DentalAuditFormValues, string>>;

const australianPhonePatterns = [/^0[2378]\d{8}$/, /^04\d{8}$/, /^1[38]00\d{6}$/, /^13\d{4}$/];

function isAustralianPhone(value: string) {
  if (!/^[+\d\s()-]+$/.test(value)) {
    return false;
  }

  let digits = value.replace(/[\s()-]/g, "");
  if (digits.startsWith("+61")) {
    digits = `0${digits.slice(3)}`;
  } else if (digits.startsWith("+")) {
    return false;
  }

  return australianPhonePatterns.some((pattern) => pattern.test(digits));
}

export function sanitizeDentalAuditForm(values: DentalAuditFormValues): DentalAuditFormValues {
  return {
    ...values,
    clinicName: normalize(values.clinicName),
    name: normalize(values.name),
    email: normalize(values.email),
    phone: normalize(values.phone),
    smsTool: normalize(values.smsTool),
  };
}

export function validateDentalAuditField(
  field: keyof DentalAuditFormValues,
  values: DentalAuditFormValues,
) {
  switch (field) {
    case "clinicName": {
      const normalized = normalize(values.clinicName);
      if (!normalized) {
        return "Please enter your clinic name.";
      }

      if (normalized.length > 120) {
        return "Clinic name is too long. Keep it under 120 characters.";
      }

      return undefined;
    }
    case "name":
      return validateName(values.name);
    case "email":
      return validateEmail(values.email);
    case "phone": {
      const normalized = normalize(values.phone);
      if (!normalized) {
        return undefined;
      }

      if (!isAustralianPhone(normalized)) {
        return "Please enter an Australian phone number, or leave it blank.";
      }

      return undefined;
    }
    case "smsTool":
      return normalize(values.smsTool).length > 200
        ? "Please keep this under 200 characters."
        : undefined;
    case "consent":
      return values.consent ? undefined : "Please confirm before sending.";
    default:
      return undefined;
  }
}

export function validateDentalAuditForm(values: DentalAuditFormValues): DentalAuditFormErrors {
  const errors: DentalAuditFormErrors = {};

  (Object.keys(values) as Array<keyof DentalAuditFormValues>).forEach((field) => {
    const message = validateDentalAuditField(field, values);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}
