import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sweet } from "@/lib/mockData";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sweetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  imageUrl: z.string().url("Must be a valid URL"),
});

type SweetFormValues = z.infer<typeof sweetSchema>;

interface AdminSweetFormProps {
  initialData?: Sweet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SweetFormValues) => Promise<void>;
}

export function AdminSweetForm({ initialData, open, onOpenChange, onSubmit }: AdminSweetFormProps) {
  const form = useForm<SweetFormValues>({
    resolver: zodResolver(sweetSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      stock: 0,
      imageUrl: "https://i.imgur.com/8kQ9X9d.jpg",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        description: initialData.description,
        stock: initialData.stock,
        imageUrl: initialData.imageUrl,
      });
    } else {
      form.reset({
        name: "",
        category: "",
        price: 0,
        description: "",
        stock: 0,
        imageUrl: "https://i.imgur.com/8kQ9X9d.jpg",
      });
    }
  }, [initialData, form, open]);

  const handleSubmit = async (values: SweetFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Sweet" : "Add New Sweet"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Make changes to your sweet treat." : "Add a new delicious item to the menu."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chocolate Truffle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Chocolates">Chocolates</SelectItem>
                        <SelectItem value="Gummies">Gummies</SelectItem>
                        <SelectItem value="Hard Candies">Hard Candies</SelectItem>
                        <SelectItem value="Pastries">Pastries</SelectItem>
                        <SelectItem value="Fudge">Fudge</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the taste..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Sweet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
