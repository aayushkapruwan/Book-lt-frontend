"use client";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      {/* ✅ Green check icon */}
      <CheckCircle2 className="text-green-500 w-20 h-20 mb-6" />

      {/* 📝 Confirmation text */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Booking Confirmed
      </h1>

      <p className="text-gray-600 mb-6">Ref ID: {id}</p>

      {/* 🔘 Back to home button */}
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}
