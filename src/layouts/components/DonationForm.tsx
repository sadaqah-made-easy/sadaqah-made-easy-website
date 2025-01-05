"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Schema for form validation
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, { message: "Description is required." }),
  payment_info: z.string().min(1, { message: "Payment info is required." }),
  date: z.string().min(1, { message: "Date is required." }),
  image: z.string().url({ message: "Invalid image URL" }),
  referral_link: z.string().url({ message: "Invalid referral link" }),
  organizer: z
    .string()
    .min(1, { message: "Organization reference type is required." }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required." }),
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required." }),
});

const DonationForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      payment_info: "",
      date: "",
      referral_link: "",
      image: "",
      organizer: "",
      categories: [],
      tags: [],
    },
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        form.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-center">
      <div className="md:col-9">
        <h1 className="text-primary mb-14">
          Share Your Sadaqah Project for Crowdfunding!
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="row">
            <div className="md:col-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        placeholder="Winter Relief - 24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">
                      Project End Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="form-input justify-start text-base md:text-sm"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span className="text-light md:text-sm">
                                Pick a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              field.onChange(
                                format(date || new Date(), "yyyy-MM-dd"),
                              );
                            }}
                            disabled={(date) => date < new Date()} // Disable past dates
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              {/* Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">Image URL</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        type="url"
                        placeholder="https://yourimage.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-6">
              {/* Organization Reference Type */}
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">
                      Organization Reference Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        placeholder="Moshal Alo Trust"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              {/* Categories */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">Categories</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        placeholder="e.g., Winter, Charity"
                        onChange={(e) =>
                          field.onChange(e.target.value.split(","))
                        }
                        value={field.value.join(",")}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="form-label">Tags</FormLabel>
                    <FormControl>
                      <Input
                        className="form-input"
                        placeholder="e.g., শীতকাল, Winter"
                        onChange={(e) =>
                          field.onChange(e.target.value.split(","))
                        }
                        value={field.value.join(",")}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600 pt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Referral link */}
            <FormField
              control={form.control}
              name="referral_link"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="form-label">
                    Referral Link (For Verification)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="form-input"
                      type="url"
                      placeholder="https://your-referral-link.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600 pt-1" />
                </FormItem>
              )}
            />
            {/* Bkash, Rocket and Banking information */}
            <FormField
              control={form.control}
              name="payment_info"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="form-label">
                    Bkash, Rocket and Banking information
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="form-input"
                      placeholder={`Type: Bkash\nNumber: 00*********\nReference: Sadaqah Made Easy\nAccount Type: Personal`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600 pt-1" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="form-input"
                      placeholder="Description about the winter relief..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600 pt-1" />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className={`btn btn-primary px-10 mt-6`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DonationForm;
