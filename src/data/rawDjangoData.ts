import { StageData } from '../types/roadmap';
import { standardDeepWork } from './roadmapHelpers';
import { lessonOverrides } from './lessonOverrides';

export const rawDjangoDays: Partial<StageData>[] = [
  {
    dayNumber: 1,
    title: 'Python Refresh for Backend',
    shortDescription: 'Class, inheritance va dict - Django orqasidagi asosiy kuchlar',
    longDescription: 'Djangodan foydalanganda biz doimiy ravishda Pythonning obyektga yo\'naltirilgan paradigmalarini ishlatamiz. Bugun backend frameworklarda asqatadigan aynan Python konseptlarini esga olamiz. Masalan: Class, Inheritance (Meros olish), dunder methods (__str__, __init__), kwargs, args va Dictionary manipulatsiyalari.',
    category: 'Foundation & Web Basics',
    islandId: 'django-foundation',
    difficulty: 'Oson',
    todayFocus: "Python OOP asoslari va Data Structures xotirasini yangilash. Djangoning 'sehr'i bu aslida sof Python ekanligini anglash.",
    whyItMatters: "Modellar (Models) bu oddiy Python classlari va ORM relationship bu shunchaki attribute/method. Agar Python classlarini chala bilsangiz, model mantig'ida qiynalasiz.",
    doNotStudyToday: ['Django itself', 'Web HTTP', 'Decorators deep dive', 'Generators'],
    deepWorkPlan: standardDeepWork("Obyektlar va inheritance'ni review qilish", "Dict/Lists manipulyatsiyasi va class methods amaliyoti", "Kichik terminal o'yini yoki library boshqaruv classlarini yasash"),
    tasks: ['OOP class meros olishini takrorlang', 'Custom Exception yasash', '**kwargs, *args ustida kod yozib ko\'rish'],
    exercises: ['Book, Author classlarini yarating va ular orasida bog\'liqlik o\'rnating (Djangodagi Foreign key logikasiga tayyorgarlik).'],
    deliverable: '3 ta class va ularning merosiy aloqalari yozilgan Python fayl.',
    checklist: ['Class attribute va instance variable farqini bilaman', 'super().__init__() nimaligini tushundim'],
    readinessCriteria: ['Hech qanday darslikka qaramasdan obyektga yo\'naltirilgan class yoza olish.'],
    commonMistakes: ['Barcha narsani bitta classga tiqish', 'Methodda self argumentini unutish'],
    ifStuck: 'Katta classlarni buzing. Kichik misollardan (Animal, Dog) boshlab merosni ko\'rib chiqing.',
    terms: [
      { term: 'Inheritance', definition: 'Qaysidir classdagi field va qoidalarni boshqa classga o\'tkazish, meros berish.' },
      { term: 'Dunder methods', definition: 'Ikki tomoni pastki chiziq (underscore) bilan yoziladigan class metdodlari. Masalan __str__' }
    ]
  },
  {
    dayNumber: 2,
    title: 'Virtualenv, Pip, venv & Project Setup',
    shortDescription: 'Muhitlarni izolyatsiya qilish va paketlarni boshqarish.',
    longDescription: 'Backend kodlashdagi 1-qoida: hech qachon global kompyuteringizga kutubxona o\'rnatmang! Faqat virtual environment ichida ishlash shart. Bugun `venv` va `pip` komandalarini o\'rganib, requirements.txt nima ekanligini tushunib olasiz.',
    category: 'Foundation & Web Basics',
    islandId: 'django-foundation',
    difficulty: 'Oson',
    todayFocus: 'Izolyatsiya qilingan muhit qurish, Django o\'rnatish',
    whyItMatters: 'Bir kompyuterda turli Django loyihalaridagi paketlar konflikt qilmasligi va xatosiz ishlashi uchun juda zarur. Production va Development muhitlari farqini anglatadi.',
    doNotStudyToday: ['Docker', 'Pipenv/Poetry alternatives at a deep level', 'Virtual machine'],
    deepWorkPlan: standardDeepWork("Virtual muhit konseptsiyalari bilan ishlash", "requirements.txt fayllari bilan tanishuv", "Muhitlarni ko'tarib yoqib, python paketlarini local muhitda tekshirish"),
    tasks: ['Papka oching, python -m venv .venv qiling', 'env ni faollashtiring', 'pip install django==5.0.0', 'pip freeze > requirements.txt qiling'],
    exercises: ['Bir necha virtual muhitlarda turli xil Django versiyalarini yuklang va ularning requirements.txt larini solishtiring.'],
    deliverable: 'Toza papka ichida .venv va requirements.txt bo\'lgan ishlashga tayyor loyiha muhiti.',
    checklist: ['venv start qila olaman', 'pip freeze qila olaman', 'Global pip va local pip ni farqlayman'],
    readinessCriteria: ['Terminalda faollashgan (venv) yozuvini ko\'ra olish.'],
    commonMistakes: [ '.env va .venv bir xil narsa deb tushunish', 'env papkasini git-ga push qilish (Juda xato)' ],
    ifStuck: 'Windows/Mac terminal pathida qayerda turganingizni pwd yoki dir bilan tekshiring.',
    terms: [
      { term: 'venv', definition: 'Python librarylarini kompyuterga emas, faqat aynan proyekt papkasiga o\'rnatish imkoni.' },
      { term: 'requirements.txt', definition: 'Qurayotgan dasturimiz qanaqa modullarga muhtoj ekanligini e\'lon qilish fayli.' }
    ]
  },
  {
    dayNumber: 3,
    title: 'Django Project & App Architecture',
    shortDescription: 'Project vs App nima? Startproject va startapp',
    longDescription: 'Bugun siz birinchi marta django-admin komandasi orqali loyihani oyoqqa turg\'izasiz. Django logikasi bitta emas 2 ta papka ochadi (project papka va app papka). Shular orasidagi funksional arxitekturani tushunamiz.',
    category: 'Django Backend Fundamentals',
    islandId: 'django-backend-funds',
    difficulty: 'O\'rtacha',
    todayFocus: 'Project structureni anglash, settings.py da ro\'yxatdan o\'tkazish',
    whyItMatters: 'Keyinchalik katta loyihalar 30-40+ tacha applardan o\'tishi mumkin, ularning logikasini alohidalashni boshidanoq to\'g\'ri tushunish shart.',
    doNotStudyToday: ['Templates folder', 'Static files serving', 'Jinja2'],
    deepWorkPlan: standardDeepWork("Project/App pattern farqi", "settings.py dagi core configuration bloklari", "3 ta app yaratib, ularni INSTALLED_APPS ga qo'shish"),
    tasks: ['django-admin startproject config .', 'python manage.py startapp users', 'python manage.py startapp posts', 'settings.py ga qo\'shish'],
    exercises: ['Faqat fayllar strukturasini (manage.py qayerda joylashgani, app papkasida nimalar borligini) ko\'rib chiqing. HTML/Templates qidirmang!'],
    deliverable: 'Ishlayotgan va manage.py runserver orqali xatosiz ulanadigan strukturali Django arxitekturasi.',
    checklist: ['startapp ishlatdim', 'settingsda ro\'yxatdan o\'tkazdim', 'No module named xato chiqmadi'],
    readinessCriteria: ['Localhost 8000 da ishga tushirish (ammo HTML yozmasdan, u default django sayt chiqadi).'],
    commonMistakes: ['app papkasini project tashqarisiga ochish', 'app yaratib settings.py ga yozish esdan chiqishi'],
    ifStuck: 'Terminal katalogingizda manage.py yonida turibsizmi tekshiring.',
    terms: [
      { term: 'Project', definition: 'Butun tizim uchun configuration va umumlashtiruvchi papka (settings.py, urls.py asosiylar)' },
      { term: 'App', definition: 'Proyekt ichidagi ayni bitta kichik, alohida maqsad uchun xizmat qiladigan modul (masalan, users, blog, payments).' }
    ]
  },
  {
    dayNumber: 4,
    title: 'Settings.py & Environment Configs',
    shortDescription: 'Backend yuragi bo\'lmish configuration boshqaruvi',
    longDescription: 'Loyiha sozlamalari (settings.py) juda uzun va uni hammasini birdan o\'rganish hozircha kerak emas. Bugun eng asosiy backend qismlari: ALLOWED_HOSTS, SECRET_KEY, DEBUG, DATABASES bilan ishlashni va environment keys (.env) ishlatishni o\'rganasiz.',
    category: 'Django Backend Fundamentals',
    islandId: 'django-backend-funds',
    difficulty: 'O\'rtacha',
    todayFocus: '.env fileda maxfiy kodlarni yashirish va DEBUG rejimini ajratish.',
    whyItMatters: 'Source codega API kalitlari yoki Database parolini ochiq yozish bu eng katta xavfsizlik xatosidir. Shu yerdanoq uni oldini olamiz!',
    doNotStudyToday: ['Media/Static settings (hozirga kerak emas)', 'Email settings', 'Channel settings'],
    deepWorkPlan: standardDeepWork("Muhit (Environment) konfiguratsiyalari nima", "environ library orqali settingsni o'qish", "Loyihani local env-ga o'tkazish"),
    tasks: ['pip install python-dotenv yoki django-environ', '.env fayl ochib, unga DEBUG=True yozish', 'settings ichidan secret keyni o\'chirib, uni .env dan chaqirish', '.gitignore fayliga .env qo\'shib qo\'yish'],
    exercises: ['GitHub uchun qanday fayllarni saqlash mumkin yoki mumkin emasligini bilishingizni tasdiqlang'],
    deliverable: '.env configuration bilan himoyalangan va parse qilingan settings.py fayl.',
    checklist: ['SECRET_KEY endi string qilib hard-code qilinmagan'],
    readinessCriteria: ['.env ni o\'zgartirganda settings o\'zgara olishi (runserver orqali tekshirish).'],
    commonMistakes: ['.env faylini github-ga push qilib yuborish!!!'],
    ifStuck: 'environ load_dotenv ishlatilishiga e\'tibor bering.',
    lesson: {
      summary: "Bugun settings.py ni environment orqali boshqarishni to'liq sozlaysiz: SECRET_KEY, DEBUG va ALLOWED_HOSTS. Natijada maxfiy ma'lumotlar koddan ajraladi va prod/dev rejimi aniq bo'ladi.",
      goals: [
        "SECRET_KEY va DEBUG ni .env orqali boshqarish",
        "ALLOWED_HOSTS ni env listga aylantirish",
        ".env faylini gitdan yashirish va tekshirish"
      ],
      sections: [
        {
          title: "1-qadam: django-environ o'rnatish",
          body: [
            "Oddiy settings ichida env o'qish uchun django-environ eng qulay variant.",
            "Virtual muhit faolligini tekshirib keyin o'rnating."
          ],
          codeSamples: [
            { title: "Kutubxona o'rnatish", language: 'bash', code: 'pip install django-environ' }
          ]
        },
        {
          title: "2-qadam: .env faylini yaratish",
          body: [
            "Loyiha rootida (manage.py turgan papkada) .env oching.",
            "Kalitlar oddiy KEY=VALUE ko'rinishida yoziladi."
          ],
          codeSamples: [
            { title: ".env namunasi", language: 'env', code: "DEBUG=True\nSECRET_KEY=django-insecure-change-me\nALLOWED_HOSTS=localhost,127.0.0.1" }
          ]
        },
        {
          title: "3-qadam: settings.py da env o'qish",
          body: [
            "settings.py tepasida env obyektini yarating va .env faylni o'qing.",
            "Keyin SECRET_KEY, DEBUG, ALLOWED_HOSTS ni env orqali oling."
          ],
          codeSamples: [
            {
              title: 'settings.py',
              language: 'python',
              code: "from pathlib import Path\nimport environ\n\nBASE_DIR = Path(__file__).resolve().parent.parent\n\nenv = environ.Env(\n    DEBUG=(bool, False)\n)\nenviron.Env.read_env(BASE_DIR / '.env')\n\nSECRET_KEY = env('SECRET_KEY')\nDEBUG = env('DEBUG')\nALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['127.0.0.1', 'localhost'])"
            }
          ]
        },
        {
          title: "4-qadam: SECRET_KEY generatsiya qilish",
          body: [
            "Djangoning built-in utili orqali xavfsiz kalit generatsiya qiling.",
            "Chiqqan kalitni .env ga joylashtiring va hech qachon gitga qo'shmang."
          ],
          codeSamples: [
            {
              title: 'Secret key yaratish',
              language: 'bash',
              code: 'python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"'
            }
          ]
        },
        {
          title: "5-qadam: .gitignore va tekshirish",
          body: [
            ".env faylni gitdan yashiring, keyin DEBUG ni o'zgartirib serverni tekshiring."
          ],
          steps: [
            ".gitignore ichiga .env yozing.",
            ".env da DEBUG=True qilib runserver ishga tushiring.",
            "DEBUG=False qilib qayta ishga tushiring: error sahifalari chiqqanini ko'rasiz."
          ],
          codeSamples: [
            { title: '.gitignore', language: 'text', code: '.env\n.env.*' }
          ]
        }
      ],
      tips: [
        "Productionda DEBUG=False bo'lishi shart.",
        "Har muhit (local, staging, prod) uchun alohida SECRET_KEY ishlating.",
        "ALLOWED_HOSTS ni domenlar bilan to'ldirib boring."
      ]
    },
    terms: [
      { term: 'Environment variable (.env)', definition: 'Dasturdan tashqaridagi operatsion sistemadagi yoki bash dagi vaqtinchalik o\'zgaruvchilar. Shu orqali maxfiy valuelar yashiriladi.' },
      { term: 'SECRET_KEY', definition: 'Django shifrlashdagi eng asosiy hashing kaliti. U ochiq qolsa session / db xavf ostida qoladi.' }
    ]
  },
  {
    dayNumber: 5,
    title: 'Requests, Responses & URLs dispatcher',
    shortDescription: 'Frontend bn ma\'lumot muloqoti & endpoints',
    longDescription: 'HTML render qilmaymiz dedik! Endi urls.py va views.py lar faqat JsonResponse qaytaradi. Server shunchaki Json object yuboruvchi mashina ekanini anglaysiz va request lifecycle-ni ko\'rasiz.',
    category: 'Django Backend Fundamentals',
    islandId: 'django-backend-funds',
    difficulty: 'O\'rtacha',
    todayFocus: 'URL parametrlar (kwarglar) ni tutib olib, JSON qaytarish',
    whyItMatters: 'API qurishning markaziy mantiqi ushbu request -> url -> view -> JsonResponse sikli sanaladi.',
    doNotStudyToday: ['Render() function yozmang', 'TemplateContext ishlatmang'],
    deepWorkPlan: standardDeepWork("URL include, Regex urls vs Path urls", "Request obyekti nima saqlaydi (ip, body, headers)", "Postman/Browserda yozgan APIlarga json so'rov berish"),
    tasks: ['Birinchi app urls.py oching va ularni main ga include() qiling', 'Views.py da 2 function yozib JsonResponse({"message":"hi"}) ishlating.', 'Path ichidan user_id tutish ("users/<int:user_id>/")'],
    exercises: ['Id parametrga olinib, xuddi shu id-ni JSON ichida javob qaytaring.'],
    deliverable: 'Djangodan HTML emas JSON formatida javob beradigan 2 ta url endpoint APIsi.',
    checklist: ['include()', 'JsonResponse qaytardi', '<int:id> parametri tutildi'],
    readinessCriteria: ['Localhost\'ning biron urliga kirganda matn emas, struktura qilingan JSON ko\'rinishi.'],
    commonMistakes: ['path oxiriga slash "/" ni qo\'ymaslik (Django default redirect bilan chalkashadi)'],
    ifStuck: 'Django documentation URL dispatcher bo\'limiga qarang',
    lesson: {
      summary: "Bugun request -> url -> view -> response zanjiri qanday ishlashini aniq ko'rasiz. URL routing, path parametrlari, query parametrlar va JsonResponse bilan ishlashni amalda bog'lab chiqamiz.",
      goals: [
        "URL dispatcher qanday ishlashini mental model qilib olish",
        "Path va query parametrlarni ajratish",
        "JSON response va status code bilan ishlash"
      ],
      sections: [
        {
          title: "01. Request lifecycle mental modeli",
          body: [
            "Brauzer yoki Postman yuborgan request URL dispatcher orqali viewga tushadi.",
            "View response qaytaradi va Django uni HTTP responsega aylantiradi."
          ],
          codeSamples: [
            {
              title: "Eng sodda view",
              language: "python",
              code: "from django.http import JsonResponse\n\ndef ping(request):\n    return JsonResponse({\"status\": \"ok\"})"
            }
          ]
        },
        {
          title: "02. Project urls.py va include",
          body: [
            "Project urls.py faqat umumiy router bo'ladi, app urls ichiga yo'naltiradi.",
            "Katta loyihalarda barcha endpointlar app urls.py ichida turadi."
          ],
          codeSamples: [
            {
              title: "config/urls.py",
              language: "python",
              code: "from django.contrib import admin\nfrom django.urls import path, include\n\nurlpatterns = [\n    path(\"admin/\", admin.site.urls),\n    path(\"api/\", include(\"blog.urls\")),\n]"
            }
          ]
        },
        {
          title: "03. App urls.py va path",
          body: [
            "App urls.py ichida aniq endpointlar yoziladi.",
            "Path ichida view funksiyani ko'rsatamiz."
          ],
          codeSamples: [
            {
              title: "blog/urls.py",
              language: "python",
              code: "from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path(\"ping/\", views.ping, name=\"ping\"),\n]"
            }
          ]
        },
        {
          title: "04. Path converter va kwargs",
          body: [
            "URL ichidan id yoki slug kabi qiymatlarni olish uchun converter ishlatiladi.",
            "View ichida u kwargs sifatida keladi."
          ],
          codeSamples: [
            {
              title: "Path parametri",
              language: "python",
              code: "path(\"posts/<int:post_id>/\", views.post_detail)\n\n# view\n\ndef post_detail(request, post_id):\n    return JsonResponse({\"post_id\": post_id})"
            }
          ]
        },
        {
          title: "05. Query parametrlari",
          body: [
            "Query params URL oxirida ?key=value bo'ladi.",
            "Django request.GET orqali ularni oladi."
          ],
          codeSamples: [
            {
              title: "request.GET",
              language: "python",
              code: "def search(request):\n    q = request.GET.get(\"q\", \"\")\n    return JsonResponse({\"query\": q})"
            }
          ]
        },
        {
          title: "06. JsonResponse va status code",
          body: [
            "API uchun JsonResponse ishlatiladi.",
            "Status code bilan muvaffaqiyat yoki xatoni aniq ko'rsatamiz."
          ],
          codeSamples: [
            {
              title: "status=201",
              language: "python",
              code: "def create_ok(request):\n    return JsonResponse({\"created\": True}, status=201)"
            }
          ]
        },
        {
          title: "07. Request method tekshirish",
          body: [
            "GET va POST ni bitta viewda ajratish mumkin.",
            "Har bir method uchun alohida logika yoziladi."
          ],
          codeSamples: [
            {
              title: "method branching",
              language: "python",
              code: "def example(request):\n    if request.method == \"GET\":\n        return JsonResponse({\"method\": \"GET\"})\n    if request.method == \"POST\":\n        return JsonResponse({\"method\": \"POST\"})\n    return JsonResponse({\"error\": \"Method not allowed\"}, status=405)"
            }
          ]
        },
        {
          title: "08. JSON body o'qish",
          body: [
            "Postman JSON yuborganda request.body ichida keladi.",
            "Uni json.loads orqali dictga aylantiramiz."
          ],
          codeSamples: [
            {
              title: "request.body -> dict",
              language: "python",
              code: "import json\n\ndef create_post(request):\n    payload = json.loads(request.body or \"{}\")\n    return JsonResponse({\"title\": payload.get(\"title\")})"
            }
          ]
        },
        {
          title: "09. List va detail endpointlar",
          body: [
            "Minimal API ikki endpointdan boshlanadi: list va detail.",
            "List barcha elementlar, detail esa bitta element."
          ],
          codeSamples: [
            {
              title: "List + detail",
              language: "python",
              code: "POSTS = [{\"id\": 1, \"title\": \"Hello\"}, {\"id\": 2, \"title\": \"World\"}]\n\ndef post_list(request):\n    return JsonResponse({\"items\": POSTS})\n\ndef post_detail(request, post_id):\n    post = next((p for p in POSTS if p[\"id\"] == post_id), None)\n    return JsonResponse({\"item\": post})"
            }
          ]
        },
        {
          title: "10. Test qilish (curl)",
          body: [
            "Endpointni tez tekshirish uchun curl ishlatish oson.",
            "Bu sizga Postmansiz ham test imkonini beradi."
          ],
          codeSamples: [
            {
              title: "curl test",
              language: "bash",
              code: "curl http://127.0.0.1:8000/api/ping/\ncurl \"http://127.0.0.1:8000/api/search/?q=django\""
            }
          ]
        }
      ],
      tips: [
        "URL yozishda doim slash / ni unutmaslikka odatlaning.",
        "JsonResponse ichida dict yoki list qaytaring.",
        "Status code lar API contractning bir qismi."
      ]
    },
    terms: [
      { term: 'JsonResponse', definition: 'View ishlashi yakunlangach, ma\'lumotni HTTP orqali application/json content-type bilan response qaytaruvchi klass.' },
      { term: 'Endpoint', definition: 'Ma\'lumot so\'rab tushiladigan URL manzili(masalan, api/v1/users/)' }
    ]
  },
  {
    dayNumber: 6,
    title: 'Intro to DB (PostgreSQL) Basics & Django Models',
    shortDescription: 'SQL Bazasi va Pyhton klass modeli ekvivalentligi',
    longDescription: 'Backendning asl maqsadi ma\'lumot saqlash va o\'qishdir. Django o\'zining ichki SQLite\'ida ishlaydi, ammo bugun biz haqiqiy Database ulashni (psycopg2 orqali PostgreSQL ni) o\'tamiz. Keyin ortidan 1-chi modelni yaratamiz.',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: 'Postgre databasega ulanish, Charfield & DateTime fields yozish.',
    whyItMatters: 'Professional backendchi sqlite bilan emas PostgreSQL bilan ishlaydi. Modellar bizni xom SQL yozishdan qutqaradi.',
    doNotStudyToday: ['ManyToManyField murakkabliklari', 'Custom query builder', 'Raw SQL logikasi'],
    deepWorkPlan: standardDeepWork("PostgreSQL va Django o'rtasidagi bogliqlik nima?", "psycopg2 install qilish va settings-da db ulash", "Simple Blog Post modelni models.py da yozish (HTML renderlarsiz)"),
    tasks: ['Dockerda yoki local kompyuterda PostgreSQL ni ishga tushiring', 'pip install psycopg2-binary', 'settings DATABASES ichiga postgres user, pass va localhost yozing.', 'apps/models.py da title, contenti bor Product classi yarating.'],
    exercises: ['DATABASE hostni moslashtirib, manage.py ni yurgazsangiz xatosiz ishga tushishi kerak'],
    deliverable: 'SQLite ni unutib, haqiqiy ma\'lumotlar bazasi (PostgreSQL) bilan ulangan loyiha',
    checklist: ['psycopg2 ishlayapti', 'Django model klassi `models.Model` dan inherit olib yasaldi.'],
    readinessCriteria: ['Xatosiz baza bilan sinxronizatsiya imkoniyati borligi'],
    commonMistakes: ['PostgreSQL servis run bo\'lmasligi oqibatida db connection refused xatosi'],
    ifStuck: 'Settingsdagi DATABASES ni to\'g\'ri postgres ga o\'tkazilganligini tekshiring',
    lesson: {
      summary: "Bugun Django model - bu DB table degan mental modelni chuqur quramiz. PostgreSQL ulash, model fieldlari, default/nullable, indexlar va Meta options bilan real backend bazani to'g'ri sozlashni o'rganasiz.",
      goals: [
        "Django model va DB table orasidagi bog'lanishni anglash",
        "PostgreSQL ga ulanishni sozlash",
        "Fieldlar, constraints va indexlar bilan to'g'ri model yozish"
      ],
      sections: [
        {
          title: "01. Model = Table mental modeli",
          body: [
            "Django modeli - bu DB table ning python classdagi ko'rinishi.",
            "Har bir field - ustun (column), har bir object - qator (row)."
          ],
          codeSamples: [
            {
              title: "Eng sodda model",
              language: "python",
              code: "from django.db import models\n\nclass Category(models.Model):\n    name = models.CharField(max_length=120)"
            }
          ]
        },
        {
          title: "02. PostgreSQL user va database yaratish",
          body: [
            "Postgresda alohida user va database yaratish tavsiya qilinadi.",
            "Bu production uchun toza ajratish beradi."
          ],
          codeSamples: [
            {
              title: "psql ichida",
              language: "sql",
              code: "CREATE USER django_user WITH PASSWORD 'secret';\nCREATE DATABASE django_db OWNER django_user;"
            }
          ]
        },
        {
          title: "03. Psycopg2 ni o'rnatish",
          body: [
            "Django Postgresga ulanishi uchun psycopg2 kerak.",
            "Binary versiyasi local uchun qulay."
          ],
          codeSamples: [
            {
              title: "pip install",
              language: "bash",
              code: "pip install psycopg2-binary"
            }
          ]
        },
        {
          title: "04. DATABASES sozlamasi",
          body: [
            "settings.py ichida DATABASES Postgresga yo'naltiriladi.",
            "ENGINE, NAME, USER, PASSWORD, HOST, PORT majburiy."
          ],
          codeSamples: [
            {
              title: "settings.py",
              language: "python",
              code: "DATABASES = {\n    \"default\": {\n        \"ENGINE\": \"django.db.backends.postgresql\",\n        \"NAME\": \"django_db\",\n        \"USER\": \"django_user\",\n        \"PASSWORD\": \"secret\",\n        \"HOST\": \"127.0.0.1\",\n        \"PORT\": \"5432\",\n    }\n}"
            }
          ]
        },
        {
          title: "05. DB konfiguratsiyani env orqali boshqarish",
          body: [
            "DATABASES qiymatlarini .env ga olib chiqish xavfsizroq.",
            "Bu prod/dev muhitlarni ajratishga yordam beradi."
          ],
          codeSamples: [
            {
              title: ".env namunasi",
              language: "env",
              code: "DB_NAME=django_db\nDB_USER=django_user\nDB_PASSWORD=secret\nDB_HOST=127.0.0.1\nDB_PORT=5432"
            }
          ]
        },
        {
          title: "06. Env dan DATABASES o'qish",
          body: [
            "django-environ bilan env qiymatlarni oson o'qiysiz.",
            "Bu konfiguratsiya kodni tartibli qiladi."
          ],
          codeSamples: [
            {
              title: "settings.py env",
              language: "python",
              code: "DATABASES = {\n    \"default\": {\n        \"ENGINE\": \"django.db.backends.postgresql\",\n        \"NAME\": env(\"DB_NAME\"),\n        \"USER\": env(\"DB_USER\"),\n        \"PASSWORD\": env(\"DB_PASSWORD\"),\n        \"HOST\": env(\"DB_HOST\"),\n        \"PORT\": env(\"DB_PORT\"),\n    }\n}"
            }
          ]
        },
        {
          title: "07. Model yozishning minimal shabloni",
          body: [
            "Model class doim models.Model dan meros oladi.",
            "Fieldlar class ichida e'lon qilinadi."
          ],
          codeSamples: [
            {
              title: "Product modeli",
              language: "python",
              code: "class Product(models.Model):\n    title = models.CharField(max_length=200)\n    price = models.IntegerField()"
            }
          ]
        },
        {
          title: "08. Field turlari",
          body: [
            "CharField - qisqa matn, TextField - uzun matn.",
            "IntegerField, BooleanField, DateTimeField kabi turlar ko'p ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Turli fieldlar",
              language: "python",
              code: "class Article(models.Model):\n    title = models.CharField(max_length=255)\n    body = models.TextField()\n    is_public = models.BooleanField(default=True)"
            }
          ]
        },
        {
          title: "09. Primary key va AutoField",
          body: [
            "Django avtomatik id yaratadi.",
            "Agar kerak bo'lsa, o'zingiz primary key berishingiz mumkin."
          ],
          codeSamples: [
            {
              title: "Custom pk",
              language: "python",
              code: "class City(models.Model):\n    code = models.CharField(max_length=3, primary_key=True)\n    name = models.CharField(max_length=120)"
            }
          ]
        },
        {
          title: "10. max_length va validatsiya",
          body: [
            "CharField da max_length majburiy.",
            "Bu DB schema va validationga ta'sir qiladi."
          ],
          codeSamples: [
            {
              title: "max_length",
              language: "python",
              code: "class Tag(models.Model):\n    label = models.CharField(max_length=50)"
            }
          ]
        },
        {
          title: "11. DateTime fieldlari",
          body: [
            "auto_now_add - birinchi yaratishda vaqt qo'yadi.",
            "auto_now - har save bo'lganda yangilanadi."
          ],
          codeSamples: [
            {
              title: "created_at / updated_at",
              language: "python",
              code: "class Order(models.Model):\n    created_at = models.DateTimeField(auto_now_add=True)\n    updated_at = models.DateTimeField(auto_now=True)"
            }
          ]
        },
        {
          title: "12. null va blank farqi",
          body: [
            "null DB darajasida bo'sh qiymatga ruxsat beradi.",
            "blank forma validation uchun ishlaydi."
          ],
          codeSamples: [
            {
              title: "Optional field",
              language: "python",
              code: "class Profile(models.Model):\n    bio = models.TextField(null=True, blank=True)"
            }
          ]
        },
        {
          title: "13. Default qiymatlar",
          body: [
            "Default qiymat bo'lsa, eski recordlar ham xatosiz saqlanadi.",
            "Default funktsiya ham bo'lishi mumkin."
          ],
          codeSamples: [
            {
              title: "Default",
              language: "python",
              code: "class Invoice(models.Model):\n    status = models.CharField(max_length=20, default=\"new\")"
            }
          ]
        },
        {
          title: "14. Choices ishlatish",
          body: [
            "Choices fieldni qat'iy variantlarga cheklaydi.",
            "Bu business qoidalarni DBga yaqinlashtiradi."
          ],
          codeSamples: [
            {
              title: "Choices",
              language: "python",
              code: "class Payment(models.Model):\n    STATUS = [\n        (\"pending\", \"Pending\"),\n        (\"paid\", \"Paid\"),\n    ]\n    status = models.CharField(max_length=20, choices=STATUS)"
            }
          ]
        },
        {
          title: "15. db_index va tezkor qidiruv",
          body: [
            "Tez-tez filter qilinadigan fieldga db_index qo'ying.",
            "Bu SELECT so'rovlarni tezlashtiradi."
          ],
          codeSamples: [
            {
              title: "db_index",
              language: "python",
              code: "class Customer(models.Model):\n    email = models.EmailField(db_index=True)"
            }
          ]
        },
        {
          title: "16. Unique constraint",
          body: [
            "Unique - bir xil qiymatni takrorlashga ruxsat bermaydi.",
            "Bu ma'lumot tozaligini saqlaydi."
          ],
          codeSamples: [
            {
              title: "unique",
              language: "python",
              code: "class UserProfile(models.Model):\n    phone = models.CharField(max_length=20, unique=True)"
            }
          ]
        },
        {
          title: "17. __str__ va admin ko'rinishi",
          body: [
            "__str__ Django admin va shellda o'qilishi oson name beradi.",
            "Bu debuggingni yengillashtiradi."
          ],
          codeSamples: [
            {
              title: "__str__",
              language: "python",
              code: "class Category(models.Model):\n    name = models.CharField(max_length=120)\n\n    def __str__(self):\n        return self.name"
            }
          ]
        },
        {
          title: "18. Meta options",
          body: [
            "Meta ichida ordering, db_table kabi sozlamalar bor.",
            "Bu table nomini va default tartibini belgilaydi."
          ],
          codeSamples: [
            {
              title: "Meta",
              language: "python",
              code: "class Product(models.Model):\n    title = models.CharField(max_length=200)\n    price = models.IntegerField()\n\n    class Meta:\n        db_table = \"products\"\n        ordering = [\"-id\"]"
            }
          ]
        },
        {
          title: "19. Migration yaratish va bazaga yozish",
          body: [
            "Model yozilgach makemigrations va migrate ketadi.",
            "Bu DB schema ni real yaratadi."
          ],
          codeSamples: [
            {
              title: "Migration",
              language: "bash",
              code: "python manage.py makemigrations\npython manage.py migrate"
            }
          ]
        },
        {
          title: "20. DB shell va schema tekshirish",
          body: [
            "dbshell orqali to'g'ridan-to'g'ri SQL ko'rish mumkin.",
            "Bu real jadval yaratilganini tekshiradi."
          ],
          codeSamples: [
            {
              title: "dbshell",
              language: "bash",
              code: "python manage.py dbshell\n\\dt\n\\d products"
            }
          ]
        }
      ],
      tips: [
        "Fieldlar nomini boshidan to'g'ri tanlang, keyin rename migration qiyin bo'ladi.",
        "Productionda DB credential lar faqat env orqali bo'lsin.",
        "Model - bu faqat schema emas, u biznes qoidalarni ham ko'taradi."
      ]
    },
    terms: [
      { term: 'PostgreSQL', definition: 'Dunyodagi eng ilg\'or va Django bilan eng zo\'r ishlaydigan opensource relatsion database sistemasi.' },
      { term: 'models.Model', definition: 'Har bir django model jadvali asos qilib oladigan base classi. Bu bitta DB tablega aylanadi.' }
    ]
  },
  {
    dayNumber: 7,
    title: 'Migrations Workflow (makemigrations vs migrate)',
    shortDescription: 'Baza sxemasiga kod orqali o\'zgarishlar kiritish',
    longDescription: 'Siz python kodida class va field yozganingiz bilan DB da table o\'zidan o\'zi yaralib qolmaydi! Oraliqda Migration fayli degan "versiyalanish" va tarjima mexanizmi ishlashi kerak. Shu backenddagi eng muhim narsa bugungi darsimiz.',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Oson',
    todayFocus: 'Migration history qanday ishlari va rollback (orqaga o\'tish)',
    whyItMatters: 'Team da ishlayotganingizda siz qo\'shgan column-ni boshqa dasturchilar ham o\'z bazasiga qo\'shishiga ushbu migration fayllar yordam beradi.',
    doNotStudyToday: ['Data migration\'lar murakkabliklari', 'squashmigrations'],
    deepWorkPlan: standardDeepWork("Migration\'lar qanday va nima uchun generatsiya qilinadi", "Field nomi o\'zgartirilishini test qilish va migrate qilish", "Fayllardagi DB logikasini ko'zdan kechirib chiqish"),
    tasks: ['python manage.py makemigrations', 'migratsion fayl 0001_initial\'ni ochib ko\'ring, ichidagi SQLga tayyorgarlikni tushuning', 'python manage.py migrate komandasini ishlating'],
    exercises: ['Bazada jadvalda id avtomatik qoshilib qolganini psql(terminal) orqali koring'],
    deliverable: 'Muvaffaqiyatli migration\'lar yaratib, bazada Table paydo qila olish',
    checklist: ['makemigrations komandasi qanday ishlashini bilish', 'migrate amalini tushunib yetish'],
    readinessCriteria: ['PG admin yoki DBeaver orqali bazaga kirib table\'ni ko\'rish'],
    commonMistakes: ['migration fayllarni gitdan o\'chirib yuborish va commitga qo\'shmaslik (BULAR GIT GA PUSH BULISHI SHART!)'],
    ifStuck: 'Agar migration xatolik kelsa "migrate <appnomi> zero" ga rollback qilib boshidan boshlang.',
    lesson: {
      summary: "Migration - bu koddagi model o'zgarishini DBga tarjima qiluvchi versiya tarixidir. Bugun migration yaratish, ko'rish, SQLga aylantirish, rollback va data migrationlarni amalda tushunasiz.",
      goals: [
        "Migration fayllari qanday ishlashini tushunish",
        "Schema o'zgarishlarni xavfsiz yozish",
        "Rollback va data migrationlar bilan ishlash"
      ],
      sections: [
        {
          title: "01. Migration nima va nima uchun kerak",
          body: [
            "Modeldagi o'zgarishlar avtomatik DBga tushmaydi.",
            "Migration - bu o'zgarishlar tarixini saqlaydigan versioning tizimi."
          ],
          codeSamples: [
            {
              title: "Migration papkasi",
              language: "text",
              code: "blog/\n  migrations/\n    0001_initial.py\n    0002_add_price.py"
            }
          ]
        },
        {
          title: "02. makemigrations",
          body: [
            "makemigrations model o'zgarishini faylga yozadi.",
            "U DBga o'zgartirish kiritmaydi."
          ],
          codeSamples: [
            {
              title: "makemigrations",
              language: "bash",
              code: "python manage.py makemigrations"
            }
          ]
        },
        {
          title: "03. migrate",
          body: [
            "migrate migration fayllarni real DBga qo'llaydi.",
            "Bu amalda table va column yaratadi."
          ],
          codeSamples: [
            {
              title: "migrate",
              language: "bash",
              code: "python manage.py migrate"
            }
          ]
        },
        {
          title: "04. showmigrations",
          body: [
            "Qaysi migrationlar apply bo'lganini ko'rish uchun showmigrations.",
            "X belgisi bajarilganini bildiradi."
          ],
          codeSamples: [
            {
              title: "showmigrations",
              language: "bash",
              code: "python manage.py showmigrations"
            }
          ]
        },
        {
          title: "05. sqlmigrate",
          body: [
            "Migration qanday SQL yozayotganini ko'rish mumkin.",
            "Bu DB tushunchasini mustahkamlaydi."
          ],
          codeSamples: [
            {
              title: "sqlmigrate",
              language: "bash",
              code: "python manage.py sqlmigrate blog 0001"
            }
          ]
        },
        {
          title: "06. Migration fayl ichki tuzilishi",
          body: [
            "Migration fayli dependencies va operations listidan iborat.",
            "Operations ichida CreateModel, AddField va boshqalar bo'ladi."
          ],
          codeSamples: [
            {
              title: "0001_initial.py",
              language: "python",
              code: "class Migration(migrations.Migration):\n    dependencies = []\n\n    operations = [\n        migrations.CreateModel(\n            name=\"Post\",\n            fields=[(\"id\", models.BigAutoField(primary_key=True)), (\"title\", models.CharField(max_length=200))],\n        ),\n    ]"
            }
          ]
        },
        {
          title: "07. Yangi field qo'shish",
          body: [
            "Yangi field qo'shsangiz migration yaratiladi.",
            "Agar field null bo'lmasa, default kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "AddField",
              language: "python",
              code: "class Post(models.Model):\n    title = models.CharField(max_length=200)\n    views = models.IntegerField(default=0)"
            }
          ]
        },
        {
          title: "08. null va default muammosi",
          body: [
            "Mavjud data bo'lsa, null bo'lmagan field qo'shishda default so'raladi.",
            "Default bermasangiz migrate xato beradi."
          ],
          codeSamples: [
            {
              title: "Default berish",
              language: "python",
              code: "class Post(models.Model):\n    rating = models.IntegerField(default=5)"
            }
          ]
        },
        {
          title: "09. Field rename",
          body: [
            "Field nomini o'zgartirish RenameField bilan bo'ladi.",
            "Bu data yo'qotmasdan rename qiladi."
          ],
          codeSamples: [
            {
              title: "RenameField",
              language: "python",
              code: "operations = [\n    migrations.RenameField(\n        model_name=\"post\",\n        old_name=\"title\",\n        new_name=\"headline\",\n    )\n]"
            }
          ]
        },
        {
          title: "10. Model rename",
          body: [
            "Model nomi o'zgarsa, RenameModel ishlatish kerak.",
            "Bu table rename bilan teng."
          ],
          codeSamples: [
            {
              title: "RenameModel",
              language: "python",
              code: "operations = [\n    migrations.RenameModel(old_name=\"Post\", new_name=\"Article\")\n]"
            }
          ]
        },
        {
          title: "11. Data migration (RunPython)",
          body: [
            "Schema o'zgarishdan tashqari data ko'chirish ham kerak bo'ladi.",
            "RunPython bilan data migratsiya yoziladi."
          ],
          codeSamples: [
            {
              title: "RunPython",
              language: "python",
              code: "def fill_slug(apps, schema_editor):\n    Post = apps.get_model(\"blog\", \"Post\")\n    for post in Post.objects.all():\n        post.slug = post.title.lower().replace(\" \", \"-\")\n        post.save()\n\noperations = [migrations.RunPython(fill_slug)]"
            }
          ]
        },
        {
          title: "12. Belgilangan migrationgacha migrate",
          body: [
            "Migrate ni aniq migration nomiga olib borish mumkin.",
            "Bu rollback yoki tekshiruv uchun kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "Target migrate",
              language: "bash",
              code: "python manage.py migrate blog 0003"
            }
          ]
        },
        {
          title: "13. Rollback to zero",
          body: [
            "Appdagi barcha migratsiyalarni orqaga qaytarish mumkin.",
            "Bu bazani tozalash uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "migrate zero",
              language: "bash",
              code: "python manage.py migrate blog zero"
            }
          ]
        },
        {
          title: "14. --fake migrate",
          body: [
            "Ba'zida DBda o'zgarish bor, lekin migration apply emas.",
            "--fake migrationni bajarilgan deb belgilaydi."
          ],
          codeSamples: [
            {
              title: "fake migrate",
              language: "bash",
              code: "python manage.py migrate blog 0002 --fake"
            }
          ]
        },
        {
          title: "15. Multiple app dependency",
          body: [
            "Bir app ikkinchi appga bog'liq bo'lsa dependency bo'ladi.",
            "Migrationda dependency listga yoziladi."
          ],
          codeSamples: [
            {
              title: "dependencies",
              language: "python",
              code: "dependencies = [(\"users\", \"0002_userprofile\")]"
            }
          ]
        },
        {
          title: "16. Bo'sh migration",
          body: [
            "Ba'zan qo'lda operatsiya yozish uchun empty migration kerak.",
            "Bu sizga custom SQL yoki RunPython yozish beradi."
          ],
          codeSamples: [
            {
              title: "empty migration",
              language: "bash",
              code: "python manage.py makemigrations blog --empty -n custom_fix"
            }
          ]
        },
        {
          title: "17. migrate --plan",
          body: [
            "Qaysi migrationlar ketma-ket ishlashini oldindan ko'rish.",
            "Productionda xavfsiz tekshiruv."
          ],
          codeSamples: [
            {
              title: "migration plan",
              language: "bash",
              code: "python manage.py migrate --plan"
            }
          ]
        },
        {
          title: "18. django_migrations jadvali",
          body: [
            "Django bajarilgan migrationlarni DBda saqlaydi.",
            "Bu jadvalni ko'rib tekshirish mumkin."
          ],
          codeSamples: [
            {
              title: "SQL",
              language: "sql",
              code: "SELECT app, name, applied FROM django_migrations ORDER BY applied DESC;"
            }
          ]
        },
        {
          title: "19. Squash migrations",
          body: [
            "Ko'p migrationlar yigilganda squash qilish tavsiya.",
            "Bu tarixni bitta migrationga qisqartiradi."
          ],
          codeSamples: [
            {
              title: "squashmigrations",
              language: "bash",
              code: "python manage.py squashmigrations blog 0001 0010"
            }
          ]
        },
        {
          title: "20. Merge conflicts",
          body: [
            "Team ishlaganda parallel migratsiyalar to'qnashishi mumkin.",
            "makemigrations --merge bilan hal qilinadi."
          ],
          codeSamples: [
            {
              title: "merge",
              language: "bash",
              code: "python manage.py makemigrations --merge"
            }
          ]
        }
      ],
      tips: [
        "Migration fayllarni hech qachon gitdan o'chirmang.",
        "Productionda migrate ishlatishdan oldin --plan bilan tekshiring.",
        "Data migration yozayotganda sekin querylardan saqlaning."
      ]
    },
    terms: [
      { term: 'makemigrations', definition: 'Baza tablitsasini o\'zgartirishlar uchun python fayllarini generatsiya qilib berish komandasi.' },
      { term: 'migrate', definition: 'Aynan shu python fayllari asosida real SQL qatlamida o\'zgarish qilish(table yaratish) komandasi.' }
    ]
  },
  {
    dayNumber: 8,
    title: 'Django ORM (CRUD) via Django Shell',
    shortDescription: 'Ma\'lumotlar yaratish va bazani o\'qish backend rejimida',
    longDescription: 'Backendda ko`p xolatlarda ma\'lumotlarni bazadan tutib clientga topshirishga to`g`ri keladi. ORM ularni pythonda boshqaruvchi engine. Mange.py shell icxida objects.create, va boshqa querylarni yozib ko\'rasiz!',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'O\'rtacha',
    todayFocus: 'objects.all(), objects.get(), objects.filter(), delete() metodlarini real holatda ko\'rish',
    whyItMatters: 'Siz SQL yozmaysiz lekim ORM qanday SQLga o\'girilishini bilishingiz shart. Ushbu ORMni extends qila olmasangiz, APIdagi views larni bo\'ldirolmaysiz.',
    doNotStudyToday: ['HTML rendering tushunchalari, Frontend forms orqali data qo\'shish', 'Signals (hali erta)'],
    deepWorkPlan: standardDeepWork("ORM nazariyasi va shell bilan tanishuv", "objects metodlarining tafovvutlari, get id topolmasa farqi", "10 ta ma\'lumot yaratib, shundan bittasini delete qilish."),
    tasks: ['python manage.py shell.', 'from myapp.models import Product.', 'Product.objects.create(name="...") ishlating.', 'update qilish uchun obyektni olib .save() qiling'],
    exercises: ['Bitta modelning barcha malumotlarini .filter().first() usullari haqda mashq qiling.'],
    deliverable: 'Shell orqali ma\'lumotlar kiritishni bilgan holat. Bazada dummy datalar mavjud.',
    checklist: ['get() bilan filter() farqini farqlay olaman'],
    readinessCriteria: ['Terminalda shellda ixtiyoriy tablega yozib insert/delete qila olish.'],
    commonMistakes: ['get() metodi ishlatganda null kelsa MultipleObjectsReturned yoki DoesNotExist kutmaslik.', 'save() funksiyasini chaqirishni unutish'],
    ifStuck: 'QuerySetning ortidan .query kodi bilan uning raw SQL kodini chop etib tasavvur qiling.',
    lesson: {
      summary: "ORM - bu SQLni Python orqali boshqarish enginei. Bugun CRUD (Create, Read, Update, Delete) amallarini shellda va kodda to'liq nazorat qilishni o'rganasiz.",
      goals: [
        "ORM CRUD amallarini amalda bajarish",
        "QuerySet va object farqini tushunish",
        "Bulk va helper metodlarni to'g'ri ishlatish"
      ],
      sections: [
        {
          title: "01. Django shellni ishga tushirish",
          body: [
            "ORM bilan ishlashning eng tez yo'li shell.",
            "Shell sizga settings va DBga to'g'ridan-to'g'ri ulanish beradi."
          ],
          codeSamples: [
            {
              title: "Shell start",
              language: "bash",
              code: "python manage.py shell"
            }
          ]
        },
        {
          title: "02. Model import qilish",
          body: [
            "Shell ichida modelni import qilib ishlatamiz.",
            "Bu sizga CRUD amallarini tez yozish imkonini beradi."
          ],
          codeSamples: [
            {
              title: "Import",
              language: "python",
              code: "from shop.models import Product"
            }
          ]
        },
        {
          title: "03. Create: objects.create",
          body: [
            "Eng tez create usuli objects.create.",
            "U create va save ni birlashtiradi."
          ],
          codeSamples: [
            {
              title: "create",
              language: "python",
              code: "Product.objects.create(title=\"Phone\", price=1200)"
            }
          ]
        },
        {
          title: "04. Create: save orqali",
          body: [
            "Boshqaruv kerak bo'lsa, object yaratib save qilinadi.",
            "Bu custom logika uchun qulay."
          ],
          codeSamples: [
            {
              title: "save",
              language: "python",
              code: "p = Product(title=\"Laptop\", price=2500)\np.save()"
            }
          ]
        },
        {
          title: "05. Read: get() metodi",
          body: [
            "get bitta object qaytaradi.",
            "Topilmasa DoesNotExist, ko'p bo'lsa MultipleObjectsReturned."
          ],
          codeSamples: [
            {
              title: "get",
              language: "python",
              code: "p = Product.objects.get(id=1)"
            }
          ]
        },
        {
          title: "06. Read: filter() QuerySet",
          body: [
            "filter har doim QuerySet qaytaradi.",
            "QuerySet zanjirlanib ketishi mumkin."
          ],
          codeSamples: [
            {
              title: "filter",
              language: "python",
              code: "qs = Product.objects.filter(price__gt=1000)"
            }
          ]
        },
        {
          title: "07. first() va last() yordamchi metodlar",
          body: [
            "QuerySetdan tez birinchi yoki oxirgi objectni olish.",
            "None qaytishi mumkin."
          ],
          codeSamples: [
            {
              title: "first/last",
              language: "python",
              code: "first_item = Product.objects.order_by(\"id\").first()\nlast_item = Product.objects.order_by(\"id\").last()"
            }
          ]
        },
        {
          title: "08. Update: update() metodi",
          body: [
            "QuerySet update to'g'ridan-to'g'ri DBda ishlaydi.",
            "save chaqirilmaydi."
          ],
          codeSamples: [
            {
              title: "update",
              language: "python",
              code: "Product.objects.filter(id=1).update(price=1300)"
            }
          ]
        },
        {
          title: "09. Update: save orqali",
          body: [
            "Objectni olib o'zgartirib save qilish.",
            "Signal va custom save logika ishlaydi."
          ],
          codeSamples: [
            {
              title: "update via save",
              language: "python",
              code: "p = Product.objects.get(id=1)\np.price = 1400\np.save()"
            }
          ]
        },
        {
          title: "10. Delete: object delete",
          body: [
            "Objectni o'chirish uchun delete ishlatiladi.",
            "Bu DBdan qatorni o'chiradi."
          ],
          codeSamples: [
            {
              title: "delete",
              language: "python",
              code: "p = Product.objects.get(id=1)\np.delete()"
            }
          ]
        },
        {
          title: "11. get_or_create",
          body: [
            "Object bo'lsa oladi, bo'lmasa yaratadi.",
            "Bu idempotent logika uchun qulay."
          ],
          codeSamples: [
            {
              title: "get_or_create",
              language: "python",
              code: "obj, created = Product.objects.get_or_create(title=\"Mouse\", defaults={\"price\": 50})"
            }
          ]
        },
        {
          title: "12. update_or_create",
          body: [
            "Object bo'lsa update, bo'lmasa create qiladi.",
            "Synclash yoki import uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "update_or_create",
              language: "python",
              code: "obj, created = Product.objects.update_or_create(\n    title=\"Keyboard\",\n    defaults={\"price\": 80}\n)"
            }
          ]
        },
        {
          title: "13. bulk_create",
          body: [
            "Ko'p objectlarni bir yo'la DBga yozadi.",
            "Katta data uchun tez."
          ],
          codeSamples: [
            {
              title: "bulk_create",
              language: "python",
              code: "Product.objects.bulk_create([\n    Product(title=\"A\", price=10),\n    Product(title=\"B\", price=20),\n])"
            }
          ]
        },
        {
          title: "14. values()",
          body: [
            "values dictlar ro'yxatini qaytaradi.",
            "APIda kerakli maydonlarni berish uchun qulay."
          ],
          codeSamples: [
            {
              title: "values",
              language: "python",
              code: "Product.objects.values(\"id\", \"title\")"
            }
          ]
        },
        {
          title: "15. values_list()",
          body: [
            "values_list tuplelar ro'yxatini qaytaradi.",
            "flat=True bo'lsa bitta list bo'ladi."
          ],
          codeSamples: [
            {
              title: "values_list",
              language: "python",
              code: "Product.objects.values_list(\"title\", flat=True)"
            }
          ]
        },
        {
          title: "16. count va exists",
          body: [
            "count - umumiy son, exists - bormi yo'qligini tekshiradi.",
            "exists odatda tezroq ishlaydi."
          ],
          codeSamples: [
            {
              title: "count/exists",
              language: "python",
              code: "Product.objects.count()\nProduct.objects.filter(price__gt=1000).exists()"
            }
          ]
        },
        {
          title: "17. order_by",
          body: [
            "QuerySetni tartiblash uchun order_by ishlatiladi.",
            "Minus belgisi teskari tartib."
          ],
          codeSamples: [
            {
              title: "order_by",
              language: "python",
              code: "Product.objects.order_by(\"-created_at\")"
            }
          ]
        },
        {
          title: "18. Slicing (limit)",
          body: [
            "QuerySet slicing bilan limit/offset ishlaydi.",
            "Bu paginationga tayyorgarlik."
          ],
          codeSamples: [
            {
              title: "slicing",
              language: "python",
              code: "Product.objects.order_by(\"id\")[0:10]"
            }
          ]
        },
        {
          title: "19. in_bulk",
          body: [
            "Bir nechta id bo'yicha tezkor olish.",
            "Natija dict bo'ladi."
          ],
          codeSamples: [
            {
              title: "in_bulk",
              language: "python",
              code: "Product.objects.in_bulk([1, 2, 3])"
            }
          ]
        },
        {
          title: "20. refresh_from_db",
          body: [
            "Objectni DBdan qayta o'qib, yangi qiymatlarni olish.",
            "Parallel update bo'lganda foydali."
          ],
          codeSamples: [
            {
              title: "refresh_from_db",
              language: "python",
              code: "p = Product.objects.get(id=1)\np.refresh_from_db()"
            }
          ]
        }
      ],
      tips: [
        "get() har doim bitta object uchun, filter() esa list uchun.",
        "update() signal ishlatmaydi, save() esa ishlatadi.",
        "Shell - ORMni tushunish uchun eng tez laboratoriya."
      ]
    },
    terms: [
      { term: 'QuerySet', definition: 'ORMdan qaytib kelgan ro\'yxathola obyektlari, uning asosi - filterlanish ulanib keta olishidadir.' },
      { term: 'Shell', definition: 'Python konsolining faqat Django bazasiga va settingsiga ulangan holatdagi ish stoli.' }
    ]
  },
  {
    dayNumber: 9,
    title: 'ORM Filtering, Lookups va Ordering',
    shortDescription: 'Ilg\'or qidiruvlar (exact, icontains, gt)',
    longDescription: 'Backendni qidiruv tizimini yasashda biz "filter()" methodiga murakkab shartlar beramiz. Bugun Field Lookups nimaligi: title__icontains, price__gt, order_by() va exclude() qanday formatda SQLga ozgarishini ko\'ramiz.',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'O\'rtacha',
    todayFocus: 'Aynan kerakli datani filtrlab olib JSONda APIViewda qaytarishni qisman simulation qilish.',
    whyItMatters: 'Deyarli barcha API route`lar GET zapros vaqtida filterlashni va saralashni talab qiladi (sorting & searching).',
    doNotStudyToday: [ 'Q objects deep dive hozircha', 'Full text search modules', 'django-filter libraries' ],
    deepWorkPlan: standardDeepWork("Lookup syntax'ni tushunish", "exclude, order_by va filter ni zanjir(chain) tarizida ulash.", "Shell ichida 20ta obyektdan vaqt, narx bo'yicha farqlangan so'rovlar olish"),
    tasks: [ '15-20ta turli xil bazaga yozuvlar kiriting', 'price > 50 lar uchun .filter(price__gt=50) ishlating', 'ismlarida "phone" soz bo\'lganlariga icontains bering', 'yangi recordlar tepada turishi uchun order_by("-created_at")' ],
    exercises: [ '.filter(...).exclude(...) kombinatsiyasini shellda bajaring qanday SQL yasalganini obj.query qilib chopeting.' ],
    deliverable: 'Yozilgan querySet logikalaridan iborat views.py endpoint qismi.',
    checklist: [ '__gt, __gte, __lt larni adashtirmayman', 'order_by("-id") dagi minus nimani anglatishni bilaman' ],
    readinessCriteria: [ 'Istagan shart orqali bazadan kerakli queryni ushlash ola olish' ],
    commonMistakes: [ 'Field ismidan song 1ta pastki chiziq _ ishlatish xatosi (2 ta __ yozish kerkak!)' ],
    ifStuck: 'Django Docs sahifasidagi "Field lookups" jadvallariga ko\'z tashlang.',
    lesson: {
      summary: "Bugun Django ORMning filterlash imkoniyatlarini chuqur o'rganasiz: lookup sintaksis, Q va F objects, sorting va aggregation. Bu bilimlar real API search va filter endpointlarining asosi bo'ladi.",
      goals: [
        "Field lookup sintaksisini to'liq o'zlashtirish",
        "Murakkab filter va sort yozish",
        "Q va F objectlar bilan dinamik so'rovlar qurish"
      ],
      sections: [
        {
          title: "01. Lookup sintaksisi",
          body: [
            "Django lookup doim field__operator ko'rinishida yoziladi.",
            "Masalan: price__gt=1000."
          ],
          codeSamples: [
            {
              title: "basic lookup",
              language: "python",
              code: "Product.objects.filter(price__gt=1000)"
            }
          ]
        },
        {
          title: "02. exact va iexact",
          body: [
            "exact - aniq tenglik, iexact - katta/kichik harfni inobatga olmaydi.",
            "Matnli qidiruvda iexact foydali."
          ],
          codeSamples: [
            {
              title: "exact/iexact",
              language: "python",
              code: "Product.objects.filter(title__exact=\"Phone\")\nProduct.objects.filter(title__iexact=\"phone\")"
            }
          ]
        },
        {
          title: "03. contains va icontains",
          body: [
            "contains substringni tekshiradi.",
            "icontains katta/kichik harfni hisobga olmaydi."
          ],
          codeSamples: [
            {
              title: "contains",
              language: "python",
              code: "Product.objects.filter(title__icontains=\"pro\")"
            }
          ]
        },
        {
          title: "04. startswith va istartswith",
          body: [
            "Matnning boshini tekshiradi.",
            "Istalgan prefix bo'yicha qidiruv uchun yaxshi."
          ],
          codeSamples: [
            {
              title: "startswith",
              language: "python",
              code: "Product.objects.filter(title__istartswith=\"sam\")"
            }
          ]
        },
        {
          title: "05. endswith va iendswith",
          body: [
            "Matn oxirini tekshiradi.",
            "Kod yoki fayl kengaytma filtrlarida ishlaydi."
          ],
          codeSamples: [
            {
              title: "endswith",
              language: "python",
              code: "Product.objects.filter(title__iendswith=\"max\")"
            }
          ]
        },
        {
          title: "06. in lookup",
          body: [
            "Bir nechta qiymatdan biriga teng bo'lsa topadi.",
            "List yoki QuerySet berish mumkin."
          ],
          codeSamples: [
            {
              title: "__in",
              language: "python",
              code: "Product.objects.filter(id__in=[1, 3, 5])"
            }
          ]
        },
        {
          title: "07. range lookup",
          body: [
            "Ikki qiymat oralig'ini tekshiradi.",
            "Narx yoki sana oraliqlari uchun qulay."
          ],
          codeSamples: [
            {
              title: "__range",
              language: "python",
              code: "Product.objects.filter(price__range=(100, 500))"
            }
          ]
        },
        {
          title: "08. gt, gte, lt, lte",
          body: [
            "Matematik operatorlar lookup ko'rinishida yoziladi.",
            "gt - katta, gte - katta yoki teng."
          ],
          codeSamples: [
            {
              title: "gt/gte/lt",
              language: "python",
              code: "Product.objects.filter(price__gte=500)\nProduct.objects.filter(price__lt=2000)"
            }
          ]
        },
        {
          title: "09. date lookup",
          body: [
            "DateTimeField bo'yicha date filter ishlatiladi.",
            "Sana bo'yicha grouping qilish mumkin."
          ],
          codeSamples: [
            {
              title: "__date",
              language: "python",
              code: "Order.objects.filter(created_at__date=\"2024-01-10\")"
            }
          ]
        },
        {
          title: "10. year, month, day",
          body: [
            "DateTimeField ichidan year/month/day ajratib olish mumkin.",
            "Bu analytics uchun qulay."
          ],
          codeSamples: [
            {
              title: "__year",
              language: "python",
              code: "Order.objects.filter(created_at__year=2024)"
            }
          ]
        },
        {
          title: "11. isnull",
          body: [
            "NULL qiymatlarni tekshiradi.",
            "Bosh bo'sh fieldlarni ajratish uchun kerak."
          ],
          codeSamples: [
            {
              title: "isnull",
              language: "python",
              code: "Profile.objects.filter(avatar__isnull=True)"
            }
          ]
        },
        {
          title: "12. exclude",
          body: [
            "Exclude filterga teskari ishlaydi.",
            "Kerakmas qiymatlarni chiqarib tashlaydi."
          ],
          codeSamples: [
            {
              title: "exclude",
              language: "python",
              code: "Product.objects.exclude(status=\"archived\")"
            }
          ]
        },
        {
          title: "13. order_by",
          body: [
            "Natijani tartiblash uchun order_by ishlatiladi.",
            "Minus teskari tartib beradi."
          ],
          codeSamples: [
            {
              title: "order_by",
              language: "python",
              code: "Product.objects.order_by(\"-price\")"
            }
          ]
        },
        {
          title: "14. distinct",
          body: [
            "Takroriy qiymatlarni bitta qilib beradi.",
            "Join bo'lgan querylarda kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "distinct",
              language: "python",
              code: "Product.objects.values(\"category\").distinct()"
            }
          ]
        },
        {
          title: "15. Chaining",
          body: [
            "Filterlar ketma-ket yozilib, umumiy query hosil qiladi.",
            "Har bir filter yangi QuerySet qaytaradi."
          ],
          codeSamples: [
            {
              title: "chaining",
              language: "python",
              code: "Product.objects.filter(is_active=True).filter(price__gt=500)"
            }
          ]
        },
        {
          title: "16. Q objects (OR)",
          body: [
            "Q object OR shart yozish uchun kerak.",
            "Oddiy filterlar faqat AND bo'ladi."
          ],
          codeSamples: [
            {
              title: "Q OR",
              language: "python",
              code: "from django.db.models import Q\n\nProduct.objects.filter(Q(price__lt=100) | Q(title__icontains=\"promo\"))"
            }
          ]
        },
        {
          title: "17. Q objects (AND/NOT)",
          body: [
            "Q object bilan NOT va murakkab kombinatsiyalar yoziladi.",
            "Bu advanced filterlar uchun kerak."
          ],
          codeSamples: [
            {
              title: "Q NOT",
              language: "python",
              code: "Product.objects.filter(~Q(status=\"archived\"), Q(price__gt=200))"
            }
          ]
        },
        {
          title: "18. F expressions",
          body: [
            "F object DB ichida fieldlarni solishtiradi.",
            "Python emas, DB darajasida hisob bo'ladi."
          ],
          codeSamples: [
            {
              title: "F expression",
              language: "python",
              code: "from django.db.models import F\n\nProduct.objects.filter(discount_price__lt=F(\"price\"))"
            }
          ]
        },
        {
          title: "19. aggregate",
          body: [
            "Aggregate umumiy statistikani beradi.",
            "Sum, Avg, Min, Max ishlatiladi."
          ],
          codeSamples: [
            {
              title: "aggregate",
              language: "python",
              code: "from django.db.models import Avg\n\nProduct.objects.aggregate(avg_price=Avg(\"price\"))"
            }
          ]
        },
        {
          title: "20. Real search endpoint",
          body: [
            "Query param bilan search yozish - real API amaliyoti.",
            "Filter va order_by birlashadi."
          ],
          codeSamples: [
            {
              title: "search endpoint",
              language: "python",
              code: "def search(request):\n    q = request.GET.get(\"q\", \"\")\n    qs = Product.objects.filter(title__icontains=q).order_by(\"-id\")\n    data = list(qs.values(\"id\", \"title\", \"price\"))\n    return JsonResponse({\"items\": data})"
            }
          ]
        }
      ],
      tips: [
        "Lookuplar doim ikki underscore bilan yoziladi.",
        "Murakkab qidiruvda Q object ishlating.",
        "Slicing va order_by pagination uchun tayanch."
      ]
    },
    terms: [
      { term: 'Field Lookup', definition: 'Django ORM operatorlari SQL dagi WHERE shartlarini python kwargs parameterlaridagi qo\'sh ustki __ chiziqda berilish sintaksisi(age__gte=18).' },
      { term: 'Chaining', definition: 'Querysetlarni ketma-ket filtrlab zanjir ulanishda davom etishi( Filter(x).exclude(y).order_by(z) ).' }
    ]
  },
  {
    dayNumber: 10,
    title: 'Relational Fields: ForeignKey',
    shortDescription: 'One-to-Many Munosabatlari va ularning DB ulanishi',
    longDescription: 'Database designining asosiy formati RDBMS. Kategoriya va Produkt, Avtor va Post - bularning hammasi ForeignKey (Birga Ko\'p) ustida amallardir. Related_name bilan db aloqasini uje o\'zlashtirish vaqti keldi.',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: 'ForeignKey field qo\'shish, bazaga on_delete=models.CASCADE ni o\'tkazish, related_name.',
    whyItMatters: 'Backend architecturani belgilovchi asosiy qismlaridan biri ER diagrammalar va model aloqalardig. Usiz siz hech narsa bog\'layolmaysiz.',
    doNotStudyToday: ['ManyToMany or One-to-One Fields (Ertagiga qo\'yamiz)'],
    deepWorkPlan: standardDeepWork("SQL INNER JOIN lar djangoda qanday ishlaydi", "ForeingKey dagi on_delete majburiyatlari (CASCADE, SET_NULL)", "Author -> Post (Ko\'p post bitta avtorga) bog\'liqligi."),
    tasks: ['Author modeli yarating', 'post modeliga author=models.ForeignKey qo\'shing', 'shellda author yaratib oling', 'p=Post(author=a1) qilib obyekt ulashib korin', 'p.author.name orqali uni qayta uqib korin'],
    exercises: ['Muallifni bilgan xolda author.post_set.all() bilan reverse lookup qilishni o\'rganing.'],
    deliverable: 'Guruh va child table formatidagi Munosabat boglangan database klasslari',
    checklist: ['models.CASCADE nimaligini bilaman', 'related_name va _set o\'zlashtirildi'],
    readinessCriteria: ['Foregin key lardan farqli objectlar o\'tasida aloqani boshqara bilish.'],
    commonMistakes: ['Author urniga author_id= qilib son qoshishga harka qilish (aslida obyekt kutadi ORM)'],
    ifStuck: 'xatolik kelsa db da null=True yoki default qo\'shb migrate bering',
    lesson: {
      summary: "ForeignKey - relatsion DBning yuragi. Bugun one-to-many aloqani to'liq tushunasiz: model yozish, on_delete, related_name, reverse lookup va query optimizatsiya.",
      goals: [
        "ForeignKey va reverse lookupni to'liq tushunish",
        "on_delete strategiyalarini amalda farqlash",
        "Related querylar va optimizatsiyani o'zlashtirish"
      ],
      sections: [
        {
          title: "01. One-to-many mental modeli",
          body: [
            "Bir author ko'p post yozadi - bu One-to-Many.",
            "ForeignKey child tableda saqlanadi."
          ],
          codeSamples: [
            {
              title: "Model diagram",
              language: "text",
              code: "Author (1) ----< Post (many)"
            }
          ]
        },
        {
          title: "02. ForeignKey field yozish",
          body: [
            "ForeignKey doim bog'lanayotgan modelga ko'rsatadi.",
            "on_delete majburiy parametr."
          ],
          codeSamples: [
            {
              title: "ForeignKey",
              language: "python",
              code: "class Post(models.Model):\n    author = models.ForeignKey(\"Author\", on_delete=models.CASCADE)\n    title = models.CharField(max_length=200)"
            }
          ]
        },
        {
          title: "03. on_delete=models.CASCADE",
          body: [
            "Parent o'chsa, childlar ham o'chadi.",
            "Bu eng ko'p ishlatiladigan variant."
          ],
          codeSamples: [
            {
              title: "CASCADE",
              language: "python",
              code: "author = models.ForeignKey(Author, on_delete=models.CASCADE)"
            }
          ]
        },
        {
          title: "04. on_delete=models.PROTECT",
          body: [
            "Parentni o'chirishni bloklaydi.",
            "Data yo'qolishini oldini oladi."
          ],
          codeSamples: [
            {
              title: "PROTECT",
              language: "python",
              code: "author = models.ForeignKey(Author, on_delete=models.PROTECT)"
            }
          ]
        },
        {
          title: "05. on_delete=models.SET_NULL",
          body: [
            "Parent o'chsa, childdagi foreign key null bo'ladi.",
            "Buning uchun null=True kerak."
          ],
          codeSamples: [
            {
              title: "SET_NULL",
              language: "python",
              code: "author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)"
            }
          ]
        },
        {
          title: "06. related_name",
          body: [
            "related_name reverse lookup nomini belgilaydi.",
            "Standard _set o'rniga aniq nom qo'yiladi."
          ],
          codeSamples: [
            {
              title: "related_name",
              language: "python",
              code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name=\"posts\")"
            }
          ]
        },
        {
          title: "07. Reverse lookup",
          body: [
            "Parentdan childlarga chiqish reverse lookup deyiladi.",
            "related_name bo'lmasa post_set ishlaydi."
          ],
          codeSamples: [
            {
              title: "reverse",
              language: "python",
              code: "author = Author.objects.get(id=1)\nposts = author.posts.all()"
            }
          ]
        },
        {
          title: "08. Related filter",
          body: [
            "Parent fieldlari bo'yicha childlarni filterlash mumkin.",
            "author__name kabi double underscore ishlatiladi."
          ],
          codeSamples: [
            {
              title: "author__name",
              language: "python",
              code: "Post.objects.filter(author__name__icontains=\"ali\")"
            }
          ]
        },
        {
          title: "09. ForeignKey objectga kirish",
          body: [
            "Childdan parentga to'g'ridan-to'g'ri boriladi.",
            "ORM avtomatik join qiladi."
          ],
          codeSamples: [
            {
              title: "post.author",
              language: "python",
              code: "post = Post.objects.get(id=1)\npost.author.name"
            }
          ]
        },
        {
          title: "10. ForeignKeyni object bilan berish",
          body: [
            "ForeignKey fieldga object beriladi.",
            "ID bilan emas, object bilan ishlash kerak."
          ],
          codeSamples: [
            {
              title: "object assign",
              language: "python",
              code: "author = Author.objects.get(id=1)\nPost.objects.create(author=author, title=\"Intro\")"
            }
          ]
        },
        {
          title: "11. author_id field",
          body: [
            "Django avtomatik author_id yaratadi.",
            "Bu faqat integer qiymat."
          ],
          codeSamples: [
            {
              title: "author_id",
              language: "python",
              code: "post = Post.objects.get(id=1)\npost.author_id"
            }
          ]
        },
        {
          title: "12. select_related",
          body: [
            "select_related FK uchun join qilib bitta queryda oladi.",
            "N+1 muammosini kamaytiradi."
          ],
          codeSamples: [
            {
              title: "select_related",
              language: "python",
              code: "Post.objects.select_related(\"author\").all()"
            }
          ]
        },
        {
          title: "13. prefetch_related",
          body: [
            "Reverse lookupda prefetch_related ishlaydi.",
            "Bu 2 query bilan tezroq bo'ladi."
          ],
          codeSamples: [
            {
              title: "prefetch_related",
              language: "python",
              code: "Author.objects.prefetch_related(\"posts\").all()"
            }
          ]
        },
        {
          title: "14. related_query_name",
          body: [
            "Reverse filter nomini belgilash uchun related_query_name ishlatiladi.",
            "Complex querylarda nomlarni toza qiladi."
          ],
          codeSamples: [
            {
              title: "related_query_name",
              language: "python",
              code: "author = models.ForeignKey(\n    Author,\n    on_delete=models.CASCADE,\n    related_name=\"posts\",\n    related_query_name=\"post\",\n)"
            }
          ]
        },
        {
          title: "15. limit_choices_to",
          body: [
            "Admin va formalar uchun FK tanlovini cheklaydi.",
            "Masalan faqat active authorlar."
          ],
          codeSamples: [
            {
              title: "limit_choices_to",
              language: "python",
              code: "author = models.ForeignKey(\n    Author,\n    on_delete=models.CASCADE,\n    limit_choices_to={\"is_active\": True}\n)"
            }
          ]
        },
        {
          title: "16. db_index",
          body: [
            "ForeignKey avtomatik index oladi, lekin ba'zan qo'shimcha index kerak.",
            "Katta jadvalda performance oshiradi."
          ],
          codeSamples: [
            {
              title: "db_index",
              language: "python",
              code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, db_index=True)"
            }
          ]
        },
        {
          title: "17. to_field",
          body: [
            "ForeignKey default primary keyga bog'lanadi.",
            "Agar boshqa fieldga bog'lamoqchi bo'lsangiz to_field ishlating."
          ],
          codeSamples: [
            {
              title: "to_field",
              language: "python",
              code: "author = models.ForeignKey(Author, to_field=\"code\", on_delete=models.CASCADE)"
            }
          ]
        },
        {
          title: "18. unique_together",
          body: [
            "Bir parent ichida child title takrorlanmasin degan constraint.",
            "Composite unique sifatida ishlaydi."
          ],
          codeSamples: [
            {
              title: "unique_together",
              language: "python",
              code: "class Post(models.Model):\n    author = models.ForeignKey(Author, on_delete=models.CASCADE)\n    title = models.CharField(max_length=200)\n\n    class Meta:\n        unique_together = (\"author\", \"title\")"
            }
          ]
        },
        {
          title: "19. Delete behavior test",
          body: [
            "Parent o'chirilganda childlar qanday bo'lishini tekshiring.",
            "CASCADE bo'lsa hammasi ketadi."
          ],
          codeSamples: [
            {
              title: "delete test",
              language: "python",
              code: "author = Author.objects.get(id=1)\nauthor.delete()"
            }
          ]
        },
        {
          title: "20. Real example: create author and posts",
          body: [
            "Amalda author yaratib, unga post bog'lash.",
            "Shundan keyin reverse lookup bilan hammasini olish."
          ],
          codeSamples: [
            {
              title: "create + reverse",
              language: "python",
              code: "author = Author.objects.create(name=\"Ali\")\nPost.objects.create(author=author, title=\"Post 1\")\nPost.objects.create(author=author, title=\"Post 2\")\nlist(author.posts.values_list(\"title\", flat=True))"
            }
          ]
        }
      ],
      tips: [
        "ForeignKey relationshipni tushunmasdan real backend qurib bo'lmaydi.",
        "select_related - FK uchun, prefetch_related - reverse uchun.",
        "related_name qo'ying, kod o'qilishi oson bo'ladi."
      ]
    },
    terms: [
      { term: 'ForeignKey', definition: 'Bir table bilan masalan avtor ichidagi ko\'plar post boglanishi.' },
      { term: 'Reverse Lookup', definition: 'Parienni oldindan bilib onasiga qo\'shilgan bolalarni chiqarib obkelish aloqasi' }
    ]
  },
  {
    dayNumber: 11,
    title: "Relational Fields: OneToOne & ManyToMany",
    shortDescription: "One-to-One va Many-to-Many munosabatlari",
    longDescription: "Bugun ForeignKeydan keyingi ikki asosiy aloqani o'rganamiz: OneToOne va ManyToMany. Profil, tag, rol va guruh kabi real model strukturalari shu yerda.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "OneToOneField, ManyToManyField, through va related_name bilan ishlash.",
    whyItMatters: "Relatsiyalarni to'g'ri tanlash data modeli, query tezligi va biznes mantiqiga bevosita ta'sir qiladi.",
    doNotStudyToday: ['Signals', 'Raw SQL joins', 'DRF serializers'],
    deepWorkPlan: standardDeepWork("OneToOne vs ManyToMany mental modeli", "Model va migration yozish", "Relationshiplar bilan query va amaliy mashqlar"),
    tasks: [
      "User va Profile modellarini OneToOne bilan bog'lang",
      "Post va Tag modellarini ManyToMany bilan bog'lang",
      "through model bilan extra field qo'shib ko'ring",
      "prefetch_related bilan test qiling"
    ],
    exercises: [
      "Ma'lum tag bilan bog'langan postlarni chiqaring va distinct qo'llang."
    ],
    deliverable: "OneToOne va ManyToMany ishlatilgan real model struktura va test querylar.",
    checklist: [
      "OneToOne qachon ishlatilishini tushundim",
      "ManyToMany add/remove ishlatdim",
      "through model bilan ishladim"
    ],
    readinessCriteria: [
      "user.profile va post.tags orqali data olish",
      "reverse lookup va filter ishlay olishi"
    ],
    commonMistakes: [
      "ManyToMany uchun null=True ishlatishga urinish",
      "related_name ni unutish"
    ],
    ifStuck: "Migrationlarni qayta yarating va m2m jadval yaratilganini dbshellda tekshiring.",
    lesson: {
      summary: "Bugun OneToOne va ManyToMany aloqalarini to'liq tushunasiz: qachon ishlatiladi, qanday yoziladi, va querylarda qanday ishlaydi. Natijada data modelingiz professional ko'rinishga keladi.",
      goals: [
        "OneToOne va ManyToMany farqini aniq bilish",
        "related_name, through va reverse lookupni ishlatish",
        "M2M query va performance amaliyoti"
      ],
      sections: [
        {
          title: "01. OneToOne mental modeli",
          body: [
            "Bitta parentga bitta child kerak bo'lsa OneToOne ishlatiladi.",
            "Masalan userga bitta profile."
          ],
          codeSamples: [
            {
              title: "User-Profile",
              language: "python",
              code: 'from django.db import models\n\nclass Profile(models.Model):\n    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)\n    bio = models.TextField(blank=True)'
            }
          ]
        },
        {
          title: "02. OneToOne qachon ishlatiladi",
          body: [
            "Har bir user uchun faqat bitta passport yoki profil bo'lsa OneToOne.",
            "Bitta parentga ko'p child kerak bo'lsa ForeignKey."
          ],
          codeSamples: [
            {
              title: "Passport",
              language: "python",
              code: 'class Passport(models.Model):\n    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)\n    number = models.CharField(max_length=20, unique=True)'
            }
          ]
        },
        {
          title: "03. related_name bilan nomlash",
          body: [
            "related_name reverse lookup nomini beradi.",
            "User.profile kabi qulay kirish paydo bo'ladi."
          ],
          codeSamples: [
            {
              title: "related_name",
              language: "python",
              code: 'user = models.OneToOneField("auth.User", on_delete=models.CASCADE, related_name="profile")'
            }
          ]
        },
        {
          title: "04. Access pattern",
          body: [
            "OneToOne da ikkala tomondan to'g'ridan-to'g'ri kirish mumkin.",
            "Bu API yozishda juda qulay."
          ],
          codeSamples: [
            {
              title: "Shell access",
              language: "python",
              code: 'user = User.objects.get(id=1)\nuser.profile\nprofile = Profile.objects.get(id=1)\nprofile.user'
            }
          ]
        },
        {
          title: "05. Optional OneToOne (null/blank)",
          body: [
            "Agar profil hamma userga kerak bo'lmasa null va blank ishlatiladi.",
            "Bu migrationda default talabini kamaytiradi."
          ],
          codeSamples: [
            {
              title: "Optional profile",
              language: "python",
              code: 'user = models.OneToOneField("auth.User", on_delete=models.SET_NULL, null=True, blank=True)'
            }
          ]
        },
        {
          title: "06. on_delete strategiyalari",
          body: [
            "CASCADE - parent o'chsa child ham o'chadi.",
            "SET_NULL - child qoladi, lekin bog'lanish yo'qoladi."
          ],
          codeSamples: [
            {
              title: "on_delete",
              language: "python",
              code: 'user = models.OneToOneField("auth.User", on_delete=models.SET_NULL, null=True)'
            }
          ]
        },
        {
          title: "07. select_related bilan tezlashtirish",
          body: [
            "OneToOne FK kabi ishlaydi, select_related bitta queryga tushiradi.",
            "N+1 muammosini kamaytiradi."
          ],
          codeSamples: [
            {
              title: "select_related",
              language: "python",
              code: 'Profile.objects.select_related("user").all()'
            }
          ]
        },
        {
          title: "08. ManyToMany mental modeli",
          body: [
            "Bitta postga ko'p tag, bitta tagga ko'p post.",
            "ManyToMany ikki tomondan ko'p."
          ],
          codeSamples: [
            {
              title: "Post-Tag",
              language: "python",
              code: 'class Tag(models.Model):\n    name = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    tags = models.ManyToManyField(Tag)'
            }
          ]
        },
        {
          title: "09. related_name va teskari chiqish",
          body: [
            "related_name bilan tag.posts kabi qulay reverse lookup ochiladi.",
            "Bu API response uchun juda foydali."
          ],
          codeSamples: [
            {
              title: "related_name",
              language: "python",
              code: 'tags = models.ManyToManyField(Tag, related_name="posts")\n\n# reverse\nTag.objects.get(id=1).posts.all()'
            }
          ]
        },
        {
          title: "10. add/remove/clear/set",
          body: [
            "ManyToMany relationship boshqarish uchun add/remove/clear/set ishlatiladi.",
            "Bular relation jadvalini o'zgartiradi."
          ],
          codeSamples: [
            {
              title: "M2M methods",
              language: "python",
              code: 'post.tags.add(tag1, tag2)\npost.tags.remove(tag1)\npost.tags.set([tag3, tag4])\npost.tags.clear()'
            }
          ]
        },
        {
          title: "11. through model va extra field",
          body: [
            "ManyToManyga qo'shimcha field kerak bo'lsa through model ishlatiladi.",
            "Masalan user + group va role."
          ],
          codeSamples: [
            {
              title: "through model",
              language: "python",
              code: 'class Membership(models.Model):\n    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)\n    group = models.ForeignKey("Group", on_delete=models.CASCADE)\n    role = models.CharField(max_length=20)\n\nclass Group(models.Model):\n    name = models.CharField(max_length=100)\n    users = models.ManyToManyField("auth.User", through="Membership")'
            }
          ]
        },
        {
          title: "12. through_fields bilan bog'lash",
          body: [
            "Agar through modelda bir nechta FK bo'lsa, through_fields aniq ko'rsatadi.",
            "Bu migration xatolarini oldini oladi."
          ],
          codeSamples: [
            {
              title: "through_fields",
              language: "python",
              code: 'users = models.ManyToManyField(\n    "auth.User",\n    through="Membership",\n    through_fields=("group", "user")\n)'
            }
          ]
        },
        {
          title: "13. related_query_name bilan filter",
          body: [
            "related_query_name filter sintaksisini soddalashtiradi.",
            "Tag.objects.filter(post__is_public=True) kabi."
          ],
          codeSamples: [
            {
              title: "related_query_name",
              language: "python",
              code: 'tags = models.ManyToManyField(Tag, related_name="posts", related_query_name="post")\n\nTag.objects.filter(post__is_public=True)'
            }
          ]
        },
        {
          title: "14. Self relation (symmetrical)",
          body: [
            "Userlar o'zaro do'st bo'lishi mumkin.",
            "symmetrical=False bo'lsa follow modelini beradi."
          ],
          codeSamples: [
            {
              title: "self m2m",
              language: "python",
              code: 'class UserProfile(models.Model):\n    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)\n    friends = models.ManyToManyField("self", symmetrical=False, related_name="followers")'
            }
          ]
        },
        {
          title: "15. blank=True bilan optional",
          body: [
            "ManyToMany uchun null emas, blank ishlatiladi.",
            "Formalar uchun bo'sh ruxsat beradi."
          ],
          codeSamples: [
            {
              title: "blank=True",
              language: "python",
              code: 'tags = models.ManyToManyField(Tag, blank=True)'
            }
          ]
        },
        {
          title: "16. db_table bilan M2M jadval nomi",
          body: [
            "ManyToMany oraliq jadvalini o'zingiz nomlashingiz mumkin.",
            "Bu DBA va SQL tarafda osonlik beradi."
          ],
          codeSamples: [
            {
              title: "db_table",
              language: "python",
              code: 'tags = models.ManyToManyField(Tag, db_table="post_tags")'
            }
          ]
        },
        {
          title: "17. M2M lookup",
          body: [
            "M2M bo'yicha filter qilish uchun double underscore ishlatiladi.",
            "Bu SQL JOIN ni ORMda ifodalaydi."
          ],
          codeSamples: [
            {
              title: "filter tags",
              language: "python",
              code: 'Post.objects.filter(tags__name__icontains="django")'
            }
          ]
        },
        {
          title: "18. prefetch_related bilan tezlashtirish",
          body: [
            "ManyToMany uchun prefetch_related kerak.",
            "Aks holda N+1 bo'lishi mumkin."
          ],
          codeSamples: [
            {
              title: "prefetch_related",
              language: "python",
              code: 'Post.objects.prefetch_related("tags").all()'
            }
          ]
        },
        {
          title: "19. annotate Count bilan hisoblash",
          body: [
            "Har bir tagga nechta post borligini count bilan chiqaring.",
            "Bu statistik API lar uchun kerak."
          ],
          codeSamples: [
            {
              title: "Count",
              language: "python",
              code: 'from django.db.models import Count\n\nTag.objects.annotate(post_count=Count("posts"))'
            }
          ]
        },
        {
          title: "20. distinct bilan takrorlarni yo'qotish",
          body: [
            "M2M joinlarda bir xil post bir necha marta chiqishi mumkin.",
            "distinct buni tozalaydi."
          ],
          codeSamples: [
            {
              title: "distinct",
              language: "python",
              code: 'Post.objects.filter(tags__name__in=["api", "backend"]).distinct()'
            }
          ]
        }
      ],
      tips: [
        "related_name qo'ying, kodni o'qish oson bo'ladi.",
        "ManyToMany uchun prefetch_related ishlatishni odat qiling.",
        "through model - extra field kerak bo'lsa yagona to'g'ri yo'l."
      ]
    },
    terms: [
      { term: 'OneToOneField', definition: 'Bir parentga faqat bitta child bog\'lash uchun ishlatiladigan field.' },
      { term: 'ManyToManyField', definition: 'Ikki tomondan ko\'p obyektlar bog\'lanadigan munosabat fieldi.' }
    ]
  },
  {
    dayNumber: 12,
    title: "Model Fields & Options Deep Dive",
    shortDescription: "Field turlari va parametrlarini chuqur tushunish",
    longDescription: "Model fieldlari to'g'ri tanlanmasa, butun data dizayn noto'g'ri bo'ladi. Bugun CharField, BooleanField, DateTimeField va ularning max_length, null, blank, default, verbose_name kabi parametrlarini chuqur o'rganamiz.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "Field turlari va ularning parametrlarini amaliy yozish.",
    whyItMatters: "Field parametrlari validation, DB schema va performancega bevosita ta'sir qiladi.",
    doNotStudyToday: ['Advanced DB tuning', 'DRF serializers'],
    deepWorkPlan: standardDeepWork("Field turlari va mental modeli", "Parametrlar va validatsiya", "Modellarni yozib migration qilish"),
    tasks: [
      "10 ta field ishlatib model yozing",
      "choices va validators qo'shing",
      "null va blank farqini amalda tekshiring"
    ],
    exercises: [
      "Modelga kamida 2 ta unique va db_index field qo'shing."
    ],
    deliverable: "Turli field turlari va parametrlar bilan boyitilgan model fayl.",
    checklist: [
      "max_length va verbose_name farqini tushundim",
      "null va blank qachon kerakligini bilaman",
      "choices va validators ishlatdim"
    ],
    readinessCriteria: [
      "Field tanlash va parametr berish bo'yicha adashmayman"
    ],
    commonMistakes: [
      "CharFieldda max_length ni unutish",
      "null va blankni bir xil deb o'ylash"
    ],
    ifStuck: "Rasmiy Django docsdagi Model field reference bo'limini ko'rib chiqing.",
    lesson: {
      summary: "Bugun field turlari va ularning parametrlarini to'liq tushunasiz. Bu sizga toza schema, to'g'ri validatsiya va barqaror API qurishga yordam beradi.",
      goals: [
        "Eng ko'p ishlatiladigan field turlarini bilish",
        "Parametrlar vazifasini tushunish",
        "Validation va schema bog'liqligini o'rganish"
      ],
      sections: [
        {
          title: "01. CharField va max_length",
          body: [
            "Qisqa matnlar uchun ishlatiladi, max_length majburiy.",
            "verbose_name foydalanuvchiga ko'rinadigan nom beradi."
          ],
          codeSamples: [
            {
              title: "CharField",
              language: "python",
              code: 'title = models.CharField("Sarlavha", max_length=200)'
            }
          ]
        },
        {
          title: "02. TextField (uzun matn)",
          body: [
            "Uzoq matnlar uchun TextField ishlatiladi.",
            "max_length talab qilinmaydi."
          ],
          codeSamples: [
            {
              title: "TextField",
              language: "python",
              code: 'description = models.TextField("Tavsif")'
            }
          ]
        },
        {
          title: "03. IntegerField va PositiveIntegerField",
          body: [
            "Sonli qiymatlar uchun IntegerField ishlatiladi.",
            "Faoliyatda manfiy bo'lmasligi kerak bo'lsa PositiveIntegerField."
          ],
          codeSamples: [
            {
              title: "Integer fields",
              language: "python",
              code: 'age = models.IntegerField()\nstock = models.PositiveIntegerField()'
            }
          ]
        },
        {
          title: "04. DecimalField (max_digits, decimal_places)",
          body: [
            "Pul va aniq hisob-kitoblar uchun DecimalField kerak.",
            "max_digits va decimal_places majburiy."
          ],
          codeSamples: [
            {
              title: "DecimalField",
              language: "python",
              code: 'price = models.DecimalField(max_digits=10, decimal_places=2)'
            }
          ]
        },
        {
          title: "05. FloatField (aniqlik cheklovi)",
          body: [
            "FloatField tezkor, lekin aniqlik yo'qotishi mumkin.",
            "Pul uchun DecimalField ishlatish tavsiya."
          ],
          codeSamples: [
            {
              title: "FloatField",
              language: "python",
              code: 'rating = models.FloatField(default=0)'
            }
          ]
        },
        {
          title: "06. BooleanField (default)",
          body: [
            "True/False holatlar uchun ishlatiladi.",
            "default berish amaliyotda qulaylik beradi."
          ],
          codeSamples: [
            {
              title: "BooleanField",
              language: "python",
              code: 'is_active = models.BooleanField(default=True)'
            }
          ]
        },
        {
          title: "07. DateField va DateTimeField",
          body: [
            "Sana va vaqt saqlash uchun DateField yoki DateTimeField ishlatiladi.",
            "auto_now_add va auto_now audit uchun kerak."
          ],
          codeSamples: [
            {
              title: "Date fields",
              language: "python",
              code: 'created_at = models.DateTimeField(auto_now_add=True)\nupdated_at = models.DateTimeField(auto_now=True)'
            }
          ]
        },
        {
          title: "08. EmailField",
          body: [
            "Email formatini avtomatik validatsiya qiladi.",
            "Ko'pincha unique bilan birga ishlatiladi."
          ],
          codeSamples: [
            {
              title: "EmailField",
              language: "python",
              code: 'email = models.EmailField(unique=True)'
            }
          ]
        },
        {
          title: "09. URLField",
          body: [
            "URL formatini tekshiradi.",
            "Ixtiyoriy bo'lsa blank=True qo'yiladi."
          ],
          codeSamples: [
            {
              title: "URLField",
              language: "python",
              code: 'website = models.URLField(blank=True)'
            }
          ]
        },
        {
          title: "10. SlugField",
          body: [
            "URL friendly qisqa matnlar uchun ishlatiladi.",
            "Odatda unique bo'ladi."
          ],
          codeSamples: [
            {
              title: "SlugField",
              language: "python",
              code: 'slug = models.SlugField(max_length=120, unique=True)'
            }
          ]
        },
        {
          title: "11. UUIDField",
          body: [
            "Global unikallik uchun UUID ishlatiladi.",
            "editable=False admin va formada ko'rsatmaslik uchun."
          ],
          codeSamples: [
            {
              title: "UUIDField",
              language: "python",
              code: 'import uuid\n\nuuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)'
            }
          ]
        },
        {
          title: "12. JSONField",
          body: [
            "Dinamik struktura saqlash uchun JSONField ishlatiladi.",
            "default=dict bo'lsa bo'sh obyekt yaratadi."
          ],
          codeSamples: [
            {
              title: "JSONField",
              language: "python",
              code: 'metadata = models.JSONField(default=dict, blank=True)'
            }
          ]
        },
        {
          title: "13. FileField upload_to",
          body: [
            "Fayl saqlash uchun FileField ishlatiladi.",
            "upload_to papka yo'lini beradi."
          ],
          codeSamples: [
            {
              title: "FileField",
              language: "python",
              code: 'document = models.FileField(upload_to="docs/")'
            }
          ]
        },
        {
          title: "14. ImageField (Pillow)",
          body: [
            "Rasm saqlash uchun ImageField ishlatiladi.",
            "Pillow kutubxonasi kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "ImageField",
              language: "python",
              code: 'avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)'
            }
          ]
        },
        {
          title: "15. ForeignKey parametrlari",
          body: [
            "related_name teskari aloqani nomlaydi.",
            "on_delete esa parent o'chsa nima bo'lishini belgilaydi."
          ],
          codeSamples: [
            {
              title: "ForeignKey params",
              language: "python",
              code: 'author = models.ForeignKey("auth.User", on_delete=models.CASCADE, related_name="posts")'
            }
          ]
        },
        {
          title: "16. ManyToManyField parametrlari",
          body: [
            "related_name va blank ManyToManyda tez-tez ishlatiladi.",
            "through bo'lsa custom oraliq jadval ochiladi."
          ],
          codeSamples: [
            {
              title: "ManyToMany params",
              language: "python",
              code: 'tags = models.ManyToManyField("Tag", blank=True, related_name="posts")'
            }
          ]
        },
        {
          title: "17. null vs blank",
          body: [
            "null DB darajasidagi bo'sh qiymat.",
            "blank esa form validationda bo'sh ruxsat."
          ],
          codeSamples: [
            {
              title: "null blank",
              language: "python",
              code: 'bio = models.TextField(null=True, blank=True)'
            }
          ]
        },
        {
          title: "18. default va callable",
          body: [
            "default bilan avtomatik qiymat beriladi.",
            "Callable default (timezone.now) dinamik qiymat beradi."
          ],
          codeSamples: [
            {
              title: "default",
              language: "python",
              code: 'from django.utils import timezone\n\nstatus = models.CharField(max_length=20, default="new")\npublished_at = models.DateTimeField(default=timezone.now)'
            }
          ]
        },
        {
          title: "19. unique, db_index, primary_key",
          body: [
            "unique takrorlanishni bloklaydi.",
            "db_index tezkor qidiruv uchun, primary_key esa asosiy kalit."
          ],
          codeSamples: [
            {
              title: "constraints",
              language: "python",
              code: 'import uuid\n\ncode = models.CharField(max_length=20, unique=True, db_index=True)\ncustom_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)'
            }
          ]
        },
        {
          title: "20. verbose_name, help_text, choices, validators",
          body: [
            "verbose_name foydalanuvchi ko'radigan nom.",
            "help_text admin/form yordam matni, choices va validators esa validatsiyani kuchaytiradi."
          ],
          codeSamples: [
            {
              title: "options",
              language: "python",
              code: 'from django.core.validators import MinValueValidator, MaxValueValidator\n\nSTATUS = [("draft", "Draft"), ("published", "Published")]\n\nstatus = models.CharField(\n    "Holat",\n    max_length=10,\n    choices=STATUS,\n    default="draft",\n    help_text="Post holati",\n    db_column="status",\n    editable=True\n)\n\nrating = models.IntegerField(\n    "Reyting",\n    validators=[MinValueValidator(1), MaxValueValidator(5)]\n)'
            }
          ]
        }
      ],
      tips: [
        "Pul uchun DecimalField ishlating.",
        "null va blankni doim birga ishlatmang.",
        "unique va db_index katta databazada juda muhim."
      ]
    },
    terms: [
      { term: 'max_length', definition: 'CharField va SlugField kabi fieldlarda maksimal uzunlikni belgilaydi.' },
      { term: 'verbose_name', definition: 'Admin va formalar uchun foydalanuvchiga ko\'rinadigan nom.' }
    ]
  },
  {
    dayNumber: 13,
    title: "QuerySet API: Eng ko'p ishlatiladigan metodlar",
    shortDescription: "SomeModel.objects.* metodlarini to'liq tushunish",
    longDescription: "Django ORMning eng kuchli qismi QuerySet metodlaridir. Bugun eng ko'p ishlatiladigan metodlarni vazifasi, qayerda ishlatilishi va misollari bilan o'rganamiz.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "QuerySet metodlarini amalda ishlatish va farqlarini bilish.",
    whyItMatters: "API endpointlar, filterlar va reportlar QuerySet metodlari orqali quriladi.",
    doNotStudyToday: ['Raw SQL', 'Complex caching'],
    deepWorkPlan: standardDeepWork("QuerySet mental modeli", "Metodlarni amaliy ishlatish", "Real querylar yozish"),
    tasks: [
      "20+ QuerySet metodidan kamida 10 tasini shellda sinab ko'ring",
      "values va values_list farqini ko'rsating"
    ],
    exercises: [
      "QuerySet chain qilib 3 ta filter va order_by yozing."
    ],
    deliverable: "QuerySet metodlari bo'yicha shaxsiy konspekt va test kodlar.",
    checklist: [
      "filter va get farqini adashtirmayman",
      "values va values_listni ishlatdim",
      "select_related/prefetch_relatedni bilaman"
    ],
    readinessCriteria: [
      "Metodlar qayerda ishlatilishini aniq tushuntira olaman"
    ],
    commonMistakes: [
      "get() bilan bir nechta object kutish",
      "select_related va prefetch_relatedni almashtirib yuborish"
    ],
    ifStuck: "Django ORM QuerySet API bo'limini ochib birma-bir ko'rib chiqing.",
    lesson: {
      summary: "QuerySet metodlari - ORMning asosi. Har bir metodni vazifasi, qachon ishlatilishi va misoli bilan ko'rasiz.",
      goals: [
        "Eng ko'p ishlatiladigan metodlarni bilish",
        "CRUD va read metodlarini farqlash",
        "Optimization metodlarini tushunish"
      ],
      sections: [
        {
          title: "01. all()",
          body: [
            "Hamma obyektlarni QuerySet sifatida qaytaradi.",
            "Keyingi filterlar uchun boshlang'ich nuqta."
          ],
          codeSamples: [
            {
              title: "all",
              language: "python",
              code: 'Product.objects.all()'
            }
          ]
        },
        {
          title: "02. filter()",
          body: [
            "Shart bo'yicha QuerySet qaytaradi.",
            "GET search endpointlarida ishlatiladi."
          ],
          codeSamples: [
            {
              title: "filter",
              language: "python",
              code: 'Product.objects.filter(price__gt=100)'
            }
          ]
        },
        {
          title: "03. exclude()",
          body: [
            "Shartni inkor qiladi.",
            "Keraksiz obyektlarni chiqarib tashlaydi."
          ],
          codeSamples: [
            {
              title: "exclude",
              language: "python",
              code: 'Product.objects.exclude(status="archived")'
            }
          ]
        },
        {
          title: "04. get()",
          body: [
            "Bitta object qaytaradi.",
            "Topilmasa DoesNotExist, ko'p bo'lsa MultipleObjectsReturned."
          ],
          codeSamples: [
            {
              title: "get",
              language: "python",
              code: 'Product.objects.get(id=1)'
            }
          ]
        },
        {
          title: "05. create()",
          body: [
            "Yangi object yaratadi va save qiladi.",
            "Eng tez create usuli."
          ],
          codeSamples: [
            {
              title: "create",
              language: "python",
              code: 'Product.objects.create(title="Phone", price=1200)'
            }
          ]
        },
        {
          title: "06. bulk_create()",
          body: [
            "Ko'p obyektni biryo'la yozadi.",
            "Import va seed uchun tez."
          ],
          codeSamples: [
            {
              title: "bulk_create",
              language: "python",
              code: 'Product.objects.bulk_create([\n    Product(title="A", price=10),\n    Product(title="B", price=20)\n])'
            }
          ]
        },
        {
          title: "07. get_or_create()",
          body: [
            "Bor bo'lsa oladi, yo'q bo'lsa yaratadi.",
            "Idempotent logika uchun qulay."
          ],
          codeSamples: [
            {
              title: "get_or_create",
              language: "python",
              code: 'obj, created = Product.objects.get_or_create(\n    title="Mouse",\n    defaults={"price": 50}\n)'
            }
          ]
        },
        {
          title: "08. update_or_create()",
          body: [
            "Bor bo'lsa update, yo'q bo'lsa create.",
            "Sync yoki import jarayonida ishlatiladi."
          ],
          codeSamples: [
            {
              title: "update_or_create",
              language: "python",
              code: 'obj, created = Product.objects.update_or_create(\n    title="Keyboard",\n    defaults={"price": 80}\n)'
            }
          ]
        },
        {
          title: "09. update()",
          body: [
            "QuerySet bo'yicha DBda to'g'ridan-to'g'ri update qiladi.",
            "save() va signal chaqirilmaydi."
          ],
          codeSamples: [
            {
              title: "update",
              language: "python",
              code: 'Product.objects.filter(id=1).update(price=1400)'
            }
          ]
        },
        {
          title: "10. delete()",
          body: [
            "QuerySetdagi obyektlarni o'chiradi.",
            "Careful: bu real DB delete."
          ],
          codeSamples: [
            {
              title: "delete",
              language: "python",
              code: 'Product.objects.filter(price__lt=10).delete()'
            }
          ]
        },
        {
          title: "11. first()",
          body: [
            "QuerySetdan birinchi obyektni oladi.",
            "Topilmasa None qaytaradi."
          ],
          codeSamples: [
            {
              title: "first",
              language: "python",
              code: 'Product.objects.order_by("id").first()'
            }
          ]
        },
        {
          title: "12. last()",
          body: [
            "QuerySetdan oxirgi obyektni oladi.",
            "Pagination va latest object uchun qulay."
          ],
          codeSamples: [
            {
              title: "last",
              language: "python",
              code: 'Product.objects.order_by("id").last()'
            }
          ]
        },
        {
          title: "13. exists()",
          body: [
            "QuerySetda object bor-yo'qligini tez tekshiradi.",
            "count() ga qaraganda tezroq."
          ],
          codeSamples: [
            {
              title: "exists",
              language: "python",
              code: 'Product.objects.filter(price__gt=1000).exists()'
            }
          ]
        },
        {
          title: "14. count()",
          body: [
            "QuerySetdagi elementlar sonini beradi.",
            "Statistika yoki pagination uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "count",
              language: "python",
              code: 'Product.objects.count()'
            }
          ]
        },
        {
          title: "15. order_by()",
          body: [
            "Natijani tartiblash uchun ishlatiladi.",
            "Minus belgisi teskari tartib."
          ],
          codeSamples: [
            {
              title: "order_by",
              language: "python",
              code: 'Product.objects.order_by("-created_at")'
            }
          ]
        },
        {
          title: "16. values()",
          body: [
            "Dict ko'rinishida result qaytaradi.",
            "API response uchun qulay."
          ],
          codeSamples: [
            {
              title: "values",
              language: "python",
              code: 'Product.objects.values("id", "title")'
            }
          ]
        },
        {
          title: "17. values_list()",
          body: [
            "Tuple yoki flat list qaytaradi.",
            "Yengil data olish uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "values_list",
              language: "python",
              code: 'Product.objects.values_list("title", flat=True)'
            }
          ]
        },
        {
          title: "18. distinct()",
          body: [
            "Takroriy qiymatlarni bitta qilib beradi.",
            "Join querylarda kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "distinct",
              language: "python",
              code: 'Product.objects.values("category").distinct()'
            }
          ]
        },
        {
          title: "19. select_related()",
          body: [
            "ForeignKey va OneToOne uchun join qiladi.",
            "N+1 ni kamaytiradi."
          ],
          codeSamples: [
            {
              title: "select_related",
              language: "python",
              code: 'Order.objects.select_related("user").all()'
            }
          ]
        },
        {
          title: "20. prefetch_related()",
          body: [
            "ManyToMany va reverse FK uchun ishlatiladi.",
            "Ko'p querylarni bitta prefetchga tushiradi."
          ],
          codeSamples: [
            {
              title: "prefetch_related",
              language: "python",
              code: 'Post.objects.prefetch_related("tags").all()'
            }
          ]
        }
      ],
      tips: [
        "exists() va count() farqini yodda tuting.",
        "select_related va prefetch_relatedni to'g'ri joyda ishlating.",
        "get() faqat bitta obyekt uchun."
      ]
    },
    terms: [
      { term: 'QuerySet', definition: 'Django ORM tomonidan qaytariladigan zanjirlanuvchi obyektlar to\'plami.' },
      { term: 'Manager', definition: 'Model.objects kabi kirish nuqtasi bo\'lib, QuerySet metodlarini beradi.' }
    ]
  },
  {
    dayNumber: 14,
    title: "Aggregations, Annotations & DB Functions",
    shortDescription: "Count, Avg, Cast va boshqa funksiyalar",
    longDescription: "Reporting va statistik APIlar uchun aggregation va DB funksiyalar zarur. Bugun Count, Sum, Avg, Cast, Coalesce kabi funksiyalarni amalda ishlatamiz.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "aggregate(), annotate() va DB funksiyalarni ishlatish.",
    whyItMatters: "Statistik dashboard, analytics va hisobotlar shularsiz bo'lmaydi.",
    doNotStudyToday: ['Celery tasks', 'Caching strategies'],
    deepWorkPlan: standardDeepWork("Aggregation mental modeli", "Annotate va funksiyalar", "Real report querylar"),
    tasks: [
      "Count va Avg bilan report chiqaring",
      "Annotate bilan per-row hisoblash qiling"
    ],
    exercises: [
      "Har bir authorning post_count ni annotate qiling."
    ],
    deliverable: "Aggregation va annotation bilan ishlovchi querylar to'plami.",
    checklist: [
      "aggregate va annotate farqini tushundim",
      "Count, Avg, Sum ishlatdim"
    ],
    readinessCriteria: [
      "Report query yozib bera olaman"
    ],
    commonMistakes: [
      "aggregate va annotate ni adashtirish",
      "Value va Cast importini unutish"
    ],
    ifStuck: "Django docsdagi Aggregation bo'limini o'qing.",
    lesson: {
      summary: "Aggregation va DB funksiyalar bilan statistik va reportlar qurishni o'rganasiz.",
      goals: [
        "aggregate va annotate ni farqlash",
        "Count, Avg, Sum, Min, Max ishlatish",
        "Cast, Coalesce, Concat kabi funksiyalarni qo'llash"
      ],
      sections: [
        {
          title: "01. aggregate()",
          body: [
            "aggregate umumiy hisob-kitob qaytaradi.",
            "Natija bitta dict bo'ladi."
          ],
          codeSamples: [
            {
              title: "aggregate",
              language: "python",
              code: 'from django.db.models import Sum\n\nOrder.objects.aggregate(total=Sum("amount"))'
            }
          ]
        },
        {
          title: "02. annotate()",
          body: [
            "annotate har bir qatorga hisoblangan qiymat qo'shadi.",
            "Bu per-row statistikaga kerak."
          ],
          codeSamples: [
            {
              title: "annotate",
              language: "python",
              code: 'from django.db.models import Count\n\nAuthor.objects.annotate(post_count=Count("posts"))'
            }
          ]
        },
        {
          title: "03. Count",
          body: [
            "Count nechta obyekt borligini hisoblaydi.",
            "Group by bilan ko'p ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Count",
              language: "python",
              code: 'Order.objects.values("status").annotate(total=Count("id"))'
            }
          ]
        },
        {
          title: "04. Sum",
          body: [
            "Sum umumiy yig'indni qaytaradi.",
            "Hisobotlarda kerak bo'ladi."
          ],
          codeSamples: [
            {
              title: "Sum",
              language: "python",
              code: 'from django.db.models import Sum\n\nProduct.objects.aggregate(total_stock=Sum("stock"))'
            }
          ]
        },
        {
          title: "05. Avg",
          body: [
            "Avg o'rtacha qiymatni hisoblaydi.",
            "Narx yoki reyting statistikasi uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Avg",
              language: "python",
              code: 'from django.db.models import Avg\n\nProduct.objects.aggregate(avg_price=Avg("price"))'
            }
          ]
        },
        {
          title: "06. Min",
          body: [
            "Min minimal qiymatni topadi.",
            "Masalan eng arzon product."
          ],
          codeSamples: [
            {
              title: "Min",
              language: "python",
              code: 'from django.db.models import Min\n\nProduct.objects.aggregate(min_price=Min("price"))'
            }
          ]
        },
        {
          title: "07. Max",
          body: [
            "Max maksimal qiymatni topadi.",
            "Masalan eng qimmat product."
          ],
          codeSamples: [
            {
              title: "Max",
              language: "python",
              code: 'from django.db.models import Max\n\nProduct.objects.aggregate(max_price=Max("price"))'
            }
          ]
        },
        {
          title: "08. Coalesce",
          body: [
            "Coalesce NULL bo'lsa boshqa qiymatni beradi.",
            "Discount bo'lmasa price ishlatish uchun qulay."
          ],
          codeSamples: [
            {
              title: "Coalesce",
              language: "python",
              code: 'from django.db.models.functions import Coalesce\n\nProduct.objects.annotate(final_price=Coalesce("discount_price", "price"))'
            }
          ]
        },
        {
          title: "09. Cast",
          body: [
            "Cast field turini o'zgartiradi.",
            "DB darajasida type conversion qiladi."
          ],
          codeSamples: [
            {
              title: "Cast",
              language: "python",
              code: 'from django.db import models\nfrom django.db.models.functions import Cast\n\nProduct.objects.annotate(price_float=Cast("price", output_field=models.FloatField()))'
            }
          ]
        },
        {
          title: "10. Concat",
          body: [
            "Concat matnlarni birlashtiradi.",
            "To'liq ism yoki label yasashda ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Concat",
              language: "python",
              code: 'from django.db.models import Value\nfrom django.db.models.functions import Concat\n\nUser.objects.annotate(full_name=Concat("first_name", Value(" "), "last_name"))'
            }
          ]
        },
        {
          title: "11. Length",
          body: [
            "Length matn uzunligini hisoblaydi.",
            "Matn bo'yicha saralashda foydali."
          ],
          codeSamples: [
            {
              title: "Length",
              language: "python",
              code: 'from django.db.models.functions import Length\n\nPost.objects.annotate(title_len=Length("title"))'
            }
          ]
        },
        {
          title: "12. Lower",
          body: [
            "Lower matnni kichik harfga o'tkazadi.",
            "Case-insensitive sort uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Lower",
              language: "python",
              code: 'from django.db.models.functions import Lower\n\nUser.objects.annotate(email_lower=Lower("email"))'
            }
          ]
        },
        {
          title: "13. Upper",
          body: [
            "Upper matnni katta harfga o'tkazadi.",
            "Standart formatga keltirishda yordam beradi."
          ],
          codeSamples: [
            {
              title: "Upper",
              language: "python",
              code: 'from django.db.models.functions import Upper\n\nUser.objects.annotate(email_upper=Upper("email"))'
            }
          ]
        },
        {
          title: "14. Substr",
          body: [
            "Substr matnning bir qismini oladi.",
            "Short code yoki preview yaratishda ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Substr",
              language: "python",
              code: 'from django.db.models.functions import Substr\n\nPost.objects.annotate(code=Substr("title", 1, 5))'
            }
          ]
        },
        {
          title: "15. TruncDate",
          body: [
            "TruncDate DateTime ni faqat sanaga qisqartiradi.",
            "Kunlik statistikaga kerak."
          ],
          codeSamples: [
            {
              title: "TruncDate",
              language: "python",
              code: 'from django.db.models.functions import TruncDate\n\nOrder.objects.annotate(day=TruncDate("created_at"))'
            }
          ]
        },
        {
          title: "16. TruncMonth",
          body: [
            "TruncMonth oyning boshlanishini beradi.",
            "Oylik reportlar uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "TruncMonth",
              language: "python",
              code: 'from django.db.models.functions import TruncMonth\n\nOrder.objects.annotate(month=TruncMonth("created_at"))'
            }
          ]
        },
        {
          title: "17. ExtractYear",
          body: [
            "ExtractYear yilni ajratib beradi.",
            "Yearly grouping uchun qulay."
          ],
          codeSamples: [
            {
              title: "ExtractYear",
              language: "python",
              code: 'from django.db.models.functions import ExtractYear\n\nOrder.objects.annotate(year=ExtractYear("created_at"))'
            }
          ]
        },
        {
          title: "18. Case/When",
          body: [
            "Case/When shartli hisoblash uchun ishlatiladi.",
            "SQL CASE ga teng."
          ],
          codeSamples: [
            {
              title: "Case When",
              language: "python",
              code: 'from django.db.models import Case, When, Value, IntegerField\n\nProduct.objects.annotate(\n    is_expensive=Case(\n        When(price__gt=1000, then=Value(1)),\n        default=Value(0),\n        output_field=IntegerField()\n    )\n)'
            }
          ]
        },
        {
          title: "19. Value",
          body: [
            "Value konstant qiymat qo'shadi.",
            "Annotate yoki Concatda ishlatiladi."
          ],
          codeSamples: [
            {
              title: "Value",
              language: "python",
              code: 'from django.db.models import Value\n\nProduct.objects.annotate(source=Value("imported"))'
            }
          ]
        },
        {
          title: "20. ExpressionWrapper",
          body: [
            "ExpressionWrapper murakkab hisoblashlarda type beradi.",
            "F expressions bilan birga ishlatiladi."
          ],
          codeSamples: [
            {
              title: "ExpressionWrapper",
              language: "python",
              code: 'from django.db.models import F, ExpressionWrapper, DecimalField\n\nOrder.objects.annotate(\n    total=ExpressionWrapper(F("price") * F("qty"), output_field=DecimalField(max_digits=10, decimal_places=2))\n)'
            }
          ]
        }
      ],
      tips: [
        "aggregate - bitta natija, annotate - per-row natija.",
        "Count va Sum ko'p ishlatiladigan report funksiyalar.",
        "Type conversion uchun Cast ishlating."
      ]
    },
    terms: [
      { term: 'Aggregate', definition: 'Umumiy statistikani hisoblaydigan ORM funksiyalari (Sum, Avg, Count).' },
      { term: 'Annotation', definition: 'Har bir rowga hisoblangan qiymat qo\'shish jarayoni.' }
    ]
  },
  {
    dayNumber: 15,
    title: "Advanced ORM: Q, F, Subquery, Transactions",
    shortDescription: "Murakkab querylar va expressionlar",
    longDescription: "Bugun murakkab filter, expression va subquerylar bilan ishlaymiz. Q, F, Subquery, OuterRef va select_for_update orqali professional querylar yozasiz.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "Q va F expressions, Subquery va transaction.atomic ishlatish.",
    whyItMatters: "Murakkab biznes qoidalarini ORM ichida xavfsiz va tez yozish kerak bo'ladi.",
    doNotStudyToday: ['Full text search', 'Caching layers'],
    deepWorkPlan: standardDeepWork("Q/F mental modeli", "Subquery va OuterRef", "Transactions va locking"),
    tasks: [
      "Q object bilan OR va NOT filter yozing",
      "Subquery bilan annotate qilib ko'ring",
      "select_for_update ni atomic ichida sinab ko'ring"
    ],
    exercises: [
      "F expression yordamida stock ni kamaytirish yozing."
    ],
    deliverable: "Advanced querylar to'plami va test skriptlar.",
    checklist: [
      "Q object ishlatdim",
      "Subquery va OuterRef tushundim",
      "atomic bilan lock qildim"
    ],
    readinessCriteria: [
      "Murakkab querylarni ORM ichida ifodalay olaman"
    ],
    commonMistakes: [
      "Q object importini unutish",
      "select_for_update ni atomic tashqarida ishlatish"
    ],
    ifStuck: "Django docsdagi Expressions va Subquery bo'limlarini o'qing.",
    lesson: {
      summary: "Advanced ORM bilan murakkab filter, expression va subquerylar qurishni o'rganasiz.",
      goals: [
        "Q va F expressions bilan ishlash",
        "Subquery va OuterRef tushunchasini o'zlashtirish",
        "Transaction va locking logikasini bilish"
      ],
      sections: [
        {
          title: "01. Q object (OR)",
          body: [
            "Q object OR shartlar yozish uchun ishlatiladi.",
            "Oddiy filterlar faqat AND bo'ladi."
          ],
          codeSamples: [
            {
              title: "Q OR",
              language: "python",
              code: 'from django.db.models import Q\n\nProduct.objects.filter(Q(price__lt=100) | Q(title__icontains="promo"))'
            }
          ]
        },
        {
          title: "02. Q object (AND)",
          body: [
            "Q object AND uchun ham ishlatiladi.",
            "Murakkab shartlar uchun qulay."
          ],
          codeSamples: [
            {
              title: "Q AND",
              language: "python",
              code: 'from django.db.models import Q\n\nProduct.objects.filter(Q(is_active=True) & Q(stock__gt=0))'
            }
          ]
        },
        {
          title: "03. Q object (NOT)",
          body: [
            "~Q orqali shartni inkor qilish mumkin.",
            "Exclude bilan bir xil, lekin murakkabroq."
          ],
          codeSamples: [
            {
              title: "Q NOT",
              language: "python",
              code: 'from django.db.models import Q\n\nProduct.objects.filter(~Q(status="archived"))'
            }
          ]
        },
        {
          title: "04. Q object va related lookup",
          body: [
            "Q object bilan related lookup yozish mumkin.",
            "Bu joinli filterlar uchun kerak."
          ],
          codeSamples: [
            {
              title: "Q related",
              language: "python",
              code: 'from django.db.models import Q\n\nOrder.objects.filter(Q(user__email__icontains="@gmail.com"))'
            }
          ]
        },
        {
          title: "05. F expression (compare)",
          body: [
            "F DBdagi fieldlarni o'zaro solishtiradi.",
            "Python emas, DB darajasida ishlaydi."
          ],
          codeSamples: [
            {
              title: "F compare",
              language: "python",
              code: 'from django.db.models import F\n\nProduct.objects.filter(discount_price__lt=F("price"))'
            }
          ]
        },
        {
          title: "06. F expression (arithmetic)",
          body: [
            "F expression bilan fieldga arifmetik qo'shish mumkin.",
            "Masalan rezervdan ko'p stockni topish."
          ],
          codeSamples: [
            {
              title: "F arithmetic",
              language: "python",
              code: 'from django.db.models import F\n\nProduct.objects.filter(stock__gt=F("reserved") + 5)'
            }
          ]
        },
        {
          title: "07. F update (increment/decrement)",
          body: [
            "F bilan update qilinsa race condition kamayadi.",
            "Stock kamaytirish uchun ideal."
          ],
          codeSamples: [
            {
              title: "F update",
              language: "python",
              code: 'from django.db.models import F\n\nProduct.objects.update(stock=F("stock") - 1)'
            }
          ]
        },
        {
          title: "08. Case/When bilan shartli update",
          body: [
            "Case/When bilan shartli qiymat berish mumkin.",
            "Bu DB darajasida ishlaydi."
          ],
          codeSamples: [
            {
              title: "Case update",
              language: "python",
              code: 'from django.db.models import Case, When, Value, IntegerField\n\nProduct.objects.update(\n    priority=Case(\n        When(stock__gt=0, then=Value(1)),\n        default=Value(0),\n        output_field=IntegerField()\n    )\n)'
            }
          ]
        },
        {
          title: "09. Subquery (id list)",
          body: [
            "Subquery boshqa QuerySet natijasini ishlatadi.",
            "IN filterlar uchun juda qulay."
          ],
          codeSamples: [
            {
              title: "Subquery",
              language: "python",
              code: 'from django.db.models import Subquery\n\nids = Order.objects.filter(status="paid").values("user_id")\nUser.objects.filter(id__in=Subquery(ids))'
            }
          ]
        },
        {
          title: "10. OuterRef",
          body: [
            "OuterRef subqueryda tashqi query fieldini ishlatish uchun kerak.",
            "Per-row subquery logikasini beradi."
          ],
          codeSamples: [
            {
              title: "OuterRef",
              language: "python",
              code: 'from django.db.models import OuterRef, Subquery\n\nlatest = Comment.objects.filter(post=OuterRef("pk")).order_by("-created_at").values("text")[:1]\nPost.objects.annotate(last_comment=Subquery(latest))'
            }
          ]
        },
        {
          title: "11. Exists",
          body: [
            "Exists subquery bo'lsa True/False beradi.",
            "Bor-yo'qlik tekshiruvi uchun tez."
          ],
          codeSamples: [
            {
              title: "Exists",
              language: "python",
              code: 'from django.db.models import Exists, OuterRef\n\nPost.objects.annotate(has_comments=Exists(Comment.objects.filter(post=OuterRef("pk"))))'
            }
          ]
        },
        {
          title: "12. Subquery annotate value",
          body: [
            "Subquery natijasini annotate qilib field sifatida olasiz.",
            "Misol: oxirgi narx."
          ],
          codeSamples: [
            {
              title: "Subquery annotate",
              language: "python",
              code: 'from django.db.models import OuterRef, Subquery\n\nlatest = Price.objects.filter(product=OuterRef("pk")).order_by("-created_at").values("value")[:1]\nProduct.objects.annotate(last_price=Subquery(latest))'
            }
          ]
        },
        {
          title: "13. Prefetch with queryset",
          body: [
            "Prefetch ichida custom queryset berish mumkin.",
            "Filtrlangan relatedlarni olish uchun qulay."
          ],
          codeSamples: [
            {
              title: "Prefetch",
              language: "python",
              code: 'from django.db.models import Prefetch\n\nPost.objects.prefetch_related(\n    Prefetch("comments", queryset=Comment.objects.filter(is_public=True))\n)'
            }
          ]
        },
        {
          title: "14. select_for_update + atomic",
          body: [
            "select_for_update qatorni lock qiladi.",
            "Faqat transaction.atomic ichida ishlaydi."
          ],
          codeSamples: [
            {
              title: "select_for_update",
              language: "python",
              code: 'from django.db import transaction\n\nwith transaction.atomic():\n    order = Order.objects.select_for_update().get(id=1)\n    order.status = "paid"\n    order.save()'
            }
          ]
        },
        {
          title: "15. transaction.atomic",
          body: [
            "Bir nechta DB amallarini bitta tranzaksiyada bajaradi.",
            "Xatolik bo'lsa hammasi rollback bo'ladi."
          ],
          codeSamples: [
            {
              title: "atomic",
              language: "python",
              code: 'from django.db import transaction\n\nwith transaction.atomic():\n    wallet.balance -= 100\n    wallet.save()\n    Payment.objects.create(user=wallet.user, amount=100)'
            }
          ]
        },
        {
          title: "16. using()",
          body: [
            "Bir nechta database bo'lsa using() bilan tanlanadi.",
            "Replica yoki sharding uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "using",
              language: "python",
              code: 'Product.objects.using("replica").all()'
            }
          ]
        },
        {
          title: "17. only()",
          body: [
            "Faqat kerakli fieldlarni yuklaydi.",
            "Katta obyektlarni tezroq olish uchun."
          ],
          codeSamples: [
            {
              title: "only",
              language: "python",
              code: 'Product.objects.only("id", "title")'
            }
          ]
        },
        {
          title: "18. defer()",
          body: [
            "Og'ir fieldlarni keyinroq yuklaydi.",
            "Large text yoki json uchun foydali."
          ],
          codeSamples: [
            {
              title: "defer",
              language: "python",
              code: 'Product.objects.defer("description")'
            }
          ]
        },
        {
          title: "19. iterator()",
          body: [
            "Katta datani memoryni to'ldirmasdan oqimda beradi.",
            "Batch processing uchun kerak."
          ],
          codeSamples: [
            {
              title: "iterator",
              language: "python",
              code: 'for p in Product.objects.iterator(chunk_size=1000):\n    print(p.id)'
            }
          ]
        },
        {
          title: "20. explain()",
          body: [
            "Query planini ko'rsatadi.",
            "Performance tuning uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "explain",
              language: "python",
              code: 'Product.objects.filter(price__gt=100).explain()'
            }
          ]
        }
      ],
      tips: [
        "Q object bilan OR va NOT yozishni yodda tuting.",
        "select_for_update faqat atomic ichida ishlaydi.",
        "Subquery va OuterRef murakkab querylar uchun kuchli qurol."
      ]
    },
    terms: [
      { term: 'Q object', definition: 'OR/NOT kabi murakkab shartlarni yozish uchun ishlatiladigan Django klassi.' },
      { term: 'F expression', definition: 'DB fieldlari ustida Python emas, DB darajasida hisoblash uchun ishlatiladi.' }
    ]
  },
  {
    dayNumber: 16,
    title: "Custom Managers, Constraints & Indexes",
    shortDescription: "Professional ORM arxitekturasi",
    longDescription: "Bugun custom manager, queryset metodlari, constraint va indexlar orqali ORM arxitekturasini professional darajaga olib chiqamiz.",
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: "Custom manager, constraints va bulk operations ishlatish.",
    whyItMatters: "Katta loyihada toza QuerySet va constraints data sifatini saqlaydi va performance oshiradi.",
    doNotStudyToday: ['Microservices', 'Caching layer'],
    deepWorkPlan: standardDeepWork("Manager va QuerySet", "Constraints va indexes", "Bulk va optimization"),
    tasks: [
      "Custom manager yozing",
      "UniqueConstraint va CheckConstraint qo'shing",
      "bulk_update bilan test qiling"
    ],
    exercises: [
      "Soft delete pattern yozib ko'ring."
    ],
    deliverable: "Custom manager, constraint va indexlar bilan boyitilgan model.",
    checklist: [
      "Manager va QuerySet farqini bilaman",
      "Constraints ishlatdim",
      "bulk_update/bulk_create yozdim"
    ],
    readinessCriteria: [
      "ORMni strukturali va scalable yozaman"
    ],
    commonMistakes: [
      "Custom managerda get_querysetni unutish",
      "Constraint nomini takrorlash"
    ],
    ifStuck: "Django docsdagi Managers va Constraints bo'limini o'qing.",
    lesson: {
      summary: "Custom managerlar va constraints orqali ORMni professional holatga keltirasiz.",
      goals: [
        "Custom manager va queryset yaratish",
        "Constraints va indexes bilan data sifatini saqlash",
        "Bulk operatsiyalarni tushunish"
      ],
      sections: [
        {
          title: "01. Custom Manager yaratish",
          body: [
            "Manager querylarni central joyda boshqaradi.",
            "get_queryset override qilinadi."
          ],
          codeSamples: [
            {
              title: "Manager",
              language: "python",
              code: 'class ActiveManager(models.Manager):\n    def get_queryset(self):\n        return super().get_queryset().filter(is_active=True)'
            }
          ]
        },
        {
          title: "02. Custom QuerySet",
          body: [
            "QuerySet class ichida reusable metodlar yoziladi.",
            "Chaining uchun juda qulay."
          ],
          codeSamples: [
            {
              title: "QuerySet",
              language: "python",
              code: 'class ProductQuerySet(models.QuerySet):\n    def available(self):\n        return self.filter(stock__gt=0)'
            }
          ]
        },
        {
          title: "03. as_manager()",
          body: [
            "Custom QuerySetni managerga aylantiradi.",
            "Product.objects.available() ishlaydi."
          ],
          codeSamples: [
            {
              title: "as_manager",
              language: "python",
              code: 'class Product(models.Model):\n    objects = ProductQuerySet.as_manager()'
            }
          ]
        },
        {
          title: "04. Soft delete pattern",
          body: [
            "Real delete o'rniga is_deleted ishlatiladi.",
            "Manager faqat faol obyektlarni qaytaradi."
          ],
          codeSamples: [
            {
              title: "soft delete",
              language: "python",
              code: 'class SoftDeleteManager(models.Manager):\n    def get_queryset(self):\n        return super().get_queryset().filter(is_deleted=False)'
            }
          ]
        },
        {
          title: "05. Manager method",
          body: [
            "Manager ichida custom filter metodlari yoziladi.",
            "Kod takrorlanishini kamaytiradi."
          ],
          codeSamples: [
            {
              title: "manager method",
              language: "python",
              code: 'class OrderManager(models.Manager):\n    def paid(self):\n        return self.filter(status="paid")'
            }
          ]
        },
        {
          title: "06. Meta ordering",
          body: [
            "Default tartibni belgilaydi.",
            "Har bir QuerySetga ta'sir qiladi."
          ],
          codeSamples: [
            {
              title: "ordering",
              language: "python",
              code: 'class Post(models.Model):\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    class Meta:\n        ordering = ["-created_at"]'
            }
          ]
        },
        {
          title: "07. Meta indexes",
          body: [
            "Indexlar qidiruvni tezlashtiradi.",
            "fields ro'yxati bilan beriladi."
          ],
          codeSamples: [
            {
              title: "indexes",
              language: "python",
              code: 'class Product(models.Model):\n    title = models.CharField(max_length=200)\n\n    class Meta:\n        indexes = [models.Index(fields=["title"])]'
            }
          ]
        },
        {
          title: "08. Index name",
          body: [
            "Indexga nom berish DBda boshqarishni osonlashtiradi.",
            "Migrationlar aniq bo'ladi."
          ],
          codeSamples: [
            {
              title: "index name",
              language: "python",
              code: 'models.Index(fields=["created_at"], name="idx_created_at")'
            }
          ]
        },
        {
          title: "09. UniqueConstraint",
          body: [
            "Bir nechta field kombinatsiyasini unique qiladi.",
            "Composite unique uchun ishlatiladi."
          ],
          codeSamples: [
            {
              title: "UniqueConstraint",
              language: "python",
              code: 'class Meta:\n    constraints = [\n        models.UniqueConstraint(fields=["user", "code"], name="uniq_user_code")\n    ]'
            }
          ]
        },
        {
          title: "10. CheckConstraint",
          body: [
            "CheckConstraint qiymatni tekshiradi.",
            "Masalan price 0 dan katta bo'lishi kerak."
          ],
          codeSamples: [
            {
              title: "CheckConstraint",
              language: "python",
              code: 'class Meta:\n    constraints = [\n        models.CheckConstraint(check=models.Q(price__gte=0), name="price_gte_0")\n    ]'
            }
          ]
        },
        {
          title: "11. Conditional UniqueConstraint",
          body: [
            "Condition bilan unique faqat ma'lum holatlarda ishlaydi.",
            "Masalan faqat active userlar uchun."
          ],
          codeSamples: [
            {
              title: "Conditional unique",
              language: "python",
              code: 'class Meta:\n    constraints = [\n        models.UniqueConstraint(\n            fields=["email"],\n            condition=models.Q(is_active=True),\n            name="uniq_active_email"\n        )\n    ]'
            }
          ]
        },
        {
          title: "12. db_index",
          body: [
            "Fieldga db_index qo'ysangiz tezroq filter bo'ladi.",
            "Katta bazalarda juda muhim."
          ],
          codeSamples: [
            {
              title: "db_index",
              language: "python",
              code: 'email = models.EmailField(db_index=True)'
            }
          ]
        },
        {
          title: "13. bulk_update",
          body: [
            "Ko'p obyektni biryo'la update qiladi.",
            "Signal chaqirilmaydi, lekin tez."
          ],
          codeSamples: [
            {
              title: "bulk_update",
              language: "python",
              code: 'products = list(Product.objects.all()[:2])\nproducts[0].price = 10\nproducts[1].price = 20\nProduct.objects.bulk_update(products, ["price"])'
            }
          ]
        },
        {
          title: "14. bulk_create ignore_conflicts",
          body: [
            "ignore_conflicts=True bo'lsa unique xatolarni o'tkazib yuboradi.",
            "Seed va import uchun foydali."
          ],
          codeSamples: [
            {
              title: "ignore_conflicts",
              language: "python",
              code: 'Product.objects.bulk_create([\n    Product(title="A"),\n    Product(title="B")\n], ignore_conflicts=True)'
            }
          ]
        },
        {
          title: "15. Managerda select_related",
          body: [
            "Manager metodida select_related qaytarilsa querylar tezlashadi.",
            "API da qayta ishlash oson."
          ],
          codeSamples: [
            {
              title: "manager select_related",
              language: "python",
              code: 'class OrderManager(models.Manager):\n    def with_user(self):\n        return self.select_related("user")'
            }
          ]
        },
        {
          title: "16. Managerda prefetch_related",
          body: [
            "ManyToMany uchun prefetch_related managerda beriladi.",
            "Performance uchun foydali."
          ],
          codeSamples: [
            {
              title: "manager prefetch",
              language: "python",
              code: 'class PostManager(models.Manager):\n    def with_tags(self):\n        return self.prefetch_related("tags")'
            }
          ]
        },
        {
          title: "17. Managerda select_for_update",
          body: [
            "Lock kerak bo'lgan querylar managerda jamlanadi.",
            "Transaction ichida ishlatiladi."
          ],
          codeSamples: [
            {
              title: "manager lock",
              language: "python",
              code: 'class WalletManager(models.Manager):\n    def locked(self):\n        return self.select_for_update()'
            }
          ]
        },
        {
          title: "18. Constraint with F",
          body: [
            "CheckConstraint ichida F expression ishlatish mumkin.",
            "Masalan end_date start_date dan katta bo'lishi kerak."
          ],
          codeSamples: [
            {
              title: "F constraint",
              language: "python",
              code: 'class Meta:\n    constraints = [\n        models.CheckConstraint(\n            check=models.Q(end_date__gte=models.F("start_date")),\n            name="end_after_start"\n        )\n    ]'
            }
          ]
        },
        {
          title: "19. Constraints list",
          body: [
            "Bir nechta constraintni bitta listda berish mumkin.",
            "Schema qoidalarini bir joyga to'playdi."
          ],
          codeSamples: [
            {
              title: "constraints list",
              language: "python",
              code: 'class Meta:\n    constraints = [\n        models.UniqueConstraint(fields=["code"], name="uniq_code"),\n        models.CheckConstraint(check=models.Q(price__gte=0), name="price_gte_0")\n    ]'
            }
          ]
        },
        {
          title: "20. Managerdan foydalanish",
          body: [
            "Custom manager metodlari service va viewlarda ishlatiladi.",
            "Kod takrorlanishini kamaytiradi."
          ],
          codeSamples: [
            {
              title: "use manager",
              language: "python",
              code: 'def list_available():\n    return Product.objects.available().only("id", "title")'
            }
          ]
        }
      ],
      tips: [
        "Constraints data sifatini himoya qiladi.",
        "Custom manager kodni markazlashtiradi.",
        "bulk_update va bulk_create katta datada foydali."
      ]
    },
    terms: [
      { term: 'Manager', definition: 'Model.objects orqali querylarni boshqaradigan klass.' },
      { term: 'Constraint', definition: 'DB darajasida data qoidalarini majburlovchi shartlar.' }
    ]
  },
  {
    dayNumber: 17,
    title: 'Custom User Model (AbstractUser)',
    shortDescription: 'Authentication sistemni o\'z qo\'lga olish',
    longDescription: 'Loyihangizda Username emas Email bilan login qilishni xohlaysizmi? Yoki userga avatar, telefon fieldlari kerakmi? Unda default User yetmaydi. Bizga AbstractUser dan Custom User loyihalash zaruratdir.',
    category: 'Project Structure & Clean Architecture',
    islandId: 'django-arch',
    difficulty: 'Qiyin',
    todayFocus: 'AUTH_USER_MODEL ni overwrite qilish va unga yangi fieldlar ulab migrate qilish.',
    whyItMatters: 'Proyektning eng birinchi qadamidayoq Custom User qo\'klanishi belgilab olinmasa, o\'rtasida bazani qulatib yuborish extimoli 90% ga teng.',
    doNotStudyToday: ['AbstractBaseUser (Bu juda pastki daraja boshdan yozish)'],
    deepWorkPlan: [
      { label: 'AbstractUser dan inherits', durationMinutes: 40, description: 'Custom class ochish va AUTH_USER_MODEL e\'lon qilish' }
    ],
    tasks: ['Istalgan loyiha (oldin migrate qilinmagan) da users app oching', 'models.py da CustomUser(AbstractUser) yozing', 'settings da e\'lon qilib song migrate bering'],
    exercises: ['Yangi tushgan bazaga email orqali username siz ro\'yxatdan otish algoritmini customizatsiya qiling'],
    deliverable: 'Toliq o\'zgartirilgan telefon va rasm fieldlariga ega CustomUser arxitekturasi.',
    checklist: ['AUTH_USER_MODEL sozlandi', 'Loyihani 0 dan qilib keyin migrate beringdingiz (Aks xolda xato ketadi)'],
    readinessCriteria: ['O\'z platformangiz uchun standart bo\'lmagan custom account logikalariga erkin qo\'llar.'],
    commonMistakes: ['Eskidan User jadvali bor DB da AUTH_USER_MODEL ni yozish. (MIGRATE xatosiga uchraysiz, db ni noldan drop qiling)'],
    ifStuck: 'Documentation dagi "Substituting a custom User model" maqolasi aynan shu haqida.',
    lesson: {
      summary: "Iloji boricha har bir yangi Proyektda default User ishlatsangiz xam ushbu bo'sh CustomUser yozib oling (Kelajakka sarmoya).",
      goals: ["Standart tizimni parchalab Customizatsiyaga ulash"],
      sections: []
    },
    terms: []
  },
  {
    dayNumber: 18,
    title: 'Middlewares in Depth (Backend Gateways)',
    shortDescription: 'So\'rov va javob o\'rtasidagi devor',
    longDescription: 'Middlewares (O\'rta qatlam). Har bir kelayotgan request View ga yetib kelishidan oldin va Viewdan chiqib JSON ketishidan oldin shu qatlamlardan o\'tadi. Biz bunda login tekshiruvi, performance logging, yoki request bloklash kabi muhim "Global" shartlarni e\'lon qilamiz.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'Custom Middleware yozish, uni settings.py ga ulash.',
    whyItMatters: 'Platformada hammaga daxldor bo\'lgan "Qoida" larni har bir View da yozib chiqmaslik uchun aynan bitta joyga (Middleware ga) yoziladi. DRY (Don\'t repeat yourself)!',
    doNotStudyToday: ['Asynchronous Middlewares'],
    deepWorkPlan: [
      { label: 'Logika sikli', durationMinutes: 30, description: 'Middleware qanday ketma ketlikda ishlashini tushunib yetish' },
      { label: 'Log Middleware amaliyoti', durationMinutes: 60, description: 'Ham bir requestni db g yoki faylga Log qilib boruvchi qatlam.' }
    ],
    tasks: ['middlewares.py fayli oching', 'Klass asosida __init__ va __call__ metodlarini e\'lon qiling', 'Har request qancha sekunda vizvol bo\'lganini xisoblasb printga chiqarvchi tool yasang'],
    exercises: ['Bironta qora royxatdagi ip lardan zapros kelsa View ga otkazdirme "BLOKLANGAN" degan JSON qaytarib yuboring (Firewall simulation)'],
    deliverable: 'To\'liq request larni boshqaruvchi Custom Middleware fayli.',
    checklist: ['__call__ metdo ishlati', 'MIDDLEWARES listiga ulandi'],
    readinessCriteria: ['Butun proyekt requestlarini bitta joydam kontrol qila olish kuchi.'],
    commonMistakes: ['Middelwearda response ni return qilme ketish (bu holda server ishlame osilib qoladi)'],
    ifStuck: 'Settings dagi default middleware larga qarang',
    lesson: {
    summary: "Foydalanuvchilarni guruhlarga bo'lish va resurslarga huquq (permissions) berish.",
    goals: [
        "Group modellari",
        "has_permission() amaliyoti"
    ],
    sections: [
        {
            title: "01. Gruppa va permission ulash",
            body: [
                "Djangoda tayyor Group va Permission jadvallari bor."
            ],
            codeSamples: [
                {
                    title: "groups",
                    language: "python",
                    code: "managers_group, created = Group.objects.get_or_create(name='Managers')\nuser.groups.add(managers_group)"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 19,
    title: 'Performance: select_related & prefetch_related',
    shortDescription: 'N+1 xatoliklari muammosi va uning yechimi',
    longDescription: 'Backenddagi 80% tezlik bilan bog\'liq muammolar bazaga noto\'g\'ri so\'rov jo\'natish - ya\'ni N+1 xatosi orqali kelib chidqai. For aylanmasida foreign key ishlatib serverni asabbuzar darajada qotirib qoymaslik sirlari bugsunday organiladi.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'Qiyin',
    todayFocus: 'N+1 nimaligini amalda ko\'rish va uni Joined/Prefetch query lar yordamida qisqartirish.',
    whyItMatters: 'Siz Strong Junior yoki Middle ekaningiz interyuda aniq so\'raladigan narsa shu - N+1 dushmani ustidan g\'alabayiz.',
    doNotStudyToday: ['Redis Data Caching', 'Database Indexing'],
    deepWorkPlan: [
      { label: 'N+1 diagnostikasi', durationMinutes: 40, description: 'Loop ichida ForeignKey ni chaqirib Logda necha marta 100 martalab SQL run bomayotganiga guvoh bo\'lish' },
      { label: 'Yechim', durationMinutes: 60, description: 'select_related() bilan JOIN qilib vaqtini 10 marrtaga optimizatsiya qilish' }
    ],
    tasks: ['django-debug-toolbar o\'rnating', 'Model ro\'yhatini loop qilib html mas json da render qiling (foreign key lari bn)', 'Toolbar dagi sql tabni ochib n+1 yuz berganini koring', 'Queryga .select_related() ulab SQL 1 taga tushganini sezing'],
    exercises: ['Ko\'pga-ko\'p (ManyToMany) ulanishlar uchun select_related mas prefetch_related ishlatib 10mingta maxsulotlik db ni qotmesligini ta\'minlang'],
    deliverable: '10-20ms tezlida ishleygan backend qatlam.',
    checklist: ['debug-toolbar ishladi', 'SQL so\'rovlar 1-2 taga tushirildi'],
    readinessCriteria: ['Ko\'r-ko\'rona obyekts.all() ishlatmay logikaga SQL tomonidan baho bera olish.'],
    commonMistakes: ['ManyToMany ni .select_related deb yozib hatoga tushishi (JOIN ishlameydi bunday vaziyatda prefetch_ kerak)'],
    ifStuck: 'DB queries sectionini o\'qing',
    lesson: {
    summary: "Request -> Middleware -> View zanjirigacha. Backend gate-keeper yasash.",
    goals: [
        "Middleware logikasi",
        "__call__ metodi orqali ushlab qolish"
    ],
    sections: [
        {
            title: "01. Middleware klassi",
            body: [
                "__init__ bir marta server yoqilganda o'qiydi, __call__ har so'rovda ishladi."
            ],
            codeSamples: [
                {
                    title: "middlewares.py",
                    language: "python",
                    code: "class SimpleMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n    def __call__(self, request):\n        print('Request is arriving')\n        response = self.get_response(request)\n        print('Response is leaving')\n        return response"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 20,
    title: 'Database Indexing & Query Optimization',
    shortDescription: 'Millionlab qatorlarda qidiruvni tezlashtirish',
    longDescription: 'Bazada 10ta malumotda hamma API tez ishlaydi, lekin kattalashgach sekinlashadi. Bugun indexlar qanday ishlashi (btree), qayerga index qoyish kerak - db_index=True haqida gaplashamiz.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'Aynan kop qidirilinadigan ustunlarga `db_index=True` qoshish va Meta optionsdagi indexes.',
    whyItMatters: 'Performance - bu backend. User uzoq kutib turmaydi, indexing bilan 100 seconds oladigan qidiruvni millisecondsga tushirasiz.',
    doNotStudyToday: ['FullTextSearchPostgres (murakablari keyinga)'],
    deepWorkPlan: [
      { label: 'Table Scan vs Index e\'tiqodi', durationMinutes: 40, description: 'Indekssiz va Indexli filtr vaqtini EXPLAIN orqali solishtrish.' }
    ],
    tasks: ['Shell dan 100,000 ta obyekti bor Dummy data loopda generatsiya qilib saqlang (faker)', 'Shell ni uziida .filter() bn ismini qidiring va qancha vaqqt olishni python time ulan o\'lchab oling', 'Field ga db_index=True qilib migrate deng va yana qidiring (Tezlashshini his qilingiz!'],
    exercises: ['Ikki va undan ortif fieldlarni qoshma indeks qilish indekslarini (index_together) koring'],
    deliverable: 'Haqiqiy Data Engineer\'lardek massiv datani filterlay oladigan loyiha.',
    checklist: ['Indexlar keraksiz joyga qo\'yilmasligi sababini bilyabman', 'Migrate dan song tezlshdi'],
    readinessCriteria: ['"Tezkor qidiruv nega sekinroq write(Insert) larni keltrib chkaradi" - shu savolga javaob berish !'],
    commonMistakes: ['Barcha fieldlarga index=True qo\'yi chiqish - Bu database ni xotirasini(operativ)ni portlatadi, va yaratishlarni asrzini sekin qladi'],
    ifStuck: 'Postgres SQL index mechanisms degan qidiruv qiling',
    lesson: {
    summary: "Sekin API'larni xaloq qilib tashlaydigan unumdorlik (N+1) muammosiga optimizatsiya yechimlari.",
    goals: [
        "select_related (JOIN)",
        "prefetch_related (In operator) bilan ishlash"
    ],
    sections: [
        {
            title: "01. N+1 simulyatsiyasi",
            body: [
                "Tasavvur qiling 100ta kitob bo'lsa, ularning avtorlarini .author deb for ichida chaqirsangiz (N=100) va yana 1 (O'zining) so'rovi ketadi."
            ],
            codeSamples: [
                {
                    title: "Bad Code",
                    language: "python",
                    code: "books = Book.objects.all()\nfor b in books:\n    print(b.author.name) # 100 ta SQL!"
                }
            ]
        },
        {
            title: "02. select_related yechimi",
            body: [
                "Bu SQL JOIN qoshadi va bor-yog'i 1ta SQL so'rovi bilan hamma ma'lumotni xotiraga tortib tayyorlab beradi."
            ],
            codeSamples: [
                {
                    title: "Optimized",
                    language: "python",
                    code: "books = Book.objects.select_related('author').all()\nfor b in books:\n    print(b.author.name) # 1 ta SQL!"
                }
            ]
        }
    ]
},
    terms: []
  }
,

  {
    dayNumber: 21,
    title: 'Database Transactions (Atomicity)',
    shortDescription: 'All or Nothing - Mantiqiy jarayonlar butunligi',
    longDescription: 'Tasavvur qiling pul o\'tkazish(transaksiya) ketyabdi. Yuboruvchining balansi kamaydi, lekin qabul qiluvchiga yetib borishida xatolik yuz berib Server quladi. Natija: Pul havoga uchib ketdi! Bunday xavfli vaziyatlarni oldini olish uchun django.db.transaction degan "Qalqon" bor.',
    category: 'Auth, Validation & Business Logic',
    islandId: 'django-auth',
    difficulty: 'O\'rtacha',
    todayFocus: 'transaction.atomic() orqali "Yoki to\'liq ishlaydi, yoki umuman hech narsa o\'zgarmaydi" qoidasiga o\'tish.',
    whyItMatters: 'API orqali Buyurtma (Order) va To\'lov (Payment)ni bir vaqtda saqlab ishonchli backend yasash uchun buni bilish shart.',
    doNotStudyToday: ['Database locking', 'Isolation levels (O\'ta teran Postgres sozlamalari)'],
    deepWorkPlan: [
      { label: 'Atomic blok tushunchasi', durationMinutes: 40, description: 'Bank transferlar misolida tranzaksiya mantiqini qo\'llash va testlash' }
    ],
    tasks: ['Ikki xil Model obyektlarida bitta vaqtda update yozing (Service qatlamda)', 'with transaction.atomic() bloki doirasiga oling', 'Ikkinchi amalda bila turib Exception (xatolik) chaqiring va birinchi obyekt asli orqaga qaytganini tahlil qilib o\'rganing'],
    exercises: ['Bir muncha vaqt ishlashini kutib, agar 5 sekundan ko\'p olsa rollback (bekor) qilish amaliyotini ko\'ring.'],
    deliverable: 'Yechimi himoyalangan va havoga datani puflamaydigan Pul o\'tkazma logikasi.',
    checklist: ['atomic() blokida Try-except larni tog\'ri e\'lon qildingiz', 'Pul transferi xato bersa ham balancelar chalkashib ketmadi'],
    readinessCriteria: ['"Bank Transaction" kabi misollarda mustaqil xatosiz db aloqasini qurish.'],
    commonMistakes: ['Try-except ni atomic () dan ichkariga qo\'yib, djangoga rollback imkonini bermay o\'zib qo\'yish (XATO!)'],
    ifStuck: 'Django Transaction documentationini boshidan "Controlling transactions" bo\'limini o\'qing',
    lesson: {
    summary: "Database tranzaksiyalari (Transanctions). O'zgarishlarning yarmida portlamasligi uchun xavfsizlik.",
    goals: [
        "One block logical save",
        "transaction.atomic() logikasi"
    ],
    sections: [
        {
            title: "01. Atomic decoratori",
            body: [
                "Xato yuz bersa, bajarilgan o'zgarishlar bekor (rollback) qilinishi kafolatlanadi."
            ],
            codeSamples: [
                {
                    title: "Transaction",
                    language: "python",
                    code: "from django.db import transaction\n\n@transaction.atomic\ndef transfer_money(from_user, to_user, amount):\n    from_user.money -= amount\n    from_user.save()\n    # Agar quyidagi qatorda xato otsa tepadagi amal qaytadi:\n    to_user.money += amount\n    to_user.save()"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 22,
    title: 'Testing Python Logics (Unit Tests)',
    shortDescription: 'O\'zingiz yozgan xatoliklarga isbot topish.',
    longDescription: 'Backenddagi har bir Service yoki Model logikasi qo\'l bilan postmanda tekshirilishi kerak emas. Buning uchun testlar yozami. Bugun Django TestCase (yoki Pytest) dagi Unit Test - kodni ichma-ich modulgacha tekshirish!',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'tests.py faylida Model va Service logikalarining har xil edge case\'lariga Assert (da\'vo qilib kutish) lar tayyorlash.',
    whyItMatters: 'Professional dasturching 30% vaqti yozgan kodini emas, uni tekshiradigan "Avtomatlashgan Bot Test"larini yozishga ketadi! Kod Testlarsiz qabil qilinmaydi katta kompaniyalarda.',
    doNotStudyToday: ['Selenium web testing', 'Third-party API mocks'],
    deepWorkPlan: [
      { label: 'Test Database & setUp', durationMinutes: 40, description: 'Testlar ishlaganda bazada vaqtinchalik Test-DB paydo bolishini logikasi' },
      { label: 'Assert amaliyoti', durationMinutes: 60, description: 'assertTrue, assertEqual funksiyalatini qotirib logikangizni "Urib" ko\'ring' }
    ],
    tasks: ['tests.py ichida Class oching, setUp() metodidan User yaratinq', 'test_user_wallet_logic deb pastdan yangi metod nomlab Order sotib olganingiz narxi balancdan kamayganini test qiling', 'py manage.py test komandasi bn OK yozuvini kuting'],
    exercises: ['Eski darslardagi Limit tekshiruvi (Borrow limit errors) ni ataylab 3-kitobni qarzga olib AssertRaises (Xato kutish) bn tests.'],
    deliverable: '10 tacha Yashil ✅  OK bilan ishlagan Test qatlami logikalari.',
    checklist: ['setUp() funksiyasi oldindan ishlayotgabni malum', 'Assertions ishladi'],
    readinessCriteria: ['Postman/Brovserni ochmasdan turib API/Backend ishlaybtganiga garantiya olish.'],
    commonMistakes: ['Test funksiyalarga "test_" def inidan boshlamaslik (Djngo uni test deb tanimay tashab ketadi!)'],
    ifStuck: 'Documentation da AssertEqual, AssertRaises misollarilarini izlang',
    lesson: {
    summary: "Kod sifatini isbotlash. UnitTest'lar bilan qo'l ishlari avtomatga almashtiriladi.",
    goals: [
        "Test DB o'qiydigan testlarni yozish",
        "setUp metodlar qatori"
    ],
    sections: [
        {
            title: "01. Model test",
            body: [
                "Testda alohida class ochamiz."
            ],
            codeSamples: [
                {
                    title: "tests.py",
                    language: "python",
                    code: "from django.test import TestCase\nclass AnimalTestCase(TestCase):\n    def setUp(self):\n        Animal.objects.create(name='lion', sound='roar')\n    def test_animals_can_speak(self):\n        lion = Animal.objects.get(name='lion')\n        self.assertEqual(lion.sound, 'roar')"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 23,
    title: 'Testing Integration (API & Views)',
    shortDescription: 'Client so\'rovlarini simulyatsiya qilib tekshirish',
    longDescription: 'Kecha biz faqat kodning bo\'laklarini(funksiyalarini) tekshirdik. Ammo View ishlari, HTTP Response Code lar, JSON tarkiblarini qanday avtomatlashtiramiz? Buni Client (API Client) class bilan qilinadi deb yozamiz.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'django.test.Client yoki APITestCase orqali HTTP GET/POST jo\'natib Status=200 qaytayotganini Test yozib mustahkamlash.',
    whyItMatters: 'API endpoint o\'zgardimi yoki buzildimi darhol "Test run" sizga ogohlantirish berib, Userlar muammo sezmasdan uni fix qilish imkoniyatni ochadi.',
    doNotStudyToday: ['Load & Stress tesiting (Locust, JMeter hoziqga emazs)'],
    deepWorkPlan: [
      { label: 'Client.get() / post()', durationMinutes: 50, description: 'Brauzer qiladigan harakatni Test.py qilishni imitatsiyalaydi' }
    ],
    tasks: ['from django.test import Client qiling', 'Test ichida response = self.client.get("/api/users/") so\'rovini ishlating', 'self.assertEqual(response.status_code, 200) yozib endpoint barqarorligini tasdiqlang', 'response.json() obyektidan qaytkan datani qiymatlarni taqqoslang'],
    exercises: ['Auth qilinmagan zaproslarni Endpointlaringiz "401 status" bilan tepadfadan uloqtirishini alohida Testga o\'zgarintitring!'],
    deliverable: 'Butun URL rutelarini himoyalaydigan Endpoint API Avtotests.',
    checklist: ['status_code lar logiclarda tekshirildi', 'json() assert qilanib valuesigacha qarab chiqish'],
    readinessCriteria: ['Bir tomonda kodni o\'zgatingizda, Test fail() bo\'lishini farqlab logikalarni buzmaslik!'],
    commonMistakes: ['Test Data ni globaldan oqish - Test Database xar run qilganda bo\'sh bolib yaratiladi (shung setUp() kerak!)'],
    ifStuck: 'Request factory client django docs dagi namunalrni qaytarik',
    lesson: {
    summary: "API Endpointlar barqarorligini avtotestlash. Status (200 OK) testlari.",
    goals: [
        "Test Client dan foydalanish",
        "Response datalarini AssertEqual qilish"
    ],
    sections: [
        {
            title: "01. View API test",
            body: [
                "TestClient qachonlardir postmandan qilganingizni kodingiz o'rniga qiladi."
            ],
            codeSamples: [
                {
                    title: "tests.py",
                    language: "python",
                    code: "def test_get_users_list(self):\n    response = self.client.get('/api/users/')\n    self.assertEqual(response.status_code, 200)\n    self.assertTrue(len(response.json()) >= 0)"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 24,
    title: 'Custom Management Commands',
    shortDescription: 'Terminaldan boshqaruvchi django toolscriptlari (CLI)',
    longDescription: 'Qanday qilib biz \'python manage.py makemigrations\' deymiz o\'zi u qayerda yozilgan? Biz ham o\'zimiz uchun \'manage.py import_excel\' yozib olishimiz mumkinmi? Albatta ha! Bugun asrlar o\'tsa ham kerak buladigan BaseCommand larni o\'rganamiz.',
    category: 'Project Structure & Clean Architecture',
    islandId: 'django-arch',
    difficulty: 'Oson',
    todayFocus: 'management/commands/ papkasida ptyhon shell yordamchilarini (skrip) yosizb amalda execute (bajarish) qilib korish.',
    whyItMatters: 'Production serverlarida bazani birdaniga qandaydir json bilan seed (to\'ldirib yuborish) uchun yoki cron (avtomat soat) larda ishlovchi cronjob lar faqat ushbu management filelarda turishi farz.',
    doNotStudyToday: ['Django-extensions (U tayyor packeage hozir o\'zimiz quramiz)'],
    deepWorkPlan: [
      { label: 'Papka struktruasi', durationMinutes: 20, description: 'management papkasining o\'rni' },
      { label: 'Command Class yozish', durationMinutes: 60, description: 'BaseCommand i ishlatish va execute def ini e\'lon qilish' }
    ],
    tasks: ['Birorta namingli appingiz ichida "management/commands/" papkalarini oching', 'Ularning ichida "__init__.py" bush fallyar joylang', 'create_dummy_books.py  faylida 20ta faker book saqlovchi commad yozing va terminaldan chaqirqirib ko\'ring ("py manage.py create_dummy_books")'],
    exercises: ['Argument ushloblovchi commad (masalan -count=50) bn dinamik test tool yasaishni udallating.'],
    deliverable: 'Terminalda o\'z nomi bilan ro\'yhatda chiqaadigan (help da) command script.',
    checklist: ['manage.py help ichidan nom izlab topingiz', 'command ishladi va db ga ta`ssiri bo\'ldi'],
    readinessCriteria: ['Loyihani "tozalash" kabi ishlarni tezkor commandlarga almashtira olish.'],
    commonMistakes: ['init.py larni qo\'shishdan qolib ketish! Django papka ichigi ko\'rmay tashlanib o\'tadi init bo\'lmanasa'],
    ifStuck: 'Writing Custom Django-admin commands docs ga nazar soling',
    lesson: {
    summary: "Terminal commmandlarini python fayllari orqali avtomatlashtirish.",
    goals: [
        "BaseCommand dan meros olish",
        "manage.py scriptlari tayyorlash"
    ],
    sections: [
        {
            title: "01. Script",
            body: [
                "Papka manzilini management/commands tagida saqlash albatta kerak."
            ],
            codeSamples: [
                {
                    title: "commands/mycommand.py",
                    language: "python",
                    code: "from django.core.management.base import BaseCommand\nclass Command(BaseCommand):\n    help = 'Does some magic'\n    def handle(self, *args, **kwargs):\n        self.stdout.write(self.style.SUCCESS('Magic happen!'))"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 25,
    title: 'Celery & Redis asosi (Background Tasks)',
    shortDescription: 'Orqa Fonga vazifalarni irg\'itish',
    longDescription: 'Tassavur qiling user register knopkasini bosdi, server endi 10 sekund unga kutb turgichida email yuboryapti. User zerikib ketib sahifani bekitadi... Bunday uzoq jarayonlar Response dan tashqarida, alohida asinc ishchi (Workers - Celery) va habar yetkazuvchi Brokder (Redis) tomonidan Backgroundda qilinishi ehtiyoji yuzaga keladi.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'Qiyin',
    todayFocus: 'Redis Message Brokder ni kompyuterda yoki Dockerda ko\'tarish. Celery framework ni sozlab ulash.',
    whyItMatters: 'Background tasklarga hoziroq tushunmasangz ishonchli katta tizim yasalmaydi (Email, Video processing, Report Generate - bular View da turmiydi).',
    doNotStudyToday: ['RabbitMQ as Broker (Hozira Redis tez va zo\'r)', 'Celery Beat (Pastrokda)'],
    deepWorkPlan: [
      { label: 'Broker Mantiqi', durationMinutes: 40, description: 'Djagnodagi so\'rov qanday qilib Redisga boradi va Celery worker uni eshitib bajarishi mexanizmi' },
      { label: 'Redis Install', durationMinutes: 30, description: 'Locolda / Dockerda Redis serverni yondanb oyinish' },
      { label: 'Celery init', durationMinutes: 50, description: 'celery.py file ochish, shared_task yaratuvchi configlar.' }
    ],
    tasks: ['Dokkerda redis image ni yurgazing', 'pip install celery redis o\'rnating', 'projcet root da celery.py file orqali configni soting', 'oddiy_task.delay()  sifatda biror qoshish amalini backgroundaa chaqiring', 'terminaldan celery worker... komandasini bn test qiling'],
    exercises: ['Vaibzada time.sleep(10) bering va Views dagi /api ga soravb yiboring, qarannga JSON darrhol 10k kutmasdan zudlik qaytadi!'],
    deliverable: 'Ulanb celery worker ishga yaroqli turgan Background Engine loyihasi.',
    checklist: ['Worker ishlamoqda, Tasklarni eshittmoqda', 'Celery logiga result qaytayapdi'],
    readinessCriteria: ['Asosiy Request-Response threadini mutllo bloklamay vazifalani parallelga joylash.'],
    commonMistakes: ['Celery ga obyekt instance (masaln User obyekntini) ni pass qivorish (Celery ga faqatt sodda int/str data ketishi kerak userning_id si ketadi! u uyerda object ni ozi yana bazan topvoladi)'],
    ifStuck: 'First steps with Django degan Celery doc bo\'limid o\'qinish shart',
    lesson: {
    summary: "Background Tasks. Celery va Redis tandemiga ulanish sirlari.",
    goals: [
        "Celery backend broker",
        "Tasklarni delay() qilib kechiktirish"
    ],
    sections: [
        {
            title: "01. Setup va shared_task",
            body: [
                "Har bitta og'ir jarayon @shared_task decoratori ostiga olinadi."
            ],
            codeSamples: [
                {
                    title: "tasks.py",
                    language: "python",
                    code: "from celery import shared_task\nimport time\n\n@shared_task\ndef do_heavy_job(data_id):\n    time.sleep(5)\n    return f'{data_id} is done'"
                }
            ]
        },
        {
            title: "02. Chaqirish",
            body: [
                "Oddiy chaqirsangiz program qo'tadi. delay() orqali fonga oting."
            ],
            codeSamples: [
                {
                    title: "views.py",
                    language: "python",
                    code: "def api_view(request):\n    do_heavy_job.delay(20)\n    return JsonResponse({'status':'started in background'})"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 26,
    title: 'Celery Amaliyoti (Email & Periodic Tasks)',
    shortDescription: 'Jonli amaliyotlar va Celery Beat avtomatizatsiyasi',
    longDescription: 'Celery o\'rnatdik, endigi etap - jonli Email qollash va Celery-Beat. Beat bizga har kechqurunti soat 00:00 da foydalanuvi balancini tekshirb oylik to\'lovi yechuvchi Cron job lar kabilarni Djagnoda sodda Python kodida bajarishni o\'rtashib beradi.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'django.core.mail arxitekturasi yordamida Celery orqali asinxron holda email yuborish. django-celery-beat qoshish.',
    whyItMatters: 'Har bir ijtimoiy tarmoq yoki do\'kon avtomat billing (to\'lov yechish) yoki kunlik statistikalar (Email notification) larini faqat va faqat Celery Beat bilan quradi.',
    doNotStudyToday: ['WebSockets', 'Flower Dashboard (Keyinrog ustiga)'],
    deepWorkPlan: [
      { label: 'Email sozlash', durationMinutes: 30, description: 'settings da console email bacend emas real SMTP (masalan Gmail Passvord orqli) config tayyorlsh' },
      { label: 'Beat jadval', durationMinutes: 60, description: 'crontab asosilangan beat configs larni periodic tasklarni setup qilib 1 daqiqa taymenga urish' }
    ],
    tasks: ['django send_mail() kommandasini service faylliga joylasb uni @shared_task da e\'lon qiling', 'celery-beat ni pipdan qoshing. crontab orqali xar minutida terminalaga "Hi worker" deyuvchi periodic taslk yozing'],
    exercises: ['Test uchun MailTrap yoki Gmail App Passwrd bilan Email inboxga muvaffaqyatil habarga jonating.'],
    deliverable: 'Yozilgan jadvalga ko\'ra mustaqil operatsiya bajaradigan "Soatbay" celery backend!',
    checklist: ['Worker bilan Beat har xil processligingzi ishonchingez komilmi?', 'Emaillar kutmasdan (delay) orqali yuborildi'],
    readinessCriteria: ['Inson aralashuvisiz backend o\'z ishlarni qilib yotadugan rejimga olib kirish.'],
    commonMistakes: ['Windows userlarda Celery 4.0 dan tepasi processlar bo\'linishda xatoga chiranadi (gevent yoki WSl g o\'tush tavsiayadi)'],
    ifStuck: 'Periodic task celery documentation larini ko\'ring',
    lesson: {
    summary: "Celery-Beat. Vaqtga asoslangan muntazam takrorlanuvchi avtomat-tasklar.",
    goals: [
        "Period cron joblar",
        "Celery schedules yozish"
    ],
    sections: [
        {
            title: "01. config e'loni",
            body: [
                "Har 30 minutda yoki kechasi 00:00 da uyg'onuvchni schedule."
            ],
            codeSamples: [
                {
                    title: "settings.py",
                    language: "python",
                    code: "app.conf.beat_schedule = {\n    'add-every-30-seconds': {\n        'task': 'tasks.add',\n        'schedule': 30.0,\n        'args': (16, 16)\n    },\n}"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 27,
    title: 'Error Logging Darts & Sentry Setup',
    shortDescription: 'Xatoliklar qayerdan kelayotganini "Tutib olish"',
    longDescription: 'Server "500 Internal Error" deydi, lekin siz log fileda nima xatoligin bilmasangiz qanday topsangiz bo\'ladi? Bu professional emasu... Backendchi prod serverga ko\'z va quloq ochishi kerak - bu Python LOGGING moduli va bulutli monitoring sistemasi bo\'lmish Sentry dir!',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'Oson',
    todayFocus: 'Django LOGGING ni sozlanishi(filega yozish). sentry_sdk pip packagesini ro\'zhorga ulash va ataylakb xato keltrib topib ko\'rish.',
    whyItMatters: 'Project ommaga chiqqanda siz doim server xatosini terminalda qarab utiremaysiz. Sentry telefoningizga Telegram yoki Slack dan "Xato bor user 10-qatorni ezdi" deb aniq aybdrni tirkib sizga xabar yuboradi!',
    doNotStudyToday: ['ELK (Elasticsearch/Logstash/Kibana) log sistemasi hozircha qimmatga(vaqzga) tushaddi xammaga.'],
    deepWorkPlan: [
      { label: 'File Logging', durationMinutes: 40, description: 'Loglarni django_errors.log degan file ga qaytaramiz o\'zgarishlar e\'tiboran.' },
      { label: 'Sentry Cloud', durationMinutes: 40, description: 'Sentry saytiga krish, free acaount va dsn manzilli orqali settingsni ulash' }
    ],
    tasks: ['Django loggings (dictConfig) ni settingsga ishlating (error larni app.log g)', 'sentry-sdk ni install qiling o\'sha dsn ni settingsda e\'lonq qilaing', 'Biror Viewsda qashddan raise Exception("Mani ushlab qolchi") qiiling va unga browserdan kring. Sentry dasahbordiza hatolik rasmi kelishini tomosha qiinsh'],
    exercises: ['Warning, Info va Error Logger funksiyalarnig farqini testlang o\'rnin izlab toping.'],
    deliverable: 'Barcha g\'ayritabiy harakatlari yozib (logging) val bulutga xabardor qilingan ishonchli Backend.',
    checklist: ['Sentry web dashboard sizga xatoni ko\'rsatdi', 'Faylga (DEBUG=False vqtida xam) xatolar matn holda yozildi (append) '],
    readinessCriteria: ['Produksyonga serverni ishonib tashlab qo\'yish uchun eng minimal shart.'],
    commonMistakes: ['Sentry DSN manzilini .env da emas, settingsda ochiq qoldrish!!'],
    ifStuck: 'Sentry integration for Django docs jida aniq tushuntiradi (1 bet darsikla o\'zhg u).',
    lesson: {
    summary: "Xatolarni oson treking (tutib olish) malakalari. Logging va Sentry o'rnatish.",
    goals: [
        "Django Loglar",
        "Bulutli tracking yechimlar haqida (Sentry)"
    ],
    sections: [
        {
            title: "01. Sentry importi",
            body: [
                "Sentry maxsus pip package orqali ulanadi va avtomatik hamma Exceptionslarni o'g'irlap ushlaydi."
            ],
            codeSamples: [
                {
                    title: "settings.py",
                    language: "python",
                    code: "import sentry_sdk\nsentry_sdk.init(dsn='https://XXX@sentry.io/123')"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 28,
    title: 'Redis Cache Memory & Django Caching',
    shortDescription: 'RAM (Operativ) yordamid bazani charchotmaslik.',
    longDescription: '"Dunyodagi eng tez DataBaze bu Database ga Bormaslik!". Doim bir hil ma\'lumotni masalan (Viloyatlar royhati, Kategoriyalar) ni SQL dan select qilovurish server resursini yeydi. Kechagi Redis Broker endi Memery Cach (Xotira) blar qolganish amliyotine o\'rgnamiz.',
    category: 'Performance, Security & Testing',
    islandId: 'django-perf',
    difficulty: 'O\'rtacha',
    todayFocus: 'CACHES o\'rnatis, django-redis package, va cache_page dekortaori ishlatsih.',
    whyItMatters: 'Yuqori masshatli trappik (Yuklamalar) larni oddiy db kotarmidi, RAM xotirasiga o\'nlab MB ma\'lumot olib qoyilsa(Cached), sizni load-time 200ms dn 15 ms a uzayishi 10 brvar tezsahadi.',
    doNotStudyToday: ['Memcached (Redis xojiratini bemalol bajaradi)'],
    deepWorkPlan: [
      { label: 'Cache logikasi', durationMinutes: 20, description: 'RAM database va DISK Database farqii.' },
      { label: 'django-redis', durationMinutes: 50, description: 'Cache backendni sozhlash va cache.set(), cache.get() larni View ichid e\'lin qilsih.l' }
    ],
    tasks: ['django-redis ni pip dan tortib, settings CACHES qatlamini yararsting', 'Seringzida /categories degan List view ga bor', 'Ichid data ni 15 miuntlig cache ga e\'long qlign (djngo import cache.set dan)', 'Viewsiziga ketma-ket qayta yozvchi zaprosla otib terminal(debug t) da SQL izzatni qisqarishni farqlab sezing!!!'],
    exercises: ['Biror ma\'lumot DBdan udaliot qilingatidan keyin o\'sha keshi(Cache) ni clear() qilish signlini yezing!'],
    deliverable: '15 marttalab o\'ta tez islyaydigna RAM Caching xotiraga ulagnabn Loyyha.',
    checklist: ['Redis server ishlayabdi', 'Ikkinchi bor 1 xil request keganda SQL ga murojat qilinmasligig ishondim'],
    readinessCriteria: ['"Sekin ishlash" muammosidan eng oson arzon v eng zo\'r uslubida(Caching) orqli muomola qilish.'],
    commonMistakes: ['Cach larni Invaldation (Ynhi eski keshi bochatib tozalshni) qolidirib, Userga eski data ni korsaevorsih mummomasi.'],
    ifStuck: 'Django cashing hujjtiga krin "Low level caching api" bo\'limini tushuning.',
    lesson: {
    summary: "Applar xotirasini Kesh (Cache) orqali yengillashtirish.",
    goals: [
        "Redis cache ga ulanish",
        "Kodni Keshdan o'qish tezligi"
    ],
    sections: [
        {
            title: "01. Set va Get amallari",
            body: [
                "Agar keshi kelsa topiladi bo'lmasa DB ga so'rov uzatilib undan keyin Keshlab olinadi."
            ],
            codeSamples: [
                {
                    title: "Views",
                    language: "python",
                    code: "from django.core.cache import cache\ndef top_products(request):\n    prods = cache.get('top_prods')\n    if prods is None:\n        prods = list(Product.objects.filter(is_top=True).values())\n        cache.set('top_prods', prods, timeout=60 * 15)  # 15 minutes\n    return JsonResponse(prods, safe=False)"
                }
            ]
        }
    ]
},
    terms: []
  },
  {
    dayNumber: 29,
    title: 'Advanced QuerySets: Annotate & Aggregate',
    shortDescription: 'Bazaga murakkab matematik funksiyala uzatish.',
    longDescription: 'Siz python for da millionta kitonbni aylanib ularin summsini yoki o\'rtachaligin qiymatini hisoblashga kelsangz "Out Of Memory" (Operatov tushub qulash xatosi) olasiz!  Qanday qilib biz buni SQL o\'ziga xisoblati kelishini va eng kam vaqat olinshimi ta\'minlsymzm? Javob: Aggregate() va Annotate() djjngo ORM!',
    category: 'Models, Migrations & ORM',
    islandId: 'django-db',
    difficulty: 'Qiyin',
    todayFocus: 'Count, Avg, Sum, F() obyeklari yordamadi SQL ning agragasiya funkiyalarig yo\'llanms.',
    whyItMatters: 'API da Dasbhoat (Statistiklar, Qancha Pul ishalndi, qancg foyda keldi) chizar ekanmiz siz albattt SQL count va avgni pythondan ming brar tez ishisihni tushinshshisz.',
    doNotStudyToday: ['Window functions, Case/When advanced (Bula uze Data enginring darajasi).'],
    deepWorkPlan: [
      { label: 'Aggregate vs Annotate', durationMinutes: 40, description: 'Agragetsya bu faqat 1 ta yigindi Son qaytraib dict() ishlaydi. Annotatia ese har bir model uchun yang qo\'shmcha virtual maydob(field) xisibllab qoshdi.' },
      { label: 'F() va Q() ishlatish', durationMinutes: 40, description: 'F bu modelniin o\'z ustunidiqi qiymtg SQL iichidayiq + - amallri yoki boshqa qiymti tenglassh usuli.' }
    ],
    tasks: ['DB shelldan (Post.obejcts.aggregate(total_views=Sum("view_count"))) farqini koring va SQL ishiha print(\'qs.query\') bn ishsonhg.', 'Hamr xijavtolar uchun alohida ular uezga postllar saognni Author.obects.annotate(posts_count=Count("post"))... db quoshniing koring (Moxr otnatdasi).'],
    exercises: ['Avval Q() obyektladann murakkab (titlel contains x Yoki (OR) price<10 ) e\'tirof filtrlasini yozisgnishni meshgq qiihib qoling.'],
    deliverable: 'Kuchii Python sikl (for) emas. Kuchik Datbaze tezkor hisobl-kitoblariga ushlsalgan View.',
    checklist: ['Python for lari o\'ring aggregate/annotate lari uzldi', 'F() ifodalarini ma\'nisig yetttim'],
    readinessCriteria: ['Backendnchi singra hisoblash statisrik ishlaarni SQL ga tashllash ko\'nikmasi shakllaanani.'],
    commonMistakes: ['Aggregate qilinga keyiin queryset xisbotini List method( order_by ) qilib o\'shga chaqirmaslikka otishi (Chunki xisoblash yaknudi v faqat Dict()).'],
    ifStuck: 'Django official "Aggregation" temasi. V SQL dagi GROUP BY nimglini qidiring.',
    lesson: {
    summary: "Yuqori ORM so'rovlari - Annotatsiyalar va Aggregatsiyalar bilan ishlash.",
    goals: [
        "Sum, Count, Avg mantiqlari",
        "Django Annotate() metodikasi"
    ],
    sections: [
        {
            title: "01. Mantiq SQL da xisoblansin",
            body: [
                "Masalan har bir qog'oz obyekti ichida uni ko'rilganligi (views) emas, uning nechta izohlari borлиги (comments.count()) ni xisoblaymiz."
            ],
            codeSamples: [
                {
                    title: "query.py",
                    language: "python",
                    code: "from django.db.models import Count\nPost.objects.annotate(comments_count=Count('comments'))"
                }
            ]
        }
    ]
},
    terms: []
  }
,

  {
    dayNumber: 30,
    title: 'Django Checkpoint: E-Library API Backend Structure',
    shortDescription: '30 Kunlik faqat Django backend logikalarini birlashtirish',
    longDescription: 'Siz ORM, Middlewares, permissions, Custom Users va performanse ni frontendlarsiz o`rgandingiz. Bugun buni bitta project (E-kutubxona arxitekturasi) qilib yig\'ib va DRF uchun tayyor baza tashkil qilasiz.',
    category: 'Django Checkpoint',
    islandId: 'django-checkpoint',
    difficulty: 'Qiyin',
    todayFocus: 'Project structure, Services pattern, Custom Management va test yozish tayyorgarligi.',
    whyItMatters: 'Ushbu loyiha keyingi qadam 30 kunikq DRF darslarida ko\'prik va API asosi bo\'lib beradi.',
    doNotStudyToday: ['DRF (Hechqanday instal qilmaysiz)', 'Broser UI'],
    deepWorkPlan: [
       { label: 'DB Architecture, Users', durationMinutes: 60, description: 'Abstract yaratish, Categroy, Book va Borrow modellarini barpo qilish' },
       { label: 'Service Layer Logikasi', durationMinutes: 60, description: 'Biznes logika yechimi(Borrow limit error tekshiruvi).' },
       { label: 'Check N+1', durationMinutes: 45, description: 'djngo-debug-toolbar orqali N+1 muammosini yo\'q qilish.' }
    ],
    tasks: ['Loyihani islohozni boshidan turg\'azish', 'Auth modelingizni sozlash', 'Biznes qoidalarni services.py da to\'plab qo\'yish'],
    exercises: ['Test case qilib kitob borrow imkoniyatlari qarz olinganini assertion bilan tekshirish'],
    deliverable: 'Mukammal Backend Django core Application tayyor - DRF qabuliga mos.',
    checklist: ['Settings xavfsizlandi.', '.env aktivlashdi', 'Data PostgreSQLda'],
    readinessCriteria: ['API qilinishiga 100% tayyor clean django base'],
    commonMistakes: ['Og\'ir bazaviy mantiqlarni Views ga to\'plab yoyib ketish (Clean arxiv bo\'lmaydi)'],
    ifStuck: 'Ortadagi kundalik rejalardan o\'z ishlaringgizni solishtirib ko\'ring.',
    lesson: {
    summary: "Backend qismining o'zidagi eng buyuk oraliq sinov loyihasi! Architecture, Users va Caching o'rni ustidan g'alaba.",
    goals: [
        "DRF backendni sozlash",
        "Modellarni yakunlash",
        "Service layerda Clean Code"
    ],
    sections: [
        {
            title: "01. Structure Project",
            body: [
                "Modellarn bir-biriga tirkalab murakkab kitob ijara (Borrowing) ssenariyasini o'rnatish. Hamma narsa yagona 'services' papkasiga jamlanishi kerak."
            ],
            codeSamples: [
                {
                    title: "Tuzilma",
                    language: "bash",
                    code: "apps/\n  users/\n  books/\n  borrows/\n    services.py\n    models.py\n    selectors.py\ncore/"
                }
            ]
        }
    ]
},
    terms: [
      { term: 'Service Layer', definition: 'Databaza bilan ViewAPI ishining oraliq jarayonlarini saqlaydigan xolisona biznes qatlam logikasi.' }
    ]
  },
  {
    dayNumber: 31,
    title: 'API Fundamentals & Setup DRF',
    shortDescription: 'JSON Serialization, HTTP APIs conceptlari',
    longDescription: 'DRF ga hush kelibsiz. Eng birinchi savol "nimaga endi Djangoni ustiga Rest Framework yuklashim kerak?". Frontendlar va Ilovalar bilan faqatgina JSON da muloqot qiladigan mukammal library haqida anglaysiz.',
    category: 'DRF Setup & Serializers',
    islandId: 'drf-setup',
    difficulty: 'Oson',
    todayFocus: 'API va REST qoliplari bilan yuzlashish. DRF o\'rnatuvini settingsda e\'lon qilish.',
    whyItMatters: 'Backend developerlar asosan API quruvchilardir va ularning markaziy vositasi bo\'lmish REST ni bilmaslik xatodir.',
    doNotStudyToday: ['Viewsetlar va routerlar (Hali qiyinlik qiladi)', 'Authentication Permissions'],
    deepWorkPlan: standardDeepWork("API va REST farqi tushunish, HTTP metodlari GET POST PUT DEL ", "DRF instalation pip install djangorestframework ", "Sodda Response objectni ishlatib listlar qaytarish"),
    tasks: ['Pip install REST framework', 'settings INSTALLED_APPS ga qo\'shish', 'Sodda @api_view(("GET",)) ishlatib Response([data]) sinab korish'],
    exercises: ['Postman dasturini ishlatib va web brouserdagi DRF koringinshlarini solishtirish '],
    deliverable: 'Muavvafqayatli o\'rnatilgan DRF tizimi va Response kelayotgan route endpoints',
    checklist: ['Settingsda framework ulandi', '@api_view deklaratsiyasi ishladi.'],
    readinessCriteria: ['Url routeda Postmandan response JSON shaklda olindi'],
    commonMistakes: ['Response ni djangodagidan ishlatvorish, aslida rest_framework_response import bo\'lish kerag'],
    ifStuck: 'DRF docs ni tutorial sectionini kuzatib o\'qing',
    lesson: {
    summary: "Nihoyat API larni oson yasash boshlandi: Django REST Framework! JSON serializers o'yinlarini o'zlashtirish.",
    goals: [
        "DRF kutubxonasiga moslashish",
        "Response va @api_view"
    ],
    sections: [
        {
            title: "01. @api_view decorator",
            body: [
                "Oddiy def view dagi HTTP zapros yozilishlarini bir zudlikda DRY API formaga otkasish."
            ],
            codeSamples: [
                {
                    title: "api.py",
                    language: "python",
                    code: "from rest_framework.decorators import api_view\nfrom rest_framework.response import Response\n\n@api_view(['GET', 'POST'])\ndef hello_api(request):\n    if request.method == 'POST':\n        return Response({'message': 'Siz POST qildingiz!', 'data': request.data})\n    return Response({'message': 'Salom DRF dunyosi!'})"
                }
            ]
        }
    ]
},
    terms: [
      { term: 'RESTful', definition: 'Resurslarni HTTP metodlar bilan bir xil mantida yo\'natadigan API stillari turi.' },
      { term: 'Serialization', definition: 'Oddiy python murakkab turdagi object va classlarni Frontlar tushunadigan formadagi ya\'ni JSON stringsga kodlash jarayoni' }
    ]
  },
  {
    dayNumber: 60,
    title: 'Final Product Checkpoint: DRF E-commerce Advanced',
    shortDescription: 'Tokendan API Docgacha, Performens va Xavfsizlik eng oliy amaliyoti.',
    longDescription: 'Tabriklayman! Ohirgi checkpointga yetdingiz. Siz barcha amaliy bilimlaringiz - Pagination, Filterlar, JWT Authentication, Complex Serializers va Views routerlar imkonini yagona E-Commerce API da yig\'asiz.',
    category: 'DRF Checkpoint',
    islandId: 'drf-checkpoint-final',
    difficulty: 'Qiyin',
    todayFocus: 'Mustaqillikka o\'qilgan barcha DRF narsasini integrativ qilish. SWAQ va Redoc (Swagger) bilan hujjatlar yasab loyihani yakunlash',
    whyItMatters: 'Ushbu proyekt portfoliangiz uchun bo\'lib xizmat qiladi, kodini toza yozsangiz Strong Junior malakangiz yaqqol sezdiladi.',
    doNotStudyToday: ['Frontend qismini. Cnuhi siz faqat backend qilib server yopasiz!', 'Microservices va og\'ir CI/CD pipelines (Asosiy fokuz qoladi)'],
    deepWorkPlan: [
       { label: 'Structure va Modellar', durationMinutes: 60, description: 'Products, Carts, Orders va ulashlar qismi' },
       { label: 'ViewSets va Serializers', durationMinutes: 120, description: 'Barcha modellarga router qilib serializer nested datalar qaytarishni bitring' },
       { label: 'Xavfsizlik & API Hujjat', durationMinutes: 60, description: 'JWT tokensni sozlab oling va drf-spectacular orgali swager generatsiya bering' }
    ],
    tasks: ['Loyihani amalda 0 dan barpo etish', 'Auth limitllarni tahtga solish', 'Final API Testing process'],
    exercises: ['ShoppingCart logic sini yozda xatolar ehtimolini kamaytirgan biznes test case qiling.'],
    deliverable: 'Mukammal Production-Ready E-Commerce Backed server APIs. Ochiq hujjatlangan Swagger list bilan!',
    checklist: ['Barcha API routelar docsda shakkllandi','N+1 qolmadi.', 'Kodni sifatli Githubga kommit'],
    readinessCriteria: ['Har qanday ixtiyoriy JS yoki iOS dasturcshi xar xillik bilan shug\'ullana olaigdn API platform!'],
    commonMistakes: ['Og\'ir lojihada o\'zingizga o\'zingiz to\'planib ishlay olmaslik va ishlarni aralashtirib qolishi'],
    ifStuck: 'Barcha ochiq API manbalar va GPT sizda, endi men kerak emasman hozir!',
    terms: [
      { term: 'Production-ready', definition: 'Appni localxost ishlashidan tashqari u real webserverda, errorlarga xavfsizlikga chidamli ishlayolishi' }
    ]
  }
];

export const processRawData = (rawData: Partial<StageData>[]): StageData[] => {
  return rawData.map(data => {
    // Determine island coordinates randomly or algorithmically,
    // or set defaults based on category for visualization purposes
    const coords = { x: (Math.random() * 320) - 160, y: (Math.random() * 320) - 160 };
    const dayNumber = data.dayNumber ?? 1;

    return {
      id: `day-${dayNumber}`,
      dayNumber,
      title: data.title || 'Untitled',
      shortDescription: data.shortDescription || '',
      longDescription: data.longDescription || '',
      category: data.category as import('../types/roadmap').Category,
      islandId: data.islandId || 'django-foundation',
      difficulty: data.difficulty || 'O\'rtacha',
      estimatedHours: data.estimatedHours || 5, // typically 5 total
      idealHours: 5, // Default ideal backend focus
      minimumHours: 2, // Minimal fallback
      prerequisites: dayNumber > 1 ? [`day-${dayNumber - 1}`] : [],
      learningObjectives: ['Backend Architecture understanding', 'Python code implementation', 'Separation of concerns (No HTML)'],
      terms: data.terms || [],
      todayFocus: data.todayFocus || '',
      whyItMatters: data.whyItMatters || '',
      doNotStudyToday: data.doNotStudyToday || ['Frontend logic', 'Templates rendering', 'CSS'],
      deepWorkPlan: data.deepWorkPlan || [],
      tasks: data.tasks || ['Code implementation in Python'],
      exercises: data.exercises || [],
      deliverable: data.deliverable || 'Python file with logic',
      checklist: data.checklist || [],
      readinessCriteria: data.readinessCriteria || ['Can explain concept without looking at code'],
      commonMistakes: data.commonMistakes || ['Ignoring basic Python concepts'],
      ifStuck: data.ifStuck || 'Review Django documentation.',
      resourcesPlaceholder: ['Django Official Docs', 'DRF Official Docs'],
      lesson: lessonOverrides[dayNumber] ?? data.lesson,
      coordinates: data.coordinates || coords,
    } as StageData;
  });
};
