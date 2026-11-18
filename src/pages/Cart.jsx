import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    checkoutFromCart,
  } = useCart();

  const handleCheckout = () => {
    // moves items from cart -> checkout (cart becomes empty)
    if (checkoutFromCart()) navigate("/checkout");
  };

  return (
    <main className="min-h-svh bg-[#060606] text-left text-[#f5f2ec]">
      <Navbar />

      <section className="bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(176,135,67,0.14),transparent_72%)] pb-20 pt-32 max-[760px]:pt-28">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
          {/* Heading */}
          <p className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Your Selection
          </p>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(36px,4.5vw,60px)] font-normal leading-none tracking-[-0.03em] text-[#f7f5f0]">
              Shopping Cart
            </h1>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="cursor-pointer border-0 bg-transparent text-[13px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-[#d7c49c]"
              >
                Clear cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            /* Empty state */
            <div className="grid place-items-center rounded-2xl border border-white/10 bg-[#0e0d0b] px-6 py-24 text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-full border border-[#d7c49c]/40 text-[#d7c49c]">
                <ShoppingBag size={26} />
              </span>
              <h2 className="m-0 mb-2 font-[Georgia,Times_New_Roman,serif] text-3xl font-normal text-[#f7f5f0]">
                Your cart is empty
              </h2>
              <p className="mb-7 max-w-[380px] text-[15px] leading-[1.7] text-white/60">
                Discover our premium fragrances and add your favourites here.
              </p>
              <Link
                to="/"
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#d7c49c]/85 px-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f7f5f0] no-underline transition-colors hover:bg-[#d7c49c] hover:text-[#090909]"
              >
                Continue Shopping <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-[minmax(0,1fr)_380px] items-start gap-8 max-[960px]:grid-cols-1">
              {/* Items */}
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {cart.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="grid grid-cols-[110px_minmax(0,1fr)_auto] items-center gap-5 rounded-2xl border border-white/10 bg-[#0e0d0b] p-4 max-[640px]:grid-cols-[88px_minmax(0,1fr)] max-[640px]:gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[130px] w-full rounded-xl bg-[#1c1a16] object-cover max-[640px]:h-[110px]"
                    />

                    <div className="min-w-0">
                      <h3 className="m-0 mb-1 font-[Georgia,Times_New_Roman,serif] text-xl font-normal leading-snug text-[#f7f5f0]">
                        {item.name}
                      </h3>
                      <p className="m-0 mb-3 text-[13px] uppercase tracking-[0.14em] text-[#d7c49c]">
                        {item.size}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center rounded-full border border-white/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-white/75 transition-colors hover:text-[#d7c49c]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-8 text-center text-[15px]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-white/75 transition-colors hover:text-[#d7c49c]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-[13px] text-white/50 transition-colors hover:text-red-400"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    <p className="m-0 text-xl font-semibold text-[#d7c49c] max-[640px]:col-span-2 max-[640px]:text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <aside className="sticky top-28 rounded-2xl border border-[#c9a84c]/40 bg-[#0e0d0b] p-7 shadow-[0_0_60px_rgba(201,168,76,0.08)] max-[960px]:static">
                <h2 className="m-0 mb-6 font-[Georgia,Times_New_Roman,serif] text-2xl font-normal text-[#f7f5f0]">
                  Order Summary
                </h2>

                <dl className="m-0 mb-6 flex flex-col gap-3 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-white/60">Items</dt>
                    <dd className="m-0">{totalItems}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/60">Subtotal</dt>
                    <dd className="m-0">${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/60">Shipping</dt>
                    <dd className="m-0 text-white/60">At checkout</dd>
                  </div>
                </dl>

                <div className="mb-6 flex items-baseline justify-between border-t border-white/10 pt-5">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d7c49c]">
                    Total
                  </span>
                  <span className="font-[Georgia,Times_New_Roman,serif] text-3xl text-[#f7f5f0]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#d7c49c] bg-[#d7c49c] text-[13px] font-semibold uppercase tracking-[0.12em] text-[#090909] transition-colors hover:bg-transparent hover:text-[#d7c49c]"
                >
                  Checkout <ArrowRight size={15} />
                </button>

                <Link
                  to="/"
                  className="mt-4 block text-center text-[13px] text-white/55 no-underline transition-colors hover:text-[#d7c49c]"
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
