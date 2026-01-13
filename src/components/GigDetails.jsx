import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigById } from "../store/slices/gigsSlice";
import { fetchBidsByGig, createBid, hireBid } from "../store/slices/bidsSlice";

const GigDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGig, loading: gigLoading } = useSelector(
    (state) => state.gigs
  );
  const { bids, loading: bidsLoading } = useSelector((state) => state.bids);
  const { user } = useSelector((state) => state.auth);

  const [bidForm, setBidForm] = useState({
    message: "",
    price: "",
  });

  const [showBidForm, setShowBidForm] = useState(false);

  useEffect(() => {
    dispatch(fetchGigById(id));
    dispatch(fetchBidsByGig(id));
  }, [dispatch, id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      createBid({
        gigId: id,
        message: bidForm.message,
        price: parseFloat(bidForm.price),
      })
    );
    if (result.type === "bids/createBid/fulfilled") {
      setBidForm({ message: "", price: "" });
      setShowBidForm(false);
      dispatch(fetchBidsByGig(id));
    }
  };

  const handleHire = async (bidId) => {
    if (window.confirm("Are you sure you want to hire this freelancer?")) {
      const result = await dispatch(hireBid(bidId));
      if (result.type === "bids/hireBid/fulfilled") {
        dispatch(fetchGigById(id));
        dispatch(fetchBidsByGig(id));
      }
    }
  };

  if (gigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading gig details...</div>
      </div>
    );
  }

  if (!currentGig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Gig not found</div>
      </div>
    );
  }

  const isOwner = user?.id === currentGig.ownerId?._id;
  const canBid = user && !isOwner && currentGig.status === "open";
  const hasBid = bids.some((bid) => bid.freelancerId?._id === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gig Details */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{currentGig.title}</h1>
              <span className={`badge badge-${currentGig.status}`}>
                {currentGig.status}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 whitespace-pre-wrap">
                {currentGig.description}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-700 pt-4">
              <div>
                <p className="text-3xl font-bold text-green-400">
                  ${currentGig.budget}
                </p>
                <p className="text-sm text-gray-400">Budget</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Posted by</p>
                <p className="font-semibold text-lg">
                  {currentGig.ownerId?.name}
                </p>
              </div>
            </div>

            {canBid && !hasBid && (
              <div className="mt-6">
                {!showBidForm ? (
                  <button
                    onClick={() => setShowBidForm(true)}
                    className="btn-primary w-full"
                  >
                    Place a Bid
                  </button>
                ) : (
                  <form onSubmit={handleBidSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Proposal
                      </label>
                      <textarea
                        value={bidForm.message}
                        onChange={(e) =>
                          setBidForm({ ...bidForm, message: e.target.value })
                        }
                        className="input-field"
                        rows="4"
                        placeholder="Explain why you're the best fit..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Bid Amount ($)
                      </label>
                      <input
                        type="number"
                        value={bidForm.price}
                        onChange={(e) =>
                          setBidForm({ ...bidForm, price: e.target.value })
                        }
                        className="input-field"
                        placeholder="500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="btn-primary flex-1">
                        Submit Bid
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBidForm(false)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {canBid && hasBid && (
              <div className="mt-6 bg-blue-900/30 border border-blue-700 text-blue-300 px-4 py-3 rounded-lg">
                You have already placed a bid on this gig.
              </div>
            )}
          </div>
        </div>

        {/* Bids List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Bids ({bids.length})</h2>

            {bidsLoading ? (
              <div className="text-center py-4">Loading bids...</div>
            ) : bids.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No bids yet. Be the first!
              </p>
            ) : (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <div
                    key={bid._id}
                    className="bg-gray-700/50 border border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">{bid.freelancerId?.name}</p>
                      <span className={`badge badge-${bid.status} text-xs`}>
                        {bid.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">{bid.message}</p>

                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-green-400">
                        ${bid.price}
                      </p>

                      {isOwner &&
                        currentGig.status === "open" &&
                        bid.status === "pending" && (
                          <button
                            onClick={() => handleHire(bid._id)}
                            className="btn-primary text-sm py-1 px-3"
                          >
                            Hire
                          </button>
                        )}
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

export default GigDetails;
