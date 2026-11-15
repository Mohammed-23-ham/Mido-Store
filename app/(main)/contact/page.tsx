"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, type FormEvent } from "react";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
} | null;

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      setStatus({
        type: "error",
        message: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    setIsSending(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      formRef.current.reset();
      setStatus({
        type: "success",
        message: "Thanks for your message. We’ll be in touch within 24 hours.",
      });
    } catch (error) {
      console.error("Failed to send contact form message.", error);
      setStatus({
        type: "error",
        message: "Your message could not be sent. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-[682px] px-4 py-16 font-[family-name:var(--font-manrope)] sm:px-6">
      <h1 className="font-[family-name:var(--font-fraunces)] text-5xl leading-tight tracking-tight">
        Say hello.
      </h1>
      <p className="mt-1 text-base text-muted-foreground">
        We reply within 24 hours.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="from_name"
            type="text"
            autoComplete="name"
            placeholder="Name"
            required
            className="h-[50px] min-w-0 rounded-[22px] border border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="reply_to"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            className="h-[50px] min-w-0 rounded-[22px] border border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <label className="sr-only" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="min-h-[148px] resize-y rounded-[20px] border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <button
          type="submit"
          disabled={isSending}
          className="h-14 w-full rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSending ? "Sending..." : "Send message"}
        </button>

        {status && (
          <p
            role={status.type === "error" ? "alert" : "status"}
            className={
              status.type === "error"
                ? "text-sm text-destructive"
                : "text-sm text-primary"
            }
          >
            {status.message}
          </p>
        )}
      </form>
    </main>
  );
}
