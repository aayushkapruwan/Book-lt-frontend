import { ExperienceDetails } from '@/app/experience/[id]/page';
function Dates({ experience, setDate, date }: { experience: ExperienceDetails | null, date: string, setDate: (value: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {experience &&
                experience.slots.map((i, index) => {

                    const isoDate = new Date(i.date)
                        .toISOString()
                        .split("T")[0];
                    return (
                        <input
                            key={index}
                            type="text"
                            value={isoDate}
                            readOnly
                            onClick={() => setDate(isoDate)}
                            className={`w-[90px] px-2 py-1 text-sm rounded-md text-center font-medium cursor-pointer border transition-all duration-200 ${date === isoDate
                                ? "bg-yellow-400 text-gray-900 border-yellow-400"
                                : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
                                }`}
                        />
                    );
                })}
        </div>
    )
}

export default Dates