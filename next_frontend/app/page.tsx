import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Target,
  Shield,
  Zap,
  Sparkles,
  DollarSign,
} from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import Link from "next/link";

const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Spending Trends",
      description:
        "Track your spending patterns with intelligent analytics and visual representations.",
      gradient: "from-emerald-400 to-cyan-400",
      iconBg: "bg-gradient-to-br from-emerald-100 to-cyan-100",
    },
    {
      icon: PieChart,
      title: "Category Breakdown",
      description:
        "See exactly where your money goes with detailed category analysis.",
      gradient: "from-purple-400 to-pink-400",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
    },
    {
      icon: BarChart3,
      title: "Financial Charts",
      description:
        "Beautiful, interactive charts that make your financial data easy to understand.",
      gradient: "from-blue-400 to-indigo-400",
      iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description:
        "Set financial goals and monitor your progress with personalized insights.",
      gradient: "from-orange-400 to-red-400",
      iconBg: "bg-gradient-to-br from-orange-100 to-red-100",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your financial data is protected with bank-level security and encryption.",
      gradient: "from-green-400 to-emerald-400",
      iconBg: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Get instant updates and notifications about your financial activities.",
      gradient: "from-yellow-400 to-orange-400",
      iconBg: "bg-gradient-to-br from-yellow-100 to-orange-100",
    },
  ];

  return (
    <>
      <HomeHeader />
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/30">
        {/* Hero Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">
                Smart Financial Management
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Take Control of Your Finances
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Track spending, analyze trends, and make informed financial
              decisions with our comprehensive dashboard featuring beautiful
              charts and intelligent insights.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 px-8 py-3 text-lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 px-8 py-3 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full mb-4 border border-purple-500/20">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600">
                  Powerful Features
                </span>
              </div>
              <h2 className="text-4xl mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Everything You Need to Manage Your Money
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Our platform provides powerful tools and insights to help you
                understand and optimize your financial health with beautiful,
                intuitive interfaces.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group overflow-hidden relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <CardHeader className="relative z-10">
                    <div
                      className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon
                        className={`w-7 h-7 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                      />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10"></div>
              <CardHeader className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-primary to-purple-600 rounded-full">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-4xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Ready to Start Your Financial Journey?
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Join thousands of users who have already improved their
                  financial health with our beautiful, intuitive platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 px-8 py-3 text-lg">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Create Your Account Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
