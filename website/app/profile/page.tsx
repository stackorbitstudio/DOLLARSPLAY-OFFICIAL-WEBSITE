
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../../lib/firebase";

const BASE = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [accountStatus, setAccountStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;

      if (!currentUser || !currentUser.emailVerified) {
        if (currentUser) await signOut(auth);

        if (active) {
          window.location.replace(`${BASE}/login/`);
        }
        return;
      }

      setUser(currentUser);
      setEmail(currentUser.email || "");
      setName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");

      try {
        const profileSnap = await getDoc(
          doc(db, "users", currentUser.uid)
        );

        if (!active) return;

        if (profileSnap.exists()) {
          const data = profileSnap.data();

          setName(data.displayName || currentUser.displayName || "");
          setPhotoURL(data.photoURL || currentUser.photoURL || "");
          setCountry(data.country?.name || "");
          setAccountStatus(data.accountStatus || "active");
        }
      } catch (err) {
        console.error("PROFILE ERROR:", err);

        if (active) {
          setError("Profile information could not be loaded.");
        }
      } finally {
        if (active) setLoading(false);
      }
    });

    const checkAuthentication = () => {
      const currentUser = auth.currentUser;

      if (!currentUser || !currentUser.emailVerified) {
        window.location.replace(`${BASE}/login/`);
      }
    };

    window.addEventListener("pageshow", checkAuthentication);

    return () => {
      active = false;
      unsubscribe();
      window.removeEventListener("pageshow", checkAuthentication);
    };
  }, []);

  async function saveName() {
    if (!user) return;

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setError("Name must contain 2 to 50 characters.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: trimmedName,
      });

      await updateProfile(user, {
        displayName: trimmedName,
      });

      setName(trimmedName);
      setMessage("Your display name has been updated.");
    } catch (err) {
      console.error("PROFILE NAME ERROR:", err);
      setError(
        "Name could not be updated. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function uploadPhoto(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !user) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const photoRef = ref(
        storage,
        `profilePictures/${user.uid}/profile.jpg`
      );

      await uploadBytes(photoRef, file, {
        contentType: file.type,
      });

      const downloadURL = await getDownloadURL(photoRef);

      await updateDoc(doc(db, "users", user.uid), {
        photoURL: downloadURL,
      });

      await updateProfile(user, {
        photoURL: downloadURL,
      });

      setPhotoURL(downloadURL);
      setMessage("Profile picture updated successfully.");
    } catch (err) {
      console.error("PROFILE PHOTO ERROR:", err);

      setError(
        "Photo upload or profile update failed. Please try again."
      );
    } finally {
      setSaving(false);
      event.target.value = "";
    }
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#090611] flex items-center justify-center text-lime-400">
        Loading Profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link
          href={`${BASE}/dashboard/`}
          className="text-lime-400 text-sm"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-extrabold mt-6 mb-2">
          My <span className="text-lime-400">Profile</span>
        </h1>

        <p className="text-gray-400 mb-8">
          Manage your personal account information.
        </p>

        <section className="rounded-3xl border border-purple-700/40 bg-[#160e27] p-6">
          <div className="flex flex-col items-center mb-8">
            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile picture"
                className="w-28 h-28 rounded-full object-cover border-2 border-lime-400"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-purple-800 border-2 border-lime-400 flex items-center justify-center text-4xl font-bold text-lime-400">
                {(name || "P").charAt(0).toUpperCase()}
              </div>
            )}

            <label className="mt-4 cursor-pointer rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold hover:bg-purple-600">
              Change Profile Picture
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={uploadPhoto}
                disabled={saving}
              />
            </label>

            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG or WEBP. Maximum 5 MB.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Display Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="w-full h-14 rounded-xl bg-[#0c0716] border border-purple-700/50 px-4 text-white text-base outline-none focus:border-lime-400"
              />
            </div>

            <button
              onClick={saveName}
              disabled={saving}
              className="w-full rounded-xl bg-lime-400 py-3 font-bold text-black disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Display Name"}
            </button>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>
              <input
                value={email}
                readOnly
                className="w-full h-14 rounded-xl bg-[#0c0716] border border-purple-700/50 px-4 text-white text-base"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Country
              </label>
              <input
                value={country || "Not available"}
                readOnly
                className="w-full h-14 rounded-xl bg-[#0c0716] border border-purple-700/50 px-4 text-white text-base"
              />
            </div>

            <div className="rounded-xl bg-[#0c0716] border border-purple-700/50 p-4">
              <p className="text-sm text-gray-400">Account Status</p>
              <p className="text-lime-400 font-bold mt-1">
                {accountStatus}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Email: Verified
              </p>
            </div>
          </div>

          {message && (
            <p className="mt-5 rounded-xl bg-lime-400/10 p-3 text-sm text-lime-400">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
