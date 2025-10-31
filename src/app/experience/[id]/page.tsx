"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";
import Dates from "@/components/Date";
import Times from "@/components/Times";
import Loading from "@/app/loading";
export interface TimeSlot {
  _id?: string;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  isSoldOut: boolean;
}

export interface Slot {
  _id?: string;
  date: string;
  timeSlots: TimeSlot[];
}

export interface ExperienceDetails {
  _id?: string;
  experienceName: string;
  details: string;
  location: string;
  price: number;
  imageUrl: string;
  about: string;
  slots: Slot[];
  createdAt?: string;
  updatedAt?: string;
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState<number>()
  const [taxAmount, setTaxAmount] = useState<number>()
  const [subtotal, setSubtotal] = useState<number>()
  const [experience, setExperience] = useState<ExperienceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [time, setTime] = useState<string | undefined>("")
  const [dateTimeSlots, setDateTimeSlots] = useState<TimeSlot[]>([]);
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  const getExperienceDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/experiences/${id}`
      );
      setExperience(data.data);
      setExperienceId(data.data._id)
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTotal(subtotal! + (taxAmount! * quantity))
  }, [subtotal])
  useEffect(() => {
    setTime(timeSlot?.time)
  }, [timeSlot])
  useEffect(() => {
    setSubtotal(experience?.price! * quantity || 0)
  }, [experience, quantity])
  useEffect(() => {
    setTaxAmount(10 * experience?.price! / 100)
  }, [experience])
  useEffect(() => {
    const x = experience?.slots.find(
      (i) => new Date(i.date).toISOString().split("T")[0] === date
    );
    setDateTimeSlots(x?.timeSlots || []);
  }, [date]);
  useEffect(() => {
    getExperienceDetails();
  }, [id]);
  useEffect(() => {
    reset()
  }, [])
  const router = useRouter();
  const { setAll, reset, setExperienceId
  } = useBookingStore()

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row pt-20 w-full max-w-6xl mx-auto justify-between gap-6 px-4">
      {/* left part */}
      <div className="flex flex-col w-full lg:w-2/3">
        {/* image */}
        <div className="w-full mb-6">
          <p className="text-sm text-gray-500 mb-2">Details</p>
          <img
            src={experience?.imageUrl}
            className="w-full h-[280px] sm:h-[350px] object-cover rounded-xl shadow-sm"
            alt=""
          />
        </div>

        {/* image below part */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold text-gray-900">
              {experience?.experienceName}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {experience?.details}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* choose date */}
            <div className="flex flex-col">
              <p className="font-medium text-gray-900 mb-3">Choose date</p>
              <Dates setDate={setDate} experience={experience} date={date} />
            </div>

            {/* choose time*/}
            <div>
              <p className="font-medium text-gray-900 mb-3">Choose time</p>
              <Times date={date} dateTimeSlots={dateTimeSlots} timeSlot={timeSlot} setTimeSlot={setTimeSlot} />
              {date &&
                <p className="text-xs text-gray-500 mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              }
            </div>

            {/* about */}
            <div>
              <p className="font-medium text-gray-900 mb-2">About</p>
              <p className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md leading-relaxed mb-4">
                {experience?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right part */}
      <div className="w-full sm:w-[280px] lg:w-[320px] mt-8 h-70 bg-[#EFEFEF] rounded-xl shadow-md p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Starts at</p>
          <p className="text-gray-800 font-medium">₹{experience?.price}</p>
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Quantity</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-100 active:scale-95 transition"
            >
              −
            </button>
            <span className="text-gray-800 font-medium min-w-5] text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-100 active:scale-95 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Taxes</p>
          <p className="text-gray-800 font-medium">₹{taxAmount! * quantity}</p>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Subtotal</p>
          <p className="text-gray-800 font-medium">₹{subtotal}</p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-2" />

        {/* Total */}
        <div className="flex justify-between items-center text-base font-semibold text-gray-800">
          <p>Total</p>
          <p>₹{total}</p>
        </div>

        {/* Confirm Button */}
        <button
          disabled={date && time ? false : true}
          type="submit"
          onClick={() => {
            setLoading(true)
            setAll({
              date,
              time,
              quantity,
              subtotal,
              tax: taxAmount! * quantity,
              total,
              experienceName: experience?.experienceName
            })
            router.push("/checkout")
          }}
          className="mt-3 w-full bg-yellow-400 text-gray-900 rounded-lg py-2 font-medium text-sm hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 transition"
        >
          Confirm
        </button>
      </div>

    </div>
  );
}
