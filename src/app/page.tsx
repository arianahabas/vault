"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-white"
      style={{
        height: "calc(100vh - 56px)", // Adjust for navbar
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
      }}
    >
      <div className="container px-4 px-lg-5">
        <div className="row align-items-center text-center text-lg-start">
          {/* Right: Image (First on mobile, second on large screens) */}
          <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
            <Image
              src="/vault.png"
              alt="Vault visual"
              width={520}
              height={400}
              className="img-fluid"
              priority
            />
          </div>

          {/* Left: Text */}
          <div className="col-lg-6 order-2 order-lg-1">
            <h1 className="display-3 fw-bold mb-3">
              Welcome to <span className="text-info">The Vault</span>
            </h1>
            <p className="lead fw-light mb-4">
              A serene place for your digital essentials. Upload, organize, and revisit your
              files with ease — no fluff, just flow.
            </p>
            <Link
              href="/vault"
              className="btn btn-info btn-lg fw-bold px-5 py-3 shadow"
            >
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Unlock Your Files
              <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
