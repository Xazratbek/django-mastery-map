import { LessonQuizQuestion } from '../types/roadmap';
import { drfLessonCustomizations } from './drfLessonCustomizations';

type LessonCustomization = {
  quiz?: LessonQuizQuestion[];
  challengeTasks?: string[];
};

const baseLessonCustomizations: Record<number, LessonCustomization> = {
  1: {
    quiz: [
      { question: 'Inheritance nima?', answer: "Bitta classdagi xususiyat va metodlarni boshqa classga meros berish." },
      { question: '__str__ metodining vazifasi nima?', answer: "Obyektni string ko'rinishida chiroyli chiqarish." },
      { question: 'self nima uchun kerak?', answer: 'Instance ichidagi atribut va metodlarga murojaat qilish uchun.' },
    ],
    challengeTasks: [
      'Book va Author classlarini yarating, __str__ yozing va meros logikasini qo\'llang.',
      'Custom Exception yozing va try/except bilan kichik demo qiling.'
    ]
  },
  2: {
    quiz: [
      { question: 'venv nima?', answer: 'Loyihaga alohida izolyatsiyalangan Python muhiti yaratish vositasi.' },
      { question: 'requirements.txt nima uchun kerak?', answer: 'Loyihaning barcha paketlarini qayd etish va qayta tiklash uchun.' },
      { question: 'pip freeze nimani chiqaradi?', answer: 'Joriy virtual muhitdagi paketlar va versiyalar ro\'yxatini.' },
    ],
    challengeTasks: [
      'Ikki xil venv oching va Django versiyalarini farqli qilib o\'rnating.',
      'requirements.txt yaratib, boshqa venvda pip install -r bilan tiklang.'
    ]
  },
  3: {
    quiz: [
      { question: 'Project va App farqi nima?', answer: 'Project - umumiy konfiguratsiya, App - konkret funksional modul.' },
      { question: 'startproject va startapp nimani yaratadi?', answer: 'startproject asosiy konfiguratsiyani, startapp esa app strukturani.' },
      { question: 'urls.py ning vazifasi nima?', answer: 'URL yo\'llarini viewlarga bog\'lash.' },
    ],
    challengeTasks: [
      'Yangi project va app yarating, appni INSTALLED_APPS ga qo\'shing.',
      'App uchun urls.py yozib, project urls.py orqali include qiling.'
    ]
  },
  4: {
    quiz: [
      { question: 'DEBUG nima uchun ishlatiladi?', answer: 'Developmentda xatolarni batafsil ko\'rsatish uchun.' },
      { question: 'SECRET_KEY qayerda saqlanishi kerak?', answer: '.env faylda yoki xavfsiz muhit o\'zgaruvchisida.' },
      { question: 'Env faylni o\'qishning foydasi nima?', answer: 'Configlarni koddan ajratib, xavfsiz va moslashuvchan qilish.' },
    ],
    challengeTasks: [
      '.env orqali DEBUG va SECRET_KEY ni o\'qitib settings.py ga ulang.',
      'Prod uchun DEBUG=False holatni alohida sozlang.'
    ]
  },
  5: {
    quiz: [
      { question: 'Request nima?', answer: 'Clientdan serverga keladigan HTTP so\'rov.' },
      { question: 'Response nima?', answer: 'Serverdan clientga qaytadigan javob.' },
      { question: 'path va re_path farqi nima?', answer: 'path oddiy yo\'l, re_path regex asosida ishlaydi.' },
    ],
    challengeTasks: [
      'JsonResponse qaytaradigan view yozing va URL bilan ulang.',
      'URL name berib reverse() bilan foydalaning.'
    ]
  },
  6: {
    quiz: [
      { question: 'Model nima?', answer: 'Database jadvalining Django ichidagi class ko\'rinishi.' },
      { question: 'makemigrations nima qiladi?', answer: 'Model o\'zgarishlarini migration faylga yozadi.' },
      { question: 'migrate nima qiladi?', answer: 'Migrationni databazaga qo\'llaydi.' },
    ],
    challengeTasks: [
      'Book model yarating va migratsiya qiling.',
      'Django shellda 3 ta book yozuvini saqlang.'
    ]
  },
  7: {
    quiz: [
      { question: 'Migration fayli nimani saqlaydi?', answer: 'Model o\'zgarishlarining tarixini.' },
      { question: 'showmigrations nima ko\'rsatadi?', answer: 'Qaysi migrationlar qo\'llanganini.' },
      { question: 'Migrationlarda dependency nima?', answer: 'Migrationlar orasidagi bog\'liqlik.' },
    ],
    challengeTasks: [
      'Modelga yangi field qo\'shing va makemigrations/migrate qiling.',
      'showmigrations orqali statusni tekshiring.'
    ]
  },
  8: {
    quiz: [
      { question: 'CRUD nima?', answer: 'Create, Read, Update, Delete operatsiyalari.' },
      { question: 'objects.create va save farqi nima?', answer: 'create darhol saqlaydi, save esa instance ustida ishlaydi.' },
      { question: 'get va filter farqi nima?', answer: 'get bitta obyekt kutadi, filter queryset qaytaradi.' },
    ],
    challengeTasks: [
      'Shellda 5 ta obyekt yarating, 1 tasini update qiling, 1 tasini o\'chiring.',
      'get va filter bilan bir xil qidiruvni sinab ko\'ring.'
    ]
  },
  9: {
    quiz: [
      { question: 'lookup nima?', answer: 'filter ichidagi __icontains kabi qidiruv operatori.' },
      { question: 'order_by nimaga kerak?', answer: 'Natijani tartiblash uchun.' },
      { question: 'exclude nima qiladi?', answer: 'Shartga moslarini chiqarib tashlaydi.' },
    ],
    challengeTasks: [
      'price__lte va title__icontains bilan filter yozing.',
      'order_by bilan asc/desc tartiblab ko\'ring.'
    ]
  },
  10: {
    quiz: [
      { question: 'ForeignKey nimani bildiradi?', answer: 'Bir modelning boshqa modelga bog\'lanishi.' },
      { question: 'on_delete nima uchun kerak?', answer: 'Bog\'langan obyekt o\'chirilganda nima bo\'lishini belgilaydi.' },
      { question: 'related_name nima beradi?', answer: 'Teskari aloqani nomlash imkonini.' },
    ],
    challengeTasks: [
      'Author va Book modelini ForeignKey bilan ulang.',
      'author.books.all() orqali teskari aloqani chaqiring.'
    ]
  },
  11: {
    quiz: [
      { question: 'OneToOne qachon kerak?', answer: 'Har bir obyektga faqat bitta bog\'lanish bo\'lsa.' },
      { question: 'ManyToMany qachon ishlatiladi?', answer: 'Har ikkala tomonda ko\'pdan-ko\'p bog\'lanish bo\'lsa.' },
      { question: 'Through model nima beradi?', answer: 'ManyToMany orasida qo\'shimcha field saqlash imkonini.' },
    ],
    challengeTasks: [
      'User va Profile o\'rtasida OneToOne yaratib ko\'ring.',
      'Book va Tag o\'rtasida ManyToMany yozing va query qiling.'
    ]
  },
  12: {
    quiz: [
      { question: 'blank va null farqi nima?', answer: 'blank form uchun, null DB uchun.' },
      { question: 'max_length qayerda ishlatiladi?', answer: 'CharField va SlugField uchun maksimal uzunlikni belgilaydi.' },
      { question: 'choices nimaga kerak?', answer: 'Cheklangan qiymatlar ro\'yxatini berish uchun.' },
    ],
    challengeTasks: [
      'choices bilan status field qo\'shing va migratsiya qiling.',
      'db_index qo\'shib qidiruv tezligini tekshiring.'
    ]
  },
  13: {
    quiz: [
      { question: 'filter va get farqi nima?', answer: 'filter queryset, get bitta obyekt qaytaradi.' },
      { question: 'values va values_list farqi nima?', answer: 'values dictlar, values_list tuple/flat list qaytaradi.' },
      { question: 'exists qachon ishlatiladi?', answer: 'Ma\'lumot bor-yo\'qligini tez tekshirish uchun.' },
    ],
    challengeTasks: [
      '3 ta filter chain qilib order_by bilan query yozing.',
      'values_list + exists kombinatsiyasini sinab ko\'ring.'
    ]
  },
  14: {
    quiz: [
      { question: 'aggregate nima qaytaradi?', answer: 'Bitta dict ko\'rinishida umumiy hisob.' },
      { question: 'annotate nima qiladi?', answer: 'Har bir obyektga qo\'shimcha hisoblangan field qo\'shadi.' },
      { question: 'Coalesce nima uchun kerak?', answer: 'Null qiymatlarni default bilan to\'ldirish uchun.' },
    ],
    challengeTasks: [
      'Authorlar uchun Count bilan posts_count chiqaring.',
      'Sum yoki Avg bilan umumiy statistikani chiqarib ko\'ring.'
    ]
  },
  15: {
    quiz: [
      { question: 'Q object nima beradi?', answer: 'Murakkab OR/AND filterlar yozish imkonini.' },
      { question: 'F expression nima uchun ishlatiladi?', answer: 'DB ichida qiymat bilan hisoblash uchun.' },
      { question: 'Subquery nima?', answer: 'Bitta query ichida boshqa query natijasini ishlatish.' },
    ],
    challengeTasks: [
      'Q object bilan OR filter yozing.',
      'F expression bilan stock = stock - 1 update qiling.'
    ]
  },
  16: {
    quiz: [
      { question: 'Custom manager nima beradi?', answer: 'Model uchun maxsus query metodlarini yig\'ish.' },
      { question: 'Constraint nima?', answer: 'DB darajasida data qoidalarini majburlash.' },
      { question: 'Index nima uchun kerak?', answer: 'Qidiruvni tezlashtirish uchun.' },
    ],
    challengeTasks: [
      'Custom manager method yozib ishlating.',
      'UniqueConstraint va Index qo\'shib migratsiya qiling.'
    ]
  },
  17: {
    quiz: [
      { question: 'Custom user qachon kerak?', answer: 'Default User yetarli bo\'lmagan paytda (email login, qo\'shimcha fieldlar).' },
      { question: 'AUTH_USER_MODEL qachon yoziladi?', answer: 'Birinchi migratsiyadan oldin.' },
      { question: 'get_user_model nima beradi?', answer: 'Aktual user modelni xavfsiz olish.' },
    ],
    challengeTasks: [
      'Email login qiluvchi CustomUser yozing va migrate qiling.',
      'ForeignKeylarda settings.AUTH_USER_MODEL ni ishlating.'
    ]
  },
  18: {
    quiz: [
      { question: 'Middleware qayerda ishlaydi?', answer: 'Request va response orasida global qoidalar uchun.' },
      { question: 'Middleware orderi nima uchun muhim?', answer: 'Ketma-ketlik logikaga ta\'sir qiladi.' },
      { question: '__call__ qachon ishlaydi?', answer: 'Har bir request kelganda.' },
    ],
    challengeTasks: [
      'Request vaqtini o\'lchaydigan middleware yozing.',
      'IP block qiladigan middleware yozib settingsga ulang.'
    ]
  },
  19: {
    quiz: [
      { question: 'select_related qaysi relation uchun?', answer: 'ForeignKey va OneToOne uchun.' },
      { question: 'prefetch_related qaysi relation uchun?', answer: 'ManyToMany va reverse FK uchun.' },
      { question: 'N+1 muammo nima?', answer: 'Har obyekt uchun alohida query ketishi.' },
    ],
    challengeTasks: [
      'N+1 holatini yarating va select_related bilan bartaraf qiling.',
      'ManyToMany uchun prefetch_related bilan optimizatsiya qiling.'
    ]
  },
  20: {
    quiz: [
      { question: 'Index qachon kerak?', answer: 'Ko\'p filter qilinadigan ustunlarda.' },
      { question: 'Composite index nima?', answer: 'Bir nechta ustunni bitta indexga birlashtirish.' },
      { question: 'explain nima beradi?', answer: 'SQL query planini ko\'rsatadi.' },
    ],
    challengeTasks: [
      'Ko\'p qidiriladigan fieldga index qo\'shing va migrate qiling.',
      'explain bilan oldin va keyin queryni solishtiring.'
    ]
  },
  21: {
    quiz: [
      { question: 'transaction.atomic nima qiladi?', answer: 'Bir blokdagi o\'zgarishlarni bitta transactionga birlashtiradi.' },
      { question: 'Rollback qachon bo\'ladi?', answer: 'Xato bo\'lsa barcha o\'zgarishlar bekor qilinadi.' },
      { question: 'select_for_update qachon kerak?', answer: 'Parallel update xavfi bo\'lsa row lock uchun.' },
    ],
    challengeTasks: [
      'Pul o\'tkazish funksiyasini transaction.atomic bilan yozing.',
      'on_commit orqali task yoki email chaqiring.'
    ]
  },
  22: {
    quiz: [
      { question: 'Unit test nima?', answer: 'Kichik logika yoki funksiyani tekshiradigan test.' },
      { question: 'setUp nima qiladi?', answer: 'Har testdan oldin test data yaratadi.' },
      { question: 'assertRaises qachon kerak?', answer: 'Xato kutayotgan holatlarda.' },
    ],
    challengeTasks: [
      'Model method uchun unit test yozing.',
      'Service funksiyada xato holatini assertRaises bilan test qiling.'
    ]
  },
  23: {
    quiz: [
      { question: 'Integration test nima?', answer: 'View va endpointlar ishlashini tekshiradi.' },
      { question: 'Client.get nima qiladi?', answer: 'HTTP GET so\'rovini testda yuboradi.' },
      { question: 'Status code testining foydasi?', answer: 'Endpoint barqarorligini tekshiradi.' },
    ],
    challengeTasks: [
      'GET endpoint uchun status 200 test yozing.',
      'Auth kerak bo\'lgan endpointga 401/403 test yozing.'
    ]
  },
  24: {
    quiz: [
      { question: 'Custom command qayerda joylashadi?', answer: 'app/management/commands/ papkasida.' },
      { question: 'handle metodi nima qiladi?', answer: 'Commandning asosiy logikasini bajaradi.' },
      { question: 'add_arguments nima uchun kerak?', answer: 'Commandga argument berish uchun.' },
    ],
    challengeTasks: [
      'Dummy data yaratadigan command yozing.',
      'Commandga --count argument qo\'shing.'
    ]
  },
  25: {
    quiz: [
      { question: 'Celery nima uchun kerak?', answer: 'Og\'ir vazifalarni backgroundda bajarish uchun.' },
      { question: 'Broker vazifasi nima?', answer: 'Tasklarni queuega joylash va workerga yetkazish.' },
      { question: 'delay nima qiladi?', answer: 'Taskni fon rejimida ishga tushiradi.' },
    ],
    challengeTasks: [
      'Celery + Redis sozlab oddiy task yozing.',
      'Viewdan task.delay() chaqirib response darhol qaytishini tekshiring.'
    ]
  },
  26: {
    quiz: [
      { question: 'Celery Beat nima?', answer: 'Vaqtga bog\'liq tasklarni jadval bo\'yicha ishlatadi.' },
      { question: 'crontab qayerda ishlatiladi?', answer: 'Periodic task uchun vaqt jadvalini berishda.' },
      { question: 'on_commit nima uchun kerak?', answer: 'Commit bo\'lgandan keyin task ishlashi uchun.' },
    ],
    challengeTasks: [
      'Beat schedule bilan har minutda ishlaydigan task yozing.',
      'Email yuboruvchi taskni delay bilan ishga tushiring.'
    ]
  },
  27: {
    quiz: [
      { question: 'Logger levels qaysilar?', answer: 'DEBUG, INFO, WARNING, ERROR, CRITICAL.' },
      { question: 'FileHandler nimaga kerak?', answer: 'Loglarni faylga yozish uchun.' },
      { question: 'Sentry nima qiladi?', answer: 'Production xatolarini kuzatib, real vaqtda xabar beradi.' },
    ],
    challengeTasks: [
      'LOGGING sozlab app.log faylga yozdiring.',
      'Sentry ulab, ataylab exception ko\'tarib yuboring.'
    ]
  },
  28: {
    quiz: [
      { question: 'Caching nima uchun kerak?', answer: 'Tez-tez so\'raladigan data uchun DB yukini kamaytiradi.' },
      { question: 'cache.get_or_set nima qiladi?', answer: 'Cache bo\'lmasa data yaratib qo\'yadi.' },
      { question: 'Invalidation nimani anglatadi?', answer: 'Eskirgan cache ni tozalash.' },
    ],
    challengeTasks: [
      'List endpointni cache_page bilan cache qiling.',
      'post_save signal bilan cache.delete ishlating.'
    ]
  },
  29: {
    quiz: [
      { question: 'Annotate qachon kerak?', answer: 'Har bir obyektga hisoblangan field qo\'shish uchun.' },
      { question: 'Aggregate qachon kerak?', answer: 'Umumiy bitta statistik qiymat olish uchun.' },
      { question: 'Subquery nima beradi?', answer: 'Ichki query natijasini bitta so\'rovda ishlatish.' },
    ],
    challengeTasks: [
      'Category bo\'yicha Count bilan statistika chiqaring.',
      'Subquery yoki Exists bilan flag qo\'shib ko\'ring.'
    ]
  },
  30: {
    quiz: [
      { question: 'Service layer nima?', answer: 'Business logikani viewdan ajratadigan qatlam.' },
      { question: 'Selector nima uchun kerak?', answer: 'Querylarni markazlashtirish va optimizatsiya qilish.' },
      { question: 'Checkpoint maqsadi nima?', answer: 'Barcha o\'rganganlarni bitta loyihada integratsiya qilish.' },
    ],
    challengeTasks: [
      'Library modeli va borrow service yozing.',
      'N+1 yo\'qligini select_related/prefetch_related bilan tekshiring.'
    ]
  },
  31: {
    quiz: [
      { question: 'DRF nima beradi?', answer: 'JSON API yaratishni tez va standartlashtiradi.' },
      { question: 'Serializer vazifasi nima?', answer: 'Input/output datani validatsiya va formatlash.' },
      { question: 'APIView qachon ishlatiladi?', answer: 'Class-based API view yozish kerak bo\'lganda.' },
    ],
    challengeTasks: [
      '@api_view bilan GET/POST endpoint yozing.',
      'ModelSerializer bilan list endpoint yozib JSON qaytaring.'
    ]
  }
};

export const lessonCustomizations: Record<number, LessonCustomization> = {
  ...baseLessonCustomizations,
  ...drfLessonCustomizations,
};
