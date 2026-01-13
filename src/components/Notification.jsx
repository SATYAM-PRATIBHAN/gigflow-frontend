import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../store/slices/notificationsSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notifications[0].id));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-green-900 border border-green-700 text-green-100 px-6 py-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">🎉 Congratulations!</p>
              <p className="text-sm mt-1">{notif.message}</p>
            </div>
            <button
              onClick={() => dispatch(removeNotification(notif.id))}
              className="ml-4 text-green-300 hover:text-green-100"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
