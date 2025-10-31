"use client";

import { useBookingStore } from "@/store/useBookingStore";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
export default function CheckoutPage() {
  const {
    date,
    experienceName,
    quantity,
    subtotal,
    tax,
    total,
    time,
    experienceId,
    setFullName,
    setEmail,
    setPromoCode,
    setTotal,
    fullName,
    email,
    promoCode,
    promoApplied,
    setPromoApplied
  } = useBookingStore();
  const router = useRouter()
  const [Discount, setDiscount] = useState()
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    console.log("hi");
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/bookings/create`, { fullname: fullName, email, experience: experienceId, date, time, qty: quantity, subtotal, taxes: tax, total })
      console.log(res.data.data);
      if (res.data) {
        const refId = res.data.data.refId;
        // alert("booking confirmed")
        router.push(`/confirmation/${refId}`)
      }
    } catch (error) {
      alert("booking cancelled")
    } finally {
      setLoading(false);
    }
  }
  const handleApplyPromo = async () => {
    setLoading(true);
    try {
      const data = {
        code: promoCode,
        total
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/promos/validate`, data);
      console.log(response.data);

      if (response.data.data.valid) {
        // Update the store with new total
        setTotal(response.data.data.newTotal);
        setDiscount(response.data.data.discount);
        setPromoApplied(true)
        alert("Promo code applied successfully!");
      } else {
        alert("Invalid promo code.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      alert("Invalid promo code or error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row pt-20 w-full max-w-6xl mx-auto justify-between gap-6 px-4">
      {/* left */}
      <div className="flex flex-col w-full lg:w-2/3 bg-[#EFEFEF] rounded-xl shadow-md p-6">

        {/* fullname */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              placeholder="Your email"
              className="w-full mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Promo code */}
        <div className="flex items-center gap-2 mt-4">
          {!promoApplied ?
            <><input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
              <button
                disabled={promoCode ? false : true}
                onClick={handleApplyPromo}
                className={`${promoCode ? "bg-yellow-300 text-black hover:bg-amber-200" : "bg-gray-800 hover:bg-gray-700 text-white"}  rounded-lg px-4 py-2 text-sm  transition`}
              >
                Apply
              </button></>
            : <button className="rounded-lg border  p-3 w-auto bg-green-500 text-white">promo applied successfully!</button>}
        </div>
        {/* Terms checkbox */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            id="terms"
            className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the terms and safety policy
          </label>
        </div>
      </div>

      {/* right*/}
      <div className="w-full sm:w-[280px] lg:w-[320px] mt-8 h-75 bg-[#EFEFEF] rounded-xl shadow-md p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Experience</p>
          <p className="text-gray-800 font-medium">{experienceName}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Date</p>
          <p className="text-gray-800 font-medium">{date}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Time</p>
          <p className="text-gray-800 font-medium">{time}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Quantity</p>
          <p className="text-gray-800 font-medium">{quantity}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Subtotal</p>
          <p className="text-gray-800 font-medium">₹{subtotal}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Taxes</p>
          <p className="text-gray-800 font-medium">₹{tax}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Discount</p>
          <p className="text-gray-800 font-medium">₹{Discount}</p>
        </div>

        <hr className="border-gray-200 my-2" />

        <div className="flex justify-between items-center text-base font-semibold text-gray-800">
          <p>Total</p>
          <p>₹{total}</p>
        </div>

        <button
          disabled={!isChecked || !fullName || !email}
          type="submit"
          onClick={handleBooking}
          className="mt-3 w-full bg-yellow-400 text-gray-900 rounded-lg py-2 font-medium text-sm hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 transition"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}
