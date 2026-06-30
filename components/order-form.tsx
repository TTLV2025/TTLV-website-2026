"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Loader2,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// ─── Toggle this flag to show/hide the order form ───────────────────────────
const ORDER_FORM_LIVE = false;
// ────────────────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setErrorMsg("Please upload a PDF file.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setErrorMsg("File size must be under 20MB.");
      return;
    }
    setErrorMsg("");
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !name || !phone) return;

    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("notes", notes);
    formData.append("file", file);

    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(
          data.error ||
            "Something went wrong. Please call us at (505) 425-3563."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network error. Please call (505) 425-3563 or email order@territorialtitle.com."
      );
    }
  };

  // ── Coming Soon state ──────────────────────────────────────────────────────
  if (!ORDER_FORM_LIVE) {
    return (
      <section id="order" className="bg-navy py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Place an Order
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-8" />

            <div className="bg-white/10 border border-white/20 rounded-xl p-10 backdrop-blur-sm">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <Clock className="h-7 w-7 text-gold-light" />
                </div>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                Online Ordering Coming Soon
              </h3>
              <p className="text-white/70 leading-relaxed mb-8">
                We&apos;re putting the finishing touches on our online order
                submission portal. In the meantime, our team is ready to take
                your order directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:order@territorialtitle.com"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-white font-semibold rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  order@territorialtitle.com
                </a>
                <a
                  href="tel:5054253563"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/25 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (505) 425-3563
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
  // ──────────────────────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <section id="order" className="bg-navy py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl p-12"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h3 className="font-heading text-2xl font-bold text-navy mb-4">
              Order Received
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your order has been received. We&apos;ll be in touch within{" "}
              <strong>4 business hours</strong> to confirm and ask any necessary
              follow-up questions.
            </p>
            <p className="text-sm text-gray-500">
              To follow up, contact us at{" "}
              <a
                href="mailto:order@territorialtitle.com"
                className="text-navy font-medium hover:underline"
              >
                order@territorialtitle.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:5054253563"
                className="text-navy font-medium hover:underline"
              >
                (505) 425-3563
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="bg-navy py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Place an Order
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-5" />
          <p className="text-white/65">
            Upload your contract or loan document and we&apos;ll follow up
            within 4 business hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Your Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Agent or Lender Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(505) 000-0000"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address{" "}
              <span className="text-gray-400 font-normal text-sm">
                (for confirmation)
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Drag & Drop File Upload */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">
              Contract / Order Document <span className="text-red-400">*</span>{" "}
              <span className="text-gray-400 font-normal text-sm">(PDF)</span>
            </Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
                dragOver
                  ? "border-gold bg-gold/5"
                  : file
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-navy/40 hover:bg-gray-50"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-9 w-9 text-green-600" />
                  <span className="font-medium text-green-700">{file.name}</span>
                  <span className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <span className="text-xs text-gray-400">
                    Click to change file
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Upload className="h-9 w-9" />
                  <span className="font-medium">
                    Drop your PDF here, or click to browse
                  </span>
                  <span className="text-sm text-gray-400">
                    PDF files only · Max 20MB
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Optional notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-gray-700 font-medium">
              Additional Notes{" "}
              <span className="text-gray-400 font-normal text-sm">
                (optional)
              </span>
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any relevant details — property address, closing timeline, special instructions, etc."
              rows={3}
              className="resize-none"
            />
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={!name || !phone || !file || status === "submitting"}
            className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3 text-base h-auto transition-colors"
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Order...
              </span>
            ) : (
              "Submit Order"
            )}
          </Button>

          <p className="text-center text-xs text-gray-400 pt-1">
            Prefer to email directly?{" "}
            <a
              href="mailto:order@territorialtitle.com"
              className="text-navy hover:underline"
            >
              order@territorialtitle.com
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
