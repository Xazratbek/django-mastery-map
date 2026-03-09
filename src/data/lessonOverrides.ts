import { LessonContent } from '../types/roadmap';
import { aiConfusionRadarLesson } from './lessonAiConfusionRadar';
import { drfLessonOverrides } from './drfLessonOverrides';

const baseLessonOverrides: Record<number, LessonContent> = {
  17: {
    summary: "Custom User - bu sizning loyihadagi foydalanuvchi modeli. Email login, telefon, rol, avatar kabi ehtiyoj bo'lsa default User yetmaydi. Eng muhimi - buni loyiha boshida tanlash.",
    goals: [
      "CustomUser modelini AbstractUser dan meros qilib yozish",
      "AUTH_USER_MODEL, USERNAME_FIELD va REQUIRED_FIELDS ni sozlash",
      "Admin, form va managerlarni moslab ishlatish",
      "get_user_model va settings.AUTH_USER_MODEL bilan xavfsiz bog'lanish"
    ],
    sections: [
      {
        title: "01. Custom User nima va qachon kerak",
        body: [
          "Default User umumiy ehtiyojlar uchun yetadi, lekin email login, telefon, rol, avatar kerak bo'lsa CustomUser shart.",
          "Eng muhim qoida: loyihaning boshida tanlang, keyin almashtirish qiyin."
        ],
        codeSamples: [
          {
            title: "get_user_model bilan ishlash",
            language: "python",
            code: "from django.contrib.auth import get_user_model\n\nUser = get_user_model()\n# Endi barcha joyda User deb ishlating"
          }
        ]
      },
      {
        title: "02. Users app yaratish",
        body: [
          "Custom user alohida appda bo'lsa tartibli bo'ladi.",
          "App nomi users/accounts bo'lishi mumkin."
        ],
        codeSamples: [
          {
            title: "startapp",
            language: "bash",
            code: "python manage.py startapp users\n# settings.py ichida INSTALLED_APPS ga 'users' qo'shing"
          }
        ]
      },
      {
        title: "03. AbstractUser dan meros olish",
        body: [
          "AbstractUser tayyor auth logikasi bilan keladi.",
          "Siz faqat kerakli fieldlarni qo'shasiz."
        ],
        codeSamples: [
          {
            title: "models.py",
            language: "python",
            code: "from django.contrib.auth.models import AbstractUser\nfrom django.db import models\n\nclass CustomUser(AbstractUser):\n    pass"
          }
        ]
      },
      {
        title: "04. Emailni asosiy login qilish",
        body: [
          "Email unique bo'lishi va USERNAME_FIELD sifatida berilishi kerak.",
          "username ni olib tashlash uchun username = None qilinadi."
        ],
        codeSamples: [
          {
            title: "email login",
            language: "python",
            code: "from django.contrib.auth.models import AbstractUser\nfrom django.db import models\n\nclass CustomUser(AbstractUser):\n    username = None\n    email = models.EmailField(unique=True)\n\n    USERNAME_FIELD = 'email'\n    REQUIRED_FIELDS = []"
          }
        ]
      },
      {
        title: "05. REQUIRED_FIELDS ni to'g'ri berish",
        body: [
          "createsuperuser shu ro'yxatdan so'raydi.",
          "USERNAME_FIELD bu ro'yxatga kiritilmaydi."
        ],
        codeSamples: [
          {
            title: "required fields",
            language: "python",
            code: "class CustomUser(AbstractUser):\n    USERNAME_FIELD = 'email'\n    REQUIRED_FIELDS = ['first_name', 'last_name']"
          }
        ]
      },
      {
        title: "06. CustomUserManager yozish",
        body: [
          "create_user va create_superuser email bilan ishlashi uchun manager kerak.",
          "Normalize va validationni shu yerda qiling."
        ],
        codeSamples: [
          {
            title: "manager",
            language: "python",
            code: "from django.contrib.auth.models import UserManager\n\nclass CustomUserManager(UserManager):\n    def create_user(self, email, password=None, **extra_fields):\n        if not email:\n            raise ValueError('Email shart')\n        email = self.normalize_email(email)\n        return super().create_user(email=email, password=password, **extra_fields)\n\nclass CustomUser(AbstractUser):\n    objects = CustomUserManager()"
          }
        ]
      },
      {
        title: "07. AUTH_USER_MODEL ni settings.py ga yozish",
        body: [
          "Bu satr birinchi migratsiyadan oldin turishi shart.",
          "Keyin o'zgartirish katta refactor talab qiladi."
        ],
        codeSamples: [
          {
            title: "settings.py",
            language: "python",
            code: "# settings.py\nAUTH_USER_MODEL = 'users.CustomUser'"
          }
        ]
      },
      {
        title: "08. Admin panelni moslash",
        body: [
          "Admin listda email ko'rinishi kerak.",
          "fieldsets orqali yangi fieldlarni qo'shasiz."
        ],
        codeSamples: [
          {
            title: "admin.py",
            language: "python",
            code: "from django.contrib import admin\nfrom django.contrib.auth.admin import UserAdmin\nfrom .models import CustomUser\n\n@admin.register(CustomUser)\nclass CustomUserAdmin(UserAdmin):\n    model = CustomUser\n    list_display = ('email', 'is_staff', 'is_active')\n    ordering = ('email',)"
          }
        ]
      },
      {
        title: "09. Migratsiya tartibi",
        body: [
          "Custom user bor loyihada dastlab users app migratsiyasi bo'ladi.",
          "Eski DB bo'lsa qayta boshlash osonroq."
        ],
        codeSamples: [
          {
            title: "migrate",
            language: "bash",
            code: "python manage.py makemigrations users\npython manage.py migrate"
          }
        ]
      },
      {
        title: "10. ForeignKey uchun settings.AUTH_USER_MODEL",
        body: [
          "Hard-coded User ga bog'lanmang.",
          "Swappable model muammosini oldini oladi."
        ],
        codeSamples: [
          {
            title: "relations",
            language: "python",
            code: "from django.conf import settings\nfrom django.db import models\n\nclass Profile(models.Model):\n    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)"
          }
        ]
      },
      {
        title: "11. get_user_model bilan servis yozish",
        body: [
          "View yoki service ichida to'g'ri modelni olasiz.",
          "Bu sizni import muammosidan qutqaradi."
        ],
        codeSamples: [
          {
            title: "service",
            language: "python",
            code: "from django.contrib.auth import get_user_model\n\nUser = get_user_model()\n\ndef create_customer(email):\n    return User.objects.create_user(email=email, password='Temp1234!')"
          }
        ]
      },
      {
        title: "12. Qo'shimcha fieldlar qo'shish",
        body: [
          "Telefon, avatar, bio kabi fieldlar shu yerda bo'ladi.",
          "blank/null ni biznes talabga ko'ra belgilang."
        ],
        codeSamples: [
          {
            title: "extra fields",
            language: "python",
            code: "from django.db import models\nfrom django.contrib.auth.models import AbstractUser\n\nclass CustomUser(AbstractUser):\n    username = None\n    email = models.EmailField(unique=True)\n    phone = models.CharField(max_length=20, blank=True)\n    avatar = models.ImageField(upload_to='avatars/', blank=True)\n    bio = models.TextField(blank=True)\n\n    USERNAME_FIELD = 'email'\n    REQUIRED_FIELDS = []"
          }
        ]
      },
      {
        title: "13. CustomUserCreationForm",
        body: [
          "Admin yoki signup form modelni bilishi kerak.",
          "UserCreationForm ni override qiling."
        ],
        codeSamples: [
          {
            title: "forms.py",
            language: "python",
            code: "from django.contrib.auth.forms import UserCreationForm\nfrom .models import CustomUser\n\nclass CustomUserCreationForm(UserCreationForm):\n    class Meta(UserCreationForm.Meta):\n        model = CustomUser\n        fields = ('email',)"
          }
        ]
      },
      {
        title: "14. CustomUserChangeForm",
        body: [
          "Userni edit qilish formi ham CustomUser ga mos bo'lishi kerak.",
          "Admin classda formlarni ulang."
        ],
        codeSamples: [
          {
            title: "change form",
            language: "python",
            code: "from django.contrib.auth.forms import UserChangeForm\nfrom .models import CustomUser\n\nclass CustomUserChangeForm(UserChangeForm):\n    class Meta(UserChangeForm.Meta):\n        model = CustomUser\n        fields = ('email', 'first_name', 'last_name', 'is_active')"
          }
        ]
      },
      {
        title: "15. Email bilan authenticate",
        body: [
          "Django backend USERNAME_FIELD ga mos ishlaydi.",
          "authenticate(email=..., password=...) bilan ishlaysiz."
        ],
        codeSamples: [
          {
            title: "authenticate",
            language: "python",
            code: "from django.contrib.auth import authenticate\n\nuser = authenticate(request, email='demo@example.com', password='Secret123')"
          }
        ]
      },
      {
        title: "16. Parolni set_password bilan yozish",
        body: [
          "Parol plain text bo'lib qolmasligi kerak.",
          "set_password hash qiladi, check_password tekshiradi."
        ],
        codeSamples: [
          {
            title: "password",
            language: "python",
            code: "user.set_password('Secret123')\nuser.save()\n\nis_ok = user.check_password('Secret123')"
          }
        ]
      },
      {
        title: "17. Email uchun constraint",
        body: [
          "unique email DB darajasida himoya bo'ladi.",
          "Constraint bilan bu aniq bo'ladi."
        ],
        codeSamples: [
          {
            title: "constraint",
            language: "python",
            code: "from django.db import models\n\nclass Meta:\n    constraints = [\n        models.UniqueConstraint(fields=['email'], name='uniq_customuser_email')\n    ]"
          }
        ]
      },
      {
        title: "18. Profile signal",
        body: [
          "Agar profil alohida model bo'lsa, user yaratilganda auto yaratish mumkin.",
          "Signalni ehtiyotkorlik bilan ishlating."
        ],
        codeSamples: [
          {
            title: "signals.py",
            language: "python",
            code: "from django.contrib.auth import get_user_model\nfrom django.db.models.signals import post_save\nfrom django.dispatch import receiver\nfrom .models import Profile\n\nUser = get_user_model()\n\n@receiver(post_save, sender=User)\ndef create_profile(sender, instance, created, **kwargs):\n    if created:\n        Profile.objects.create(user=instance)"
          }
        ]
      },
      {
        title: "19. Custom user test",
        body: [
          "create_user email bilan yaratishini test qiling.",
          "Bu keyingi refactorlarda xatoni ushlaydi."
        ],
        codeSamples: [
          {
            title: "tests.py",
            language: "python",
            code: "from django.test import TestCase\nfrom django.contrib.auth import get_user_model\n\nUser = get_user_model()\n\nclass UserTest(TestCase):\n    def test_create_user(self):\n        user = User.objects.create_user(email='a@b.com', password='pass1234')\n        self.assertEqual(user.email, 'a@b.com')"
          }
        ]
      },
      {
        title: "20. Mavjud data bo'lsa eksport",
        body: [
          "Eski DB bo'lsa export/import qiling yoki yangi DB oching.",
          "dumpdata/loaddata minimal yo'l."
        ],
        codeSamples: [
          {
            title: "dumpdata",
            language: "bash",
            code: "python manage.py dumpdata auth.user --indent 2 > users.json\npython manage.py loaddata users.json"
          }
        ]
      }
    ]
  },
  18: {
    summary: "Middleware - request va response orasidagi gatekeeper. U global qoidalarni bir joyda yozish imkonini beradi: log, auth, bloklash, header. Tartib muhim va har bir request shu zanjirdan o'tadi.",
    goals: [
      "Middleware siklini tushunish",
      "Custom middleware yozish",
      "Request va response ni boshqarish",
      "Order, test va performance qoidalarini bilish"
    ],
    sections: [
      {
        title: "01. Middleware zanjiri va tartib",
        body: [
          "Request MIDDLEWARE ro'yxati bo'ylab ketma-ket o'tadi.",
          "Tartib muhim, yuqoridagi middleware birinchi ishlaydi."
        ],
        codeSamples: [
          {
            title: "settings.py",
            language: "python",
            code: "MIDDLEWARE = [\n    'django.middleware.security.SecurityMiddleware',\n    'django.contrib.sessions.middleware.SessionMiddleware',\n    'django.contrib.auth.middleware.AuthenticationMiddleware',\n    'core.middleware.RequestLogMiddleware',\n]"
          }
        ]
      },
      {
        title: "02. Function-based middleware skeleti",
        body: [
          "get_response kiradi va response qaytarilishi shart.",
          "Bu eng sodda shakl."
        ],
        codeSamples: [
          {
            title: "middleware.py",
            language: "python",
            code: "def simple_middleware(get_response):\n    def middleware(request):\n        response = get_response(request)\n        return response\n    return middleware"
          }
        ]
      },
      {
        title: "03. Class-based middleware skeleti",
        body: [
          "Class ko'proq holatda ishlatiladi.",
          "State saqlash oson."
        ],
        codeSamples: [
          {
            title: "class middleware",
            language: "python",
            code: "class SimpleMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "04. __call__ ichida request/response",
        body: [
          "Request kirganda va response chiqanda bir joyda nazorat bo'ladi.",
          "Log yoki header qo'shish uchun qulay."
        ],
        codeSamples: [
          {
            title: "trace",
            language: "python",
            code: "class TraceMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        print('request in')\n        response = self.get_response(request)\n        print('response out')\n        return response"
          }
        ]
      },
      {
        title: "05. Request vaqtini o'lchash",
        body: [
          "Performance monitoring uchun timer qo'yiladi.",
          "Sekin endpointlarni topishga yordam beradi."
        ],
        codeSamples: [
          {
            title: "timing",
            language: "python",
            code: "import time\n\nclass TimingMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        start = time.time()\n        response = self.get_response(request)\n        duration = time.time() - start\n        print(f'duration={duration:.3f}s')\n        return response"
          }
        ]
      },
      {
        title: "06. Request ID qo'shish",
        body: [
          "Har so'rovga unikal id berilsa loglarda qidirish oson.",
          "Response header orqali qaytariladi."
        ],
        codeSamples: [
          {
            title: "request id",
            language: "python",
            code: "import uuid\n\nclass RequestIdMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        request.request_id = str(uuid.uuid4())\n        response = self.get_response(request)\n        response['X-Request-ID'] = request.request_id\n        return response"
          }
        ]
      },
      {
        title: "07. IP bloklash",
        body: [
          "Qora ro'yxatdagi IP larni viewga kiritmang.",
          "Middleware darajasida to'xtatish tez."
        ],
        codeSamples: [
          {
            title: "ip block",
            language: "python",
            code: "from django.http import JsonResponse\n\nBLOCKED = {'10.0.0.1', '10.0.0.2'}\n\nclass BlockIpMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        ip = request.META.get('REMOTE_ADDR')\n        if ip in BLOCKED:\n            return JsonResponse({'detail': 'Blocked'}, status=403)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "08. Maintenance mode",
        body: [
          "Texnik ish paytida hamma requestni 503 bilan qaytarasiz.",
          "Flag settingsdan o'qiladi."
        ],
        codeSamples: [
          {
            title: "maintenance",
            language: "python",
            code: "from django.conf import settings\nfrom django.http import JsonResponse\n\nclass MaintenanceMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if getattr(settings, 'MAINTENANCE_MODE', False):\n            return JsonResponse({'detail': 'Maintenance'}, status=503)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "09. Healthcheck short-circuit",
        body: [
          "Monitoring uchun /health tez javob berishi kerak.",
          "Middleware bu endpointni tez qaytaradi."
        ],
        codeSamples: [
          {
            title: "health",
            language: "python",
            code: "from django.http import JsonResponse\n\nclass HealthMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if request.path == '/health':\n            return JsonResponse({'status': 'ok'})\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "10. Response header qo'shish",
        body: [
          "Security yoki tracing headerlarni global qo'shasiz.",
          "Buni viewda yozish shart emas."
        ],
        codeSamples: [
          {
            title: "headers",
            language: "python",
            code: "class HeaderMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        response = self.get_response(request)\n        response['X-Frame-Options'] = 'DENY'\n        return response"
          }
        ]
      },
      {
        title: "11. Request size limit",
        body: [
          "Katta uploadlar serverni qiynaydi.",
          "CONTENT_LENGTH ni tekshirib bloklang."
        ],
        codeSamples: [
          {
            title: "size check",
            language: "python",
            code: "from django.http import HttpResponse\n\nclass SizeLimitMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        size = int(request.META.get('CONTENT_LENGTH') or 0)\n        if size > 5 * 1024 * 1024:\n            return HttpResponse('Too large', status=413)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "12. Login talab qiluvchi middleware",
        body: [
          "Ba'zi saytlar faqat login bo'lsa ishlaydi.",
          "Allowlist pathlar bilan login va adminni ochiq qoldiring."
        ],
        codeSamples: [
          {
            title: "login required",
            language: "python",
            code: "from django.shortcuts import redirect\n\nALLOWED = {'/login', '/admin'}\n\nclass LoginRequiredMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if not request.user.is_authenticated and request.path not in ALLOWED:\n            return redirect('/login')\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "13. Locale va timezone",
        body: [
          "User tilini headerdan olib ishlatish mumkin.",
          "translation.activate va timezone.activate foydali."
        ],
        codeSamples: [
          {
            title: "locale",
            language: "python",
            code: "from django.utils import translation, timezone\n\nclass LocaleMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        lang = request.META.get('HTTP_ACCEPT_LANGUAGE', 'en')\n        translation.activate(lang)\n        timezone.activate('UTC')\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "14. Exception tutish",
        body: [
          "Xato bo'lsa logga yozib userga soddaroq javob qaytaring.",
          "try/except block shu yerda."
        ],
        codeSamples: [
          {
            title: "exception",
            language: "python",
            code: "import logging\nfrom django.http import JsonResponse\n\nlogger = logging.getLogger(__name__)\n\nclass SafeMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        try:\n            return self.get_response(request)\n        except Exception as exc:\n            logger.exception('middleware error')\n            return JsonResponse({'detail': 'Server error'}, status=500)"
          }
        ]
      },
      {
        title: "15. Middleware order misoli",
        body: [
          "Security -> Session -> Auth tartibi ko'p ishlatiladi.",
          "O'zingizning middleware ni qayerga qo'yish muhim."
        ],
        codeSamples: [
          {
            title: "order",
            language: "python",
            code: "MIDDLEWARE = [\n    'django.middleware.security.SecurityMiddleware',\n    'django.contrib.sessions.middleware.SessionMiddleware',\n    'django.contrib.auth.middleware.AuthenticationMiddleware',\n    'core.middleware.MaintenanceMiddleware',\n]"
          }
        ]
      },
      {
        title: "16. Path bo'yicha skip",
        body: [
          "Admin yoki static uchun middleware ni o'tkazib yuboring.",
          "Keraksiz ishni kamaytiradi."
        ],
        codeSamples: [
          {
            title: "skip path",
            language: "python",
            code: "class SkipAdminMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if request.path.startswith('/admin/'):\n            return self.get_response(request)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "17. Streaming response ehtiyot",
        body: [
          "Streaming response ni body qilib o'qib yubormang.",
          "streaming flag bilan tekshiring."
        ],
        codeSamples: [
          {
            title: "streaming",
            language: "python",
            code: "class StreamingGuardMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        response = self.get_response(request)\n        if getattr(response, 'streaming', False):\n            return response\n        return response"
          }
        ]
      },
      {
        title: "18. Minimal logika qoidasi",
        body: [
          "Middleware eng tez ishlashi kerak.",
          "Og'ir querylarni viewga qoldiring."
        ],
        codeSamples: [
          {
            title: "early return",
            language: "python",
            code: "class LightMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if request.method != 'GET':\n            return self.get_response(request)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "19. Feature flag bilan yoqish/o'chirish",
        body: [
          "Settings flag bo'lsa middleware tez o'chadi.",
          "Prod va testda farq qilish oson."
        ],
        codeSamples: [
          {
            title: "feature flag",
            language: "python",
            code: "from django.conf import settings\n\nclass ToggleMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        if not getattr(settings, 'ENABLE_REQUEST_LOG', True):\n            return self.get_response(request)\n        return self.get_response(request)"
          }
        ]
      },
      {
        title: "20. Test qilish",
        body: [
          "RequestFactory bilan middleware ni unit test qiling.",
          "Bu regressiyani ushlaydi."
        ],
        codeSamples: [
          {
            title: "test",
            language: "python",
            code: "from django.test import RequestFactory\n\nfactory = RequestFactory()\nrequest = factory.get('/health')\nresponse = HealthMiddleware(lambda r: None)(request)\nassert response.status_code == 200"
          }
        ]
      }
    ]
  },
  19: {
    summary: "N+1 muammo - ko'p so'rov yuborish oqibatida API sekinlashishi. select_related va prefetch_related bilan kerakli ma'lumotlarni oldindan yuklab, 1-2 ta SQL bilan yakunlaysiz.",
    goals: [
      "N+1 muammosini aniqlash",
      "select_related va prefetch_related farqini bilish",
      "Prefetch va to_attr bilan optimizatsiya qilish",
      "Querylarni o'lchab baholash"
    ],
    sections: [
      {
        title: "01. N+1 muammo nimadan chiqadi",
        body: [
          "Loop ichida foreign key chaqirilsa, har bir obyekt uchun alohida SQL ketadi.",
          "Bu 1 ta list uchun 101 ta so'rovga aylanishi mumkin."
        ],
        codeSamples: [
          {
            title: "bad query",
            language: "python",
            code: "books = Book.objects.all()\nfor book in books:\n    print(book.author.name)  # N+1"
          }
        ]
      },
      {
        title: "02. select_related bilan FK",
        body: [
          "ForeignKey va OneToOne uchun select_related ishlatiladi.",
          "SQL JOIN qilib bitta so'rovga tushiradi."
        ],
        codeSamples: [
          {
            title: "select_related",
            language: "python",
            code: "books = Book.objects.select_related('author').all()\nfor book in books:\n    print(book.author.name)"
          }
        ]
      },
      {
        title: "03. OneToOne relation",
        body: [
          "OneToOne ham select_related bilan ishlaydi.",
          "Profil va user kabi bog'lanishlarda juda foydali."
        ],
        codeSamples: [
          {
            title: "one to one",
            language: "python",
            code: "profiles = Profile.objects.select_related('user').all()\nfor profile in profiles:\n    print(profile.user.email)"
          }
        ]
      },
      {
        title: "04. Bir nechta qatlamli select_related",
        body: [
          "author__profile kabi chain bilan chuqur ketishingiz mumkin.",
          "Bu ham bitta SQL bo'ladi."
        ],
        codeSamples: [
          {
            title: "chain",
            language: "python",
            code: "orders = Order.objects.select_related('user__profile').all()"
          }
        ]
      },
      {
        title: "05. prefetch_related M2M uchun",
        body: [
          "ManyToMany relation uchun select_related ishlamaydi.",
          "prefetch_related alohida so'rov yuborib, xotirada bog'laydi."
        ],
        codeSamples: [
          {
            title: "prefetch m2m",
            language: "python",
            code: "books = Book.objects.prefetch_related('tags').all()\nfor book in books:\n    print([t.name for t in book.tags.all()])"
          }
        ]
      },
      {
        title: "06. Reverse FK uchun prefetch",
        body: [
          "Author -> Book kabi teskari bog'lanishda ham prefetch ishlatiladi.",
          "related_name bo'lsa o'sha nom bilan chaqirasiz."
        ],
        codeSamples: [
          {
            title: "reverse prefetch",
            language: "python",
            code: "authors = Author.objects.prefetch_related('books').all()\nfor author in authors:\n    print(author.books.count())"
          }
        ]
      },
      {
        title: "07. Prefetch bilan filter",
        body: [
          "Prefetch obyektiga queryset berib, kerakli qismini olasiz.",
          "Masalan faqat public commentlar."
        ],
        codeSamples: [
          {
            title: "prefetch queryset",
            language: "python",
            code: "from django.db.models import Prefetch\n\nqs = Comment.objects.filter(is_public=True)\nposts = Post.objects.prefetch_related(Prefetch('comments', queryset=qs))"
          }
        ]
      },
      {
        title: "08. to_attr bilan natijani saqlash",
        body: [
          "Prefetch natijasini comments o'rniga boshqa nom bilan saqlashingiz mumkin.",
          "Bu default managerni buzmasdan ishlatishga yordam beradi."
        ],
        codeSamples: [
          {
            title: "to_attr",
            language: "python",
            code: "from django.db.models import Prefetch\n\npublic = Comment.objects.filter(is_public=True)\nposts = Post.objects.prefetch_related(\n    Prefetch('comments', queryset=public, to_attr='public_comments')\n)"
          }
        ]
      },
      {
        title: "09. only/defer bilan keraksiz ustunlarni bermaslik",
        body: [
          "Keraksiz katta text fieldlarni olish resurs yeydi.",
          "only yoki defer bilan faqat kerakli ustunlarni oling."
        ],
        codeSamples: [
          {
            title: "only",
            language: "python",
            code: "books = Book.objects.only('id', 'title')"
          }
        ]
      },
      {
        title: "10. values bilan minimal data",
        body: [
          "Agar sizga model metodlari kerak bo'lmasa values ishlating.",
          "Bu tezroq va yengilroq."
        ],
        codeSamples: [
          {
            title: "values",
            language: "python",
            code: "data = Book.objects.values('id', 'title')"
          }
        ]
      },
      {
        title: "11. select_related + prefetch birga",
        body: [
          "Bir queryda FK, ikkinchisida M2M ni yig'ish mumkin.",
          "Katta listlarda foydali."
        ],
        codeSamples: [
          {
            title: "combo",
            language: "python",
            code: "orders = Order.objects.select_related('user').prefetch_related('items')"
          }
        ]
      },
      {
        title: "12. Prefetch ichida select_related",
        body: [
          "Prefetch querysetida ham select_related ishlatish mumkin.",
          "Bu nested optimizatsiya beradi."
        ],
        codeSamples: [
          {
            title: "prefetch + select_related",
            language: "python",
            code: "from django.db.models import Prefetch\n\nitem_qs = OrderItem.objects.select_related('product')\norders = Order.objects.prefetch_related(Prefetch('items', queryset=item_qs))"
          }
        ]
      },
      {
        title: "13. M2M uchun select_related emas",
        body: [
          "ManyToMany da select_related yozilsa foyda bermaydi.",
          "Doim prefetch_related ishlating."
        ],
        codeSamples: [
          {
            title: "correct m2m",
            language: "python",
            code: "books = Book.objects.prefetch_related('authors')"
          }
        ]
      },
      {
        title: "14. Query count o'lchash",
        body: [
          "Query sonini o'lchab natijani baholang.",
          "CaptureQueriesContext yordam beradi."
        ],
        codeSamples: [
          {
            title: "query count",
            language: "python",
            code: "from django.db import connection\nfrom django.test.utils import CaptureQueriesContext\n\nwith CaptureQueriesContext(connection) as ctx:\n    list(Book.objects.select_related('author'))\nprint(len(ctx))"
          }
        ]
      },
      {
        title: "15. Debug toolbar bilan ko'rish",
        body: [
          "django-debug-toolbar SQL sonini aniq ko'rsatadi.",
          "N+1 ni tez topasiz."
        ],
        codeSamples: [
          {
            title: "debug toolbar",
            language: "python",
            code: "INSTALLED_APPS += ['debug_toolbar']\nMIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware'] + MIDDLEWARE"
          }
        ]
      },
      {
        title: "16. Pagination bilan prefetch",
        body: [
          "Katta listni bo'lib olish kerak.",
          "Pagination + prefetch querylarni nazorat qiladi."
        ],
        codeSamples: [
          {
            title: "slice",
            language: "python",
            code: "page = Book.objects.prefetch_related('authors').order_by('id')[0:20]"
          }
        ]
      },
      {
        title: "17. Prefetchda faqat kerakli ustunlar",
        body: [
          "Prefetch querysetiga only qo'yib, memoryni tejang.",
          "Bu tezlikni oshiradi."
        ],
        codeSamples: [
          {
            title: "prefetch only",
            language: "python",
            code: "from django.db.models import Prefetch\n\nauthors_qs = Author.objects.only('id', 'name')\nbooks = Book.objects.prefetch_related(Prefetch('authors', queryset=authors_qs))"
          }
        ]
      },
      {
        title: "18. distinct bilan dublikatdan qochish",
        body: [
          "Ko'p joinlarda dublikat obyektlar chiqishi mumkin.",
          "distinct() bilan tozalang."
        ],
        codeSamples: [
          {
            title: "distinct",
            language: "python",
            code: "books = Book.objects.prefetch_related('authors').distinct()"
          }
        ]
      },
      {
        title: "19. iterator bilan memory nazorati",
        body: [
          "Katta datasetni iterator bilan oqish memoryni saqlaydi.",
          "Chunk size bilan ishlang."
        ],
        codeSamples: [
          {
            title: "iterator",
            language: "python",
            code: "for book in Book.objects.iterator(chunk_size=500):\n    print(book.id)"
          }
        ]
      },
      {
        title: "20. explain bilan SQL baholash",
        body: [
          "explain query planini ko'rsatadi.",
          "Yomon join yoki index yetishmasligini bilasiz."
        ],
        codeSamples: [
          {
            title: "explain",
            language: "python",
            code: "print(Book.objects.select_related('author').explain())"
          }
        ]
      }
    ]
  },
  20: {
    summary: "Index va query optimizatsiya - katta datasetda tezlikni ushlab qolish uchun kerak. Qaysi ustunga index qo'yish, qaysi queryni soddalashtirishni bilsangiz API tez bo'ladi.",
    goals: [
      "Index turlarini tushunish",
      "Composite va partial indexlar bilan ishlash",
      "explain orqali queryni baholash",
      "Query optimizatsiya usullarini qo'llash"
    ],
    sections: [
      {
        title: "01. Bitta ustunga index",
        body: [
          "Ko'p filter qilinadigan ustunlarga index qo'yiladi.",
          "Bu qidiruvni tezlashtiradi."
        ],
        codeSamples: [
          {
            title: "db_index",
            language: "python",
            code: "class Book(models.Model):\n    isbn = models.CharField(max_length=13, db_index=True)"
          }
        ]
      },
      {
        title: "02. unique ham index yaratadi",
        body: [
          "unique=True qo'yilsa, DB avtomatik index yaratadi.",
          "Bu faqat unikal bo'lishni ham nazorat qiladi."
        ],
        codeSamples: [
          {
            title: "unique",
            language: "python",
            code: "email = models.EmailField(unique=True)"
          }
        ]
      },
      {
        title: "03. Composite index",
        body: [
          "Bir nechta ustun birga filter qilinsa composite index kerak.",
          "status+created_at kabi kombinatsiyalar tezlashadi."
        ],
        codeSamples: [
          {
            title: "composite",
            language: "python",
            code: "class Meta:\n    indexes = [\n        models.Index(fields=['status', 'created_at'], name='order_status_created_idx')\n    ]"
          }
        ]
      },
      {
        title: "04. Ordering bilan birga index",
        body: [
          "Ko'p order_by qilinadigan ustun ham index talab qiladi.",
          "Bu paginationda ham foyda beradi."
        ],
        codeSamples: [
          {
            title: "ordering index",
            language: "python",
            code: "class Meta:\n    ordering = ['-created_at']\n    indexes = [models.Index(fields=['created_at'], name='order_created_idx')]"
          }
        ]
      },
      {
        title: "05. index_together (legacy)",
        body: [
          "Eski loyihalarda index_together uchraydi.",
          "Yangi loyihalarda Meta.indexes afzal."
        ],
        codeSamples: [
          {
            title: "index_together",
            language: "python",
            code: "class Meta:\n    index_together = [('user', 'created_at')]"
          }
        ]
      },
      {
        title: "06. Partial index",
        body: [
          "Faqat ma'lum holat uchun index kerak bo'lsa partial index ishlatiladi.",
          "Masalan is_active=True bo'lganlar uchun."
        ],
        codeSamples: [
          {
            title: "partial",
            language: "python",
            code: "from django.db.models import Q\n\nclass Meta:\n    indexes = [\n        models.Index(fields=['user'], name='active_user_idx', condition=Q(is_active=True))\n    ]"
          }
        ]
      },
      {
        title: "07. Functional index",
        body: [
          "Lower(email) kabi funksiyaga index qo'yish mumkin.",
          "Case-insensitive qidiruvda foydali."
        ],
        codeSamples: [
          {
            title: "lower index",
            language: "python",
            code: "from django.db.models.functions import Lower\n\nclass Meta:\n    indexes = [models.Index(Lower('email'), name='lower_email_idx')]"
          }
        ]
      },
      {
        title: "08. GIN index (JSON/Array)",
        body: [
          "Postgres JSONField yoki ArrayField uchun GIN index kerak bo'ladi.",
          "Katta JSON qidiruvini tezlashtiradi."
        ],
        codeSamples: [
          {
            title: "gin index",
            language: "python",
            code: "from django.contrib.postgres.indexes import GinIndex\n\nclass Meta:\n    indexes = [GinIndex(fields=['data'])]"
          }
        ]
      },
      {
        title: "09. explain bilan baholash",
        body: [
          "explain query planini ko'rsatadi.",
          "Index ishlayaptimi yo'qmi shundan ko'rinadi."
        ],
        codeSamples: [
          {
            title: "explain",
            language: "python",
            code: "qs = Order.objects.filter(status='paid')\nprint(qs.explain())"
          }
        ]
      },
      {
        title: "10. exists vs count",
        body: [
          "Faqat bor-yo'qligini bilish uchun exists() tezroq.",
          "count() butun jadvalni sanashi mumkin."
        ],
        codeSamples: [
          {
            title: "exists",
            language: "python",
            code: "has_orders = Order.objects.filter(user=user).exists()"
          }
        ]
      },
      {
        title: "11. values_list bilan minimal ustunlar",
        body: [
          "Kerakli faqat id bo'lsa values_list ishlating.",
          "Model obyektini yaratmaydi."
        ],
        codeSamples: [
          {
            title: "values_list",
            language: "python",
            code: "ids = Order.objects.filter(status='paid').values_list('id', flat=True)"
          }
        ]
      },
      {
        title: "12. bulk_create katta insert uchun",
        body: [
          "Ko'p obyektni bittalab saqlash sekin.",
          "bulk_create bir so'rov bilan yuboradi."
        ],
        codeSamples: [
          {
            title: "bulk_create",
            language: "python",
            code: "Book.objects.bulk_create([\n    Book(title='A'),\n    Book(title='B'),\n])"
          }
        ]
      },
      {
        title: "13. update vs save",
        body: [
          "Birgina fieldni o'zgartirish uchun update tezroq.",
          "save() qo'shimcha logika va signal ishlatadi."
        ],
        codeSamples: [
          {
            title: "update",
            language: "python",
            code: "Order.objects.filter(id=order_id).update(status='paid')"
          }
        ]
      },
      {
        title: "14. select_related bilan join",
        body: [
          "FK aloqalarida join qilish N+1 ni yo'q qiladi.",
          "Bu ham optimizatsiya qoidalaridan biri."
        ],
        codeSamples: [
          {
            title: "select_related",
            language: "python",
            code: "Order.objects.select_related('user').filter(status='paid')"
          }
        ]
      },
      {
        title: "15. prefetch_related M2M uchun",
        body: [
          "ManyToMany relationda prefetch kerak.",
          "Alohida query, keyin xotirada birlashtirish."
        ],
        codeSamples: [
          {
            title: "prefetch_related",
            language: "python",
            code: "Book.objects.prefetch_related('authors')"
          }
        ]
      },
      {
        title: "16. only/defer bilan payload kamaytirish",
        body: [
          "Katta text yoki JSON fieldlarni bermang.",
          "Faol ishlatiladigan ustunlarni oling."
        ],
        codeSamples: [
          {
            title: "only",
            language: "python",
            code: "Book.objects.only('id', 'title')"
          }
        ]
      },
      {
        title: "17. F expression bilan tez update",
        body: [
          "SQL ichida hisoblab update qilinsa tezroq va xavfsizroq.",
          "Race condition kamayadi."
        ],
        codeSamples: [
          {
            title: "F expression",
            language: "python",
            code: "from django.db.models import F\n\nProduct.objects.filter(id=1).update(stock=F('stock') - 1)"
          }
        ]
      },
      {
        title: "18. Keraksiz indexni o'chirish",
        body: [
          "Har bir index write tezligini sekinlashtiradi.",
          "Keraksiz joyda db_index=False qo'yish mumkin."
        ],
        codeSamples: [
          {
            title: "db_index false",
            language: "python",
            code: "user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=False)"
          }
        ]
      },
      {
        title: "19. Pagination bilan tartib",
        body: [
          "Order_by bo'lmasa pagination natijasi chalkash bo'lishi mumkin.",
          "Indeksli ustun bo'yicha tartiblang."
        ],
        codeSamples: [
          {
            title: "pagination",
            language: "python",
            code: "page = Book.objects.order_by('id')[offset:offset + 20]"
          }
        ]
      },
      {
        title: "20. Migrations orqali AddIndex",
        body: [
          "Mavjud jadvalga index qo'shish migration orqali bo'ladi.",
          "Bu prod DB da xavfsizroq."
        ],
        codeSamples: [
          {
            title: "AddIndex",
            language: "python",
            code: "from django.db import migrations, models\n\nclass Migration(migrations.Migration):\n    operations = [\n        migrations.AddIndex(\n            model_name='book',\n            index=models.Index(fields=['title'], name='book_title_idx'),\n        ),\n    ]"
          }
        ]
      }
    ]
  },
  21: {
    summary: "Transaction - bir nechta DB o'zgarishlarini bitta mantiqiy blokda bajarish. Xato bo'lsa hammasi rollback bo'ladi va data buzilmaydi.",
    goals: [
      "transaction.atomic bilan ishlash",
      "Rollback va savepointlarni tushunish",
      "select_for_update va on_commit qo'llash",
      "Deadlock va xatolarni boshqarish"
    ],
    sections: [
      {
        title: "01. Autocommit holati",
        body: [
          "Django default holatda har bir so'rovni autocommit qiladi.",
          "Transaction ishlatganda bu vaqtinchalik o'chadi."
        ],
        codeSamples: [
          {
            title: "autocommit",
            language: "python",
            code: "from django.db import transaction\n\nis_auto = transaction.get_autocommit()"
          }
        ]
      },
      {
        title: "02. atomic blok",
        body: [
          "with transaction.atomic() ichida hamma o'zgarishlar bitta blok bo'ladi.",
          "Xato bo'lsa hammasi rollback qilinadi."
        ],
        codeSamples: [
          {
            title: "atomic block",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    order.save()\n    payment.save()"
          }
        ]
      },
      {
        title: "03. atomic decorator",
        body: [
          "Funksiyani transaction bilan o'rash uchun decorator ishlatiladi.",
          "Service layer uchun qulay."
        ],
        codeSamples: [
          {
            title: "atomic decorator",
            language: "python",
            code: "from django.db import transaction\n\n@transaction.atomic\ndef create_order(user, items):\n    order = Order.objects.create(user=user)\n    OrderItem.objects.bulk_create(items)\n    return order"
          }
        ]
      },
      {
        title: "04. Nested atomic va savepoint",
        body: [
          "Ichma-ich atomic ishlatilsa savepoint yaratiladi.",
          "Ichki blok xato bo'lsa, tashqi blok davom etishi mumkin."
        ],
        codeSamples: [
          {
            title: "nested",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    Order.objects.create()\n    with transaction.atomic():\n        Payment.objects.create()"
          }
        ]
      },
      {
        title: "05. set_rollback qo'lda",
        body: [
          "Ba'zan xato bo'lmasa ham rollback qilish kerak bo'ladi.",
          "transaction.set_rollback(True) ishlatiladi."
        ],
        codeSamples: [
          {
            title: "set_rollback",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    Order.objects.create()\n    transaction.set_rollback(True)"
          }
        ]
      },
      {
        title: "06. select_for_update bilan lock",
        body: [
          "Bir xil row ustida parallel update bo'lsa, lock kerak bo'ladi.",
          "select_for_update faqat transaction ichida ishlaydi."
        ],
        codeSamples: [
          {
            title: "row lock",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    wallet = Wallet.objects.select_for_update().get(user=user)\n    wallet.balance -= amount\n    wallet.save()"
          }
        ]
      },
      {
        title: "07. F expression bilan xavfsiz update",
        body: [
          "F expression DB ichida hisoblab update qiladi.",
          "Race condition kamayadi."
        ],
        codeSamples: [
          {
            title: "F update",
            language: "python",
            code: "from django.db import transaction\nfrom django.db.models import F\n\nwith transaction.atomic():\n    Wallet.objects.filter(user=user).update(balance=F('balance') - amount)"
          }
        ]
      },
      {
        title: "08. get_or_create transaction ichida",
        body: [
          "Parallel so'rovlar bo'lsa duplication bo'lishi mumkin.",
          "Atomic blok bilan xavfsizroq."
        ],
        codeSamples: [
          {
            title: "get_or_create",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    customer, created = Customer.objects.get_or_create(email=email)"
          }
        ]
      },
      {
        title: "09. on_commit hook",
        body: [
          "Email yoki task faqat commit bo'lgandan keyin ishlashi kerak.",
          "transaction.on_commit shu uchun."
        ],
        codeSamples: [
          {
            title: "on_commit",
            language: "python",
            code: "from django.db import transaction\n\ndef create_order(user):\n    order = Order.objects.create(user=user)\n    transaction.on_commit(lambda: send_order_email(order.id))\n    return order"
          }
        ]
      },
      {
        title: "10. Bir nechta DB uchun using",
        body: [
          "Agar bir nechta database ishlatsangiz using bilan belgilang.",
          "Transaction shu DB uchun ishlaydi."
        ],
        codeSamples: [
          {
            title: "using",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic(using='default'):\n    Order.objects.create()"
          }
        ]
      },
      {
        title: "11. IntegrityError ni ushlash",
        body: [
          "Unique constraint buzilsa IntegrityError chiqadi.",
          "Atomic blokdan tashqarida tuting."
        ],
        codeSamples: [
          {
            title: "integrity error",
            language: "python",
            code: "from django.db import IntegrityError, transaction\n\ntry:\n    with transaction.atomic():\n        User.objects.create(email='a@b.com')\n        User.objects.create(email='a@b.com')\nexcept IntegrityError:\n    print('duplicate')"
          }
        ]
      },
      {
        title: "12. non_atomic_requests",
        body: [
          "Ba'zi viewlarda transaction kerak emas.",
          "non_atomic_requests decorator bilan o'chiriladi."
        ],
        codeSamples: [
          {
            title: "non atomic",
            language: "python",
            code: "from django.db import transaction\nfrom django.http import JsonResponse\n\n@transaction.non_atomic_requests\ndef health(request):\n    return JsonResponse({'ok': True})"
          }
        ]
      },
      {
        title: "13. Service layerda transaction",
        body: [
          "Business logika service qatlamida bo'lishi kerak.",
          "Transaction ham shu yerda boshqariladi."
        ],
        codeSamples: [
          {
            title: "service",
            language: "python",
            code: "from django.db import transaction\n\ndef borrow_book(user, book):\n    with transaction.atomic():\n        Borrow.objects.create(user=user, book=book)\n        book.stock -= 1\n        book.save()"
          }
        ]
      },
      {
        title: "14. bulk_create bilan atomic",
        body: [
          "Ko'p obyektni birga yozish kerak bo'lsa bulk_create ishlatiladi.",
          "Atomic blokda bo'lsa xavfsizroq."
        ],
        codeSamples: [
          {
            title: "bulk_create",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    Log.objects.bulk_create(logs)"
          }
        ]
      },
      {
        title: "15. try/except tartibi",
        body: [
          "try/except atomic tashqarisida bo'lishi kerak.",
          "Aks holda rollback ishlamay qolishi mumkin."
        ],
        codeSamples: [
          {
            title: "try outside",
            language: "python",
            code: "from django.db import transaction\n\ntry:\n    with transaction.atomic():\n        Order.objects.create()\n        raise ValueError('stop')\nexcept ValueError:\n    pass"
          }
        ]
      },
      {
        title: "16. savepoint=False",
        body: [
          "Nested transaction keraksiz bo'lsa savepoint o'chiriladi.",
          "Bu tezlikni oshiradi."
        ],
        codeSamples: [
          {
            title: "savepoint",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic(savepoint=False):\n    Order.objects.create()"
          }
        ]
      },
      {
        title: "17. select_for_update skip_locked",
        body: [
          "Navbatda turgan vazifalarni olishda skip_locked kerak bo'ladi.",
          "Locked rowlarni o'tkazib yuboradi."
        ],
        codeSamples: [
          {
            title: "skip locked",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    tasks = Task.objects.select_for_update(skip_locked=True).filter(status='new')[:10]"
          }
        ]
      },
      {
        title: "18. TransactionTestCase",
        body: [
          "TestCase har testni transactionga o'raydi.",
          "Real commit/rollback testlari uchun TransactionTestCase ishlatiladi."
        ],
        codeSamples: [
          {
            title: "TransactionTestCase",
            language: "python",
            code: "from django.test import TransactionTestCase\n\nclass PaymentTest(TransactionTestCase):\n    reset_sequences = True"
          }
        ]
      },
      {
        title: "19. Bir necha modelni birga boshqarish",
        body: [
          "Order, Stock, Payment birga o'zgarsa bitta transaction bo'lishi shart.",
          "Aks holda data yarim qoladi."
        ],
        codeSamples: [
          {
            title: "multi model",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    order = Order.objects.create()\n    Stock.objects.filter(book_id=1).update(count=F('count') - 1)"
          }
        ]
      },
      {
        title: "20. Deadlock uchun retry",
        body: [
          "Ba'zi DB holatlarda deadlock bo'lishi mumkin.",
          "Qisqa retry loop muammoni yechadi."
        ],
        codeSamples: [
          {
            title: "retry",
            language: "python",
            code: "from django.db import OperationalError, transaction\n\nfor _ in range(3):\n    try:\n        with transaction.atomic():\n            Order.objects.create()\n        break\n    except OperationalError:\n        continue"
          }
        ]
      }
    ]
  },
  22: {
    summary: "Unit testlar - kichik logikani mustahkamlash uchun yoziladi. Model metodlari, service funksiyalar va edge case lar shu yerda tekshiriladi.",
    goals: [
      "TestCase bilan ishlash",
      "setUp va setUpTestData farqini bilish",
      "assert larni to'g'ri ishlatish",
      "Mock va override_settings qo'llash"
    ],
    sections: [
      {
        title: "01. TestCase skeleti",
        body: [
          "Har bir test class TestCase dan meros oladi.",
          "test_ bilan boshlangan metodlar ishlaydi."
        ],
        codeSamples: [
          {
            title: "basic test",
            language: "python",
            code: "from django.test import TestCase\n\nclass CalcTest(TestCase):\n    def test_sum(self):\n        self.assertEqual(1 + 1, 2)"
          }
        ]
      },
      {
        title: "02. setUp va setUpTestData",
        body: [
          "setUp har testdan oldin ishlaydi.",
          "setUpTestData esa bir marta ishlaydi va tezroq."
        ],
        codeSamples: [
          {
            title: "setUpTestData",
            language: "python",
            code: "from django.test import TestCase\n\nclass BookTest(TestCase):\n    @classmethod\n    def setUpTestData(cls):\n        cls.book = Book.objects.create(title='Django')"
          }
        ]
      },
      {
        title: "03. Model metodini test qilish",
        body: [
          "Model ichidagi methodlar ham test qilinadi.",
          "Business qoidalar shu yerda yashaydi."
        ],
        codeSamples: [
          {
            title: "model method",
            language: "python",
            code: "class BookTest(TestCase):\n    def test_slug(self):\n        book = Book.objects.create(title='My Book')\n        self.assertEqual(book.slug, 'my-book')"
          }
        ]
      },
      {
        title: "04. Service funksiyani test qilish",
        body: [
          "Service layer logikasi viewdan mustaqil bo'ladi.",
          "Unit test bilan tez tekshiriladi."
        ],
        codeSamples: [
          {
            title: "service test",
            language: "python",
            code: "class BorrowTest(TestCase):\n    def test_can_borrow(self):\n        result = can_borrow(self.user)\n        self.assertTrue(result)"
          }
        ]
      },
      {
        title: "05. Assertion turlari",
        body: [
          "assertTrue, assertEqual, assertIn kabi metodlar bor.",
          "Maqsad - kutilgan natijani aniq tasdiqlash."
        ],
        codeSamples: [
          {
            title: "asserts",
            language: "python",
            code: "self.assertTrue(user.is_active)\nself.assertIn('django', 'django roadmap')"
          }
        ]
      },
      {
        title: "06. assertRaises bilan xato kutish",
        body: [
          "Xato bo'lishi kerak bo'lgan holatlarni ham test qilasiz.",
          "assertRaises xatoni to'g'ri ushlaydi."
        ],
        codeSamples: [
          {
            title: "assertRaises",
            language: "python",
            code: "with self.assertRaises(ValueError):\n    create_user(email='')"
          }
        ]
      },
      {
        title: "07. override_settings",
        body: [
          "Testda vaqtinchalik settings o'zgartirish mumkin.",
          "Bu prod configga ta'sir qilmaydi."
        ],
        codeSamples: [
          {
            title: "override",
            language: "python",
            code: "from django.test import override_settings\n\n@override_settings(DEBUG=False)\ndef test_debug_off(self):\n    self.assertFalse(settings.DEBUG)"
          }
        ]
      },
      {
        title: "08. Mock ishlatish",
        body: [
          "Tashqi servis yoki email yuborishni mock qilish kerak.",
          "Bu testni tez va barqaror qiladi."
        ],
        codeSamples: [
          {
            title: "mock",
            language: "python",
            code: "from unittest.mock import patch\n\nwith patch('app.services.send_email') as mocked:\n    mocked.return_value = True\n    send_welcome(self.user)\n    mocked.assert_called_once()"
          }
        ]
      },
      {
        title: "09. Helper factory",
        body: [
          "Testlarda qayta-qayta user yaratish zerikarli.",
          "Oddiy helper funksiya yozib oling."
        ],
        codeSamples: [
          {
            title: "factory",
            language: "python",
            code: "def make_user(email='a@b.com'):\n    return User.objects.create_user(email=email, password='pass1234')"
          }
        ]
      },
      {
        title: "10. Testlarni run qilish",
        body: [
          "Kerakli app yoki modulni alohida ishlatish mumkin.",
          "Bu sizga tez feedback beradi."
        ],
        codeSamples: [
          {
            title: "run tests",
            language: "bash",
            code: "python manage.py test users.tests"
          }
        ]
      }
    ]
  },
  23: {
    summary: "Integration testlar - view va endpointlar ishlashini tekshiradi. Bu yerda HTTP status, JSON javob, auth va permissionlar sinovdan o'tadi.",
    goals: [
      "Client va APIClient bilan ishlash",
      "GET/POST so'rovlarni test qilish",
      "Status code va JSONni tekshirish",
      "Auth va permissionlarni sinash"
    ],
    sections: [
      {
        title: "01. Oddiy GET test",
        body: [
          "Client yordamida GET so'rov yuborasiz.",
          "Status 200 bo'lishini tekshirasiz."
        ],
        codeSamples: [
          {
            title: "client get",
            language: "python",
            code: "response = self.client.get('/api/books/')\nself.assertEqual(response.status_code, 200)"
          }
        ]
      },
      {
        title: "02. POST JSON yuborish",
        body: [
          "POST so'rovda JSON body yuborish mumkin.",
          "content_type ni application/json qiling."
        ],
        codeSamples: [
          {
            title: "post json",
            language: "python",
            code: "payload = {'title': 'New'}\nresponse = self.client.post('/api/books/', data=payload, content_type='application/json')"
          }
        ]
      },
      {
        title: "03. reverse bilan URL olish",
        body: [
          "URL ni qo'lda yozmaslik uchun reverse ishlating.",
          "Name o'zgarsa ham test buzilmaydi."
        ],
        codeSamples: [
          {
            title: "reverse",
            language: "python",
            code: "from django.urls import reverse\n\nurl = reverse('book-list')\nresponse = self.client.get(url)"
          }
        ]
      },
      {
        title: "04. force_login bilan autentifikatsiya",
        body: [
          "Login talab qiladigan endpointlarda userni force_login qiling.",
          "Bu login viewga bog'lanishni kamaytiradi."
        ],
        codeSamples: [
          {
            title: "force_login",
            language: "python",
            code: "self.client.force_login(self.user)\nresponse = self.client.get('/api/profile/')"
          }
        ]
      },
      {
        title: "05. Permission test",
        body: [
          "Ruxsatsiz foydalanuvchi 403 yoki 401 olishi kerak.",
          "Bu xavfsizlikni tekshiradi."
        ],
        codeSamples: [
          {
            title: "permission",
            language: "python",
            code: "response = self.client.get('/api/admin-only/')\nself.assertEqual(response.status_code, 403)"
          }
        ]
      },
      {
        title: "06. DRF APIClient",
        body: [
          "DRF bo'lsa APIClient yanada qulay.",
          "JSON va auth ishlari osonlashadi."
        ],
        codeSamples: [
          {
            title: "api client",
            language: "python",
            code: "from rest_framework.test import APIClient\n\nclient = APIClient()\nresponse = client.get('/api/books/')"
          }
        ]
      },
      {
        title: "07. Fayl upload test",
        body: [
          "File upload endpointlar ham test qilinadi.",
          "Binary faylni open qilib yuboring."
        ],
        codeSamples: [
          {
            title: "file upload",
            language: "python",
            code: "with open('tests/data/test.jpg', 'rb') as fp:\n    response = self.client.post('/api/upload/', {'file': fp})"
          }
        ]
      },
      {
        title: "08. Pagination test",
        body: [
          "Pagination bo'lsa results fieldini tekshiring.",
          "Page parametri ishlayaptimi ko'ring."
        ],
        codeSamples: [
          {
            title: "pagination",
            language: "python",
            code: "response = self.client.get('/api/books/?page=2')\nself.assertIn('results', response.json())"
          }
        ]
      },
      {
        title: "09. Query param test",
        body: [
          "Search va filter endpointlar query paramga bog'liq.",
          "Param yuborib natijani tekshiring."
        ],
        codeSamples: [
          {
            title: "query params",
            language: "python",
            code: "response = self.client.get('/api/books/?search=django')\nself.assertEqual(response.status_code, 200)"
          }
        ]
      },
      {
        title: "10. 404 va 400 holatlar",
        body: [
          "Xato holatlar ham test qilinadi.",
          "Not found yoki validation error kutilganmi tekshiring."
        ],
        codeSamples: [
          {
            title: "error status",
            language: "python",
            code: "response = self.client.get('/api/books/999/')\nself.assertEqual(response.status_code, 404)"
          }
        ]
      }
    ]
  },
  24: {
    summary: "Custom management commandlar - admin ishlarini avtomatlashtirishning eng toza yo'li. Seed data, cleanup, import/export kabi vazifalar uchun juda kerak.",
    goals: [
      "Command strukturasini bilish",
      "BaseCommand va add_arguments ishlatish",
      "Output va xatolarni boshqarish",
      "Commandlarni amalda chaqirish"
    ],
    sections: [
      {
        title: "01. Papka strukturasini yaratish",
        body: [
          "management/commands/ papkasi bo'lishi shart.",
          "Django shu joydan commandlarni topadi."
        ],
        codeSamples: [
          {
            title: "structure",
            language: "bash",
            code: "myapp/\n  management/\n    commands/\n      __init__.py\n      seed_books.py"
          }
        ]
      },
      {
        title: "02. BaseCommand skeleti",
        body: [
          "Har command BaseCommand dan meros oladi.",
          "handle metodi asosiy logika."
        ],
        codeSamples: [
          {
            title: "base command",
            language: "python",
            code: "from django.core.management.base import BaseCommand\n\nclass Command(BaseCommand):\n    help = 'Seed books'\n\n    def handle(self, *args, **kwargs):\n        self.stdout.write('Done')"
          }
        ]
      },
      {
        title: "03. add_arguments bilan parametrlar",
        body: [
          "Commandga --count kabi parametr berish mumkin.",
          "Parser orqali qabul qilinadi."
        ],
        codeSamples: [
          {
            title: "add_arguments",
            language: "python",
            code: "def add_arguments(self, parser):\n    parser.add_argument('--count', type=int, default=10)"
          }
        ]
      },
      {
        title: "04. Output style",
        body: [
          "SUCCESS, WARNING kabi style lar bor.",
          "Userga chiroyli log beradi."
        ],
        codeSamples: [
          {
            title: "style",
            language: "python",
            code: "self.stdout.write(self.style.SUCCESS('Created'))"
          }
        ]
      },
      {
        title: "05. CSV o'qish",
        body: [
          "Import uchun CSV fayl ishlatish mumkin.",
          "DictReader bilan ustun nomlarini o'qiysiz."
        ],
        codeSamples: [
          {
            title: "csv",
            language: "python",
            code: "import csv\n\nwith open('books.csv') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        Book.objects.create(title=row['title'])"
          }
        ]
      },
      {
        title: "06. Transaction bilan xavfsiz yozish",
        body: [
          "Ko'p yozuv bo'lsa transaction bilan himoya qiling.",
          "Xato bo'lsa hammasi rollback bo'ladi."
        ],
        codeSamples: [
          {
            title: "transaction",
            language: "python",
            code: "from django.db import transaction\n\nwith transaction.atomic():\n    Book.objects.create(title='A')\n    Book.objects.create(title='B')"
          }
        ]
      },
      {
        title: "07. Dry-run rejimi",
        body: [
          "Ba'zan faqat tekshirish kerak bo'ladi.",
          "dry-run flag bilan write ni to'xtating."
        ],
        codeSamples: [
          {
            title: "dry-run",
            language: "python",
            code: "if options.get('dry_run'):\n    self.stdout.write('Dry run, yozilmadi')\n    return"
          }
        ]
      },
      {
        title: "08. call_command ishlatish",
        body: [
          "Bir command ichidan boshqasini chaqirish mumkin.",
          "Bu reuse uchun foydali."
        ],
        codeSamples: [
          {
            title: "call_command",
            language: "python",
            code: "from django.core.management import call_command\n\ncall_command('migrate')"
          }
        ]
      },
      {
        title: "09. Xatoni CommandError bilan berish",
        body: [
          "Xato bo'lsa CommandError ko'taring.",
          "Bu CLI da aniq chiqadi."
        ],
        codeSamples: [
          {
            title: "CommandError",
            language: "python",
            code: "from django.core.management.base import CommandError\n\nraise CommandError('CSV topilmadi')"
          }
        ]
      },
      {
        title: "10. Progress ko'rsatish",
        body: [
          "Uzun jarayonlarda progress ko'rsatish foydali.",
          "User nima bo'layotganini ko'radi."
        ],
        codeSamples: [
          {
            title: "progress",
            language: "python",
            code: "for i in range(count):\n    self.stdout.write(f'Creating {i + 1}/{count}')"
          }
        ]
      }
    ]
  },
  25: {
    summary: "Celery va Redis - og'ir ishlarni fon rejimida bajarish uchun. Request javobini kutmasdan email, report, video processing kabi vazifalarni worker bajaradi.",
    goals: [
      "Celery va Redis arxitekturasini tushunish",
      "celery.py konfiguratsiyasini yozish",
      "Task yaratish va delay bilan chaqirish",
      "Worker va result backendni ishga tushirish"
    ],
    sections: [
      {
        title: "01. Paketlarni o'rnatish",
        body: [
          "Celery va Redis client paketlarini o'rnating.",
          "Broker sifatida Redis ishlatiladi."
        ],
        codeSamples: [
          {
            title: "install",
            language: "bash",
            code: "pip install celery redis"
          }
        ]
      },
      {
        title: "02. celery.py konfiguratsiyasi",
        body: [
          "Project rootda celery.py fayl ochiladi.",
          "Django settings bilan bog'lanadi."
        ],
        codeSamples: [
          {
            title: "celery.py",
            language: "python",
            code: "import os\nfrom celery import Celery\n\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')\n\napp = Celery('config')\napp.config_from_object('django.conf:settings', namespace='CELERY')\napp.autodiscover_tasks()"
          }
        ]
      },
      {
        title: "03. __init__.py ga appni ulash",
        body: [
          "Celery app Django yuklanganda tayyor bo'lishi kerak.",
          "config/__init__.py ichida ulash qilinadi."
        ],
        codeSamples: [
          {
            title: "__init__.py",
            language: "python",
            code: "from .celery import app as celery_app\n\n__all__ = ('celery_app',)"
          }
        ]
      },
      {
        title: "04. Broker URL ni settingsga qo'yish",
        body: [
          "Redis manzilini CELERY_BROKER_URL da berasiz.",
          "Prod va dev muhitda .env dan o'qish tavsiya."
        ],
        codeSamples: [
          {
            title: "settings",
            language: "python",
            code: "CELERY_BROKER_URL = 'redis://localhost:6379/0'"
          }
        ]
      },
      {
        title: "05. Task yaratish",
        body: [
          "@shared_task dekoratori oddiy funksiya uchun ishlaydi.",
          "Tasklarni tasks.py ichida saqlang."
        ],
        codeSamples: [
          {
            title: "tasks.py",
            language: "python",
            code: "from celery import shared_task\n\n@shared_task\ndef add(x, y):\n    return x + y"
          }
        ]
      },
      {
        title: "06. delay bilan chaqirish",
        body: [
          "delay chaqirilsa task fon rejimiga ketadi.",
          "View javobi darhol qaytadi."
        ],
        codeSamples: [
          {
            title: "delay",
            language: "python",
            code: "result = add.delay(10, 20)"
          }
        ]
      },
      {
        title: "07. Worker ishga tushirish",
        body: [
          "Worker alohida process bo'lib ishlaydi.",
          "Terminalda celery worker komandasini ishga tushiring."
        ],
        codeSamples: [
          {
            title: "worker",
            language: "bash",
            code: "celery -A config worker -l info"
          }
        ]
      },
      {
        title: "08. Result backend sozlash",
        body: [
          "Natijani saqlash uchun result backend kerak bo'ladi.",
          "Redis ikkinchi db sifatida ishlatiladi."
        ],
        codeSamples: [
          {
            title: "result backend",
            language: "python",
            code: "CELERY_RESULT_BACKEND = 'redis://localhost:6379/1'"
          }
        ]
      },
      {
        title: "09. Retry mexanizmi",
        body: [
          "Tashqi servis ishlamay qolsa retry kerak bo'ladi.",
          "countdown va max_retries bilan boshqarasiz."
        ],
        codeSamples: [
          {
            title: "retry",
            language: "python",
            code: "from celery import shared_task\n\n@shared_task(bind=True)\ndef call_api(self):\n    try:\n        return do_request()\n    except Exception:\n        raise self.retry(countdown=5, max_retries=3)"
          }
        ]
      },
      {
        title: "10. Testlarda eager rejim",
        body: [
          "Testda task darhol bajarilishi kerak.",
          "CELERY_TASK_ALWAYS_EAGER True bo'ladi."
        ],
        codeSamples: [
          {
            title: "eager",
            language: "python",
            code: "CELERY_TASK_ALWAYS_EAGER = True"
          }
        ]
      }
    ]
  },
  26: {
    summary: "Celery amaliyoti - email yuborish va periodic tasklarni yozish. Celery Beat orqali vaqtga bog'liq vazifalarni avtomatlashtirasiz.",
    goals: [
      "Email tasklarini yozish",
      "transaction.on_commit bilan xavfsiz chaqirish",
      "Celery Beat schedule tuzish",
      "Periodic tasklarni boshqarish"
    ],
    sections: [
      {
        title: "01. Email yuborish taski",
        body: [
          "send_mail ni task ichida chaqirasiz.",
          "Email yuborish requestni bloklamaydi."
        ],
        codeSamples: [
          {
            title: "send mail task",
            language: "python",
            code: "from celery import shared_task\nfrom django.core.mail import send_mail\n\n@shared_task\ndef send_welcome(email):\n    send_mail('Welcome', 'Hello', 'noreply@test.com', [email])"
          }
        ]
      },
      {
        title: "02. on_commit bilan task chaqirish",
        body: [
          "DB commit bo'lmasdan task ketmasligi kerak.",
          "transaction.on_commit shu uchun ishlatiladi."
        ],
        codeSamples: [
          {
            title: "on_commit",
            language: "python",
            code: "from django.db import transaction\n\ndef register_user(user):\n    user.save()\n    transaction.on_commit(lambda: send_welcome.delay(user.email))"
          }
        ]
      },
      {
        title: "03. countdown va eta",
        body: [
          "Taskni ma'lum vaqtga kechiktirish mumkin.",
          "countdown sekundlarda beriladi."
        ],
        codeSamples: [
          {
            title: "countdown",
            language: "python",
            code: "send_welcome.apply_async(args=['a@b.com'], countdown=60)"
          }
        ]
      },
      {
        title: "04. CELERY_BEAT_SCHEDULE",
        body: [
          "Beat schedule settings.py da yoziladi.",
          "Har minutda yoki kuniga bir marta ishlashi mumkin."
        ],
        codeSamples: [
          {
            title: "beat schedule",
            language: "python",
            code: "CELERY_BEAT_SCHEDULE = {\n    'clear-expired': {\n        'task': 'tasks.clear_expired',\n        'schedule': 60.0,\n    },\n}"
          }
        ]
      },
      {
        title: "05. crontab bilan vaqt belgilash",
        body: [
          "Crontab bilan aniq soat va kun beriladi.",
          "Masalan har kuni 00:00."
        ],
        codeSamples: [
          {
            title: "crontab",
            language: "python",
            code: "from celery.schedules import crontab\n\nCELERY_BEAT_SCHEDULE = {\n    'daily-report': {\n        'task': 'tasks.daily_report',\n        'schedule': crontab(hour=0, minute=0),\n    },\n}"
          }
        ]
      },
      {
        title: "06. django-celery-beat bilan admin",
        body: [
          "PeriodicTask model orqali admin paneldan boshqarish mumkin.",
          "Schedulelarni kodsiz o'zgartirasiz."
        ],
        codeSamples: [
          {
            title: "admin schedule",
            language: "python",
            code: "INSTALLED_APPS += ['django_celery_beat']"
          }
        ]
      },
      {
        title: "07. Periodic cleanup task",
        body: [
          "Eski loglarni tozalash kabi vazifalar periodic bo'ladi.",
          "Bu DB tozaligini saqlaydi."
        ],
        codeSamples: [
          {
            title: "cleanup",
            language: "python",
            code: "from celery import shared_task\n\n@shared_task\ndef clear_expired():\n    Session.objects.filter(expire_date__lt=timezone.now()).delete()"
          }
        ]
      },
      {
        title: "08. Queue bo'lib ishlash",
        body: [
          "Og'ir va yengil tasklarni alohida queue ga yuboring.",
          "Workerlar alohida bo'lsa tezroq bo'ladi."
        ],
        codeSamples: [
          {
            title: "queue",
            language: "python",
            code: "send_welcome.apply_async(args=['a@b.com'], queue='emails')"
          }
        ]
      },
      {
        title: "09. HTML email yuborish",
        body: [
          "EmailMultiAlternatives bilan HTML yuboriladi.",
          "Userga chiroyli ko'rinish beradi."
        ],
        codeSamples: [
          {
            title: "html email",
            language: "python",
            code: "from django.core.mail import EmailMultiAlternatives\n\nmsg = EmailMultiAlternatives('Hi', 'Plain', 'no@site.com', ['a@b.com'])\nmsg.attach_alternative('<b>Hello</b>', 'text/html')\nmsg.send()"
          }
        ]
      },
      {
        title: "10. Task test qilish",
        body: [
          "Eager rejimda task darhol bajariladi.",
          "Natijani assert qilish oson."
        ],
        codeSamples: [
          {
            title: "task test",
            language: "python",
            code: "def test_add_task(self):\n    result = add.delay(2, 3)\n    self.assertEqual(result.get(), 5)"
          }
        ]
      }
    ]
  },
  27: {
    summary: "Logging va Sentry - production xatolarini tez topish uchun kerak. Loglar sizga tizim holatini ko'rsatadi, Sentry esa xatolarni real vaqtida bildiradi.",
    goals: [
      "LOGGING konfiguratsiyasini tuzish",
      "Logger darajalarini ishlatish",
      "Sentry integratsiyasi",
      "Xatolarni filtrlash va monitoring"
    ],
    sections: [
      {
        title: "01. Logger olish",
        body: [
          "Har modulda logger oling.",
          "Logger nomi modul nomi bilan chiqadi."
        ],
        codeSamples: [
          {
            title: "logger",
            language: "python",
            code: "import logging\n\nlogger = logging.getLogger(__name__)"
          }
        ]
      },
      {
        title: "02. LOGGING dict skeleti",
        body: [
          "LOGGING settingsda dict ko'rinishida bo'ladi.",
          "Handlers va formatters alohida yoziladi."
        ],
        codeSamples: [
          {
            title: "logging settings",
            language: "python",
            code: "LOGGING = {\n    'version': 1,\n    'handlers': {\n        'console': {'class': 'logging.StreamHandler'},\n    },\n    'root': {'handlers': ['console'], 'level': 'INFO'},\n}"
          }
        ]
      },
      {
        title: "03. FileHandler bilan faylga yozish",
        body: [
          "Prod loglarni faylga yozish muhim.",
          "Keyin grep bilan qidirish oson."
        ],
        codeSamples: [
          {
            title: "file handler",
            language: "python",
            code: "LOGGING = {\n    'version': 1,\n    'handlers': {\n        'file': {\n            'class': 'logging.FileHandler',\n            'filename': 'app.log',\n        },\n    },\n    'root': {'handlers': ['file'], 'level': 'WARNING'},\n}"
          }
        ]
      },
      {
        title: "04. RotatingFileHandler",
        body: [
          "Log fayl haddan tashqari kattalashib ketmasin.",
          "Rotation bilan eski loglar arxivlanadi."
        ],
        codeSamples: [
          {
            title: "rotating",
            language: "python",
            code: "LOGGING = {\n    'version': 1,\n    'handlers': {\n        'file': {\n            'class': 'logging.handlers.RotatingFileHandler',\n            'filename': 'app.log',\n            'maxBytes': 1024 * 1024,\n            'backupCount': 3,\n        },\n    },\n    'root': {'handlers': ['file'], 'level': 'INFO'},\n}"
          }
        ]
      },
      {
        title: "05. Log level lar",
        body: [
          "DEBUG, INFO, WARNING, ERROR, CRITICAL darajalari bor.",
          "Prod uchun INFO yoki WARNING yetarli."
        ],
        codeSamples: [
          {
            title: "levels",
            language: "python",
            code: "logger.debug('debug msg')\nlogger.info('info msg')\nlogger.warning('warning msg')\nlogger.error('error msg')"
          }
        ]
      },
      {
        title: "06. View ichida log yozish",
        body: [
          "Muhim eventlarni view ichida log qiling.",
          "Masalan login yoki payment."
        ],
        codeSamples: [
          {
            title: "view log",
            language: "python",
            code: "def login_view(request):\n    logger.info('login attempt')\n    return JsonResponse({'ok': True})"
          }
        ]
      },
      {
        title: "07. Sentry init",
        body: [
          "sentry_sdk init bilan DSN ni ulaysiz.",
          "Exceptionlar avtomatik yuboriladi."
        ],
        codeSamples: [
          {
            title: "sentry init",
            language: "python",
            code: "import sentry_sdk\n\nsentry_sdk.init(dsn='https://example@sentry.io/123')"
          }
        ]
      },
      {
        title: "08. capture_exception va breadcrumbs",
        body: [
          "Qo'lda xatoni yuborish ham mumkin.",
          "Breadcrumbs kontekst beradi."
        ],
        codeSamples: [
          {
            title: "capture",
            language: "python",
            code: "import sentry_sdk\n\ntry:\n    1 / 0\nexcept Exception as exc:\n    sentry_sdk.capture_exception(exc)"
          }
        ]
      },
      {
        title: "09. Environment va release",
        body: [
          "Sentryda env va release ko'rsatish muhim.",
          "Qaysi deployda xato chiqqani bilinadi."
        ],
        codeSamples: [
          {
            title: "env",
            language: "python",
            code: "sentry_sdk.init(\n    dsn='https://example@sentry.io/123',\n    environment='production',\n    release='1.0.0',\n)"
          }
        ]
      },
      {
        title: "10. before_send bilan filter",
        body: [
          "Keraksiz xatolarni Sentryga yubormaslik mumkin.",
          "before_send orqali filtr qiling."
        ],
        codeSamples: [
          {
            title: "filter",
            language: "python",
            code: "def before_send(event, hint):\n    if event.get('level') == 'info':\n        return None\n    return event\n\nsentry_sdk.init(dsn='https://example@sentry.io/123', before_send=before_send)"
          }
        ]
      }
    ]
  },
  28: {
    summary: "Redis caching - qayta-qayta bir xil data so'rashdan qutqaradi. Cache bilan DB yuklamasi tushadi va response tezlashadi.",
    goals: [
      "CACHES konfiguratsiyasini yozish",
      "cache.get/set/get_or_set ishlatish",
      "cache_page bilan page caching",
      "Invalidation va key boshqarish"
    ],
    sections: [
      {
        title: "01. CACHES sozlash",
        body: [
          "django-redis bilan Redis backendni ulaysiz.",
          "settings.py da CACHES yoziladi."
        ],
        codeSamples: [
          {
            title: "caches",
            language: "python",
            code: "CACHES = {\n    'default': {\n        'BACKEND': 'django_redis.cache.RedisCache',\n        'LOCATION': 'redis://127.0.0.1:6379/1',\n        'OPTIONS': {'CLIENT_CLASS': 'django_redis.client.DefaultClient'},\n    }\n}"
          }
        ]
      },
      {
        title: "02. cache.set va cache.get",
        body: [
          "Pastki darajadagi cache API bilan ishlaysiz.",
          "timeout sekundlarda beriladi."
        ],
        codeSamples: [
          {
            title: "set/get",
            language: "python",
            code: "from django.core.cache import cache\n\ncache.set('top_books', ['A', 'B'], timeout=300)\nbooks = cache.get('top_books')"
          }
        ]
      },
      {
        title: "03. get_or_set",
        body: [
          "Agar cache bo'lmasa funksiyani ishga tushiradi.",
          "Kodni soddalashtiradi."
        ],
        codeSamples: [
          {
            title: "get_or_set",
            language: "python",
            code: "books = cache.get_or_set('top_books', lambda: list(Book.objects.values()), 300)"
          }
        ]
      },
      {
        title: "04. cache_page dekoratori",
        body: [
          "Butun view javobini cache qiladi.",
          "Oddiy list endpointlar uchun foydali."
        ],
        codeSamples: [
          {
            title: "cache_page",
            language: "python",
            code: "from django.views.decorators.cache import cache_page\n\n@cache_page(60 * 5)\ndef category_list(request):\n    return JsonResponse(list(Category.objects.values()), safe=False)"
          }
        ]
      },
      {
        title: "05. Userga alohida key",
        body: [
          "Personal data bo'lsa user id bilan key tuzing.",
          "Shunda cache to'g'ri ajratiladi."
        ],
        codeSamples: [
          {
            title: "user key",
            language: "python",
            code: "key = f'user:{request.user.id}:profile'\ncache.set(key, profile_data, 600)"
          }
        ]
      },
      {
        title: "06. cache.delete",
        body: [
          "Ma'lumot o'zgarsa cache ni o'chiring.",
          "Aks holda user eski data ko'radi."
        ],
        codeSamples: [
          {
            title: "delete",
            language: "python",
            code: "cache.delete('top_books')"
          }
        ]
      },
      {
        title: "07. cache.clear",
        body: [
          "Barcha cache ni tozalash mumkin.",
          "Bu faqat kerak bo'lganda ishlatiladi."
        ],
        codeSamples: [
          {
            title: "clear",
            language: "python",
            code: "cache.clear()"
          }
        ]
      },
      {
        title: "08. Signal bilan invalidation",
        body: [
          "Model saqlanganda cache ni avtomatik tozalash mumkin.",
          "post_save signal yordam beradi."
        ],
        codeSamples: [
          {
            title: "signal",
            language: "python",
            code: "from django.db.models.signals import post_save\nfrom django.dispatch import receiver\n\n@receiver(post_save, sender=Book)\ndef clear_books_cache(sender, **kwargs):\n    cache.delete('top_books')"
          }
        ]
      },
      {
        title: "09. Key prefix va version",
        body: [
          "Version bilan eski cachelarni avtomatik yangilash mumkin.",
          "DEPLOY dan keyin version oshiring."
        ],
        codeSamples: [
          {
            title: "version",
            language: "python",
            code: "cache.set('top_books', data, timeout=300, version=2)"
          }
        ]
      },
      {
        title: "10. Qimmat count ni cache qilish",
        body: [
          "COUNT(*) katta jadvalda sekin bo'ladi.",
          "Natijani cachega olib 1-5 daqiqa ishlating."
        ],
        codeSamples: [
          {
            title: "count cache",
            language: "python",
            code: "count = cache.get_or_set('books_count', lambda: Book.objects.count(), 300)"
          }
        ]
      }
    ]
  },
  29: {
    summary: "Annotate va Aggregate - SQL hisoblashni databazada bajarish uchun. Count, Avg, Sum, Cast, Coalesce kabi funksiyalar bilan statistika va hisobotlarni tez olasiz.",
    goals: [
      "Aggregate va annotate farqini tushunish",
      "Count, Avg, Sum, Min, Max ishlatish",
      "DB funksiyalarini qo'llash (Cast, Coalesce, Concat)",
      "Subquery va Exists bilan murakkab so'rovlar yozish"
    ],
    sections: [
      {
        title: "01. Aggregate va Annotate farqi",
        body: [
          "Aggregate bitta natija (dict) qaytaradi.",
          "Annotate esa har bir obyektga yangi field qo'shadi."
        ],
        codeSamples: [
          {
            title: "aggregate",
            language: "python",
            code: "from django.db.models import Count\n\ntotal = Book.objects.aggregate(total=Count('id'))"
          }
        ]
      },
      {
        title: "02. Count basic",
        body: [
          "Count bilan obyektlar sonini olasiz.",
          "Statistika uchun eng oddiy funksiya."
        ],
        codeSamples: [
          {
            title: "count",
            language: "python",
            code: "from django.db.models import Count\n\nstats = Author.objects.annotate(books_count=Count('books'))"
          }
        ]
      },
      {
        title: "03. Count + filter",
        body: [
          "Count ichida filter ishlatish mumkin.",
          "Faqat shartga moslarini sanaydi."
        ],
        codeSamples: [
          {
            title: "filtered count",
            language: "python",
            code: "from django.db.models import Count, Q\n\nauthors = Author.objects.annotate(\n    active_books=Count('books', filter=Q(books__is_active=True))\n)"
          }
        ]
      },
      {
        title: "04. Avg, Min, Max",
        body: [
          "O'rtacha, eng kichik va eng katta qiymatni olish mumkin.",
          "Bu hisobotlar uchun kerak bo'ladi."
        ],
        codeSamples: [
          {
            title: "avg min max",
            language: "python",
            code: "from django.db.models import Avg, Min, Max\n\nsummary = Book.objects.aggregate(\n    avg_price=Avg('price'),\n    min_price=Min('price'),\n    max_price=Max('price'),\n)"
          }
        ]
      },
      {
        title: "05. Sum bilan jami hisob",
        body: [
          "Sum bilan umumiy qiymatni olasiz.",
          "Filter bilan faqat kerakli qismni hisoblang."
        ],
        codeSamples: [
          {
            title: "sum",
            language: "python",
            code: "from django.db.models import Sum, Q\n\nincome = Order.objects.aggregate(\n    total=Sum('amount', filter=Q(status='paid'))\n)"
          }
        ]
      },
      {
        title: "06. values + annotate (group by)",
        body: [
          "values bilan guruhlab, annotate bilan hisob qilasiz.",
          "Bu SQL GROUP BY ga teng."
        ],
        codeSamples: [
          {
            title: "group by",
            language: "python",
            code: "data = Book.objects.values('category_id').annotate(total=Count('id'))"
          }
        ]
      },
      {
        title: "07. Annotated field bo'yicha order",
        body: [
          "Annotate qilingan field bo'yicha saralash mumkin.",
          "Top listlar uchun foydali."
        ],
        codeSamples: [
          {
            title: "order_by",
            language: "python",
            code: "authors = Author.objects.annotate(cnt=Count('books')).order_by('-cnt')"
          }
        ]
      },
      {
        title: "08. F expression",
        body: [
          "F bilan DB ichida hisoblash qilasiz.",
          "Python loopga ehtiyoj qolmaydi."
        ],
        codeSamples: [
          {
            title: "F expression",
            language: "python",
            code: "from django.db.models import F\n\nBook.objects.update(stock=F('stock') - 1)"
          }
        ]
      },
      {
        title: "09. Q object bilan murakkab filter",
        body: [
          "OR/AND logikalar uchun Q ishlatiladi.",
          "Murakkab filterlarni soddalashtiradi."
        ],
        codeSamples: [
          {
            title: "Q filter",
            language: "python",
            code: "from django.db.models import Q\n\nbooks = Book.objects.filter(Q(price__lt=10) | Q(is_free=True))"
          }
        ]
      },
      {
        title: "10. Case/When bilan shartli annotate",
        body: [
          "Case/When bilan shartli qiymat berasiz.",
          "SQL CASE WHEN ga teng."
        ],
        codeSamples: [
          {
            title: "case when",
            language: "python",
            code: "from django.db.models import Case, When, Value, CharField\n\nbooks = Book.objects.annotate(\n    price_type=Case(\n        When(price__lte=0, then=Value('free')),\n        default=Value('paid'),\n        output_field=CharField(),\n    )\n)"
          }
        ]
      },
      {
        title: "11. Coalesce bilan nullni to'ldirish",
        body: [
          "Null bo'lsa default qiymat beriladi.",
          "Hisoblashlarda xatoni oldini oladi."
        ],
        codeSamples: [
          {
            title: "coalesce",
            language: "python",
            code: "from django.db.models import Value\nfrom django.db.models.functions import Coalesce\n\nbooks = Book.objects.annotate(safe_rating=Coalesce('rating', Value(0)))"
          }
        ]
      },
      {
        title: "12. Cast bilan tip o'zgartirish",
        body: [
          "Cast qiymat tipini o'zgartiradi.",
          "Masalan numberni stringga aylantirish."
        ],
        codeSamples: [
          {
            title: "cast",
            language: "python",
            code: "from django.db.models import CharField\nfrom django.db.models.functions import Cast\n\nbooks = Book.objects.annotate(price_text=Cast('price', output_field=CharField()))"
          }
        ]
      },
      {
        title: "13. Concat bilan fieldlarni birlashtirish",
        body: [
          "Concat string fieldlarni SQL ichida birlashtiradi.",
          "Full name kabi qiymatlar uchun ishlatiladi."
        ],
        codeSamples: [
          {
            title: "concat",
            language: "python",
            code: "from django.db.models import Value\nfrom django.db.models.functions import Concat\n\nauthors = Author.objects.annotate(full_name=Concat('first_name', Value(' '), 'last_name'))"
          }
        ]
      },
      {
        title: "14. Lower/Upper funksiyalari",
        body: [
          "Case-insensitive qidiruv uchun lower/upper ishlatiladi.",
          "Bu DB darajasida ishlaydi."
        ],
        codeSamples: [
          {
            title: "lower",
            language: "python",
            code: "from django.db.models.functions import Lower\n\nbooks = Book.objects.annotate(lower_title=Lower('title'))"
          }
        ]
      },
      {
        title: "15. Length bilan uzunlik",
        body: [
          "String uzunligini SQL ichida olishingiz mumkin.",
          "Masalan title uzunligini hisoblash."
        ],
        codeSamples: [
          {
            title: "length",
            language: "python",
            code: "from django.db.models.functions import Length\n\nbooks = Book.objects.annotate(title_len=Length('title'))"
          }
        ]
      },
      {
        title: "16. ExtractYear va TruncDate",
        body: [
          "Sana bo'yicha yil yoki kun kesib olish mumkin.",
          "Hisobotlar uchun qulay."
        ],
        codeSamples: [
          {
            title: "extract year",
            language: "python",
            code: "from django.db.models.functions import ExtractYear, TruncDate\n\nbooks = Book.objects.annotate(year=ExtractYear('created_at'), day=TruncDate('created_at'))"
          }
        ]
      },
      {
        title: "17. ExpressionWrapper",
        body: [
          "Murakkab matematik ifodalarni belgilash uchun kerak.",
          "Output fieldni aniq berasiz."
        ],
        codeSamples: [
          {
            title: "expression wrapper",
            language: "python",
            code: "from django.db.models import ExpressionWrapper, DecimalField, F\n\nbooks = Book.objects.annotate(\n    total=ExpressionWrapper(F('price') * F('quantity'), output_field=DecimalField())\n)"
          }
        ]
      },
      {
        title: "18. Subquery + OuterRef",
        body: [
          "Bitta query ichida boshqa query natijasini olish mumkin.",
          "Masalan eng so'nggi comment."
        ],
        codeSamples: [
          {
            title: "subquery",
            language: "python",
            code: "from django.db.models import OuterRef, Subquery\n\nlatest = Comment.objects.filter(post=OuterRef('pk')).order_by('-created_at').values('text')[:1]\nposts = Post.objects.annotate(latest_comment=Subquery(latest))"
          }
        ]
      },
      {
        title: "19. Exists bilan boolean",
        body: [
          "Exists subquery boolean qaytaradi.",
          "Userda to'lov bormi kabi savol uchun."
        ],
        codeSamples: [
          {
            title: "exists",
            language: "python",
            code: "from django.db.models import Exists, OuterRef\n\npaid = Order.objects.filter(user=OuterRef('pk'), status='paid')\nusers = User.objects.annotate(has_paid=Exists(paid))"
          }
        ]
      },
      {
        title: "20. Greatest/Least funksiyalari",
        body: [
          "Bir nechta qiymatdan eng kattasi yoki eng kichigini olasiz.",
          "Chegirma hisoblashda foydali."
        ],
        codeSamples: [
          {
            title: "greatest",
            language: "python",
            code: "from django.db.models.functions import Greatest\n\nproducts = Product.objects.annotate(best_price=Greatest('price', 'discount_price'))"
          }
        ]
      }
    ]
  },
  30: {
    summary: "Checkpoint: E-Library backendni boshidan toza arxitektura bilan yig'ish. Modellar, servis qatlam, selectorlar, testlar va optimizatsiya bir joyda jamlanadi.",
    goals: [
      "App va model strukturani to'g'ri qurish",
      "Service layer va selectorlar yozish",
      "Data integrity va transactionlarni qo'llash",
      "Performance va testlar bilan mustahkamlash"
    ],
    sections: [
      {
        title: "01. Project strukturasi",
        body: [
          "Applarni domen bo'yicha ajrating: users, books, borrows.",
          "Har bir appda models, services, selectors bo'ladi."
        ],
        codeSamples: [
          {
            title: "structure",
            language: "bash",
            code: "apps/\n  users/\n  books/\n  borrows/\ncore/"
          }
        ]
      },
      {
        title: "02. Environment sozlamalari",
        body: [
          "SECRET_KEY va DATABASE_URL ni .env dan o'qing.",
          "Prod va dev muhitni ajrating."
        ],
        codeSamples: [
          {
            title: "settings",
            language: "python",
            code: "import os\n\nSECRET_KEY = os.getenv('SECRET_KEY', 'dev')"
          }
        ]
      },
      {
        title: "03. Custom user tayyorlash",
        body: [
          "Email login va qo'shimcha fieldlar uchun CustomUser ishlatiladi.",
          "AUTH_USER_MODEL ni birinchi migratsiyadan oldin qo'ying."
        ],
        codeSamples: [
          {
            title: "auth user",
            language: "python",
            code: "AUTH_USER_MODEL = 'users.CustomUser'"
          }
        ]
      },
      {
        title: "04. Category modeli",
        body: [
          "Kitoblar kategoriya bo'yicha guruhlanadi.",
          "Slug bilan URL friendly bo'ladi."
        ],
        codeSamples: [
          {
            title: "category",
            language: "python",
            code: "class Category(models.Model):\n    title = models.CharField(max_length=120)\n    slug = models.SlugField(unique=True)"
          }
        ]
      },
      {
        title: "05. Author modeli",
        body: [
          "Mualliflar alohida model bo'lishi kerak.",
          "Keyin statistika va filtrlar oson bo'ladi."
        ],
        codeSamples: [
          {
            title: "author",
            language: "python",
            code: "class Author(models.Model):\n    first_name = models.CharField(max_length=60)\n    last_name = models.CharField(max_length=60)"
          }
        ]
      },
      {
        title: "06. Book modeli",
        body: [
          "Book model Category va Author bilan bog'lanadi.",
          "ISBN unique bo'lishi kerak."
        ],
        codeSamples: [
          {
            title: "book",
            language: "python",
            code: "class Book(models.Model):\n    title = models.CharField(max_length=200)\n    isbn = models.CharField(max_length=13, unique=True)\n    category = models.ForeignKey(Category, on_delete=models.PROTECT)\n    authors = models.ManyToManyField(Author, related_name='books')"
          }
        ]
      },
      {
        title: "07. BookCopy modeli",
        body: [
          "Kitobning har bir nusxasi alohida saqlanadi.",
          "Borrow logikasi uchun kerak."
        ],
        codeSamples: [
          {
            title: "book copy",
            language: "python",
            code: "class BookCopy(models.Model):\n    book = models.ForeignKey(Book, on_delete=models.CASCADE)\n    code = models.CharField(max_length=30, unique=True)\n    is_available = models.BooleanField(default=True)"
          }
        ]
      },
      {
        title: "08. Borrow modeli",
        body: [
          "Qarz olish jarayonini shu model boshqaradi.",
          "User va BookCopy bilan bog'lanadi."
        ],
        codeSamples: [
          {
            title: "borrow",
            language: "python",
            code: "class Borrow(models.Model):\n    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)\n    copy = models.ForeignKey(BookCopy, on_delete=models.PROTECT)\n    borrowed_at = models.DateTimeField(auto_now_add=True)"
          }
        ]
      },
      {
        title: "09. Status uchun TextChoices",
        body: [
          "Borrow holatini status bilan belgilash mumkin.",
          "TextChoices kodni toza qiladi."
        ],
        codeSamples: [
          {
            title: "status",
            language: "python",
            code: "class BorrowStatus(models.TextChoices):\n    ACTIVE = 'active', 'Active'\n    RETURNED = 'returned', 'Returned'"
          }
        ]
      },
      {
        title: "10. Borrow service funksiyasi",
        body: [
          "Business qoidalar service layerda bo'lishi kerak.",
          "Limit va availability shu yerda tekshiriladi."
        ],
        codeSamples: [
          {
            title: "borrow service",
            language: "python",
            code: "from django.db import transaction\n\ndef borrow_copy(user, copy):\n    if not copy.is_available:\n        raise ValueError('Not available')\n    with transaction.atomic():\n        Borrow.objects.create(user=user, copy=copy)\n        copy.is_available = False\n        copy.save()"
          }
        ]
      },
      {
        title: "11. Selector bilan list tayyorlash",
        body: [
          "List querylarni selector funksiya ichida yozing.",
          "View faqat shu funksiyani chaqiradi."
        ],
        codeSamples: [
          {
            title: "selector",
            language: "python",
            code: "def list_books():\n    return Book.objects.select_related('category').prefetch_related('authors')"
          }
        ]
      },
      {
        title: "12. Unique constraint",
        body: [
          "ISBN takrorlanmasligi shart.",
          "Constraint DB darajasida himoya qiladi."
        ],
        codeSamples: [
          {
            title: "constraint",
            language: "python",
            code: "class Meta:\n    constraints = [\n        models.UniqueConstraint(fields=['isbn'], name='uniq_isbn')\n    ]"
          }
        ]
      },
      {
        title: "13. Index bilan qidiruv tezligi",
        body: [
          "title yoki slug bo'yicha qidiruv tez bo'lishi kerak.",
          "Index bilan tezlashadi."
        ],
        codeSamples: [
          {
            title: "index",
            language: "python",
            code: "class Meta:\n    indexes = [models.Index(fields=['title'], name='book_title_idx')]"
          }
        ]
      },
      {
        title: "14. Transaction bilan borrow",
        body: [
          "Borrow yaratish va copy update birga bo'lishi kerak.",
          "Atomic bilan himoyalang."
        ],
        codeSamples: [
          {
            title: "atomic borrow",
            language: "python",
            code: "with transaction.atomic():\n    borrow = Borrow.objects.create(user=user, copy=copy)\n    copy.is_available = False\n    copy.save()"
          }
        ]
      },
      {
        title: "15. Signal bilan stock update",
        body: [
          "Borrow qaytganda copy qayta available bo'ladi.",
          "Signal bilan statusni avtomatik o'zgartiring."
        ],
        codeSamples: [
          {
            title: "signal",
            language: "python",
            code: "from django.db.models.signals import post_save\nfrom django.dispatch import receiver\n\n@receiver(post_save, sender=Borrow)\ndef mark_copy(sender, instance, created, **kwargs):\n    if instance.status == BorrowStatus.RETURNED:\n        instance.copy.is_available = True\n        instance.copy.save()"
          }
        ]
      },
      {
        title: "16. Admin panelni moslash",
        body: [
          "list_display va search_fields bilan admin qulay bo'ladi.",
          "Operatorlar tez ishlaydi."
        ],
        codeSamples: [
          {
            title: "admin",
            language: "python",
            code: "from django.contrib import admin\n\n@admin.register(Book)\nclass BookAdmin(admin.ModelAdmin):\n    list_display = ('title', 'isbn')\n    search_fields = ('title', 'isbn')"
          }
        ]
      },
      {
        title: "17. Seed command yozish",
        body: [
          "Demo data uchun management command yoziladi.",
          "Bu test va demo uchun qulay."
        ],
        codeSamples: [
          {
            title: "seed command",
            language: "python",
            code: "class Command(BaseCommand):\n    def handle(self, *args, **kwargs):\n        Book.objects.create(title='Demo', isbn='123')"
          }
        ]
      },
      {
        title: "18. Borrow limit test",
        body: [
          "User 3 tadan ko'p qarz olmasin degan qoida testlanadi.",
          "Business qoidalar unit testda mustahkam bo'ladi."
        ],
        codeSamples: [
          {
            title: "limit test",
            language: "python",
            code: "def test_borrow_limit(self):\n    for _ in range(3):\n        borrow_copy(self.user, self.copy)\n    with self.assertRaises(ValueError):\n        borrow_copy(self.user, self.copy)"
          }
        ]
      },
      {
        title: "19. Cache bilan top list",
        body: [
          "Eng ko'p o'qilgan kitoblar ro'yxati cache qilinadi.",
          "DB yuklamasi kamayadi."
        ],
        codeSamples: [
          {
            title: "cache",
            language: "python",
            code: "from django.core.cache import cache\n\ndef top_books():\n    return cache.get_or_set('top_books', lambda: list(Book.objects.values('id', 'title')), 300)"
          }
        ]
      },
      {
        title: "20. Performance selectorlar",
        body: [
          "select_related/prefetch_related bilan list tezlashadi.",
          "N+1 muammosini yo'q qilasiz."
        ],
        codeSamples: [
          {
            title: "optimized list",
            language: "python",
            code: "books = Book.objects.select_related('category').prefetch_related('authors')"
          }
        ]
      }
    ]
  },
  31: {
    summary: "DRF fundamentals - API qurishning eng to'g'ri yo'li. Serializer, Response, status code va @api_view bilan JSON API yaratishni boshlaysiz.",
    goals: [
      "DRF ni o'rnatish va sozlash",
      "Serializerlar bilan ishlash",
      "Function-based va class-based API viewlar",
      "Status code va validationni boshqarish"
    ],
    sections: [
      {
        title: "01. DRF o'rnatish",
        body: [
          "djangorestframework paketini o'rnating.",
          "Bu API uchun asosiy kutubxona."
        ],
        codeSamples: [
          {
            title: "install drf",
            language: "bash",
            code: "pip install djangorestframework"
          }
        ]
      },
      {
        title: "02. INSTALLED_APPS ga qo'shish",
        body: [
          "DRF ishlashi uchun settingsga qo'shing.",
          "Keyin migratsiya shart emas."
        ],
        codeSamples: [
          {
            title: "settings",
            language: "python",
            code: "INSTALLED_APPS += ['rest_framework']"
          }
        ]
      },
      {
        title: "03. @api_view bilan birinchi API",
        body: [
          "Function-based API uchun @api_view ishlatiladi.",
          "GET/POST metodlarini belgilaysiz."
        ],
        codeSamples: [
          {
            title: "api_view",
            language: "python",
            code: "from rest_framework.decorators import api_view\nfrom rest_framework.response import Response\n\n@api_view(['GET'])\ndef ping(request):\n    return Response({'ok': True})"
          }
        ]
      },
      {
        title: "04. Response va status code",
        body: [
          "Response DRF ning asosiy javobi.",
          "status bilan aniq HTTP code berasiz."
        ],
        codeSamples: [
          {
            title: "status",
            language: "python",
            code: "from rest_framework import status\n\nreturn Response({'detail': 'created'}, status=status.HTTP_201_CREATED)"
          }
        ]
      },
      {
        title: "05. Serializer klassi",
        body: [
          "Serializer input va outputni nazorat qiladi.",
          "Fieldlar aniq yoziladi."
        ],
        codeSamples: [
          {
            title: "serializer",
            language: "python",
            code: "from rest_framework import serializers\n\nclass BookSerializer(serializers.Serializer):\n    title = serializers.CharField()\n    price = serializers.DecimalField(max_digits=8, decimal_places=2)"
          }
        ]
      },
      {
        title: "06. is_valid va errors",
        body: [
          "Serializer validatsiya qilinadi.",
          "Xato bo'lsa errors qaytariladi."
        ],
        codeSamples: [
          {
            title: "is_valid",
            language: "python",
            code: "serializer = BookSerializer(data=request.data)\nserializer.is_valid(raise_exception=True)"
          }
        ]
      },
      {
        title: "07. serializer.save",
        body: [
          "Serializer create/update logikasini saqlaydi.",
          "save() bilan model yaratiladi."
        ],
        codeSamples: [
          {
            title: "save",
            language: "python",
            code: "serializer = BookSerializer(data=request.data)\nserializer.is_valid(raise_exception=True)\nbook = serializer.save()"
          }
        ]
      },
      {
        title: "08. ModelSerializer",
        body: [
          "ModelSerializer ko'p kodni qisqartiradi.",
          "Meta ichida model va fields beriladi."
        ],
        codeSamples: [
          {
            title: "model serializer",
            language: "python",
            code: "class BookSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Book\n        fields = ['id', 'title', 'price']"
          }
        ]
      },
      {
        title: "09. APIView class",
        body: [
          "Class-based API uchun APIView ishlatiladi.",
          "get/post metodlarini yozasiz."
        ],
        codeSamples: [
          {
            title: "APIView",
            language: "python",
            code: "from rest_framework.views import APIView\n\nclass BookList(APIView):\n    def get(self, request):\n        return Response([])"
          }
        ]
      },
      {
        title: "10. request.data",
        body: [
          "DRF request.data JSON ni avtomatik parse qiladi.",
          "GET uchun request.query_params ishlatiladi."
        ],
        codeSamples: [
          {
            title: "request data",
            language: "python",
            code: "data = request.data\nsearch = request.query_params.get('search')"
          }
        ]
      },
      {
        title: "11. URL routing",
        body: [
          "APIView lar urls.py da ulanadi.",
          "path bilan endpoint berasiz."
        ],
        codeSamples: [
          {
            title: "urls",
            language: "python",
            code: "from django.urls import path\n\nurlpatterns = [\n    path('books/', BookList.as_view(), name='book-list'),\n]"
          }
        ]
      },
      {
        title: "12. get_object_or_404",
        body: [
          "Detail viewda object topilmasa 404 qaytadi.",
          "Bu xavfsiz va toza yechim."
        ],
        codeSamples: [
          {
            title: "get_object_or_404",
            language: "python",
            code: "from django.shortcuts import get_object_or_404\n\nbook = get_object_or_404(Book, pk=pk)"
          }
        ]
      },
      {
        title: "13. SerializerMethodField",
        body: [
          "Dinamik fieldlarni hisoblab berish uchun ishlatiladi.",
          "get_<field> metodini yozasiz."
        ],
        codeSamples: [
          {
            title: "method field",
            language: "python",
            code: "class BookSerializer(serializers.ModelSerializer):\n    rating = serializers.SerializerMethodField()\n\n    def get_rating(self, obj):\n        return obj.rating or 0"
          }
        ]
      },
      {
        title: "14. Nested serializer",
        body: [
          "Related modelni ichida ko'rsatish uchun nested serializer ishlatiladi.",
          "many=True bilan list ko'rsatiladi."
        ],
        codeSamples: [
          {
            title: "nested",
            language: "python",
            code: "class AuthorSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Author\n        fields = ['id', 'first_name', 'last_name']\n\nclass BookSerializer(serializers.ModelSerializer):\n    authors = AuthorSerializer(many=True)\n    class Meta:\n        model = Book\n        fields = ['id', 'title', 'authors']"
          }
        ]
      },
      {
        title: "15. Custom validate",
        body: [
          "Field yoki object level validation yozasiz.",
          "Xato bo'lsa ValidationError qaytariladi."
        ],
        codeSamples: [
          {
            title: "validate",
            language: "python",
            code: "class BookSerializer(serializers.ModelSerializer):\n    def validate_price(self, value):\n        if value < 0:\n            raise serializers.ValidationError('price must be positive')\n        return value"
          }
        ]
      },
      {
        title: "16. Error response",
        body: [
          "Xato holatlarda to'g'ri status qaytaring.",
          "Client nima bo'layotganini tushunadi."
        ],
        codeSamples: [
          {
            title: "error response",
            language: "python",
            code: "return Response({'detail': 'Not found'}, status=404)"
          }
        ]
      },
      {
        title: "17. Permission basics",
        body: [
          "API default ochiq bo'lmasligi kerak.",
          "IsAuthenticated bilan himoya qilasiz."
        ],
        codeSamples: [
          {
            title: "permissions",
            language: "python",
            code: "from rest_framework.permissions import IsAuthenticated\n\nclass BookList(APIView):\n    permission_classes = [IsAuthenticated]"
          }
        ]
      },
      {
        title: "18. Browsable API",
        body: [
          "DRF ning browsable API si test uchun juda qulay.",
          "Renderer classes bilan boshqariladi."
        ],
        codeSamples: [
          {
            title: "renderers",
            language: "python",
            code: "REST_FRAMEWORK = {\n    'DEFAULT_RENDERER_CLASSES': [\n        'rest_framework.renderers.JSONRenderer',\n        'rest_framework.renderers.BrowsableAPIRenderer',\n    ]\n}"
          }
        ]
      },
      {
        title: "19. Oddiy pagination",
        body: [
          "Ko'p data bo'lsa pagination kerak bo'ladi.",
          "PageNumberPagination bilan boshlash oson."
        ],
        codeSamples: [
          {
            title: "pagination",
            language: "python",
            code: "from rest_framework.pagination import PageNumberPagination\n\nclass BookPagination(PageNumberPagination):\n    page_size = 10"
          }
        ]
      },
      {
        title: "20. API struktura",
        body: [
          "API uchun views.py, serializers.py, urls.py alohida saqlang.",
          "Kodni topish va kengaytirish oson bo'ladi."
        ],
        codeSamples: [
          {
            title: "api structure",
            language: "bash",
            code: "books/\n  serializers.py\n  views.py\n  urls.py"
          }
        ]
      }
    ]
  },
  61: aiConfusionRadarLesson,
};

export const lessonOverrides: Record<number, LessonContent> = {
  ...baseLessonOverrides,
  ...drfLessonOverrides,
};
