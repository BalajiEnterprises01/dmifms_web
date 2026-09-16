"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mirrors the server schema in api/contact/route.ts.
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const fieldClass = (invalid: boolean) =>
  cn(
    "w-full rounded-none border-0 border-b bg-transparent px-0 pb-2 text-base text-ink outline-none transition-colors duration-300 placeholder:text-tan focus:border-ink md:text-[15px]",
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
        className="shrink-0 text-[clamp(1.75rem,4.2vw,4rem)] leading-[0.95] tracking-[-0.04em] text-ink uppercase">
        {label}
      </label>
      <div className="min-w-0 flex-1 md:pb-1.5">
        {children}
        {error && (
          <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-destructive">
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
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
      reset();
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
        <p className="text-[clamp(2rem,4.2vw,4rem)] leading-[0.95] tracking-[-0.04em] text-ink uppercase">
          Message sent.
        </p>
        <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-clay">
          Thank you for reaching out. Our team will get back to you within 24 business hours.
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="link-wipe mt-8">
          Send another message <span aria-hidden>↗</span>
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border-t border-ink/10 pt-6">
      <Line label="Hello, my name is" htmlFor="name" error={errors.name?.message}>
        <input {...register("name")} {...a11y("name")} autoComplete="name" placeholder="First & last name" className={fieldClass(!!errors.name)} />
      </Line>

      <Line label="I represent" htmlFor="company" error={errors.company?.message}>
        <input {...register("company")} {...a11y("company")} autoComplete="organization" placeholder="Company or site name" className={fieldClass(!!errors.company)} />
      </Line>

      <Line label="I'm looking for" htmlFor="service" error={errors.service?.message}>
        <div className="relative">
          <select
            {...register("service")}
            {...a11y("service")}
            defaultValue=""
            className={cn(fieldClass(!!errors.service), "cursor-pointer appearance-none pr-8")}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-0 bottom-3 text-xs text-clay">
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
        <Line label="Details" htmlFor="message" error={errors.message?.message} className="flex-1">
          <textarea
            {...register("message")}
            {...a11y("message")}
            rows={2}
            placeholder="Site type, size, location and timelines"
            className={cn(fieldClass(!!errors.message), "resize-none")}
          />
        </Line>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="flex size-32 shrink-0 items-center justify-center self-end rounded-full bg-brand p-4 text-center text-xs leading-tight font-bold tracking-[0.14em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep disabled:opacity-60 md:mb-4 md:size-36">
          {loading ? "Sending…" : "Send request"}
        </motion.button>
      </div>

      {submitError && (
        <p role="alert" className="mt-6 border-l-2 border-destructive pl-4 text-sm text-destructive">
          {submitError}
        </p>
      )}
    </form>
  );
}
