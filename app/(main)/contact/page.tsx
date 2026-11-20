"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
} | null;

const contactSchema = z.object({
  from_name: z.string().trim().min(1, "Name is required"),
  reply_to: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      from_name: "",
      reply_to: "",
      message: "",
    },
  });

  async function submitContactForm(data: ContactFormValues) {
    setStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, data, { publicKey });
      reset();
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
        onSubmit={handleSubmit(submitContactForm)}
        noValidate
        className="mt-8 flex flex-col gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-1">
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Name"
              {...register("from_name")}
              aria-invalid={Boolean(errors.from_name)}
              aria-describedby={errors.from_name ? "contact-name-error" : undefined}
              className="h-[50px] min-w-0 rounded-[22px] border border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.from_name && (
              <p id="contact-name-error" role="alert" className="text-sm text-destructive">
                {errors.from_name.message}
              </p>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              {...register("reply_to")}
              aria-invalid={Boolean(errors.reply_to)}
              aria-describedby={errors.reply_to ? "contact-email-error" : undefined}
              className="h-[50px] min-w-0 rounded-[22px] border border-border bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.reply_to && (
              <p id="contact-email-error" role="alert" className="text-sm text-destructive">
                {errors.reply_to.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="sr-only" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            placeholder="Message"
            rows={5}
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className="min-h-[148px] resize-y rounded-[20px] border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.message && (
            <p id="contact-message-error" role="alert" className="text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-14 w-full rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send message"}
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
