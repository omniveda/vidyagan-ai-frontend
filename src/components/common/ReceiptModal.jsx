import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserReceipts, downloadReceipt } from '../../services/operations/studentFeaturesAPI';
import { MdDownload, MdClose } from 'react-icons/md';
import { toast } from 'react-hot-toast';

const ReceiptModal = ({ isOpen, onClose }) => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      try {
        const receiptsData = await getUserReceipts(token);
        setReceipts(receiptsData);
      } catch (error) {
        console.log("Error fetching receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && token) {
      fetchReceipts();
    }
  }, [isOpen, token]);

  const handleDownloadReceipt = async (payment) => {
    await downloadReceipt(payment, token);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[white] text-black rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Receipts</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading receipts...</p>
          </div>
        ) : receipts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No receipts found.</p>
            <p className="text-sm text-gray-500 mt-2">
              Purchase a course to see your receipts here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {receipts.map((payment) => (
              <div
                key={payment._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Order #{payment.orderId}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ₹{payment.amount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.courses.length} course{payment.courses.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium text-gray-700 mb-2">Courses:</h4>
                  <div className="space-y-2">
                    {payment.courses.map((course) => (
                      <div
                        key={course._id}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.courseName}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{course.courseName}</p>
                          <p className="text-xs text-gray-700">
                            by {course.instructor.firstName} {course.instructor.lastName}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">₹{course.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    <p>Payment ID: {payment.paymentId}</p>
                    <p>Status: <span className="text-green-600 font-medium">{payment.status}</span></p>
                  </div>
                  <button
                    onClick={() => handleDownloadReceipt(payment)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MdDownload size={16} />
                    <span>Download Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptModal; 