"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mirrors the server schema in api/contact/route.ts.
const schema = z
  .object({
    enquiryType: z.enum(["service", "job", "other"]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().max(120),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(10, "Enter a valid phone number"),
    service: z.string().min(1, "Please choose an option"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })
  // Only a service enquiry has to name an organisation.
  .superRefine((data, ctx) => {
    if (data.enquiryType === "service" && data.company.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Company name required" });
    }
  });

type FormData = z.infer<typeof schema>;

const ENQUIRY_TYPES = [
  { value: "service", label: "I need facility services" },
  { value: "job", label: "I'm applying for a job" },
  { value: "other", label: "Something else" },
] as const;

/** Field labels and placeholders change with who is writing in. */
const COPY = {
  service: {
    company: "I represent",
    companyPlaceholder: "Company or site name",
    service: "I'm looking for",
    servicePlaceholder: "Select a service",
    details: "Details",
    detailsPlaceholder: "Site type, size, location and timelines",
    submit: "Send request",
    sent: "Request sent.",
    sentBody: "Thank you for reaching out. Our team will get back to you within 24 business hours.",
  },
  job: {
    company: "I currently work at",
    companyPlaceholder: "Employer (leave blank if none)",
    service: "I'd like to work in",
    servicePlaceholder: "Select an area",
    details: "About me",
    detailsPlaceholder: "Your experience, location and notice period",
    submit: "Send application",
    sent: "Application sent.",
    sentBody:
      "Thank you for your interest in working with DM23 IFMS. Our team reviews every application and will contact you if there is a suitable opening.",
  },
  other: {
    company: "I represent",
    companyPlaceholder: "Company or organisation (optional)",
    service: "This is about",
    servicePlaceholder: "Select a topic",
    details: "Details",
    detailsPlaceholder: "How can we help?",
    submit: "Send message",
    sent: "Message sent.",
    sentBody: "Thank you for reaching out. Our team will get back to you within 24 business hours.",
  },
} as const;

const fieldClass = (invalid: boolean) =>
  cn(
    "w-full rounded-none border-0 border-b bg-transparent px-0 pb-2 text-base text-ink outline-none transition-colors duration-300 placeholder:text-tan focus:border-ink md:text-base",
    invalid ? "border-destructive" : "border-ink/20",
  );

interface LineProps {
  label: string;
  htmlFor: keyof FormData;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

/** One sentence of the form: oversized label, then an underlined field. */
function Line({ label, htmlFor, error, children, className }: LineProps) {
  return (
    <div className={cn("flex flex-col gap-3 py-3 md:flex-row md:items-end md:gap-6 md:py-4", className)}>
      <label
        htmlFor={htmlFor}
        className="shrink-0 text-heading leading-[0.95] tracking-[-0.04em] text-ink uppercase">
        {label}
      </label>
      <div className="min-w-0 flex-1 md:pb-1.5">
        {children}
        {error && (
          <p id={`${htmlFor}-error`} className="mt-1.5 text-[14px] text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

interface ContactFormClientProps {
  /** Built server-side from data/services.json (see ContactForm.tsx). */
  serviceOptions: string[];
}

export default function ContactFormClient({ serviceOptions }: ContactFormClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { enquiryType: "service", company: "" },
  });

  const enquiryType = watch("enquiryType") ?? "service";
  const copy = COPY[enquiryType];

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset({ enquiryType, company: "" });
    } catch {
      setSubmitError(
        "Sorry, we could not send your message. Please try again or email us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  const a11y = (field: keyof FormData) => ({
    id: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  if (submitted) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-ink/10 py-12 md:py-16">
        <p className="text-heading leading-[0.95] tracking-[-0.04em] text-ink uppercase">
          {copy.sent}
        </p>
        <p className="mt-6 max-w-md text-body leading-[1.7] text-clay">{copy.sentBody}</p>
        <button type="button" onClick={() => setSubmitted(false)} className="link-wipe mt-8">
          Send another message <span aria-hidden>↗</span>
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border-t border-ink/10 pt-6">
      <fieldset className="pb-4 md:pb-6">
        <legend className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">
          I am writing because
        </legend>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {ENQUIRY_TYPES.map((option) => (
            <label key={option.value} className="inline-flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                value={option.value}
                {...register("enquiryType")}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="size-3.5 shrink-0 rounded-full border border-ink/30 transition-colors duration-300 peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-focus-visible:ring-offset-2"
              />
              <span className="text-base text-clay transition-colors duration-300 peer-checked:font-semibold peer-checked:text-ink">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Line label="Hello, my name is" htmlFor="name" error={errors.name?.message}>
        <input {...register("name")} {...a11y("name")} autoComplete="name" placeholder="First & last name" className={fieldClass(!!errors.name)} />
      </Line>

      <Line label={copy.company} htmlFor="company" error={errors.company?.message}>
        <input {...register("company")} {...a11y("company")} autoComplete="organization" placeholder={copy.companyPlaceholder} className={fieldClass(!!errors.company)} />
      </Line>

      <Line label={copy.service} htmlFor="service" error={errors.service?.message}>
        <div className="relative">
          <select
            {...register("service")}
            {...a11y("service")}
            defaultValue=""
            className={cn(fieldClass(!!errors.service), "cursor-pointer appearance-none pr-8")}>
            <option value="" disabled>
              {copy.servicePlaceholder}
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-0 bottom-3 text-[14px] text-clay">
            ▾
          </span>
        </div>
      </Line>

      <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-2">
        <Line label="My phone" htmlFor="phone" error={errors.phone?.message}>
          <input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={fieldClass(!!errors.phone)} />
        </Line>
        <Line label="My email" htmlFor="email" error={errors.email?.message}>
          <input {...register("email")} {...a11y("email")} type="email" autoComplete="email" placeholder="name@company.com" className={fieldClass(!!errors.email)} />
        </Line>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-10">
        <Line label={copy.details} htmlFor="message" error={errors.message?.message} className="flex-1">
          <textarea
            {...register("message")}
            {...a11y("message")}
            rows={2}
            placeholder={copy.detailsPlaceholder}
            className={cn(fieldClass(!!errors.message), "resize-none")}
          />
        </Line>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="flex size-32 shrink-0 items-center justify-center self-end rounded-full bg-brand p-4 text-center text-[14px] leading-tight font-bold tracking-[0.14em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep disabled:opacity-60 md:mb-4 md:size-36">
          {loading ? "Sending…" : copy.submit}
        </motion.button>
      </div>

      {submitError && (
        <p role="alert" className="mt-6 border-l-2 border-destructive pl-4 text-base text-destructive">
          {submitError}
        </p>
      )}
    </form>
  );
}
