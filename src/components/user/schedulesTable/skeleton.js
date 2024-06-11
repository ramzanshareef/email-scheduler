export const SchedulesCardsSkeleton = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-2 w-full p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Your Past Emails</h1>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array(6).fill("").map((_, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform animate-pulse">
                            <div className="p-6">
                                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                                <div className="flex items-center text-[#4B5563] mb-4">
                                    <div className="h-4 bg-gray-300 rounded w-36 mr-2"></div>
                                </div>
                                <div className="border border-gray-300 rounded p-2 bg-gray-200 mt-2 shadow-sm">
                                    <div className="h-4 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-4 bg-gray-300 rounded w-56"></div>
                                </div>
                            </div>
                            <div className="bg-gray-300 text-white p-4 text-center">
                                <div className="h-4 bg-gray-400 rounded w-1/2 mx-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};