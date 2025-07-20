"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lightbulb, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getDesignInspirationAction } from "@/app/actions";
import type { DesignInspirationOutput } from "@/ai/flows/design-inspiration";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  contactNumber: z.string().optional(),
  websiteType: z.enum(["Portfolio", "Business", "eCommerce", "Blog", "Custom"], { required_error: "Please select a website type."}),
  projectDescription: z.string().min(20, { message: "Description must be at least 20 characters." }),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the upfront payment terms.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<DesignInspirationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      projectDescription: "",
      agreement: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setAiResponse(null);
    setError(null);

    try {
      const inspiration = await getDesignInspirationAction({
        websiteType: values.websiteType,
        projectDescription: values.projectDescription,
      });
      setAiResponse(inspiration);

      toast({
        title: "🚀 Project Submitted!",
        description: "Thank you! We'll review your details and get back to you shortly.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="project-form">
      <Card className="max-w-3xl mx-auto shadow-2xl shadow-primary/10 bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Let's Build Together</CardTitle>
          <CardDescription>
            Fill out the form below to get started. We'll also generate some AI-powered design inspiration for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="websiteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Website</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a website type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Portfolio">Portfolio</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="eCommerce">eCommerce</SelectItem>
                        <SelectItem value="Blog">Blog</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, target audience, desired features, and any design preferences."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to pay 25% upfront after project confirmation.
                      </FormLabel>
                      <FormDescription>
                        This is required to secure your spot and start the design phase.
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg shadow-accent/30 transition-all hover:scale-105">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating & Submitting...
                  </>
                ) : (
                  <>
                    Submit Project & Get Inspiration <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {aiResponse && (
            <Card className="mt-8 bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  AI Design Inspiration
                </CardTitle>
                <CardDescription>
                  Here are some ideas to kickstart your project's design!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-foreground whitespace-pre-wrap font-body bg-background/50 p-4 rounded-md border">
                  {aiResponse.designInspiration}
                </div>
              </CardContent>
            </Card>
          )}

           {error && !aiResponse && (
            <div className="mt-4 text-center text-sm text-destructive font-medium p-4 bg-destructive/10 rounded-md">
                {error}
            </div>
           )}
        </CardContent>
      </Card>
    </section>
  );
}
