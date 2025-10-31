import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  experienceId: string | null;
  experienceName: string | null;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
  fullName: string;
  email: string;
  promoCode: string;
  promoApplied: boolean;
  // setters
  setExperienceId: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setQuantity: (qty: number) => void;
  setSubtotal: (subtotal: number) => void;
  setTax: (tax: number) => void;
  setTotal: (total: number) => void;
  setExperienceName: (name: string) => void;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setPromoCode: (code: string) => void;
  setPromoApplied: (ans: boolean) => void;
  // set all at once
  setAll: (data: Partial<BookingState>) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      experienceName: "",
      experienceId: null,
      date: "",
      time: "",
      quantity: 1,
      subtotal: 0,
      tax: 0,
      total: 0,
      fullName: "",
      email: "",
      promoCode: "",
      promoApplied: false,

      // setters
      setExperienceId: (id) => set({ experienceId: id }),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setQuantity: (qty) => set({ quantity: qty }),
      setSubtotal: (subtotal) => set({ subtotal }),
      setTax: (tax) => set({ tax }),
      setTotal: (total) => set({ total }),
      setExperienceName: (name) => set({ experienceName: name }),
      setFullName: (name) => set({ fullName: name }),
      setEmail: (email) => set({ email }),
      setPromoCode: (code) => set({ promoCode: code }),
      setPromoApplied: (ans) => set({ promoApplied: ans }),
      setAll: (data) => set((state) => ({ ...state, ...data })),

      reset: () =>
        set({
          experienceId: null,
          experienceName: "",
          date: "",
          time: "",
          quantity: 1,
          subtotal: 0,
          tax: 0,
          total: 0,
          fullName: "",
          email: "",
          promoCode: "",
          promoApplied: false
        }),
    }),
    {
      name: "booking-storage", // localStorage key
    }
  )
);
