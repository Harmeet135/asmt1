import { Card, CardContent } from "../ui/card";

export function EarningsCard() {
  return (
    <Card>
      <CardContent className="p-4 lg:p-6">
        <h4 className="text-sm font-medium text-secondary mb-2">Total Earnings</h4>
        <p className="text-xl lg:text-3xl font-bold text-primary">$1,25,000</p>
      </CardContent>
    </Card> 
  )
}
