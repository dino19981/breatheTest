"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface SubContext {
  isSubscribed: boolean;
  loading: boolean;
}

const SubscriptionContext = createContext<SubContext>({
  isSubscribed: false,
  loading: true,
});

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = localStorage.getItem("stripeSessionId");
    if (!sid) {
      setLoading(false);
      return;
    }

    fetch("/api/subscription-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sid }),
    })
      .then((r) => r.json())
      .then((data: { subscribed: boolean }) => {
        setIsSubscribed(data.subscribed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
