import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    checkoutItems,
    checkoutSubtotal,
    checkoutSource,
    updateCheckoutQuantity,
    cancelCheckout,
    placeOrder,
  } = useCart();

  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const shipping = checkoutSubtotal >= 100 ? 0 : 6;
  const total = checkoutSubtotal + shipping;

  const handleSubmit = (details) => {
    setSubmitting(true);
    setTimeout(() => {
      setOrder(placeOrder(details));
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  const handleBack = () => {
    // items that came from the cart are returned to it
    const fromCart = checkoutSource === "cart";
    cancelCheckout();
    navigate(fromCart ? "/cart" : "/");
  };

  const Shell = ({ children }) => (
    <main className="min-h-svh bg-[#060606] text-left text-[#f5f2ec]">
      <Navbar />
      <section className="bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(176,135,67,0.14),transparent_72%)] pb-20 pt-32 max-[760px]:pt-28">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );

  /* Success */
  if (order) {
    return (
      <Shell>
        <div className="mx-auto grid max-w-[640px] place-items-center rounded-2xl border border-[#c9a84c]/40 bg-[#0e0d0b] px-8 py-16 text-center shadow-[0_0_60px_rgba(201,168,76,0.1)]">
          <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#d7c49c] text-[#090909]">
            <Check size={30} />
          </span>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Thank you
          </p>
          <h1 className="m-0 mb-3 font-[Georgia,Times_New_Roman,serif] text-4xl font-normal text-[#f7f5f0]">
            Order confirmed
          </h1>
          <p className="mb-2 text-[15px] leading-[1.7] text-white/65">
            Order <span className="text-[#d7c49c]">{order.id}</span> has been
            placed. A confirmation will be sent to {order.details.email}.
          </p>
          <p className="mb-8 text-[15px] text-white/65">
            Total paid on{" "}
            {order.details.payment === "cod" ? "delivery" : "card"}:{" "}
            <span className="text-[#f7f5f0]">${order.total.toFixed(2)}</span>
          </p>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center rounded-full border border-[#d7c49c]/85 px-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f7f5f0] no-underline transition-colors hover:bg-[#d7c49c] hover:text-[#090909]"
          >
            Continue Shopping
          </Link>
        </div>
      </Shell>
    );
  }

  /* Nothing to check out */
  if (checkoutItems.length === 0) {
    return (
      <Shell>
        <div className="mx-auto grid max-w-[560px] place-items-center rounded-2xl border border-white/10 bg-[#0e0d0b] px-8 py-20 text-center">
          <h1 className="m-0 mb-3 font-[Georgia,Times_New_Roman,serif] text-3xl font-normal text-[#f7f5f0]">
            Nothing to check out
          </h1>
          <p className="mb-7 text-[15px] leading-[1.7] text-white/60">
            Pick a fragrance from the collection or open your cart.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center rounded-full border border-[#d7c49c]/85 px-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f7f5f0] no-underline transition-colors hover:bg-[#d7c49c] hover:text-[#090909]"
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75 no-underline transition-colors hover:border-[#d7c49c] hover:text-[#d7c49c]"
            >
              View Cart
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  /* Checkout */
  return (
    <Shell>
      <button
        type="button"
        onClick={handleBack}
        className="mb-6 inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[13px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-[#d7c49c]"
      >
        <ArrowLeft size={15} />
        {checkoutSource === "cart" ? "Back to cart" : "Back to shop"}
      </button>

      <p className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
        Secure Checkout
      </p>
      <h1 className="m-0 mb-10 font-[Georgia,Times_New_Roman,serif] text-[clamp(36px,4.5vw,60px)] font-normal leading-none tracking-[-0.03em] text-[#f7f5f0]">
        Checkout
      </h1>

      <div className="grid grid-cols-[minmax(0,1fr)_400px] items-start gap-8 max-[960px]:grid-cols-1">
        <CheckoutForm
          onSubmit={handleSubmit}
          submitting={submitting}
          total={total}
        />

        {/* Order summary */}
        <aside className="sticky top-28 rounded-2xl border border-[#c9a84c]/40 bg-[#0e0d0b] p-7 shadow-[0_0_60px_rgba(201,168,76,0.08)] max-[960px]:static max-[960px]:order-first">
          <h2 className="m-0 mb-6 font-[Georgia,Times_New_Roman,serif] text-2xl font-normal text-[#f7f5f0]">
            Your order
          </h2>

          <ul className="m-0 mb-6 flex list-none flex-col gap-5 p-0">
            {checkoutItems.map((item) => (
              <li
                key={`${item.id}-${item.size}`}
                className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[76px] w-16 rounded-lg bg-[#1c1a16] object-cover"
                />
                <div className="min-w-0">
                  <p className="m-0 truncate text-[15px] text-[#f7f5f0]">
                    {item.name}
                  </p>
                  <p className="m-0 mb-1.5 text-[12px] uppercase tracking-[0.12em] text-white/45">
                    {item.size}
                  </p>
                  <div className="inline-flex items-center rounded-full border border-white/15">
                    <button
                      type="button"
                      onClick={() =>
                        updateCheckoutQuantity(
                          item.id,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      className="grid h-7 w-7 cursor-pointer place-items-center border-0 bg-transparent text-white/70 hover:text-[#d7c49c]"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="min-w-6 text-center text-[13px]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCheckoutQuantity(
                          item.id,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      className="grid h-7 w-7 cursor-pointer place-items-center border-0 bg-transparent text-white/70 hover:text-[#d7c49c]"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <p className="m-0 text-[15px] font-semibold text-[#d7c49c]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="m-0 flex flex-col gap-3 border-t border-white/10 pt-5 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-white/60">Subtotal</dt>
              <dd className="m-0">${checkoutSubtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/60">Shipping</dt>
              <dd className="m-0">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d7c49c]">
              Total
            </span>
            <span className="font-[Georgia,Times_New_Roman,serif] text-3xl text-[#f7f5f0]">
              ${total.toFixed(2)}
            </span>
          </div>
          <p className="mb-0 mt-3 text-[12px] text-white/40">
            Free shipping on orders over $100.
          </p>
        </aside>
      </div>
    </Shell>
  );
};

export default Checkout;
