"use client";

export default function AboutPage() {
  return (
    <div
      className="d-flex align-items-center py-5"
      style={{
        minHeight: "calc(100vh - 56px)", // Account for navbar height
        background: "linear-gradient(135deg, #e0f2fe, #60a5fa, #3b82f6)",
      }}
    >
      <div className="container">
        <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
          <h1 className="display-4 fw-bold text-primary mb-3">
            About <span className="text-dark">The Vault</span>
          </h1>
          <p className="lead text-muted mb-4">
            The Vault is your personal space to store, manage, and revisit digital
            files with peace of mind. Designed for clarity and speed, it's a place where your
            documents feel at home.
          </p>

          <hr className="my-4" />

          <h5 className="fw-semibold text-primary mb-3">Inside the Vault</h5>
          <ul className="row list-unstyled text-muted fs-5">
            <li className="col-md-6 mb-3">📤 Seamless drag-and-drop uploads</li>
            <li className="col-md-6 mb-3">🔍 Fast search & smart sorting</li>
            <li className="col-md-6 mb-3">🧾 File icons & visual file type indicators</li>
            <li className="col-md-6 mb-3">💬 Real-time feedback with toast alerts</li>
            <li className="col-md-6 mb-3">✨ Built with Next.js, React & Bootstrap</li>
          </ul>

          <hr className="my-4" />

          <p className="text-end text-muted mb-0">
            Built with 💙 by <strong>Ariana Habas</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
