import { useState } from "react";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Pakistan",
  payment: "cod",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  notes: "",
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-[#13120f] px-4 py-3 text-[15px] text-[#f5f2ec] outline-none transition-colors placeholder:text-white/30 focus:border-[#d7c49c]";

const Field = ({ label, error, children, className = "" }) => (
  <label className={`flex flex-col gap-2 ${className}`}>
    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#d7c49c]">
      {label}
    </span>
    {children}
    {error && <span className="text-[12px] text-red-400">{error}</span>}
  </label>
);

const CheckoutForm = ({ onSubmit, submitting = false, total = 0 }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (name) => (e) =>
    setForm((f) => ({ ...f, [name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (form.phone.replace(/\D/g, "").length < 7)
      err.phone = "Enter a valid phone number";
    if (!form.address.trim()) err.address = "Enter your address";
    if (!form.city.trim()) err.city = "Enter your city";
    if (!form.postalCode.trim()) err.postalCode = "Enter postal code";
    if (form.payment === "card") {
      if (form.cardNumber.replace(/\s/g, "").length < 13)
        err.cardNumber = "Enter a valid card number";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) err.cardExpiry = "MM/YY";
      if (form.cardCvc.length < 3) err.cardCvc = "CVC";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Never store full card details
    const { cardNumber, cardExpiry, cardCvc, ...safe } = form;
    onSubmit({
      ...safe,
      cardLast4: form.payment === "card" ? cardNumber.slice(-4) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Contact */}
      <fieldset className="m-0 min-w-0 rounded-2xl border border-white/10 bg-[#0e0d0b] p-7 max-[640px]:p-5">
        <legend className="px-2 font-[Georgia,Times_New_Roman,serif] text-xl text-[#f7f5f0]">
          Contact
        </legend>
        <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
          <Field label="Full name" error={errors.fullName}>
            <input
              className={inputClass}
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="Your name"
              autoComplete="name"
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input
              className={inputClass}
              value={form.phone}
              onChange={set("phone")}
              placeholder="+92 300 0000000"
              autoComplete="tel"
            />
          </Field>
          <Field
            label="Email"
            error={errors.email}
            className="col-span-2 max-[640px]:col-span-1"
          >
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>
        </div>
      </fieldset>

      {/* Shipping */}
      <fieldset className="m-0 min-w-0 rounded-2xl border border-white/10 bg-[#0e0d0b] p-7 max-[640px]:p-5">
        <legend className="px-2 font-[Georgia,Times_New_Roman,serif] text-xl text-[#f7f5f0]">
          Shipping address
        </legend>
        <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
          <Field
            label="Address"
            error={errors.address}
            className="col-span-2 max-[640px]:col-span-1"
          >
            <input
              className={inputClass}
              value={form.address}
              onChange={set("address")}
              placeholder="House, street, area"
              autoComplete="street-address"
            />
          </Field>
          <Field label="City" error={errors.city}>
            <input
              className={inputClass}
              value={form.city}
              onChange={set("city")}
              placeholder="Karachi"
              autoComplete="address-level2"
            />
          </Field>
          <Field label="Postal code" error={errors.postalCode}>
            <input
              className={inputClass}
              value={form.postalCode}
              onChange={set("postalCode")}
              placeholder="75500"
              autoComplete="postal-code"
            />
          </Field>
          <Field label="Country" className="col-span-2 max-[640px]:col-span-1">
            <input
              className={inputClass}
              value={form.country}
              onChange={set("country")}
              autoComplete="country-name"
            />
          </Field>
          <Field
            label="Order notes (optional)"
            className="col-span-2 max-[640px]:col-span-1"
          >
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Delivery instructions, gift message..."
            />
          </Field>
        </div>
      </fieldset>

      {/* Payment */}
      <fieldset className="m-0 min-w-0 rounded-2xl border border-white/10 bg-[#0e0d0b] p-7 max-[640px]:p-5">
        <legend className="px-2 font-[Georgia,Times_New_Roman,serif] text-xl text-[#f7f5f0]">
          Payment
        </legend>

        <div className="mb-5 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          {[
            { value: "cod", label: "Cash on delivery" },
            { value: "card", label: "Credit / Debit card" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 text-[15px] transition-colors ${
                form.payment === opt.value
                  ? "border-[#d7c49c] bg-[#d7c49c]/10 text-[#f7f5f0]"
                  : "border-white/15 text-white/70 hover:border-white/30"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={opt.value}
                checked={form.payment === opt.value}
                onChange={set("payment")}
                className="accent-[#d7c49c]"
              />
              {opt.label}
            </label>
          ))}
        </div>

        {form.payment === "card" && (
          <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
            <Field
              label="Card number"
              error={errors.cardNumber}
              className="col-span-2 max-[640px]:col-span-1"
            >
              <input
                className={inputClass}
                value={form.cardNumber}
                onChange={set("cardNumber")}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                autoComplete="cc-number"
              />
            </Field>
            <Field label="Expiry" error={errors.cardExpiry}>
              <input
                className={inputClass}
                value={form.cardExpiry}
                onChange={set("cardExpiry")}
                placeholder="MM/YY"
                autoComplete="cc-exp"
              />
            </Field>
            <Field label="CVC" error={errors.cardCvc}>
              <input
                className={inputClass}
                value={form.cardCvc}
                onChange={set("cardCvc")}
                placeholder="123"
                inputMode="numeric"
                autoComplete="cc-csc"
              />
            </Field>
          </div>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-14 w-full cursor-pointer items-center justify-center rounded-full border border-[#d7c49c] bg-[#d7c49c] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#090909] transition-colors hover:bg-transparent hover:text-[#d7c49c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Placing order..." : `Place order · $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
