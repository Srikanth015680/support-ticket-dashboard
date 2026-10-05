import { useState } from "react";
import type { FormEvent } from "react";

import { PRIORITY_LABELS, STATUS_LABELS } from "../lib/format";
import { controlClass, primaryButtonClass } from "../lib/ui";
import { PRIORITIES, STATUSES } from "../types/ticket";
import type {
  CreateTicketInput,
  Status,
} from "../types/ticket";
import { PriorityIcon } from "./Badges";
import SelectField from "./SelectField";

interface TicketFormProps {
  onSubmit: (values: CreateTicketInput) => void;
  isSubmitting: boolean;
  serverErrors?: Record<string, string>;
}

type FormErrors = Partial<
  Record<keyof CreateTicketInput, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TITLE_MAX_LENGTH = 120;

function validate(values: CreateTicketInput): FormErrors {
  const errors: FormErrors = {};

  const title = values.title.trim();
  const description = values.description.trim();
  const customerEmail = values.customerEmail.trim();

  if (!title) {
    errors.title = "Please enter a title.";
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`;
  }

  if (!description) {
    errors.description = "Please enter a description.";
  }

  if (!customerEmail) {
    errors.customerEmail =
      "Please enter the customer's email.";
  } else if (!EMAIL_PATTERN.test(customerEmail)) {
    errors.customerEmail =
      "Please enter a valid email address.";
  }

  return errors;
}

function inputClass(hasError: boolean) {
  return `${controlClass} py-2.5 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : ""
  }`;
}

export default function TicketForm({
  onSubmit,
  isSubmitting,
  serverErrors = {},
}: TicketFormProps) {
  const [values, setValues] = useState<CreateTicketInput>({
    title: "",
    description: "",
    customerEmail: "",
    priority: "MEDIUM",
    status: "OPEN",
  });

  const [clientErrors, setClientErrors] =
    useState<FormErrors>({});

  const errors: FormErrors = {
    ...serverErrors,
    ...clientErrors,
  };

  function setField<K extends keyof CreateTicketInput>(
    key: K,
    value: CreateTicketInput[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    setClientErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const foundErrors = validate(values);
    setClientErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      customerEmail: values.customerEmail.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="title"
          className="text-sm font-semibold"
        >
          Title
        </label>

        <input
          id="title"
          value={values.title}
          maxLength={TITLE_MAX_LENGTH}
          onChange={(event) =>
            setField("title", event.target.value)
          }
          aria-invalid={Boolean(errors.title)}
          aria-describedby="title-error title-count"
          className={`mt-1.5 ${inputClass(Boolean(errors.title))}`}
        />

        <div className="mt-1 flex justify-between text-xs">
          <span
            id="title-error"
            className="text-red-600"
          >
            {errors.title}
          </span>

          <span
            id="title-count"
            className={
              values.title.length >= TITLE_MAX_LENGTH
                ? "text-red-600"
                : "text-slate-400"
            }
          >
            {values.title.length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-semibold"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          value={values.description}
          onChange={(event) =>
            setField("description", event.target.value)
          }
          aria-invalid={Boolean(errors.description)}
          aria-describedby="description-error"
          className={`mt-1.5 ${inputClass(
            Boolean(errors.description),
          )}`}
        />

        {errors.description && (
          <p
            id="description-error"
            className="mt-1 text-xs text-red-600"
          >
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="customerEmail"
          className="text-sm font-semibold"
        >
          Customer email
        </label>

        <input
          id="customerEmail"
          type="email"
          value={values.customerEmail}
          onChange={(event) =>
            setField("customerEmail", event.target.value)
          }
          aria-invalid={Boolean(errors.customerEmail)}
          aria-describedby="customer-email-error"
          className={`mt-1.5 ${inputClass(
            Boolean(errors.customerEmail),
          )}`}
        />

        {errors.customerEmail && (
          <p
            id="customer-email-error"
            className="mt-1 text-xs text-red-600"
          >
            {errors.customerEmail}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-semibold">
          Priority
        </legend>

        <div className="mt-1.5 grid grid-cols-3 gap-3">
          {PRIORITIES.map((priority) => (
            <label
              key={priority}
              className="cursor-pointer"
            >
              <input
                type="radio"
                name="priority"
                value={priority}
                checked={values.priority === priority}
                onChange={() =>
                  setField("priority", priority)
                }
                className="peer sr-only"
              />

              <span className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 text-sm font-semibold transition-colors hover:bg-canvas peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-checked:ring-1 peer-checked:ring-brand-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500">
                <PriorityIcon priority={priority} />
                {PRIORITY_LABELS[priority]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="status"
          className="text-sm font-semibold"
        >
          Status
        </label>

        <div className="mt-1.5">
          <SelectField
            id="status"
            value={values.status}
            onChange={(event) =>
              setField(
                "status",
                event.target.value as Status,
              )
            }
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${primaryButtonClass} w-full sm:w-auto`}
      >
        {isSubmitting ? "Creating…" : "Create Ticket"}
      </button>
    </form>
  );
}