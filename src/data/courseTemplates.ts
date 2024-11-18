type ExerciseTemplate = {
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: string;
    };
    dragdrop?: {
      question: string;
      items: string[];
    };
    coding?: {
      question: string;
      testCases: {
        input: string;
        expectedOutput: string;
        description: string;
      }[];
    };
  };
  
  type ModuleTemplate = {
    title: string;
    content: string;
    videoUrl?: string; // Yeni alan eklendi
    exercises: ExerciseTemplate;
  };
  
  type TechnologyTemplate = {
    modules: ModuleTemplate[];
  };
  
  export const courseTemplates: Record<string, TechnologyTemplate> = {
    HTML: {
      modules: [
        {
          title: 'HTML Temel Etiketler',
          content: 'HTML\'in temel yapı taşları olan etiketleri öğrenin.',
          exercises: {
            quiz: {
              question: 'Aşağıdakilerden hangisi bir HTML başlık etiketidir?',
              options: ['<header>', '<heading>', '<h1>', '<title>'],
              correctAnswer: '<h1>'
            },
            dragdrop: {
              question: 'HTML etiketlerini doğru sıraya yerleştirin',
              items: ['<!DOCTYPE html>', '<html>', '<head>', '<body>']
            },
            coding: {
              question: 'Bir paragraf ve başlık içeren HTML kodu yazın',
              testCases: [
                {
                  input: '<h1>Başlık</h1><p>Paragraf</p>',
                  expectedOutput: 'true',
                  description: 'Başlık ve paragraf doğru sırada olmalı'
                }
              ]
            }
          }
        },
        {
          title: 'HTML Formlar',
          content: 'Form elemanlarını ve kullanımlarını öğrenin.',
          exercises: {
            quiz: {
              question: 'Form verilerini sunucuya göndermek için hangi method kullanılır?',
              options: ['GET', 'POST', 'PUT', 'DELETE'],
              correctAnswer: 'POST'
            },
            dragdrop: {
              question: 'Form elemanlarını uygun sıraya yerleştirin',
              items: ['<form>', '<input>', '<label>', '<button>']
            },
            coding: {
              question: 'Email ve şifre alanı içeren bir form oluşturun',
              testCases: [
                {
                  input: '<form><input type="email"><input type="password"></form>',
                  expectedOutput: 'true',
                  description: 'Form email ve şifre alanı içermeli'
                }
              ]
            }
          }
        },
        {
          title: 'HTML5 Yenilikleri',
          content: 'HTML5 ile gelen yeni özellikleri ve etiketleri öğrenin.',
          exercises: {
            quiz: {
              question: 'Hangisi HTML5 ile gelen yeni bir etikettir?',
              options: ['<article>', '<div>', '<span>', '<p>'],
              correctAnswer: '<article>'
            },
            dragdrop: {
              question: 'Semantic etiketleri doğru sıraya yerleştirin',
              items: ['<header>', '<nav>', '<main>', '<footer>']
            },
            coding: {
              question: 'Semantic etiketler kullanarak basit bir sayfa yapısı oluşturun',
              testCases: [
                {
                  input: '<header></header><main></main><footer></footer>',
                  expectedOutput: 'true',
                  description: 'Sayfa header, main ve footer içermeli'
                }
              ]
            }
          }
        }
      ]
    },
    CSS: {
      modules: [
        {
          title: 'CSS Seçiciler',
          content: 'CSS seçicilerini ve kullanım alanlarını öğrenin.',
          exercises: {
            quiz: {
              question: 'Hangi seçici bir ID\'yi hedefler?',
              options: ['.class', '#id', '*', 'element'],
              correctAnswer: '#id'
            },
            dragdrop: {
              question: 'Seçicileri öncelik sırasına göre yerleştirin',
              items: ['#id', '.class', 'element', '*']
            },
            coding: {
              question: 'Verilen HTML elementlerini seçiciler kullanarak stilleyin',
              testCases: [
                {
                  input: '#header { color: red; } .menu { background: blue; }',
                  expectedOutput: 'true',
                  description: 'ID ve class seçicileri doğru kullanılmalı'
                }
              ]
            }
          }
        }
      ]
    },
    JavaScript: {
      modules: [
        {
          title: 'Değişkenler ve Veri Tipleri',
          content: 'JavaScript\'te değişken tanımlama ve veri tiplerini öğrenin.',
          exercises: {
            quiz: {
              question: 'let ve const arasındaki fark nedir?',
              options: [
                'let değiştirilebilir, const değiştirilemez',
                'const daha hızlıdır',
                'let global scope\'ta çalışır',
                'Hiçbir fark yoktur'
              ],
              correctAnswer: 'let değiştirilebilir, const değiştirilemez'
            },
            dragdrop: {
              question: 'Veri tiplerini kategorilerine göre yerleştirin',
              items: ['string', 'number', 'boolean', 'object']
            },
            coding: {
              question: 'Farklı veri tiplerinde değişkenler tanımlayın',
              testCases: [
                {
                  input: 'let name = "John"; const age = 25; const isStudent = true;',
                  expectedOutput: 'true',
                  description: 'String, number ve boolean değişkenler tanımlanmalı'
                }
              ]
            }
          }
        }
      ]
    }
  };