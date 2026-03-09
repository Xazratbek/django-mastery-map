import { LessonQuizQuestion } from '../types/roadmap';

type LessonCustomization = {
  quiz?: LessonQuizQuestion[];
  challengeTasks?: string[];
};

export const drfLessonCustomizations: Record<number, LessonCustomization> = {
  32: {
    quiz: [
      { question: "request.data va request.query_params farqi nima?", answer: "request.data body dan, query_params esa URL querydan keladi." },
      { question: "DRF Response nima beradi?", answer: "JSON output va status code boshqaruvi." },
      { question: "status.HTTP_201_CREATED qachon ishlatiladi?", answer: "Muvaffaqiyatli create bo'lganda." },
    ],
    challengeTasks: [
      "GET list va POST create endpoint yozib status code bilan test qiling.",
      "request.data va query_params ni bir viewda farqlab qaytarib bering."
    ]
  },
  33: {
    quiz: [
      { question: "Serializer va ModelSerializer farqi nima?", answer: "ModelSerializer model fieldlarini avtomatik ulaydi." },
      { question: "is_valid nima uchun kerak?", answer: "Inputni tekshiradi va errors/validated_data beradi." },
      { question: "read_only_fields qachon ishlatiladi?", answer: "Client o'zgartira olmasligi kerak bo'lgan fieldlar uchun." },
    ],
    challengeTasks: [
      "Oddiy Serializer va ModelSerializer bilan bir xil data chiqaring.",
      "write_only field qo'shib, outputda yashiring."
    ]
  },
  34: {
    quiz: [
      { question: "validate_<field> nima qiladi?", answer: "Bitta fieldni alohida tekshiradi." },
      { question: "validate() qachon kerak?", answer: "Bir nechta fieldni birga tekshirishda." },
      { question: "Custom validator nima uchun kerak?", answer: "Maxsus business qoidalarni tekshirish uchun." },
    ],
    challengeTasks: [
      "Price manfiy bo'lsa xato qaytaradigan validator yozing.",
      "start_date < end_date tekshiradigan object-level validation yozing."
    ]
  },
  35: {
    quiz: [
      { question: "PrimaryKeyRelatedField nima beradi?", answer: "Related obyektni id orqali ko'rsatadi." },
      { question: "Nested serializer qachon ishlatiladi?", answer: "Related data ichki JSON ko'rinishida kerak bo'lsa." },
      { question: "select_related nima uchun kerak?", answer: "FK uchun query sonini kamaytirish uchun." },
    ],
    challengeTasks: [
      "Book + Author nested serializer yozing.",
      "List endpointda select_related qo'llab N+1ni kamaytiring."
    ]
  },
  36: {
    quiz: [
      { question: "GenericAPIView nimani beradi?", answer: "Queryset va serializer_class bilan ishlaydigan baza view." },
      { question: "ListModelMixin vazifasi nima?", answer: "List endpointni tez yozish." },
      { question: "CreateModelMixin qachon ishlatiladi?", answer: "POST create endpoint uchun." },
    ],
    challengeTasks: [
      "GenericAPIView + ListModelMixin bilan list endpoint yozing.",
      "CreateModelMixin bilan create endpoint qo'shing."
    ]
  },
  37: {
    quiz: [
      { question: "ListCreateAPIView nima qiladi?", answer: "GET list va POST create ni bitta classda beradi." },
      { question: "RetrieveUpdateDestroyAPIView qachon kerak?", answer: "Detail + update + delete endpointlar uchun." },
      { question: "perform_create nima uchun ishlatiladi?", answer: "Create paytida qo'shimcha logika qo'shish uchun." },
    ],
    challengeTasks: [
      "ListCreateAPIView bilan CRUDning list/create qismini yozing.",
      "perform_create orqali owner fieldni avtomatik qo'ying."
    ]
  },
  38: {
    quiz: [
      { question: "ModelViewSet nima beradi?", answer: "To'liq CRUD endpointlar to'plamini." },
      { question: "Router nima qiladi?", answer: "ViewSet uchun URLlarni avtomatik yaratadi." },
      { question: "@action qachon ishlatiladi?", answer: "Custom endpoint qo'shish kerak bo'lsa." },
    ],
    challengeTasks: [
      "ModelViewSet + DefaultRouter bilan CRUD endpoint yozing.",
      "Custom @action endpoint qo'shib test qiling."
    ]
  },
  39: {
    quiz: [
      { question: "TokenAuthentication nimani beradi?", answer: "Token orqali stateless auth." },
      { question: "Authorization header formati qanday?", answer: "Token <token>" },
      { question: "SessionAuth qachon ishlatiladi?", answer: "Browser sessionlar bilan ishlaganda." },
    ],
    challengeTasks: [
      "Token auth yoqib token olish endpointini qo'shing.",
      "Protected endpointga token bilan so'rov yuboring."
    ]
  },
  40: {
    quiz: [
      { question: "Permission nima qiladi?", answer: "Userga amalni ruxsat berish/cheklash." },
      { question: "IsAuthenticated nimani tekshiradi?", answer: "User login bo'lganini." },
      { question: "Object-level permission qachon kerak?", answer: "Har obyekt bo'yicha ruxsat tekshirishda." },
    ],
    challengeTasks: [
      "Owner bo'lmagan user edit qila olmaydigan permission yozing.",
      "get_permissions orqali actionga qarab permission bering."
    ]
  },
  41: {
    quiz: [
      { question: "Access va Refresh token farqi nima?", answer: "Access qisqa, refresh uzun umrli." },
      { question: "Authorization header format qanday?", answer: "Bearer <token>" },
      { question: "SimpleJWT qaysi view bilan token beradi?", answer: "TokenObtainPairView." },
    ],
    challengeTasks: [
      "SimpleJWT o'rnating va token obtain/refresh endpoint yozing.",
      "Access token expire bo'lganda refresh bilan yangilang."
    ]
  },
  42: {
    quiz: [
      { question: "Throttling nima uchun kerak?", answer: "So'rovlar sonini cheklash va abuse'ni kamaytirish." },
      { question: "UserRateThrottle nima qiladi?", answer: "Auth userga limit qo'yadi." },
      { question: "ScopedRateThrottle qachon ishlatiladi?", answer: "Endpointga maxsus limit kerak bo'lsa." },
    ],
    challengeTasks: [
      "Login endpointga scoped throttling qo'shing.",
      "Limit oshganda 429 qaytishini test qiling."
    ]
  },
  43: {
    quiz: [
      { question: "DjangoFilterBackend vazifasi nima?", answer: "Field bo'yicha filteringni yoqadi." },
      { question: "SearchFilter nima qiladi?", answer: "Text search query beradi." },
      { question: "OrderingFilter qachon kerak?", answer: "Client sorting tanlaganda." },
    ],
    challengeTasks: [
      "Filter + search + ordering ishlaydigan list endpoint yozing.",
      "Custom FilterSet bilan min/max filter qo'shing."
    ]
  },
  44: {
    quiz: [
      { question: "PageNumberPagination nima beradi?", answer: "page=1 formatida pagination." },
      { question: "CursorPagination qachon foydali?", answer: "Katta datasetlarda barqaror paging uchun." },
      { question: "page_size_query_param nima qiladi?", answer: "Clientga page size berish imkonini beradi." },
    ],
    challengeTasks: [
      "Custom PageNumberPagination yozib list endpointga ulang.",
      "CursorPagination bilan orderingni sozlab test qiling."
    ]
  },
  45: {
    quiz: [
      { question: "Parser va renderer farqi nima?", answer: "Parser inputni o'qiydi, renderer outputni formatlaydi." },
      { question: "MultiPartParser qachon kerak?", answer: "Fayl upload bo'lsa." },
      { question: "BrowsableAPIRenderer nima uchun kerak?", answer: "Devda interactive API ko'rish uchun." },
    ],
    challengeTasks: [
      "Multipart upload endpoint yozib file qabul qiling.",
      "Renderer_classes orqali faqat JSON chiqaring."
    ]
  },
  46: {
    quiz: [
      { question: "FileField nima uchun kerak?", answer: "Fayl saqlash uchun model field." },
      { question: "MEDIA_ROOT nimani bildiradi?", answer: "Fayllar saqlanadigan papka." },
      { question: "Upload validator qachon kerak?", answer: "Fayl size/type nazoratida." },
    ],
    challengeTasks: [
      "File upload endpoint yozib faylni saqlang.",
      "5MB dan katta faylni bloklaydigan validator yozing."
    ]
  },
  47: {
    quiz: [
      { question: "APIException nima beradi?", answer: "Custom xatolarni DRF formatida qaytaradi." },
      { question: "Exception handler nima uchun kerak?", answer: "Barcha errorlarni yagona formatda qaytarish uchun." },
      { question: "ValidationError qachon ishlatiladi?", answer: "Input xato bo'lsa." },
    ],
    challengeTasks: [
      "Custom exception class yozib 400 qaytaring.",
      "Global exception handler yozib error formatini o'zgartiring."
    ]
  },
  48: {
    quiz: [
      { question: "APITestCase nima uchun kerak?", answer: "API endpointlarni test qilish uchun." },
      { question: "force_authenticate nima qiladi?", answer: "Testda userni auth qiladi." },
      { question: "APIClient bilan nima qilinadi?", answer: "HTTP requestlarni simulyatsiya qilish." },
    ],
    challengeTasks: [
      "GET list endpoint uchun test yozing.",
      "Auth bo'lmagan user 401 qaytarishini test qiling."
    ]
  },
  49: {
    quiz: [
      { question: "OpenAPI schema nima?", answer: "API endpointlarini standart formatda hujjatlashtirish." },
      { question: "drf-spectacular nima beradi?", answer: "OpenAPI schema generator." },
      { question: "Swagger UI nima uchun kerak?", answer: "Interactive API docs ko'rish uchun." },
    ],
    challengeTasks: [
      "drf-spectacular o'rnating va schema endpoint chiqarib ko'ring.",
      "Swagger UI sahifasini ishga tushiring."
    ]
  },
  50: {
    quiz: [
      { question: "Versioning nima uchun kerak?", answer: "Eski clientlarni buzmasdan API yangilash uchun." },
      { question: "URLPathVersioning qaysi formatda?", answer: "URL ichida v1/v2 orqali." },
      { question: "request.version nimani beradi?", answer: "Joriy versiya qiymatini." },
    ],
    challengeTasks: [
      "v1 va v2 endpointlar uchun serializer farqini yozing.",
      "HeaderVersioning bilan versionni test qiling."
    ]
  },
  51: {
    quiz: [
      { question: "cache_page nima qiladi?", answer: "Response'ni cache qiladi." },
      { question: "Cache invalidation nima uchun kerak?", answer: "Stale data bo'lmasligi uchun." },
      { question: "ETag qachon ishlatiladi?", answer: "Conditional GET uchun." },
    ],
    challengeTasks: [
      "List endpointga cache_page qo'shing.",
      "Update bo'lganda cache.delete ishlating."
    ]
  },
  52: {
    quiz: [
      { question: "N+1 muammo nima?", answer: "Har obyekt uchun qo'shimcha query chiqishi." },
      { question: "select_related nimaga kerak?", answer: "FK relationni join bilan olish uchun." },
      { question: "prefetch_related qachon kerak?", answer: "M2M yoki reverse relationlarda." },
    ],
    challengeTasks: [
      "select_related bilan list endpointni optimizatsiya qiling.",
      "prefetch_related bilan M2M relationni optimizatsiya qiling."
    ]
  },
  53: {
    quiz: [
      { question: "Signal nima?", answer: "Model event bo'lganda trigger bo'ladigan hook." },
      { question: "Webhook nima uchun kerak?", answer: "Boshqa servisga callback yuborish uchun." },
      { question: "Celery task qachon kerak?", answer: "Asinxron ishlar uchun." },
    ],
    challengeTasks: [
      "post_save signal yozib task trigger qiling.",
      "Webhook endpoint yaratib test qiling."
    ]
  },
  54: {
    quiz: [
      { question: "CORS nima?", answer: "Cross-Origin requestlarni boshqarish qoidasi." },
      { question: "CSRF qachon muhim?", answer: "Session auth ishlatilganda." },
      { question: "Security headers nima beradi?", answer: "Clickjacking va MIME sniffingdan himoya." },
    ],
    challengeTasks: [
      "CORS faqat 2 domen uchun ruxsat bering.",
      "SECURE_SSL_REDIRECT va cookie secure sozlang."
    ]
  },
  55: {
    quiz: [
      { question: "Audit log nima?", answer: "Kim, qachon, nima qilganini saqlovchi yozuv." },
      { question: "Rate policy nima uchun kerak?", answer: "So'rovlarni nazorat qilish uchun." },
      { question: "Throttle scope nimani beradi?", answer: "Endpointga maxsus limit qo'yadi." },
    ],
    challengeTasks: [
      "AuditLog model yarating va action yozing.",
      "Login endpointga maxsus throttle scope qo'shing."
    ]
  },
  56: {
    quiz: [
      { question: "DEBUG prod'da qanday bo'lishi kerak?", answer: "False bo'lishi kerak." },
      { question: "ALLOWED_HOSTS nima qiladi?", answer: "Qaysi hostlardan request qabul qilishni belgilaydi." },
      { question: "SECURE_SSL_REDIRECT nima uchun kerak?", answer: "HTTPSni majburiy qilish uchun." },
    ],
    challengeTasks: [
      "Env orqali DEBUG va SECRET_KEYni boshqaring.",
      "Prod settings checklist tuzing."
    ]
  },
  57: {
    quiz: [
      { question: "LOGGING dict nima uchun kerak?", answer: "Log format va handlerlarni sozlash uchun." },
      { question: "Sentry nima beradi?", answer: "Error tracking va monitoring." },
      { question: "Request ID nima uchun kerak?", answer: "Tracing va debug uchun." },
    ],
    challengeTasks: [
      "LOGGING config yozib console log chiqaring.",
      "Sentry DSN ulab test exception yuboring."
    ]
  },
  58: {
    quiz: [
      { question: "Service layer nima?", answer: "Business qoidalarni saqlovchi qatlam." },
      { question: "Selectors nima qiladi?", answer: "Querylarni markazlashtiradi." },
      { question: "Thin view degani nima?", answer: "View faqat input/response bilan ishlaydi." },
    ],
    challengeTasks: [
      "Create logikasini viewdan servicega ko'chiring.",
      "Selectors orqali list query yozing."
    ]
  },
  59: {
    quiz: [
      { question: "API contract nima?", answer: "Client va server o'rtasidagi request/response kelishuvi." },
      { question: "Endpoint mapping nima beradi?", answer: "CRUD va action endpointlar ro'yxati." },
      { question: "Permissions matrix qachon kerak?", answer: "Role-based access bo'lsa." },
    ],
    challengeTasks: [
      "Capstone uchun endpointlar ro'yxatini yozing.",
      "Role bo'yicha permissions matrix tuzing."
    ]
  },
  60: {
    quiz: [
      { question: "Capstone maqsadi nima?", answer: "Barcha DRF bilimlarini bitta real APIga integratsiya qilish." },
      { question: "Docs nega muhim?", answer: "Frontend integratsiyani tezlashtiradi." },
      { question: "Performance optimizatsiya qachon tekshiriladi?", answer: "Loyiha yakunida query va response tezligi bo'yicha." },
    ],
    challengeTasks: [
      "Final API uchun Swagger/Redoc docs chiqaring.",
      "N+1 tekshiruv va paginationni yakuniy tekshiring."
    ]
  },
};
