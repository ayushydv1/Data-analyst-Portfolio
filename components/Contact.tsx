"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) {
      setStatus("sent");
      form.reset();
      return;
    }

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        fallback?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not send the message.");
      }

      if (result.fallback) {
        const subject = encodeURIComponent(
          `Portfolio message from ${payload.name}`,
        );
        const body = encodeURIComponent(
          `${payload.message}\n\n— ${payload.name} <${payload.email}>`,
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="08"
            eyebrow="Contact"
            title="Let’s talk dashboards, models and KPIs."
          />
          <h2 id="contact-heading" className="sr-only">
            Contact
          </h2>
          <Reveal>
            <p className="text-muted">
              Based in {site.location}. Reach out for Power BI, analytics or
              reporting work.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-fg hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedinHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg hover:text-accent"
                >
                  LinkedIn · {site.linkedinLabel}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8"
            noValidate
          >
            <div className="sr-only" aria-hidden>
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" name="name" required autoComplete="name" />
              <Field
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                className="bg-accent text-bg disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Sending
                  </>
                ) : status === "sent" ? (
                  <>
                    <Check className="size-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send message
                  </>
                )}
              </MagneticButton>
              {status === "error" ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              {status === "sent" ? (
                <p className="text-sm text-accent" role="status">
                  Thanks — I’ll get back to you.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
