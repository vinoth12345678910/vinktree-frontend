"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Type definitions
interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  [key: string]: string | undefined; // For dynamic links
}

interface User {
  username: string;
  email: string;
}

interface Profile {
  userId: User;
  bio: string;
  socialLinks: SocialLinks;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscribeError, setSubscribeError] = useState<string>("");

  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "",
    github: "",
    twitter: "",
  });

  const [newPlatform, setNewPlatform] = useState("");
  const [newLink, setNewLink] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data: Profile = await response.json();
          setProfile(data);
          setBio(data.bio);
          setSocialLinks(data.socialLinks);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${backendUrl}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        bio,
        socialLinks,
      }),
    });

    if (response.ok) {
      alert("Profile updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update profile.");
    }
  };

  const handleAddLink = () => {
    if (newPlatform.trim() && newLink.trim()) {
      setSocialLinks({
        ...socialLinks,
        [newPlatform.toLowerCase()]: newLink,
      });
      setNewPlatform("");
      setNewLink("");
    } else {
      alert("Please enter both platform name and link.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 text-lg font-semibold text-gray-500">Loading...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 text-lg font-semibold text-gray-500">No profile data found.</div>;

  // Improved subscribe handler using profile email
  const handleSubscribe = async () => {
    setSubscribing(true);
    setSubscribeError("");
    try {
      const res = await fetch(`${backendUrl}/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: profile.userId.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSubscribeError("Failed to create Stripe session");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubscribeError("Error: " + err.message);
      } else {
        setSubscribeError("Error: Unknown error");
      }
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-8">
        {/* Profile Card */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center mb-2 shadow-lg">
            <Image src="/next.svg" alt="Avatar" width={48} height={48} className="dark:invert" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">Welcome, {profile.userId?.username}</h1>
          <p className="text-gray-600 text-center text-lg max-w-xl">{profile.bio || "No bio yet. Add one!"}</p>
        </div>

        {/* Social Links */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Your Social Links</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium shadow-sm transition"
              >
                {/* Optionally add platform icons here */}
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="w-full">
          <Button
            className="mb-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-2 rounded-lg shadow"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Update Your Profile"}
          </Button>

          {isEditing && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 bg-blue-50/60 rounded-xl p-6 shadow-inner mt-2">
              <div>
                <Label className="text-base">Bio</Label>
                <Input value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 focus:ring-2 focus:ring-blue-400" />
              </div>
              {["linkedin", "github", "twitter"].map((platform) => (
                <div key={platform}>
                  <Label className="text-base">{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                  <Input
                    value={socialLinks[platform] || ""}
                    onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                    className="mt-1 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              {/* Dynamic New Link Input */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-base">New Platform</Label>
                  <Input
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    placeholder="eg: YouTube"
                    className="mt-1 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-base">New Link</Label>
                  <Input
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="eg: https://youtube.com/yourchannel"
                    className="mt-1 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <Button type="button" onClick={handleAddLink} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
                Add New Link
              </Button>
              <Button type="submit" className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow text-lg">
                Save Changes
              </Button>
            </form>
          )}
        </div>

        {/* Premium Subscribe Button */}
        <div className="w-full flex flex-col items-center mt-6">
          <Button
            onClick={handleSubscribe}
            className="w-full max-w-xs bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:from-yellow-500 hover:to-purple-600 text-white text-lg py-3 rounded-xl shadow-xl font-bold animate-pulse"
            disabled={subscribing}
          >
            {subscribing ? "Redirecting..." : "Subscribe to Premium"}
          </Button>
          {subscribeError && (
            <p className="text-red-500 mt-2">{subscribeError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
