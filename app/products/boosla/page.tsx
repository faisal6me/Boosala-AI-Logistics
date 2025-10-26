"use client"

import { motion } from "framer-motion"
import {
  Package,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Warehouse,
  Navigation,
  Bell,
  CreditCard,
  Globe,
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  Phone,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BooslaPage() {
  const features = [
    {
      icon: Package,
      title: "إدارة الطلبات الذكية",
      description: "نظام متقدم لإدارة الطلبات مع استيراد CSV وطباعة التسميات تلقائياً",
    },
    {
      icon: MapPin,
      title: "إدارة المناطق بالخرائط",
      description: "رسم المناطق التفاعلية باستخدام Mapbox وتعيين السائقين تلقائياً",
    },
    {
      icon: Users,
      title: "إدارة السائقين",
      description: "تتبع أداء السائقين وتعيين المهام بناءً على الموقع والتوفر",
    },
    {
      icon: Warehouse,
      title: "إدارة المستودعات",
      description: "إدارة نقاط الاستلام والمستودعات مع تتبع المخزون",
    },
    {
      icon: Navigation,
      title: "تحسين المسارات",
      description: "حساب أفضل المسارات للتسليم باستخدام Google Directions API",
    },
    {
      icon: Bell,
      title: "الإشعارات الفورية",
      description: "إشعارات SMS وبريد إلكتروني ودفع للسائقين والعملاء",
    },
    {
      icon: CreditCard,
      title: "إدارة المدفوعات",
      description: "دعم الدفع عند الاستلام والبطاقات مع تكامل Moyasar",
    },
    {
      icon: Globe,
      title: "تكامل زد الكامل",
      description: "مزامنة تلقائية للطلبات مع منصة زد عبر OAuth 2.0",
    },
  ]

  const benefits = [
    {
      title: "زيادة الكفاءة",
      value: "40%",
      description: "تحسين في سرعة التسليم",
    },
    {
      title: "توفير التكاليف",
      value: "35%",
      description: "تقليل في تكاليف التشغيل",
    },
    {
      title: "رضا العملاء",
      value: "95%",
      description: "معدل رضا العملاء",
    },
  ]

  const workflow = [
    {
      step: "1",
      title: "استقبال الطلب",
      description: "يتم استقبال الطلب من زد أو إدخاله يدوياً",
    },
    {
      step: "2",
      title: "تعيين السائق",
      description: "النظام يختار السائق المناسب بناءً على الموقع والحمل",
    },
    {
      step: "3",
      title: "تحسين المسار",
      description: "حساب أفضل مسار للتسليم وإرساله للسائق",
    },
    {
      step: "4",
      title: "التسليم والدفع",
      description: "السائق يسلم الطلب ويحصل على الدفع",
    },
  ]

  const aiFeatures = [
    {
      icon: Brain,
      title: "التنبؤ بالمشكلات",
      description: "يتنبأ النظام بمشكلات التوصيل قبل وقوعها باستخدام خوارزميات التعلم الآلي",
    },
    {
      icon: Navigation,
      title: "إعادة التوجيه الذكي",
      description: "يعيد توجيه السائقين في الوقت الحقيقي حسب الازدحام والطقس",
    },
    {
      icon: MessageSquare,
      title: "تواصل استباقي",
      description: "يتواصل تلقائياً مع العملاء عبر واتساب لتأكيد الاستلام وإعادة الجدولة",
    },
    {
      icon: Phone,
      title: "مكالمات صوتية ذكية",
      description: "بوت صوتي يتواصل مع العملاء لتقليل حالات الفشل",
    },
    {
      icon: AlertTriangle,
      title: "نظام تصعيد ذكي",
      description: "ينبه المشرفين تلقائياً عند وجود تأخيرات متكررة",
    },
    {
      icon: BarChart3,
      title: "تحليل البيانات",
      description: "يحلل سلوك العملاء وأنماط التوصيل لتحسين الأداء",
    },
  ]

  const technologies = [
    {
      name: "Machine Learning",
      description: "خوارزميات التعلم الآلي للتنبؤ وتحسين المسارات",
    },
    {
      name: "APIs Integration",
      description: "تكامل مع واجهات المرور والطقس",
    },
    {
      name: "WhatsApp Bot",
      description: "بوت محادثة واتساب للتفاعل مع العملاء",
    },
    {
      name: "Voice AI",
      description: "مكالمات صوتية ذكية تلقائية",
    },
    {
      name: "Smart Escalation",
      description: "نظام تصعيد يعتمد على تحليل البيانات",
    },
    {
      name: "Next.js Dashboard",
      description: "لوحة تحكم تحليلية تفاعلية",
    },
  ]

  const impact = [
    {
      icon: TrendingUp,
      value: "60%",
      title: "تقليل معدل الفشل",
      description: "انخفاض في حالات فشل التوصيل",
    },
    {
      icon: Zap,
      value: "45%",
      title: "خفض التكاليف",
      description: "توفير في التكاليف التشغيلية والوقود",
    },
    {
      icon: Users,
      value: "95%",
      title: "رضا العملاء",
      description: "تحسين تجربة التوصيل",
    },
  ]

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                منصة ذكاء اصطناعي للميل الأخير
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-primary to-blue-400 bg-clip-text text-transparent">
                بوصله – Boosla
              </h1>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                منصة ذكاء اصطناعي تعمل كوكيل ذكي لإدارة عمليات التوصيل في الميل الأخير
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                تتنبأ بمشكلات التوصيل قبل وقوعها، وتعيد توجيه السائقين في الوقت الحقيقي حسب الازدحام أو الطقس، وتتواصل
                استباقيًا مع العملاء عبر واتساب أو المكالمات الصوتية لتقليل حالات الفشل وزيادة رضا العملاء.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products/boosla/dashboard"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-lg"
                >
                  لوحة التحكم
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 text-lg"
                >
                  تواصل معنا
                </Link>
              </div>
            </motion.div>

            {/* ... existing stats card ... */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <Package className="w-8 h-8 text-primary mb-2" />
                    <div className="text-2xl font-bold">2,547</div>
                    <div className="text-sm text-gray-400">طلب نشط</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <Users className="w-8 h-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-gray-400">سائق نشط</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <Warehouse className="w-8 h-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-gray-400">مستودع</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <MapPin className="w-8 h-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold">48</div>
                    <div className="text-sm text-gray-400">منطقة توصيل</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block">
                <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-lg px-4 py-2">المشكلة</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">التحديات في الميل الأخير</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                تشكل مرحلة التوصيل الأخيرة التحدي الأكبر في اللوجستيات والتجارة الإلكترونية، بسبب:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">ازدحام الطرق</div>
                    <div className="text-gray-400">تأخيرات غير متوقعة تؤثر على جداول التوصيل</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">غياب العملاء</div>
                    <div className="text-gray-400">محاولات توصيل فاشلة تزيد التكاليف</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">ضعف التواصل</div>
                    <div className="text-gray-400">عدم وضوح حالة الطلب يؤدي لعدم رضا العملاء</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">صعوبة التوسع</div>
                    <div className="text-gray-400">تحديات في إدارة عمليات التوصيل اليومية المتزايدة</div>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-lg px-4 py-2">الحل</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">الذكاء الاصطناعي للإنقاذ</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                بوصلة تستخدم الذكاء الاصطناعي لتحليل بيانات المرور والطقس وسلوك العملاء:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">توجيه لحظي ذكي</div>
                    <div className="text-gray-400">خوارزميات ذكية توجه السائقين عبر أفضل المسارات</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">تواصل تلقائي</div>
                    <div className="text-gray-400">واتساب ومكالمات صوتية لتأكيد الاستلام وإعادة الجدولة</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">تصعيد ذكي</div>
                    <div className="text-gray-400">تنبيه المشرفين عند التأخيرات المتكررة</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">تجربة مثالية</div>
                    <div className="text-gray-400">ضمان تجربة توصيل سلسة ومرضية</div>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-blue-500/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">الذكاء الاصطناعي</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">قدرات الذكاء الاصطناعي</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">تقنيات متقدمة تعمل معاً لضمان نجاح كل عملية توصيل</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-primary/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">التقنيات المستخدمة</h2>
            <p className="text-xl text-gray-400">مجموعة متكاملة من التقنيات الحديثة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-gray-800 bg-gray-900/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h3 className="text-lg font-semibold">{tech.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الأثر المحتمل</h2>
            <p className="text-xl text-gray-400">نتائج قابلة للقياس تحدث فرقاً حقيقياً</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {impact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-gray-800 bg-gradient-to-br from-primary/5 to-blue-500/5 hover:from-primary/10 hover:to-blue-500/10 transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-5xl font-bold text-primary mb-2">{item.value}</div>
                    <div className="text-xl font-semibold mb-2">{item.title}</div>
                    <div className="text-gray-400">{item.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">بناء نموذج وطني مبتكر</h3>
              <p className="text-lg text-gray-300">
                تمكين الشركات من التوسع بكفاءة في عملياتها اللوجستية، ورفع كفاءة قطاع الخدمات والتوصيل الذكي في المملكة
                العربية السعودية
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الميزات الرئيسية</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">كل ما تحتاجه لإدارة عمليات التوصيل بكفاءة وفعالية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-800 bg-gray-900/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الفوائد المثبتة</h2>
            <p className="text-xl text-gray-400">نتائج ملموسة لعملائنا</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-primary mb-2">{benefit.value}</div>
                    <div className="text-xl font-semibold mb-2">{benefit.title}</div>
                    <div className="text-gray-400">{benefit.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف يعمل؟</h2>
            <p className="text-xl text-gray-400">عملية بسيطة وفعالة</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-l from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zid Integration Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">تكامل زد</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">تكامل سلس مع منصة زد</h2>
                <p className="text-lg text-gray-300 mb-6">
                  اربط متجرك على زد مباشرة مع بوصله واستفد من المزامنة التلقائية للطلبات وإدارة التوصيل الذكية.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>مزامنة تلقائية للطلبات من زد</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>تحديثات فورية لحالة الطلب</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>إدارة مركزية لجميع الطلبات</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>تتبع مباشر للشحنات</span>
                  </li>
                </ul>
                <Link
                  href="/products/boosla/dashboard/integrations"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                  ابدأ التكامل الآن
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Link>
              </div>

              <div className="relative">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">متجر زد</div>
                        <div className="text-sm text-gray-400">متصل</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">نشط</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm">طلبات اليوم</span>
                      <span className="font-semibold text-primary">147</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm">قيد التوصيل</span>
                      <span className="font-semibold text-blue-500">89</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm">تم التسليم</span>
                      <span className="font-semibold text-green-500">58</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/20 to-blue-500/20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">جاهز لتحويل عمليات التوصيل؟</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ابدأ مع بوصله اليوم واستمتع بإدارة لوجستية ذكية وفعالة
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products/boosla/dashboard"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-lg"
              >
                ابدأ الآن
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 text-lg"
              >
                احجز عرض توضيحي
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
