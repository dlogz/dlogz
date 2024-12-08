"use client";
import React from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent } from "../ui/card";
import { ShieldCheck, Mail, Wallet, BookOpen, Star } from "lucide-react";

// Fake data for development
const FAKE_USER_DETAILS = {
  email: "user@example.com",
  isEmailVerified: true,
  isAgeVerified: true,
  isNSFWEnabled: false,
  blogCount: 12,
  rating: {
    score: 4.5,
    totalRatings: 28,
    attestations: [
      {
        title: "Quality Writer",
        count: 15,
      },
      {
        title: "Helpful Content",
        count: 8,
      },
      {
        title: "Technical Expert",
        count: 5,
      },
    ],
  },
};

export const UserProfile = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!address) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Please connect your wallet</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 container">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const userDetails = FAKE_USER_DETAILS;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">User Profile</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Wallet Address</p>
              <p className="font-mono">{address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">2FA Email Status</p>
              <div className="flex items-center space-x-2">
                <span>{userDetails.email}</span>
                {userDetails.isEmailVerified && (
                  <Badge variant="success">Verified</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Content Access</p>
              <div className="flex flex-wrap gap-2">
                {userDetails.isAgeVerified ? (
                  <Badge variant="success">Age Verified (18+)</Badge>
                ) : (
                  <Badge variant="secondary">Age Not Verified</Badge>
                )}
                {userDetails.isNSFWEnabled ? (
                  <Badge variant="success">NSFW Enabled</Badge>
                ) : (
                  <Badge variant="secondary">NSFW Disabled</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Activity & Reputation</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Blog Count */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Total Blogs Published</p>
              <p className="text-2xl font-bold">{userDetails.blogCount}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Writer Rating</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">
                  {userDetails.rating.score}
                </span>
                <span className="text-sm text-gray-500">
                  ({userDetails.rating.totalRatings} ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Attestations */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Community Attestations</p>
            <div className="flex flex-wrap gap-2">
              {userDetails.rating.attestations.map((attestation, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 bg-gray-50"
                >
                  {attestation.title}
                  <span className="ml-2 text-gray-500">
                    {attestation.count}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Note */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="text-sm text-yellow-800 py-4">
          <p className="font-semibold">Development Note:</p>
          <p>
            Currently showing mock data. Blog count will be fetched from
            contract events, and ratings/attestations will be implemented using
            True Network attestation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
