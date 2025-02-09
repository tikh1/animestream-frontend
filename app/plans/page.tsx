import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Standart Üyelik",
    price: "0",
    description: "Anime dünyasına giriş için temel paket",
    features: [
      { name: "Sınırsız anime izleme", included: true },
      { name: "Reklamsız deneyim", included: false },
      { name: "Bloglara anında erişim", included: false },
      { name: "Öncelikli müşteri desteği", included: false },
    ],
  },
  {
    name: "Premium Üyelik",
    price: "49.99",
    description: "En iyi anime deneyimi için özel paket",
    features: [
      { name: "Sınırsız anime izleme", included: true },
      { name: "Reklamsız deneyim", included: true },
      { name: "Bloglara anında erişim", included: true },
      { name: "Öncelikli müşteri desteği", included: true },
    ],
  },
]

export default function PlansPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Üyelik Planları</h1>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
        AnimeStream'in zengin içerik dünyasına adım atın. Size en uygun planı seçin ve sınırsız anime keyfinin tadını
        çıkarın!
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col w-full max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                {plan.price === "0" ? "Ücretsiz" : `₺${plan.price} `}
                {plan.price !== "0" && <span className="text-sm font-normal">/ay</span>}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className={feature.included ? "" : "text-gray-500"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{plan.price === "0" ? "Ücretsiz Başla" : "Şimdi Katıl"}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

