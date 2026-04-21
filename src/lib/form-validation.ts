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

export const agencySizeOptions = ["1-5", "6-9", "10-15", "16-25", "26+"] as const;
export const auditTimelineOptions = [
  "ASAP (within 2 weeks)",
  "This month",
  "Next month",
  "Next quarter",
  "Just exploring",
] as const;

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
        return "Please describe your biggest bottleneck.";
      }

      if (normalized.length < 12) {
        return "Please add a bit more detail (at least 12 characters).";
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

export function validateChecklistForm(values: ChecklistFormValues): ValidationErrors<ChecklistFormValues> {
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
        return "Please describe the main operational pain point.";
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
