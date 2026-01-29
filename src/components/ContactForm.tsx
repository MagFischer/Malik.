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
    honeypot: "",
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

    if (formData.honeypot) {
      setFormState("success");
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot */}
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
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder=" "
          className="input-underline peer"
        />
        <label
          htmlFor="name"
          className="absolute left-0 top-3 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {t("name")}
        </label>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder=" "
          className="input-underline peer"
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-3 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {t("email")}
        </label>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder=" "
          className="input-underline peer resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-0 top-3 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {t("message")}
        </label>
      </div>

      {/* Submit Button - Pill Style */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {formState === "submitting" ? t("sending") : t("send")}
        </button>
      </div>

      {/* Status Messages */}
      {formState === "success" && (
        <p className="text-[var(--color-accent)] text-center text-sm">
          {t("success")}
        </p>
      )}
      {formState === "error" && (
        <p className="text-red-500 text-center text-sm">
          {t("error")}
        </p>
      )}
    </form>
  );
}
