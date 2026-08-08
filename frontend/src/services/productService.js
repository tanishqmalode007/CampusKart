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
      createdAt: serverTimestamp(),
      status: "Available",
    }
  );

  return docRef.id;
};

// =========================
// Get All Products
// =========================

export const getProducts = async () => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// =========================
// Get One Product
// =========================

export const getProduct = async (id) => {
  const snapshot = await getDoc(
    doc(db, "products", id)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

// =========================
// My Listings
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
// Delete Product
// =========================

export const deleteProduct = async (id) => {
  await deleteDoc(
    doc(db, "products", id)
  );
};

// =========================
// Mark Sold
// =========================

export const markSold = async (id) => {
  await updateDoc(
    doc(db, "products", id),
    {
      status: "Sold",
    }
  );
};