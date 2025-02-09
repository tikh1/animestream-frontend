import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Yardım ve Destek</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sıkça Sorulan Sorular</CardTitle>
          <CardDescription>AnimeStream hakkında en çok sorulan sorular ve cevapları</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>AnimeStream'e nasıl üye olabilirim?</AccordionTrigger>
              <AccordionContent>
                AnimeStream'e üye olmak için ana sayfadaki "Kayıt Ol" butonuna tıklayarak kayıt formunu doldurmanız
                yeterlidir. E-posta adresinizi, kullanıcı adınızı ve şifrenizi belirledikten sonra hesabınız
                oluşturulacaktır.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Anime izlerken yaşadığım teknik sorunları nasıl çözebilirim?</AccordionTrigger>
              <AccordionContent>
                Genellikle tarayıcınızı yenilemek veya farklı bir tarayıcı kullanmak sorunları çözebilir. İnternet
                bağlantınızın stabil olduğundan emin olun. Sorun devam ederse, tarayıcınızın önbelleğini temizlemeyi
                deneyin veya destek ekibimizle iletişime geçin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Ödeme yöntemleri nelerdir?</AccordionTrigger>
              <AccordionContent>
                AnimeStream, kredi kartı, banka kartı, PayPal ve bazı ülkelerde mobil ödeme gibi çeşitli ödeme
                yöntemlerini desteklemektedir. Ödeme sayfasında ülkeniz için geçerli olan tüm ödeme seçeneklerini
                görebilirsiniz.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">Aradığınızı bulamadınız mı?</p>
            <Link href="/help/submit-ticket">
              <Button variant="outline" className="mt-2">
                Ticket Açın
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>İletişim</CardTitle>
          <CardDescription>Hala sorunuz mu var? Bize ulaşın!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Destek ekibimiz size yardımcı olmak için hazır. Aşağıdaki yöntemlerle bize ulaşabilirsiniz:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>E-posta: destek@animestream.com</li>
            <li>Telefon: +90 212 345 67 89 (Hafta içi 09:00 - 18:00)</li>
            <li>Canlı Destek: Sağ alt köşedeki sohbet simgesine tıklayın</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

