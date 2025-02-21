"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HappyUsers from "./happy-users";
import HeroBg from "./bg";
import { Hero as HeroType } from "@/types/blocks/hero";
import Icon from "@/components/icon";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import ExplanationDialog from "@/components/blocks/explanation-dialog";

export default function Hero({ hero }: { hero: HeroType }) {
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleExplain = async () => {
    if (!content) {
      toast.error("Please enter what you want to explain");
      return;
    }
    if (!audience) {
      toast.error("Please enter who you want to explain to");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request with:", { content, audience });
      
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          audience,
        }),
      });

      const data = await response.json();
      console.log("Received response:", data);
      
      if (data.code !== 0) {
        throw new Error(data.message || "Failed to generate explanation");
      }
      
      const explanation = data.data?.explanation;
      if (!explanation) {
        throw new Error("No explanation received");
      }

      setExplanation(explanation);
      setDialogOpen(true);
      toast.success("Explanation generated successfully!");
      
    } catch (error) {
      console.error("Failed to generate explanation:", error);
      toast.error("Failed to generate explanation. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  console.log("Dialog state:", { open: dialogOpen, hasContent: !!explanation });

  return (
    <>
      <HeroBg />
      <section className="relative py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-16 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl 
              bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500
              animate-gradient-x hover:scale-105 transition-transform duration-300">
              {hero.title}
            </h1>

            <div className="mx-auto max-w-3xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 
                rounded-[2.5rem] blur opacity-30 group-hover:opacity-40 transition duration-1000 
                group-hover:duration-300 animate-tilt"></div>
              
              <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 
                rounded-[2rem] p-10 shadow-xl 
                border border-white/20 dark:border-gray-800/20
                hover:border-white/30 dark:hover:border-gray-700/30 
                transition-all duration-300">
                
                <div className="flex flex-col gap-10 text-xl sm:text-2xl">
                  <div className="text-left">
                    <span className="text-foreground font-bold text-3xl
                      bg-clip-text text-transparent bg-gradient-to-r 
                      from-blue-500 to-purple-500">
                      I want to explain
                    </span>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                      rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <Input
                      placeholder="a complex topic, URL or article..."
                      className="relative h-20 text-2xl border-0 rounded-xl bg-white/80 dark:bg-gray-900/80
                        focus:ring-2 focus:ring-purple-500/50 transition-all duration-300
                        group-hover:bg-white/90 dark:group-hover:bg-gray-900/90 pl-8"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-foreground font-bold text-3xl whitespace-nowrap
                      bg-clip-text text-transparent bg-gradient-to-r 
                      from-purple-500 to-blue-500">
                      to
                    </span>
                    
                    <div className="flex-1 relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                        rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                      <Input
                        placeholder="kids, beginners, experts..."
                        className="relative h-16 text-2xl border-0 rounded-xl bg-white/80 dark:bg-gray-900/80
                          focus:ring-2 focus:ring-purple-500/50 transition-all duration-300
                          group-hover:bg-white/90 dark:group-hover:bg-gray-900/90 pl-6"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                      />
                    </div>

                    <Button 
                      size="lg"
                      className="relative h-16 px-10 text-2xl rounded-xl overflow-hidden
                        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                        hover:from-blue-500 hover:via-purple-500 hover:to-pink-500
                        transition-all duration-300 shadow-lg hover:shadow-xl
                        hover:scale-105 transform"
                      onClick={handleExplain}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="animate-pulse">Generating...</span>
                      ) : (
                        <>
                          now
                          <Icon name="RiArrowRightLine" className="ml-3 h-7 w-7 animate-bounce-x" />
                        </>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                        transform translate-x-[-100%] animate-shimmer"></div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {hero.tip && (
              <p className="mt-8 text-base text-muted-foreground/80 animate-fade-in">
                {hero.tip}
              </p>
            )}
          </div>
        </div>
      </section>
      
      <ExplanationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        content={explanation}
      />
    </>
  );
}
