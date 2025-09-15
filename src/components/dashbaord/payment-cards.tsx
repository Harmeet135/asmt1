import { Card, CardContent } from "@/components/ui/card"

export function PaymentCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 lg:p-6">
          <h4 className="text-sm font-medium text-secondary mb-2">Payment Awaited</h4>
          <p className="text-xl lg:text-2xl font-bold text-primary">$25,000</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 lg:p-6">
          <h4 className="text-sm font-medium text-secondary mb-2">Payment Overdue</h4>
          <p className="text-xl lg:text-2xl font-bold text-primary">$25,000</p>
        </CardContent>
      </Card>
    </div>
  )
}
