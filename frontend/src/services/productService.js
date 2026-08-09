import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

// =========================
// Publish Product
// =========================

export const publishProduct = async (product) => {
  const docRef = await addDoc(
    collection(db, "products"),
    {
      ...product,
      status: "Available",
      reservedFor: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return docRef.id;
};

// =========================
// Get All Products
// =========================

export const getProducts = async () => {
  const q = query(
    collection(db, "products"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =========================
// Get One Product
// =========================

export const getProduct = async (id) => {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

// =========================
// Seller Listings
// =========================

export const getMyProducts = async (uid) => {
  const q = query(
    collection(db, "products"),
    where("ownerId", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =========================
// Reserve Product
// =========================

export const reserveProduct = async (
  productId,
  buyerId
) => {
  await updateDoc(
    doc(db, "products", productId),
    {
      status: "Reserved",
      reservedFor: buyerId,
      updatedAt: serverTimestamp(),
    }
  );
};

// =========================
// Mark Sold
// =========================

export const markSold = async (
  productId
) => {
  await updateDoc(
    doc(db, "products", productId),
    {
      status: "Sold",
      updatedAt: serverTimestamp(),
    }
  );
};

// =========================
// Make Available Again
// =========================

export const makeAvailable = async (
  productId
) => {
  await updateDoc(
    doc(db, "products", productId),
    {
      status: "Available",
      reservedFor: null,
      updatedAt: serverTimestamp(),
    }
  );
};

// =========================
// Delete Product
// =========================

export const deleteProduct = async (
  productId
) => {
  await deleteDoc(
    doc(db, "products", productId)
  );
};