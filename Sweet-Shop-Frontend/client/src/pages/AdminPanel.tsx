import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, Download } from "lucide-react";
import { api } from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminSweetForm } from "@/components/admin/AdminSweetForm";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sweet } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | undefined>(undefined);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      setLocation('/');
    }
  }, [user, authLoading, setLocation]);

  const { data: sweets } = useQuery({
    queryKey: ['sweets'],
    queryFn: () => api.getSweets(),
  });

  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.getAnalytics(),
  });

  const createMutation = useMutation({
    mutationFn: (newSweet: any) => api.addSweet(newSweet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast({ title: "Success", description: "Sweet added successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number, updates: any }) => api.updateSweet(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast({ title: "Success", description: "Sweet updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteSweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast({ title: "Success", description: "Sweet deleted successfully" });
    },
  });

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this sweet?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = async (values: any) => {
    if (editingSweet) {
      await updateMutation.mutateAsync({ id: editingSweet.id, updates: values });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  const handleExportCSV = () => {
    if (!sweets) return;
    const headers = ["ID", "Name", "Category", "Price", "Stock", "Description"];
    const csvContent = [
      headers.join(","),
      ...sweets.map(s => [s.id, `"${s.name}"`, s.category, s.price, s.stock, `"${s.description}"`].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sweets_inventory.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Exported", description: "Inventory downloaded as CSV" });
  };

  if (authLoading || !user) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button onClick={() => { setEditingSweet(undefined); setIsFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add New Sweet
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sweets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="sweets">Inventory Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sweets" className="mt-6">
          <div className="rounded-md border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sweets?.map((sweet) => (
                  <TableRow key={sweet.id}>
                    <TableCell className="font-medium">{sweet.name}</TableCell>
                    <TableCell>{sweet.category}</TableCell>
                    <TableCell>${sweet.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {sweet.stock}
                        {sweet.stock < 10 && (
                          <span className="text-xs text-destructive font-bold animate-pulse">Low Stock</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(sweet)}>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(sweet.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsCharts data={analytics || []} />
        </TabsContent>
      </Tabs>

      <AdminSweetForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        initialData={editingSweet}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
