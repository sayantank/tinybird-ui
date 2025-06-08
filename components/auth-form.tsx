"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/lib/auth";

const authFormSchema = z.object({
  url: z.string().url(),
  token: z.string(),
});

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      url: "",
      token: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    try {
      // Set cookie via server action
      await setCredentials(values);

      // Refresh the page to apply new credentials
      window.location.reload();
    } catch (error) {
      console.error("Failed to store credentials:", error);
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Authenticate to Tinybird</CardTitle>
          <CardDescription>
            Enter your host URL and token below to authenticate to Tinybird
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="http://localhost:7181"
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                >
                  Authenticate
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
