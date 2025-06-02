"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { t } from "@lingui/macro";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Switch } from "@workspace/ui/components/switch";
import { Check, Sparkles, Heart, Zap, Shield, Clock, Gift } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showDevToggle, setShowDevToggle] = useState(
    process.env.NODE_ENV === "development",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setIsSubscribed(true);
      setSessionId(params.get("session_id"));
    }
    if (params.get("canceled") === "true") {
      setIsSubscribed(false);
      setSessionId(null);
    }
  }, []);

  useEffect(() => {
    if (!sessionId || checked) return;
    setChecked(true);
    fetch("/api/subscription-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data: { subscribed: boolean }) => {
        setIsSubscribed(data.subscribed);
      })
      .catch(console.error);
  }, [sessionId, checked]);

  // Создание сессии Checkout
  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lookup_key: process.env.NEXT_PUBLIC_PRICE_LOOKUP_KEY,
      }),
    });
    if (!res.ok) {
      console.error("API error", await res.text());
      return;
    }
    const { sessionId } = await res.json();

    localStorage.setItem("stripeSessionId", sessionId);
    if (!sessionId) {
      console.error("Не получили sessionId");
      return;
    }

    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({ sessionId });
    if (error) {
      console.error("Stripe redirect error:", error);
    }
  };

  const handleManage = async () => {
    if (!sessionId) return;
    const res = await fetch("/api/create-portal-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!res.ok) console.error("Portal error", await res.text());
  };

  const currentPlan = {
    name: "Premium",
    price: isYearly ? "8.33" : "9.99",
    period: isYearly ? "year" : "month",
    nextBillingDate: "2024-05-15",
    features: [
      "Unlimited breathing sessions",
      "Advanced breathing patterns",
      "Personalized recommendations",
      "Detailed analytics & insights",
      "Offline mode",
      "Priority support",
    ],
  };

  if (isSubscribed) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {showDevToggle && (
          <div className="fixed top-4 right-4 bg-yellow-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Dev Mode</span>
              <Switch
                checked={isSubscribed}
                onCheckedChange={setIsSubscribed}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm">
                {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{t`Your Current Plan`}</h1>
            <p className="text-xl text-muted-foreground">
              {t`Manage your subscription and access your premium features`}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {currentPlan.name}
                  </CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold">
                      ${currentPlan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{currentPlan.period}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Next billing date
                  </p>
                  <p className="font-medium">{currentPlan.nextBillingDate}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t`Your Features`}</h3>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {}}
                  >
                    {t`Change Plan`}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleManage}
                  >
                    {t`Manage Subscription`}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t`Total Sessions`}</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t`Streak`}</p>
                    <p className="text-2xl font-bold">7 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t`Time Saved`}</p>
                    <p className="text-2xl font-bold">3.5h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>{t`Billing History`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Premium Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">
                      April 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Premium Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: [
        "Basic breathing exercises",
        "Daily session limit",
        "Community access",
        "Basic analytics",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: isYearly ? "8.33" : "9.99",
      period: isYearly ? "year" : "month",
      features: [
        "Unlimited breathing sessions",
        "Advanced breathing patterns",
        "Personalized recommendations",
        "Detailed analytics & insights",
        "Offline mode",
        "Priority support",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Family",
      price: isYearly ? "16.67" : "19.99",
      period: isYearly ? "month" : "month",
      features: [
        "Everything in Premium",
        "Up to 5 family members",
        "Family progress tracking",
        "Shared achievements",
        "Family challenges",
        "Dedicated support",
      ],
      cta: "Get Family Plan",
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {showDevToggle && (
        <div className="fixed top-4 right-4 bg-yellow-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Dev Mode</span>
            <Switch
              checked={isSubscribed}
              onCheckedChange={setIsSubscribed}
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-sm">
              {isSubscribed ? "Subscribed" : "Not Subscribed"}
            </span>
          </div>
        </div>
      )}

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">{t`Choose Your Plan`}</h1>
        <p className="text-xl text-muted-foreground">
          {t`Unlock the full potential of your breathing practice with our premium features`}
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
        <span className="text-sm font-medium">Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-primary"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Yearly</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Save 20%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular
                ? "border-primary shadow-lg scale-105"
                : "border-muted"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-tl-lg rounded-br-lg text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => {
                  if (plan.price !== "0") handleCheckout();
                }}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t`Premium Features`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`AI-Powered Insights`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Get personalized recommendations based on your breathing patterns`}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Health Tracking`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Monitor your stress levels and heart rate variability`}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Advanced Exercises`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Access exclusive breathing techniques and guided sessions`}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Privacy Focused`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Your data is encrypted and never shared with third parties`}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t`Frequently Asked Questions`}
        </h2>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">
              {t`Can I change my plan later?`}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t`Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.`}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">{t`Is there a free trial?`}</h3>
            <p className="text-sm text-muted-foreground">
              {t`Yes, we offer a 7-day free trial for all premium features. No credit card required.`}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">
              {t`What payment methods do you accept?`}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t`We accept all major credit cards, PayPal, and Apple Pay.`}
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {t`Ready to transform your breathing practice?`}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t`Join thousands of users who have improved their well-being with Breathtake.`}
        </p>
        <Button size="lg" className="text-lg px-8">
          {t`Start Your Free Trial`}
        </Button>
      </div>
    </div>
  );
}
