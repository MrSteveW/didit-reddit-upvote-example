"use client";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SearchToast({ searchTerm, hasResults, showToast }) {
  useEffect(() => {
    if (showToast && searchTerm && !hasResults) {
      toast.error(
        `No posts found for "${searchTerm}". Try different keywords.`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else if (showToast && searchTerm && hasResults) {
      toast.success(`Found results for "${searchTerm}"!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [searchTerm, hasResults, showToast]);

  return <ToastContainer />;
}
