import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  reserveProduct,
  makeAvailable,
} from "./productService";

// ======================================
// Send Purchase Request
// ======================================

export const sendRequest = async ({
  buyerId,
  sellerId,
  productId,
}) => {

  // Product
  const productSnap = await getDoc(
    doc(db, "products", productId)
  );

  if (!productSnap.exists()) {
    throw new Error("Product not found.");
  }

  const product = {
    id: productSnap.id,
    ...productSnap.data(),
  };

  if (product.status !== "Available") {
    throw new Error(
      "Product is no longer available."
    );
  }

  // Buyer
  const buyerSnap = await getDoc(
    doc(db, "users", buyerId)
  );

  if (!buyerSnap.exists()) {
    throw new Error("Buyer not found.");
  }

  const buyer = buyerSnap.data();

  // Duplicate check
  const q = query(
    collection(db, "purchaseRequests"),
    where("buyerId", "==", buyerId),
    where("productId", "==", productId)
  );

  const existing = await getDocs(q);

  if (!existing.empty) {
    throw new Error("Request already sent.");
  }

  await addDoc(
    collection(db, "purchaseRequests"),
    {
      buyerId,
      buyerName: buyer.fullName,
      buyerEmail: buyer.email,
      buyerMobile: buyer.mobile,

      sellerId,

      productId,
      productTitle: product.title,
      productPrice: product.price,

      status: "Pending",

      createdAt: serverTimestamp(),
    }
  );
};

// ======================================
// Seller Requests
// ======================================

export const getSellerRequests = async (
  sellerId
) => {

  const q = query(
    collection(db, "purchaseRequests"),
    where("sellerId", "==", sellerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ======================================
// Buyer Requests
// ======================================

export const getBuyerRequests = async (
  buyerId
) => {

  const q = query(
    collection(db, "purchaseRequests"),
    where("buyerId", "==", buyerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ======================================
// Accept
// ======================================

export const acceptRequest = async (
  request
) => {

  await updateDoc(
    doc(db, "purchaseRequests", request.id),
    {
      status: "Accepted",
    }
  );

  await reserveProduct(
    request.productId,
    request.buyerId
  );

};

// ======================================
// Reject
// ======================================

export const rejectRequest = async (
  request
) => {

  await updateDoc(
    doc(db, "purchaseRequests", request.id),
    {
      status: "Rejected",
    }
  );

};

// ======================================
// Cancel Reservation
// ======================================

export const cancelReservation =
async (productId) => {

  await makeAvailable(productId);

};