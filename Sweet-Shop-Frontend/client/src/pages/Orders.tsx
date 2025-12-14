import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Orders() {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => api.getOrders(),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="font-display text-4xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">View your purchase history.</p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : orders && orders.length > 0 ? (
                <div className="grid gap-6">
                    {orders.map((order: any) => (
                        <Card key={order.id} className="overflow-hidden border-2">
                            <CardHeader className="bg-muted/50 pb-4 border-b">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-bold text-lg">Order #{order.id}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'Date unknown'}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-lg font-bold px-4 py-1">
                                        Total: ${(order.totalAmount || 0).toFixed(2)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item: any) => (
                                            <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                                                <div className="h-16 w-16 rounded-md overflow-hidden bg-muted border">
                                                    <img
                                                        src={item.sweet?.imageUrl || ''}
                                                        alt={item.sweet?.name || 'Sweet'}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-base">{item.sweet?.name || 'Unknown Item'}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity} × ${item.price?.toFixed(2) || '0.00'}
                                                    </p>
                                                </div>
                                                <p className="font-bold text-primary">
                                                    ${((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No items details available (Legacy Order)
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground bg-muted/30 rounded-xl border-2 border-dashed">
                    <p className="text-xl font-medium">No orders yet</p>
                    <p className="text-sm mt-2">Go treat yourself to something sweet!</p>
                </div>
            )}
        </div>
    );
}
