import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, Heart } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Ingredient AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering healthier choices through intelligent food analysis
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Ingredient AI, we believe everyone deserves to know what's in their food. Our mission is to make
            ingredient analysis accessible, instant, and actionable. We leverage cutting-edge AI technology to
            help you make informed decisions about the foods you consume, promoting better health and wellness
            for all.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p className="text-muted-foreground">
              To create a world where everyone can easily understand and make informed decisions about their
              nutrition, leading to healthier communities worldwide.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Who We Serve</h3>
            <p className="text-muted-foreground">
              Health-conscious individuals, parents, fitness enthusiasts, people with dietary restrictions,
              and anyone who wants to understand what they're putting into their body.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">How It Works</h3>
            <p className="text-muted-foreground">
              Our advanced AI analyzes ingredient lists using computer vision and natural language processing,
              comparing them against nutritional databases and scientific research to provide instant,
              evidence-based insights.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Values</h3>
            <p className="text-muted-foreground">
              Transparency, accuracy, accessibility, and user privacy. We're committed to providing
              trustworthy information while protecting your data and respecting your privacy.
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-2xl font-bold mb-4">The Technology</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              NutriScan AI combines state-of-the-art computer vision, natural language processing, and
              machine learning to deliver accurate ingredient analysis. Our system:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Uses advanced OCR to extract text from food labels</li>
              <li>Leverages AI models trained on nutritional databases</li>
              <li>Provides real-time analysis and categorization</li>
              <li>Continuously learns and improves from new research</li>
              <li>Offers conversational AI for personalized guidance</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Join Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're constantly improving and expanding NutriScan AI. Your feedback helps us serve you better
              and build a healthier future for everyone.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default About;