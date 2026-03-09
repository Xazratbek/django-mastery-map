import { StageData } from '../types/roadmap';
import { standardDeepWork } from './roadmapHelpers';

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
    terms: [
      { term: 'ForeignKey', definition: 'Bir table bilan masalan avtor ichidagi ko\'plar post boglanishi.' },
      { term: 'Reverse Lookup', definition: 'Parienni oldindan bilib onasiga qo\'shilgan bolalarni chiqarib obkelish aloqasi' }
    ]
  },
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

    return {
      id: `day-${data.dayNumber}`,
      dayNumber: data.dayNumber || 1,
      title: data.title || 'Untitled',
      shortDescription: data.shortDescription || '',
      longDescription: data.longDescription || '',
      category: data.category as import('../types/roadmap').Category,
      islandId: data.islandId || 'django-foundation',
      difficulty: data.difficulty || 'O\'rtacha',
      estimatedHours: data.estimatedHours || 5, // typically 5 total
      idealHours: 5, // Default ideal backend focus
      minimumHours: 2, // Minimal fallback
      prerequisites: data.dayNumber && data.dayNumber > 1 ? [`day-${data.dayNumber - 1}`] : [],
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
      coordinates: data.coordinates || coords,
    } as StageData;
  });
};
