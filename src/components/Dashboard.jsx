import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyGigs } from "../store/slices/gigsSlice";
import { fetchMyBids } from "../store/slices/bidsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGigs, loading: gigsLoading } = useSelector((state) => state.gigs);
  const { myBids, loading: bidsLoading } = useSelector((state) => state.bids);

  useEffect(() => {
    dispatch(fetchMyGigs());
    dispatch(fetchMyBids());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Gigs (as Client) */}
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">
              My Gigs (As Client) - {myGigs.length}
            </h2>

            {gigsLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : myGigs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  You haven't posted any gigs yet
                </p>
                <button
                  onClick={() => navigate("/create-gig")}
                  className="btn-primary"
                >
                  Post Your First Gig
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myGigs.map((gig) => (
                  <div
                    key={gig._id}
                    className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => navigate(`/gigs/${gig._id}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{gig.title}</h3>
                      <span className={`badge badge-${gig.status} text-xs`}>
                        {gig.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {gig.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-green-400 font-bold">${gig.budget}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* My Bids (as Freelancer) */}
        <div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">
              My Bids (As Freelancer) - {myBids.length}
            </h2>

            {bidsLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : myBids.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  You haven't placed any bids yet
                </p>
                <button onClick={() => navigate("/")} className="btn-primary">
                  Browse Gigs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBids.map((bid) => (
                  <div
                    key={bid._id}
                    className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => navigate(`/gigs/${bid.gigId?._id}`)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">
                        {bid.gigId?.title || "Gig Deleted"}
                      </h3>
                      <span className={`badge badge-${bid.status} text-xs`}>
                        {bid.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {bid.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-green-400 font-bold">${bid.price}</p>
                        <p className="text-xs text-gray-400">Your bid</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">
                          Budget: ${bid.gigId?.budget}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
