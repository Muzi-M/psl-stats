"use client";

import { useEffect, useState } from "react";

export default function TestLogos() {
  const [logoStatus, setLogoStatus] = useState<{
    main: string;
    favicon: string;
    origin: string;
  }>({
    main: "loading",
    favicon: "loading",
    origin: "loading",
  });

  useEffect(() => {
    // Test logo accessibility
    const testLogo = (src: string, key: keyof typeof logoStatus) => {
      const img = new Image();
      img.onload = () =>
        setLogoStatus((prev) => ({ ...prev, [key]: "success" }));
      img.onerror = () =>
        setLogoStatus((prev) => ({ ...prev, [key]: "failed" }));
      img.src = src;
    };

    testLogo("/Infinix_logo-removebg-preview.png", "main");
    testLogo("/infinix-fav-icon.png", "favicon");
    testLogo(
      `${window.location.origin}/Infinix_logo-removebg-preview.png`,
      "origin"
    );
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Logo Test Page</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Main Logo</h2>
          <div className="flex items-center gap-4">
            <img
              src="/Infinix_logo-removebg-preview.png"
              alt="Main Logo"
              className="w-32 h-32 object-contain border"
            />
            <div>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    logoStatus.main === "success"
                      ? "text-green-600"
                      : logoStatus.main === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {logoStatus.main}
                </span>
              </p>
              <p>Path: /Infinix_logo-removebg-preview.png</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Favicon Logo</h2>
          <div className="flex items-center gap-4">
            <img
              src="/infinix-fav-icon.png"
              alt="Favicon Logo"
              className="w-32 h-32 object-contain border"
            />
            <div>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    logoStatus.favicon === "success"
                      ? "text-green-600"
                      : logoStatus.favicon === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {logoStatus.favicon}
                </span>
              </p>
              <p>Path: /infinix-fav-icon.png</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Full Origin Path Test</h2>
          <div className="flex items-center gap-4">
            <img
              src={`${window.location.origin}/Infinix_logo-removebg-preview.png`}
              alt="Origin Logo"
              className="w-32 h-32 object-contain border"
            />
            <div>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    logoStatus.origin === "success"
                      ? "text-green-600"
                      : logoStatus.origin === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {logoStatus.origin}
                </span>
              </p>
              <p>
                Path: {window.location.origin}/Infinix_logo-removebg-preview.png
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <p>
              <strong>Current URL:</strong> {window.location.href}
            </p>
            <p>
              <strong>Origin:</strong> {window.location.origin}
            </p>
            <p>
              <strong>Protocol:</strong> {window.location.protocol}
            </p>
            <p>
              <strong>Host:</strong> {window.location.host}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Available Files in Public
          </h2>
          <ul className="list-disc pl-4">
            <li>/Infinix_logo-removebg-preview.png</li>
            <li>/infinix-fav-icon.png</li>
            <li>/site.webmanifest</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
