import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { profileEndpoints } from "../apis";
import { courseEndpoints } from "../apis";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API, GET_USER_RECEIPTS_API, GET_RECEIPT_BY_ID_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//     const toastId = toast.loading("Loading...");
//     try {
//         //load the script
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if (!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         //initiate the order
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
//             { courses },
//             {
//                 Authorization: `Bearer ${token}`,
//             })

//         if (!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }
//         console.log("PRINTING orderResponse", orderResponse);
//         //options
//         const options = {
//             key: process.env.RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id: orderResponse.data.message.id,
//             name: "StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image: rzpLogo,
//             prefill: {
//                 name: `${userDetails.firstName}`,
//                 email: userDetails.email
//             },
//             handler: function (response) {
//                 //send successful wala mail
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
//                 //verifyPayment
//                 verifyPayment({ ...response, courses }, token, navigate, dispatch);
//             }
//         }
//         //miss hogya tha 
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function (response) {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })

//     }
//     catch (error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }
//     toast.dismiss(toastId);
// }




export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // Load the Razorpay checkout script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // Initiate the order by calling the COURSE_PAYMENT_API
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                { courses },
                                {
                                    Authorization: `Bearer ${token}`,
                                });

        // Check if the response indicates success
        if (!orderResponse?.data?.success) {
            throw new Error(orderResponse?.data?.message || "Failed to initiate order.");
        }

        // Extract payment data from the response
        const paymentData = orderResponse.data.data; // Updated to access data object

        console.log("PRINTING orderResponse", paymentData);

        // Razorpay payment options
        const options = {
            key: process.env.RAZORPAY_KEY || 'rzp_test_URe1o2PPOt9CiG', // Ensure the Razorpay key is set
            currency: paymentData.currency,   // Access currency from paymentData
            amount: `${paymentData.amount}`,  // Access amount from paymentData
            order_id: paymentData.id,         // Access order id from paymentData
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,                   // Your logo for the checkout page
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                // Send payment success email
                sendPaymentSuccessEmail(response, paymentData.amount, token);

                // Verify the payment and enroll the user in the course
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        // Create and open the Razorpay payment modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        // Handle payment failure
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        });

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}





export async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    }
    catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
        logger.info("PAYMENT SUCCESS EMAIL ERROR....", error, FILE_PATH);
    }
}

//verify payment
export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        logger.info("PAYMENT VERIFY ERROR....", error, FILE_PATH);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

// Get user receipts
export async function getUserReceipts(token) {
  try {
    const response = await apiConnector("GET", GET_USER_RECEIPTS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET RECEIPTS ERROR....", error);
    toast.error("Could not fetch receipts");
    return [];
  }
}

// Get specific receipt by ID
export async function getReceiptById(paymentId, token) {
  try {
    const response = await apiConnector("GET", `${GET_RECEIPT_BY_ID_API}/${paymentId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET RECEIPT ERROR....", error);
    toast.error("Could not fetch receipt");
    return null;
  }
}

// Generate and download receipt as PDF
export async function downloadReceipt(payment, token) {
  try {
    // Create receipt HTML content
    const receiptHTML = generateReceiptHTML(payment);
    
    // Create a blob and download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${payment.orderId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success("Receipt downloaded successfully!");
  } catch (error) {
    console.log("DOWNLOAD RECEIPT ERROR....", error);
    toast.error("Could not download receipt");
  }
}

// Generate receipt HTML
function generateReceiptHTML(payment) {
  const date = new Date(payment.createdAt).toLocaleDateString();
  const time = new Date(payment.createdAt).toLocaleTimeString();
  
  const coursesList = payment.courses.map(course => 
    `<tr>
      <td>${course.courseName}</td>
      <td>₹${course.price}</td>
      <td>${course.instructor.firstName} ${course.instructor.lastName}</td>
    </tr>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .receipt-info { margin: 20px 0; }
        .course-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .course-table th, .course-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .course-table th { background-color: #f2f2f2; }
        .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Payment Receipt</h1>
        <h2>SecCouncil</h2>
      </div>
      
      <div class="receipt-info">
        <p><strong>Receipt Date:</strong> ${date} at ${time}</p>
        <p><strong>Order ID:</strong> ${payment.orderId}</p>
        <p><strong>Payment ID:</strong> ${payment.paymentId}</p>
        <p><strong>Customer:</strong> ${payment.userId.firstName} ${payment.userId.lastName}</p>
        <p><strong>Email:</strong> ${payment.userId.email}</p>
      </div>
      
      <table class="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Price</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>
          ${coursesList}
        </tbody>
      </table>
      
      <div class="total">
        <p><strong>Total Amount:</strong> ₹${payment.amount}</p>
        <p><strong>Currency:</strong> ${payment.currency}</p>
        <p><strong>Status:</strong> ${payment.status}</p>
      </div>
      
      <div class="footer">
        <p>Thank you for your purchase!</p>
        <p>This is a computer-generated receipt. No signature required.</p>
      </div>
    </body>
    </html>
  `;
}

export async function downloadCertificate(courseId, token) {
  try {
    const response = await fetch(`${profileEndpoints.DOWNLOAD_CERTIFICATE_API}/${courseId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to download certificate');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${courseId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Certificate download error:', error);
    toast.error('Failed to download certificate');
  }
}

export async function hasUserReviewedCourse(courseId, token) {
  try {
    const response = await fetch(`${courseEndpoints.HAS_REVIEWED_API}/${courseId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.hasReviewed;
  } catch (error) {
    return false;
  }
}