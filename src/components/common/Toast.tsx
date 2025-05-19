"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "@/store/documentSlice";
import { Toast as BootstrapToast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: ToastProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <BootstrapToast
      className={`position-fixed toast-${type} m-3 toast-enhanced`}
      show={true}
      delay={3000}
      autohide
      aria-live="assertive"
      aria-atomic="true"
      style={{ bottom: 0, right: 0 }}
    >
      <BootstrapToast.Header closeButton={false} className={`bg-${type} text-white`}>
        <FontAwesomeIcon
          icon={type === "success" ? faCheckCircle : faExclamationCircle}
          className="me-2"
          aria-hidden="true"
        />
        <strong className="me-auto">{type === "success" ? "Success" : "Error"}</strong>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{message}</BootstrapToast.Body>
    </BootstrapToast>
  );
}