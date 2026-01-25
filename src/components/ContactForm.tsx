"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Spam protection
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      setFormState("success"); // Fake success for bots
      return;
    }

    setFormState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot - hidden from users, visible to bots */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full px-6 py-3 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {formState === "submitting" ? t("sending") : t("send")}
      </button>

      {/* Status Messages */}
      {formState === "success" && (
        <p className="text-green-600 dark:text-green-400 text-center">
          {t("success")}
        </p>
      )}
      {formState === "error" && (
        <p className="text-red-600 dark:text-red-400 text-center">
          {t("error")}
        </p>
      )}
    </form>
  );
}
