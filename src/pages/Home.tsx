import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, MessageSquare, Shield, Zap, Brain, Heart } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-4xl">N</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Ingredent AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Your intelligent companion for understanding food ingredients and making healthier choices
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Link to="/scanner">
              <Button size="lg" className="gap-2 text-lg h-14 px-8">
                <Camera className="w-5 h-5" />
                Start Scanning
              </Button>
            </Link>
            
            <Link to="/chat">
              <Button size="lg" variant="outline" className="gap-2 text-lg h-14 px-8">
                <MessageSquare className="w-5 h-5" />
                Chat with AI
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-card/50">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Scanning</h3>
            <p className="text-muted-foreground">
              Instantly scan ingredient labels with your camera or upload photos for AI-powered analysis
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-card/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Advanced AI categorizes ingredients as healthy, moderate, or harmful with detailed explanations
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-card/50">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Chatbot</h3>
            <p className="text-muted-foreground">
              Get instant answers to your nutrition questions from our intelligent AI assistant
            </p>
          </Card>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose NutriScan AI?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Lightning Fast</h3>
                <p className="text-muted-foreground">Get ingredient analysis in seconds, not minutes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Evidence-Based</h3>
                <p className="text-muted-foreground">Backed by nutritional science and research</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Health Focused</h3>
                <p className="text-muted-foreground">Make informed decisions for better health</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Always Learning</h3>
                <p className="text-muted-foreground">AI continuously improves with latest research</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl">
          <h2 className="text-3xl font-bold">Ready to Make Healthier Choices?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of users who are taking control of their nutrition with NutriScan AI
          </p>
          <Link to="/scanner">
            <Button size="lg" className="gap-2 text-lg h-14 px-8">
              <Camera className="w-5 h-5" />
              Start Your First Scan
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Home;