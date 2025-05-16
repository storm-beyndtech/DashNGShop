/**
 * This script tests the guest checkout functionality by simulating a guest order
 * Run with: node test-guest-checkout.js
 */

async function testGuestCheckout() {
  try {
    console.log("Testing guest checkout functionality...");
    
    // Simulate a guest checkout
    const guestOrderData = {
      cartItems: [
        {
          id: "guest_123",
          product: {
            id: 1, // Assuming product 1 exists
            name: "Luxury Handbag",
            brand: "DASH",
            price: 250000,
            discountPrice: 225000,
            images: ["https://example.com/image.jpg"]
          },
          quantity: 1
        }
      ],
      shippingAddress: {
        firstName: "Guest",
        lastName: "User",
        email: "guest@example.com",
        phone: "1234567890",
        address: "1 Brooks Stone Close, GRA, Port Harcourt, Rivers, Nigeria",
        city: "Port Harcourt",
        state: "Rivers",
        country: "Nigeria"
      },
      totalAmount: 225000,
      paymentMethod: "paystack",
      paymentStatus: "paid",
      notes: "Test guest order"
    };
    
    // Send the request to create a guest order
    const response = await fetch("http://localhost:3000/api/guest-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(guestOrderData)
    });
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Guest order created successfully:");
    console.log(JSON.stringify(result, null, 2));
    
    // Test public order tracking using the created order ID
    const orderId = result.id;
    const trackingResponse = await fetch(`http://localhost:3000/api/order-tracking/${orderId}`);
    
    if (!trackingResponse.ok) {
      throw new Error(`Tracking request failed: ${trackingResponse.status} ${trackingResponse.statusText}`);
    }
    
    const trackingResult = await trackingResponse.json();
    console.log("Order tracking information:");
    console.log(JSON.stringify(trackingResult, null, 2));
    
    console.log("All tests passed!");
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testGuestCheckout();