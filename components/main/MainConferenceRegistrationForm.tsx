"use client";

import { useId, useState } from "react";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import {
  MAIN_CONFERENCE_ATTENDANCE,
  MAIN_CONFERENCE_DAYS,
  MAIN_CONFERENCE_ROLES,
} from "@/lib/main-conference";
import { mainEmails } from "@/lib/main-routes";

/**
 * Conference registration form.
 *
 * The site has no backend, so a submission is delivered by opening the
 * visitor's mail client on a `mailto:` with the answers already formatted in
 * the body. Everything is validated here first, so what reaches the inbox is
 * always complete. Swap `sendRegistration` for a server action if a real
 * submission endpoint is added later.
 */

type Values = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  attendance: string;
  days: string[];
  accessibility: string;
  message: string;
  consent: boolean;
};

type FieldError = "required" | "email" | "days";

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  role: "",
  attendance: MAIN_CONFERENCE_ATTENDANCE[0].value,
  days: MAIN_CONFERENCE_DAYS.map((day) => day.id),
  accessibility: "",
  message: "",
  consent: false,
};

const fieldBase =
  "mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-600/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-sky-500";
const fieldInvalid = "border-red-500 focus:border-red-500 focus:ring-red-500/25";
const labelBase =
  "block text-sm font-semibold text-zinc-900 dark:text-zinc-100";
const optionalBase =
  "ml-2 text-[11px] font-normal uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500";

