import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ColdStartLoader = () => {
  const { isColdStart, isLoading } = useSelector((state) => state.coldStart);
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (isColdStart && isLoading) {
      setCountdown(50);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isColdStart, isLoading]);

  if (!isColdStart || !isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-4 shadow-2xl border border-gray-700">
        {/* Animated spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">
                {countdown}s
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            🚀 Waking Up Server...
          </h3>
          <p className="text-gray-300 mb-4">
            The backend is starting up from sleep mode. This happens on free
            hosting tiers.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              ⏱️{" "}
              <span className="text-blue-400 font-semibold">
                Cold start in progress
              </span>
            </p>
            <p className="text-xs text-gray-500">
              This may take up to 50 seconds. Please wait...
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((50 - countdown) / 50) * 100}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            💡 Tip: Deploying to a paid tier eliminates cold starts
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColdStartLoader;
