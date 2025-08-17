"use client";

export default function TestLogos() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Logo Test Page</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Main Logo</h2>
          <img
            src="/Infinix_logo-removebg-preview.png"
            alt="Main Logo"
            className="w-32 h-32 object-contain border"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Favicon Logo</h2>
          <img
            src="/infinix-fav-icon.png"
            alt="Favicon Logo"
            className="w-32 h-32 object-contain border"
          />
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