/** Simple shape check — real deliverability is confirmed by the reply, not here. */
function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function MainConferenceRegistrationForm() {
  const t = useTranslations();
  const formId = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, FieldError>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): Partial<Record<keyof Values, FieldError>> => {
    const next: Partial<Record<keyof Values, FieldError>> = {};
    if (!values.name.trim()) next.name = "required";
    if (!values.email.trim()) next.email = "required";
    else if (!isEmail(values.email)) next.email = "email";
    if (!values.role) next.role = "required";
    if (values.days.length === 0) next.days = "days";
    if (!values.consent) next.consent = "required";
    return next;
  };

  const errorText = (error: FieldError | undefined) => {
    if (!error) return null;
    if (error === "email") return t("pages.conference.register.errorEmail");
    if (error === "days") return t("pages.conference.register.errorDays");
    return t("pages.conference.register.errorRequired");
  };

  const sendRegistration = () => {
    const roleLabel = MAIN_CONFERENCE_ROLES.find((role) => role.value === values.role);
    const attendanceLabel = MAIN_CONFERENCE_ATTENDANCE.find(
      (option) => option.value === values.attendance,
    );
    const days = MAIN_CONFERENCE_DAYS.filter((day) => values.days.includes(day.id)).map(
      (day) => `${t(day.labelKey)} (${t(day.dateKey)})`,
    );

    const lines = [
      `${t("pages.conference.register.nameLabel")}: ${values.name.trim()}`,
      `${t("pages.conference.register.emailLabel")}: ${values.email.trim()}`,
      `${t("pages.conference.register.phoneLabel")}: ${values.phone.trim() || "—"}`,
      `${t("pages.conference.register.organizationLabel")}: ${values.organization.trim() || "—"}`,
      `${t("pages.conference.register.roleLabel")}: ${roleLabel ? t(roleLabel.labelKey) : values.role}`,
      `${t("pages.conference.register.attendanceLabel")} ${attendanceLabel ? t(attendanceLabel.labelKey) : values.attendance}`,
      `${t("pages.conference.register.daysLabel")} ${days.join(", ")}`,
      `${t("pages.conference.register.accessibilityLabel")}: ${values.accessibility.trim() || "—"}`,
      `${t("pages.conference.register.messageLabel")} ${values.message.trim() || "—"}`,
    ];

    const href =
      `mailto:${mainEmails.info}` +
      `?subject=${encodeURIComponent(t("pages.conference.register.emailSubject"))}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    sendRegistration();
    setSent(true);
  };

  if (sent) {
    return (
      <div
        className="rounded-3xl border border-sky-200 bg-white p-8 text-center shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] sm:p-10 dark:border-sky-900/40 dark:bg-zinc-900/60"
        role="status"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-600 to-indigo-500 text-white shadow-lg shadow-sky-900/20">
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {t("pages.conference.register.successTitle")}
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("pages.conference.register.successBody").replace("{email}", mainEmails.info)}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setSent(false);
          }}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {t("pages.conference.register.successReset")}
        </button>
      </div>
    );
  }

  const required = (
    <span className="text-red-600 dark:text-red-400">
      {" *"}
      <span className="sr-only">{` ${t("pages.conference.register.requiredMark")}`}</span>
    </span>
  );

  const errorFor = (key: keyof Values) => {
    const text = errorText(errors[key]);
    if (!text) return null;
    return (
      <p id={`${formId}-${key}-error`} className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
        {text}
      </p>
    );
  };

  const describedBy = (key: keyof Values) =>
    errors[key] ? `${formId}-${key}-error` : undefined;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] sm:p-8 lg:p-10 dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {t("pages.conference.register.requiredHint")}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelBase}>
            {t("pages.conference.register.nameLabel")}
            {required}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`${fieldBase} ${errors.name ? fieldInvalid : ""}`}
          />
          {errorFor("name")}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelBase}>
            {t("pages.conference.register.emailLabel")}
            {required}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${fieldBase} ${errors.email ? fieldInvalid : ""}`}
          />
          {errorFor("email")}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className={labelBase}>
            {t("pages.conference.register.phoneLabel")}
            <span className={optionalBase}>{t("pages.conference.register.phoneOptional")}</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            className={fieldBase}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-organization`} className={labelBase}>
            {t("pages.conference.register.organizationLabel")}
            <span className={optionalBase}>
              {t("pages.conference.register.organizationOptional")}
            </span>
          </label>
          <input
            id={`${formId}-organization`}
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={(event) => set("organization", event.target.value)}
            className={fieldBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-role`} className={labelBase}>
            {t("pages.conference.register.roleLabel")}
            {required}
          </label>
          <select
            id={`${formId}-role`}
            name="role"
            value={values.role}
            onChange={(event) => set("role", event.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={describedBy("role")}
            className={`${fieldBase} ${errors.role ? fieldInvalid : ""}`}
          >
            <option value="">{t("pages.conference.register.rolePlaceholder")}</option>
            {MAIN_CONFERENCE_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {t(role.labelKey)}
              </option>
            ))}
          </select>
          {errorFor("role")}
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className={labelBase}>
          {t("pages.conference.register.attendanceLabel")}
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {MAIN_CONFERENCE_ATTENDANCE.map((option) => (
            <label
              key={option.value}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                values.attendance === option.value
                  ? "border-sky-600 bg-sky-50 text-sky-800 dark:border-sky-500 dark:bg-sky-950/50 dark:text-sky-200"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <input
                type="radio"
                name={`${formId}-attendance`}
                value={option.value}
                checked={values.attendance === option.value}
                onChange={() => set("attendance", option.value)}
                className="size-4 accent-sky-700"
              />
              {t(option.labelKey)}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className={labelBase}>
          {t("pages.conference.register.daysLabel")}
          {required}
        </legend>
        <div
          className="mt-3 flex flex-wrap gap-3"
          aria-describedby={describedBy("days")}
        >
          {MAIN_CONFERENCE_DAYS.map((day) => {
            const checked = values.days.includes(day.id);
            return (
              <label
                key={day.id}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  checked
                    ? "border-sky-600 bg-sky-50 text-sky-800 dark:border-sky-500 dark:bg-sky-950/50 dark:text-sky-200"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <input
                  type="checkbox"
                  value={day.id}
                  checked={checked}
                  onChange={(event) =>
                    set(
                      "days",
                      event.target.checked
                        ? [...values.days, day.id]
                        : values.days.filter((id) => id !== day.id),
                    )
                  }
                  className="size-4 accent-sky-700"
                />
                {`${t(day.labelKey)} — ${t(day.dateKey)}`}
              </label>
            );
          })}
        </div>
        {errorFor("days")}
      </fieldset>

      <div className="mt-8 grid gap-6">
        <div>
          <label htmlFor={`${formId}-accessibility`} className={labelBase}>
            {t("pages.conference.register.accessibilityLabel")}
            <span className={optionalBase}>
              {t("pages.conference.register.accessibilityOptional")}
            </span>
          </label>
          <textarea
            id={`${formId}-accessibility`}
            name="accessibility"
            rows={2}
            value={values.accessibility}
            onChange={(event) => set("accessibility", event.target.value)}
            className={fieldBase}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className={labelBase}>
            {t("pages.conference.register.messageLabel")}
            <span className={optionalBase}>{t("pages.conference.register.messageOptional")}</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            className={fieldBase}
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => set("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4 shrink-0 accent-sky-700"
          />
          <span>
            {t("pages.conference.register.consentLabel")}
            {required}
          </span>
        </label>
        {errorFor("consent")}
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="mt-6 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {t("pages.conference.register.errorSummary")}
        </p>
      )}

      <button
        type="submit"
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-sky-600 sm:w-auto dark:bg-sky-600 dark:hover:bg-sky-500"
      >
        {t("pages.conference.register.submit")}
      </button>
    </form>
  );
}
