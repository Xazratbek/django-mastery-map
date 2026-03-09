export type ConceptCheatSheet = {
  id: string;
  title: string;
  category: string;
  description: string[];
  whenToUse: string[];
  codeSample: { title: string; language: string; code: string };
  tags: string[];
};

export const conceptCheatSheets: ConceptCheatSheet[] = [
  {
    id: 'aggregate',
    title: 'aggregate() - umumiy hisob',
    category: 'ORM Aggregations',
    description: [
      'aggregate bitta natija (dict) qaytaradi, queryset emas.',
      'SQL hisoblashni bir marta bajaradi va umumiy qiymat beradi.',
      'aggregate dan keyin order_by yoki values ishlamaydi, chunki natija yakunlangan.',
      'Bo\'sh dataset bo\'lsa qiymat None qaytishi mumkin.'
    ],
    whenToUse: [
      'Umumiy count/avg/sum kabi bitta natija kerak bo\'lsa.',
      'Dashboard yoki summary cardlar uchun.',
      'Katta datada tez statistik qiymat olish kerak bo\'lsa.',
      'Filterdan keyin jami qiymatni hisoblash uchun.'
    ],
    codeSample: {
      title: 'Aggregate umumiy summa',
      language: 'python',
      code: "from django.db.models import Sum\n\nsummary = Order.objects.filter(status='paid').aggregate(total=Sum('amount'))"
    },
    tags: ['aggregate', 'orm', 'stats']
  },
  {
    id: 'annotate',
    title: 'annotate() - har obyektga hisob',
    category: 'ORM Aggregations',
    description: [
      'annotate har bir obyektga virtual (hisoblangan) field qo\'shadi.',
      'Annotate bilan SQL GROUP BY ishlaydi, natija list ko\'rinishida qoladi.',
      'values() bilan birga ishlatilsa guruhlash xatti-harakati kuchayadi.',
      'Annotate qilingan field bo\'yicha order_by va filter qilish mumkin.'
    ],
    whenToUse: [
      'Har bir author uchun posts count kerak bo\'lsa.',
      'List viewda rating, score yoki total qiymat ko\'rsatish uchun.',
      'Top listlar (eng ko\'p sotilgan, eng ko\'p izohlangan) uchun.',
      'Group by statistikalar uchun.'
    ],
    codeSample: {
      title: 'Annotate count',
      language: 'python',
      code: "from django.db.models import Count\n\nAuthor.objects.annotate(posts_count=Count('posts'))"
    },
    tags: ['annotate', 'orm', 'stats']
  },
  {
    id: 'count',
    title: 'Count() - sanash',
    category: 'ORM Aggregations',
    description: [
      'Count obyektlar sonini hisoblaydi.',
      'distinct=True bo\'lsa dublikatlar hisobga olinmaydi.',
      'filter=Q(...) bilan faqat shartga moslarini sanaydi.',
      'Count annotate yoki aggregate ichida ishlatiladi.'
    ],
    whenToUse: [
      'Related obyektlar sonini ko\'rsatish uchun.',
      'Unique son kerak bo\'lsa (distinct).',
      'Kategoriya bo\'yicha group by statistikada.',
      'Monitoring va hisobotlarda.'
    ],
    codeSample: {
      title: 'Count filter bilan',
      language: 'python',
      code: "from django.db.models import Count, Q\n\nBook.objects.annotate(active_reviews=Count('reviews', filter=Q(reviews__is_active=True)))"
    },
    tags: ['count', 'aggregate', 'annotate']
  },
  {
    id: 'sum',
    title: 'Sum() - jami hisob',
    category: 'ORM Aggregations',
    description: [
      'Sum raqamli fieldlarni jamlaydi.',
      'Bo\'sh dataset bo\'lsa None qaytishi mumkin (Coalesce bilan to\'ldiring).',
      'filter bilan faqat kerakli yozuvlarni jamlash mumkin.',
      'DecimalField bilan ishlaganda aniq natija beradi.'
    ],
    whenToUse: [
      'Jami summa yoki total hisoblash kerak bo\'lsa.',
      'Order, payment, invoice jamlanmalarida.',
      'Hisobot va statistikada.',
      'Bir nechta shartli summalarni chiqarishda.'
    ],
    codeSample: {
      title: 'Sum',
      language: 'python',
      code: "from django.db.models import Sum\n\nOrder.objects.aggregate(total=Sum('amount'))"
    },
    tags: ['sum', 'aggregate']
  },
  {
    id: 'avg',
    title: 'Avg() - o\'rtacha',
    category: 'ORM Aggregations',
    description: [
      'Avg raqamli fieldlar o\'rtachasini oladi.',
      'Reyting, narx, vaqt kabi metrikalarda foydali.',
      'Bo\'sh dataset bo\'lsa None qaytaradi.',
      'Annotate bilan har obyekt uchun o\'rtacha ham chiqarish mumkin.'
    ],
    whenToUse: [
      'O\'rtacha qiymat kerak bo\'lsa.',
      'Analytics va reportlarda.',
      'Reyting yoki xizmat bahosini hisoblashda.',
      'Segment bo\'yicha o\'rtacha natijalar uchun.'
    ],
    codeSample: {
      title: 'Avg',
      language: 'python',
      code: "from django.db.models import Avg\n\nBook.objects.aggregate(avg_price=Avg('price'))"
    },
    tags: ['avg', 'aggregate']
  },
  {
    id: 'min',
    title: 'Min() - eng kichik qiymat',
    category: 'ORM Aggregations',
    description: [
      'Min eng kichik qiymatni qaytaradi.',
      'Narx yoki sana bo\'yicha minimum olishda ishlatiladi.',
      'Bo\'sh dataset bo\'lsa None qaytishi mumkin.',
      'Filter bilan segment bo\'yicha minimum olish mumkin.'
    ],
    whenToUse: [
      'Eng arzon yoki eng eski qiymat kerak bo\'lsa.',
      'Minimal chegirma yoki minimal vaqtni topishda.',
      'Analitik hisobotlarda.',
      'Segment bo\'yicha eng kichik qiymatni chiqarishda.'
    ],
    codeSample: {
      title: 'Min',
      language: 'python',
      code: "from django.db.models import Min\n\nBook.objects.aggregate(min_price=Min('price'))"
    },
    tags: ['min', 'aggregate']
  },
  {
    id: 'max',
    title: 'Max() - eng katta qiymat',
    category: 'ORM Aggregations',
    description: [
      'Max eng katta qiymatni qaytaradi.',
      'Narx yoki sana bo\'yicha maksimum olishda ishlatiladi.',
      'Bo\'sh dataset bo\'lsa None qaytishi mumkin.',
      'Filter bilan alohida segmentlar uchun maksimum olish mumkin.'
    ],
    whenToUse: [
      'Eng qimmat yoki eng yangi qiymat kerak bo\'lsa.',
      'Top ko\'rsatkichlar va rekordlar uchun.',
      'Analytics uchun.',
      'Segment bo\'yicha eng katta qiymatni topishda.'
    ],
    codeSample: {
      title: 'Max',
      language: 'python',
      code: "from django.db.models import Max\n\nBook.objects.aggregate(max_price=Max('price'))"
    },
    tags: ['max', 'aggregate']
  },
  {
    id: 'cast',
    title: 'Cast() - tipni o\'zgartirish',
    category: 'ORM Aggregations',
    description: [
      'Cast qiymat tipini o\'zgartiradi (masalan int -> str).',
      'DB funksiyasi sifatida ishlaydi, Python loop kerak emas.',
      'Concat, Length yoki boshqa DB funksiyalari bilan birga ishlatiladi.',
      'Output fieldni aniq ko\'rsatish tavsiya qilinadi.'
    ],
    whenToUse: [
      'String va numberlarni birga ishlatish kerak bo\'lsa.',
      'DB ichida formatlash kerak bo\'lsa.',
      'Mixed tiplar bilan annotate qilishda.',
      'Text formatdagi reportlar tayyorlashda.'
    ],
    codeSample: {
      title: 'Cast',
      language: 'python',
      code: "from django.db.models import CharField\nfrom django.db.models.functions import Cast\n\nBook.objects.annotate(price_text=Cast('price', output_field=CharField()))"
    },
    tags: ['cast', 'db functions']
  },
  {
    id: 'coalesce',
    title: 'Coalesce() - nullni to\'ldirish',
    category: 'ORM Aggregations',
    description: [
      'Coalesce birinchi non-null qiymatni qaytaradi.',
      'Null sababli xatolarni oldini oladi.',
      'Hisoblashlarda None chiqmasligi uchun foydali.',
      'Multiple qiymatlar bilan ketma-ket tekshiradi.'
    ],
    whenToUse: [
      'Null qiymatni 0 yoki bo\'sh stringga aylantirish kerak bo\'lsa.',
      'Hisoblashlarda None chiqishini oldini olish uchun.',
      'Statistik qiymatlarni UI da toza ko\'rsatish uchun.',
      'Fallback qiymat kerak bo\'lganda.'
    ],
    codeSample: {
      title: 'Coalesce',
      language: 'python',
      code: "from django.db.models import Value\nfrom django.db.models.functions import Coalesce\n\nBook.objects.annotate(rating_safe=Coalesce('rating', Value(0)))"
    },
    tags: ['coalesce', 'db functions']
  },
  {
    id: 'filter',
    title: 'filter() - shart bilan olish',
    category: 'ORM Core',
    description: [
      'filter() QuerySet qaytaradi, list bo\'lmaydi.',
      'Bir nechta shartni ketma-ket chain qilib yozish mumkin.',
      'lookup (title__icontains, price__lte) bilan ishlaydi.',
      'Bo\'sh bo\'lishi mumkin, lekin xato chiqarmaydi.'
    ],
    whenToUse: [
      'Ko\'p obyektni shart bilan olish kerak bo\'lsa.',
      'List endpointlar uchun.',
      'Search va filter qoidalarini yozishda.',
      'Order_by bilan birga ishlatganda.'
    ],
    codeSample: {
      title: 'filter',
      language: 'python',
      code: "Book.objects.filter(is_active=True, price__lte=50)"
    },
    tags: ['filter', 'orm']
  },
  {
    id: 'exclude',
    title: 'exclude() - istisno qilish',
    category: 'ORM Core',
    description: [
      'exclude() shartga moslarini chiqarib tashlaydi.',
      'filter bilan birga chain qilinadi.',
      'Q object bilan murakkab istisnolarni yozish mumkin.',
      'QuerySet qaytaradi.'
    ],
    whenToUse: [
      'Keraksiz statuslarni chiqarib tashlashda.',
      'Soft delete qilingan obyektlarni ko\'rsatmaslikda.',
      'Shartli exclude talab qilinadigan joylarda.',
      'List endpointlarda ko\'rsatmaslik uchun.'
    ],
    codeSample: {
      title: 'exclude',
      language: 'python',
      code: "Book.objects.exclude(status='archived')"
    },
    tags: ['exclude', 'orm']
  },
  {
    id: 'get',
    title: 'get() - bitta obyekt olish',
    category: 'ORM Core',
    description: [
      'get() bitta obyekt qaytaradi, QuerySet emas.',
      'Topilmasa DoesNotExist xato beradi.',
      'Bir nechta obyekt chiqsa MultipleObjectsReturned xato beradi.',
      'Primary key bo\'yicha olishda juda qulay.'
    ],
    whenToUse: [
      'Faqat bitta obyekt kerak bo\'lsa.',
      'Detail endpointlarda.',
      'Unique field bo\'yicha izlashda.',
      'Agar topilmasa xato berish kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'get',
      language: 'python',
      code: "book = Book.objects.get(id=1)"
    },
    tags: ['get', 'orm']
  },
  {
    id: 'order-by',
    title: 'order_by() - tartiblash',
    category: 'ORM Core',
    description: [
      'order_by field bo\'yicha sort qiladi.',
      'Minus bilan desc tartib ("-created_at").',
      'Bir nechta field bo\'yicha tartiblash mumkin.',
      'Tartib pagination natijasini barqaror qiladi.'
    ],
    whenToUse: [
      'Listlarni tartiblab ko\'rsatishda.',
      'Pagination bilan ishlaganda.',
      'Eng yangi yoki eng eski qiymatni chiqarishda.',
      'UI da sorting kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'order_by',
      language: 'python',
      code: "Book.objects.order_by('-created_at', 'title')"
    },
    tags: ['order_by', 'orm']
  },
  {
    id: 'first-last',
    title: 'first() / last()',
    category: 'ORM Core',
    description: [
      'first() birinchi obyektni qaytaradi, bo\'sh bo\'lsa None.',
      'last() oxirgi obyektni qaytaradi, bo\'sh bo\'lsa None.',
      'order_by bo\'lsa shu tartib bo\'yicha ishlaydi.',
      'get kabi xato bermaydi.'
    ],
    whenToUse: [
      'Birinchi yoki oxirgi obyektni olishda.',
      'Optional natija kerak bo\'lsa.',
      'get dan yengilroq variant kerak bo\'lsa.',
      'Sorting bilan top/last itemda.'
    ],
    codeSample: {
      title: 'first',
      language: 'python',
      code: "latest = Book.objects.order_by('-created_at').first()"
    },
    tags: ['first', 'last', 'orm']
  },
  {
    id: 'latest-earliest',
    title: 'latest() / earliest()',
    category: 'ORM Core',
    description: [
      'latest/earliest model Meta.get_latest_by ga tayanadi.',
      'Field nomini argument sifatida ham berish mumkin.',
      'Topilmasa DoesNotExist xato beradi.',
      'Datetime fieldlar bilan ishlatiladi.'
    ],
    whenToUse: [
      'Eng yangi yoki eng eski obyektni olishda.',
      'Timeline yoki audit loglarda.',
      'Order_by yozmasdan olish uchun.',
      'Date based sorting bo\'lsa.'
    ],
    codeSample: {
      title: 'latest',
      language: 'python',
      code: "latest = Book.objects.latest('created_at')"
    },
    tags: ['latest', 'earliest', 'orm']
  },
  {
    id: 'values-values-list',
    title: 'values() vs values_list()',
    category: 'ORM Core',
    description: [
      'values() dictlar ro\'yxatini qaytaradi.',
      'values_list() tuple yoki flat list qaytaradi.',
      'Model obyektini yaratmaydi, yengilroq ishlaydi.',
      'Katta datasetlarda tezlikni oshiradi.'
    ],
    whenToUse: [
      'Faol model metodlari kerak bo\'lmasa.',
      'API response uchun minimal fieldlar kerak bo\'lsa.',
      'Faqat id ro\'yxati kerak bo\'lsa.',
      'Memoryni tejash kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'values_list',
      language: 'python',
      code: "ids = Book.objects.filter(is_active=True).values_list('id', flat=True)"
    },
    tags: ['values', 'values_list', 'orm']
  },
  {
    id: 'exists',
    title: 'exists() - tez tekshiruv',
    category: 'ORM Core',
    description: [
      'exists() faqat bor-yo\'qligini tekshiradi.',
      'count() dan tezroq, chunki to\'liq sanamaydi.',
      'Bitta boolean qiymat qaytaradi.',
      'Optimallashtirilgan SQL ishlatadi.'
    ],
    whenToUse: [
      'Shartga mos obyekt bor-yo\'qligini bilish kerak bo\'lsa.',
      'Validation yoki permission checklarda.',
      'Katta jadvalda count qilish qimmat bo\'lsa.',
      'Bitta boolean natija yetarli bo\'lsa.'
    ],
    codeSample: {
      title: 'exists',
      language: 'python',
      code: "has_paid = Order.objects.filter(user=user, status='paid').exists()"
    },
    tags: ['exists', 'orm']
  },
  {
    id: 'distinct',
    title: 'distinct() - dublikatni olib tashlash',
    category: 'ORM Core',
    description: [
      'distinct() dublikat natijalarni olib tashlaydi.',
      'JOIN bo\'lgan querylarda ko\'p ishlatiladi.',
      'Postgresda distinct(field) bilan field bo\'yicha ham ishlatish mumkin.',
      'Keraksiz distinct performancega ta\'sir qilishi mumkin.'
    ],
    whenToUse: [
      'Join sababli dublikat obyektlar chiqsa.',
      'Unique ro\'yxat olish kerak bo\'lsa.',
      'Annotate yoki prefetchdan keyin natija ko\'payib ketsa.',
      'Analyticsda noyob itemlar kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'distinct',
      language: 'python',
      code: "Book.objects.prefetch_related('authors').distinct()"
    },
    tags: ['distinct', 'orm']
  },
  {
    id: 'create',
    title: 'create() - obyekt yaratish',
    category: 'ORM Core',
    description: [
      'create() instance yaratadi va darhol DB ga saqlaydi.',
      'save() chaqirish shart emas.',
      'Minimal kod bilan tez yozuv qo\'shish uchun.',
      'Full_clean avtomatik ishlamaydi (kerak bo\'lsa alohida).' 
    ],
    whenToUse: [
      'Tez obyekt yaratish kerak bo\'lsa.',
      'Seeder yoki test data yozishda.',
      'Qisqa va aniq kod istalganda.',
      'Service layer ichida.'
    ],
    codeSample: {
      title: 'create',
      language: 'python',
      code: "Book.objects.create(title='Django', price=10)"
    },
    tags: ['create', 'orm']
  },
  {
    id: 'bulk-create',
    title: 'bulk_create() - ko\'p yozuvni tez qo\'shish',
    category: 'ORM Core',
    description: [
      'bulk_create bir nechta obyektni bitta so\'rovda yozadi.',
      'save() va signals ishlamasligi mumkin.',
      'Katta datasetda tezlikni keskin oshiradi.',
      'returning_fields Postgresda cheklangan.'
    ],
    whenToUse: [
      'Ko\'p data seed qilish kerak bo\'lsa.',
      'Import/CSV yuklash jarayonida.',
      'Performance muhim bo\'lsa.',
      'Signals kerak bo\'lmasa.'
    ],
    codeSample: {
      title: 'bulk_create',
      language: 'python',
      code: "Book.objects.bulk_create([Book(title='A'), Book(title='B')])"
    },
    tags: ['bulk_create', 'orm']
  },
  {
    id: 'update',
    title: 'update() - tez yangilash',
    category: 'ORM Core',
    description: [
      'update() QuerySet darajasida ishlaydi va SQL UPDATE qiladi.',
      'save() va signals ishlamasligi mumkin.',
      'Mass update uchun tez va samarali.',
      'Qaytgan qiymat - nechta row update bo\'lgani.'
    ],
    whenToUse: [
      'Ko\'p obyektni bir vaqtda update qilishda.',
      'Performance muhim bo\'lsa.',
      'Signals kerak bo\'lmasa.',
      'F expression bilan atomar update kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'update',
      language: 'python',
      code: "Book.objects.filter(is_active=False).update(is_active=True)"
    },
    tags: ['update', 'orm']
  },
  {
    id: 'delete',
    title: 'delete() - o\'chirish',
    category: 'ORM Core',
    description: [
      'delete() QuerySet bo\'yicha o\'chiradi.',
      'ForeignKey on_delete qoidalari ishlaydi.',
      'Soft delete ishlatmasangiz ehtiyot bo\'ling.',
      'Signals pre_delete/post_delete ishlaydi.'
    ],
    whenToUse: [
      'Keraksiz yozuvlarni tozalashda.',
      'Cleanup va maintenance joblarda.',
      'Test data tozalashda.',
      'Soft delete yo\'q bo\'lsa.'
    ],
    codeSample: {
      title: 'delete',
      language: 'python',
      code: "Book.objects.filter(is_archived=True).delete()"
    },
    tags: ['delete', 'orm']
  },
  {
    id: 'get-or-create',
    title: 'get_or_create() - mavjud bo\'lsa ol, bo\'lmasa yarat',
    category: 'ORM Core',
    description: [
      'get_or_create atomar emas, lekin transaction bilan himoyalanishi mumkin.',
      'Tuple qaytaradi: (obj, created).',
      'Default qiymatlar defaults parametri bilan beriladi.',
      'Unique constraint bo\'lsa ko\'p ishlatiladi.'
    ],
    whenToUse: [
      'Biror obyekt bo\'lsa uni ishlatish, bo\'lmasa yaratish kerak bo\'lsa.',
      'Seed data yoki settings modelda.',
      'Race condition ehtimoli bo\'lsa transaction qo\'shing.',
      'Idempotent operatsiyalar uchun.'
    ],
    codeSample: {
      title: 'get_or_create',
      language: 'python',
      code: "obj, created = Category.objects.get_or_create(title='Backend')"
    },
    tags: ['get_or_create', 'orm']
  },
  {
    id: 'update-or-create',
    title: 'update_or_create() - yangila yoki yarat',
    category: 'ORM Core',
    description: [
      'update_or_create mavjud bo\'lsa update qiladi, bo\'lmasa create qiladi.',
      'Tuple qaytaradi: (obj, created).',
      'defaults bilan yangilanish qiymatlari beriladi.',
      'Idempotent sync jarayonlar uchun qulay.'
    ],
    whenToUse: [
      'Tashqi sistemadan sync qilishda.',
      'Upsert kerak bo\'lsa.',
      'DB da duplicate bo\'lmasligini ta\'minlashda.',
      'Import skriptlarda.'
    ],
    codeSample: {
      title: 'update_or_create',
      language: 'python',
      code: "obj, created = Book.objects.update_or_create(isbn='123', defaults={'title': 'New'})"
    },
    tags: ['update_or_create', 'orm']
  },
  {
    id: 'only-defer',
    title: 'only() / defer() - yengil select',
    category: 'ORM Core',
    description: [
      'only() faqat kerakli fieldlarni olib keladi.',
      'defer() kerak bo\'lmagan fieldlarni kechiktiradi.',
      'Katta text yoki JSON fieldlarda foydali.',
      'Access qilinsa qo\'shimcha query ketishi mumkin.'
    ],
    whenToUse: [
      'List viewda faqat 2-3 field ko\'rsatish kerak bo\'lsa.',
      'Katta datasetda performance kerak bo\'lsa.',
      'Payloadni kamaytirish uchun.',
      'Memory usage muhim bo\'lsa.'
    ],
    codeSample: {
      title: 'only',
      language: 'python',
      code: "Book.objects.only('id', 'title')"
    },
    tags: ['only', 'defer', 'orm']
  },
  {
    id: 'f-expression',
    title: 'F() - DB ichida hisoblash',
    category: 'ORM Core',
    description: [
      'F expression field qiymatini DB ichida ishlatadi.',
      'Race conditionni kamaytiradi, atomar updatega yordam beradi.',
      'Annotate yoki update ichida arifmetik amallarni bajaradi.',
      'filterda ham F ishlatib fieldlarni solishtirish mumkin.'
    ],
    whenToUse: [
      'stock = stock - 1 kabi update kerak bo\'lsa.',
      'Parallel update xavfi bo\'lsa.',
      'Two field comparison qilish kerak bo\'lsa.',
      'Mass update bilan tez ishlash kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'F update',
      language: 'python',
      code: "from django.db.models import F\n\nProduct.objects.filter(id=1).update(stock=F('stock') - 1)"
    },
    tags: ['F', 'orm', 'update']
  },
  {
    id: 'q-object',
    title: 'Q() - murakkab filter',
    category: 'ORM Core',
    description: [
      'Q object OR/AND shartlarni yozish uchun.',
      'Q objektlarini & va | operatorlari bilan kombinatsiya qilasiz.',
      'Teskari shart uchun ~Q ishlatiladi.',
      'Dynamic filterlarni qurishda juda qulay.'
    ],
    whenToUse: [
      'OR shartlar kerak bo\'lsa.',
      'Bir nechta shartni kombinatsiya qilishda.',
      'Dynamic query builder yaratganda.',
      'Search/filter endpointlarida.'
    ],
    codeSample: {
      title: 'Q filter',
      language: 'python',
      code: "from django.db.models import Q\n\nBook.objects.filter(Q(price__lt=10) | Q(is_free=True))"
    },
    tags: ['Q', 'filter']
  },
  {
    id: 'select-related',
    title: 'select_related - FK/OneToOne optimizatsiya',
    category: 'ORM Optimization',
    description: [
      'select_related SQL JOIN qiladi va bitta query bilan ma\'lumotni olib keladi.',
      'ForeignKey va OneToOne uchun ishlaydi, M2M uchun emas.',
      'N+1 muammoni kamaytiradi.',
      'Chain qilib chuqur relationlarni olish mumkin.'
    ],
    whenToUse: [
      'ForeignKey yoki OneToOne bog\'lanishda.',
      'List viewda ko\'p obyekt chiqarilganda.',
      'Related objectning fieldlari ko\'rsatilsa.',
      'N+1 muammo kuzatilsa.'
    ],
    codeSample: {
      title: 'select_related',
      language: 'python',
      code: "Book.objects.select_related('author').all()"
    },
    tags: ['select_related', 'performance']
  },
  {
    id: 'prefetch-related',
    title: 'prefetch_related - M2M optimizatsiya',
    category: 'ORM Optimization',
    description: [
      'prefetch_related alohida query yuborib xotirada bog\'laydi.',
      'ManyToMany va reverse FK uchun ishlatiladi.',
      'select_related ishlamaydigan joylarda muqobil yechim.',
      'Katta listlarda katta farq beradi.'
    ],
    whenToUse: [
      'ManyToMany relationlarda.',
      'Reverse FK bo\'lsa.',
      'related_set ichida list ko\'rsatish kerak bo\'lsa.',
      'SQL querylar ko\'payib ketgan bo\'lsa.'
    ],
    codeSample: {
      title: 'prefetch_related',
      language: 'python',
      code: "Book.objects.prefetch_related('tags').all()"
    },
    tags: ['prefetch_related', 'performance']
  },
  {
    id: 'prefetch-object',
    title: 'Prefetch() - custom prefetch',
    category: 'ORM Optimization',
    description: [
      'Prefetch bilan queryset va to_attr berish mumkin.',
      'Faqat kerakli qismni yuklash uchun.',
      'Custom queryset bilan filtering qilasiz.',
      'to_attr bilan natijani yangi nomga saqlaysiz.'
    ],
    whenToUse: [
      'Faqat public commentlarni yuklash kerak bo\'lsa.',
      'Default managerga tegmaslik kerak bo\'lsa.',
      'Prefetch natijasini alohida nomda saqlash kerak bo\'lsa.',
      'Performance va memory nazorati uchun.'
    ],
    codeSample: {
      title: 'Prefetch',
      language: 'python',
      code: "from django.db.models import Prefetch\n\nqs = Comment.objects.filter(is_public=True)\nPost.objects.prefetch_related(Prefetch('comments', queryset=qs, to_attr='public_comments'))"
    },
    tags: ['prefetch', 'orm']
  },
  {
    id: 'select-vs-prefetch',
    title: 'select_related vs prefetch_related',
    category: 'ORM Optimization',
    description: [
      'select_related JOIN qiladi, bitta query bilan FK/OneToOne ni oladi.',
      'prefetch_related alohida query bilan M2M va reverse FK ni oladi.',
      'select_related tez va sodda, prefetch_related ko\'proq nazorat beradi.',
      'Notog\'ri tanlov performance pasaytirishi mumkin.'
    ],
    whenToUse: [
      'FK/OneToOne bo\'lsa select_related tanlang.',
      'ManyToMany yoki reverse FK bo\'lsa prefetch_related tanlang.',
      'N+1 muammoni ko\'rganingizda mos usulni tanlang.',
      'List viewlarda har doim query sonini tekshiring.'
    ],
    codeSample: {
      title: 'select vs prefetch',
      language: 'python',
      code: "books = Book.objects.select_related('author')\nbooks = Book.objects.prefetch_related('tags')"
    },
    tags: ['select_related', 'prefetch_related', 'performance']
  },
  {
    id: 'select-for-update',
    title: 'select_for_update() - row lock',
    category: 'ORM Optimization',
    description: [
      'select_for_update transaction ichida rowni lock qiladi.',
      'Parallel update paytida data buzilishini oldini oladi.',
      'Atomic bloksiz ishlamaydi.',
      'skip_locked yoki nowait bilan navbat boshqariladi.'
    ],
    whenToUse: [
      'Pul o\'tkazish yoki stock update kabi jarayonda.',
      'Race condition xavfi bo\'lsa.',
      'Parallel requestlar bo\'lsa.',
      'Lock nazoratini xohlaganda.'
    ],
    codeSample: {
      title: 'select_for_update',
      language: 'python',
      code: "from django.db import transaction\n\nwith transaction.atomic():\n    wallet = Wallet.objects.select_for_update().get(id=1)\n    wallet.balance -= 10\n    wallet.save()"
    },
    tags: ['select_for_update', 'transaction']
  },
  {
    id: 'iterator',
    title: 'iterator() - memoryni tejash',
    category: 'ORM Optimization',
    description: [
      'iterator() querysetni chunk bilan o\'qiydi.',
      'Katta datasetda memory ishlatishni kamaytiradi.',
      'Cache ishlatilmaydi, bir marta o\'qiladi.',
      'Katta export joblarda foydali.'
    ],
    whenToUse: [
      'Millionlab rowni o\'qish kerak bo\'lsa.',
      'Memory cheklangan bo\'lsa.',
      'Data export/import jarayonlarida.',
      'Long-running joblarda.'
    ],
    codeSample: {
      title: 'iterator',
      language: 'python',
      code: "for book in Book.objects.iterator(chunk_size=500):\n    process(book)"
    },
    tags: ['iterator', 'performance']
  },
  {
    id: 'explain',
    title: 'explain() - query plan',
    category: 'ORM Optimization',
    description: [
      'explain SQL query planini ko\'rsatadi.',
      'Index ishlayaptimi yoki yo\'qmi bilishga yordam beradi.',
      'Performance bottleneckni topish uchun kerak.',
      'Postgresda juda foydali tahlil vositasi.'
    ],
    whenToUse: [
      'Query sekin ishlayotgan bo\'lsa.',
      'Index qo\'yish kerakligini tekshirishda.',
      'Joinlar ko\'p bo\'lsa.',
      'Performance auditda.'
    ],
    codeSample: {
      title: 'explain',
      language: 'python',
      code: "print(Book.objects.filter(is_active=True).explain())"
    },
    tags: ['explain', 'performance']
  },
  {
    id: 'fbv',
    title: 'Function Based View (FBV)',
    category: 'Views',
    description: [
      'Oddiy funksiya ko\'rinishidagi view.',
      'Sodda endpointlar uchun tez va tushunarli.',
      'Decorators bilan auth, cache, csrf qo\'shish oson.',
      'Katta logika bo\'lsa kod tarqalib ketishi mumkin.'
    ],
    whenToUse: [
      'Oddiy GET/POST endpoint yozish kerak bo\'lsa.',
      'Minimal logika bilan ishlaganda.',
      'Kichik helper endpointlar uchun.',
      'Rapid prototypingda.'
    ],
    codeSample: {
      title: 'FBV',
      language: 'python',
      code: "from django.http import JsonResponse\n\ndef health(request):\n    return JsonResponse({'status': 'ok'})"
    },
    tags: ['view', 'fbv']
  },
  {
    id: 'cbv',
    title: 'Class Based View (CBV)',
    category: 'Views',
    description: [
      'Class ko\'rinishidagi view, get/post metodlari alohida.',
      'Kengaytirish, reuse va mixinlar bilan ishlash oson.',
      'Generic viewlar bilan ko\'p kodni qisqartiradi.',
      'DRF da APIView, GenericAPIView va ViewSetlar shu yondashuvda.'
    ],
    whenToUse: [
      'Complex endpoint yoki bir nechta metod kerak bo\'lsa.',
      'Class attribute orqali konfiguratsiya qilish kerak bo\'lsa.',
      'Generic viewlardan foydalanmoqchi bo\'lsangiz.',
      'Katta loyihalarda reuse va clean structure kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'CBV',
      language: 'python',
      code: "from django.views import View\nfrom django.http import JsonResponse\n\nclass HealthView(View):\n    def get(self, request):\n        return JsonResponse({'status': 'ok'})"
    },
    tags: ['view', 'cbv']
  },
  {
    id: 'classmethod',
    title: 'Class method (@classmethod)',
    category: 'Python & Models',
    description: [
      'Class method cls orqali class atributlariga ishlaydi.',
      'Factory metodlar va alternative constructorlar uchun qulay.',
      'Django modelda custom creation logikasiga mos.',
      'staticmethoddan farqi: classni argument sifatida oladi.'
    ],
    whenToUse: [
      'Model yoki classga umumiy factory kerak bo\'lsa.',
      'Alternative constructor yozmoqchi bo\'lsangiz.',
      'Ismli init uslublarini soddalashtirishda.',
      'Classga tegishli logikani bir joyga jamlash uchun.'
    ],
    codeSample: {
      title: 'classmethod',
      language: 'python',
      code: "class User:\n    def __init__(self, email):\n        self.email = email\n\n    @classmethod\n    def from_domain(cls, name, domain):\n        return cls(email=f'{name}@{domain}')"
    },
    tags: ['python', 'classmethod']
  },
  {
    id: 'list-display',
    title: 'list_display - admin list ustunlari',
    category: 'Django Admin',
    description: [
      'list_display admin ro\'yxat sahifasida ko\'rinadigan ustunlarni belgilaydi.',
      'Field yoki model methodlarni ko\'rsatish mumkin.',
      'Qidiruv va filtrlashni osonlashtiradi.',
      'Admin usability ni oshiradi.'
    ],
    whenToUse: [
      'Admin ro\'yxat sahifasini qulaylashtirishda.',
      'Muhim fieldlarni tez ko\'rsatishda.',
      'Operatorlar uchun tezko\'r ko\'rish kerak bo\'lsa.',
      'Katta datasetlarda ko\'rish samaradorligi uchun.'
    ],
    codeSample: {
      title: 'list_display',
      language: 'python',
      code: "@admin.register(Book)\nclass BookAdmin(admin.ModelAdmin):\n    list_display = ('id', 'title', 'isbn', 'is_active')"
    },
    tags: ['admin', 'list_display']
  },
  {
    id: 'list-filter',
    title: 'list_filter - yon filter panel',
    category: 'Django Admin',
    description: [
      'list_filter admin list sahifasida filtr panel yaratadi.',
      'Boolean, choice, ForeignKey fieldlar uchun qulay.',
      'Quick filtering uchun ishlatiladi.',
      'Custom filter class yozish mumkin.'
    ],
    whenToUse: [
      'Admin userlarga tez filter kerak bo\'lsa.',
      'Status/role bo\'yicha filtrda.',
      'Katta ro\'yxatlarda segmentlash uchun.',
      'Operativ ishlar uchun.'
    ],
    codeSample: {
      title: 'list_filter',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    list_filter = ('is_active', 'category')"
    },
    tags: ['admin', 'list_filter']
  },
  {
    id: 'list-editable',
    title: 'list_editable - listda tez edit',
    category: 'Django Admin',
    description: [
      'list_editable list sahifasida to\'g\'ridan-to\'g\'ri edit qilishga ruxsat beradi.',
      'list_display ichida bo\'lishi shart.',
      'list_display_links bilan to\'qnashmasligi kerak.',
      'Batch edit uchun qulay.'
    ],
    whenToUse: [
      'Status yoki flaglarni tez o\'zgartirish kerak bo\'lsa.',
      'Admin orqali bulk edit qilishda.',
      'Operatorlar tez ishlashi kerak bo\'lsa.',
      'Oddiy boolean/choice fieldlar uchun.'
    ],
    codeSample: {
      title: 'list_editable',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    list_display = ('title', 'is_active')\n    list_editable = ('is_active',)"
    },
    tags: ['admin', 'list_editable']
  },
  {
    id: 'search-fields',
    title: 'search_fields - admin search',
    category: 'Django Admin',
    description: [
      'search_fields admin search qutisini yoqadi.',
      'CharField va related fieldlar uchun ishlaydi.',
      'Lookuplar (title__icontains) kabi ishlaydi.',
      'Admin usability ni sezilarli oshiradi.'
    ],
    whenToUse: [
      'Admin ichida tez qidiruv kerak bo\'lsa.',
      'Katta ro\'yxatlarda item topish uchun.',
      'User/Book qidiruvlarida.',
      'Kritik lookup fieldlar uchun.'
    ],
    codeSample: {
      title: 'search_fields',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    search_fields = ('title', 'isbn', 'author__name')"
    },
    tags: ['admin', 'search_fields']
  },
  {
    id: 'admin-ordering',
    title: 'ordering - default tartib',
    category: 'Django Admin',
    description: [
      'ordering admin list sahifasining default tartibini belgilaydi.',
      'Minus bilan desc tartib ishlatiladi.',
      'Model Meta.ordering bilan birga ishlashi mumkin.',
      'Adminda barqaror natija beradi.'
    ],
    whenToUse: [
      'Eng yangi itemlar tepada chiqishi kerak bo\'lsa.',
      'Admin sahifada tartib doim bir xil bo\'lishi kerak bo\'lsa.',
      'Operatorlar uchun qulaylik.',
      'Audit loglarda.'
    ],
    codeSample: {
      title: 'ordering',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    ordering = ('-created_at',)"
    },
    tags: ['admin', 'ordering']
  },
  {
    id: 'list-select-related',
    title: 'list_select_related - admin optimizatsiya',
    category: 'Django Admin',
    description: [
      'list_select_related admin list querylarini optimizatsiya qiladi.',
      'ForeignKey fieldlar uchun N+1 muammoni kamaytiradi.',
      'Admin listda relation field ko\'p bo\'lsa foydali.',
      'Performance uchun muhim.'
    ],
    whenToUse: [
      'Admin listda foreign key field ko\'rsatilsa.',
      'N+1 muammo sezilsa.',
      'Katta ro\'yxatlar sekin ochilsa.',
      'Performance tuning kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'list_select_related',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    list_select_related = ('category',)"
    },
    tags: ['admin', 'performance']
  },
  {
    id: 'readonly-fields',
    title: 'readonly_fields - admin read-only',
    category: 'Django Admin',
    description: [
      'readonly_fields admin formda o\'zgartirib bo\'lmaydigan fieldlarni belgilaydi.',
      'Audit yoki computed fieldlar uchun foydali.',
      'Admin xavfsizligini oshiradi.',
      'Form ichida ko\'rsatadi, lekin edit qilmaydi.'
    ],
    whenToUse: [
      'Generated fieldlarni edit qilmaslik kerak bo\'lsa.',
      'Audit fieldlar (created_at, updated_at) uchun.',
      'Xavfsizlik sababli editni cheklashda.',
      'Operatorlar faqat ko\'rishi kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'readonly_fields',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    readonly_fields = ('created_at',)"
    },
    tags: ['admin', 'readonly_fields']
  },
  {
    id: 'fieldsets',
    title: 'fieldsets - admin form bo\'limlari',
    category: 'Django Admin',
    description: [
      'fieldsets admin formni bo\'limlarga ajratadi.',
      'Katta formalarni tartibli ko\'rsatishga yordam beradi.',
      'Collapse qilinadigan bo\'limlar yaratish mumkin.',
      'UI va usability yaxshilanadi.'
    ],
    whenToUse: [
      'Admin form katta bo\'lsa.',
      'Fieldlarni mantiqiy guruhlarga ajratish kerak bo\'lsa.',
      'Optional bo\'limlarni yashirishda.',
      'UI tartibga muhtoj bo\'lsa.'
    ],
    codeSample: {
      title: 'fieldsets',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    fieldsets = (\n        ('Basic', {'fields': ('title', 'isbn')}),\n        ('Meta', {'fields': ('created_at',), 'classes': ('collapse',)}),\n    )"
    },
    tags: ['admin', 'fieldsets']
  },
  {
    id: 'inlines',
    title: 'inlines - related obyektlarni birga edit',
    category: 'Django Admin',
    description: [
      'Inline admin bir model ichida related modelni edit qilish imkonini beradi.',
      'TabularInline yoki StackedInline ishlatiladi.',
      'Relational data boshqarish osonlashadi.',
      'Parent-child modelda qulay.'
    ],
    whenToUse: [
      'Parent-child modelni bir forma ichida tahrirlashda.',
      'Admin userlar uchun tezkor edit kerak bo\'lsa.',
      'Relational data ko\'p bo\'lsa.',
      'Bitta joyda boshqarish kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'inline',
      language: 'python',
      code: "class ChapterInline(admin.TabularInline):\n    model = Chapter\n\nclass BookAdmin(admin.ModelAdmin):\n    inlines = [ChapterInline]"
    },
    tags: ['admin', 'inline']
  },
  {
    id: 'actions',
    title: 'actions - admin bulk actions',
    category: 'Django Admin',
    description: [
      'actions admin list sahifasida bulk amallar beradi.',
      'Bir nechta obyektni bir vaqtning o\'zida o\'zgartirish mumkin.',
      'Custom action funksiyalar yoziladi.',
      'Operatorlar ishini tezlashtiradi.'
    ],
    whenToUse: [
      'Ko\'p obyektga bir xil amal qo\'llashda.',
      'Bulk activate/deactivate kabi holatlarda.',
      'Admin operatsiyalarini tezlashtirishda.',
      'Mass update qilishda.'
    ],
    codeSample: {
      title: 'actions',
      language: 'python',
      code: "def mark_active(modeladmin, request, queryset):\n    queryset.update(is_active=True)\n\nclass BookAdmin(admin.ModelAdmin):\n    actions = [mark_active]"
    },
    tags: ['admin', 'actions']
  },
  {
    id: 'prepopulated-fields',
    title: 'prepopulated_fields - slug avtomatik',
    category: 'Django Admin',
    description: [
      'prepopulated_fields bir fieldni boshqasidan auto to\'ldiradi.',
      'Slug fieldlar uchun ko\'p ishlatiladi.',
      'Admin UX ni yaxshilaydi.',
      'Typingni kamaytiradi.'
    ],
    whenToUse: [
      'Slug field avtomatik bo\'lishi kerak bo\'lsa.',
      'URL friendly nom kerak bo\'lsa.',
      'Admin userlar uchun qulaylik kerak bo\'lsa.',
      'Content managementda.'
    ],
    codeSample: {
      title: 'prepopulated_fields',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    prepopulated_fields = {'slug': ('title',)}"
    },
    tags: ['admin', 'slug']
  },
  {
    id: 'date-hierarchy',
    title: 'date_hierarchy - sana bo\'yicha navigatsiya',
    category: 'Django Admin',
    description: [
      'date_hierarchy admin listda sana bo\'yicha navigatsiya beradi.',
      'Yil/oy/kun bo\'yicha tez filter qilish mumkin.',
      'Katta vaqtli datasetlarda qulay.',
      'Datetime field talab qiladi.'
    ],
    whenToUse: [
      'Created_at bo\'yicha tez navigatsiya kerak bo\'lsa.',
      'Log va audit recordlarda.',
      'Katta listlarda vaqt bo\'yicha filterda.',
      'Analitika ko\'rsatishda.'
    ],
    codeSample: {
      title: 'date_hierarchy',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    date_hierarchy = 'created_at'"
    },
    tags: ['admin', 'date_hierarchy']
  },
  {
    id: 'list-per-page',
    title: 'list_per_page - sahifa limit',
    category: 'Django Admin',
    description: [
      'list_per_page admin list sahifasida nechta item ko\'rsatilishini belgilaydi.',
      'Paginationni nazorat qiladi.',
      'Katta datasetlarda performance va UXni yaxshilaydi.',
      'Default 100 atrofida bo\'ladi.'
    ],
    whenToUse: [
      'Admin list juda katta bo\'lsa.',
      'Performance muhim bo\'lsa.',
      'Operatorlar uchun qulay scroll kerak bo\'lsa.',
      'Paginationni boshqarishda.'
    ],
    codeSample: {
      title: 'list_per_page',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    list_per_page = 50"
    },
    tags: ['admin', 'pagination']
  },
  {
    id: 'raw-id-fields',
    title: 'raw_id_fields - FK inputni yengillashtirish',
    category: 'Django Admin',
    description: [
      'raw_id_fields ForeignKey fieldni selectdan text inputga o\'tkazadi.',
      'Katta jadvalda select dropdown sekin bo\'lishi mumkin.',
      'Admin performance va UX yaxshilanadi.',
      'ID bilan qidirish ishlatiladi.'
    ],
    whenToUse: [
      'ForeignKey jadvali juda katta bo\'lsa.',
      'Dropdown sekin ishlayotgan bo\'lsa.',
      'Admin formni tezlashtirishda.',
      'Power userlar uchun.'
    ],
    codeSample: {
      title: 'raw_id_fields',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    raw_id_fields = ('category',)"
    },
    tags: ['admin', 'raw_id_fields']
  },
  {
    id: 'autocomplete-fields',
    title: 'autocomplete_fields - tez qidiruv',
    category: 'Django Admin',
    description: [
      'autocomplete_fields ForeignKey uchun autocomplete input beradi.',
      'Large dataset uchun ancha qulay.',
      'Admin UI ni zamonaviy qiladi.',
      'list_display va search_fields bilan ishlaydi.'
    ],
    whenToUse: [
      'FK bo\'lgan jadval katta bo\'lsa.',
      'User/Author kabi katta ro\'yxatlarda.',
      'Admin usability muhim bo\'lsa.',
      'Raw id o\'rniga qulay UI kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'autocomplete_fields',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    autocomplete_fields = ('category',)"
    },
    tags: ['admin', 'autocomplete']
  },
  {
    id: 'list-display-links',
    title: 'list_display_links - clickable ustunlar',
    category: 'Django Admin',
    description: [
      'list_display_links list sahifada qaysi ustun link bo\'lishini belgilaydi.',
      'Default holatda birinchi ustun link bo\'ladi.',
      'list_editable bilan to\'qnashmasligi kerak.',
      'Admin UX ni aniq boshqarish uchun ishlatiladi.'
    ],
    whenToUse: [
      'Qaysi ustunni klik bilan editga olib kirishni xohlasangiz.',
      'list_editable ishlatayotgan bo\'lsangiz.',
      'Admin list sahifasini tartibga solishda.',
      'Operatorlar uchun qulaylik yaratishda.'
    ],
    codeSample: {
      title: 'list_display_links',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    list_display = ('title', 'isbn', 'is_active')\n    list_display_links = ('title',)"
    },
    tags: ['admin', 'list_display_links']
  },
  {
    id: 'save-as',
    title: 'save_as - Copy/Save as new',
    category: 'Django Admin',
    description: [
      'save_as True bo\'lsa admin formda \"Save as new\" tugmasi paydo bo\'ladi.',
      'Mavjud obyekt asosida yangi obyekt yaratishga yordam beradi.',
      'Template yoki shablon sifatida ishlatish qulay.',
      'Operatorlar uchun tez ko\'paytirish imkonini beradi.'
    ],
    whenToUse: [
      'O\'xshash obyektlarni tez ko\'paytirish kerak bo\'lsa.',
      'Template data asosida yangi obyekt yaratishda.',
      'Admin flowni tezlashtirishda.',
      'Copy asosida variantlar kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'save_as',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    save_as = True"
    },
    tags: ['admin', 'save_as']
  },
  {
    id: 'save-on-top',
    title: 'save_on_top - Save tugmalari yuqorida',
    category: 'Django Admin',
    description: [
      'save_on_top True bo\'lsa admin formning yuqorisida ham Save tugmalari chiqadi.',
      'Katta formalar uchun qulaylik beradi.',
      'UX ni yaxshilaydi, scroll qilmasdan saqlash mumkin.',
      'Admin operatorlar tezroq ishlaydi.'
    ],
    whenToUse: [
      'Form juda uzun bo\'lsa.',
      'Admin user tez-tez saqlashga muhtoj bo\'lsa.',
      'UX ni yaxshilash uchun.',
      'Katta content formalarida.'
    ],
    codeSample: {
      title: 'save_on_top',
      language: 'python',
      code: "class BookAdmin(admin.ModelAdmin):\n    save_on_top = True"
    },
    tags: ['admin', 'save_on_top']
  },
  {
    id: 'concat',
    title: 'Concat() - fieldlarni birlashtirish',
    category: 'ORM Functions',
    description: [
      'Concat DB ichida string fieldlarni birlashtiradi.',
      'Full name yoki display qiymat uchun qulay.',
      'Value bilan bo\'sh joy yoki belgi qo\'shish mumkin.',
      'Annotate ichida ishlatiladi.'
    ],
    whenToUse: [
      'Full name kabi composite qiymat kerak bo\'lsa.',
      'DB ichida string birlashtirish kerak bo\'lsa.',
      'API response uchun formatlangan field kerak bo\'lsa.',
      'Search yoki sortingda birlashtirilgan qiymat kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Concat',
      language: 'python',
      code: "from django.db.models import Value\nfrom django.db.models.functions import Concat\n\nAuthor.objects.annotate(full_name=Concat('first_name', Value(' '), 'last_name'))"
    },
    tags: ['concat', 'db functions']
  },
  {
    id: 'lower',
    title: 'Lower() - kichik harfga o\'tkazish',
    category: 'ORM Functions',
    description: [
      'Lower stringni DB ichida kichik harflarga o\'tkazadi.',
      'Case-insensitive qidiruv va sorting uchun qulay.',
      'Annotate bilan yangi field yaratadi.',
      'Index bilan birga ishlatilsa tezroq bo\'lishi mumkin.'
    ],
    whenToUse: [
      'Case-insensitive qidiruvda.',
      'Normalizatsiya qilish kerak bo\'lsa.',
      'Sortingni bir xil formatda qilish uchun.',
      'Search performance uchun.'
    ],
    codeSample: {
      title: 'Lower',
      language: 'python',
      code: "from django.db.models.functions import Lower\n\nBook.objects.annotate(lower_title=Lower('title'))"
    },
    tags: ['lower', 'db functions']
  },
  {
    id: 'upper',
    title: 'Upper() - katta harfga o\'tkazish',
    category: 'ORM Functions',
    description: [
      'Upper stringni DB ichida katta harflarga o\'tkazadi.',
      'Case normalization uchun foydali.',
      'Reporting va display uchun ishlatilishi mumkin.',
      'Annotate ichida ishlatiladi.'
    ],
    whenToUse: [
      'Harflarni standart qilish kerak bo\'lsa.',
      'Case-insensitive comparison uchun.',
      'Report yoki export uchun formatlashda.',
      'Display format kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Upper',
      language: 'python',
      code: "from django.db.models.functions import Upper\n\nBook.objects.annotate(upper_title=Upper('title'))"
    },
    tags: ['upper', 'db functions']
  },
  {
    id: 'length',
    title: 'Length() - string uzunligi',
    category: 'ORM Functions',
    description: [
      'Length string field uzunligini DB ichida hisoblaydi.',
      'Filter yoki annotate bilan ishlatiladi.',
      'Validatsiya yoki analytics uchun foydali.',
      'Python loop kerak emas.'
    ],
    whenToUse: [
      'Title uzunligini tekshirish kerak bo\'lsa.',
      'Analytics (eng uzun/eng qisqa) bo\'lsa.',
      'DB ichida tez hisoblashda.',
      'Sorting length bo\'yicha bo\'lsa.'
    ],
    codeSample: {
      title: 'Length',
      language: 'python',
      code: "from django.db.models.functions import Length\n\nBook.objects.annotate(title_len=Length('title')).order_by('-title_len')"
    },
    tags: ['length', 'db functions']
  },
  {
    id: 'trunc-date',
    title: 'TruncDate() - sanani kesish',
    category: 'ORM Functions',
    description: [
      'TruncDate datetime ni faqat sana qismiga kesadi.',
      'Group by kun bo\'yicha statistikada ishlatiladi.',
      'Analytics va reportlar uchun qulay.',
      'Datetime to date conversion bo\'ladi.'
    ],
    whenToUse: [
      'Kunlik statistikalarni chiqarishda.',
      'Date bo\'yicha group by qilishda.',
      'Datetime fieldni date formatga aylantirishda.',
      'Report va chartlarda.'
    ],
    codeSample: {
      title: 'TruncDate',
      language: 'python',
      code: "from django.db.models.functions import TruncDate\n\nOrder.objects.annotate(day=TruncDate('created_at')).values('day').annotate(total=Count('id'))"
    },
    tags: ['truncdate', 'db functions']
  },
  {
    id: 'drf-api-view',
    title: '@api_view - DRF function view',
    category: 'DRF',
    description: [
      '@api_view DRF uchun function based view yozishga yordam beradi.',
      'Request.method tekshiruvini soddalashtiradi.',
      'Response class bilan JSON qaytaradi.',
      'Kichik endpointlar uchun qulay.'
    ],
    whenToUse: [
      'Sodda endpointlar uchun.',
      'Tez prototip qilishda.',
      'FBV uslubini DRF ga mos qilishda.',
      'Minimal logika kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'api_view',
      language: 'python',
      code: "from rest_framework.decorators import api_view\nfrom rest_framework.response import Response\n\n@api_view(['GET'])\ndef ping(request):\n    return Response({'ok': True})"
    },
    tags: ['drf', 'api_view']
  },
  {
    id: 'drf-response-status',
    title: 'Response + status code',
    category: 'DRF',
    description: [
      'Response DRF ning asosiy javob klassi.',
      'status parametri bilan HTTP code beriladi.',
      'JSON return qilish standartlashtiriladi.',
      'Client bilan aniq muloqot uchun muhim.'
    ],
    whenToUse: [
      'API response qaytarishda.',
      '201, 400, 404 kabi statuslar kerak bo\'lsa.',
      'Validation errorlarda.',
      'CRUD endpointlarda.'
    ],
    codeSample: {
      title: 'Response status',
      language: 'python',
      code: "from rest_framework import status\nfrom rest_framework.response import Response\n\nreturn Response({'detail': 'created'}, status=status.HTTP_201_CREATED)"
    },
    tags: ['drf', 'response', 'status']
  },
  {
    id: 'drf-serializer',
    title: 'Serializer - data validatsiya',
    category: 'DRF',
    description: [
      'Serializer input va output datani nazorat qiladi.',
      'Fieldlar va validatsiyalar shu yerda bo\'ladi.',
      'Modelga bog\'liq bo\'lmagan serializerni yaratish mumkin.',
      'JSON formatlashni soddalashtiradi.'
    ],
    whenToUse: [
      'API input validatsiya kerak bo\'lsa.',
      'Custom data structure bilan ishlashda.',
      'JSON response formatini belgilashda.',
      'Non-model datalar bilan ishlashda.'
    ],
    codeSample: {
      title: 'Serializer',
      language: 'python',
      code: "from rest_framework import serializers\n\nclass BookSerializer(serializers.Serializer):\n    title = serializers.CharField()\n    price = serializers.DecimalField(max_digits=8, decimal_places=2)"
    },
    tags: ['drf', 'serializer']
  },
  {
    id: 'drf-model-serializer',
    title: 'ModelSerializer - tez mapping',
    category: 'DRF',
    description: [
      'ModelSerializer model fieldlarini avtomatik oladi.',
      'Ko\'p boilerplate kodni yo\'q qiladi.',
      'Meta classda model va fields beriladi.',
      'CRUD endpointlar uchun qulay.'
    ],
    whenToUse: [
      'Model bilan 1:1 API yaratishda.',
      'CRUD endpointlar uchun.',
      'Quick prototypingda.',
      'Standard mapping kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'ModelSerializer',
      language: 'python',
      code: "class BookSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Book\n        fields = ['id', 'title', 'price']"
    },
    tags: ['drf', 'modelserializer']
  },
  {
    id: 'drf-serializer-method-field',
    title: 'SerializerMethodField - dinamik field',
    category: 'DRF',
    description: [
      'SerializerMethodField custom computed field beradi.',
      'get_<field> metodi yoziladi.',
      'Business logikani serializerga joylash mumkin.',
      'Readonly fieldlar uchun qulay.'
    ],
    whenToUse: [
      'Dinamik qiymat kerak bo\'lsa.',
      'Computed fieldlar (rating, full_name) uchun.',
      'API responsega qo\'shimcha info qo\'shishda.',
      'Model field bo\'lmagan data uchun.'
    ],
    codeSample: {
      title: 'SerializerMethodField',
      language: 'python',
      code: "class BookSerializer(serializers.ModelSerializer):\n    rating = serializers.SerializerMethodField()\n\n    def get_rating(self, obj):\n        return obj.rating or 0"
    },
    tags: ['drf', 'serializer']
  },
  {
    id: 'drf-validation',
    title: 'Serializer validation',
    category: 'DRF',
    description: [
      'validate_<field> bilan field level validation yoziladi.',
      'validate() bilan object level validation yoziladi.',
      'ValidationError qaytarilishi shart.',
      'Business qoidalarni shu yerda tekshirish mumkin.'
    ],
    whenToUse: [
      'Input tekshirish kerak bo\'lsa.',
      'Business rule validation kerak bo\'lsa.',
      'API error message berishda.',
      'Data integrity muhim bo\'lsa.'
    ],
    codeSample: {
      title: 'validate_price',
      language: 'python',
      code: "class BookSerializer(serializers.ModelSerializer):\n    def validate_price(self, value):\n        if value < 0:\n            raise serializers.ValidationError('price must be positive')\n        return value"
    },
    tags: ['drf', 'validation']
  },
  {
    id: 'drf-apiview',
    title: 'APIView - class based API',
    category: 'DRF',
    description: [
      'APIView DRF class-based view asosidir.',
      'get/post/put/delete metodlari alohida yoziladi.',
      'Permissions va authenticationni osongina qo\'shish mumkin.',
      'Kengaytirish oson.'
    ],
    whenToUse: [
      'Class-based API kerak bo\'lsa.',
      'Bir nechta metodni boshqarish kerak bo\'lsa.',
      'Custom control kerak bo\'lsa.',
      'Middleware yoki permissions bilan ishlaganda.'
    ],
    codeSample: {
      title: 'APIView',
      language: 'python',
      code: "from rest_framework.views import APIView\nfrom rest_framework.response import Response\n\nclass BookList(APIView):\n    def get(self, request):\n        return Response([])"
    },
    tags: ['drf', 'apiview']
  },
  {
    id: 'drf-generic-api-view',
    title: 'GenericAPIView / ListCreateAPIView',
    category: 'DRF',
    description: [
      'GenericAPIView common CRUD logikani beradi.',
      'ListCreateAPIView, RetrieveUpdateAPIView kabi tayyor classlar bor.',
      'Queryset va serializer_class bilan ishlaydi.',
      'Kodni qisqartiradi.'
    ],
    whenToUse: [
      'Standart CRUD endpointlar uchun.',
      'Ko\'p kod yozmaslik uchun.',
      'DRF generic viewlar bilan ishlashda.',
      'Biznes logika minimal bo\'lsa.'
    ],
    codeSample: {
      title: 'ListCreateAPIView',
      language: 'python',
      code: "from rest_framework.generics import ListCreateAPIView\n\nclass BookList(ListCreateAPIView):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer"
    },
    tags: ['drf', 'generic views']
  },
  {
    id: 'drf-model-viewset',
    title: 'ModelViewSet - CRUD to\'liq',
    category: 'DRF',
    description: [
      'ModelViewSet list/create/retrieve/update/delete ni beradi.',
      'Routerlar bilan birga ishlatiladi.',
      'CRUD endpointlar uchun eng tez yo\'l.',
      'Custom actionlar @action decorator bilan yoziladi.'
    ],
    whenToUse: [
      'To\'liq CRUD endpoint kerak bo\'lsa.',
      'Kodni minimal qilish uchun.',
      'Router bilan ishlashda.',
      'Standard API uchun.'
    ],
    codeSample: {
      title: 'ModelViewSet',
      language: 'python',
      code: "from rest_framework.viewsets import ModelViewSet\n\nclass BookViewSet(ModelViewSet):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer"
    },
    tags: ['drf', 'viewset']
  },
  {
    id: 'drf-router',
    title: 'Router - avtomatik URL',
    category: 'DRF',
    description: [
      'Router viewset uchun URLlarni avtomatik yaratadi.',
      'DefaultRouter ko\'p ishlatiladi.',
      'CRUD endpointlar tez ulanadi.',
      'URLs yozishni kamaytiradi.'
    ],
    whenToUse: [
      'ViewSet ishlatayotgan bo\'lsangiz.',
      'CRUD endpointlar ko\'p bo\'lsa.',
      'URL yozishni qisqartirish uchun.',
      'Standard DRF routingda.'
    ],
    codeSample: {
      title: 'DefaultRouter',
      language: 'python',
      code: "from rest_framework.routers import DefaultRouter\n\nrouter = DefaultRouter()\nrouter.register('books', BookViewSet)\nurlpatterns = router.urls"
    },
    tags: ['drf', 'router']
  },
  {
    id: 'drf-permissions',
    title: 'Permissions - ruxsat nazorati',
    category: 'DRF',
    description: [
      'permission_classes access nazoratini belgilaydi.',
      'IsAuthenticated eng ko\'p ishlatiladi.',
      'Custom permission class yozish mumkin.',
      'Security uchun muhim qatlam.'
    ],
    whenToUse: [
      'API endpointlar himoyalanishi kerak bo\'lsa.',
      'Authenticated userlar uchun.', 
      'Role-based access kerak bo\'lsa.',
      'Sensitive data bo\'lsa.'
    ],
    codeSample: {
      title: 'IsAuthenticated',
      language: 'python',
      code: "from rest_framework.permissions import IsAuthenticated\n\nclass BookViewSet(ModelViewSet):\n    permission_classes = [IsAuthenticated]"
    },
    tags: ['drf', 'permissions']
  },
  {
    id: 'drf-authentication',
    title: 'Authentication - login usullari',
    category: 'DRF',
    description: [
      'authentication_classes orqali auth backend tanlanadi.',
      'TokenAuthentication yoki JWT ishlatiladi.',
      'SessionAuthentication web panel uchun qulay.',
      'Auth layer API security uchun kerak.'
    ],
    whenToUse: [
      'API ga login talab qilinsa.',
      'Token/JWT ishlatilsa.',
      'Mobil ilovalar bilan ishlaganda.',
      'Session yoki token orqali auth bo\'lsa.'
    ],
    codeSample: {
      title: 'TokenAuthentication',
      language: 'python',
      code: "from rest_framework.authentication import TokenAuthentication\n\nclass BookViewSet(ModelViewSet):\n    authentication_classes = [TokenAuthentication]"
    },
    tags: ['drf', 'authentication']
  },
  {
    id: 'drf-pagination',
    title: 'Pagination - sahifalash',
    category: 'DRF',
    description: [
      'Pagination katta datasetlarni bo\'lib beradi.',
      'PageNumberPagination eng sodda varianti.',
      'Global yoki per-view sozlanadi.',
      'API response barqaror bo\'ladi.'
    ],
    whenToUse: [
      'List endpointlar katta bo\'lsa.',
      'Performance muhim bo\'lsa.',
      'Clientga kichik paketlar berish kerak bo\'lsa.',
      'Infinite scroll uchun.'
    ],
    codeSample: {
      title: 'PageNumberPagination',
      language: 'python',
      code: "from rest_framework.pagination import PageNumberPagination\n\nclass BookPagination(PageNumberPagination):\n    page_size = 10"
    },
    tags: ['drf', 'pagination']
  },
  {
    id: 'drf-filtering',
    title: 'Filtering/Search/Ordering',
    category: 'DRF',
    description: [
      'filter_backends bilan search, ordering, filter yoqiladi.',
      'SearchFilter title__icontains kabi ishlaydi.',
      'OrderingFilter sort qilishga yordam beradi.',
      'DjangoFilterBackend field bo\'yicha aniq filter beradi.'
    ],
    whenToUse: [
      'Clientga search va filter imkonini berishda.',
      'List endpointlarda advanced query kerak bo\'lsa.',
      'Sorting funksiyasi kerak bo\'lsa.',
      'Admin panel bo\'lmagan APIlarda.'
    ],
    codeSample: {
      title: 'filter_backends',
      language: 'python',
      code: "from rest_framework.filters import SearchFilter, OrderingFilter\nfrom django_filters.rest_framework import DjangoFilterBackend\n\nclass BookViewSet(ModelViewSet):\n    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]\n    search_fields = ['title']\n    ordering_fields = ['created_at']\n    filterset_fields = ['category']"
    },
    tags: ['drf', 'filtering']
  },
  {
    id: 'staticmethod',
    title: 'staticmethod - oddiy helper metod',
    category: 'Python & Models',
    description: [
      'staticmethod class yoki instance bilan bog\'lanmaydi.',
      'Helper funksiyalarni class ichida tartibli saqlash uchun.',
      'cls yoki self ishlatmaydi.',
      'Model ichida util metod sifatida foydali.'
    ],
    whenToUse: [
      'Classga tegishli, lekin state kerak bo\'lmagan metod bo\'lsa.',
      'Helper funksiyalarni tartib bilan saqlashda.',
      'Utility metodlarni bir joyda jamlash uchun.',
      'OOP strukturasini toza qilishda.'
    ],
    codeSample: {
      title: 'staticmethod',
      language: 'python',
      code: "class Price:\n    @staticmethod\n    def with_tax(amount, rate):\n        return amount + (amount * rate)"
    },
    tags: ['python', 'staticmethod']
  },
  {
    id: 'property',
    title: '@property - computed attribute',
    category: 'Python & Models',
    description: [
      '@property metodi field kabi ko\'rinadi.',
      'Computed qiymatlarni property bilan berish qulay.',
      'Read-only yoki read/write variant bo\'lishi mumkin.',
      'Modelda ko\'p ishlatiladi.'
    ],
    whenToUse: [
      'Calculated qiymat ko\'rsatish kerak bo\'lsa.',
      'API response uchun computed field kerak bo\'lsa.',
      'Read-only atribut yaratishda.',
      'Model logikasini toza saqlashda.'
    ],
    codeSample: {
      title: 'property',
      language: 'python',
      code: "class Book(models.Model):\n    price = models.DecimalField(max_digits=8, decimal_places=2)\n    discount = models.DecimalField(max_digits=8, decimal_places=2, default=0)\n\n    @property\n    def final_price(self):\n        return self.price - self.discount"
    },
    tags: ['python', 'property', 'models']
  },
  {
    id: 'str-method',
    title: '__str__ - obyektni chiroyli ko\'rsatish',
    category: 'Python & Models',
    description: [
      '__str__ admin va shellda obyektni ko\'rsatish uchun ishlatiladi.',
      'Readable output beradi.',
      'Modelni tez tanish uchun muhim.',
      'Default id ko\'rinishini yaxshilaydi.'
    ],
    whenToUse: [
      'Admin panelda chiroyli ko\'rinish uchun.',
      'Debug va shell ishlatishda.',
      'Loglarda aniq nom chiqishi uchun.',
      'Modelni identifikatsiya qilishda.'
    ],
    codeSample: {
      title: '__str__',
      language: 'python',
      code: "class Book(models.Model):\n    title = models.CharField(max_length=200)\n\n    def __str__(self):\n        return self.title"
    },
    tags: ['python', 'models', 'str']
  },
  {
    id: 'model-meta',
    title: 'Meta class - model sozlamalari',
    category: 'Python & Models',
    description: [
      'Meta class model ichida qo\'shimcha sozlamalar beradi.',
      'ordering, verbose_name, constraints, indexes kabi qoidalar shu yerda.',
      'DB va admin ko\'rinishini boshqaradi.',
      'Model behaviorini markazlashtiradi.'
    ],
    whenToUse: [
      'Default tartib berishda.',
      'Admin ko\'rinishini yaxshilashda.',
      'Constraint va indexlarni belgilashda.',
      'DB qoidalarini saqlashda.'
    ],
    codeSample: {
      title: 'Meta',
      language: 'python',
      code: "class Book(models.Model):\n    title = models.CharField(max_length=200)\n\n    class Meta:\n        ordering = ['-created_at']\n        verbose_name = 'Book'\n        verbose_name_plural = 'Books'"
    },
    tags: ['models', 'meta']
  },
  {
    id: 'save-override',
    title: 'save() override - custom save logika',
    category: 'Python & Models',
    description: [
      'save() override bilan custom logika yoziladi.',
      'super().save() chaqirish shart.',
      'Slug generate qilish kabi ishlar shu yerda.',
      'Agar logika og\'ir bo\'lsa service qatlamga o\'tkazing.'
    ],
    whenToUse: [
      'Save paytida fieldni auto to\'ldirish kerak bo\'lsa.',
      'Slug yoki normalized qiymat yaratishda.',
      'Data sanitizatsiya qilishda.',
      'Minimal logika bo\'lsa.'
    ],
    codeSample: {
      title: 'save override',
      language: 'python',
      code: "class Book(models.Model):\n    title = models.CharField(max_length=200)\n    slug = models.SlugField(blank=True)\n\n    def save(self, *args, **kwargs):\n        if not self.slug:\n            self.slug = self.title.lower().replace(' ', '-')\n        super().save(*args, **kwargs)"
    },
    tags: ['models', 'save']
  },
  {
    id: 'clean-method',
    title: 'clean() - model validation',
    category: 'Python & Models',
    description: [
      'clean() model ichidagi custom validation uchun.',
      'full_clean() chaqirilganda ishlaydi.',
      'ValidationError ko\'tariladi.',
      'Form va admin validatsiyasida foydali.'
    ],
    whenToUse: [
      'Modelda business validation kerak bo\'lsa.',
      'Admin formda tekshiruv qilishda.',
      'Fieldlar orasidagi bog\'liqlikni tekshirishda.',
      'Validation kodini markazlashtirishda.'
    ],
    codeSample: {
      title: 'clean',
      language: 'python',
      code: "from django.core.exceptions import ValidationError\n\nclass Book(models.Model):\n    price = models.DecimalField(max_digits=8, decimal_places=2)\n\n    def clean(self):\n        if self.price < 0:\n            raise ValidationError('Price must be positive')"
    },
    tags: ['models', 'validation']
  },
  {
    id: 'full-clean',
    title: 'full_clean() - to\'liq tekshiruv',
    category: 'Python & Models',
    description: [
      'full_clean() field va clean() validationlarni ishga tushiradi.',
      'save() avtomatik full_clean qilmaydi.',
      'Import yoki service logikada qo\'lda chaqiriladi.',
      'Data integrityni oshiradi.'
    ],
    whenToUse: [
      'Manual save qilinayotgan joylarda.',
      'Admin/formdan tashqari validatsiya kerak bo\'lsa.',
      'Import jarayonlarida data tekshirish uchun.',
      'Service layerda data sifatini saqlashda.'
    ],
    codeSample: {
      title: 'full_clean',
      language: 'python',
      code: "book = Book(title='Django', price=10)\nbook.full_clean()\nbook.save()"
    },
    tags: ['models', 'validation']
  },
  {
    id: 'model-methods',
    title: 'Model methodlar - biznes logika',
    category: 'Python & Models',
    description: [
      'Model methodlar obyektga tegishli business logikani saqlaydi.',
      'Self bilan fieldlarga kiradi.',
      'Viewdan toza chaqirish mumkin.',
      'Kichik logikalar uchun qulay.'
    ],
    whenToUse: [
      'Modelga tegishli kichik biznes qoida bo\'lsa.',
      'Service layerga chiqarmasdan ishlatish kerak bo\'lsa.',
      'Readable API kerak bo\'lsa.',
      'Modelga xos behaviorlar uchun.'
    ],
    codeSample: {
      title: 'model method',
      language: 'python',
      code: "class Book(models.Model):\n    stock = models.IntegerField(default=0)\n\n    def is_available(self):\n        return self.stock > 0"
    },
    tags: ['models', 'methods']
  },
  {
    id: 'custom-manager',
    title: 'Custom manager - QuerySet logikasi',
    category: 'Python & Models',
    description: [
      'Custom manager QuerySet logikani markazlashtiradi.',
      'objects.available() kabi metodlar yoziladi.',
      'Viewlar soddalashadi.',
      'QuerySet subclass bilan kengaytiriladi.'
    ],
    whenToUse: [
      'Ko\'p takrorlanadigan querylar bo\'lsa.',
      'Business querylar bitta joyda bo\'lishi kerak bo\'lsa.',
      'View kodini soddalashtirishda.',
      'Selectors patterniga yaqin bo\'lsa.'
    ],
    codeSample: {
      title: 'manager',
      language: 'python',
      code: "class BookQuerySet(models.QuerySet):\n    def available(self):\n        return self.filter(stock__gt=0)\n\nclass Book(models.Model):\n    objects = BookQuerySet.as_manager()"
    },
    tags: ['models', 'manager']
  },
  {
    id: 'model-inheritance',
    title: 'Model inheritance turlari',
    category: 'Python & Models',
    description: [
      'Abstract base class - umumiy fieldlarni meros beradi, jadval yaratmaydi.',
      'Multi-table inheritance - har class uchun alohida jadval.',
      'Proxy model - DB jadval o\'zgarmaydi, behavior o\'zgaradi.',
      'To\'g\'ri tur tanlash muhim.'
    ],
    whenToUse: [
      'Umumiy fieldlar ko\'p takrorlansa abstract base ishlating.',
      'Alohida jadval kerak bo\'lsa multi-table.',
      'Faqat behavior o\'zgartirish kerak bo\'lsa proxy.',
      'Large model strukturalarda.'
    ],
    codeSample: {
      title: 'abstract model',
      language: 'python',
      code: "class TimeStampedModel(models.Model):\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    class Meta:\n        abstract = True"
    },
    tags: ['models', 'inheritance']
  },
  {
    id: 'choices',
    title: 'TextChoices/IntegerChoices',
    category: 'Python & Models',
    description: [
      'Choices field qiymatlarini cheklaydi.',
      'TextChoices enum kabi ishlaydi.',
      'Human-readable label beradi.',
      'Biznes qoidalarni mustahkamlaydi.'
    ],
    whenToUse: [
      'Status yoki role field uchun.',
      'Cheklangan qiymatlar kerak bo\'lsa.',
      'Admin va API ko\'rinishini yaxshilashda.',
      'Validationni soddalashtirishda.'
    ],
    codeSample: {
      title: 'TextChoices',
      language: 'python',
      code: "class Status(models.TextChoices):\n    DRAFT = 'draft', 'Draft'\n    PUBLISHED = 'published', 'Published'\n\nclass Post(models.Model):\n    status = models.CharField(max_length=20, choices=Status.choices)"
    },
    tags: ['models', 'choices']
  },
  {
    id: 'validators',
    title: 'Validators - field tekshiruvlari',
    category: 'Python & Models',
    description: [
      'Validatorlar field qiymatini tekshiradi.',
      'Min/Max qiymat, regex, email va custom validatorlar bor.',
      'ValidationError ko\'taradi.',
      'Form va API validationda bir xil ishlaydi.'
    ],
    whenToUse: [
      'Field uchun aniq qoidalar bo\'lsa.',
      'Regex tekshiruvlar kerak bo\'lsa.',
      'Data integrity muhim bo\'lsa.',
      'User inputga cheklov qo\'yishda.'
    ],
    codeSample: {
      title: 'MinValueValidator',
      language: 'python',
      code: "from django.core.validators import MinValueValidator\n\nclass Product(models.Model):\n    price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])"
    },
    tags: ['models', 'validators']
  },
  {
    id: 'render',
    title: 'render() - template qaytarish',
    category: 'Views',
    description: [
      'render viewdan HTML template qaytaradi.',
      'context dict orqali data uzatiladi.',
      'HttpResponse o\'rniga qisqa usul.',
      'Template yo\'llari settings TEMPLATES bilan bog\'liq.'
    ],
    whenToUse: [
      'Classic Django template ishlatilsa.',
      'HTML sahifa qaytarishda.',
      'Context bilan data yuborishda.',
      'Template rendering kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'render',
      language: 'python',
      code: "from django.shortcuts import render\n\ndef home(request):\n    return render(request, 'home.html', {'title': 'Hello'})"
    },
    tags: ['view', 'render']
  },
  {
    id: 'redirect',
    title: 'redirect() - boshqa URLga yo\'naltirish',
    category: 'Views',
    description: [
      'redirect URL yoki view name bo\'yicha yo\'naltiradi.',
      'HTTP 302 status bilan ishlaydi.',
      'reverse bilan birga ishlatiladi.',
      'Login success yoki form submitda foydali.'
    ],
    whenToUse: [
      'Form submitdan keyin redirect qilishda.',
      'Login/logout flowda.',
      'URL nomi bo\'yicha yo\'naltirishda.',
      'PRG (Post/Redirect/Get) pattern uchun.'
    ],
    codeSample: {
      title: 'redirect',
      language: 'python',
      code: "from django.shortcuts import redirect\n\ndef logout_view(request):\n    logout(request)\n    return redirect('login')"
    },
    tags: ['view', 'redirect']
  },
  {
    id: 'reverse',
    title: 'reverse() / reverse_lazy',
    category: 'Views',
    description: [
      'reverse URL nomi bo\'yicha path yaratadi.',
      'reverse_lazy class-based viewlarda ishlatiladi.',
      'Hardcoded URL yozmaslik uchun.',
      'URL o\'zgarsa code buzilmaydi.'
    ],
    whenToUse: [
      'URL name bilan ishlashda.',
      'Redirect qilishda.',
      'CBV success_url berishda.',
      'Maintainable routing uchun.'
    ],
    codeSample: {
      title: 'reverse',
      language: 'python',
      code: "from django.urls import reverse\n\nurl = reverse('book-detail', kwargs={'pk': 1})"
    },
    tags: ['view', 'reverse']
  },
  {
    id: 'get-object-or-404',
    title: 'get_object_or_404() - xavfsiz olish',
    category: 'Views',
    description: [
      'get_object_or_404 topilmasa Http404 qaytaradi.',
      'Detail viewlar uchun standart usul.',
      'Xato handling soddalashadi.',
      'get ga nisbatan xavfsiz.'
    ],
    whenToUse: [
      'Detail endpointlarda.',
      'Not found bo\'lsa 404 qaytarish kerak bo\'lsa.',
      'Sodda error handling uchun.',
      'API yoki web viewlarda.'
    ],
    codeSample: {
      title: 'get_object_or_404',
      language: 'python',
      code: "from django.shortcuts import get_object_or_404\n\nbook = get_object_or_404(Book, pk=pk)"
    },
    tags: ['view', '404']
  },
  {
    id: 'http404',
    title: 'Http404 - manual 404',
    category: 'Views',
    description: [
      'Http404 exception ko\'taradi.',
      'Django avtomatik 404 response qaytaradi.',
      'Custom shartlarda ishlatiladi.',
      'Clean error handling uchun.'
    ],
    whenToUse: [
      'Custom shart bilan 404 berish kerak bo\'lsa.',
      'Access bo\'lmagan holatlarda.',
      'Resource topilmasa.',
      'Manual xato boshqarishda.'
    ],
    codeSample: {
      title: 'Http404',
      language: 'python',
      code: "from django.http import Http404\n\nif not request.user.is_staff:\n    raise Http404('Not found')"
    },
    tags: ['view', '404']
  },
  {
    id: 'http-response',
    title: 'HttpResponse - oddiy javob',
    category: 'Views',
    description: [
      'HttpResponse plain text yoki HTML qaytaradi.',
      'Custom status code berish mumkin.',
      'Soddaroq endpointlar uchun.',
      'Minimal response uchun qulay.'
    ],
    whenToUse: [
      'Quick response kerak bo\'lsa.',
      'Health check endpointlarda.',
      'Oddiy text javobda.',
      'Minimal viewlar uchun.'
    ],
    codeSample: {
      title: 'HttpResponse',
      language: 'python',
      code: "from django.http import HttpResponse\n\ndef ping(request):\n    return HttpResponse('ok', status=200)"
    },
    tags: ['view', 'httpresponse']
  },
  {
    id: 'json-response',
    title: 'JsonResponse - JSON javob',
    category: 'Views',
    description: [
      'JsonResponse JSON ko\'rinishda javob qaytaradi.',
      'safe=False bo\'lsa list qaytarish mumkin.',
      'Content-Type avtomatik application/json.',
      'API endpointlar uchun asosiy javob.'
    ],
    whenToUse: [
      'JSON API yozishda.',
      'List yoki dict qaytarishda.',
      'Frontend bilan data almashishda.',
      'AJAX endpointlarda.'
    ],
    codeSample: {
      title: 'JsonResponse',
      language: 'python',
      code: "from django.http import JsonResponse\n\ndef api_list(request):\n    return JsonResponse({'ok': True})"
    },
    tags: ['view', 'jsonresponse']
  },
  {
    id: 'request-data',
    title: 'request.GET/POST/FILES',
    category: 'Views',
    description: [
      'request.GET query paramlarni beradi.',
      'request.POST form data uchun ishlatiladi.',
      'request.FILES file upload data uchun.',
      'request.user authenticated userni beradi.'
    ],
    whenToUse: [
      'Query paramlarni olishda.',
      'Form submit data o\'qishda.',
      'File upload endpointlarda.',
      'Auth userni tekshirishda.'
    ],
    codeSample: {
      title: 'request data',
      language: 'python',
      code: "search = request.GET.get('q')\nname = request.POST.get('name')\nfile = request.FILES.get('file')"
    },
    tags: ['view', 'request']
  },
  {
    id: 'require-http-methods',
    title: 'require_http_methods - metod cheklash',
    category: 'Views',
    description: [
      'require_http_methods decorator request metodlarini cheklaydi.',
      'GET/POST/PUT kabi metodlarni ruxsat beradi.',
      'Noto\'g\'ri metod bo\'lsa 405 qaytaradi.',
      'Kodni soddalashtiradi.'
    ],
    whenToUse: [
      'Endpoint faqat GET yoki POST bo\'lishi kerak bo\'lsa.',
      'API xavfsizligini oshirishda.',
      'View logikasini soddalashtirishda.',
      'HTTP method nazoratida.'
    ],
    codeSample: {
      title: 'require_http_methods',
      language: 'python',
      code: "from django.views.decorators.http import require_http_methods\n\n@require_http_methods(['GET'])\ndef list_view(request):\n    return JsonResponse({'ok': True})"
    },
    tags: ['view', 'decorators']
  },
  {
    id: 'login-required',
    title: 'login_required - autentifikatsiya',
    category: 'Views',
    description: [
      'login_required decorator login bo\'lmaganlarni login pagega yuboradi.',
      'Authentication check uchun sodda usul.',
      'Login URL settingsda belgilanadi.',
      'FBV uchun qulay.'
    ],
    whenToUse: [
      'Auth bo\'lishi shart bo\'lgan viewlarda.',
      'User data bilan ishlaganda.',
      'Private sahifalarda.',
      'Web app endpointlarda.'
    ],
    codeSample: {
      title: 'login_required',
      language: 'python',
      code: "from django.contrib.auth.decorators import login_required\n\n@login_required\ndef profile(request):\n    return JsonResponse({'user': request.user.email})"
    },
    tags: ['view', 'auth']
  },
  {
    id: 'permission-required',
    title: 'permission_required - ruxsat tekshiruv',
    category: 'Views',
    description: [
      'permission_required decorator user permissionini tekshiradi.',
      'permission yo\'q bo\'lsa 403 yoki redirect qiladi.',
      'Granular access control beradi.',
      'Admin-like access uchun foydali.'
    ],
    whenToUse: [
      'Role-based access kerak bo\'lsa.',
      'Admin funksiyalarini cheklashda.',
      'Sensitive data bo\'lsa.',
      'Permission system ishlatilsa.'
    ],
    codeSample: {
      title: 'permission_required',
      language: 'python',
      code: "from django.contrib.auth.decorators import permission_required\n\n@permission_required('books.change_book')\ndef edit_book(request):\n    return JsonResponse({'ok': True})"
    },
    tags: ['view', 'permissions']
  },
  {
    id: 'csrf-exempt',
    title: 'csrf_exempt - CSRFni o\'chirish',
    category: 'Views',
    description: [
      'csrf_exempt decorator CSRF tekshiruvini o\'chiradi.',
      'Xavfsizlikni kamaytiradi, ehtiyot bo\'ling.',
      'API endpointlarda token ishlatilsa mumkin.',
      'POST so\'rovlarda CSRF errorni yo\'q qiladi.'
    ],
    whenToUse: [
      'API faqat token auth bo\'lsa.',
      'External webhooklar uchun.',
      'CSRF to\'g\'ri ishlamasa vaqtinchalik.',
      'Test environmentda.'
    ],
    codeSample: {
      title: 'csrf_exempt',
      language: 'python',
      code: "from django.views.decorators.csrf import csrf_exempt\n\n@csrf_exempt\ndef webhook(request):\n    return JsonResponse({'ok': True})"
    },
    tags: ['view', 'csrf']
  },
  {
    id: 'list-view',
    title: 'ListView - generic list',
    category: 'Views',
    description: [
      'ListView model obyektlarini list ko\'rinishda beradi.',
      'paginate_by bilan pagination qo\'shiladi.',
      'template_name va context_object_name sozlanadi.',
      'CBV asosida ishlaydi.'
    ],
    whenToUse: [
      'HTML list sahifalar uchun.',
      'Klassik Django template ishlatilsa.',
      'Kod qisqartirish uchun.',
      'Pagination kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'ListView',
      language: 'python',
      code: "from django.views.generic import ListView\n\nclass BookListView(ListView):\n    model = Book\n    paginate_by = 10"
    },
    tags: ['view', 'cbv', 'generic']
  },
  {
    id: 'detail-view',
    title: 'DetailView - bitta obyekt',
    category: 'Views',
    description: [
      'DetailView bitta obyektni ko\'rsatadi.',
      'pk yoki slug orqali obyekt topadi.',
      'template_name bilan template belgilanadi.',
      'CBV asosida ishlaydi.'
    ],
    whenToUse: [
      'Detail page kerak bo\'lsa.',
      'Object ko\'rsatish uchun.',
      'Slug asosida view bo\'lsa.',
      'Template renderingda.'
    ],
    codeSample: {
      title: 'DetailView',
      language: 'python',
      code: "from django.views.generic import DetailView\n\nclass BookDetailView(DetailView):\n    model = Book"
    },
    tags: ['view', 'cbv', 'generic']
  },
  {
    id: 'create-view',
    title: 'CreateView - obyekt yaratish',
    category: 'Views',
    description: [
      'CreateView form orqali yangi obyekt yaratadi.',
      'fields yoki form_class beriladi.',
      'success_url bilan redirect qiladi.',
      'Form handling avtomatik.'
    ],
    whenToUse: [
      'HTML form bilan create sahifa kerak bo\'lsa.',
      'Model yaratish formi bo\'lsa.',
      'CBV bilan tez yaratishda.',
      'Form validation avtomatik bo\'lishi kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'CreateView',
      language: 'python',
      code: "from django.views.generic import CreateView\n\nclass BookCreateView(CreateView):\n    model = Book\n    fields = ['title', 'price']\n    success_url = '/books/'"
    },
    tags: ['view', 'cbv', 'generic']
  },
  {
    id: 'update-view',
    title: 'UpdateView - obyektni tahrirlash',
    category: 'Views',
    description: [
      'UpdateView form orqali obyektni tahrirlaydi.',
      'pk yoki slug bo\'yicha obyekt topiladi.',
      'Form validation avtomatik ishlaydi.',
      'success_url bilan redirect qiladi.'
    ],
    whenToUse: [
      'HTML edit form kerak bo\'lsa.',
      'Model update sahifa uchun.',
      'CBV bilan tez tahrir qilishda.',
      'Standard edit flow uchun.'
    ],
    codeSample: {
      title: 'UpdateView',
      language: 'python',
      code: "from django.views.generic import UpdateView\n\nclass BookUpdateView(UpdateView):\n    model = Book\n    fields = ['title', 'price']"
    },
    tags: ['view', 'cbv', 'generic']
  },
  {
    id: 'delete-view',
    title: 'DeleteView - obyektni o\'chirish',
    category: 'Views',
    description: [
      'DeleteView obyektni o\'chiradi.',
      'Confirm template ishlatiladi.',
      'success_url ga redirect qiladi.',
      'CBV asosida ishlaydi.'
    ],
    whenToUse: [
      'HTML delete confirmation kerak bo\'lsa.',
      'Admin bo\'lmagan delete flow kerak bo\'lsa.',
      'CBV bilan tez o\'chirishda.',
      'Standard delete flowda.'
    ],
    codeSample: {
      title: 'DeleteView',
      language: 'python',
      code: "from django.views.generic import DeleteView\n\nclass BookDeleteView(DeleteView):\n    model = Book\n    success_url = '/books/'"
    },
    tags: ['view', 'cbv', 'generic']
  },
  {
    id: 'form-view',
    title: 'FormView - custom form',
    category: 'Views',
    description: [
      'FormView custom form bilan ishlaydi.',
      'form_valid metodini override qilasiz.',
      'Model bo\'lmagan formalar uchun qulay.',
      'success_url bilan redirect qiladi.'
    ],
    whenToUse: [
      'Modelga bog\'liq bo\'lmagan form bo\'lsa.',
      'Contact form, feedback form kabi holatlar.',
      'Custom validation kerak bo\'lsa.',
      'Form processingni soddalashtirishda.'
    ],
    codeSample: {
      title: 'FormView',
      language: 'python',
      code: "from django.views.generic import FormView\n\nclass ContactView(FormView):\n    form_class = ContactForm\n    success_url = '/thanks/'\n\n    def form_valid(self, form):\n        form.send_email()\n        return super().form_valid(form)"
    },
    tags: ['view', 'cbv', 'forms']
  },
  {
    id: 'get-context-data',
    title: 'get_context_data - CBV context',
    category: 'Views',
    description: [
      'get_context_data CBV contextni kengaytiradi.',
      'Templatega qo\'shimcha data berasiz.',
      'super() chaqirish kerak.',
      'Reusable context logic uchun qulay.'
    ],
    whenToUse: [
      'Templatega qo\'shimcha data uzatishda.',
      'CBV ichida context qo\'shishda.',
      'Base viewlar uchun umumiy contextda.',
      'Clean template context uchun.'
    ],
    codeSample: {
      title: 'get_context_data',
      language: 'python',
      code: "class BookListView(ListView):\n    model = Book\n\n    def get_context_data(self, **kwargs):\n        ctx = super().get_context_data(**kwargs)\n        ctx['total'] = Book.objects.count()\n        return ctx"
    },
    tags: ['view', 'cbv']
  },
  {
    id: 'paginator',
    title: 'Paginator - sahifalash',
    category: 'Views',
    description: [
      'Paginator querysetni sahifalarga bo\'ladi.',
      'Page object orqali itemlar olinadi.',
      'Custom pagination uchun ishlatiladi.',
      'Katta listlarda UXni yaxshilaydi.'
    ],
    whenToUse: [
      'List endpointlar katta bo\'lsa.',
      'Custom pagination logic yozishda.',
      'HTML listlarda page ko\'rsatishda.',
      'Performance va UX muhim bo\'lsa.'
    ],
    codeSample: {
      title: 'Paginator',
      language: 'python',
      code: "from django.core.paginator import Paginator\n\np = Paginator(Book.objects.all(), 10)\npage = p.get_page(request.GET.get('page'))"
    },
    tags: ['view', 'pagination']
  },
  {
    id: 'charfield',
    title: 'CharField - qisqa matn',
    category: 'Model Fields',
    description: [
      'CharField qisqa matnlar uchun ishlatiladi.',
      'max_length majburiy parametr.',
      'Name, title, code kabi qiymatlar uchun.',
      'DBda varchar type.'
    ],
    whenToUse: [
      'Qisqa matn kerak bo\'lsa.',
      'Title yoki name fieldlar uchun.',
      'Slug yoki code uchun.',
      'Length cheklash kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'CharField',
      language: 'python',
      code: "title = models.CharField(max_length=200)"
    },
    tags: ['models', 'field', 'charfield']
  },
  {
    id: 'textfield',
    title: 'TextField - uzun matn',
    category: 'Model Fields',
    description: [
      'TextField uzun matnlar uchun ishlatiladi.',
      'max_length majburiy emas (lekin formda ishlatiladi).',
      'Description, content kabi fieldlar uchun.',
      'DBda text type.'
    ],
    whenToUse: [
      'Uzun matn kerak bo\'lsa.',
      'Post content yoki description uchun.',
      'Length cheklovsiz matnlar uchun.',
      'Blog/article kontentida.'
    ],
    codeSample: {
      title: 'TextField',
      language: 'python',
      code: "content = models.TextField(blank=True)"
    },
    tags: ['models', 'field', 'textfield']
  },
  {
    id: 'integerfield',
    title: 'IntegerField - butun son',
    category: 'Model Fields',
    description: [
      'IntegerField butun sonlar uchun.',
      'Minus qiymatlar ruxsat etiladi.',
      'Count, stock, age kabi fieldlar uchun.',
      'DBda integer type.'
    ],
    whenToUse: [
      'Butun son kerak bo\'lsa.',
      'Counter yoki quantity uchun.',
      'Age/stock kabi qiymatlar.',
      'Numerik fieldlarda.'
    ],
    codeSample: {
      title: 'IntegerField',
      language: 'python',
      code: "stock = models.IntegerField(default=0)"
    },
    tags: ['models', 'field', 'integerfield']
  },
  {
    id: 'bigintegerfield',
    title: 'BigIntegerField - katta son',
    category: 'Model Fields',
    description: [
      'BigIntegerField juda katta butun sonlar uchun.',
      'ID yoki katta countlar uchun.',
      'IntegerField dan kattaroq diapazon.',
      'DBda bigint type.'
    ],
    whenToUse: [
      '2^31 dan katta qiymat kerak bo\'lsa.',
      'Katta count yoki external ID uchun.',
      'Massive analytics data uchun.',
      'Large scale systemlarda.'
    ],
    codeSample: {
      title: 'BigIntegerField',
      language: 'python',
      code: "external_id = models.BigIntegerField()"
    },
    tags: ['models', 'field', 'bigintegerfield']
  },
  {
    id: 'smallintegerfield',
    title: 'SmallIntegerField - kichik son',
    category: 'Model Fields',
    description: [
      'SmallIntegerField kichik butun sonlar uchun.',
      'Status yoki small counters uchun.',
      'IntegerField dan kichik diapazon.',
      'DBda smallint type.'
    ],
    whenToUse: [
      'Kichik sonlar kerak bo\'lsa.',
      'Status kodlari uchun.',
      'Enum qiymatlarida.',
      'Memoryni tejashda.'
    ],
    codeSample: {
      title: 'SmallIntegerField',
      language: 'python',
      code: "status_code = models.SmallIntegerField(default=0)"
    },
    tags: ['models', 'field', 'smallintegerfield']
  },
  {
    id: 'positiveintegerfield',
    title: 'PositiveIntegerField - musbat son',
    category: 'Model Fields',
    description: [
      'PositiveIntegerField faqat musbat son oladi.',
      'Negative qiymat ruxsat etilmaydi.',
      'Stock, count kabi fieldlar uchun.',
      'DB constraint bilan ishlaydi.'
    ],
    whenToUse: [
      'Manfiy bo\'lishi mumkin bo\'lmagan qiymatlar uchun.',
      'Quantity va countlar uchun.',
      'User age kabi qiymatlarda.',
      'Data integrity kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'PositiveIntegerField',
      language: 'python',
      code: "count = models.PositiveIntegerField(default=0)"
    },
    tags: ['models', 'field', 'positiveintegerfield']
  },
  {
    id: 'positivesmallintegerfield',
    title: 'PositiveSmallIntegerField - kichik musbat son',
    category: 'Model Fields',
    description: [
      'PositiveSmallIntegerField kichik musbat sonlar uchun.',
      'Enum yoki status kodlarida ishlatiladi.',
      'SmallIntegerField dan kichik diapazon.',
      'DBda smallint type.'
    ],
    whenToUse: [
      'Kichik musbat qiymatlar kerak bo\'lsa.',
      'Status yoki rating (1-5) kabi qiymatlar uchun.',
      'Enum qiymatlarida.',
      'Memory tejalishi kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'PositiveSmallIntegerField',
      language: 'python',
      code: "rating = models.PositiveSmallIntegerField(default=1)"
    },
    tags: ['models', 'field', 'positivesmallintegerfield']
  },
  {
    id: 'floatfield',
    title: 'FloatField - floating son',
    category: 'Model Fields',
    description: [
      'FloatField suzuvchi nuqtali sonlar uchun.',
      'Aniqlik muhim bo\'lsa DecimalField ishlating.',
      'Scientific yoki approximate qiymatlar uchun.',
      'DBda float type.'
    ],
    whenToUse: [
      'Aniqlik muhim bo\'lmagan qiymatlar uchun.',
      'Approximate metriclar uchun.',
      'Real-time sensor data kabi.',
      'Float qiymatlar kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'FloatField',
      language: 'python',
      code: "temperature = models.FloatField()"
    },
    tags: ['models', 'field', 'floatfield']
  },
  {
    id: 'decimalfield',
    title: 'DecimalField - aniq son',
    category: 'Model Fields',
    description: [
      'DecimalField aniq hisob uchun ishlatiladi.',
      'max_digits va decimal_places majburiy.',
      'Pul va moliyaviy qiymatlar uchun tavsiya.',
      'Float xatolaridan qochadi.'
    ],
    whenToUse: [
      'Pul va moliyaviy qiymatlarda.',
      'Aniqlik muhim bo\'lsa.',
      'Tax, amount kabi hisoblarda.',
      'Accounting va billingda.'
    ],
    codeSample: {
      title: 'DecimalField',
      language: 'python',
      code: "price = models.DecimalField(max_digits=8, decimal_places=2)"
    },
    tags: ['models', 'field', 'decimalfield']
  },
  {
    id: 'booleanfield',
    title: 'BooleanField - true/false',
    category: 'Model Fields',
    description: [
      'BooleanField True/False qiymat beradi.',
      'default qiymat berish tavsiya.',
      'Null kerak bo\'lsa null=True bilan ishlatiladi.',
      'Aktiv/pasiv flaglar uchun.'
    ],
    whenToUse: [
      'True/False flaglar uchun.',
      'is_active, is_staff kabi fieldlar.',
      'Feature flaglarda.',
      'Binary holatlarda.'
    ],
    codeSample: {
      title: 'BooleanField',
      language: 'python',
      code: "is_active = models.BooleanField(default=True)"
    },
    tags: ['models', 'field', 'booleanfield']
  },
  {
    id: 'datefield',
    title: 'DateField - sana',
    category: 'Model Fields',
    description: [
      'DateField faqat sana saqlaydi.',
      'auto_now va auto_now_add ishlatilishi mumkin.',
      'Birthday yoki release_date uchun.',
      'DBda date type.'
    ],
    whenToUse: [
      'Faqat sana kerak bo\'lsa.',
      'Tug\'ilgan sana, event day uchun.',
      'Datetime kerak bo\'lmasa.',
      'Kunlik statistikalar uchun.'
    ],
    codeSample: {
      title: 'DateField',
      language: 'python',
      code: "released_on = models.DateField()"
    },
    tags: ['models', 'field', 'datefield']
  },
  {
    id: 'datetimefield',
    title: 'DateTimeField - sana va vaqt',
    category: 'Model Fields',
    description: [
      'DateTimeField sana va vaqt saqlaydi.',
      'auto_now_add yaratish vaqtini qo\'yadi.',
      'auto_now update vaqtini yangilaydi.',
      'DBda timestamp type.'
    ],
    whenToUse: [
      'Yaratilgan/yangilangan vaqtni saqlashda.',
      'Log va auditlarda.',
      'Time-sensitive data bo\'lsa.',
      'Event schedulingda.'
    ],
    codeSample: {
      title: 'DateTimeField',
      language: 'python',
      code: "created_at = models.DateTimeField(auto_now_add=True)"
    },
    tags: ['models', 'field', 'datetimefield']
  },
  {
    id: 'timefield',
    title: 'TimeField - vaqt',
    category: 'Model Fields',
    description: [
      'TimeField faqat vaqtni saqlaydi.',
      'Datetime emas, faqat HH:MM:SS.',
      'Shift time yoki schedule uchun.',
      'DBda time type.'
    ],
    whenToUse: [
      'Faqat vaqt kerak bo\'lsa.',
      'Ish vaqti yoki schedule uchun.',
      'Datetime kerak bo\'lmasa.',
      'Daily time settingsda.'
    ],
    codeSample: {
      title: 'TimeField',
      language: 'python',
      code: "start_time = models.TimeField()"
    },
    tags: ['models', 'field', 'timefield']
  },
  {
    id: 'durationfield',
    title: 'DurationField - davomiylik',
    category: 'Model Fields',
    description: [
      'DurationField vaqt davomiyligini saqlaydi.',
      'timedelta bilan ishlaydi.',
      'Ish davomiyligi yoki video length uchun.',
      'DBda interval type (Postgres).'
    ],
    whenToUse: [
      'Davomiylik kerak bo\'lsa.',
      'Video/audio length uchun.',
      'Task durationlar uchun.',
      'SLA timinglar uchun.'
    ],
    codeSample: {
      title: 'DurationField',
      language: 'python',
      code: "duration = models.DurationField()"
    },
    tags: ['models', 'field', 'durationfield']
  },
  {
    id: 'emailfield',
    title: 'EmailField - email',
    category: 'Model Fields',
    description: [
      'EmailField email formatini validatsiya qiladi.',
      'CharField asosida ishlaydi.',
      'Unique bilan birga ishlatilishi mumkin.',
      'Auth va contact data uchun.'
    ],
    whenToUse: [
      'Email saqlashda.',
      'User login email bo\'lsa.',
      'Contact form data uchun.',
      'Validatsiya kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'EmailField',
      language: 'python',
      code: "email = models.EmailField(unique=True)"
    },
    tags: ['models', 'field', 'emailfield']
  },
  {
    id: 'urlfield',
    title: 'URLField - URL',
    category: 'Model Fields',
    description: [
      'URLField URL formatini validatsiya qiladi.',
      'CharField asosida ishlaydi.',
      'Website yoki link saqlash uchun.',
      'Max_length berish tavsiya.'
    ],
    whenToUse: [
      'Website yoki link saqlashda.',
      'User profile linklari uchun.',
      'External resource URL uchun.',
      'Validatsiya kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'URLField',
      language: 'python',
      code: "website = models.URLField(blank=True)"
    },
    tags: ['models', 'field', 'urlfield']
  },
  {
    id: 'slugfield',
    title: 'SlugField - URL-friendly',
    category: 'Model Fields',
    description: [
      'SlugField URL-friendly string saqlaydi.',
      'CharField asosida ishlaydi.',
      'prepopulated_fields bilan admin auto to\'ldirish mumkin.',
      'SEO va human-readable URL uchun.'
    ],
    whenToUse: [
      'URL slug kerak bo\'lsa.',
      'Title asosida slug yaratishda.',
      'Readable URL uchun.',
      'SEO friendly linklarda.'
    ],
    codeSample: {
      title: 'SlugField',
      language: 'python',
      code: "slug = models.SlugField(unique=True)"
    },
    tags: ['models', 'field', 'slugfield']
  },
  {
    id: 'uuidfield',
    title: 'UUIDField - global unique id',
    category: 'Model Fields',
    description: [
      'UUIDField unique identifikator saqlaydi.',
      'Public API uchun id yashirishda foydali.',
      'Default qilib uuid.uuid4 beriladi.',
      'DBda uuid type (Postgres).'
    ],
    whenToUse: [
      'Public URLlarda id ko\'rsatishdan qochishda.',
      'Distributed systemlarda.',
      'Unique token sifatida.',
      'Security uchun.'
    ],
    codeSample: {
      title: 'UUIDField',
      language: 'python',
      code: "import uuid\n\nuuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)"
    },
    tags: ['models', 'field', 'uuidfield']
  },
  {
    id: 'filefield',
    title: 'FileField - fayl saqlash',
    category: 'Model Fields',
    description: [
      'FileField fayl uploadlarni saqlaydi.',
      'upload_to bilan folder belgilanadi.',
      'MEDIA_ROOT va MEDIA_URL sozlanishi kerak.',
      'Any file uchun ishlaydi.'
    ],
    whenToUse: [
      'File upload kerak bo\'lsa.',
      'PDF yoki docs saqlashda.',
      'User hujjatlari uchun.',
      'Storage integratsiyasida.'
    ],
    codeSample: {
      title: 'FileField',
      language: 'python',
      code: "document = models.FileField(upload_to='docs/')"
    },
    tags: ['models', 'field', 'filefield']
  },
  {
    id: 'imagefield',
    title: 'ImageField - rasm saqlash',
    category: 'Model Fields',
    description: [
      'ImageField rasm uploadlarni saqlaydi.',
      'Pillow kutubxonasi kerak bo\'ladi.',
      'upload_to bilan folder belgilanadi.',
      'Image validation ishlaydi.'
    ],
    whenToUse: [
      'Avatar yoki product image uchun.',
      'Media upload bo\'lsa.',
      'Image validation kerak bo\'lsa.',
      'Gallery va contentlarda.'
    ],
    codeSample: {
      title: 'ImageField',
      language: 'python',
      code: "image = models.ImageField(upload_to='images/')"
    },
    tags: ['models', 'field', 'imagefield']
  },
  {
    id: 'binaryfield',
    title: 'BinaryField - binary data',
    category: 'Model Fields',
    description: [
      'BinaryField raw binary data saqlaydi.',
      'Katta fayl uchun tavsiya etilmaydi.',
      'Byte data yoki small blobs uchun.',
      'Direct DB storage ishlatiladi.'
    ],
    whenToUse: [
      'Kichik binary data saqlashda.',
      'Fayl storage ishlatilmasa.',
      'Legacy data bilan ishlashda.',
      'Maxsus byte stringlar uchun.'
    ],
    codeSample: {
      title: 'BinaryField',
      language: 'python',
      code: "blob = models.BinaryField()"
    },
    tags: ['models', 'field', 'binaryfield']
  },
  {
    id: 'jsonfield',
    title: 'JSONField - JSON data',
    category: 'Model Fields',
    description: [
      'JSONField dict/list ko\'rinishda data saqlaydi.',
      'Postgresda GIN index bilan tezlashadi.',
      'Flexible schema uchun qulay.',
      'Validationni qo\'lda qilish kerak bo\'lishi mumkin.'
    ],
    whenToUse: [
      'Dynamic schema kerak bo\'lsa.',
      'Settings yoki metadata saqlashda.',
      'Structure o\'zgaruvchan bo\'lsa.',
      'Key-value data uchun.'
    ],
    codeSample: {
      title: 'JSONField',
      language: 'python',
      code: "data = models.JSONField(default=dict)"
    },
    tags: ['models', 'field', 'jsonfield']
  },
  {
    id: 'genericipaddressfield',
    title: 'GenericIPAddressField - IP manzil',
    category: 'Model Fields',
    description: [
      'GenericIPAddressField IPv4/IPv6 saqlaydi.',
      'IP formatini validatsiya qiladi.',
      'Log va security uchun ishlatiladi.',
      'CharField asosida ishlaydi.'
    ],
    whenToUse: [
      'Client IP saqlashda.',
      'Security loglarda.',
      'Access loglarda.',
      'Network data uchun.'
    ],
    codeSample: {
      title: 'GenericIPAddressField',
      language: 'python',
      code: "ip_address = models.GenericIPAddressField()"
    },
    tags: ['models', 'field', 'ip']
  },
  {
    id: 'autofield',
    title: 'AutoField / BigAutoField - PK',
    category: 'Model Fields',
    description: [
      'AutoField avtomatik increment primary key beradi.',
      'BigAutoField katta diapazon uchun.',
      'DEFAULT_AUTO_FIELD settingsda belgilanadi.',
      'Default PK sifatida ishlatiladi.'
    ],
    whenToUse: [
      'Oddiy primary key kerak bo\'lsa.',
      'Big data bo\'lsa BigAutoField tanlang.',
      'Default PK sozlashda.',
      'Legacy projectlarda AutoField uchraydi.'
    ],
    codeSample: {
      title: 'BigAutoField',
      language: 'python',
      code: "id = models.BigAutoField(primary_key=True)"
    },
    tags: ['models', 'field', 'autofield']
  },
  {
    id: 'foreignkey',
    title: 'ForeignKey - one-to-many',
    category: 'Model Fields',
    description: [
      'ForeignKey bir modelni boshqasiga bog\'laydi.',
      'on_delete qoidasi majburiy.',
      'related_name bilan reverse access beriladi.',
      'One-to-many relation uchun.'
    ],
    whenToUse: [
      'Bir model ko\'p obyekt bilan bog\'lansa.',
      'Author - Book kabi relatsiyada.',
      'Parent-child relationshipda.',
      'Data normalization uchun.'
    ],
    codeSample: {
      title: 'ForeignKey',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')"
    },
    tags: ['models', 'field', 'foreignkey']
  },
  {
    id: 'onetoonefield',
    title: 'OneToOneField - 1:1 relation',
    category: 'Model Fields',
    description: [
      'OneToOneField har obyekt uchun bitta bog\'lanishni beradi.',
      'Profile - User kabi holatlarda.',
      'ForeignKey ga o\'xshaydi, lekin unique.',
      'Reverse access mavjud.'
    ],
    whenToUse: [
      'Har userda bitta profil bo\'lsa.',
      '1:1 relation kerak bo\'lsa.',
      'Separate tableda qo\'shimcha field saqlashda.',
      'Optional extension data uchun.'
    ],
    codeSample: {
      title: 'OneToOneField',
      language: 'python',
      code: "user = models.OneToOneField(User, on_delete=models.CASCADE)"
    },
    tags: ['models', 'field', 'onetoone']
  },
  {
    id: 'manytomanyfield',
    title: 'ManyToManyField - M2M relation',
    category: 'Model Fields',
    description: [
      'ManyToManyField ko\'pdan-ko\'p bog\'lanish yaratadi.',
      'Oraliq (through) model bilan qo\'shimcha field saqlash mumkin.',
      'Reverse access related_name bilan beriladi.',
      'Tag/Book kabi holatlarda.'
    ],
    whenToUse: [
      'Ko\'pdan-ko\'p relation kerak bo\'lsa.',
      'Book va Tag kabi bog\'lanishda.',
      'User va Group relationda.',
      'Oraliq model kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'ManyToManyField',
      language: 'python',
      code: "tags = models.ManyToManyField(Tag, related_name='books')"
    },
    tags: ['models', 'field', 'manytomany']
  },
  {
    id: 'max-length',
    title: 'max_length - maksimal uzunlik',
    category: 'Model Field Params',
    description: [
      'max_length CharField, SlugField, EmailField kabi fieldlarda majburiy.',
      'DBda varchar uzunligini belgilaydi.',
      'Form va serializerlarda validatsiya beradi.',
      'Kerakli real limitni qo\'ying.'
    ],
    whenToUse: [
      'Qisqa matn fieldlarda.',
      'DB size va validatsiyani boshqarishda.',
      'Slug, title, code uchun.',
      'Performance va data sifati uchun.'
    ],
    codeSample: {
      title: 'max_length',
      language: 'python',
      code: "title = models.CharField(max_length=200)"
    },
    tags: ['params', 'max_length']
  },
  {
    id: 'null',
    title: 'null=True - DBda null ruxsat',
    category: 'Model Field Params',
    description: [
      'null=True bo\'lsa DB ustunida NULL saqlanishi mumkin.',
      'Text fieldlarda ko\'pincha null=False ishlatiladi.',
      'BooleanField uchun null ishlatishdan ehtiyot bo\'ling.',
      'null va blank bir xil emas.'
    ],
    whenToUse: [
      'DB darajasida bo\'sh qiymatga ruxsat kerak bo\'lsa.',
      'Optional fieldlar uchun.',
      'Datetime yoki FK optional bo\'lsa.',
      'Null qiymatni semantik ma\'noda ajratish kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'null',
      language: 'python',
      code: "published_at = models.DateTimeField(null=True, blank=True)"
    },
    tags: ['params', 'null']
  },
  {
    id: 'blank',
    title: 'blank=True - formda bo\'sh ruxsat',
    category: 'Model Field Params',
    description: [
      'blank=True form va admin validatsiyasiga ta\'sir qiladi.',
      'blank bo\'lsa field kiritilmasligi mumkin.',
      'DB null bo\'lishi shart emas.',
      'TextField uchun blank=True keng ishlatiladi.'
    ],
    whenToUse: [
      'Formda optional field bo\'lsa.',
      'Admin panelda majburiy bo\'lmasligi kerak bo\'lsa.',
      'User input optional bo\'lsa.',
      'Null shart emas, lekin bo\'sh bo\'lishi mumkin bo\'lsa.'
    ],
    codeSample: {
      title: 'blank',
      language: 'python',
      code: "bio = models.TextField(blank=True)"
    },
    tags: ['params', 'blank']
  },
  {
    id: 'default',
    title: 'default - standart qiymat',
    category: 'Model Field Params',
    description: [
      'default fieldga avtomatik qiymat beradi.',
      'Callable (funksiya) berish mumkin.',
      'Yangi obyektlarda qiymat bo\'lmasa default ishlaydi.',
      'Migrationda default qiymat yozilishi mumkin.'
    ],
    whenToUse: [
      'Field majburiy bo\'lsa, lekin avtomatik qiymat kerak bo\'lsa.',
      'Boolean va status fieldlarda.',
      'Counter yoki flaglar uchun.',
      'Data consistency uchun.'
    ],
    codeSample: {
      title: 'default',
      language: 'python',
      code: "is_active = models.BooleanField(default=True)"
    },
    tags: ['params', 'default']
  },
  {
    id: 'unique',
    title: 'unique=True - yagona qiymat',
    category: 'Model Field Params',
    description: [
      'unique=True bo\'lsa DBda unique constraint yaratiladi.',
      'Duplicate qiymat kiritilsa IntegrityError beradi.',
      'Index avtomatik yaratiladi.',
      'Email, username, code uchun ko\'p ishlatiladi.'
    ],
    whenToUse: [
      'Unikal qiymat kerak bo\'lsa.',
      'Login email yoki username uchun.',
      'SKU, slug, code kabi fieldlar uchun.',
      'Data integrity uchun.'
    ],
    codeSample: {
      title: 'unique',
      language: 'python',
      code: "email = models.EmailField(unique=True)"
    },
    tags: ['params', 'unique']
  },
  {
    id: 'db-index',
    title: 'db_index=True - tez qidiruv',
    category: 'Model Field Params',
    description: [
      'db_index fieldga index qo\'shadi.',
      'Filter va order_by tezlashadi.',
      'Ko\'p index yozish write tezligini pasaytiradi.',
      'Katta datasetda foydali.'
    ],
    whenToUse: [
      'Ko\'p filter qilinadigan fieldlarda.',
      'Order_by ishlatiladigan fieldlarda.',
      'Search endpointlarda.',
      'Performance muhim bo\'lsa.'
    ],
    codeSample: {
      title: 'db_index',
      language: 'python',
      code: "isbn = models.CharField(max_length=13, db_index=True)"
    },
    tags: ['params', 'db_index']
  },
  {
    id: 'db-column',
    title: 'db_column - DB ustun nomi',
    category: 'Model Field Params',
    description: [
      'db_column DB ustun nomini override qiladi.',
      'Legacy DB bilan ishlashda foydali.',
      'Model field nomi bilan DB column nomi farq qiladi.',
      'Migrationsda to\'g\'ri ustun ishlatiladi.'
    ],
    whenToUse: [
      'Legacy database bilan integratsiyada.',
      'DB naming standartidan farq qilganda.',
      'External DB bilan ishlashda.',
      'Migrationda column name boshqarishda.'
    ],
    codeSample: {
      title: 'db_column',
      language: 'python',
      code: "legacy_code = models.CharField(max_length=50, db_column='legacyCode')"
    },
    tags: ['params', 'db_column']
  },
  {
    id: 'verbose-name',
    title: 'verbose_name - ko\'rinadigan nom',
    category: 'Model Field Params',
    description: [
      'verbose_name admin va formda ko\'rinadigan nom beradi.',
      'Human-readable label uchun ishlatiladi.',
      'Ko\'p tilli UI uchun qulay.',
      'Model Meta verbose_name bilan birga ishlaydi.'
    ],
    whenToUse: [
      'Admin UI yaxshilashda.',
      'Human-readable label kerak bo\'lsa.',
      'Ko\'p user bilan ishlatiladigan adminlarda.',
      'Localization bo\'lsa.'
    ],
    codeSample: {
      title: 'verbose_name',
      language: 'python',
      code: "title = models.CharField(max_length=200, verbose_name='Kitob nomi')"
    },
    tags: ['params', 'verbose_name']
  },
  {
    id: 'help-text',
    title: 'help_text - admin izoh',
    category: 'Model Field Params',
    description: [
      'help_text admin formda field ostida ko\'rinadi.',
      'Userga izoh va ko\'rsatma beradi.',
      'Form usability ni oshiradi.',
      'Documentation sifatida ham ishlaydi.'
    ],
    whenToUse: [
      'Admin yoki formda tushuntirish kerak bo\'lsa.',
      'Murakkab fieldlar uchun.',
      'Operatorlar uchun guidance kerak bo\'lsa.',
      'UX yaxshilashda.'
    ],
    codeSample: {
      title: 'help_text',
      language: 'python',
      code: "price = models.DecimalField(max_digits=8, decimal_places=2, help_text='USD formatida kiriting')"
    },
    tags: ['params', 'help_text']
  },
  {
    id: 'choices-param',
    title: 'choices - cheklangan qiymatlar',
    category: 'Model Field Params',
    description: [
      'choices field uchun ruxsat etilgan qiymatlarni belgilaydi.',
      'Admin va formda dropdown beradi.',
      'TextChoices bilan birga ishlatilsa qulay.',
      'Data integrityni mustahkamlaydi.'
    ],
    whenToUse: [
      'Status, role, type fieldlar uchun.',
      'Cheklangan qiymatlar kerak bo\'lsa.',
      'Admin UI uchun dropdown kerak bo\'lsa.',
      'Validationni soddalashtirishda.'
    ],
    codeSample: {
      title: 'choices',
      language: 'python',
      code: "status = models.CharField(max_length=20, choices=[('draft', 'Draft'), ('pub', 'Published')])"
    },
    tags: ['params', 'choices']
  },
  {
    id: 'validators-param',
    title: 'validators - qo\'shimcha tekshiruvlar',
    category: 'Model Field Params',
    description: [
      'validators field qiymatini tekshiradi.',
      'Min/Max value, Regex, custom validatorlar bor.',
      'ValidationError ko\'taradi.',
      'Form va APIda bir xil ishlaydi.'
    ],
    whenToUse: [
      'Field uchun qo\'shimcha qoidalar bo\'lsa.',
      'Regex tekshiruv kerak bo\'lsa.',
      'Data sifatini kuchaytirishda.',
      'User input nazoratida.'
    ],
    codeSample: {
      title: 'validators',
      language: 'python',
      code: "from django.core.validators import MinValueValidator\n\nprice = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])"
    },
    tags: ['params', 'validators']
  },
  {
    id: 'primary-key',
    title: 'primary_key=True - asosiy kalit',
    category: 'Model Field Params',
    description: [
      'primary_key=True fieldni PK qiladi.',
      'AutoField bilan birga ishlatiladi.',
      'Unique va not null bo\'ladi.',
      'Bitta modelda faqat bitta PK bo\'lishi mumkin.'
    ],
    whenToUse: [
      'Custom primary key kerak bo\'lsa.',
      'UUIDField yoki custom code bilan PK qilishda.',
      'Legacy DB bo\'lsa.',
      'Default id o\'rniga boshqa PK kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'primary_key',
      language: 'python',
      code: "code = models.CharField(max_length=12, primary_key=True)"
    },
    tags: ['params', 'primary_key']
  },
  {
    id: 'auto-now',
    title: 'auto_now - update vaqtini yozish',
    category: 'Model Field Params',
    description: [
      'auto_now har save bo\'lganda vaqtni yangilaydi.',
      'Update timestamp uchun ishlatiladi.',
      'Manual value berib bo\'lmaydi.',
      'DatetimeField bilan ishlatiladi.'
    ],
    whenToUse: [
      'updated_at field uchun.',
      'Har update vaqtini saqlashda.',
      'Audit uchun.',
      'Timezone aware bo\'lishi kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'auto_now',
      language: 'python',
      code: "updated_at = models.DateTimeField(auto_now=True)"
    },
    tags: ['params', 'auto_now']
  },
  {
    id: 'auto-now-add',
    title: 'auto_now_add - yaratish vaqtini yozish',
    category: 'Model Field Params',
    description: [
      'auto_now_add faqat birinchi create paytida vaqt yozadi.',
      'Yaratilgan vaqtni saqlash uchun ishlatiladi.',
      'Manual value berib bo\'lmaydi.',
      'created_at fieldlarda standart.'
    ],
    whenToUse: [
      'created_at field uchun.',
      'Audit loglarda.',
      'Timeline uchun.',
      'Data kelib chiqishini saqlashda.'
    ],
    codeSample: {
      title: 'auto_now_add',
      language: 'python',
      code: "created_at = models.DateTimeField(auto_now_add=True)"
    },
    tags: ['params', 'auto_now_add']
  },
  {
    id: 'editable',
    title: 'editable=False - formda ko\'rsatmaslik',
    category: 'Model Field Params',
    description: [
      'editable=False bo\'lsa admin/formda field ko\'rinmaydi.',
      'Auto generated fieldlar uchun qulay.',
      'Modelda saqlanadi, lekin UI da ko\'rinmaydi.',
      'Read-only yoki system fieldlar uchun.'
    ],
    whenToUse: [
      'Auto-generated qiymatlar uchun.',
      'User kiritmasligi kerak bo\'lsa.',
      'System fieldlar uchun.',
      'Admin UI ni soddalashtirishda.'
    ],
    codeSample: {
      title: 'editable',
      language: 'python',
      code: "token = models.CharField(max_length=40, editable=False)"
    },
    tags: ['params', 'editable']
  },
  {
    id: 'upload-to',
    title: 'upload_to - upload papkasi',
    category: 'Model Field Params',
    description: [
      'upload_to file/image upload yo\'lini belgilaydi.',
      'String yoki funksiya bo\'lishi mumkin.',
      'Folder strukturani tartiblaydi.',
      'MEDIA_ROOT bilan birga ishlaydi.'
    ],
    whenToUse: [
      'FileField yoki ImageFieldda.',
      'Media fayllarni papka bo\'yicha ajratishda.',
      'Dynamic path kerak bo\'lsa.',
      'Storage tartibi uchun.'
    ],
    codeSample: {
      title: 'upload_to',
      language: 'python',
      code: "image = models.ImageField(upload_to='books/')"
    },
    tags: ['params', 'upload_to']
  },
  {
    id: 'related-name',
    title: 'related_name - reverse access',
    category: 'Model Field Params',
    description: [
      'related_name teskari aloqaga nom beradi.',
      'Default nom <model>_set bo\'ladi.',
      'Reverse relationni aniq boshqarish uchun.',
      'Katta loyihalarda naming muhim.'
    ],
    whenToUse: [
      'Reverse access kerak bo\'lsa.',
      'Naming conflict bo\'lsa.',
      'Readable API kerak bo\'lsa.',
      'Multiple FK bo\'lsa.'
    ],
    codeSample: {
      title: 'related_name',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')"
    },
    tags: ['params', 'related_name']
  },
  {
    id: 'related-query-name',
    title: 'related_query_name - reverse query nomi',
    category: 'Model Field Params',
    description: [
      'related_query_name reverse query filter nomini belgilaydi.',
      'related_name bilan birga ishlatilishi mumkin.',
      'QuerySet filterlarida ishlatiladi.',
      'Naming conflict bo\'lsa foydali.'
    ],
    whenToUse: [
      'Reverse filter nomini aniq belgilashda.',
      'Naming conflict bo\'lsa.',
      'Readable querylar uchun.',
      'Large models uchun.'
    ],
    codeSample: {
      title: 'related_query_name',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books', related_query_name='book')"
    },
    tags: ['params', 'related_query_name']
  },
  {
    id: 'on-delete',
    title: 'on_delete - FK delete qoidasi',
    category: 'Model Field Params',
    description: [
      'on_delete ForeignKey uchun majburiy parametr.',
      'CASCADE, PROTECT, SET_NULL, SET_DEFAULT kabi variantlar bor.',
      'Data integrity va biznes qoida uchun muhim.',
      'Delete paytida nima bo\'lishini boshqaradi.'
    ],
    whenToUse: [
      'Har bir ForeignKeyda.',
      'Data integrity qoidalarini belgilashda.',
      'Biznes qoidani DB darajasida saqlashda.',
      'Delete flow nazoratida.'
    ],
    codeSample: {
      title: 'on_delete',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.PROTECT)"
    },
    tags: ['params', 'on_delete']
  },
  {
    id: 'through',
    title: 'through - M2M oraliq model',
    category: 'Model Field Params',
    description: [
      'through ManyToMany oraliq modelini belgilaydi.',
      'Qo\'shimcha fieldlar saqlash imkonini beradi.',
      'ManyToMany relationni nazorat qilishda.',
      'Custom join table uchun.'
    ],
    whenToUse: [
      'M2M orasida qo\'shimcha field kerak bo\'lsa.',
      'Relationshipga meta data kerak bo\'lsa.',
      'Custom join table ishlatishda.',
      'Business logika relationga bog\'liq bo\'lsa.'
    ],
    codeSample: {
      title: 'through',
      language: 'python',
      code: "members = models.ManyToManyField(User, through='Membership')"
    },
    tags: ['params', 'through']
  },
  {
    id: 'limit-choices-to',
    title: 'limit_choices_to - FK cheklash',
    category: 'Model Field Params',
    description: [
      'limit_choices_to admin/formda FK tanlovini cheklaydi.',
      'Filter shart berish mumkin (dict yoki Q).',
      'Admin usability ni oshiradi.',
      'Faqat mos recordlarni ko\'rsatadi.'
    ],
    whenToUse: [
      'FK tanlovini cheklash kerak bo\'lsa.',
      'Active userlar ro\'yxatini ko\'rsatishda.',
      'Admin UX yaxshilashda.',
      'Data integrity uchun.'
    ],
    codeSample: {
      title: 'limit_choices_to',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, limit_choices_to={'is_active': True})"
    },
    tags: ['params', 'limit_choices_to']
  },
  {
    id: 'db-constraint',
    title: 'db_constraint - FK constraint',
    category: 'Model Field Params',
    description: [
      'db_constraint=False bo\'lsa DB darajasida constraint yaratilmaydi.',
      'Legacy DB yoki performance uchun ishlatiladi.',
      'Data integrityni kamaytirishi mumkin.',
      'Ehtiyotkorlik bilan qo\'llang.'
    ],
    whenToUse: [
      'Legacy DB constraintlar bilan ishlashda.',
      'Performance sababli constraintni o\'chirishda.',
      'External DB nazorat qilsa.',
      'Data integrity boshqa qatlamda bo\'lsa.'
    ],
    codeSample: {
      title: 'db_constraint',
      language: 'python',
      code: "author = models.ForeignKey(Author, on_delete=models.CASCADE, db_constraint=False)"
    },
    tags: ['params', 'db_constraint']
  },
  {
    id: 'to-field',
    title: 'to_field - FK boshqa fieldga ulash',
    category: 'Model Field Params',
    description: [
      'to_field ForeignKey ni primary key emas, boshqa unique fieldga bog\'laydi.',
      'Legacy DB yoki custom key bo\'lsa ishlatiladi.',
      'Target field unique bo\'lishi shart.',
      'Reverse relation normal ishlaydi.'
    ],
    whenToUse: [
      'Primary key emas, boshqa fieldga FK kerak bo\'lsa.',
      'Legacy DB bilan integratsiyada.',
      'Unique code orqali bog\'lanishda.',
      'Natural key ishlatishda.'
    ],
    codeSample: {
      title: 'to_field',
      language: 'python',
      code: "author = models.ForeignKey(Author, to_field='code', on_delete=models.CASCADE)"
    },
    tags: ['params', 'to_field']
  },
  {
    id: 'm2m-symmetrical',
    title: 'symmetrical - self M2M qoidasi',
    category: 'Model Field Params',
    description: [
      'symmetrical=True bo\'lsa self relation ikki tomonga avtomatik bog\'lanadi.',
      'Friends kabi o\'zaro relationlarda default True.',
      'symmetrical=False bo\'lsa follow/follower kabi yo\'nalgan relationlar uchun.',
      'Only self ManyToMany uchun ishlaydi.'
    ],
    whenToUse: [
      'Self ManyToMany ishlatayotganda.',
      'Follow/follower kabi yo\'nalgan relationda.',
      'Do\'stlar tizimida nazorat kerak bo\'lsa.',
      'Graph-like munosabatlarda.'
    ],
    codeSample: {
      title: 'symmetrical',
      language: 'python',
      code: "friends = models.ManyToManyField('self', symmetrical=True, blank=True)"
    },
    tags: ['params', 'symmetrical']
  },
  {
    id: 'm2m-through-fields',
    title: 'through_fields - oraliq model FK tartibi',
    category: 'Model Field Params',
    description: [
      'through_fields oraliq modeldagi FKlarning tartibini belgilaydi.',
      'Bir modelga bir nechta FK bo\'lsa majburiy bo\'lishi mumkin.',
      'ManyToMany with through ishlatilganda aniqlik beradi.',
      'Migration va relation mapping to\'g\'ri bo\'ladi.'
    ],
    whenToUse: [
      'through modelda bir nechta FK bo\'lsa.',
      'Ambiguous relation bo\'lsa.',
      'Custom join table ishlatilsa.',
      'M2M logikasini aniq belgilashda.'
    ],
    codeSample: {
      title: 'through_fields',
      language: 'python',
      code: "members = models.ManyToManyField(\n    User,\n    through='Membership',\n    through_fields=('team', 'user')\n)"
    },
    tags: ['params', 'through_fields']
  },
  {
    id: 'm2m-db-table',
    title: 'db_table - M2M oraliq jadval nomi',
    category: 'Model Field Params',
    description: [
      'db_table ManyToMany oraliq jadval nomini belgilaydi.',
      'Legacy DB bilan moslashtirish uchun foydali.',
      'Naming convention nazorat qilinadi.',
      'Migrations jadval nomini shu bilan yaratadi.'
    ],
    whenToUse: [
      'Legacy DB jadval nomi bilan moslashda.',
      'Naming standard bo\'lsa.',
      'DB schema nazoratida.',
      'Custom join table kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'db_table',
      language: 'python',
      code: "tags = models.ManyToManyField(Tag, db_table='book_tags')"
    },
    tags: ['params', 'db_table']
  },
  {
    id: 'meta-indexes',
    title: 'Meta.indexes - custom indexlar',
    category: 'Model Meta',
    description: [
      'Meta.indexes DB indexlarni belgilaydi.',
      'Composite indexlar yaratish mumkin.',
      'Query performance oshadi.',
      'Keraksiz index write tezligini sekinlashtiradi.'
    ],
    whenToUse: [
      'Ko\'p filter qilinadigan fieldlar bo\'lsa.',
      'Composite filterlar ishlatilsa.',
      'Order_by tez bo\'lishi kerak bo\'lsa.',
      'Performance tuningda.'
    ],
    codeSample: {
      title: 'indexes',
      language: 'python',
      code: "class Meta:\n    indexes = [\n        models.Index(fields=['status', 'created_at'], name='order_status_idx')\n    ]"
    },
    tags: ['meta', 'indexes']
  },
  {
    id: 'meta-constraints',
    title: 'Meta.constraints - DB qoidalari',
    category: 'Model Meta',
    description: [
      'Meta.constraints UniqueConstraint va CheckConstraint beradi.',
      'DB darajasida data qoidalarini majburlaydi.',
      'Data integrityni kuchaytiradi.',
      'Complex business qoidalarni saqlaydi.'
    ],
    whenToUse: [
      'Unique yoki check qoidalari kerak bo\'lsa.',
      'Data sifati muhim bo\'lsa.',
      'DB darajasida himoya kerak bo\'lsa.',
      'Validationni mustahkamlashda.'
    ],
    codeSample: {
      title: 'constraints',
      language: 'python',
      code: "class Meta:\n    constraints = [\n        models.UniqueConstraint(fields=['code'], name='uniq_code'),\n        models.CheckConstraint(check=models.Q(price__gte=0), name='price_gte_0')\n    ]"
    },
    tags: ['meta', 'constraints']
  },
  {
    id: 'meta-unique-together',
    title: 'unique_together - legacy unique',
    category: 'Model Meta',
    description: [
      'unique_together eski (legacy) usul bo\'lib bir nechta fieldni unique qiladi.',
      'Yangi loyihalarda UniqueConstraint afzal.',
      'DBda unique index yaratadi.',
      'Mavjud loyihalarda uchraydi.'
    ],
    whenToUse: [
      'Legacy projectlarda.',
      'Kichik loyihalarda tez qo\'llashda.',
      'Multiple field unique bo\'lishi kerak bo\'lsa.',
      'Migratsiya bilan ishlaganda.'
    ],
    codeSample: {
      title: 'unique_together',
      language: 'python',
      code: "class Meta:\n    unique_together = (('user', 'book'),)"
    },
    tags: ['meta', 'unique_together']
  },
  {
    id: 'meta-db-table',
    title: 'db_table - model jadval nomi',
    category: 'Model Meta',
    description: [
      'db_table model uchun DB jadval nomini belgilaydi.',
      'Legacy DB bilan ishlashda foydali.',
      'Naming convention nazorati uchun.',
      'Migrations jadval nomini shu bilan yaratadi.'
    ],
    whenToUse: [
      'Legacy DB jadval nomini saqlashda.',
      'DB naming standart bo\'lsa.',
      'Integratsiya loyihalarda.',
      'Custom table name kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'db_table',
      language: 'python',
      code: "class Meta:\n    db_table = 'library_books'"
    },
    tags: ['meta', 'db_table']
  },
  {
    id: 'meta-index-together',
    title: 'index_together - legacy composite index',
    category: 'Model Meta',
    description: [
      'index_together eski (legacy) usul bo\'lib bir nechta fieldga index qo\'shadi.',
      'Yangi loyihalarda Meta.indexes afzal.',
      'DBda composite index yaratadi.',
      'Legacy projectlarda uchraydi.'
    ],
    whenToUse: [
      'Legacy projectlarda.',
      'Tez composite index qo\'shish kerak bo\'lsa.',
      'Migratsiya mavjud bo\'lsa.',
      'Kichik loyihalarda.'
    ],
    codeSample: {
      title: 'index_together',
      language: 'python',
      code: "class Meta:\n    index_together = (('status', 'created_at'),)"
    },
    tags: ['meta', 'index_together']
  },
  {
    id: 'meta-ordering',
    title: 'ordering - default tartib',
    category: 'Model Meta',
    description: [
      'ordering QuerySet default tartibini belgilaydi.',
      'Minus bilan desc tartib ishlatiladi.',
      'List endpointlarda barqaror natija beradi.',
      'Admin va APIda bir xil tartib qo\'llanadi.'
    ],
    whenToUse: [
      'Default sort kerak bo\'lsa.',
      'Paginationda tartib barqaror bo\'lishi kerak bo\'lsa.',
      'Admin listda avtomatik tartibda.',
      'Kodni soddalashtirishda.'
    ],
    codeSample: {
      title: 'ordering',
      language: 'python',
      code: "class Meta:\n    ordering = ['-created_at']"
    },
    tags: ['meta', 'ordering']
  },
  {
    id: 'meta-verbose-name',
    title: 'verbose_name / verbose_name_plural',
    category: 'Model Meta',
    description: [
      'verbose_name modelning ko\'rinadigan nomini belgilaydi.',
      'verbose_name_plural ko\'plik formani belgilaydi.',
      'Admin panelda chiroyli nomlar ko\'rsatadi.',
      'Localization uchun ham qulay.'
    ],
    whenToUse: [
      'Admin UI ni yaxshilashda.',
      'Model nomi texnik bo\'lsa.',
      'Ko\'plik formani to\'g\'ri ko\'rsatishda.',
      'Localization kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'verbose_name',
      language: 'python',
      code: "class Meta:\n    verbose_name = 'Book'\n    verbose_name_plural = 'Books'"
    },
    tags: ['meta', 'verbose_name']
  },
  {
    id: 'meta-permissions',
    title: 'permissions - custom ruxsatlar',
    category: 'Model Meta',
    description: [
      'permissions custom permissionlar yaratadi.',
      'auth.Permission jadvaliga qo\'shiladi.',
      'Role-based access uchun foydali.',
      'Admin va APIda ishlatiladi.'
    ],
    whenToUse: [
      'Custom permissionlar kerak bo\'lsa.',
      'Role-based access nazorati bo\'lsa.',
      'Admin funksiyalarni cheklashda.',
      'API permissionlar bilan ishlashda.'
    ],
    codeSample: {
      title: 'permissions',
      language: 'python',
      code: "class Meta:\n    permissions = [('can_publish', 'Can publish book')]"
    },
    tags: ['meta', 'permissions']
  },
  {
    id: 'm2m-db-constraint',
    title: 'ManyToMany db_constraint',
    category: 'Model Field Params',
    description: [
      'ManyToManyField ham db_constraint parametrini qabul qiladi.',
      'DB darajasida constraintni o\'chirish mumkin.',
      'Legacy DB bilan ishlashda foydali.',
      'Data integrity ehtiyot bilan boshqariladi.'
    ],
    whenToUse: [
      'Legacy DB constraintlar bilan ishlashda.',
      'Performance sababli constraint o\'chirishda.',
      'External DB nazorat qilsa.',
      'Data integrity boshqa qatlamda bo\'lsa.'
    ],
    codeSample: {
      title: 'db_constraint',
      language: 'python',
      code: "tags = models.ManyToManyField(Tag, db_constraint=False)"
    },
    tags: ['params', 'db_constraint', 'manytomany']
  },
  {
    id: 'swappable',
    title: 'swappable - almashadigan model',
    category: 'Model Meta',
    description: [
      'swappable custom user yoki auth modeli uchun ishlatiladi.',
      'Settingsda model almashtirilsa, migrations moslashadi.',
      'Django auth sistemasi uchun muhim.',
      'Ko\'p hollarda default True.'
    ],
    whenToUse: [
      'Custom user model bilan ishlaganda.',
      'Swappable model bo\'lsa.',
      'Auth modelni almashtirishda.',
      'Reusability uchun.'
    ],
    codeSample: {
      title: 'swappable',
      language: 'python',
      code: "class Meta:\n    swappable = 'AUTH_USER_MODEL'"
    },
    tags: ['meta', 'swappable']
  },
  {
    id: 'unique-for-date',
    title: 'unique_for_date - sana bo\'yicha unique',
    category: 'Model Field Params',
    description: [
      'unique_for_date fieldni sana bo\'yicha unique qiladi.',
      'Date/DateTime field bilan ishlaydi.',
      'Admin va form validatsiyada ishlaydi.',
      'DB darajasida constraint yaratmaydi.'
    ],
    whenToUse: [
      'Bir kunda bir xil title bo\'lmasligi kerak bo\'lsa.',
      'Daily unique qoidalar uchun.',
      'Publishing logikada.',
      'Form validation uchun.'
    ],
    codeSample: {
      title: 'unique_for_date',
      language: 'python',
      code: "title = models.CharField(max_length=200, unique_for_date='published_at')"
    },
    tags: ['params', 'unique_for_date']
  },
  {
    id: 'unique-for-month',
    title: 'unique_for_month - oy bo\'yicha unique',
    category: 'Model Field Params',
    description: [
      'unique_for_month fieldni oy bo\'yicha unique qiladi.',
      'Date/DateTime field bilan ishlaydi.',
      'Admin/form validatsiyada ishlaydi.',
      'DB darajasida constraint emas.'
    ],
    whenToUse: [
      'Bir oyda bir xil title bo\'lmasligi kerak bo\'lsa.',
      'Monthly unique qoidalar uchun.',
      'Content schedulingda.',
      'Form validation uchun.'
    ],
    codeSample: {
      title: 'unique_for_month',
      language: 'python',
      code: "title = models.CharField(max_length=200, unique_for_month='published_at')"
    },
    tags: ['params', 'unique_for_month']
  },
  {
    id: 'unique-for-year',
    title: 'unique_for_year - yil bo\'yicha unique',
    category: 'Model Field Params',
    description: [
      'unique_for_year fieldni yil bo\'yicha unique qiladi.',
      'Date/DateTime field bilan ishlaydi.',
      'Admin/form validatsiyada ishlaydi.',
      'DB darajasida constraint emas.'
    ],
    whenToUse: [
      'Bir yilda bir xil title bo\'lmasligi kerak bo\'lsa.',
      'Yearly unique qoidalar uchun.',
      'Publishing logikada.',
      'Form validation uchun.'
    ],
    codeSample: {
      title: 'unique_for_year',
      language: 'python',
      code: "title = models.CharField(max_length=200, unique_for_year='published_at')"
    },
    tags: ['params', 'unique_for_year']
  },
  {
    id: 'substr',
    title: 'Substr() - substring olish',
    category: 'ORM Functions',
    description: [
      'Substr stringdan bo\'lak kesib oladi.',
      'DB ichida substring hisoblanadi.',
      'Annotate bilan yangi field yaratadi.',
      'Large stringlarni qisqartirishda foydali.'
    ],
    whenToUse: [
      'Prefix yoki short code olishda.',
      'Display uchun qisqa title kerak bo\'lsa.',
      'DB ichida substring kerak bo\'lsa.',
      'Report formatlashda.'
    ],
    codeSample: {
      title: 'Substr',
      language: 'python',
      code: "from django.db.models.functions import Substr\n\nBook.objects.annotate(code=Substr('isbn', 1, 4))"
    },
    tags: ['substr', 'db functions']
  },
  {
    id: 'replace',
    title: 'Replace() - string almashtirish',
    category: 'ORM Functions',
    description: [
      'Replace stringdagi qismni boshqa qiymatga almashtiradi.',
      'DB ichida ishlaydi, Python loop kerak emas.',
      'Annotate bilan ishlatiladi.',
      'Normalization va cleanup uchun qulay.'
    ],
    whenToUse: [
      'Stringdan belgi olib tashlashda.',
      'Formatlash va cleanup kerak bo\'lsa.',
      'DB ichida batch replace kerak bo\'lsa.',
      'Legacy data tozalashda.'
    ],
    codeSample: {
      title: 'Replace',
      language: 'python',
      code: "from django.db.models.functions import Replace\n\nBook.objects.annotate(clean_title=Replace('title', '  ', ' '))"
    },
    tags: ['replace', 'db functions']
  },
  {
    id: 'trim',
    title: 'Trim() - bo\'sh joyni olib tashlash',
    category: 'ORM Functions',
    description: [
      'Trim string boshidagi va oxiridagi bo\'sh joylarni olib tashlaydi.',
      'DB ichida ishlaydi.',
      'LTrim/RTrim variantlari ham bor.',
      'Data cleanup uchun foydali.'
    ],
    whenToUse: [
      'User inputda keraksiz bo\'sh joylar bo\'lsa.',
      'Normalization kerak bo\'lsa.',
      'Search ishlari to\'g\'ri bo\'lishi uchun.',
      'Import data tozalashda.'
    ],
    codeSample: {
      title: 'Trim',
      language: 'python',
      code: "from django.db.models.functions import Trim\n\nBook.objects.annotate(title_clean=Trim('title'))"
    },
    tags: ['trim', 'db functions']
  },
  {
    id: 'now',
    title: 'Now() - DB server vaqti',
    category: 'ORM Functions',
    description: [
      'Now() DB serverdagi joriy vaqtni qaytaradi.',
      'Python timezone.now bilan farq qiladi.',
      'Annotate va filterda ishlatiladi.',
      'DB darajasida hisoblash uchun qulay.'
    ],
    whenToUse: [
      'DB vaqtiga tayanish kerak bo\'lsa.',
      'Expire yoki SLA tekshiruvlarda.',
      'SQL inside datetime comparison uchun.',
      'Performance uchun.'
    ],
    codeSample: {
      title: 'Now',
      language: 'python',
      code: "from django.db.models.functions import Now\n\nBook.objects.filter(expires_at__lt=Now())"
    },
    tags: ['now', 'db functions']
  },
  {
    id: 'extract-year',
    title: 'ExtractYear() - yilni olish',
    category: 'ORM Functions',
    description: [
      'ExtractYear datetime fielddan yilni chiqaradi.',
      'Group by va statistikalar uchun ishlatiladi.',
      'Annotate ichida ishlaydi.',
      'DB darajasida tez hisoblanadi.'
    ],
    whenToUse: [
      'Yil bo\'yicha statistikalar uchun.',
      'Arxiv yoki reportlarda.',
      'Filter va grouping qilishda.',
      'Datetime field bo\'lsa.'
    ],
    codeSample: {
      title: 'ExtractYear',
      language: 'python',
      code: "from django.db.models.functions import ExtractYear\n\nBook.objects.annotate(year=ExtractYear('created_at'))"
    },
    tags: ['extractyear', 'db functions']
  },
  {
    id: 'extract-month',
    title: 'ExtractMonth() - oyni olish',
    category: 'ORM Functions',
    description: [
      'ExtractMonth datetime fielddan oyni chiqaradi.',
      'Monthly reportlar uchun qulay.',
      'Annotate bilan ishlatiladi.',
      'DB darajasida tez ishlaydi.'
    ],
    whenToUse: [
      'Oy bo\'yicha statistikalar uchun.',
      'Monthly chartlarda.',
      'Datetime field bo\'lsa.',
      'Filter yoki grouping uchun.'
    ],
    codeSample: {
      title: 'ExtractMonth',
      language: 'python',
      code: "from django.db.models.functions import ExtractMonth\n\nBook.objects.annotate(month=ExtractMonth('created_at'))"
    },
    tags: ['extractmonth', 'db functions']
  },
  {
    id: 'extract-day',
    title: 'ExtractDay() - kunni olish',
    category: 'ORM Functions',
    description: [
      'ExtractDay datetime fielddan kunni chiqaradi.',
      'Daily reportlar uchun ishlatiladi.',
      'Annotate bilan ishlaydi.',
      'DB ichida hisoblanadi.'
    ],
    whenToUse: [
      'Kunlik statistikalar uchun.',
      'Datetime field bo\'lsa.',
      'Filter/grouping uchun.',
      'Analytics uchun.'
    ],
    codeSample: {
      title: 'ExtractDay',
      language: 'python',
      code: "from django.db.models.functions import ExtractDay\n\nBook.objects.annotate(day=ExtractDay('created_at'))"
    },
    tags: ['extractday', 'db functions']
  },
  {
    id: 'trunc-month',
    title: 'TruncMonth() - oyni kesish',
    category: 'ORM Functions',
    description: [
      'TruncMonth datetime ni oy boshiga kesadi.',
      'Month bo\'yicha grouping uchun qulay.',
      'DB ichida ishlaydi.',
      'Report va chartlarda ishlatiladi.'
    ],
    whenToUse: [
      'Monthly chartlar uchun.',
      'Group by month kerak bo\'lsa.',
      'Datetime field bo\'lsa.',
      'Analytics uchun.'
    ],
    codeSample: {
      title: 'TruncMonth',
      language: 'python',
      code: "from django.db.models.functions import TruncMonth\n\nOrder.objects.annotate(month=TruncMonth('created_at')).values('month').annotate(total=Count('id'))"
    },
    tags: ['truncmonth', 'db functions']
  },
  {
    id: 'trunc-year',
    title: 'TruncYear() - yilni kesish',
    category: 'ORM Functions',
    description: [
      'TruncYear datetime ni yil boshiga kesadi.',
      'Yearly reportlar uchun qulay.',
      'DB ichida grouping uchun ishlatiladi.',
      'Date based analytics uchun.'
    ],
    whenToUse: [
      'Yillik reportlar uchun.',
      'Yearly grouping kerak bo\'lsa.',
      'Datetime field bo\'lsa.',
      'Business analytics uchun.'
    ],
    codeSample: {
      title: 'TruncYear',
      language: 'python',
      code: "from django.db.models.functions import TruncYear\n\nOrder.objects.annotate(year=TruncYear('created_at')).values('year').annotate(total=Count('id'))"
    },
    tags: ['truncyear', 'db functions']
  },
  {
    id: 'greatest',
    title: 'Greatest() - eng katta qiymat',
    category: 'ORM Functions',
    description: [
      'Greatest bir nechta qiymatdan eng kattasini tanlaydi.',
      'Discount yoki price compare uchun qulay.',
      'DB ichida hisoblanadi.',
      'Annotate bilan ishlaydi.'
    ],
    whenToUse: [
      'Ikki fielddan eng kattasini olishda.',
      'Discount comparisonda.',
      'Pricing rulelarda.',
      'Computed field kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Greatest',
      language: 'python',
      code: "from django.db.models.functions import Greatest\n\nProduct.objects.annotate(best_price=Greatest('price', 'discount_price'))"
    },
    tags: ['greatest', 'db functions']
  },
  {
    id: 'least',
    title: 'Least() - eng kichik qiymat',
    category: 'ORM Functions',
    description: [
      'Least bir nechta qiymatdan eng kichigini tanlaydi.',
      'Discount yoki min price uchun qulay.',
      'DB ichida hisoblanadi.',
      'Annotate bilan ishlaydi.'
    ],
    whenToUse: [
      'Ikki fielddan eng kichigini olishda.',
      'Chegirma hisobida.',
      'Pricing rulelarda.',
      'Computed field kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Least',
      language: 'python',
      code: "from django.db.models.functions import Least\n\nProduct.objects.annotate(min_price=Least('price', 'discount_price'))"
    },
    tags: ['least', 'db functions']
  },
  {
    id: 'round',
    title: 'Round() - yaxlitlash',
    category: 'ORM Functions',
    description: [
      'Round qiymatni DB ichida yaxlitlaydi.',
      'Decimal yoki float qiymatlar uchun.',
      'Annotate bilan ishlatiladi.',
      'Report va pricingda foydali.'
    ],
    whenToUse: [
      'Price yoki ratingni yaxlitlashda.',
      'Reportlarda ko\'rsatish uchun.',
      'DB ichida rounding kerak bo\'lsa.',
      'Precision nazorati uchun.'
    ],
    codeSample: {
      title: 'Round',
      language: 'python',
      code: "from django.db.models.functions import Round\n\nBook.objects.annotate(avg=Round(Avg('rating'), 2))"
    },
    tags: ['round', 'db functions']
  },
  {
    id: 'abs',
    title: 'Abs() - modul qiymat',
    category: 'ORM Functions',
    description: [
      'Abs qiymatning modulini qaytaradi.',
      'Negative qiymatlarni musbatga aylantiradi.',
      'DB ichida hisoblanadi.',
      'Math hisoblar uchun.'
    ],
    whenToUse: [
      'Absolute qiymat kerak bo\'lsa.',
      'Difference hisoblarida.',
      'Analytics va scoringda.',
      'Math funksiyalar bilan ishlashda.'
    ],
    codeSample: {
      title: 'Abs',
      language: 'python',
      code: "from django.db.models.functions import Abs\n\nBook.objects.annotate(delta=Abs(F('price') - 10))"
    },
    tags: ['abs', 'db functions']
  },
  {
    id: 'case-when',
    title: 'Case/When - shartli ifoda',
    category: 'ORM Functions',
    description: [
      'Case/When SQL ichida if-else logika beradi.',
      'Annotate bilan shartli field yaratish mumkin.',
      'Business rulelarni DB ichida ishlatadi.',
      'Report va segmentatsiyada qulay.'
    ],
    whenToUse: [
      'Shartli qiymat qaytarish kerak bo\'lsa.',
      'Segment yoki status hisoblashda.',
      'Pricing yoki label logikada.',
      'SQL darajasida classification kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Case/When',
      language: 'python',
      code: "from django.db.models import Case, When, Value, CharField\n\nBook.objects.annotate(flag=Case(When(price__lte=0, then=Value('free')), default=Value('paid'), output_field=CharField()))"
    },
    tags: ['case', 'when', 'db functions']
  },
  {
    id: 'expression-wrapper',
    title: 'ExpressionWrapper - murakkab ifoda',
    category: 'ORM Functions',
    description: [
      'ExpressionWrapper murakkab ifodaga output_field beradi.',
      'Matematik hisoblashda foydali.',
      'Annotate bilan ishlatiladi.',
      'DB ichida hisoblanadi.'
    ],
    whenToUse: [
      'Murakkab arifmetik ifoda kerak bo\'lsa.',
      'Output type aniq bo\'lishi kerak bo\'lsa.',
      'Pricing yoki scoring hisobida.',
      'DB ichida computed field uchun.'
    ],
    codeSample: {
      title: 'ExpressionWrapper',
      language: 'python',
      code: "from django.db.models import ExpressionWrapper, DecimalField, F\n\nBook.objects.annotate(total=ExpressionWrapper(F('price') * F('qty'), output_field=DecimalField()))"
    },
    tags: ['expressionwrapper', 'db functions']
  },
  {
    id: 'exists-expression',
    title: 'Exists - boolean subquery',
    category: 'ORM Functions',
    description: [
      'Exists subquery natijasini boolean qiladi.',
      'Annotate bilan true/false flag beradi.',
      'DB ichida tez ishlaydi.',
      'Permission yoki status tekshirishda foydali.'
    ],
    whenToUse: [
      'Related data bor-yo\'qligini bilishda.',
      'Boolean flag kerak bo\'lsa.',
      'Performance muhim bo\'lsa.',
      'Large datasetlarda.'
    ],
    codeSample: {
      title: 'Exists',
      language: 'python',
      code: "from django.db.models import Exists, OuterRef\n\npaid = Order.objects.filter(user=OuterRef('pk'), status='paid')\nUser.objects.annotate(has_paid=Exists(paid))"
    },
    tags: ['exists', 'subquery']
  },
  {
    id: 'subquery',
    title: 'Subquery/OuterRef - ichki query',
    category: 'ORM Functions',
    description: [
      'Subquery ichki QuerySet natijasini ishlatadi.',
      'OuterRef tashqi queryga bog\'lanadi.',
      'Complex SQL yozmasdan advanced query qurish mumkin.',
      'Performance va flexibility beradi.'
    ],
    whenToUse: [
      'Har row uchun related field kerak bo\'lsa.',
      'Latest record olishda.',
      'Advanced analytics querylarda.',
      'SQL yozmasdan subquery kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'Subquery',
      language: 'python',
      code: "from django.db.models import OuterRef, Subquery\n\nlatest = Comment.objects.filter(book=OuterRef('pk')).order_by('-created_at').values('text')[:1]\nBook.objects.annotate(last_comment=Subquery(latest))"
    },
    tags: ['subquery', 'outerref']
  },
  {
    id: 'all-none',
    title: 'all() / none() - QuerySet boshqarish',
    category: 'ORM Core',
    description: [
      'all() barcha obyektlarni qaytaradi (QuerySet).',
      'none() bo\'sh QuerySet qaytaradi.',
      'Chain qilish uchun qulay.',
      'Conditional querylarda ishlatiladi.'
    ],
    whenToUse: [
      'Default list olishda.',
      'Condition bo\'lsa none() qaytarishda.',
      'QuerySet chain soddalashganda.',
      'Custom filtering logikasida.'
    ],
    codeSample: {
      title: 'all/none',
      language: 'python',
      code: "qs = Book.objects.all()\nqs = Book.objects.none()"
    },
    tags: ['all', 'none', 'orm']
  },
  {
    id: 'count-method',
    title: 'count() - tez sanash',
    category: 'ORM Core',
    description: [
      'count() QuerySet sonini qaytaradi.',
      'SQL COUNT(*) ishlatadi.',
      'exists() faqat bor-yo\'qligini tekshiradi, tezroq bo\'lishi mumkin.',
      'Large datasetda ehtiyot bo\'ling.'
    ],
    whenToUse: [
      'Obyektlar soni kerak bo\'lsa.',
      'Pagination meta data uchun.',
      'Dashboard statistikada.',
      'Validation uchun count kerak bo\'lsa.'
    ],
    codeSample: {
      title: 'count',
      language: 'python',
      code: "total = Book.objects.filter(is_active=True).count()"
    },
    tags: ['count', 'orm']
  },
  {
    id: 'in-bulk',
    title: 'in_bulk() - dict bilan olish',
    category: 'ORM Core',
    description: [
      'in_bulk id bo\'yicha dict qaytaradi.',
      'Keylar id, value esa model obyektlari.',
      'Bulk lookup uchun tez.',
      'Order saqlanmaydi.'
    ],
    whenToUse: [
      'ID ro\'yxati bo\'lsa tez olishda.',
      'Batch lookup qilishda.',
      'Dictionary kerak bo\'lsa.',
      'Performance uchun.'
    ],
    codeSample: {
      title: 'in_bulk',
      language: 'python',
      code: "items = Book.objects.in_bulk([1, 2, 3])"
    },
    tags: ['in_bulk', 'orm']
  },
  {
    id: 'bulk-update',
    title: 'bulk_update() - ko\'p obyektni yangilash',
    category: 'ORM Core',
    description: [
      'bulk_update bir nechta obyektni bitta query bilan update qiladi.',
      'save() va signals ishlamasligi mumkin.',
      'Fieldlar ro\'yxatini berish shart.',
      'Katta datasetda tez.'
    ],
    whenToUse: [
      'Ko\'p obyektni bir vaqtda update qilishda.',
      'Performance muhim bo\'lsa.',
      'Signals kerak bo\'lmasa.',
      'Import/sync jarayonlarida.'
    ],
    codeSample: {
      title: 'bulk_update',
      language: 'python',
      code: "Book.objects.bulk_update(books, ['price', 'stock'])"
    },
    tags: ['bulk_update', 'orm']
  },
  {
    id: 'using',
    title: 'using() - multi-DB query',
    category: 'ORM Core',
    description: [
      'using() QuerySetni aniq database bilan ishlatadi.',
      'Multiple database setupda kerak bo\'ladi.',
      'Read/Write DB ajratishda ishlatiladi.',
      'Default DBdan tashqari ishlash uchun.'
    ],
    whenToUse: [
      'Multiple DB ishlatilsa.',
      'Read replica bo\'lsa.',
      'Legacy DB bilan parallel ishlashda.',
      'Database routing bo\'lsa.'
    ],
    codeSample: {
      title: 'using',
      language: 'python',
      code: "Book.objects.using('replica').filter(is_active=True)"
    },
    tags: ['using', 'orm']
  },
  {
    id: 'raw',
    title: 'raw() - raw SQL',
    category: 'ORM Core',
    description: [
      'raw() bilan SQL yozib model obyektlari olinadi.',
      'ORM yetarli bo\'lmagan joylarda ishlatiladi.',
      'SQL injectionga ehtiyot bo\'ling.',
      'Only read querylarda ishlatish tavsiya.'
    ],
    whenToUse: [
      'Complex query ORMda qiyin bo\'lsa.',
      'Performance uchun raw SQL kerak bo\'lsa.',
      'Legacy SQL mavjud bo\'lsa.',
      'Advanced reportlarda.'
    ],
    codeSample: {
      title: 'raw',
      language: 'python',
      code: "Book.objects.raw('SELECT * FROM books WHERE is_active = true')"
    },
    tags: ['raw', 'orm']
  },
  {
    id: 'union',
    title: 'union() - QuerySet birlashtirish',
    category: 'ORM Core',
    description: [
      'union ikki QuerySetni birlashtiradi.',
      'Natija duplicate bo\'lsa distinct bo\'ladi.',
      'Fieldlar bir xil bo\'lishi kerak.',
      'SQL UNION ishlatiladi.'
    ],
    whenToUse: [
      'Ikki QuerySet natijasini birlashtirishda.',
      'Search natijalarini qo\'shishda.',
      'Duplicate qabul qilinmasa.',
      'Multi-source querylarda.'
    ],
    codeSample: {
      title: 'union',
      language: 'python',
      code: "qs = Book.objects.filter(is_active=True).union(Book.objects.filter(is_featured=True))"
    },
    tags: ['union', 'orm']
  },
  {
    id: 'intersection',
    title: 'intersection() - kesishma',
    category: 'ORM Core',
    description: [
      'intersection ikkita QuerySet kesishmasini beradi.',
      'SQL INTERSECT ishlatiladi (DB support talab qiladi).',
      'Fieldlar bir xil bo\'lishi kerak.',
      'Not supported DBlarda ishlamasligi mumkin.'
    ],
    whenToUse: [
      'Ikki QuerySet kesishmasi kerak bo\'lsa.',
      'Shared natijalarni olishda.',
      'Advanced querylarda.',
      'DB support bo\'lsa.'
    ],
    codeSample: {
      title: 'intersection',
      language: 'python',
      code: "qs = Book.objects.filter(is_active=True).intersection(Book.objects.filter(is_featured=True))"
    },
    tags: ['intersection', 'orm']
  },
  {
    id: 'difference',
    title: 'difference() - farq',
    category: 'ORM Core',
    description: [
      'difference birinchi QuerySetdan ikkinchisini ayiradi.',
      'SQL EXCEPT ishlatiladi (DB support talab qiladi).',
      'Fieldlar bir xil bo\'lishi kerak.',
      'Not supported DBlarda ishlamasligi mumkin.'
    ],
    whenToUse: [
      'Bir listdan boshqasini ayirish kerak bo\'lsa.',
      'Exclude logika advanced bo\'lsa.',
      'Set-like querylar uchun.',
      'DB support bo\'lsa.'
    ],
    codeSample: {
      title: 'difference',
      language: 'python',
      code: "qs = Book.objects.filter(is_active=True).difference(Book.objects.filter(is_featured=True))"
    },
    tags: ['difference', 'orm']
  },
  {
    id: 'reverse-order',
    title: 'reverse() - tartibni teskarilash',
    category: 'ORM Core',
    description: [
      'reverse() QuerySet tartibini teskarilaydi.',
      'order_by bo\'lsa shu tartib bo\'yicha teskarilaydi.',
      'Slicingdan oldin ishlatilsa foydali.',
      'DBda ORDER BY DESC/ASC o\'zgartiradi.'
    ],
    whenToUse: [
      'Order_by natijasini teskarilashda.',
      'Paginationda oldingi sahifalarni ko\'rsatishda.',
      'List sortingni tez o\'zgartirishda.',
      'UI sorting toggle uchun.'
    ],
    codeSample: {
      title: 'reverse',
      language: 'python',
      code: "qs = Book.objects.order_by('created_at').reverse()"
    },
    tags: ['reverse', 'orm']
  }

];
