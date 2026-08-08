import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// =============================
// Send Purchase Request
// =============================

export const sendRequest = async (request) => {

  const q = query(
    collection(db, "purchaseRequests"),
    where("buyerId", "==", request.buyerId),
    where("productId", "==", request.productId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("Request already sent.");
  }

  await addDoc(
    collection(db, "purchaseRequests"),
    {
      ...request,
      status: "Pending",
      createdAt: serverTimestamp(),
    }
  );
};

// =============================
// Seller Requests
// =============================

export const getSellerRequests = async (sellerId) => {

  const q = query(
    collection(db, "purchaseRequests"),
    where("sellerId", "==", sellerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =============================
// Buyer Requests
// =============================

export const getBuyerRequests = async (buyerId) => {

  const q = query(
    collection(db, "purchaseRequests"),
    where("buyerId", "==", buyerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =============================
// Accept Request
// =============================

export const acceptRequest = async (id) => {

  await updateDoc(
    doc(db, "purchaseRequests", id),
    {
      status: "Accepted",
    }
  );

};

// =============================
// Reject Request
// =============================

export const rejectRequest = async (id) => {

  await updateDoc(
    doc(db, "purchaseRequests", id),
    {
      status: "Rejected",
    }
  );

};