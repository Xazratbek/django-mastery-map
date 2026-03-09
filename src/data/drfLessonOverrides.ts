import { LessonContent, LessonSection } from '../types/roadmap';

const section = (
  title: string,
  what: string,
  why: string,
  when: string,
  does: string,
  codeTitle: string,
  code: string,
  language = 'python'
): LessonSection => ({
  title,
  body: [
    `Nima: ${what}`,
    `Nega kerak: ${why}`,
    `Qachon ishlatiladi: ${when}`,
    `Vazifasi: ${does}`,
  ],
  codeSamples: [
    { title: codeTitle, language, code },
  ],
});

export const drfLessonOverrides: Record<number, LessonContent> = {
  32: {
    summary: "DRF request va response oqimini to'liq tushunasiz: request.data, query_params, Response va status code bilan API kontraktini to'g'ri shakllantirasiz.",
    goals: [
      "request.data va request.query_params farqini bilish",
      "Response va status modulidan to'g'ri foydalanish",
      "@api_view va APIView farqini tushunish",
      "Serializer bilan response formatlash",
    ],
    sections: [
      section(
        "01. request.data va query_params",
        "DRF request.data JSON/body ni, query_params esa URL query ni beradi",
        "Input va filter parametrlari aralashib ketmasligi uchun",
        "POST/PUT uchun body, GET uchun query kerak bo'lganda",
        "So'rov ma'lumotini to'g'ri manbadan olish",
        "request.data va query_params",
        `def search(request):\n    q = request.query_params.get('q', '')\n    payload = request.data if request.method == 'POST' else {}\n    return Response({'q': q, 'payload': payload})`
      ),
      section(
        "02. Response va status code",
        "Response DRFning standart HTTP javobi",
        "Clientlar status code orqali holatni tez tushunadi",
        "Har bir endpointda success/error ajratilganda",
        "JSON va statusni bir joyda boshqarish",
        "Response + status",
        `from rest_framework import status\n\nreturn Response({'created': True}, status=status.HTTP_201_CREATED)`
      ),
      section(
        "03. @api_view decorator",
        "Function-based viewni DRFga moslashtiradi",
        "Minimal kod bilan API yozish uchun",
        "Kichik endpointlar yoki tez prototip kerak bo'lganda",
        "HTTP methodlarni cheklash va response formatlash",
        "@api_view",
        `@api_view(['GET'])\ndef ping(request):\n    return Response({'ok': True})`
      ),
      section(
        "04. APIView class",
        "Class-based viewda GET/POST metodlarini alohida yozish",
        "Katta viewlarda strukturani toza saqlash uchun",
        "Ko'p methodli endpoint bo'lsa",
        "Methodlar bo'yicha logikani ajratish",
        "APIView",
        `class HealthView(APIView):\n    def get(self, request):\n        return Response({'status': 'ok'})`
      ),
      section(
        "05. status modulidan foydalanish",
        "DRF status moduli semantik HTTP kodlarni beradi",
        "Magic number o'rniga aniq nom bilan ishlash uchun",
        "Har xil success/error holatlarda",
        "Kod o'qilishini yaxshilash",
        "status usage",
        `from rest_framework import status\n\nreturn Response({'detail': 'bad'}, status=status.HTTP_400_BAD_REQUEST)`
      ),
      section(
        "06. ValidationError qaytarish",
        "Serializer yoki viewda xato bo'lsa ValidationError tashlanadi",
        "Error response standart formatda bo'lishi uchun",
        "Input noto'g'ri bo'lsa",
        "Clientga aniq xato mesaj berish",
        "ValidationError",
        `from rest_framework.exceptions import ValidationError\n\nif not request.data.get('title'):\n    raise ValidationError({'title': 'required'})`
      ),
      section(
        "07. Response headerlar",
        "Response ga custom header qo'shish mumkin",
        "Tracking yoki cache nazorati uchun",
        "Request ID yoki rate limit ko'rsatganda",
        "Clientga qo'shimcha metadata berish",
        "Response headers",
        `return Response({'ok': True}, headers={'X-Request-Id': 'abc-123'})`
      ),
      section(
        "08. Method not allowed",
        "DRF methodni avtomatik tekshiradi",
        "Noto'g'ri methodni bloklash uchun",
        "@api_view yoki APIViewda methodlar cheklanganda",
        "405 holatlarni avtomatik qaytarish",
        "Method limit",
        `@api_view(['POST'])\ndef create_item(request):\n    return Response({'ok': True})`
      ),
      section(
        "09. Serializer bilan response",
        "Serializer data formatini standart qiladi",
        "Response bir xil struktura bo'lishi uchun",
        "Model instance JSON ga aylantirilganda",
        "Clientga toza JSON qaytarish",
        "Serializer data",
        `serializer = BookSerializer(book)\nreturn Response(serializer.data)`
      ),
      section(
        "10. Request context",
        "Serializerga context berish mumkin",
        "User yoki requestdan foydalanish kerak bo'lsa",
        "Serializer ichida request kerak bo'lganda",
        "Dynamic fieldlar chiqarish",
        "Serializer context",
        `serializer = BookSerializer(book, context={'request': request})`
      ),
    ],
  },
  33: {
    summary: "Serializer DRFning yuragi: inputni tekshiradi, outputni formatlaydi. Bugun oddiy Serializer va ModelSerializer orqali API kontraktini mustahkam quramiz.",
    goals: [
      "Serializer va ModelSerializer farqini aniq bilish",
      "is_valid, errors va validated_data bilan ishlash",
      "create/update metodlarini to'g'ri yozish",
      "read_only/write_only va extra_kwargs ishlatish",
    ],
    sections: [
      section(
        "01. Serializer class asoslari",
        "Serializer class input/outputni boshqaruvchi qatlam",
        "API kontraktini bir joyda saqlash uchun",
        "Model bo'lmagan data bilan ishlaganda",
        "Custom JSON formatni berish",
        "Serializer class",
        `class PingSerializer(serializers.Serializer):\n    message = serializers.CharField()`
      ),
      section(
        "02. Asosiy fieldlar",
        "CharField, IntegerField, BooleanField kabi fieldlar",
        "Data tipini aniq belgilash uchun",
        "Oddiy JSON strukturada",
        "Type safety va validation",
        "Serializer fields",
        `class UserSerializer(serializers.Serializer):\n    email = serializers.EmailField()\n    age = serializers.IntegerField()`
      ),
      section(
        "03. is_valid va errors",
        "Serializer.is_valid() inputni tekshiradi",
        "Xatolarni standart formatda olish uchun",
        "POST/PUT paytida",
        "Validation natijasini nazorat qilish",
        "is_valid",
        `serializer = UserSerializer(data=request.data)\nif not serializer.is_valid():\n    return Response(serializer.errors, status=400)`
      ),
      section(
        "04. validated_data",
        "validated_data tekshirilgan va tozalangan data",
        "Raw data emas, ishonchli data bilan ishlash uchun",
        "is_validdan keyin",
        "Create/update logikasida",
        "validated_data",
        `data = serializer.validated_data\nemail = data['email']`
      ),
      section(
        "05. create metodi",
        "Serializer create metodi obyekt yaratadi",
        "save() chaqirilganda obyekt yaratilishi uchun",
        "ModelSerializer emas, oddiy Serializer bo'lsa",
        "Yaratish logikasini markazlashtirish",
        "create",
        `def create(self, validated_data):\n    return User.objects.create(**validated_data)`
      ),
      section(
        "06. update metodi",
        "Serializer update metodi obyektni yangilaydi",
        "save() chaqirilganda update bo'lishi uchun",
        "PUT/PATCH paytida",
        "Fieldlarni kontrolli yangilash",
        "update",
        `def update(self, instance, validated_data):\n    instance.email = validated_data.get('email', instance.email)\n    instance.save()\n    return instance`
      ),
      section(
        "07. ModelSerializer asoslari",
        "ModelSerializer model fieldlarini avtomatik ulaydi",
        "CRUD tez yozilishi uchun",
        "Modelga asoslangan APIlarda",
        "Field mappingni avtomatlashtirish",
        "ModelSerializer",
        `class BookSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Book\n        fields = ['id', 'title']`
      ),
      section(
        "08. Meta fields",
        "fields ro'yxati qaysi fieldlar chiqishini belgilaydi",
        "Data minimal va to'g'ri bo'lishi uchun",
        "Public response kerak bo'lsa",
        "Security va contract nazorati",
        "Meta fields",
        `class Meta:\n    model = Book\n    fields = ['id', 'title', 'price']`
      ),
      section(
        "09. exclude ishlatish",
        "exclude ko'rinmasligi kerak fieldlarni yashiradi",
        "Katta modelda tez sozlash uchun",
        "Hamma field kerak bo'lmaganda",
        "Default fieldlarni kesish",
        "exclude",
        `class Meta:\n    model = Book\n    exclude = ['secret_note']`
      ),
      section(
        "10. read_only_fields",
        "read_only_fields faqat outputda ko'rinadi",
        "Client o'zgartira olmasligi uchun",
        "id, created_at kabi fieldlarda",
        "Write'da bloklash",
        "read_only_fields",
        `class Meta:\n    model = Book\n    fields = ['id', 'title']\n    read_only_fields = ['id']`
      ),
      section(
        "11. write_only_fields",
        "write_only field inputda qabul qilinadi, outputda chiqmaydi",
        "Parol yoki maxfiy data uchun",
        "Register/login endpointlarda",
        "Sensitive data yashirish",
        "write_only",
        `password = serializers.CharField(write_only=True)`
      ),
      section(
        "12. SerializerMethodField",
        "SerializerMethodField computed field chiqaradi",
        "Custom format yoki hisoblangan qiymat uchun",
        "Modelda field bo'lmasa",
        "Outputni boyitish",
        "SerializerMethodField",
        `rating = serializers.SerializerMethodField()\n\ndef get_rating(self, obj):\n    return obj.rating or 0`
      ),
      section(
        "13. source atributi",
        "source fieldni boshqa atributga bog'laydi",
        "Related field yoki propertyni chiqarish uchun",
        "Model property ishlatilganda",
        "Field mappingni moslashtirish",
        "source",
        `full_name = serializers.CharField(source='get_full_name')`
      ),
      section(
        "14. default qiymatlar",
        "default fieldga standart qiymat beradi",
        "Client yubormasa ham qiymat bo'lishi uchun",
        "Optional fieldlarda",
        "API contract barqarorligi",
        "default",
        `is_active = serializers.BooleanField(default=True)`
      ),
      section(
        "15. required va allow_null",
        "required field majburiyligini belgilaydi",
        "Optional fieldlar aniq bo'lishi uchun",
        "Partial update yoki optional inputda",
        "Validationni moslash",
        "required",
        `bio = serializers.CharField(required=False, allow_blank=True)`
      ),
      section(
        "16. partial update",
        "partial=True PATCH uchun validationni yumshatadi",
        "Faqat yuborilgan fieldlarni tekshirish uchun",
        "PATCH endpointlarda",
        "Qisman update qilish",
        "partial",
        `serializer = BookSerializer(instance, data=request.data, partial=True)`
      ),
      section(
        "17. many=True",
        "many=True list serializer yaratadi",
        "Ko'p obyektlarni JSON qilish uchun",
        "List endpointlarda",
        "Kollektsiyani serialize qilish",
        "many=True",
        `serializer = BookSerializer(books, many=True)`
      ),
      section(
        "18. context ishlatish",
        "context serializerga tashqi ma'lumot beradi",
        "Request yoki userga bog'liq output uchun",
        "Permissionga qarab field chiqarishda",
        "Dynamic output yaratish",
        "context",
        `serializer = BookSerializer(book, context={'request': request})`
      ),
      section(
        "19. extra_kwargs",
        "extra_kwargs field parametrlarini Meta orqali berish",
        "Fieldni alohida e'lon qilmaslik uchun",
        "Katta serializerlarda",
        "Field sozlamalarini boshqarish",
        "extra_kwargs",
        `class Meta:\n    model = Book\n    fields = ['title', 'price']\n    extra_kwargs = {'price': {'min_value': 0}}`
      ),
      section(
        "20. to_representation",
        "to_representation output formatini customize qiladi",
        "Field formatini o'zgartirish uchun",
        "Special JSON format kerak bo'lsa",
        "Response ni nazorat qilish",
        "to_representation",
        `def to_representation(self, instance):\n    data = super().to_representation(instance)\n    data['title'] = data['title'].upper()\n    return data`
      ),
    ],
  },
  34: {
    summary: "Validation backendni himoya qiladi: field-level va object-level tekshiruvlar, custom validatorlar va custom fieldlar bilan inputni toza qilasiz.",
    goals: [
      "Field-level va object-level validation yozish",
      "Custom validator va validator classlardan foydalanish",
      "Error message formatini to'g'ri berish",
      "Custom fieldlar bilan maxsus format qo'llash",
    ],
    sections: [
      section(
        "01. required va allow_null",
        "required field majburiyligini belgilaydi",
        "Inputning minimal shartlarini qo'yish uchun",
        "POST create paytida",
        "Majburiy fieldlarni nazorat qilish",
        "required",
        `title = serializers.CharField(required=True, allow_blank=False)`
      ),
      section(
        "02. validate_<field> metodi",
        "Bitta fieldni alohida tekshiradi",
        "Fieldga maxsus qoidalar berish uchun",
        "price, age kabi fieldlar uchun",
        "Fieldni individual nazorat qilish",
        "validate_field",
        `def validate_price(self, value):\n    if value < 0:\n        raise serializers.ValidationError('Price >= 0')\n    return value`
      ),
      section(
        "03. validate() metodi",
        "Bir nechta fieldni birgalikda tekshiradi",
        "Cross-field qoidalarni yozish uchun",
        "start_date < end_date kabi holatlarda",
        "Object-level validation qilish",
        "validate",
        `def validate(self, data):\n    if data['start'] > data['end']:\n        raise serializers.ValidationError('start > end')\n    return data`
      ),
      section(
        "04. validators list",
        "Fieldga validators ro'yxatini berish mumkin",
        "Qayta ishlatiladigan validation yaratish uchun",
        "Ko'p serializerlarda bir xil qoidalar bo'lsa",
        "Reusable validation",
        "validators",
        `title = serializers.CharField(validators=[MinLengthValidator(3)])`
      ),
      section(
        "05. UniqueValidator",
        "UniqueValidator unique constraint tekshiradi",
        "DB unique qoidani API darajasida ko'rsatish uchun",
        "Email, username kabi fieldlarda",
        "Duplicate yozuvlarni bloklash",
        "UniqueValidator",
        `email = serializers.EmailField(validators=[UniqueValidator(User.objects.all())])`
      ),
      section(
        "06. UniqueTogetherValidator",
        "Bir nechta field kombinatsiyasini unique qiladi",
        "Complex unique qoidalar uchun",
        "(user, product) kabi bog'lanishlarda",
        "Kombinatsiyani tekshirish",
        "UniqueTogetherValidator",
        `class Meta:\n    validators = [\n        UniqueTogetherValidator(queryset=Order.objects.all(), fields=['user', 'code'])\n    ]`
      ),
      section(
        "07. RegexValidator",
        "Regex orqali format tekshiradi",
        "Telefon, kod formatlari uchun",
        "String fieldlar qattiq formatda bo'lsa",
        "Patternga moslikni tekshirish",
        "RegexValidator",
        `phone = serializers.CharField(validators=[RegexValidator(r'^\\+998\d{9}$')])`
      ),
      section(
        "08. Min/Max validator",
        "Min/Max value tekshiradi",
        "Chegaralangan qiymatlar uchun",
        "Rating, price, age bo'lsa",
        "Range validation",
        "MinMax",
        `age = serializers.IntegerField(min_value=1, max_value=120)`
      ),
      section(
        "09. Custom validator function",
        "Custom function bilan field tekshirish",
        "Murakkab qoidalar bo'lsa",
        "Business rule kerak bo'lganda",
        "Custom validation logika",
        "custom validator",
        `def validate_title(value):\n    if 'django' not in value.lower():\n        raise ValidationError('must contain django')\n    return value`
      ),
      section(
        "10. Error message customization",
        "Field error messageini moslashtirish",
        "Userga aniq mesaj berish uchun",
        "UX yaxshilash kerak bo'lsa",
        "Error matnini boshqarish",
        "error_messages",
        `title = serializers.CharField(error_messages={'blank': 'title kerak'})`
      ),
      section(
        "11. read_only va write_only",
        "Fieldni faqat output yoki inputda ko'rsatish",
        "Sensitive datani yashirish uchun",
        "Password, token kabi fieldlarda",
        "Data ko'rinishini nazorat qilish",
        "write_only",
        `password = serializers.CharField(write_only=True)`
      ),
      section(
        "12. default va allow_blank",
        "Default qiymat va bo'sh stringni boshqarish",
        "Optional fieldlar uchun",
        "User input to'liq bo'lmasa",
        "Kutilgan data formatni saqlash",
        "allow_blank",
        `bio = serializers.CharField(required=False, allow_blank=True, default='')`
      ),
      section(
        "13. partial update validation",
        "PATCH uchun partial validation ishlaydi",
        "Faqat yuborilgan fieldlarni tekshirish uchun",
        "Partial update bo'lganda",
        "Validationni yumshatish",
        "partial",
        `serializer = UserSerializer(instance, data=request.data, partial=True)`
      ),
      section(
        "14. ListSerializer validation",
        "ListSerializer ko'p obyektni tekshiradi",
        "Bulk create/update uchun",
        "many=True bo'lsa",
        "Har bir itemni tekshirish",
        "ListSerializer",
        `serializer = BookSerializer(data=request.data, many=True)\nserializer.is_valid(raise_exception=True)`
      ),
      section(
        "15. custom field to_representation",
        "Custom field output formatini beradi",
        "Maxsus format kerak bo'lsa",
        "Complex data formattingda",
        "Outputni boshqarish",
        "Custom field",
        `class UpperField(serializers.CharField):\n    def to_representation(self, value):\n        return value.upper()`
      ),
      section(
        "16. custom field to_internal_value",
        "Custom field inputni parse qiladi",
        "Non-standard input kelganda",
        "APIga maxsus format yuborilganda",
        "Input parsing",
        "to_internal_value",
        `class TrimField(serializers.CharField):\n    def to_internal_value(self, data):\n        return data.strip()`
      ),
      section(
        "17. raise_exception ishlatish",
        "is_valid(raise_exception=True) xatoni avtomatik qaytaradi",
        "Boilerplate kodni kamaytirish uchun",
        "Standard API error flowda",
        "Validation errorni avtomatik berish",
        "raise_exception",
        `serializer.is_valid(raise_exception=True)`
      ),
      section(
        "18. validate empty data",
        "Bo'sh payloadni tekshirish",
        "Client bo'sh data yuborsa",
        "Create endpointlarda",
        "Bo'sh requestni bloklash",
        "empty data",
        `if not request.data:\n    raise ValidationError('empty payload')`
      ),
      section(
        "19. dependent fields",
        "Bir field boshqasiga bog'liq bo'lsa",
        "Business qoidani enforce qilish uchun",
        "discount bo'lsa price shart bo'lganda",
        "Conditional validation",
        "dependent fields",
        `def validate(self, data):\n    if data.get('discount') and not data.get('price'):\n        raise serializers.ValidationError('price required')\n    return data`
      ),
      section(
        "20. Custom ValidationError shape",
        "Error formatini dict qilib qaytarish",
        "Frontendga field-level error berish uchun",
        "Form errorlari kerak bo'lsa",
        "Xatolarni tartibli ko'rsatish",
        "ValidationError dict",
        `raise serializers.ValidationError({'price': 'invalid', 'title': 'required'})`
      ),
    ],
  },
  35: {
    summary: "Relationlar APIda eng ko'p uchraydigan muammo: FK, M2M va nested data. Bugun related fieldlar va nested serializerlar bilan to'g'ri ishlaysiz.",
    goals: [
      "PrimaryKeyRelatedField va SlugRelatedFielddan foydalanish",
      "Nested serializer read/write logikasini yozish",
      "Reverse relationlarni ko'rsatish",
      "Performance uchun select_related/prefetch_related qo'llash",
    ],
    sections: [
      section(
        "01. PrimaryKeyRelatedField",
        "Related obyektni id orqali ko'rsatadi",
        "Minimal va tez representation uchun",
        "Related modelni faqat id bilan yuborish kerak bo'lsa",
        "FKni id sifatida serialize qilish",
        "PrimaryKeyRelatedField",
        `author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())`
      ),
      section(
        "02. SlugRelatedField",
        "Related obyektni slug yoki boshqa field bilan ko'rsatadi",
        "Human-readable output kerak bo'lsa",
        "Slug yoki username bilan ishlaganda",
        "Readable fieldni chiqarish",
        "SlugRelatedField",
        `author = serializers.SlugRelatedField(slug_field='email', queryset=Author.objects.all())`
      ),
      section(
        "03. StringRelatedField",
        "Related obyektni __str__ orqali ko'rsatadi",
        "Tez va oddiy representation uchun",
        "Read-only relationlarda",
        "Readable string chiqarish",
        "StringRelatedField",
        `author = serializers.StringRelatedField()`
      ),
      section(
        "04. HyperlinkedRelatedField",
        "Related obyektga URL qaytaradi",
        "HATEOAS uslubida API kerak bo'lsa",
        "Client linklar bilan ishlaganda",
        "URL based relation",
        "HyperlinkedRelatedField",
        `author = serializers.HyperlinkedRelatedField(view_name='author-detail', read_only=True)`
      ),
      section(
        "05. many=True relation",
        "ManyToMany yoki reverse relationlarda list qaytaradi",
        "Ko'p obyekt bo'lsa",
        "tags, categories kabi listlarda",
        "List of related objects",
        "many=True",
        `tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)`
      ),
      section(
        "06. Nested serializer read-only",
        "Related obyektni ichki JSON ko'rinishida chiqaradi",
        "Clientga batafsil info kerak bo'lsa",
        "Detail endpointlarda",
        "Nested output berish",
        "Nested read",
        `class BookSerializer(serializers.ModelSerializer):\n    author = AuthorSerializer(read_only=True)\n    class Meta:\n        model = Book\n        fields = ['id', 'title', 'author']`
      ),
      section(
        "07. Nested serializer write",
        "Nested data bilan create qilish",
        "Bir requestda related data yaratish uchun",
        "Author + Book birga kelganda",
        "Nested create logikasi",
        "Nested write",
        `def create(self, validated_data):\n    author_data = validated_data.pop('author')\n    author = Author.objects.create(**author_data)\n    return Book.objects.create(author=author, **validated_data)`
      ),
      section(
        "08. Nested update",
        "Nested data bilan update qilish",
        "Related data ham o'zgarishi kerak bo'lsa",
        "PUT/PATCHda",
        "Related obyektni yangilash",
        "Nested update",
        `def update(self, instance, validated_data):\n    author_data = validated_data.pop('author', None)\n    if author_data:\n        Author.objects.filter(pk=instance.author_id).update(**author_data)\n    return super().update(instance, validated_data)`
      ),
      section(
        "09. depth parametri",
        "depth related fieldlarni avtomatik chiqaradi",
        "Tez prototip uchun",
        "Kichik loyiha yoki demo bo'lsa",
        "Auto nested output",
        "depth",
        `class Meta:\n    model = Book\n    fields = '__all__'\n    depth = 1`
      ),
      section(
        "10. source bilan relation",
        "source orqali reverse relationni bog'lash",
        "Reverse relationni serialize qilish uchun",
        "author.books kabi relationlarda",
        "Reverse output",
        "source",
        `books = BookSerializer(source='book_set', many=True, read_only=True)`
      ),
      section(
        "11. related_name ishlatish",
        "related_name reverse relation nomini beradi",
        "Serializerda toza name ishlatish uchun",
        "Modelda relation yozilganda",
        "Readable reverse access",
        "related_name",
        `class Book(models.Model):\n    author = models.ForeignKey(Author, related_name='books', on_delete=models.CASCADE)`
      ),
      section(
        "12. through model M2M",
        "through model M2Mda qo'shimcha field saqlaydi",
        "M2M relationda extra data kerak bo'lsa",
        "Enrollment, Membership kabi holatlarda",
        "M2M extra data",
        "through model",
        `members = models.ManyToManyField(User, through='Membership')`
      ),
      section(
        "13. through serializer",
        "through model uchun alohida serializer kerak",
        "Extra fieldlarni serialize qilish uchun",
        "M2M relation detail kerak bo'lsa",
        "Intermediate data chiqarish",
        "through serializer",
        `class MembershipSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Membership\n        fields = ['user', 'role']`
      ),
      section(
        "14. select_related",
        "select_related FK join qiladi",
        "N+1 muammosini kamaytirish uchun",
        "Nested serializer ishlatilganda",
        "Query sonini kamaytirish",
        "select_related",
        `queryset = Book.objects.select_related('author')`
      ),
      section(
        "15. prefetch_related",
        "prefetch_related M2M yoki reverse relationni oldindan oladi",
        "Katta listlarda performance uchun",
        "ManyToMany yoki reverse list bo'lsa",
        "Querylarni optimizatsiya qilish",
        "prefetch_related",
        `queryset = Book.objects.prefetch_related('tags')`
      ),
      section(
        "16. SerializerMethodField relation",
        "Related data uchun custom output",
        "Special format kerak bo'lsa",
        "Clientga mos format berishda",
        "Custom related output",
        "SerializerMethodField",
        `def get_author(self, obj):\n    return {'id': obj.author_id, 'name': obj.author.name}`
      ),
      section(
        "17. Related field validation",
        "Related fieldlar mavjudligini tekshiradi",
        "Foreign key id to'g'ri bo'lishi uchun",
        "Create paytida",
        "Invalid relationni bloklash",
        "Relation validation",
        `author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())`
      ),
      section(
        "18. ManyToMany set",
        "M2M relationni set() bilan yangilash",
        "Tagsni to'liq almashtirish uchun",
        "Update endpointlarda",
        "Relationni sinxron qilish",
        "set tags",
        `book.tags.set(tag_ids)`
      ),
      section(
        "19. Nested write with existing FK",
        "Nested data kelganda existing FK ni bog'lash",
        "Duplicate author yaratmaslik uchun",
        "Author id berilganda",
        "Existing relationni ishlatish",
        "existing FK",
        `author = Author.objects.get(pk=author_id)\nbook = Book.objects.create(author=author, **data)`
      ),
      section(
        "20. Related list in response",
        "Reverse listni chiqarish",
        "Author detailda barcha booklarni ko'rsatish uchun",
        "Detail endpointlarda",
        "Related collectionni qaytarish",
        "reverse list",
        `class AuthorSerializer(serializers.ModelSerializer):\n    books = BookSerializer(many=True, read_only=True)\n    class Meta:\n        model = Author\n        fields = ['id', 'name', 'books']`
      ),
    ],
  },
  36: {
    summary: "GenericAPIView va mixinlar CRUD kodini qisqartiradi. Bugun list/create/retrieve kabi viewlarni tayyor bloklardan yig'asiz.",
    goals: [
      "GenericAPIView bazasini tushunish",
      "List/Create/Retrieve mixinlarni qo'llash",
      "get_queryset va get_serializer_class override qilish",
    ],
    sections: [
      section(
        "01. GenericAPIView bazasi",
        "GenericAPIView queryset va serializer_class bilan ishlaydi",
        "CBVda umumiy funksiyalarni olish uchun",
        "Ko'p CRUD endpointlarda",
        "Base class sifatida ishlatish",
        "GenericAPIView",
        `class BookBaseView(GenericAPIView):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "02. ListModelMixin",
        "ListModelMixin list() metodini beradi",
        "List endpointni tez yozish uchun",
        "GET list kerak bo'lganda",
        "Querysetni listga aylantirish",
        "ListModelMixin",
        `class BookList(GenericAPIView, ListModelMixin):\n    def get(self, request):\n        return self.list(request)`
      ),
      section(
        "03. CreateModelMixin",
        "CreateModelMixin create() metodini beradi",
        "POST create tez yozish uchun",
        "Create endpoint kerak bo'lsa",
        "Serializer save bilan obyekt yaratish",
        "CreateModelMixin",
        `class BookCreate(GenericAPIView, CreateModelMixin):\n    def post(self, request):\n        return self.create(request)`
      ),
      section(
        "04. RetrieveModelMixin",
        "RetrieveModelMixin retrieve() metodini beradi",
        "Detail endpoint yozish uchun",
        "GET detail kerak bo'lsa",
        "Bitta obyektni serialize qilish",
        "RetrieveModelMixin",
        `class BookDetail(GenericAPIView, RetrieveModelMixin):\n    def get(self, request, pk):\n        return self.retrieve(request, pk=pk)`
      ),
      section(
        "05. UpdateModelMixin",
        "UpdateModelMixin update() metodini beradi",
        "PUT/PATCH endpoint uchun",
        "Update kerak bo'lsa",
        "Serializer orqali update qilish",
        "UpdateModelMixin",
        `class BookUpdate(GenericAPIView, UpdateModelMixin):\n    def put(self, request, pk):\n        return self.update(request, pk=pk)`
      ),
      section(
        "06. DestroyModelMixin",
        "DestroyModelMixin destroy() metodini beradi",
        "DELETE endpoint uchun",
        "O'chirish kerak bo'lsa",
        "Obyektni delete qilish",
        "DestroyModelMixin",
        `class BookDelete(GenericAPIView, DestroyModelMixin):\n    def delete(self, request, pk):\n        return self.destroy(request, pk=pk)`
      ),
      section(
        "07. Mixinlarni birlashtirish",
        "Bir viewda bir nechta mixin ishlatish mumkin",
        "List+Create yoki Retrieve+Update+Delete uchun",
        "CRUDni birlashtirganda",
        "Bir endpointda ko'p method",
        "Mixins combo",
        `class BookLC(GenericAPIView, ListModelMixin, CreateModelMixin):\n    def get(self, request):\n        return self.list(request)\n    def post(self, request):\n        return self.create(request)`
      ),
      section(
        "08. get_queryset override",
        "get_queryset dynamic filtering uchun",
        "Userga bog'liq data kerak bo'lsa",
        "Multi-tenant yoki user-based data",
        "Querysetni runtime sozlash",
        "get_queryset",
        `def get_queryset(self):\n    return Book.objects.filter(owner=self.request.user)`
      ),
      section(
        "09. get_serializer_class",
        "Serializerni actionga qarab almashtirish",
        "Create va list uchun boshqa serializer kerak bo'lsa",
        "Katta APIlarda",
        "Serializer tanlashni dynamic qilish",
        "get_serializer_class",
        `def get_serializer_class(self):\n    return BookCreateSerializer if self.request.method == 'POST' else BookSerializer`
      ),
      section(
        "10. Permission/pagination bilan ishlash",
        "GenericAPIView permission va paginationni qo'llab-quvvatlaydi",
        "Global sozlamalarni ishlatish uchun",
        "Protected list endpointlarda",
        "Security va paginationni boshqarish",
        "permissions",
        `permission_classes = [IsAuthenticated]\npagination_class = PageNumberPagination`
      ),
    ],
  },
  37: {
    summary: "Generic views tayyor CRUD endpointlar beradi. ListCreateAPIView va RetrieveUpdateDestroyAPIView bilan to'liq CRUDni tez yozasiz.",
    goals: [
      "Generic view turlarini farqlash",
      "perform_create/perform_update bilan logikani ajratish",
      "lookup_field va serializer_context bilan ishlash",
    ],
    sections: [
      section(
        "01. ListCreateAPIView",
        "List va create funksiyasini bitta classda beradi",
        "Tez CRUD yozish uchun",
        "List va create bir endpoint bo'lsa",
        "GET/POST logikasini avtomatlashtirish",
        "ListCreateAPIView",
        `class BookListCreate(ListCreateAPIView):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "02. RetrieveUpdateDestroyAPIView",
        "Detail, update, delete uchun tayyor view",
        "Boilerplate kodni kamaytirish uchun",
        "Detail endpointlar kerak bo'lsa",
        "GET/PUT/PATCH/DELETE ni avtomatlashtirish",
        "RUDAPIView",
        `class BookDetail(RetrieveUpdateDestroyAPIView):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "03. lookup_field",
        "lookup_field default pk dan boshqa field ishlatadi",
        "Slug bilan detail kerak bo'lsa",
        "SEO yoki human-friendly URLda",
        "Lookup fieldni almashtirish",
        "lookup_field",
        `lookup_field = 'slug'`
      ),
      section(
        "04. get_queryset",
        "Dynamic filtering uchun queryset override qilinadi",
        "Userga tegishli data chiqishi uchun",
        "Multi-tenant APIlarda",
        "Access nazoratli queryset",
        "get_queryset",
        `def get_queryset(self):\n    return Book.objects.filter(owner=self.request.user)`
      ),
      section(
        "05. serializer_class",
        "Serializerni aniqlash viewning asosiy qismi",
        "Response formatni belgilash uchun",
        "Har bir endpointda",
        "Input/output kontraktni o'rnatish",
        "serializer_class",
        `serializer_class = BookSerializer`
      ),
      section(
        "06. perform_create",
        "Create vaqtida qo'shimcha logika qo'shish",
        "Owner yoki userni avtomatik qo'yish uchun",
        "POST create paytida",
        "Saved instancega qo'shimcha fieldlar berish",
        "perform_create",
        `def perform_create(self, serializer):\n    serializer.save(owner=self.request.user)`
      ),
      section(
        "07. perform_update",
        "Update paytida qo'shimcha logika ishlatish",
        "Audit log yoki status o'zgartirish uchun",
        "PUT/PATCH paytida",
        "Update jarayonini nazorat qilish",
        "perform_update",
        `def perform_update(self, serializer):\n    serializer.save(updated_by=self.request.user)`
      ),
      section(
        "08. Pagination class",
        "Paginationni viewga alohida berish mumkin",
        "Global sozlamadan farq qilsa",
        "Maxsus endpointlarda",
        "Response hajmini boshqarish",
        "pagination_class",
        `pagination_class = PageNumberPagination`
      ),
      section(
        "09. Filtering integratsiya",
        "Filter backendlar genericsda ham ishlaydi",
        "List endpointlarda qidiruv kerak bo'lsa",
        "Search/filter uchun",
        "Query param orqali data boshqarish",
        "filter_backends",
        `filter_backends = [SearchFilter]\nsearch_fields = ['title']`
      ),
      section(
        "10. get_serializer_context",
        "Serializerga context berish uchun override",
        "Request yoki extra data kerak bo'lsa",
        "Serializer ichida request ishlatilsa",
        "Dynamic context uzatish",
        "get_serializer_context",
        `def get_serializer_context(self):\n    ctx = super().get_serializer_context()\n    ctx['lang'] = 'uz'\n    return ctx`
      ),
    ],
  },
  38: {
    summary: "ViewSetlar va routerlar bilan CRUD endpointlarni minimal kod bilan qurish mumkin. Bugun ModelViewSet, router va actionlarni chuqur o'rganasiz.",
    goals: [
      "ModelViewSet va GenericViewSet farqini bilish",
      "Router bilan URLlarni avtomatik yaratish",
      "@action bilan custom endpoint yozish",
      "get_queryset/get_serializer_class bilan dynamic boshqarish",
    ],
    sections: [
      section(
        "01. ViewSet nima",
        "ViewSet bir nechta CRUD metodni bitta classda jamlaydi",
        "Kod takrorlanmasligi uchun",
        "CRUD endpointlar ko'p bo'lsa",
        "List/create/retrieve/update/destroyni birlashtirish",
        "ViewSet",
        `class BookViewSet(ViewSet):\n    def list(self, request):\n        ...`
      ),
      section(
        "02. ModelViewSet",
        "ModelViewSet to'liq CRUDni beradi",
        "Eng tez CRUD uchun",
        "Model asosida API kerak bo'lsa",
        "List/create/retrieve/update/destroy avtomatik",
        "ModelViewSet",
        `class BookViewSet(ModelViewSet):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "03. ReadOnlyModelViewSet",
        "Faqat list va retrieve beradi",
        "Readonly API kerak bo'lsa",
        "Public data ko'rsatishda",
        "Create/update/delete ni bloklash",
        "ReadOnlyModelViewSet",
        `class PublicBookViewSet(ReadOnlyModelViewSet):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "04. GenericViewSet + mixins",
        "GenericViewSet mixinlar bilan moslashuvchan CRUD beradi",
        "Kerakli methodlarni tanlash uchun",
        "Faqat list/create kerak bo'lsa",
        "Minimal endpointlar yig'ish",
        "GenericViewSet",
        `class BookViewSet(GenericViewSet, ListModelMixin, CreateModelMixin):\n    queryset = Book.objects.all()\n    serializer_class = BookSerializer`
      ),
      section(
        "05. Router register",
        "Router URL patternlarni avtomatik yaratadi",
        "URL boilerplate kamaytirish uchun",
        "ViewSet ishlatilganda",
        "CRUD endpointlarni auto qo'shish",
        "DefaultRouter",
        `router = DefaultRouter()\nrouter.register('books', BookViewSet)\nurlpatterns = router.urls`
      ),
      section(
        "06. basename",
        "basename routerga nom beradi",
        "Queryset yo'q bo'lsa router ishlashi uchun",
        "Custom queryset bo'lmaganda",
        "URL name generatsiya qilish",
        "basename",
        `router.register('reports', ReportViewSet, basename='report')`
      ),
      section(
        "07. lookup_field",
        "lookup_field detail URL paramini o'zgartiradi",
        "Slug yoki uuid ishlatish uchun",
        "Human-friendly URL kerak bo'lsa",
        "Lookup fieldni moslashtirish",
        "lookup_field",
        `lookup_field = 'slug'`
      ),
      section(
        "08. get_queryset",
        "get_queryset dynamic filtering beradi",
        "Userga tegishli data ko'rsatish uchun",
        "Multi-tenant APIda",
        "Querysetni runtime boshqarish",
        "get_queryset",
        `def get_queryset(self):\n    return Book.objects.filter(owner=self.request.user)`
      ),
      section(
        "09. get_serializer_class",
        "Actionga qarab serializer tanlash",
        "Create va list uchun boshqa serializer kerak bo'lsa",
        "Katta APIlarda",
        "Input/output kontraktni ajratish",
        "get_serializer_class",
        `def get_serializer_class(self):\n    return BookCreateSerializer if self.action == 'create' else BookSerializer`
      ),
      section(
        "10. @action detail=False",
        "Custom list action yozish",
        "List endpointga qo'shimcha filter kerak bo'lsa",
        "Top books yoki stats uchun",
        "Custom list endpoint",
        "@action list",
        `@action(detail=False, methods=['get'])\n    def top(self, request):\n        return Response({'ok': True})`
      ),
      section(
        "11. @action detail=True",
        "Custom detail action yozish",
        "Detail endpointda qo'shimcha amal kerak bo'lsa",
        "Like, publish kabi amallar uchun",
        "Custom detail endpoint",
        "@action detail",
        `@action(detail=True, methods=['post'])\n    def publish(self, request, pk=None):\n        return Response({'status': 'published'})`
      ),
      section(
        "12. action url_path",
        "Custom action uchun URL path berish",
        "Readable URL kerak bo'lsa",
        "/books/{id}/set-status kabi",
        "Custom path yaratish",
        "url_path",
        `@action(detail=True, methods=['post'], url_path='set-status')\n    def set_status(self, request, pk=None):\n        ...`
      ),
      section(
        "13. permission_classes",
        "ViewSetga permission berish",
        "Security uchun",
        "Protected endpointlarda",
        "Access nazorat qilish",
        "permission_classes",
        `permission_classes = [IsAuthenticated]`
      ),
      section(
        "14. pagination_class",
        "ViewSetga pagination berish",
        "Response hajmini nazorat qilish uchun",
        "List endpointlarda",
        "Paginationni boshqarish",
        "pagination_class",
        `pagination_class = PageNumberPagination`
      ),
      section(
        "15. filter_backends",
        "ViewSetda filtering qo'shish",
        "Search va ordering uchun",
        "List endpointlarda",
        "Query paramlarni ishlatish",
        "filter_backends",
        `filter_backends = [SearchFilter, OrderingFilter]`
      ),
      section(
        "16. perform_create",
        "Create paytida qo'shimcha data qo'shish",
        "Ownerni avtomatik qo'yish uchun",
        "POST create da",
        "Saved instancega qo'shimcha field berish",
        "perform_create",
        `def perform_create(self, serializer):\n    serializer.save(owner=self.request.user)`
      ),
      section(
        "17. perform_update",
        "Update paytida logika qo'shish",
        "Audit yoki status update uchun",
        "PUT/PATCH da",
        "Update jarayonini nazorat qilish",
        "perform_update",
        `def perform_update(self, serializer):\n    serializer.save(updated_by=self.request.user)`
      ),
      section(
        "18. custom create override",
        "Create metodini override qilish",
        "Extra validatsiya yoki response format kerak bo'lsa",
        "Custom business logika bo'lsa",
        "Create flowni boshqarish",
        "override create",
        `def create(self, request, *args, **kwargs):\n    response = super().create(request, *args, **kwargs)\n    response.data['extra'] = 'ok'\n    return response`
      ),
      section(
        "19. bulk create",
        "Ko'p obyektni bir requestda yaratish",
        "Batch operatsiyalar uchun",
        "Admin yoki import endpointda",
        "Bulk insert qilish",
        "bulk create",
        `serializer = BookSerializer(data=request.data, many=True)\nserializer.is_valid(raise_exception=True)\nBook.objects.bulk_create([Book(**d) for d in serializer.validated_data])`
      ),
      section(
        "20. extra actions for nested",
        "Nested resource uchun custom action",
        "Author ichida book listini olish uchun",
        "Nested endpoint kerak bo'lsa",
        "Related list chiqarish",
        "nested action",
        `@action(detail=True, methods=['get'])\n    def books(self, request, pk=None):\n        books = Book.objects.filter(author_id=pk)\n        return Response(BookSerializer(books, many=True).data)`
      ),
    ],
  },
  39: {
    summary: "Authentication userni aniqlaydi. Session, Basic va Token auth bilan DRFda himoyalangan API yozishni o'rganasiz.",
    goals: [
      "Auth turlarini farqlash",
      "TokenAuthentication sozlash",
      "Authorization header formatini tushunish",
    ],
    sections: [
      section(
        "01. SessionAuthentication",
        "Session auth Django sessioniga tayanadi",
        "Admin yoki web login bilan ishlash uchun",
        "Browser-based APIlarda",
        "Cookie orqali userni aniqlash",
        "SessionAuthentication",
        `REST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.SessionAuthentication']\n}`
      ),
      section(
        "02. BasicAuthentication",
        "Basic auth header orqali login qiladi",
        "Tez test yoki internal API uchun",
        "Simple auth kerak bo'lsa",
        "Authorization headerni tekshirish",
        "BasicAuthentication",
        `REST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.BasicAuthentication']\n}`
      ),
      section(
        "03. TokenAuthentication",
        "Token auth stateless auth beradi",
        "Mobile/SPA clientlar uchun",
        "Session ishlamaydigan clientlarda",
        "Token orqali userni aniqlash",
        "TokenAuthentication",
        `REST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.TokenAuthentication']\n}`
      ),
      section(
        "04. Token model",
        "Token model userga token beradi",
        "Token auth ishlashi uchun",
        "TokenAuthentication ishlatilganda",
        "Token saqlash va tekshirish",
        "Token model",
        `from rest_framework.authtoken.models import Token\nToken.objects.get_or_create(user=user)`
      ),
      section(
        "05. Obtain token endpoint",
        "Token olish uchun endpoint kerak",
        "Client login qilib token olishi uchun",
        "Token auth flowda",
        "Token generatsiya va qaytarish",
        "obtain token",
        `from rest_framework.authtoken.views import obtain_auth_token\nurlpatterns = [path('token/', obtain_auth_token)]`
      ),
      section(
        "06. Authorization header",
        "Token header formatini belgilaydi",
        "Client to'g'ri yuborishi uchun",
        "Token authda",
        "Requestni autentifikatsiya qilish",
        "Authorization header",
        `Authorization: Token 123abc`
      ),
      section(
        "07. Login view",
        "Token olish uchun custom login view",
        "Custom response yoki logic kerak bo'lsa",
        "Login flow kerak bo'lsa",
        "Token generatsiya qilish",
        "login view",
        `token, _ = Token.objects.get_or_create(user=user)\nreturn Response({'token': token.key})`
      ),
      section(
        "08. Unauthenticated response",
        "Auth yo'q bo'lsa 401 qaytariladi",
        "Clientga aniq signal berish uchun",
        "Protected endpointlarda",
        "Unauthorized holatni ko'rsatish",
        "401",
        `return Response({'detail': 'Authentication required'}, status=401)`
      ),
      section(
        "09. force_authenticate testda",
        "Testda authni bypass qilish",
        "API test yozishda",
        "APITestCase ichida",
        "Test uchun userni biriktirish",
        "force_authenticate",
        `client.force_authenticate(user=user)`
      ),
      section(
        "10. Custom authentication",
        "Custom auth class yozish mumkin",
        "Maxsus token yoki header bo'lsa",
        "Enterprise APIlarda",
        "Auth logikasini moslash",
        "custom auth",
        `class CustomAuth(BaseAuthentication):\n    def authenticate(self, request):\n        ...`
      ),
    ],
  },
  40: {
    summary: "Permissionlar userga nima qilish mumkinligini belgilaydi. Built-in va custom permissionlar bilan API xavfsizligini to'liq boshqarasiz.",
    goals: [
      "permission_classes va default permissionlarni tushunish",
      "Custom permission class yozish",
      "Object-level permission qo'llash",
      "Action bo'yicha permission berish",
    ],
    sections: [
      section(
        "01. permission_classes",
        "permission_classes view yoki viewsetga ruxsat qoidasi beradi",
        "Securityni markazlashtirish uchun",
        "Protected endpointlarda",
        "Kirishni nazorat qilish",
        "permission_classes",
        `permission_classes = [IsAuthenticated]`
      ),
      section(
        "02. AllowAny",
        "AllowAny hamma userga ruxsat beradi",
        "Public endpointlar uchun",
        "Landing yoki public list bo'lsa",
        "Authsiz kirishni ruxsat qilish",
        "AllowAny",
        `permission_classes = [AllowAny]`
      ),
      section(
        "03. IsAuthenticated",
        "IsAuthenticated faqat login userga ruxsat beradi",
        "Private API uchun",
        "Auth shart bo'lsa",
        "Unauthorized requestni bloklash",
        "IsAuthenticated",
        `permission_classes = [IsAuthenticated]`
      ),
      section(
        "04. IsAdminUser",
        "IsAdminUser faqat adminlarga ruxsat beradi",
        "Admin-only endpointlar uchun",
        "Admin panel API bo'lsa",
        "Staff userni tekshirish",
        "IsAdminUser",
        `permission_classes = [IsAdminUser]`
      ),
      section(
        "05. IsAuthenticatedOrReadOnly",
        "Read-only public, write auth kerak",
        "Public list, private edit uchun",
        "Blog yoki catalog APIlarda",
        "Safe methodlarni public qilish",
        "IsAuthenticatedOrReadOnly",
        `permission_classes = [IsAuthenticatedOrReadOnly]`
      ),
      section(
        "06. DjangoModelPermissions",
        "Django permissionlar asosida ruxsat beradi",
        "Admin va RBAC kerak bo'lsa",
        "Model permissionlar ishlatilganda",
        "add/change/delete permissionlarni tekshirish",
        "DjangoModelPermissions",
        `permission_classes = [DjangoModelPermissions]`
      ),
      section(
        "07. DjangoObjectPermissions",
        "Object-level permissionni tekshiradi",
        "Har bir obyekt uchun ruxsat kerak bo'lsa",
        "Owner-based ruxsatlarda",
        "Object permission ishlatish",
        "DjangoObjectPermissions",
        `permission_classes = [DjangoObjectPermissions]`
      ),
      section(
        "08. Custom permission class",
        "Custom permission class maxsus qoidani beradi",
        "Business rule kerak bo'lsa",
        "Paid user yoki role-based access bo'lsa",
        "Ruxsat logikasini yozish",
        "Custom permission",
        `class IsPremium(BasePermission):\n    def has_permission(self, request, view):\n        return request.user.is_premium`
      ),
      section(
        "09. has_permission",
        "has_permission umumiy ruxsatni tekshiradi",
        "Userga kirish ruxsatini aniqlash uchun",
        "Viewga kirishdan oldin",
        "Global permission check",
        "has_permission",
        `def has_permission(self, request, view):\n    return request.user.is_authenticated`
      ),
      section(
        "10. has_object_permission",
        "has_object_permission aniq obyekt uchun ruxsat beradi",
        "Owner-based access uchun",
        "Detail endpointlarda",
        "Object-level check",
        "has_object_permission",
        `def has_object_permission(self, request, view, obj):\n    return obj.owner_id == request.user.id`
      ),
      section(
        "11. SAFE_METHODS",
        "SAFE_METHODS GET/HEAD/OPTIONS uchun",
        "Read-only ruxsat berish uchun",
        "Public list kerak bo'lsa",
        "Write'ni cheklash",
        "SAFE_METHODS",
        `if request.method in SAFE_METHODS:\n    return True`
      ),
      section(
        "12. get_permissions override",
        "Actionga qarab permission tanlash",
        "List va create uchun turli ruxsat kerak bo'lsa",
        "ViewSetlarda",
        "Dynamic permission",
        "get_permissions",
        `def get_permissions(self):\n    if self.action == 'list':\n        return [AllowAny()]\n    return [IsAuthenticated()]`
      ),
      section(
        "13. permission per method",
        "HTTP methodga qarab permission berish",
        "GET public, POST private bo'lsa",
        "Function-based viewlarda",
        "Method-based permission",
        "method permission",
        `if request.method == 'GET':\n    return Response(data)\nself.check_permissions(request)`
      ),
      section(
        "14. permission + queryset",
        "Permission bilan querysetni cheklash",
        "User faqat o'z datasini ko'rsin",
        "Multi-tenant APIlarda",
        "Security va data isolation",
        "queryset filtering",
        `def get_queryset(self):\n    return Book.objects.filter(owner=self.request.user)`
      ),
      section(
        "15. OR permission",
        "Bir nechta permissiondan bittasi yetarli bo'lishi mumkin",
        "Flex access kerak bo'lsa",
        "Admin yoki owner bo'lsa",
        "Permissionlarni kombinatsiya qilish",
        "OR permission",
        `class IsAdminOrOwner(BasePermission):\n    def has_object_permission(self, request, view, obj):\n        return request.user.is_staff or obj.owner == request.user`
      ),
      section(
        "16. PermissionDenied",
        "PermissionDenied xatosi 403 qaytaradi",
        "Ruxsat yo'q bo'lsa",
        "Custom checklarda",
        "Accessni bloklash",
        "PermissionDenied",
        `from rest_framework.exceptions import PermissionDenied\nraise PermissionDenied('not allowed')`
      ),
      section(
        "17. Default permission",
        "DEFAULT_PERMISSION_CLASSES global permission beradi",
        "Har bir viewda yozmaslik uchun",
        "Katta projekte",
        "Global security policy",
        "DEFAULT_PERMISSION_CLASSES",
        `REST_FRAMEWORK = {\n    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated']\n}`
      ),
      section(
        "18. Permission ordering",
        "Permission list ketma-ket tekshiriladi",
        "Fail-fast uchun",
        "Bir nechta permission bo'lsa",
        "Ruxsatni tez tekshirish",
        "permission order",
        `permission_classes = [IsAuthenticated, IsAdminUser]`
      ),
      section(
        "19. Object permission in serializer",
        "Serializerda object-level check qilish mumkin",
        "Viewdan tashqari tekshiruv kerak bo'lsa",
        "Special business rule bo'lsa",
        "Extra safety layer",
        "serializer check",
        `def validate(self, data):\n    if not self.context['request'].user.is_staff:\n        raise serializers.ValidationError('forbidden')\n    return data`
      ),
      section(
        "20. Permission testing",
        "Permission testlari API ishonchliligini oshiradi",
        "Regressionni oldini olish uchun",
        "APITestCase bilan",
        "Access nazoratini tekshirish",
        "permission test",
        `client.force_authenticate(user=other_user)\nresp = client.get(url)\nassert resp.status_code == 403`
      ),
    ],
  },
  41: {
    summary: "JWT auth bilan stateless API quriladi. SimpleJWT yordamida access/refresh token, lifetime, blacklist va custom claims bilan ishlaysiz.",
    goals: [
      "SimpleJWT o'rnatish va sozlash",
      "Access/refresh token flowni tushunish",
      "Custom claims va blacklist bilan ishlash",
      "JWTni test va productionda to'g'ri ishlatish",
    ],
    sections: [
      section(
        "01. SimpleJWT o'rnatish",
        "SimpleJWT JWT authni DRFga qo'shadi",
        "JWT flowni tez sozlash uchun",
        "JWT ishlatmoqchi bo'lganda",
        "Token authni ishga tushirish",
        "install simplejwt",
        `pip install djangorestframework-simplejwt`
      ),
      section(
        "02. DEFAULT_AUTHENTICATION_CLASSES",
        "JWT auth classni sozlash",
        "DRF global authni belgilash uchun",
        "JWT standart auth bo'lsa",
        "Requestlarda tokenni tekshirish",
        "JWT auth class",
        `REST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication']\n}`
      ),
      section(
        "03. TokenObtainPairView",
        "Login paytida access va refresh token beradi",
        "Clientga token berish uchun",
        "Login endpoint kerak bo'lsa",
        "Token olish flowini boshlash",
        "TokenObtainPairView",
        `urlpatterns = [\n    path('api/token/', TokenObtainPairView.as_view()),\n]`
      ),
      section(
        "04. TokenRefreshView",
        "Refresh token bilan yangi access beradi",
        "Access expire bo'lsa",
        "Session yo'q bo'lsa",
        "Access tokenni yangilash",
        "TokenRefreshView",
        `urlpatterns = [\n    path('api/token/refresh/', TokenRefreshView.as_view()),\n]`
      ),
      section(
        "05. Access vs Refresh",
        "Access qisqa, Refresh uzun umrlik token",
        "Xavfsizlikni oshirish uchun",
        "Auth flowda",
        "Token lifecycle boshqarish",
        "token types",
        `# access: short\n# refresh: long`
      ),
      section(
        "06. Token lifetime",
        "Token lifetime sozlamalar bilan belgilanadi",
        "Security va UX balans uchun",
        "JWT configda",
        "Token umrini boshqarish",
        "token lifetime",
        `SIMPLE_JWT = {\n    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),\n    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),\n}`
      ),
      section(
        "07. Token blacklist app",
        "Blacklist app refresh tokenni bloklaydi",
        "Logout va security uchun",
        "Refresh token bekor qilinishi kerak bo'lsa",
        "Tokenni invalid qilish",
        "blacklist app",
        `INSTALLED_APPS += ['rest_framework_simplejwt.token_blacklist']`
      ),
      section(
        "08. Rotate refresh tokens",
        "Refresh token har safar yangilanadi",
        "Token hijackingni kamaytirish uchun",
        "Security muhim bo'lsa",
        "Refresh token rotation",
        "ROTATE_REFRESH_TOKENS",
        `SIMPLE_JWT = {\n    'ROTATE_REFRESH_TOKENS': True\n}`
      ),
      section(
        "09. Blacklist after rotation",
        "Eski refresh tokenni blacklist qiladi",
        "Securityni oshirish uchun",
        "Rotation ishlatilganda",
        "Old tokenni bloklash",
        "BLACKLIST_AFTER_ROTATION",
        `SIMPLE_JWT = {\n    'BLACKLIST_AFTER_ROTATION': True\n}`
      ),
      section(
        "10. Sliding tokens",
        "Sliding tokenlar access+refreshni birlashtiradi",
        "Soddaroq auth flow uchun",
        "Simple flow kerak bo'lsa",
        "Token lifecycle soddalashtirish",
        "sliding token",
        `urlpatterns = [\n    path('api/token/', TokenObtainSlidingView.as_view()),\n]`
      ),
      section(
        "11. Custom claims",
        "Token ichiga custom field qo'shish",
        "User role yoki plan yuborish uchun",
        "Clientga extra info kerak bo'lsa",
        "Token payloadni boyitish",
        "custom claims",
        `class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):\n    @classmethod\n    def get_token(cls, user):\n        token = super().get_token(user)\n        token['role'] = user.role\n        return token`
      ),
      section(
        "12. Custom token view",
        "Custom serializer bilan token view yozish",
        "Custom claims ishlatish uchun",
        "Token response formatini o'zgartirish kerak bo'lsa",
        "Custom token endpoint",
        "custom token view",
        `class CustomTokenView(TokenObtainPairView):\n    serializer_class = CustomTokenObtainPairSerializer`
      ),
      section(
        "13. TokenVerifyView",
        "Tokenni tekshirish endpointi",
        "Client tokenni validligini tekshirsa",
        "Debug yoki monitoringda",
        "Tokenni verify qilish",
        "TokenVerifyView",
        `urlpatterns += [path('api/token/verify/', TokenVerifyView.as_view())]`
      ),
      section(
        "14. Authorization header",
        "Bearer formatdagi header",
        "Auth ishlashi uchun",
        "Har bir requestda",
        "Tokenni serverga yuborish",
        "Bearer header",
        `Authorization: Bearer <access_token>`
      ),
      section(
        "15. Logout with blacklist",
        "Logout paytida refresh tokenni blacklist qilish",
        "Token qayta ishlatilmasligi uchun",
        "Logout endpointda",
        "Tokenni invalid qilish",
        "logout blacklist",
        `token = RefreshToken(refresh)\ntoken.blacklist()`
      ),
      section(
        "16. JWT + permissions",
        "JWT bilan permissionlar ishlaydi",
        "Authdan keyin access nazorati uchun",
        "Protected endpointlarda",
        "IsAuthenticated check",
        "JWT permissions",
        `permission_classes = [IsAuthenticated]`
      ),
      section(
        "17. JWT test",
        "Testda token olish va ishlatish",
        "Auth flowni test qilish uchun",
        "APITestCase ichida",
        "Token bilan request yuborish",
        "JWT test",
        `token = RefreshToken.for_user(user).access_token\nclient.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')`
      ),
      section(
        "18. Token expiration handling",
        "Expired token 401 qaytaradi",
        "Client refresh qilishi uchun",
        "Access token tugaganda",
        "Auth flowni qayta tiklash",
        "expired token",
        `# client refresh token with /api/token/refresh/`
      ),
      section(
        "19. Token storage policy",
        "Tokenni xavfsiz saqlash muhim",
        "XSS riskni kamaytirish uchun",
        "Frontendda token saqlanganda",
        "Securityni saqlash",
        "token storage",
        `# HttpOnly cookie yoki secure storage ishlatish tavsiya`
      ),
      section(
        "20. Refresh token rotation test",
        "Rotation ishlaganda eski token block bo'ladi",
        "Securityni tekshirish uchun",
        "Rotation yoqilgan bo'lsa",
        "Token reuse ni bloklash",
        "rotation test",
        `# refresh qilgandan so'ng eski refresh token invalid bo'ladi`
      ),
    ],
  },
  42: {
    summary: "Throttling APIga keladigan requestlarni cheklaydi. Rate limitlar bilan APIni himoya qilasiz va abuse'ni kamaytirasiz.",
    goals: [
      "DEFAULT_THROTTLE_CLASSES va rates sozlash",
      "User/Anon/Scoped throttle ishlatish",
      "Custom throttle class yozish",
    ],
    sections: [
      section(
        "01. DEFAULT_THROTTLE_CLASSES",
        "Global throttle classlar ro'yxati",
        "Har bir endpointda throttling ishlashi uchun",
        "Project darajasida",
        "Rate limitni yoqish",
        "DEFAULT_THROTTLE_CLASSES",
        `REST_FRAMEWORK = {\n    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.UserRateThrottle']\n}`
      ),
      section(
        "02. DEFAULT_THROTTLE_RATES",
        "Throttle rate limitlarni belgilaydi",
        "So'rov sonini cheklash uchun",
        "Global policy kerak bo'lsa",
        "Rate limitni sozlash",
        "DEFAULT_THROTTLE_RATES",
        `REST_FRAMEWORK = {\n    'DEFAULT_THROTTLE_RATES': {'user': '100/day'}\n}`
      ),
      section(
        "03. UserRateThrottle",
        "User bo'yicha request limit",
        "Login userlar uchun",
        "Authenticated endpointlarda",
        "User abuse ni cheklash",
        "UserRateThrottle",
        `class BookViewSet(ModelViewSet):\n    throttle_classes = [UserRateThrottle]`
      ),
      section(
        "04. AnonRateThrottle",
        "Anonymous userlar uchun limit",
        "Public APIlarni himoya qilish uchun",
        "Login bo'lmagan userlar bo'lsa",
        "Anon abuse ni cheklash",
        "AnonRateThrottle",
        `throttle_classes = [AnonRateThrottle]`
      ),
      section(
        "05. ScopedRateThrottle",
        "Endpointga maxsus limit beradi",
        "Different endpoints uchun boshqa limit kerak bo'lsa",
        "Heavy endpointlarda",
        "Scoped throttling",
        "ScopedRateThrottle",
        `throttle_scope = 'reports'\n\nREST_FRAMEWORK = {\n  'DEFAULT_THROTTLE_RATES': {'reports': '10/hour'}\n}`
      ),
      section(
        "06. throttle_scope",
        "Scope name bilan rate tanlanadi",
        "Endpoint-level policy uchun",
        "ScopedRateThrottle ishlatilganda",
        "Specific limit qo'yish",
        "throttle_scope",
        `throttle_scope = 'login'`
      ),
      section(
        "07. Custom throttle class",
        "Custom rate limit logikasini yozish",
        "IP yoki header asosida limit kerak bo'lsa",
        "Advanced policy bo'lsa",
        "Custom throttling",
        "custom throttle",
        `class VipThrottle(SimpleRateThrottle):\n    scope = 'vip'\n    def get_cache_key(self, request, view):\n        return request.user.id`
      ),
      section(
        "08. Cache backend",
        "Throttle cache backendga tayanadi",
        "Redis yoki memcached kerak bo'ladi",
        "Productionda",
        "Throttle state saqlash",
        "cache backend",
        `CACHES = {'default': {'BACKEND': 'django_redis.cache.RedisCache'}}`
      ),
      section(
        "09. 429 response",
        "Limit oshsa 429 qaytaradi",
        "Clientga rate limitni bildirish uchun",
        "Rate limit buzilganda",
        "Too Many Requests holati",
        "429",
        `# DRF avtomatik 429 qaytaradi`
      ),
      section(
        "10. Throttle per action",
        "Actionga qarab throttle berish",
        "Login endpointga qattiq limit kerak bo'lsa",
        "ViewSet actionlarida",
        "Action-level limit",
        "action throttle",
        `def get_throttles(self):\n    if self.action == 'login':\n        return [AnonRateThrottle()]\n    return super().get_throttles()`
      ),
      section(
        "11. get_cache_key override",
        "Custom cache key throttle uchun asos beradi",
        "User yoki IP bo'yicha aniq limit qo'yish uchun",
        "Maxsus identifikator kerak bo'lsa",
        "Throttle keyni boshqarish",
        "get_cache_key",
        `class BurstRateThrottle(SimpleRateThrottle):
    scope = 'burst'
    def get_cache_key(self, request, view):
        return self.cache_format % {'scope': self.scope, 'ident': self.get_ident(request)}`
      ),
      section(
        "12. Multiple scope rates",
        "Bir nechta scope uchun turli limitlar",
        "Endpointlar har xil yuklamaga ega bo'lsa",
        "Rate policy dizaynida",
        "Scope-based limitlar",
        "multi rates",
        `REST_FRAMEWORK = {
  'DEFAULT_THROTTLE_RATES': {
    'user': '100/day',
    'login': '10/min',
    'reports': '5/hour'
  }
}`
      ),
      section(
        "13. Burst vs sustained",
        "Qisqa va uzoq muddatli limitlar",
        "Traffic spike va barqaror limitni ajratish uchun",
        "High-traffic APIlarda",
        "Ikki bosqichli throttling",
        "burst/sustained",
        `class BurstRateThrottle(SimpleRateThrottle):
    scope = 'burst'

class SustainedRateThrottle(SimpleRateThrottle):
    scope = 'sustained'`
      ),
      section(
        "14. Login throttling",
        "Login endpointga qattiq limit",
        "Bruteforce hujumlarni kamaytirish uchun",
        "Auth endpointlarda",
        "Login rate nazorati",
        "login throttle",
        `class AuthViewSet(ViewSet):
    throttle_scope = 'login'
    throttle_classes = [ScopedRateThrottle]`
      ),
      section(
        "15. Custom throttled response",
        "Throttled response formatini o'zgartirish",
        "Clientga aniq retry vaqtini ko'rsatish uchun",
        "Rate limit oshganda",
        "Response formatni boshqarish",
        "throttled override",
        `def throttled(self, request, wait):
    return Response({'detail': 'limit', 'retry_after': wait}, status=429)`
      ),
      section(
        "16. Staff whitelist",
        "Adminlarni throttlingdan ozod qilish",
        "Internal adminlar cheklanmasligi uchun",
        "Admin endpointlarda",
        "Bypass throttling",
        "allow_request",
        `def allow_request(self, request, view):
    if request.user.is_staff:
        return True
    return super().allow_request(request, view)`
      ),
      section(
        "17. Group-based rate",
        "User groupga qarab limit",
        "Premium userlar uchun yuqori limit kerak bo'lsa",
        "Membership bo'lsa",
        "Dynamic rate",
        "get_rate",
        `def get_rate(self):
    if self.request.user.is_premium:
        return '1000/day'
    return '200/day'`
      ),
      section(
        "18. IP-based throttle",
        "Anon userlar uchun IP limit",
        "Public APIda abuse bo'lsa",
        "Login bo'lmagan requestlarda",
        "IP bo'yicha key",
        "IP throttle",
        `class IpRateThrottle(SimpleRateThrottle):
    scope = 'ip'
    def get_cache_key(self, request, view):
        return self.get_ident(request)`
      ),
      section(
        "19. Action-based throttles",
        "Actionga qarab turli throttle",
        "Create endpoint ko'proq cheklansa",
        "ViewSet actionlarda",
        "Selective throttling",
        "get_throttles",
        `def get_throttles(self):
    if self.action == 'create':
        return [ScopedRateThrottle()]
    return super().get_throttles()`
      ),
      section(
        "20. Throttle testing",
        "Throttle ishlashini test qilish",
        "Limitlar to'g'ri ekanini tekshirish uchun",
        "APITestCase ichida",
        "Test orqali rate nazorat",
        "throttle test",
        `for _ in range(11):
    resp = client.get('/api/login/')
assert resp.status_code == 429`
      ),

    ],
  },
  43: {
    summary: "Filtering, search va ordering API usabilityni oshiradi. Bugun django-filter va DRF filter backendlarini ishlatasiz.",
    goals: [
      "DjangoFilterBackend sozlash",
      "SearchFilter va OrderingFilter ishlatish",
      "FilterSet class bilan custom filter yozish",
    ],
    sections: [
      section(
        "01. django-filter o'rnatish",
        "django-filter DRF uchun filtering kutubxonasi",
        "Advanced filterlar kerak bo'lsa",
        "Filtering ishlatmoqchi bo'lsangiz",
        "Filter backendni yoqish",
        "install django-filter",
        `pip install django-filter`
      ),
      section(
        "02. DjangoFilterBackend",
        "DjangoFilterBackend filtersetni ishlatadi",
        "Field bo'yicha filter qilish uchun",
        "List endpointlarda",
        "Filter logikasini yoqish",
        "DjangoFilterBackend",
        `filter_backends = [DjangoFilterBackend]`
      ),
      section(
        "03. filterset_fields",
        "filterset_fields simple filter beradi",
        "Tez filter sozlash uchun",
        "Small APIlarda",
        "Field bo'yicha filter",
        "filterset_fields",
        `filterset_fields = ['status', 'category']`
      ),
      section(
        "04. FilterSet class",
        "FilterSet custom filterlar yozishga imkon beradi",
        "Murakkab filter kerak bo'lsa",
        "Date range yoki custom logic bo'lsa",
        "Custom filter yaratish",
        "FilterSet",
        `class BookFilter(FilterSet):\n    min_price = NumberFilter(field_name='price', lookup_expr='gte')`
      ),
      section(
        "05. filterset_class",
        "filterset_class viewga custom filter beradi",
        "FilterSet ishlatganda",
        "Complex filter kerak bo'lsa",
        "Custom filter qo'shish",
        "filterset_class",
        `filterset_class = BookFilter`
      ),
      section(
        "06. SearchFilter",
        "SearchFilter text qidiruv beradi",
        "Query orqali search kerak bo'lsa",
        "Search UX uchun",
        "Fieldlarda search qilish",
        "SearchFilter",
        `filter_backends = [SearchFilter]\nsearch_fields = ['title', 'author__name']`
      ),
      section(
        "07. OrderingFilter",
        "OrderingFilter sort qilish imkonini beradi",
        "Client sorting tanlashi uchun",
        "List endpointlarda",
        "Order by boshqarish",
        "OrderingFilter",
        `filter_backends = [OrderingFilter]\nordering_fields = ['created_at', 'price']`
      ),
      section(
        "08. default ordering",
        "Default ordering qatorni standart tartibda beradi",
        "Client ordering bermasa",
        "List endpointlarda",
        "Order fallback",
        "ordering",
        `ordering = ['-created_at']`
      ),
      section(
        "09. lookup_expr",
        "lookup_expr filter shartini belgilaydi",
        "Range yoki contains kerak bo'lsa",
        "Advanced filterlarda",
        "Filterni moslashtirish",
        "lookup_expr",
        `class BookFilter(FilterSet):\n    title = CharFilter(lookup_expr='icontains')`
      ),
      section(
        "10. Filter + Search birga",
        "Filter va search bir viewda ishlaydi",
        "Katta listlar uchun",
        "Search va filter birga kerak bo'lsa",
        "Combined query",
        "combined filter",
        `filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]`
      ),
      section(
        "11. Method filter",
        "FilterSetda custom method yozish",
        "Murakkab filter logikasi kerak bo'lsa",
        "Custom filteringda",
        "Filter logikasini yozish",
        "method filter",
        `class BookFilter(FilterSet):
    title = CharFilter(method='filter_title')
    def filter_title(self, qs, name, value):
        return qs.filter(title__icontains=value)`
      ),
      section(
        "12. Range filter",
        "Range bo'yicha filter qilish",
        "Min/max qiymatlar kerak bo'lsa",
        "Price, date kabi fieldlarda",
        "Interval filter",
        "range filter",
        `class BookFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')`
      ),
      section(
        "13. filterset_fields with lookups",
        "Lookup bilan field filter",
        "icontains yoki gte/lte kerak bo'lsa",
        "Simple configda",
        "Lookupni tez sozlash",
        "lookups",
        `filterset_fields = {
  'price': ['gte', 'lte'],
  'title': ['icontains']
}`
      ),
      section(
        "14. Search prefixes",
        "SearchFilter prefixlari ^, =, @",
        "Qidiruv xatti-harakatini nazorat qilish uchun",
        "Search fieldsda",
        "Search moslash",
        "search prefix",
        `search_fields = ['^title', '=isbn', 'author__name']`
      ),
      section(
        "15. ordering_param",
        "Ordering param nomini o'zgartirish",
        "Frontendga moslash uchun",
        "Query param nomi boshqacha bo'lsa",
        "Ordering paramni moslash",
        "ordering_param",
        `ordering_param = 'sort'`
      ),
      section(
        "16. Custom filter backend",
        "Filter backendni subclass qilish",
        "Maxsus filter logikasi kerak bo'lsa",
        "Enterprise filteringda",
        "Backend filter",
        "BaseFilterBackend",
        `class OwnerFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)`
      ),
      section(
        "17. filter_queryset override",
        "Filter logikasini viewda override",
        "Extra query logika kerak bo'lsa",
        "Special conditions bo'lsa",
        "Custom filtering",
        "filter_queryset",
        `def filter_queryset(self, queryset):
    return queryset.filter(is_active=True)`
      ),
      section(
        "18. Related field filter",
        "Related field bo'yicha filter",
        "FK yoki M2M qidiruv kerak bo'lsa",
        "Author name bo'yicha",
        "Nested filter",
        "related filter",
        `filterset_fields = ['author__name', 'category__slug']`
      ),
      section(
        "19. distinct with search",
        "Search natijalarida duplicate yo'q qilish",
        "Join bo'lganda duplicate chiqmasligi uchun",
        "Search + M2M bo'lsa",
        "Distinct ishlatish",
        "distinct",
        `queryset = queryset.distinct()`
      ),
      section(
        "20. Ordering by annotation",
        "Annotate qilingan field bo'yicha sort",
        "Stats bo'yicha tartiblash uchun",
        "Report endpointlarda",
        "Annotate + ordering",
        "annotate order",
        `queryset = Book.objects.annotate(score=Count('reviews')).order_by('-score')`
      ),

    ],
  },
  44: {
    summary: "Pagination katta datani boshqaradi. DRFda PageNumber, LimitOffset va Cursor pagination ishlatishni o'rganasiz.",
    goals: [
      "Global pagination sozlash",
      "Custom pagination class yaratish",
      "CursorPagination bilan stabil paging",
    ],
    sections: [
      section(
        "01. DEFAULT_PAGINATION_CLASS",
        "Global pagination classni belgilaydi",
        "Har bir list endpointda pagination ishlashi uchun",
        "Project darajasida",
        "Paginationni yoqish",
        "DEFAULT_PAGINATION_CLASS",
        `REST_FRAMEWORK = {\n    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',\n    'PAGE_SIZE': 10\n}`
      ),
      section(
        "02. PageNumberPagination",
        "page=1 ko'rinishida pagination beradi",
        "Oddiy pagination kerak bo'lsa",
        "List endpointlarda",
        "Sahifa bo'yicha data",
        "PageNumberPagination",
        `class StandardPagination(PageNumberPagination):\n    page_size = 10`
      ),
      section(
        "03. page_size_query_param",
        "Client page_size ni berishi mumkin",
        "Flexible pagination uchun",
        "Admin yoki power user uchun",
        "Page size boshqarish",
        "page_size_query_param",
        `page_size_query_param = 'page_size'`
      ),
      section(
        "04. max_page_size",
        "Max page size cheklaydi",
        "Huge responseni oldini olish uchun",
        "Performance muhim bo'lsa",
        "Response hajmini cheklash",
        "max_page_size",
        `max_page_size = 100`
      ),
      section(
        "05. LimitOffsetPagination",
        "limit/offset pagination beradi",
        "Frontend infinite scroll uchun",
        "Offset-based paging kerak bo'lsa",
        "Limit va offset boshqarish",
        "LimitOffsetPagination",
        `class OffsetPagination(LimitOffsetPagination):\n    default_limit = 20`
      ),
      section(
        "06. CursorPagination",
        "Cursor pagination barqaror paging beradi",
        "Large dataset va real-time listlarda",
        "Offset slow bo'lsa",
        "Cursor bilan paging",
        "CursorPagination",
        `class CursorPaginationExample(CursorPagination):\n    ordering = '-created_at'`
      ),
      section(
        "07. pagination_class per view",
        "Viewga maxsus pagination berish",
        "Globaldan farq bo'lsa",
        "Specific endpointlar uchun",
        "Per-view pagination",
        "pagination_class",
        `pagination_class = StandardPagination`
      ),
      section(
        "08. Custom response format",
        "Pagination response formatini o'zgartirish",
        "Client talabiga moslash uchun",
        "Frontend contract kerak bo'lsa",
        "Response shape boshqarish",
        "get_paginated_response",
        `def get_paginated_response(self, data):\n    return Response({'items': data, 'count': self.page.paginator.count})`
      ),
      section(
        "09. Disable pagination",
        "Paginationni butunlay o'chirish mumkin",
        "Small listlar uchun",
        "Data oz bo'lsa",
        "Paginationni yoqmaslik",
        "pagination disable",
        `pagination_class = None`
      ),
      section(
        "10. Ordering for cursor",
        "Cursor pagination ordering talab qiladi",
        "Barqaror paging uchun",
        "CursorPagination ishlatilganda",
        "Deterministic ordering",
        "cursor ordering",
        `class CursorPaginationExample(CursorPagination):\n    ordering = '-id'`
      ),
      section(
        "11. Custom paginated response",
        "Paginated response formatini o'zgartirish",
        "Frontend contract uchun",
        "Custom fieldlar qo'shish kerak bo'lsa",
        "Response shape boshqarish",
        "get_paginated_response",
        `def get_paginated_response(self, data):
    return Response({'items': data, 'count': self.page.paginator.count})`
      ),
      section(
        "12. page_query_param",
        "page param nomini o'zgartirish",
        "Frontenddagi query formatga moslash uchun",
        "Pagination query param kerak bo'lsa",
        "Custom page param",
        "page_query_param",
        `page_query_param = 'p'`
      ),
      section(
        "13. LimitOffset max_limit",
        "LimitOffsetPagination uchun max_limit",
        "Huge response bo'lmasligi uchun",
        "LimitOffset ishlatilganda",
        "Max limit nazorati",
        "max_limit",
        `class OffsetPagination(LimitOffsetPagination):
    max_limit = 100`
      ),
      section(
        "14. Cursor query param",
        "Cursor param nomini o'zgartirish",
        "Clientga mos query param kerak bo'lsa",
        "CursorPagination ishlatilganda",
        "cursor param",
        "cursor_query_param",
        `cursor_query_param = 'cursor'`
      ),
      section(
        "15. Manual pagination",
        "APIViewda paginate_queryset ishlatish",
        "Custom viewlarda pagination kerak bo'lsa",
        "APIView ishlatilganda",
        "Manual pagination",
        "paginate_queryset",
        `page = self.paginate_queryset(queryset)
return self.get_paginated_response(serializer.data)`
      ),
      section(
        "16. Disable pagination per action",
        "Ba'zi actionlarda paginationni o'chirish",
        "Small list endpoint bo'lsa",
        "ViewSet actionlarida",
        "Selective pagination",
        "paginate_queryset override",
        `def paginate_queryset(self, queryset):
    if self.action == 'summary':
        return None
    return super().paginate_queryset(queryset)`
      ),
      section(
        "17. Pagination tests",
        "Pagination ishlashini test qilish",
        "count/next/previous to'g'ri ekanini tekshirish",
        "APITestCase ichida",
        "Pagination testi",
        "pagination test",
        `resp = client.get('/api/books/?page=2')
assert 'results' in resp.data`
      ),
      section(
        "18. Custom link names",
        "next/previous nomlarini moslash",
        "Frontend contractga mos bo'lsa",
        "Custom paginationda",
        "Response linklarini boshqarish",
        "custom links",
        `return Response({'next_page': self.get_next_link()})`
      ),
      section(
        "19. Dynamic page size",
        "Userga qarab page size",
        "Premium userlarga ko'proq data",
        "Business rule bo'lsa",
        "Dynamic page size",
        "get_page_size",
        `def get_page_size(self, request):
    return 50 if request.user.is_premium else 10`
      ),
      section(
        "20. Cursor ordering",
        "Cursor pagination uchun ordering majburiy",
        "Barqaror paging uchun",
        "CursorPagination ishlatilganda",
        "Orderingni belgilash",
        "cursor ordering",
        `class CursorPaginationExample(CursorPagination):
    ordering = '-created_at'`
      ),

    ],
  },
  45: {
    summary: "Parserlar inputni o'qiydi, rendererlar outputni formatlaydi. JSON, Form va Multipart bilan ishlashni o'rganasiz.",
    goals: [
      "JSONParser va MultiPartParser ishlatish",
      "Rendererlarni sozlash",
      "Content-Type bilan to'g'ri ishlash",
    ],
    sections: [
      section(
        "01. Parser vs Renderer",
        "Parser request bodyni o'qiydi, renderer response formatlaydi",
        "Input va output oqimini tushunish uchun",
        "Content-Type bilan ishlaganda",
        "Request/response formatni boshqarish",
        "parser/renderer",
        `parser_classes = [JSONParser]\nrenderer_classes = [JSONRenderer]`
      ),
      section(
        "02. JSONParser",
        "JSONParser JSON bodyni dictga aylantiradi",
        "Standard API input uchun",
        "Content-Type: application/json bo'lsa",
        "JSON inputni parse qilish",
        "JSONParser",
        `parser_classes = [JSONParser]`
      ),
      section(
        "03. FormParser",
        "FormParser form-encoded datani o'qiydi",
        "HTML form yoki simple data uchun",
        "application/x-www-form-urlencoded bo'lsa",
        "Form inputni parse qilish",
        "FormParser",
        `parser_classes = [FormParser]`
      ),
      section(
        "04. MultiPartParser",
        "MultiPartParser file uploadni o'qiydi",
        "Fayl yoki formdata yuborilganda",
        "multipart/form-data bo'lsa",
        "Fayl inputni parse qilish",
        "MultiPartParser",
        `parser_classes = [MultiPartParser]`
      ),
      section(
        "05. JSONRenderer",
        "JSONRenderer response JSON qiladi",
        "API default output uchun",
        "Client JSON kutganda",
        "Output formatni boshqarish",
        "JSONRenderer",
        `renderer_classes = [JSONRenderer]`
      ),
      section(
        "06. BrowsableAPIRenderer",
        "Browsable API HTML ko'rinish beradi",
        "Dev paytida tez test qilish uchun",
        "Django browsable API kerak bo'lsa",
        "Interactive API UI",
        "BrowsableAPIRenderer",
        `renderer_classes = [JSONRenderer, BrowsableAPIRenderer]`
      ),
      section(
        "07. Custom renderer",
        "Custom renderer maxsus format chiqaradi",
        "XML yoki custom format kerak bo'lsa",
        "Enterprise client talabida",
        "Outputni moslashtirish",
        "custom renderer",
        `class PlainTextRenderer(BaseRenderer):\n    media_type = 'text/plain'`
      ),
      section(
        "08. parser_classes per view",
        "Har bir viewga alohida parser berish",
        "Fayl upload faqat bitta endpointda",
        "Specific endpointlarda",
        "Input formatni cheklash",
        "parser_classes",
        `parser_classes = [MultiPartParser]`
      ),
      section(
        "09. renderer_classes per view",
        "Har viewga alohida renderer berish",
        "Response format farqli bo'lsa",
        "Specific endpointda",
        "Outputni moslash",
        "renderer_classes",
        `renderer_classes = [JSONRenderer]`
      ),
      section(
        "10. Content negotiation",
        "DRF Content-Type bo'yicha parser tanlaydi",
        "Client to'g'ri header yuborishi uchun",
        "Content negotiation bo'lsa",
        "Input/output formatni avtomatik tanlash",
        "content negotiation",
        `# DRF avtomatik parser/renderer tanlaydi`
      ),
      section(
        "11. FileUploadParser",
        "Raw file upload uchun parser",
        "Only file body yuborilganda",
        "Large file upload bo'lsa",
        "Streaming file input",
        "FileUploadParser",
        `parser_classes = [FileUploadParser]`
      ),
      section(
        "12. DEFAULT_PARSER_CLASSES",
        "Global parserlar ro'yxati",
        "Har bir endpointda bir xil parser bo'lishi uchun",
        "Project settingsda",
        "Parserlarni markazlashtirish",
        "DEFAULT_PARSER_CLASSES",
        `REST_FRAMEWORK = {
  'DEFAULT_PARSER_CLASSES': ['rest_framework.parsers.JSONParser']
}`
      ),
      section(
        "13. parser_context",
        "Parser context request ma'lumotini beradi",
        "Custom parser yozilganda",
        "BaseParser subclassida",
        "Contextdan foydalanish",
        "parser_context",
        `def parse(self, stream, media_type=None, parser_context=None):
    request = parser_context['request']`
      ),
      section(
        "14. JSONRenderer indent",
        "JSON outputni chiroyli formatlash",
        "Debug yoki log uchun",
        "JSONRenderer ishlatilganda",
        "Indented JSON",
        "JSONRenderer",
        `class PrettyJSONRenderer(JSONRenderer):
    indent = 2`
      ),
      section(
        "15. Disable browsable API",
        "Prod muhitda browsable API o'chirish",
        "Security va performance uchun",
        "Production settingsda",
        "Rendererni cheklash",
        "DEFAULT_RENDERER_CLASSES",
        `REST_FRAMEWORK = {
  'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer']
}`
      ),
      section(
        "16. Custom parser",
        "Custom media type uchun parser",
        "XML yoki boshqa format kerak bo'lsa",
        "Custom formatlar uchun",
        "Parser yozish",
        "custom parser",
        `class TextParser(BaseParser):
    media_type = 'text/plain'
    def parse(self, stream, media_type=None, parser_context=None):
        return {'text': stream.read().decode()}`
      ),
      section(
        "17. Custom renderer",
        "CSV yoki text output chiqarish",
        "Report endpointlarda",
        "Non-JSON output kerak bo'lsa",
        "Renderer yozish",
        "custom renderer",
        `class CSVRenderer(BaseRenderer):
    media_type = 'text/csv'
    format = 'csv'`
      ),
      section(
        "18. Accept header",
        "Accept header renderer tanlaydi",
        "Client output formatni tanlashi uchun",
        "Content negotiationda",
        "Renderer selection",
        "Accept header",
        `Accept: application/json`
      ),
      section(
        "19. Parser combo",
        "Bir viewda bir nechta parser",
        "JSON va multipart birga bo'lsa",
        "Mixed input endpointlarda",
        "Multiple parsers",
        "parser combo",
        `parser_classes = [JSONParser, MultiPartParser, FormParser]`
      ),
      section(
        "20. APIClient format",
        "Testda format param bilan parser tanlash",
        "JSON yoki multipart test qilish uchun",
        "APITestCase ichida",
        "format usage",
        "APIClient format",
        `client.post('/api/books/', data, format='json')`
      ),

    ],
  },
  46: {
    summary: "File upload real loyihalarda muhim. DRFda multipart, FileField/ImageField va validation bilan upload endpoint yozasiz.",
    goals: [
      "Multipart upload qabul qilish",
      "FileField/ImageField bilan ishlash",
      "Fayl size/type validation qilish",
    ],
    sections: [
      section(
        "01. FileField modelda",
        "FileField fayl saqlash uchun model field",
        "Media fayllarni saqlash uchun",
        "User avatar yoki dokumentlarda",
        "Fayl pathni boshqarish",
        "FileField",
        `file = models.FileField(upload_to='uploads/')`
      ),
      section(
        "02. ImageField modelda",
        "ImageField rasm uchun maxsus field",
        "Rasm upload bo'lsa",
        "Avatar yoki cover image uchun",
        "Image validation",
        "ImageField",
        `image = models.ImageField(upload_to='images/')`
      ),
      section(
        "03. MEDIA_URL va MEDIA_ROOT",
        "MEDIA_URL va MEDIA_ROOT fayl storage yo'lini belgilaydi",
        "Faylni serve qilish uchun",
        "Local devda",
        "Media konfiguratsiyasi",
        "MEDIA settings",
        `MEDIA_URL = '/media/'\nMEDIA_ROOT = BASE_DIR / 'media'`
      ),
      section(
        "04. MultiPartParser",
        "Multipart parser fayl uploadni o'qiydi",
        "File upload endpointda",
        "multipart/form-data bo'lsa",
        "Fayl inputni parse qilish",
        "MultiPartParser",
        `parser_classes = [MultiPartParser]`
      ),
      section(
        "05. Serializerda FileField",
        "Serializer fayl fieldini qabul qiladi",
        "API inputni validate qilish uchun",
        "Upload endpointda",
        "File validation",
        "Serializer FileField",
        `file = serializers.FileField()`
      ),
      section(
        "06. Size validation",
        "Fayl hajmini tekshirish",
        "Katta faylni bloklash uchun",
        "Upload policy bo'lsa",
        "File size nazorat",
        "size validation",
        `def validate_file(self, value):\n    if value.size > 5 * 1024 * 1024:\n        raise ValidationError('max 5MB')\n    return value`
      ),
      section(
        "07. Type validation",
        "Fayl turini tekshirish",
        "Xavfsizlik uchun",
        "Faqat rasm yoki pdf kerak bo'lsa",
        "Content type nazorat",
        "type validation",
        `if value.content_type not in ['image/png', 'image/jpeg']:\n    raise ValidationError('only images')`
      ),
      section(
        "08. Upload view",
        "Upload endpoint yaratish",
        "Client fayl yuborishi uchun",
        "POST upload endpointda",
        "Faylni saqlash",
        "upload view",
        `class UploadView(CreateAPIView):\n    serializer_class = UploadSerializer\n    parser_classes = [MultiPartParser]`
      ),
      section(
        "09. Response file URL",
        "Response'da file URL qaytarish",
        "Client filega kira olishi uchun",
        "Uploaddan keyin",
        "File linkni chiqarish",
        "file url",
        `return Response({'url': obj.file.url})`
      ),
      section(
        "10. Cleanup old files",
        "Old filelarni tozalash",
        "Storage to'lib ketmasligi uchun",
        "File update bo'lsa",
        "File lifecycle boshqarish",
        "file cleanup",
        `# signal orqali eski faylni o'chirish`
      ),
      section(
        "11. upload_to callable",
        "Dynamic upload path",
        "Faylni user yoki modelga qarab joylash uchun",
        "Upload pathni boshqarish",
        "Pathni moslashtirish",
        "upload_to",
        `def user_path(instance, filename):
    return f'users/{instance.user_id}/{filename}'`
      ),
      section(
        "12. FileExtensionValidator",
        "Fayl extensionni tekshiradi",
        "Faqat ruxsat berilgan formatlarda",
        "Upload validationda",
        "Extension nazorat",
        "FileExtensionValidator",
        `file = models.FileField(validators=[FileExtensionValidator(['pdf', 'jpg'])])`
      ),
      section(
        "13. Storage backend",
        "S3 yoki boshqa storage ishlatish",
        "Productionda media fayllar uchun",
        "Cloud storage kerak bo'lsa",
        "Storage config",
        "DEFAULT_FILE_STORAGE",
        `DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'`
      ),
      section(
        "14. SimpleUploadedFile",
        "Testda file upload qilish",
        "APITestCase uchun",
        "File upload testlarda",
        "Test file object",
        "SimpleUploadedFile",
        `file = SimpleUploadedFile('a.txt', b'hello')
client.post('/api/upload/', {'file': file})`
      ),
      section(
        "15. Thumbnail generation",
        "Uploaddan keyin thumbnail yaratish",
        "Image preview uchun",
        "Image upload bo'lsa",
        "Image processing",
        "thumbnail",
        `from PIL import Image
image = Image.open(file)`
      ),
      section(
        "16. FileUploadParser usage",
        "Raw file uploadni qabul qilish",
        "Large file bo'lsa",
        "Streaming uploadda",
        "File-only endpoint",
        "FileUploadParser",
        `parser_classes = [FileUploadParser]`
      ),
      section(
        "17. Delete file on model delete",
        "Model o'chsa fayl ham o'chirish",
        "Storage to'lib ketmasligi uchun",
        "Cleanup kerak bo'lsa",
        "Signal bilan tozalash",
        "post_delete",
        `@receiver(post_delete, sender=Document)
def cleanup(sender, instance, **kwargs):
    instance.file.delete(save=False)`
      ),
      section(
        "18. Limit file count",
        "User uchun file limit",
        "Quota bo'lsa",
        "Business rule bo'lsa",
        "File count nazorat",
        "file limit",
        `if Document.objects.filter(user=user).count() >= 5:
    raise ValidationError('limit')`
      ),
      section(
        "19. File metadata",
        "File name va size olish",
        "Upload validation uchun",
        "File objectdan",
        "Metadata tekshirish",
        "file metadata",
        `name = value.name
size = value.size`
      ),
      section(
        "20. File URL in serializer",
        "File URLni serializerda chiqarish",
        "Clientga download link berish",
        "Response formatda",
        "File URLni ko'rsatish",
        "file url",
        `def get_file_url(self, obj):
    return obj.file.url`
      ),

    ],
  },
  47: {
    summary: "Error handling API sifatini belgilaydi. DRF exception handler va custom APIException bilan yagona error formatni yaratasiz.",
    goals: [
      "APIException va ValidationError farqini bilish",
      "Custom exception handler yozish",
      "Error response formatini standartlash",
    ],
    sections: [
      section(
        "01. APIException",
        "APIException DRF standart xato classi",
        "Custom error yaratish uchun",
        "Business errorlarda",
        "Xato response formatini saqlash",
        "APIException",
        `class OrderClosed(APIException):\n    status_code = 400\n    default_detail = 'Order closed'`
      ),
      section(
        "02. ValidationError",
        "ValidationError input xatolar uchun",
        "Field errorlarni ko'rsatish uchun",
        "Serializer validation paytida",
        "Field-level errorlarni qaytarish",
        "ValidationError",
        `raise serializers.ValidationError({'price': 'invalid'})`
      ),
      section(
        "03. PermissionDenied",
        "PermissionDenied 403 qaytaradi",
        "Ruxsat yo'q bo'lsa",
        "Custom checklarda",
        "Accessni bloklash",
        "PermissionDenied",
        `raise PermissionDenied('forbidden')`
      ),
      section(
        "04. NotFound",
        "NotFound 404 qaytaradi",
        "Obyekt topilmasa",
        "Detail endpointlarda",
        "Topilmagan resursga javob",
        "NotFound",
        `raise NotFound('not found')`
      ),
      section(
        "05. Custom exception handler",
        "Global error formatni boshqaradi",
        "Barcha xatoni bir formatda chiqarish uchun",
        "Project darajasida",
        "Error responseni standartlash",
        "exception handler",
        `def custom_exception_handler(exc, context):\n    response = exception_handler(exc, context)\n    if response is not None:\n        response.data = {'error': response.data}\n    return response`
      ),
      section(
        "06. settings EXCEPTION_HANDLER",
        "Custom handlerni settingsga yozish",
        "Global ishlashi uchun",
        "Project configda",
        "Error handlerni ulash",
        "EXCEPTION_HANDLER",
        `REST_FRAMEWORK = {\n    'EXCEPTION_HANDLER': 'core.exceptions.custom_exception_handler'\n}`
      ),
      section(
        "07. Error codes",
        "Error code berish client uchun foydali",
        "Frontend error mapping uchun",
        "Custom exceptionsda",
        "Error identifikator berish",
        "error code",
        `class PaymentError(APIException):\n    default_code = 'payment_failed'`
      ),
      section(
        "08. Non-field errors",
        "non_field_errors umumiy error uchun",
        "Fieldga bog'liq bo'lmagan xato bo'lsa",
        "Object-level validationda",
        "General error qaytarish",
        "non_field_errors",
        `raise serializers.ValidationError({'non_field_errors': ['invalid data']})`
      ),
      section(
        "09. 500 error handling",
        "Unhandled errorlar 500 beradi",
        "Monitoringga yuborish uchun",
        "Unexpected errorlarda",
        "Server errorni loglash",
        "500 handling",
        `# Sentry yoki logging orqali 500 errorlarni kuzatish`
      ),
      section(
        "10. Error format contract",
        "Error response formatini hujjatlashtirish",
        "Clientlar to'g'ri ishlashi uchun",
        "API docsda",
        "Error contract saqlash",
        "error contract",
        `# docsda error response sxemasini ko'rsating`
      ),
      section(
        "11. NotAuthenticated vs AuthenticationFailed",
        "NotAuthenticated auth yo'q bo'lsa, AuthenticationFailed noto'g'ri bo'lsa",
        "Clientga to'g'ri signal berish uchun",
        "Auth errorlarda",
        "Auth error farqi",
        "auth errors",
        `raise NotAuthenticated('login required')`
      ),
      section(
        "12. Throttled exception",
        "Throttled 429 va wait qaytaradi",
        "Rate limit oshganda",
        "Throttling ishlatilganda",
        "Throttle error format",
        "Throttled",
        `raise Throttled(wait=30)`
      ),
      section(
        "13. ParseError",
        "ParseError 400 qaytaradi",
        "JSON noto'g'ri bo'lsa",
        "Request body buzilganida",
        "Parsing error",
        "ParseError",
        `raise ParseError('invalid json')`
      ),
      section(
        "14. MethodNotAllowed",
        "Noto'g'ri HTTP method ishlatilsa",
        "GET/POST cheklangan endpointda",
        "Method check bo'lsa",
        "405 qaytarish",
        "MethodNotAllowed",
        `raise MethodNotAllowed('PUT')`
      ),
      section(
        "15. default_code",
        "APIException uchun error code",
        "Client error mapping uchun",
        "Custom exceptionsda",
        "Error kod berish",
        "default_code",
        `class PaymentError(APIException):
    default_code = 'payment_failed'`
      ),
      section(
        "16. Error wrapper",
        "Global error formatni o'rash",
        "Frontendga bir xil format berish uchun",
        "Exception handlerda",
        "Error wrapper",
        "error wrapper",
        `response.data = {'error': response.data}`
      ),
      section(
        "17. Logging exceptions",
        "Xatolarni logga yozish",
        "Monitoring uchun",
        "Unhandled errorlarda",
        "Error logging",
        "logging",
        `logger.exception('API error', exc_info=exc)`
      ),
      section(
        "18. raise_exception=True",
        "Validation errorni avtomatik qaytarish",
        "Boilerplate kodni kamaytirish uchun",
        "Serializer validationda",
        "Auto error response",
        "raise_exception",
        `serializer.is_valid(raise_exception=True)`
      ),
      section(
        "19. Http404 vs NotFound",
        "Http404 Django, NotFound DRF",
        "DRF formatini saqlash uchun",
        "Detail endpointlarda",
        "404 boshqarish",
        "NotFound",
        `raise NotFound('not found')`
      ),
      section(
        "20. Error format tests",
        "Error responseni test qilish",
        "Contract buzilmasligi uchun",
        "APITestCase ichida",
        "Error response test",
        "error test",
        `resp = client.get('/api/private/')
assert 'error' in resp.data`
      ),

    ],
  },
  48: {
    summary: "Testing API sifatini kafolatlaydi. APITestCase va APIClient bilan CRUD va auth testlar yozasiz.",
    goals: [
      "APITestCase bilan endpoint testlash",
      "APIClient orqali request yuborish",
      "Auth va permission test yozish",
    ],
    sections: [
      section(
        "01. APITestCase",
        "APITestCase DRF test uchun baza",
        "API testlarni yozish uchun",
        "Unit/integration testlarda",
        "Test environment yaratish",
        "APITestCase",
        `class BookApiTests(APITestCase):\n    def test_list(self):\n        resp = self.client.get('/api/books/')\n        self.assertEqual(resp.status_code, 200)`
      ),
      section(
        "02. APIClient",
        "APIClient HTTP request yuboradi",
        "Endpointlarni test qilish uchun",
        "Testlarda",
        "Requestlarni simulyatsiya qilish",
        "APIClient",
        `client = APIClient()\nresp = client.post('/api/books/', data={'title': 'Django'})`
      ),
      section(
        "03. force_authenticate",
        "Testda userni auth qilish",
        "Token yaratmasdan auth test uchun",
        "Protected endpointlarda",
        "Auth bypass",
        "force_authenticate",
        `self.client.force_authenticate(user=user)`
      ),
      section(
        "04. status code assertion",
        "Status code test qilish",
        "Endpoint to'g'ri ishlayotganini tekshirish uchun",
        "Har bir testda",
        "Success/error holatni tekshirish",
        "assert status",
        `self.assertEqual(resp.status_code, status.HTTP_201_CREATED)`
      ),
      section(
        "05. response data assertion",
        "Response data ni tekshirish",
        "Contract buzilmasligi uchun",
        "Serializer outputda",
        "Response strukturasini tekshirish",
        "assert data",
        `self.assertIn('id', resp.data)`
      ),
      section(
        "06. create test",
        "POST create endpoint testlash",
        "Create flowni tekshirish uchun",
        "CRUD testlarda",
        "Create ishlashini tasdiqlash",
        "create test",
        `resp = self.client.post('/api/books/', {'title': 'DRF'})`
      ),
      section(
        "07. update test",
        "PUT/PATCH update testlash",
        "Update flowni tekshirish uchun",
        "CRUD testlarda",
        "Update ishlashini tasdiqlash",
        "update test",
        `resp = self.client.patch('/api/books/1/', {'title': 'New'})`
      ),
      section(
        "08. delete test",
        "DELETE endpoint testlash",
        "Delete flowni tekshirish uchun",
        "CRUD testlarda",
        "Delete ishlashini tasdiqlash",
        "delete test",
        `resp = self.client.delete('/api/books/1/')`
      ),
      section(
        "09. permission test",
        "Permissionni testlash",
        "403/401 to'g'ri qaytishini tekshirish",
        "Security testlarda",
        "Access nazorat qilish",
        "permission test",
        `self.client.force_authenticate(user=other)\nresp = self.client.get('/api/books/1/')\nself.assertEqual(resp.status_code, 403)`
      ),
      section(
        "10. factory data",
        "Test data yaratish",
        "Model objectlar tez yaratilishi uchun",
        "Katta testlarda",
        "Test fixture boshqarish",
        "factory",
        `book = BookFactory(title='Test')`
      ),
      section(
        "11. APIRequestFactory",
        "Viewni to'g'ridan test qilish",
        "APIView yoki ViewSet testlarda",
        "Unit testlarda",
        "Factory request",
        "APIRequestFactory",
        `factory = APIRequestFactory()
request = factory.get('/api/books/')`
      ),
      section(
        "12. reverse()",
        "URL name bilan endpoint topish",
        "Hardcode URL yozmaslik uchun",
        "Testlarda",
        "URLni dinamik olish",
        "reverse",
        `url = reverse('book-list')`
      ),
      section(
        "13. client.credentials",
        "Headerlarni o'rnatish",
        "JWT yoki Token testlarda",
        "Auth testlarda",
        "Auth header berish",
        "credentials",
        `client.credentials(HTTP_AUTHORIZATION='Bearer token')`
      ),
      section(
        "14. setUpTestData",
        "Class level test data",
        "Tezroq testlar uchun",
        "Katta testlarda",
        "Shared test data",
        "setUpTestData",
        `@classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(...)`
      ),
      section(
        "15. assertNumQueries",
        "Query sonini tekshirish",
        "N+1 aniqlash uchun",
        "Performance testlarda",
        "Query count test",
        "assertNumQueries",
        `with self.assertNumQueries(2):
    client.get('/api/books/')`
      ),
      section(
        "16. SimpleUploadedFile test",
        "File upload test qilish",
        "Upload endpointlarda",
        "APITestCase ichida",
        "File test",
        "SimpleUploadedFile",
        `file = SimpleUploadedFile('a.txt', b'1')`
      ),
      section(
        "17. PATCH vs PUT",
        "PATCH partial update, PUT full update",
        "Update testlarda",
        "REST semantics",
        "Update test farqi",
        "patch/put",
        `client.patch(url, {'title': 'New'})`
      ),
      section(
        "18. Pagination response test",
        "Pagination response structurasini tekshirish",
        "count/next/previous bo'lishi kerak",
        "List endpointlarda",
        "Pagination test",
        "pagination test",
        `resp = client.get('/api/books/')
assert 'results' in resp.data`
      ),
      section(
        "19. Mock external services",
        "External API chaqiruvini mock qilish",
        "Testda real service chaqirmaslik uchun",
        "Service layer testlarda",
        "Mocking",
        "mock",
        `with patch('services.payments.charge') as mock_charge: ...`
      ),
      section(
        "20. format='json'",
        "APIClient format parami",
        "Parser tanlash uchun",
        "Testlarda",
        "Content-Type boshqarish",
        "format",
        `client.post(url, data, format='json')`
      ),

    ],
  },
  49: {
    summary: "API dokumentatsiya integratsiyani tezlashtiradi. drf-spectacular bilan OpenAPI schema va Swagger/Redoc chiqarasiz.",
    goals: [
      "OpenAPI schema generatsiya qilish",
      "Swagger/Redoc UI chiqarish",
      "Schema annotation ishlatish",
    ],
    sections: [
      section(
        "01. drf-spectacular o'rnatish",
        "drf-spectacular OpenAPI generator",
        "Automatic docs uchun",
        "Docs chiqarishni xohlasangiz",
        "Schema generatorni ulash",
        "install spectacular",
        `pip install drf-spectacular`
      ),
      section(
        "02. INSTALLED_APPS",
        "drf-spectacular appni qo'shish",
        "Generator ishlashi uchun",
        "Project settingsda",
        "Schema backendni yoqish",
        "installed apps",
        `INSTALLED_APPS += ['drf_spectacular']`
      ),
      section(
        "03. DEFAULT_SCHEMA_CLASS",
        "DRF schema classni belgilash",
        "OpenAPI schema generatsiya uchun",
        "REST_FRAMEWORK configda",
        "Schema classni ulash",
        "DEFAULT_SCHEMA_CLASS",
        `REST_FRAMEWORK = {\n  'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema'\n}`
      ),
      section(
        "04. Schema endpoint",
        "Schema JSON endpointini qo'shish",
        "Swagger/Redoc uchun kerak",
        "URL configda",
        "Schema JSON chiqarish",
        "schema endpoint",
        `urlpatterns += [path('api/schema/', SpectacularAPIView.as_view())]`
      ),
      section(
        "05. Swagger UI",
        "Swagger UI docs sahifasi",
        "Frontend uchun interactive docs",
        "Docs ko'rish kerak bo'lsa",
        "UI orqali test qilish",
        "swagger ui",
        `urlpatterns += [path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'))]`
      ),
      section(
        "06. Redoc UI",
        "Redoc UI docs sahifasi",
        "Readable docs kerak bo'lsa",
        "Docs ko'rsatish uchun",
        "Alternativ UI",
        "redoc",
        `urlpatterns += [path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'))]`
      ),
      section(
        "07. extend_schema",
        "extend_schema endpointni hujjatlashtiradi",
        "Custom response yoki request bo'lsa",
        "Docsni boyitish uchun",
        "Schema annotation",
        "extend_schema",
        `@extend_schema(responses={200: BookSerializer})\nclass BookList(ListAPIView):\n    ...`
      ),
      section(
        "08. tags va summary",
        "Endpointlar tag va summaryga ega bo'ladi",
        "Docsda tartib uchun",
        "API katta bo'lsa",
        "Docs navigatsiya",
        "tags",
        `@extend_schema(tags=['Books'], summary='List books')`
      ),
      section(
        "09. examples",
        "Example response ko'rsatish",
        "Frontend tez tushunishi uchun",
        "Docsda",
        "Example bilan ishlash",
        "examples",
        `@extend_schema(examples=[OpenApiExample('Sample', value={'id': 1})])`
      ),
      section(
        "10. Schema validation",
        "Schema to'g'riligini tekshirish",
        "Docs ishonchli bo'lishi uchun",
        "CI yoki local checkda",
        "Schema quality nazorati",
        "schema validate",
        `# schema endpointni CI da tekshirish tavsiya etiladi`
      ),
      section(
        "11. extend_schema request",
        "Request body schema belgilash",
        "Docsda input ko'rsatish uchun",
        "Custom viewlarda",
        "Request schema",
        "extend_schema",
        `@extend_schema(request=BookSerializer)`
      ),
      section(
        "12. OpenApiParameter",
        "Query paramni docsga qo'shish",
        "Clientga aniq param ko'rsatish uchun",
        "Search/filter endpointlarda",
        "Param docs",
        "OpenApiParameter",
        `@extend_schema(parameters=[OpenApiParameter('q', str)])`
      ),
      section(
        "13. extend_schema_view",
        "ViewSet methodlari uchun docs",
        "List/detail alohida docs kerak bo'lsa",
        "ViewSetlarda",
        "Method docs",
        "extend_schema_view",
        `@extend_schema_view(list=extend_schema(summary='List'))`
      ),
      section(
        "14. exclude endpoint",
        "Docsdan endpointni yashirish",
        "Internal endpoint bo'lsa",
        "Docsda ko'rinmasin",
        "Schema exclude",
        "exclude",
        `@extend_schema(exclude=True)`
      ),
      section(
        "15. Error schema",
        "Error response schema belgilash",
        "Client error formatini ko'rsatish uchun",
        "Docsda",
        "Error docs",
        "error schema",
        `@extend_schema(responses={400: ErrorSerializer})`
      ),
      section(
        "16. Security schemes",
        "Auth scheme docsga qo'shish",
        "Bearer tokenni ko'rsatish uchun",
        "JWT ishlatilsa",
        "Security docs",
        "SPECTACULAR_SETTINGS",
        `SPECTACULAR_SETTINGS = {
  'SECURITY': [{'bearerAuth': []}]
}`
      ),
      section(
        "17. Tags and summary",
        "Endpointlarni tag va summary bilan ajratish",
        "Docs navigatsiya uchun",
        "Katta APIlarda",
        "Docs tartibi",
        "tags",
        `@extend_schema(tags=['Orders'], summary='Create order')`
      ),
      section(
        "18. Error examples",
        "Error response example berish",
        "Client tushunishi uchun",
        "Docsda",
        "Error example",
        "OpenApiExample",
        `OpenApiExample('Bad Request', value={'error': 'invalid'})`
      ),
      section(
        "19. Versioned schema",
        "Har versiya uchun schema",
        "v1/v2 docs ajratish uchun",
        "Versioning ishlatilsa",
        "Versioned docs",
        "version schema",
        `# versionga qarab schema endpointlar ajratiladi`
      ),
      section(
        "20. Postprocessing hooks",
        "Schema postprocessing bilan o'zgartirish",
        "Custom schema format uchun",
        "Complex docs bo'lsa",
        "Schema hook",
        "POSTPROCESSING_HOOKS",
        `SPECTACULAR_SETTINGS = {
  'POSTPROCESSING_HOOKS': ['utils.schema_hook']
}`
      ),

    ],
  },
  50: {
    summary: "Versioning eski clientlarni buzmasdan API yangilash imkonini beradi. URL va header versioning usullarini qo'llaysiz.",
    goals: [
      "URL va header versioning farqini tushunish",
      "DEFAULT_VERSIONING_CLASS sozlash",
      "v1/v2 serializerlarni boshqarish",
    ],
    sections: [
      section(
        "01. Versioning nima",
        "API versiyalarini boshqarish strategiyasi",
        "Backward compatibility uchun",
        "API yangilanganda",
        "Eski clientlarni himoya qilish",
        "versioning",
        `# v1 va v2 parallel ishlaydi`
      ),
      section(
        "02. URLPathVersioning",
        "URL ichida v1/v2 ko'rsatadi",
        "Oddiy va ko'rinadigan versiya",
        "Public APIlarda",
        "URL orqali versiya tanlash",
        "URLPathVersioning",
        `REST_FRAMEWORK = {\n  'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning'\n}`
      ),
      section(
        "03. Versioned URL patterns",
        "URLga version qo'shish",
        "Client v1/v2ga kira olishi uchun",
        "Router yoki pathda",
        "URL versioning",
        "versioned urls",
        `path('api/v1/', include('api.urls'))`
      ),
      section(
        "04. HeaderVersioning",
        "Header orqali version tanlash",
        "URLni toza saqlash uchun",
        "Internal APIlarda",
        "Header-based version",
        "HeaderVersioning",
        `REST_FRAMEWORK = {\n  'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.HeaderVersioning'\n}`
      ),
      section(
        "05. AcceptHeaderVersioning",
        "Accept headerda version ishlatish",
        "RESTful approach uchun",
        "Media type orqali version",
        "Content negotiation bilan",
        "AcceptHeaderVersioning",
        `DEFAULT_VERSIONING_CLASS = 'rest_framework.versioning.AcceptHeaderVersioning'`
      ),
      section(
        "06. versioning in view",
        "request.version orqali versionni olish",
        "Logicni versionga moslash uchun",
        "View ichida",
        "Versionga qarab response",
        "request.version",
        `if request.version == 'v2':\n    ...`
      ),
      section(
        "07. Serializer per version",
        "Versionga qarab serializer tanlash",
        "Response format farqli bo'lsa",
        "v1/v2 fieldlar boshqacha bo'lsa",
        "Serializer switch",
        "serializer per version",
        `def get_serializer_class(self):\n    return BookV2Serializer if self.request.version == 'v2' else BookSerializer`
      ),
      section(
        "08. Deprecation strategy",
        "Eski versiyani deprecate qilish",
        "Clientlarga vaqt berish uchun",
        "Versionlar ko'payganda",
        "Migration plan",
        "deprecation",
        `# response headerda Deprecation: true berish mumkin`
      ),
      section(
        "09. Versioned docs",
        "Docsda versiyalarni ajratish",
        "Clientlar to'g'ri versiyani ko'rishi uchun",
        "Swagger/Redocda",
        "Docs clarity",
        "versioned docs",
        `# v1 va v2 uchun alohida schema chiqarish mumkin`
      ),
      section(
        "10. Default version",
        "Default version berilmasa fallback ishlaydi",
        "Client version yubormasa",
        "DEFAULT_VERSION sozlamasida",
        "Version fallback",
        "DEFAULT_VERSION",
        `REST_FRAMEWORK = {\n  'DEFAULT_VERSION': 'v1'\n}`
      ),
      section(
        "11. NamespaceVersioning",
        "URL namespace bo'yicha versiya",
        "Katta routing bo'lsa",
        "Namespace bilan versioning",
        "Namespace versioning",
        "NamespaceVersioning",
        `DEFAULT_VERSIONING_CLASS = 'rest_framework.versioning.NamespaceVersioning'`
      ),
      section(
        "12. QueryParameterVersioning",
        "Query param bilan versiya",
        "?version=v1 format",
        "Legacy clientlar bo'lsa",
        "Query versioning",
        "QueryParameterVersioning",
        `DEFAULT_VERSIONING_CLASS = 'rest_framework.versioning.QueryParameterVersioning'`
      ),
      section(
        "13. VERSION_PARAM",
        "Query param nomini belgilash",
        "Clientga moslashtirish uchun",
        "Query versioningda",
        "Param nomi",
        "VERSION_PARAM",
        `VERSION_PARAM = 'v'`
      ),
      section(
        "14. ALLOWED_VERSIONS",
        "Ruxsat berilgan versiyalar ro'yxati",
        "Noto'g'ri versiyani bloklash uchun",
        "Productionda",
        "Allowed versions",
        "ALLOWED_VERSIONS",
        `ALLOWED_VERSIONS = ['v1', 'v2']`
      ),
      section(
        "15. DEFAULT_VERSION",
        "Version berilmasa fallback",
        "Backward compatibility uchun",
        "Client versiya yubormasa",
        "Default version",
        "DEFAULT_VERSION",
        `DEFAULT_VERSION = 'v1'`
      ),
      section(
        "16. Version in reverse",
        "reverse() bilan versionli URL",
        "Dynamic URL build uchun",
        "Multiple versionlarda",
        "Versioned reverse",
        "reverse",
        `reverse('book-list', kwargs={'version': 'v2'})`
      ),
      section(
        "17. Versioned serializer",
        "Serializer versiyaga qarab tanlash",
        "Response format o'zgarsa",
        "v1/v2 bo'lsa",
        "Serializer switch",
        "serializer switch",
        `def get_serializer_class(self):
    return BookV2Serializer if self.request.version == 'v2' else BookSerializer`
      ),
      section(
        "18. Versioned permissions",
        "Versiyaga qarab permission",
        "v2 faqat premium bo'lsa",
        "Access policy farq qilsa",
        "Permission switch",
        "permission switch",
        `if request.version == 'v2':
    permission_classes = [IsAdminUser]`
      ),
      section(
        "19. Versioning docs",
        "Docsda versiyalarni ajratish",
        "Clientlar adashmasligi uchun",
        "OpenAPI docsda",
        "Docs versioning",
        "docs versioning",
        `# v1/v2 schema endpoints`      ),
      section(
        "20. Versioning tests",
        "Har versiya uchun test",
        "Contract buzilmasligi uchun",
        "APITestCase ichida",
        "Version test",
        "version test",
        `resp = client.get('/api/v2/books/')
assert resp.status_code == 200`
      ),

    ],
  },
  51: {
    summary: "Caching API tezligini oshiradi. cache_page, low-level cache va conditional GET bilan performance yuksaltirasiz.",
    goals: [
      "cache_page bilan response cache qilish",
      "Low-level cache ishlatish",
      "Conditional GET bilan bandwidth tejash",
    ],
    sections: [
      section(
        "01. Cache backend",
        "Cache backend DRF caching uchun kerak",
        "Redis yoki memcached ishlatish uchun",
        "Productionda",
        "Cache storage sozlash",
        "cache backend",
        `CACHES = {'default': {'BACKEND': 'django_redis.cache.RedisCache'}}`
      ),
      section(
        "02. cache_page decorator",
        "cache_page response'ni cache qiladi",
        "List endpointni tezlashtirish uchun",
        "Read-heavy endpointlarda",
        "Response caching",
        "cache_page",
        `@method_decorator(cache_page(60), name='dispatch')\nclass BookList(ListAPIView):\n    ...`
      ),
      section(
        "03. Low-level cache",
        "Low-level cache bilan custom key saqlash",
        "Custom caching strategiya uchun",
        "Expensive querylarda",
        "Manual cache control",
        "low-level cache",
        `data = cache.get('stats') or compute_stats()`
      ),
      section(
        "04. Cache invalidation",
        "Data o'zgarsa cache yangilanishi kerak",
        "Stale data bo'lmasligi uchun",
        "Create/update/delete paytida",
        "Cache tozalash",
        "cache delete",
        `cache.delete('stats')`
      ),
      section(
        "05. Per-user cache",
        "Userga bog'liq cache key",
        "Personalized response uchun",
        "Profile endpointlarda",
        "User-level cache",
        "per-user cache",
        `key = f'profile:{request.user.id}'`
      ),
      section(
        "06. Conditional GET",
        "ETag/Last-Modified bilan cache",
        "Bandwidth tejash uchun",
        "Client cache ishlatsa",
        "304 Not Modified qaytarish",
        "conditional GET",
        `@condition(etag_func=etag_func)\ndef list(self, request):\n    ...`
      ),
      section(
        "07. Cache headers",
        "Response headerda cache ko'rsatish",
        "CDN yoki browser cache uchun",
        "Public APIlarda",
        "Cache control",
        "Cache-Control",
        `return Response(data, headers={'Cache-Control': 'max-age=60'})`
      ),
      section(
        "08. Queryset optimization",
        "select_related/prefetch_related bilan tezlik",
        "Cache bilan birga ishlatish uchun",
        "N+1 bo'lsa",
        "Query optimizatsiya",
        "queryset optimize",
        `queryset = Book.objects.select_related('author')`
      ),
      section(
        "09. Throttle + cache",
        "Throttle va cache birga ishlaydi",
        "Traffic control uchun",
        "Public APIlarda",
        "Protection + speed",
        "throttle + cache",
        `throttle_classes = [AnonRateThrottle]`
      ),
      section(
        "10. Monitoring cache",
        "Cache hit/missni kuzatish",
        "Performance tuning uchun",
        "Productionda",
        "Cache metrics",
        "cache metrics",
        `# Redis metrics yoki logging bilan hit/miss monitoring`
      ),
      section(
        "11. cache_page on viewset",
        "ViewSet actioniga cache_page",
        "List endpoint tezlashishi uchun",
        "ViewSetlarda",
        "Decorator bilan cache",
        "cache_page",
        `@method_decorator(cache_page(60), name='list')
class BookViewSet(ModelViewSet):
    ...`
      ),
      section(
        "12. vary_on_headers",
        "Headerga qarab cache",
        "Language yoki auth header bo'lsa",
        "Multi-variant response",
        "Vary header",
        "vary_on_headers",
        `@vary_on_headers('Accept-Language')`
      ),
      section(
        "13. cache key prefix",
        "Cache key prefix berish",
        "Environmentlarni ajratish uchun",
        "Staging/prod bo'lsa",
        "Key prefix",
        "KEY_PREFIX",
        `CACHES = {'default': {'KEY_PREFIX': 'prod'}}`
      ),
      section(
        "14. low-level cache set/get",
        "cache.set/get bilan manual cache",
        "Expensive query bo'lsa",
        "Custom caching",
        "Manual cache",
        "cache.set",
        `cache.set('stats', data, timeout=60)`
      ),
      section(
        "15. Serializer cache",
        "Serializer outputni cache qilish",
        "Large payloadlarda",
        "List endpointda",
        "Serializer caching",
        "serializer cache",
        `data = cache.get(key) or Serializer(qs, many=True).data`
      ),
      section(
        "16. Cache invalidation with signals",
        "Signal orqali cache tozalash",
        "Update bo'lsa stale bo'lmasligi uchun",
        "Model save bo'lganda",
        "Cache clear",
        "cache delete",
        `@receiver(post_save, sender=Book)
def clear_cache(*args, **kwargs):
    cache.delete('books:list')`
      ),
      section(
        "17. ETag decorator",
        "ETag bilan conditional GET",
        "Bandwidth tejash uchun",
        "Read-heavy endpointlarda",
        "ETag response",
        "etag",
        `@etag(etag_func)
def list(request): ...`
      ),
      section(
        "18. Cache-Control header",
        "Response headerda cache policy",
        "CDN/browser cache uchun",
        "Public endpointlarda",
        "Cache policy",
        "Cache-Control",
        `return Response(data, headers={'Cache-Control': 'max-age=120'})`
      ),
      section(
        "19. CDN caching",
        "CDN cache strategiyasi",
        "Global latency kamaytirish uchun",
        "Public APIlarda",
        "CDN cache",
        "cdn",
        `# CDN orqali /api/ cached responses`      ),
      section(
        "20. Cache tests",
        "Cache ishlashini test qilish",
        "Cache hit/missni tekshirish",
        "APITestCase ichida",
        "Cache test",
        "cache test",
        `resp1 = client.get(url)
resp2 = client.get(url)
assert resp2['X-Cache'] == 'HIT'`
      ),

    ],
  },
  52: {
    summary: "N+1 muammosi API performance'ni sekinlashtiradi. select_related/prefetch_related va serializer optimizatsiya bilan tezlikni oshirasiz.",
    goals: [
      "N+1 muammosini aniqlash",
      "select_related/prefetch_related ishlatish",
      "Serializer performance optimizatsiyasi",
    ],
    sections: [
      section(
        "01. N+1 muammo nima",
        "Har obyekt uchun alohida query chiqishi",
        "Performance pasayishini tushunish uchun",
        "Nested serializerlarda",
        "Query sonini nazorat qilish",
        "N+1 explanation",
        `# 1 query + N qo'shimcha query = N+1`
      ),
      section(
        "02. select_related",
        "FK relationlarni join bilan olish",
        "Query sonini kamaytirish uchun",
        "ForeignKey bo'lsa",
        "N+1 ni kamaytirish",
        "select_related",
        `queryset = Book.objects.select_related('author')`
      ),
      section(
        "03. prefetch_related",
        "M2M/reverse relationni oldindan olish",
        "Ko'p object relation bo'lsa",
        "ManyToMany yoki reverse FKda",
        "Prefetch query bilan optimizatsiya",
        "prefetch_related",
        `queryset = Book.objects.prefetch_related('tags')`
      ),
      section(
        "04. serializer fields qisqartirish",
        "Keraksiz fieldlarni chiqarmaslik",
        "Payload kichik bo'lishi uchun",
        "List endpointlarda",
        "Response hajmini kamaytirish",
        "fields",
        `class Meta:\n    fields = ['id', 'title']`
      ),
      section(
        "05. SerializerMethodField ehtiyotkor",
        "SerializerMethodField ichida query yozish xavfli",
        "N+1 qo'shilmasligi uchun",
        "List endpointlarda",
        "Querylarni oldindan tayyorlash",
        "SerializerMethodField",
        `def get_author(self, obj):\n    return obj.author.name  # select_related bo'lishi shart`
      ),
      section(
        "06. annotate bilan count",
        "countlarni annotate bilan olish",
        "Loop ichida count qilmaslik uchun",
        "List endpointlarda",
        "DBda hisoblash",
        "annotate",
        `queryset = Book.objects.annotate(review_count=Count('reviews'))`
      ),
      section(
        "07. Prefetch queryset",
        "Prefetch bilan filterlangan relation olish",
        "Ko'p relation bo'lsa",
        "Related listni filter qilish kerak bo'lsa",
        "Optimized prefetch",
        "Prefetch",
        `queryset = Book.objects.prefetch_related(Prefetch('reviews', queryset=Review.objects.filter(active=True)))`
      ),
      section(
        "08. Pagination + optimization",
        "Pagination bilan query kamayadi",
        "Listni sahifalash orqali yukni kamaytirish",
        "Large datasetlarda",
        "Query + response optimizatsiya",
        "pagination",
        `pagination_class = PageNumberPagination`
      ),
      section(
        "09. Debug toolbar",
        "Query sonini ko'rish uchun debug toolbar",
        "N+1 ni aniqlash uchun",
        "Local devda",
        "SQL monitoring",
        "debug toolbar",
        `# django-debug-toolbar orqali query count ko'rish`
      ),
      section(
        "10. Serializer performance testing",
        "Performance testlar bilan slow joylarni topish",
        "Bottleneck aniqlash uchun",
        "Profiling paytida",
        "Querylar va response vaqtini o'lchash",
        "profiling",
        `# simple timing va query count logging`
      ),
      section(
        "11. only()/defer()",
        "Keraksiz fieldlarni yuklamaslik",
        "Payload va memoryni kamaytirish uchun",
        "Large model bo'lsa",
        "Field optimizatsiya",
        "only/defer",
        `queryset = Book.objects.only('id', 'title')`
      ),
      section(
        "12. values()/values_list()",
        "Serializer o'rniga raw dict olish",
        "Simple list endpointlarda",
        "Performance uchun",
        "Raw data olish",
        "values",
        `Book.objects.values('id', 'title')`
      ),
      section(
        "13. Prefetch to_attr",
        "Prefetch natijasini alohida atributga saqlash",
        "N+1 optimizatsiya uchun",
        "Related list kerak bo'lsa",
        "Custom attribute",
        "to_attr",
        `prefetch_related(Prefetch('reviews', to_attr='public_reviews'))`
      ),
      section(
        "14. select_related in get_queryset",
        "ViewSetda select_related qo'shish",
        "N+1 ni reduce qilish uchun",
        "Detail/list endpointlarda",
        "Query optimizatsiya",
        "get_queryset",
        `def get_queryset(self):
    return Book.objects.select_related('author')`
      ),
      section(
        "15. Prefetch with queryset",
        "Filterlangan related data",
        "Only active relation kerak bo'lsa",
        "Large relation bo'lsa",
        "Filtered prefetch",
        "Prefetch queryset",
        `Prefetch('reviews', queryset=Review.objects.filter(active=True))`
      ),
      section(
        "16. annotate for stats",
        "Statistika uchun annotate",
        "Loop ichida count qilmaslik",
        "List endpointlarda",
        "DBda hisoblash",
        "annotate",
        `Book.objects.annotate(review_count=Count('reviews'))`
      ),
      section(
        "17. Depth caution",
        "Serializer depth N+1ni oshiradi",
        "Performance uchun ehtiyotkor bo'lish",
        "Depth ishlatilganda",
        "Depthni cheklash",
        "depth",
        `class Meta:
    depth = 1`
      ),
      section(
        "18. assertNumQueries test",
        "N+1 test bilan aniqlash",
        "Performance regressionni oldini olish",
        "Testlarda",
        "Query count test",
        "assertNumQueries",
        `with self.assertNumQueries(3):
    client.get('/api/books/')`
      ),
      section(
        "19. Prefetch related count",
        "Related countlarni annotate qilish",
        "Loop ichida count qilmaslik",
        "List endpointlarda",
        "Count optimizatsiya",
        "count annotate",
        `Book.objects.annotate(tag_count=Count('tags'))`
      ),
      section(
        "20. Avoid serializer queries",
        "Serializer ichida query yozmaslik",
        "N+1ni oldini olish uchun",
        "SerializerMethodFieldda",
        "Querylarni querysetda qilish",
        "serializer queries",
        `# querysetda select_related/prefetch_related ishlating`
      ),

    ],
  },
  53: {
    summary: "Signals, webhooks va background tasklar API ishini asinxron qiladi. Event-driven flow va celery bilan ishlashni o'rganasiz.",
    goals: [
      "Signals orqali eventlarni kuzatish",
      "Webhook endpoint dizayn qilish",
      "Celery task trigger qilish",
    ],
    sections: [
      section(
        "01. post_save signal",
        "post_save model saqlanganda ishlaydi",
        "Event trigger qilish uchun",
        "Model create/update bo'lsa",
        "Auto trigger logika",
        "post_save",
        `@receiver(post_save, sender=Order)\n\ndef order_created(sender, instance, created, **kwargs):\n    if created:\n        ...`
      ),
      section(
        "02. signal registration",
        "Signals app ichida connect bo'lishi kerak",
        "Signal ishlashi uchun",
        "App ready paytida",
        "Signalni aktiv qilish",
        "signals.py",
        `class OrdersConfig(AppConfig):\n    def ready(self):\n        import orders.signals`
      ),
      section(
        "03. Webhook endpoint",
        "Webhook boshqa servisga callback yuboradi",
        "Integratsiya uchun",
        "Event bo'lganda",
        "External xizmatga notify",
        "webhook",
        `@api_view(['POST'])\ndef webhook(request):\n    return Response({'ok': True})`
      ),
      section(
        "04. Webhook signing",
        "Webhook uchun signature tekshirish",
        "Security uchun",
        "Public webhooklarda",
        "Request autenticity tekshirish",
        "webhook signature",
        `signature = request.headers.get('X-Signature')`
      ),
      section(
        "05. Celery task",
        "Celery task asinxron ishni bajaradi",
        "Time-consuming ishlar uchun",
        "Email, PDF generate bo'lsa",
        "Background job",
        "celery task",
        `@shared_task\ndef send_email(order_id):\n    ...`
      ),
      section(
        "06. Task trigger",
        "Taskni signal yoki viewdan chaqirish",
        "Asinxron ishlatish uchun",
        "Model save bo'lganda",
        "Taskni queuega yuborish",
        "task delay",
        `send_email.delay(order.id)`
      ),
      section(
        "07. Retry policy",
        "Task retry policy xatoni qayta ishlaydi",
        "Transient errorlar uchun",
        "External API chaqirilganda",
        "Taskni qayta bajarish",
        "retry",
        `send_email.retry(countdown=60)`
      ),
      section(
        "08. Idempotency",
        "Webhook va tasklar idempotent bo'lishi kerak",
        "Duplicate trigger bo'lmasligi uchun",
        "Retries bo'lsa",
        "Side-effectlarni oldini olish",
        "idempotency",
        `# event_id bo'yicha qayta ishlashni bloklash`
      ),
      section(
        "09. Outbox pattern",
        "Outbox pattern eventlarni ishonchli yuboradi",
        "Transactional integrity uchun",
        "Critical eventlar bo'lsa",
        "Eventlarni DBda saqlash",
        "outbox",
        `class Outbox(models.Model):\n    event = models.JSONField()`
      ),
      section(
        "10. Monitoring tasks",
        "Task monitoring muammolarni ko'rsatadi",
        "Fail bo'lgan tasklarni ko'rish uchun",
        "Productionda",
        "Task health nazorat",
        "task monitoring",
        `# Flower yoki Prometheus bilan monitoring`
      ),
      section(
        "11. pre_save vs post_save",
        "pre_save oldin, post_save keyin ishlaydi",
        "Hook tanlash uchun",
        "Signal ishlatilganda",
        "Event vaqtini boshqarish",
        "pre_save",
        `@receiver(pre_save, sender=Order)
def before_save(sender, instance, **kwargs):
    ...`
      ),
      section(
        "12. m2m_changed",
        "M2M relation o'zgarsa ishlaydi",
        "Tags yoki members o'zgarsa",
        "M2M eventlarda",
        "M2M signal",
        "m2m_changed",
        `@receiver(m2m_changed, sender=Book.tags.through)
def tags_changed(sender, **kwargs):
    ...`
      ),
      section(
        "13. transaction.on_commit",
        "Commitdan keyin task chaqirish",
        "DB inconsistent bo'lmasligi uchun",
        "Transaction ishlatilganda",
        "Safe task trigger",
        "on_commit",
        `transaction.on_commit(lambda: send_email.delay(order.id))`
      ),
      section(
        "14. Celery countdown",
        "Taskni kechiktirib yuborish",
        "Delay kerak bo'lsa",
        "Reminder yoki retry uchun",
        "Delayed task",
        "countdown",
        `send_email.apply_async(args=[order.id], countdown=60)`
      ),
      section(
        "15. Retry with backoff",
        "Retry backoff strategy",
        "External API xato bo'lsa",
        "Transient errorlarda",
        "Retry policy",
        "retry",
        `send_email.retry(countdown=2 ** retries)`
      ),
      section(
        "16. Idempotency key",
        "Webhook duplicate bo'lmasligi uchun",
        "Retry bo'lsa",
        "Webhook endpointda",
        "Idempotency",
        "idempotency",
        `key = request.headers.get('Idempotency-Key')`
      ),
      section(
        "17. Signature verification",
        "Webhook signature tekshirish",
        "Xavfsizlik uchun",
        "Public webhooklarda",
        "Request verify",
        "signature",
        `expected = hmac.new(secret, body, sha256).hexdigest()`
      ),
      section(
        "18. Webhook status codes",
        "Webhook response code to'g'ri bo'lishi kerak",
        "Provider qayta yubormasligi uchun",
        "Webhook endpointlarda",
        "Ack response",
        "webhook status",
        `return Response({'ok': True}, status=200)`
      ),
      section(
        "19. Dead letter queue",
        "Fail bo'lgan eventlarni saqlash",
        "Retry limitdan o'tsa",
        "Critical eventlarda",
        "DLQ pattern",
        "dlq",
        `class DeadLetter(models.Model):
    payload = models.JSONField()`
      ),
      section(
        "20. Task monitoring",
        "Celery tasklarni monitoring qilish",
        "Failed tasklarni ko'rish uchun",
        "Productionda",
        "Task observability",
        "monitoring",
        `# Flower yoki dashboard orqali monitoring`
      ),

    ],
  },
  54: {
    summary: "API security hardening bilan productionga tayyorlik oshadi. CORS, CSRF, security headers va safe defaultsni sozlaysiz.",
    goals: [
      "CORS va CSRF ni to'g'ri sozlash",
      "Security headerlar bilan ishlash",
      "Permission va authni xavfsiz konfiguratsiya qilish",
    ],
    sections: [
      section(
        "01. CORS sozlash",
        "CORS cross-origin requestlarni boshqaradi",
        "Frontend boshqa domen bo'lsa",
        "SPA yoki mobile clientlarda",
        "Domenlarga ruxsat berish",
        "CORS",
        `CORS_ALLOWED_ORIGINS = ['https://app.example.com']`
      ),
      section(
        "02. django-cors-headers",
        "CORSni boshqarish uchun paket",
        "Tez sozlash uchun",
        "CORS kerak bo'lsa",
        "Middleware qo'shish",
        "cors headers",
        `INSTALLED_APPS += ['corsheaders']\nMIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', *MIDDLEWARE]`
      ),
      section(
        "03. CSRF va API",
        "CSRF protection browser sessionlarda kerak",
        "SessionAuth ishlatilganda",
        "Browser-based auth bo'lsa",
        "CSRF token tekshirish",
        "CSRF",
        `# SessionAuthentication CSRFni talab qiladi`
      ),
      section(
        "04. HTTPS only",
        "HTTPS trafficni majburiy qilish",
        "Tokenlar ochiq ketmasligi uchun",
        "Productionda",
        "Secure transport",
        "SECURE_SSL_REDIRECT",
        `SECURE_SSL_REDIRECT = True`
      ),
      section(
        "05. Secure cookies",
        "Cookie secure va httponly bo'lishi kerak",
        "XSS riskni kamaytirish uchun",
        "Session auth ishlatilsa",
        "Cookie security",
        "SESSION_COOKIE_SECURE",
        `SESSION_COOKIE_SECURE = True\nCSRF_COOKIE_SECURE = True`
      ),
      section(
        "06. Password policies",
        "Parol siyosati xavfsizlikni oshiradi",
        "Weak passwordlarni bloklash uchun",
        "Registration bo'lsa",
        "Password validation",
        "AUTH_PASSWORD_VALIDATORS",
        `AUTH_PASSWORD_VALIDATORS = [{'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'}]`
      ),
      section(
        "07. Rate limiting",
        "Rate limiting bruteforce hujumdan himoya",
        "Login endpointlarda",
        "Auth endpointlarida",
        "So'rovlarni cheklash",
        "throttling",
        `throttle_scope = 'login'`
      ),
      section(
        "08. Sensitive data masking",
        "Loglarda maxfiy data mask qilish",
        "PII xavfsizligi uchun",
        "Logging paytida",
        "Sensitive data yashirish",
        "masking",
        `# token va passwordlarni logdan chiqarib tashlang`
      ),
      section(
        "09. Permissions default",
        "Default permission IsAuthenticated qilish",
        "Ochiq endpointlarni minimallashtirish uchun",
        "Productionda",
        "Secure defaults",
        "default permissions",
        `REST_FRAMEWORK = {'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated']}`
      ),
      section(
        "10. Security headers",
        "X-Content-Type-Options, X-Frame-Options",
        "Clickjacking va MIME sniffingdan himoya",
        "Productionda",
        "Header security",
        "security headers",
        `SECURE_CONTENT_TYPE_NOSNIFF = True\nX_FRAME_OPTIONS = 'DENY'`
      ),
      section(
        "11. SECURE_HSTS_SECONDS",
        "HSTS header sozlash",
        "HTTPS majburiyligi uchun",
        "Productionda",
        "HSTS policy",
        "SECURE_HSTS_SECONDS",
        `SECURE_HSTS_SECONDS = 31536000`
      ),
      section(
        "12. SECURE_HSTS_INCLUDE_SUBDOMAINS",
        "Subdomainlar uchun HSTS",
        "Barcha subdomainlar HTTPS bo'lishi uchun",
        "Productionda",
        "HSTS subdomains",
        "SECURE_HSTS_INCLUDE_SUBDOMAINS",
        `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`
      ),
      section(
        "13. SECURE_PROXY_SSL_HEADER",
        "Proxy ortida HTTPSni to'g'ri aniqlash",
        "Load balancer ishlatilsa",
        "Productionda",
        "Proxy SSL header",
        "SECURE_PROXY_SSL_HEADER",
        `SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')`
      ),
      section(
        "14. CSRF_TRUSTED_ORIGINS",
        "Trusted originlar ro'yxati",
        "CSRF muammolarni oldini olish uchun",
        "Session auth bo'lsa",
        "Trusted origins",
        "CSRF_TRUSTED_ORIGINS",
        `CSRF_TRUSTED_ORIGINS = ['https://app.example.com']`
      ),
      section(
        "15. CORS_ALLOW_HEADERS",
        "CORS headerlar ro'yxati",
        "Custom header ishlatilsa",
        "Frontend extra header yuborsa",
        "Allow headers",
        "CORS_ALLOW_HEADERS",
        `CORS_ALLOW_HEADERS = ['authorization', 'content-type']`
      ),
      section(
        "16. SECURE_REFERRER_POLICY",
        "Referrer policy sozlash",
        "Privacy va security uchun",
        "Productionda",
        "Referrer policy",
        "SECURE_REFERRER_POLICY",
        `SECURE_REFERRER_POLICY = 'same-origin'`
      ),
      section(
        "17. SESSION_COOKIE_HTTPONLY",
        "Cookie JSdan o'qilmasligi uchun",
        "XSS riskni kamaytirish",
        "Session auth bo'lsa",
        "HttpOnly cookie",
        "SESSION_COOKIE_HTTPONLY",
        `SESSION_COOKIE_HTTPONLY = True`
      ),
      section(
        "18. X_FRAME_OPTIONS",
        "Clickjackingdan himoya",
        "IFrame'da ochilmasligi uchun",
        "Productionda",
        "Frame options",
        "X_FRAME_OPTIONS",
        `X_FRAME_OPTIONS = 'DENY'`
      ),
      section(
        "19. SECURE_CONTENT_TYPE_NOSNIFF",
        "MIME sniffingni bloklash",
        "Security uchun",
        "Productionda",
        "Content type nosniff",
        "SECURE_CONTENT_TYPE_NOSNIFF",
        `SECURE_CONTENT_TYPE_NOSNIFF = True`
      ),
      section(
        "20. Content Security Policy",
        "CSP header bilan scriptlarni cheklash",
        "XSS riskni kamaytirish",
        "Frontend bo'lsa",
        "CSP policy",
        "CSP",
        `# Content-Security-Policy header qo'shish`
      ),

    ],
  },
  55: {
    summary: "Audit logging va rate policy bilan kim nima qilganini kuzatasiz va APIni nazorat qilasiz.",
    goals: [
      "Audit log model yaratish",
      "Action log yozish",
      "Rate policy strategiyasini belgilash",
    ],
    sections: [
      section(
        "01. Audit log modeli",
        "Audit log har actionni saqlaydi",
        "Traceability uchun",
        "Production monitoringda",
        "User actionni yozish",
        "AuditLog",
        `class AuditLog(models.Model):\n    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)\n    action = models.CharField(max_length=100)`
      ),
      section(
        "02. Action logging",
        "View ichida action log yozish",
        "CRUD monitoring uchun",
        "Create/update/delete paytida",
        "Action trace",
        "log action",
        `AuditLog.objects.create(user=request.user, action='book.create')`
      ),
      section(
        "03. Middleware logging",
        "Middleware global log yozishi mumkin",
        "Barcha requestlarni loglash uchun",
        "API gateway sifatida",
        "Request tracking",
        "middleware log",
        `class AuditMiddleware:\n    def __call__(self, request):\n        ...`
      ),
      section(
        "04. IP logging",
        "IP addressni audit logga qo'shish",
        "Security va tracing uchun",
        "Sensitive endpointlarda",
        "Request source tracking",
        "ip logging",
        `ip = request.META.get('REMOTE_ADDR')`
      ),
      section(
        "05. Rate policy",
        "Rate policy endpointlar uchun limit strategiyasi",
        "Traffic control uchun",
        "Public APIlarda",
        "Limit siyosatini boshqarish",
        "rate policy",
        `DEFAULT_THROTTLE_RATES = {'user': '1000/day', 'login': '10/min'}`
      ),
      section(
        "06. Different scopes",
        "Scope bo'yicha turli limit",
        "Endpointlar turli tezlikda ishlasa",
        "Login vs list farq bo'lsa",
        "Scoped limit",
        "scopes",
        `throttle_scope = 'login'`
      ),
      section(
        "07. Audit serializer",
        "Audit log API orqali ko'rish",
        "Admin monitoring uchun",
        "Internal dashboardlarda",
        "Audit data chiqarish",
        "Audit serializer",
        `class AuditSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = AuditLog\n        fields = '__all__'`
      ),
      section(
        "08. Sensitive actions",
        "Delete yoki update actionlar uchun maxsus log",
        "High-risk actionsni kuzatish uchun",
        "Critical endpointlarda",
        "Enhanced audit",
        "sensitive action",
        `AuditLog.objects.create(action='book.delete', meta={'id': book.id})`
      ),
      section(
        "09. Retention policy",
        "Loglarni qachon o'chirish siyosati",
        "Storage to'lib ketmasligi uchun",
        "Long-term retention bo'lsa",
        "Log lifecycle",
        "retention",
        `# 90 kundan eski loglarni cron bilan o'chirish`
      ),
      section(
        "10. Audit report",
        "Audit report yaratish",
        "Compliance uchun",
        "Admin panel yoki exportda",
        "Audit statistikasi",
        "audit report",
        `# CSV export yoki dashboard chart`
      ),
      section(
        "11. Audit viewset",
        "Audit loglarni API orqali ko'rsatish",
        "Admin monitoring uchun",
        "Internal dashboardlarda",
        "Audit API",
        "audit viewset",
        `class AuditViewSet(ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()`
      ),
      section(
        "12. Filter logs",
        "Audit loglarni filterlash",
        "User yoki action bo'yicha",
        "Admin endpointda",
        "Log filter",
        "log filter",
        `queryset = AuditLog.objects.filter(user=request.user)`
      ),
      section(
        "13. Index audit table",
        "Audit tablega index qo'shish",
        "Search tezligi uchun",
        "Large audit datasetda",
        "DB index",
        "index",
        `indexes = [models.Index(fields=['user', 'created_at'])]`
      ),
      section(
        "14. Audit schema",
        "Audit log schema belgilash",
        "Fieldlarni standart qilish uchun",
        "Compliance talabida",
        "Log schema",
        "schema",
        `action, resource, status, ip, user_agent`
      ),
      section(
        "15. Async logging",
        "Audit logni asinxron yozish",
        "Performance uchun",
        "High trafficda",
        "Async logging",
        "celery log",
        `log_action.delay(payload)`
      ),
      section(
        "16. Retention job",
        "Audit loglarni eski bo'lsa o'chirish",
        "Storage to'lib ketmasligi uchun",
        "Cron jobda",
        "Retention policy",
        "retention",
        `AuditLog.objects.filter(created_at__lt=cutoff).delete()`
      ),
      section(
        "17. CSV export",
        "Audit loglarni export qilish",
        "Compliance uchun",
        "Admin talabida",
        "Log export",
        "csv export",
        `# querysetni CSVga yozish`
      ),
      section(
        "18. Role-based throttles",
        "Role bo'yicha limit",
        "Admin uchun yuqori limit",
        "Policy kerak bo'lsa",
        "Role rate",
        "role rate",
        `if request.user.is_staff: return '1000/day'`
      ),
      section(
        "19. Sensitive action tags",
        "Delete yoki refund kabi actionlarni ajratish",
        "Riskli actionlarni kuzatish uchun",
        "Audit logda",
        "Sensitive tag",
        "sensitive",
        `AuditLog.objects.create(action='order.refund', meta={'risk': 'high'})`
      ),
      section(
        "20. Audit metrics",
        "Audit statistikasi chiqarish",
        "Monitoring uchun",
        "Dashboardlarda",
        "Audit analytics",
        "metrics",
        `AuditLog.objects.filter(action='login').count()`
      ),

    ],
  },
  56: {
    summary: "Production deploy uchun env config, DEBUG, ALLOWED_HOSTS va secure settings to'g'ri bo'lishi kerak. Bugun deploy checklistni tayyorlaysiz.",
    goals: [
      "DEBUG va SECRET_KEYni envda boshqarish",
      "ALLOWED_HOSTS va security settinglarni sozlash",
      "Static/media va logging konfiguratsiya qilish",
    ],
    sections: [
      section(
        "01. DEBUG=False",
        "Productionda DEBUG o'chiriladi",
        "Xatolarni tashqi ko'rsatmaslik uchun",
        "Prod muhitda",
        "Securityni oshirish",
        "DEBUG",
        `DEBUG = env.bool('DEBUG', default=False)`
      ),
      section(
        "02. SECRET_KEY env",
        "SECRET_KEY envdan olinadi",
        "Maxfiy keyni kodga yozmaslik uchun",
        "Prod va stagingda",
        "Keyni xavfsiz saqlash",
        "SECRET_KEY",
        `SECRET_KEY = env('SECRET_KEY')`
      ),
      section(
        "03. ALLOWED_HOSTS",
        "ALLOWED_HOSTS domenlarni belgilaydi",
        "Host header attackni oldini olish uchun",
        "Prod domainlarda",
        "Host validation",
        "ALLOWED_HOSTS",
        `ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')`
      ),
      section(
        "04. SECURE_SSL_REDIRECT",
        "HTTPS redirect yoqiladi",
        "Trafficni shifrlash uchun",
        "Productionda",
        "HTTPS majburiy qilish",
        "SECURE_SSL_REDIRECT",
        `SECURE_SSL_REDIRECT = True`
      ),
      section(
        "05. Static/Media",
        "Static va media path to'g'ri bo'lishi kerak",
        "Assetlar serve bo'lishi uchun",
        "Deployda",
        "Static/media config",
        "STATIC/MEDIA",
        `STATIC_ROOT = BASE_DIR / 'staticfiles'\nMEDIA_ROOT = BASE_DIR / 'media'`
      ),
      section(
        "06. Database config",
        "Database env orqali boshqariladi",
        "Prod DB bilan ishlash uchun",
        "Staging/prod muhitlarda",
        "DB credentials ni yashirish",
        "DATABASES",
        `DATABASES = {'default': env.db()}`
      ),
      section(
        "07. Logging",
        "Logging productionda muhim",
        "Xatolarni kuzatish uchun",
        "Prod muhitda",
        "Log formatni sozlash",
        "LOGGING",
        `LOGGING = {'version': 1, 'handlers': {'console': {'class': 'logging.StreamHandler'}}}`
      ),
      section(
        "08. Healthcheck endpoint",
        "Healthcheck endpoint monitoring uchun",
        "Load balancer check uchun",
        "Prod muhitda",
        "System health signal",
        "healthcheck",
        `@api_view(['GET'])\ndef health(request):\n    return Response({'status': 'ok'})`
      ),
      section(
        "09. Gunicorn/Uvicorn",
        "Production server tanlash",
        "runserver o'rniga prod server kerak",
        "Deploy paytida",
        "WSGI server bilan ishlash",
        "gunicorn",
        `gunicorn config.wsgi:application`
      ),
      section(
        "10. Environment separation",
        "Local/staging/prod env ajratish",
        "Config drift oldini olish uchun",
        "Multiple muhitlarda",
        "Env fayllarni boshqarish",
        "env separation",
        `# .env.local, .env.staging, .env.prod`
      ),
      section(
        "11. collectstatic",
        "Static fayllarni yig'ish",
        "Productionda static serve uchun",
        "Deploy paytida",
        "Static build",
        "collectstatic",
        `python manage.py collectstatic`
      ),
      section(
        "12. Whitenoise",
        "Static fayllarni serve qilish",
        "Simple deploy uchun",
        "No CDN bo'lsa",
        "Static server",
        "whitenoise",
        `MIDDLEWARE = ['whitenoise.middleware.WhiteNoiseMiddleware', *MIDDLEWARE]`
      ),
      section(
        "13. Gunicorn config",
        "Gunicorn worker sozlash",
        "Production performance uchun",
        "Deployda",
        "WSGI server",
        "gunicorn",
        `gunicorn config.wsgi:application --workers 4`
      ),
      section(
        "14. Migrations in deploy",
        "Deploy paytida migratsiyalar",
        "DB schema yangilash uchun",
        "CI/CD pipeline da",
        "Migration step",
        "migrate",
        `python manage.py migrate`
      ),
      section(
        "15. Static/media CDN",
        "CDN orqali static/media serve qilish",
        "Performance uchun",
        "Global userlar bo'lsa",
        "CDN config",
        "cdn",
        `STATIC_URL = 'https://cdn.example.com/static/'`
      ),
      section(
        "16. Env per environment",
        "Local/staging/prod env ajratish",
        "Config driftni kamaytirish",
        "Multiple muhitlarda",
        "Env strategy",
        "env files",
        `# .env.local, .env.staging, .env.prod`
      ),
      section(
        "17. Healthcheck",
        "Healthcheck endpoint monitoring uchun",
        "Load balancer check qiladi",
        "Productionda",
        "Health endpoint",
        "healthcheck",
        `@api_view(['GET'])
def health(request):
    return Response({'status': 'ok'})`
      ),
      section(
        "18. Secret rotation",
        "Secretlarni davriy almashtirish",
        "Security uchun",
        "Productionda",
        "Secret management",
        "secret rotation",
        `# SECRET_KEY va DB password rotation`
      ),
      section(
        "19. Logging to stdout",
        "Containerlarda stdout logging",
        "K8s/Render loglarni olishi uchun",
        "Productionda",
        "Console logging",
        "stdout logging",
        `LOGGING['handlers']['console'] = {'class': 'logging.StreamHandler'}`
      ),
      section(
        "20. Rollback plan",
        "Deploy xatosida qaytish rejasi",
        "Downtime oldini olish uchun",
        "Release jarayonida",
        "Rollback strategy",
        "rollback",
        `# old image/commitga qaytish`
      ),

    ],
  },
  57: {
    summary: "Monitoring va logging productionda muammolarni tez topishga yordam beradi. LOGGING config va Sentry integratsiya bilan ishlaysiz.",
    goals: [
      "LOGGING dictni sozlash",
      "Request tracing va correlation ID ishlatish",
      "Sentry yoki boshqa error tracking ulash",
    ],
    sections: [
      section(
        "01. Logging levels",
        "DEBUG/INFO/WARNING/ERROR darajalari",
        "Logni tartibli yozish uchun",
        "Production monitoringda",
        "Log severity boshqarish",
        "logging levels",
        `import logging\nlogger = logging.getLogger(__name__)`
      ),
      section(
        "02. LOGGING config",
        "Django LOGGING dict log formatni belgilaydi",
        "Central logging uchun",
        "Prod muhitda",
        "Handler va formatter sozlash",
        "LOGGING",
        `LOGGING = {\n  'version': 1,\n  'handlers': {'console': {'class': 'logging.StreamHandler'}},\n  'root': {'handlers': ['console'], 'level': 'INFO'}\n}`
      ),
      section(
        "03. Request ID",
        "Har requestga ID berish",
        "Trace qilish uchun",
        "Distributed systemda",
        "Log correlation",
        "request id",
        `request_id = request.headers.get('X-Request-Id')`
      ),
      section(
        "04. Structured logging",
        "JSON formatda log yozish",
        "Log aggregator bilan ishlash uchun",
        "Cloud loggingda",
        "Machine-readable logs",
        "structured logging",
        `logger.info('order_created', extra={'order_id': order.id})`
      ),
      section(
        "05. Sentry setup",
        "Sentry error tracking beradi",
        "Real time error monitoring uchun",
        "Productionda",
        "Errorlarni kuzatish",
        "sentry",
        `sentry_sdk.init(dsn='...')`
      ),
      section(
        "06. Capture exceptions",
        "Exceptionlarni Sentryga yuborish",
        "Xatolarni tez ko'rish uchun",
        "Unhandled errorlarda",
        "Error monitoring",
        "capture_exception",
        `sentry_sdk.capture_exception(e)`
      ),
      section(
        "07. Performance tracing",
        "Request latency monitoring",
        "Slow endpointlarni topish uchun",
        "Performance tuningda",
        "Trace metrics",
        "tracing",
        `# Sentry performance tracing yoqish`
      ),
      section(
        "08. Health metrics",
        "Health metrics kuzatish",
        "CPU/memory/DB latency uchun",
        "Infrastructure monitoringda",
        "System health",
        "metrics",
        `# Prometheus/Grafana integratsiya qilish`
      ),
      section(
        "09. Log rotation",
        "Log fayllarni rotating qilish",
        "Disk to'lib ketmasligi uchun",
        "File logging bo'lsa",
        "Log retention",
        "log rotation",
        `handlers = {'file': {'class': 'logging.handlers.RotatingFileHandler'}}`
      ),
      section(
        "10. Alerts",
        "Alertlar critical errorlarni bildiradi",
        "Tez reaksiya uchun",
        "Production muhitda",
        "Incident response",
        "alerts",
        `# Sentry alert rule yoki PagerDuty`
      ),
      section(
        "11. Request logging middleware",
        "Har requestni loglash",
        "Tracing uchun",
        "Productionda",
        "Request logs",
        "middleware",
        `class RequestLogMiddleware:
    def __call__(self, request):
        logger.info(request.path)
        return self.get_response(request)`
      ),
      section(
        "12. Log filters",
        "Loglarni filter qilish",
        "Noise kamaytirish uchun",
        "Logging configda",
        "Log filter",
        "filters",
        `class IgnoreHealthFilter(logging.Filter):
    def filter(self, record):
        return 'health' not in record.getMessage()`
      ),
      section(
        "13. JSON logs",
        "Structured JSON log format",
        "Log aggregatorlar uchun",
        "Productionda",
        "JSON logging",
        "json logging",
        `logger.info('event', extra={'user_id': user.id})`
      ),
      section(
        "14. Metrics with Prometheus",
        "Prometheus metrics endpoint",
        "Monitoring uchun",
        "Productionda",
        "Metrics export",
        "prometheus",
        `# /metrics endpoint orqali metrics chiqarish`
      ),
      section(
        "15. APM integration",
        "APM orqali latency tracing",
        "Performance monitoring uchun",
        "Productionda",
        "APM",
        "apm",
        `# Sentry/Datadog APM integratsiya`
      ),
      section(
        "16. Alert thresholds",
        "Alert threshold belgilash",
        "Critical errorlarda signal olish",
        "Monitoringda",
        "Alerting",
        "alerts",
        `# 5xx rate > 1% bo'lsa alert`
      ),
      section(
        "17. Log sampling",
        "Katta trafficda loglarni sample qilish",
        "Log volume kamaytirish uchun",
        "High trafficda",
        "Sampling",
        "sampling",
        `# INFO loglarni 10% saqlash`
      ),
      section(
        "18. Trace ID propagation",
        "Trace IDni responsega qo'shish",
        "Client debug uchun",
        "Distributed systemda",
        "Trace id",
        "trace id",
        `return Response(data, headers={'X-Trace-Id': trace_id})`
      ),
      section(
        "19. Uptime checks",
        "Uptime monitoring",
        "Service down bo'lsa tez bilish uchun",
        "Productionda",
        "Uptime checks",
        "uptime",
        `# Pingdom yoki UptimeRobot sozlash`
      ),
      section(
        "20. Incident runbook",
        "Incident paytida qadamlar",
        "On-call uchun",
        "Productionda",
        "Runbook",
        "runbook",
        `# Qadam-baqadam incident rejasi`
      ),

    ],
  },
  58: {
    summary: "Clean architecture DRF kodini tartibli qiladi. Service layer, selectors va serializerlar ajratilib, testlash osonlashadi.",
    goals: [
      "Service layer va selectors tushunchasini o'rganish",
      "Viewsetni yupqa qilish",
      "Business logikani alohida qatlamga ajratish",
    ],
    sections: [
      section(
        "01. View yupqa bo'lishi",
        "View faqat input/response bilan ishlashi kerak",
        "Maintainability uchun",
        "Katta APIlarda",
        "Separation of concerns",
        "thin view",
        `class OrderViewSet(ModelViewSet):\n    def create(self, request):\n        return Response(create_order(request.data))`
      ),
      section(
        "02. Service layer",
        "Service layer business qoidalarni saqlaydi",
        "Logicni viewdan ajratish uchun",
        "Complex business qoidalarda",
        "Reusable business logic",
        "service layer",
        `def create_order(data):\n    return Order.objects.create(**data)`
      ),
      section(
        "03. Selector layer",
        "Selector layer querylarni markazlashtiradi",
        "N+1 va query optimizatsiya uchun",
        "List/detail querylarda",
        "Query reuse",
        "selector",
        `def get_active_books():\n    return Book.objects.filter(is_active=True)`
      ),
      section(
        "04. Serializer responsibility",
        "Serializer faqat validation va formatga javobgar",
        "Business logicni serializerga qo'ymaslik uchun",
        "Clean architectureda",
        "Separation",
        "serializer role",
        `class BookSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Book\n        fields = ['id', 'title']`
      ),
      section(
        "05. Use cases",
        "Use case maxsus biznes flow",
        "Complex flowni izolyatsiya qilish uchun",
        "Checkout yoki payment flowda",
        "Business logic modular",
        "use case",
        `def checkout(user, cart_id):\n    ...`
      ),
      section(
        "06. Validation layer",
        "Validation serializerda qoladi",
        "Input tekshiruvi uchun",
        "API boundaryda",
        "Data integrity",
        "validation",
        `serializer.is_valid(raise_exception=True)`
      ),
      section(
        "07. Transaction management",
        "Service layerda atomic ishlatish",
        "Data consistency uchun",
        "Multiple write bo'lsa",
        "Atomic operations",
        "transaction",
        `with transaction.atomic():\n    ...`
      ),
      section(
        "08. Unit test",
        "Service layerni unit test qilish oson",
        "Viewdan mustaqil test uchun",
        "Business logic testlarida",
        "Reliability",
        "unit test",
        `def test_create_order():\n    order = create_order({'price': 10})`
      ),
      section(
        "09. Dependency injection",
        "Servicega repo yoki client injection",
        "Testda mock qilish uchun",
        "External service bo'lsa",
        "Flexible design",
        "dependency injection",
        `def create_order(data, payment_client):\n    ...`
      ),
      section(
        "10. Folder structure",
        "services.py, selectors.py, serializers.py ajratish",
        "Codebase tartibli bo'lishi uchun",
        "Large projectlarda",
        "Structure consistency",
        "structure",
        `apps/orders/\n  services.py\n  selectors.py\n  serializers.py\n  views.py`
      ),
      section(
        "11. DTO objects",
        "DTO data transfer uchun",
        "Service layer inputni tozalash uchun",
        "Complex logicda",
        "Data object",
        "DTO",
        `class CreateOrderDTO:
    def __init__(self, user_id, items):
        ...`
      ),
      section(
        "12. Repository pattern",
        "DB accessni ajratish",
        "Test va swap uchun",
        "Large codebase bo'lsa",
        "Repository layer",
        "repository",
        `class OrderRepository:
    def list(self):
        return Order.objects.all()`
      ),
      section(
        "13. Domain errors",
        "Business xatolarni alohida classga ajratish",
        "Service layerda",
        "Business rule buzilganda",
        "Domain error",
        "domain error",
        `class OrderLimitError(Exception):
    pass`
      ),
      section(
        "14. Use case classes",
        "Use case classlar bilan flow ajratish",
        "Complex workflow bo'lsa",
        "Service layerda",
        "Use case",
        "use case",
        `class CreateOrderUseCase:
    def execute(self, data):
        ...`
      ),
      section(
        "15. Service tests",
        "Service layerni alohida test qilish",
        "Viewdan mustaqil test uchun",
        "Unit testlarda",
        "Service test",
        "service test",
        `def test_create_order_service():
    order = create_order(dto)`
      ),
      section(
        "16. Selector tests",
        "Selector querylarni test qilish",
        "Query optimizatsiya uchun",
        "DB testlarda",
        "Selector test",
        "selector test",
        `def test_active_books():
    qs = get_active_books()`
      ),
      section(
        "17. Transaction boundaries",
        "Business flowni atomic qilish",
        "Consistency uchun",
        "Multiple write bo'lsa",
        "Transaction",
        "atomic",
        `with transaction.atomic():
    ...`
      ),
      section(
        "18. External clients injection",
        "External service clientni inject qilish",
        "Mock qilish uchun",
        "Service layerda",
        "Dependency injection",
        "injection",
        `def create_order(data, payment_client):
    payment_client.charge(...)`
      ),
      section(
        "19. Module boundaries",
        "App ichida public API saqlash",
        "Import cycle bo'lmasligi uchun",
        "Large appsda",
        "Module boundary",
        "boundaries",
        `__all__ = ['create_order', 'get_active_orders']`
      ),
      section(
        "20. Code review checklist",
        "Clean architecture check",
        "Business logic viewda emasligini tekshirish",
        "PR reviewda",
        "Quality control",
        "checklist",
        `# View yupqa, service test bor, selector optimizatsiya qilingan`
      ),

    ],
  },
  59: {
    summary: "Capstone oldidan API dizaynini to'liq rejalaysiz: entitylar, endpointlar, permissions va documentation.",
    goals: [
      "Entity va relationshiplarni chizish",
      "Endpointlar ro'yxatini tuzish",
      "Permissions va auth modelini belgilash",
    ],
    sections: [
      section(
        "01. Entity list",
        "Entitylar API asosiy obyektlari",
        "Data modelni aniqlash uchun",
        "Project startida",
        "Model dizayn",
        "entity list",
        `entities = ['User', 'Product', 'Order']`
      ),
      section(
        "02. Relationship map",
        "Entitylar o'rtasidagi bog'lanish",
        "DB schema to'g'ri bo'lishi uchun",
        "Model design paytida",
        "ER diagram",
        "relationship",
        `# User 1..* Order, Order *..* Product`
      ),
      section(
        "03. Endpoint mapping",
        "CRUD va custom endpointlar ro'yxati",
        "API scope aniqlash uchun",
        "Project startida",
        "Endpoint planning",
        "endpoint map",
        `GET /products\nPOST /orders\nGET /orders/{id}`
      ),
      section(
        "04. Permissions matrix",
        "Rolega qarab ruxsatlarni belgilash",
        "Security dizayni uchun",
        "RBAC ishlatilganda",
        "Access control",
        "permissions matrix",
        `roles = {'admin': ['*'], 'user': ['read', 'create']}`
      ),
      section(
        "05. Auth strategy",
        "Auth usulini tanlash (JWT/Token/Session)",
        "Client turiga moslash uchun",
        "Mobile/SPA bo'lsa",
        "Auth flow dizayni",
        "auth strategy",
        `auth = 'JWT'`
      ),
      section(
        "06. Serializer contracts",
        "Request/response formatini belgilash",
        "Frontend integratsiya uchun",
        "Endpoint design paytida",
        "Contract tuzish",
        "serializer contract",
        `# Product: {id, title, price}`
      ),
      section(
        "07. Pagination/filter plan",
        "List endpointlarda pagination/filter kerak",
        "Performance va UX uchun",
        "List endpointlarda",
        "Query params plan",
        "pagination plan",
        `# /products?page=1&ordering=-price`
      ),
      section(
        "08. Error format",
        "Global error formatni belgilash",
        "Client error handling uchun",
        "API design paytida",
        "Error contract",
        "error format",
        `# {error: {detail: '...'}}`
      ),
      section(
        "09. Documentation outline",
        "Docs bo'limlarini rejalash",
        "Integratsiya tez bo'lishi uchun",
        "Doc yozishdan oldin",
        "Docs structure",
        "docs outline",
        `# Auth, Products, Orders, Webhooks`
      ),
      section(
        "10. Milestone plan",
        "Capstone bosqichlarini ajratish",
        "Delivery vaqtini rejalash uchun",
        "Project managementda",
        "Roadmap yaratish",
        "milestones",
        `# Week1: models+auth, Week2: endpoints, Week3: docs+tests`
      ),
      section(
        "11. Index plan",
        "Query tezligi uchun index reja",
        "Large dataset bo'lsa",
        "Model design paytida",
        "Index strategiya",
        "index plan",
        `indexes = [models.Index(fields=['status', 'created_at'])]`
      ),
      section(
        "12. Migration plan",
        "Migration strategiyasi",
        "DB o'zgarishini tartibli qilish",
        "Productionda",
        "Migration reja",
        "migration plan",
        `# migrate step in deploy pipeline`
      ),
      section(
        "13. Testing plan",
        "Unit va integration test reja",
        "Quality assurance uchun",
        "Capstone oldidan",
        "Test strategiya",
        "testing plan",
        `# CRUD, auth, permission, performance testlar`
      ),
      section(
        "14. Docs plan",
        "Documentation plan",
        "Frontend integratsiya uchun",
        "Capstone oldidan",
        "Docs strategiya",
        "docs plan",
        `# Swagger/Redoc bo'limlari`
      ),
      section(
        "15. Auth/permission plan",
        "Auth va permission dizayni",
        "Security uchun",
        "Capstone oldidan",
        "Auth policy",
        "auth plan",
        `# JWT + role-based permissions`
      ),
      section(
        "16. Performance plan",
        "Performance optimizatsiya reja",
        "N+1 va caching uchun",
        "Capstone oldidan",
        "Performance strategy",
        "performance plan",
        `# select_related/prefetch_related + cache`
      ),
      section(
        "17. Caching plan",
        "Cache strategiyasi",
        "Heavy endpointlar uchun",
        "Capstone oldidan",
        "Caching policy",
        "cache plan",
        `# list endpointlar uchun cache`
      ),
      section(
        "18. Monitoring plan",
        "Monitoring va alertlar",
        "Production uchun",
        "Capstone oldidan",
        "Monitoring strategy",
        "monitoring plan",
        `# Sentry + metrics`
      ),
      section(
        "19. Deployment plan",
        "Deploy bosqichlari",
        "Downtime minimallashtirish uchun",
        "Capstone oldidan",
        "Deploy strategy",
        "deploy plan",
        `# build -> migrate -> restart`
      ),
      section(
        "20. Timeline",
        "Milestone va timeline",
        "Projectni rejalash uchun",
        "Capstone oldidan",
        "Timeline",
        "timeline",
        `# Week1 models, Week2 API, Week3 docs/test`
      ),

    ],
  },
  60: {
    summary: "Capstone kuni: barcha DRF bilimlarini bitta real APIda yig'asiz. Modellar, serializerlar, viewsetlar, auth, docs, test va deploy jarayonini yakunlaysiz.",
    goals: [
      "Capstone API arxitekturasini yakunlash",
      "CRUD, auth, permissions, docs va testlarni integratsiya qilish",
      "Performance va deploy checklistni yopish",
    ],
    sections: [
      section(
        "01. Project scaffolding",
        "Capstone uchun yangi app va papkalar",
        "Tartibli kod bazasi uchun",
        "Loyiha startida",
        "Strukturani yaratish",
        "scaffold",
        `python manage.py startapp api`
      ),
      section(
        "02. Env configuration",
        "Production-ready env sozlamalar",
        "Security va config ajratish uchun",
        "Deploydan oldin",
        "Env configni boshqarish",
        "env config",
        `DEBUG=False\nSECRET_KEY=your-secret\nALLOWED_HOSTS=api.example.com`
      ),
      section(
        "03. Core models",
        "Asosiy entity modellarini yozish",
        "DB schema to'g'ri bo'lishi uchun",
        "Capstone boshida",
        "Model struktura",
        "models",
        `class Product(models.Model):\n    title = models.CharField(max_length=200)\n    price = models.DecimalField(max_digits=8, decimal_places=2)`
      ),
      section(
        "04. Migrations + admin",
        "Modellarni migrate qilish va admin sozlash",
        "DB va admin nazorat uchun",
        "Model yozilgandan keyin",
        "Migratsiya va admin",
        "migrations",
        `python manage.py makemigrations\npython manage.py migrate`
      ),
      section(
        "05. Serializer contracts",
        "Input/output formatini aniqlash",
        "Frontend bilan contract uchun",
        "API dizaynida",
        "Serializer yozish",
        "serializer",
        `class ProductSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Product\n        fields = ['id', 'title', 'price']`
      ),
      section(
        "06. ViewSet CRUD",
        "CRUD endpointlarni ViewSetda yozish",
        "Minimal kod bilan API qurish uchun",
        "CRUD kerak bo'lsa",
        "ViewSet ishlatish",
        "viewset",
        `class ProductViewSet(ModelViewSet):\n    queryset = Product.objects.all()\n    serializer_class = ProductSerializer`
      ),
      section(
        "07. Router setup",
        "Router bilan URLlarni avtomatik yaratish",
        "URL boilerplate kamaytirish uchun",
        "ViewSet ishlatilganda",
        "Router ulash",
        "router",
        `router = DefaultRouter()\nrouter.register('products', ProductViewSet)\nurlpatterns = router.urls`
      ),
      section(
        "08. Permissions",
        "Role va permissionlarni belgilash",
        "Security uchun",
        "Protected endpointlarda",
        "Permission policy",
        "permissions",
        `permission_classes = [IsAuthenticated]`
      ),
      section(
        "09. JWT auth",
        "JWT login/refresh endpointlar",
        "Stateless auth uchun",
        "Mobile/SPA clientlarda",
        "JWT flow",
        "jwt",
        `path('api/token/', TokenObtainPairView.as_view())`
      ),
      section(
        "10. Filtering & search",
        "Filter va search qo'shish",
        "User data topishi uchun",
        "List endpointlarda",
        "Filtering",
        "filtering",
        `filter_backends = [SearchFilter, OrderingFilter]\nsearch_fields = ['title']`
      ),
      section(
        "11. Pagination",
        "Pagination bilan listni boshqarish",
        "Performance va UX uchun",
        "List endpointlarda",
        "Pagination qo'llash",
        "pagination",
        `pagination_class = PageNumberPagination`
      ),
      section(
        "12. Throttling",
        "Rate limit bilan abuse'ni cheklash",
        "Security uchun",
        "Public endpointlarda",
        "Throttling sozlash",
        "throttling",
        `throttle_classes = [UserRateThrottle]`
      ),
      section(
        "13. File uploads",
        "Fayl upload endpointlari",
        "Avatar yoki dokument kerak bo'lsa",
        "Upload funksiyada",
        "Multipart qo'llash",
        "uploads",
        `parser_classes = [MultiPartParser]\nfile = serializers.FileField()`
      ),
      section(
        "14. Caching",
        "Cache bilan tezlikni oshirish",
        "Heavy list endpointlarda",
        "Productionda",
        "Cache qo'llash",
        "cache",
        `@method_decorator(cache_page(60), name='list')`
      ),
      section(
        "15. N+1 optimization",
        "select_related/prefetch_related",
        "Query sonini kamaytirish uchun",
        "Nested serializerlarda",
        "Query optimizatsiya",
        "n+1",
        `queryset = Product.objects.select_related('category')`
      ),
      section(
        "16. Tests",
        "CRUD va auth testlarini yozish",
        "Regressionni oldini olish uchun",
        "API tayyor bo'lganda",
        "Test suite",
        "tests",
        `class ProductApiTests(APITestCase):\n    def test_list(self):\n        self.client.get('/api/products/')`
      ),
      section(
        "17. Docs",
        "OpenAPI schema va Swagger",
        "Integratsiya tezligi uchun",
        "Deploydan oldin",
        "API docs",
        "docs",
        `path('api/schema/', SpectacularAPIView.as_view())`
      ),
      section(
        "18. Deployment config",
        "DEBUG=False, ALLOWED_HOSTS, logging",
        "Production readiness uchun",
        "Deploydan oldin",
        "Deploy config",
        "deploy config",
        `DEBUG = False\nALLOWED_HOSTS = ['api.example.com']`
      ),
      section(
        "19. Monitoring",
        "Sentry va logging sozlash",
        "Xatolarni kuzatish uchun",
        "Productionda",
        "Monitoring",
        "monitoring",
        `sentry_sdk.init(dsn='...')`
      ),
      section(
        "20. Final checklist",
        "Release oldidan tekshiruvlar",
        "Bug va security muammolarini kamaytirish uchun",
        "Deploydan oldin",
        "QA checklist",
        "checklist",
        `# auth, permissions, tests, docs, performance`
      ),
    ],
  },
};
