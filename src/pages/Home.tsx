import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-16 w-16 text-indigo-600" />,
      title: "Kapsamlı Müfredat",
      description: "HTML temellerinden ileri düzey React uygulamalarına kadar her şeyi öğrenin"
    },
    {
      icon: <Code className="h-16 w-16 text-indigo-600" />,
      title: "İnteraktif Öğrenme",
      description: "Gerçek dünya projeleriyle pratik yapın ve anında geri bildirim alın"
    },
    {
      icon: <Users className="h-16 w-16 text-indigo-600" />,
      title: "Topluluk Desteği",
      description: "Öğrenen bir topluluğa katılın ve birlikte gelişin"
    }
  ];

  const benefits = [
    "Sertifikalı eğitmenler tarafından hazırlanmış dersler",
    "Kendi hızınızda öğrenme imkanı",
    "Gerçek dünya projeleri ile pratik yapma",
    "7/24 topluluk desteği",
    "Tamamlama sertifikası",
    "Kariyer rehberliği"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              K! Learn ile Web Geliştirmeyi Keşfedin
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Uzman eğitmenlerden öğrenin, gerçek projeler geliştirin ve kariyerinizi ilerletin.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              >
                Ücretsiz Başla
              </Link>
              <Link
                to="/courses"
                className="text-base font-semibold text-gray-900 flex items-center hover:text-indigo-600 transition-colors"
              >
                Kursları İncele
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-colors">
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Neden K! Learn'i Seçmelisiniz?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Learning"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}