import React, { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    fetch("http://localhost:5000/api/get-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🛍️ My Orders</h2>

        {loading ? (
          <p style={styles.loading}>Fetching your orders...</p>
        ) : orders.length === 0 ? (
          <p style={styles.noOrders}>No orders found.</p>
        ) : (
          <div style={styles.ordersContainer}>
            {orders.map((order, index) => (
              <div key={index} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <span style={styles.orderStatus}>🟢 Delivered</span>
                  <p style={styles.orderDate}>{new Date(order.date).toLocaleString()}</p>
                </div>

                <div style={styles.orderDetails}>
                  <p><strong>Name:</strong> {order.username}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                </div>

                <h4 style={styles.itemsHeading}>📦 Items</h4>
                <ul style={styles.itemList}>
                  {order.cartItems.map((item, idx) => (
                    <li key={idx} style={styles.item}>
                      <span style={styles.itemName}>{item.name}</span>
                      <span style={styles.itemDetails}>{item.size} | {item.quantity} pcs | ₹{item.price}</span>
                    </li>
                  ))}
                </ul>

                <p style={styles.total}><strong>💰 Total:</strong> ₹{order.totalAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// **Modern Minimalist UI Styles with Highlights**
const styles = {
  page: {
    backgroundColor: "#f8f9fa", 
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    fontFamily: "Inter, sans-serif",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#222",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "500",
    color: "#666",
  },
  noOrders: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  ordersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  orderCard: {
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  orderStatus: {
    backgroundColor: "#28a745",
    padding: "8px 14px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  orderDate: {
    fontSize: "15px",
    color: "#555",
    fontWeight: "500",
  },
  orderDetails: {
    fontSize: "16px",
    lineHeight: "1.6",
    fontWeight: "500",
    color: "#444",
  },
  itemsHeading: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#222",
  },
  itemList: {
    listStyleType: "none",
    padding: "0",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 15px",
    backgroundColor: "#f1f3f4",
    borderRadius: "6px",
    marginBottom: "6px",
    fontSize: "15px",
    fontWeight: "500",
  },
  itemName: {
    fontWeight: "600",
    fontSize: "16px",
  },
  itemDetails: {
    color: "#666",
    fontWeight: "500",
  },
  total: {
    marginTop: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#d63031",
    textAlign: "right",
  },
};

