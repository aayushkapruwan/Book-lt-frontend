import { TimeSlot } from "@/app/experience/[id]/page";
function Times({ date, dateTimeSlots, timeSlot, setTimeSlot }: { date: string, dateTimeSlots: TimeSlot[], timeSlot: TimeSlot | null, setTimeSlot: (val: TimeSlot) => void }) {
    return (
        <div>
            {date && dateTimeSlots.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {dateTimeSlots.map((slot) => {
                        const availableSeats =
                            slot.totalSeats - slot.bookedSeats;
                        return (
                            <div
                                key={slot._id}
                                className="flex items-center gap-e1"
                            >
                                <input
                                    value={slot.time}
                                    readOnly
                                    onClick={() => {
                                        if (!slot.isSoldOut) {
                                            setTimeSlot(slot);
                                        }
                                    }}
                                    className={`w-20 px-2 py-1 text-sm font-medium rounded-md text-center cursor-pointer border transition-all duration-200 ${slot.isSoldOut
                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                        : timeSlot?._id === slot._id
                                            ? "bg-yellow-400 text-gray-900 border-yellow-400"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
                                        }`}
                                />
                                {!slot.isSoldOut ? (
                                    <p className="text-[11px] text-red-500">
                                        {availableSeats} left
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-gray-500">
                                        Sold out
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Times