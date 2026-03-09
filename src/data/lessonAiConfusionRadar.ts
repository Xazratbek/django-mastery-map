import { LessonContent } from '../types/roadmap';

export const aiConfusionRadarLesson: LessonContent = {
  summary: "Katta loyiha - bu dars jarayonida qaysi topic yoki qismda o'quvchilar qiynalayotganini avtomatik aniqlaydigan backend mahsulot. Biz chat, note va quiz eventlarini yig'amiz, Google GenAI orqali tahlil qilamiz, risk score va mini-quiz takliflarini chiqaramiz. Bu sahifada siz 0 dan production-ready API va data pipeline qurishning to'liq mental modeli, har bir file va har bir logika nima uchun kerakligini amaliy misollar bilan ko'rasiz.",
  goals: [
    "Multi-tenant o'quv markaz modeli (Organization, Teacher, Student) ni to'g'ri qurish",
    "Chat/note/quiz eventlarini yig'ish va data oqimini normalizatsiya qilish",
    "Google GenAI bilan confusion detection va JSON outputni xavfsiz olish",
    "Celery + Redis yordamida background pipeline va retry tizimini yo'lga qo'yish",
    "Role-based auth/permissions va auditga tayyor APIlar yozish",
    "ORM optimizatsiya, caching, migration va testlar bilan production tayyorlik",
    "Docker orqali lokal/dev muhitni bir xil qilish va deploy/monitoring asoslari"
  ],
  sections: [
    {
      title: "01. Muammo va yechim: Darsdagi qiyin nuqtalar ko'rinmay qolishi",
      anchorId: "overview",
      tocLabel: "Muammo",
      body: [
        "Muammo: teacher ko'pincha qaysi topicda ko'pchilik qiynalayotganini dars tugagandan keyin biladi. Bu vaqtga kelib motivatsiya tushib ketadi, natijada keyingi darslar ham sekinlashadi.",
        "Yechim: dars davomida chat, note, quiz va attendance eventlari yig'iladi. AI ushbu matnlarni tahlil qilib 'confusion hotspot'larni topadi va teacherga real vaqt signal beradi.",
        "Nima uchun: bu mahsulot o'quv markaz uchun retention va natijani oshiradi. Qayerda ishlatiladi: offline/online darslar va mentoring sessiyalarida. Qanday: data oqimi + AI signal + dashboard."
      ],
      steps: [
        "Har bir darsda data yig'ish (chat, note, quiz).",
        "AI orqali topic bo'yicha risk score hisoblash.",
        "Teacher uchun radar dashboard va action tavsiyalar."
      ]
    },
    {
      title: "02. Rollar va qiymat oqimi (Teacher, Student, Admin)",
      anchorId: "roles",
      tocLabel: "Rollar",
      body: [
        "Rollar: Teacher - darsni boshqaradi va radar signalni ko'radi. Student - chat va note orqali fikr beradi. Admin - o'quv markaz ichidagi barcha guruhlarni nazorat qiladi.",
        "Multi-tenant model: har bir o'quv markaz alohida organization. Bu biznes jihatdan muhim, chunki data bir-biriga aralashmasligi shart.",
        "Qiymat oqimi: Student -> data event -> AI signal -> Teacher action -> natija yaxshilanadi. Biz backendda aynan shu oqimni mustahkamlaymiz."
      ],
      steps: [
        "Student dars davomida chat/note yuboradi.",
        "Backend eventni saqlaydi va Celery taskga beradi.",
        "Teacher radar orqali qiyin topicni ko'radi va tezkor izoh beradi."
      ]
    },
    {
      title: "03. Mental model: data pipeline va signal oqimi",
      anchorId: "pipeline",
      tocLabel: "Pipeline",
      body: [
        "Mental model: bu tizim event-driven. Har bir event (note, chat, quiz) bir xil formatda saqlanadi. AI analiz esa shu eventlar oqimini periodik baholaydi.",
        "Nega shunday: request ichida AI ishlatish qimmat va sekin. Shuning uchun asinxron pipeline kerak. Qayerda ishlatiladi: real dars paytida, latency past bo'lishi shart."
      ],
      codeSamples: [
        {
          title: "Pipeline oqimi",
          language: "text",
          code: `Client (student/teacher)
  -> POST /api/sessions/{id}/notes/ (raw events)
  -> Celery task: analyze_session
  -> Google GenAI: extract_confusion
  -> analytics.score_confusion
  -> ConfusionSignal table
  -> GET /api/lessons/{id}/radar/ (dashboard)`
        }
      ]
    },
    {
      title: "04. Repo va app strukturasi",
      anchorId: "structure",
      tocLabel: "Struktura",
      body: [
        "Katta loyiha tartibsiz bo'lsa, keyin uni kengaytirish qiyin. Shuning uchun domain bo'yicha app bo'lamiz: accounts, courses, lessons, sessions, ai, analytics.",
        "Services va selectors qatlamlari - biznes logika va query logikasini viewlardan ajratish uchun. Bu test yozishni ham yengillashtiradi."
      ],
      codeSamples: [
        {
          title: "Tavsiya etilgan papka tuzilmasi",
          language: "text",
          code: `ai-confusion-radar/
  config/
    settings/
      base.py
      dev.py
      prod.py
    urls.py
    wsgi.py
    celery.py
  apps/
    accounts/
    courses/
    lessons/
    sessions/
    ai/
    analytics/
    common/
  manage.py
  docker-compose.yml
  Dockerfile
  requirements.txt`
        }
      ]
    },
    {
      title: "05. Docker + Postgres + Redis lokal muhiti",
      anchorId: "docker",
      tocLabel: "Docker",
      body: [
        "Nima uchun Docker: developer muhitlari bir xil bo'ladi, 'menda ishladi' muammosi yo'qoladi. Qayerda ishlatiladi: dev va prod orasida konfiguratsiya farqini minimallashtirish.",
        "Postgres - asosiy data, Redis - cache va Celery broker. Bu ikkisi productionda eng keng ishlatiladigan kombinatsiya."
      ],
      codeSamples: [
        {
          title: "docker-compose.yml",
          language: "yaml",
          code: `version: "3.9"
services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    env_file: .env
    depends_on:
      - db
      - redis
    ports:
      - "8000:8000"
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: radar
      POSTGRES_USER: radar
      POSTGRES_PASSWORD: radar
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:7
volumes:
  postgres_data:`
        },
        {
          title: "Dockerfile",
          language: "dockerfile",
          code: `FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .`
        }
      ]
    },
    {
      title: "06. Settings va environment konfiguratsiya",
      anchorId: "settings",
      tocLabel: "Settings",
      body: [
        "Nima uchun: secretlar va muhim sozlamalar kod ichida turmasligi kerak. Qayerda: settings/base.py barcha muhit uchun, dev/prod faqat farqli qiymatlar uchun.",
        "Qanday: django-environ orqali envlarni o'qiymiz, .env.example orqali kerakli qiymatlarni hujjatlashtiramiz."
      ],
      codeSamples: [
        {
          title: "config/settings/base.py",
          language: "python",
          code: `import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()

SECRET_KEY = env("SECRET_KEY")
DEBUG = env.bool("DEBUG", default=False)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

DATABASES = {"default": env.db("DATABASE_URL")}
REDIS_URL = env("REDIS_URL")
GENAI_API_KEY = env("GENAI_API_KEY")`
        },
        {
          title: ".env.example",
          language: "text",
          code: `DEBUG=True
SECRET_KEY=change-me
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://radar:radar@db:5432/radar
REDIS_URL=redis://redis:6379/0
GENAI_API_KEY=your-key`
        }
      ]
    },
    {
      title: "07. Auth va permissions: role-based access",
      anchorId: "auth",
      tocLabel: "Auth",
      body: [
        "Nima uchun: teacher va student APIlari bir xil bo'lmasligi kerak. Har bir requestda role tekshirish xavfsizlikning asosi.",
        "Qanday: CustomUser modelida role saqlanadi, DRF permissionlar orqali endpointlar himoyalanadi."
      ],
      codeSamples: [
        {
          title: "accounts/models.py",
          language: "python",
          code: `from django.contrib.auth.models import AbstractUser
from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=255)

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin")
    ]
    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []`
        },
        {
          title: "permissions.py",
          language: "python",
          code: `from rest_framework.permissions import BasePermission

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "teacher"

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "student"`
        }
      ]
    },
    {
      title: "08. Domen modeli: Course, Lesson, Session, Chat, Note",
      anchorId: "models",
      tocLabel: "Model",
      body: [
        "Domen modeli - bu mahsulotning yuragi. Har bir entity real hayotdagi jarayonni aks ettirishi kerak: dars (Lesson) kursga tegishli, session - darsning real vaqtda o'tgan holati.",
        "Chat va note eventlari sessionga biriktiriladi. AI aynan shu eventlardan signal chiqaradi."
      ],
      codeSamples: [
        {
          title: "core models",
          language: "python",
          code: `from django.conf import settings
from django.db import models

class Course(models.Model):
    organization = models.ForeignKey("accounts.Organization", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)

class LessonSession(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField(null=True, blank=True)
    attendance_count = models.PositiveIntegerField(default=0)
    transcript = models.TextField(blank=True)

class LessonNote(models.Model):
    session = models.ForeignKey(LessonSession, on_delete=models.CASCADE)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class ChatMessage(models.Model):
    session = models.ForeignKey(LessonSession, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[("student", "student"), ("teacher", "teacher")])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class QuizAttempt(models.Model):
    session = models.ForeignKey(LessonSession, on_delete=models.CASCADE)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()`
        }
      ]
    },
    {
      title: "09. Confusion signal va scoring logikasi",
      anchorId: "signals",
      tocLabel: "Signal",
      body: [
        "ConfusionSignal - bu AI va statistik indicatorlarning natijasi. Bu jadval teacher dashboardi uchun asosiy data source bo'ladi.",
        "Qanday: event_count, quiz_score va AI confidence qiymatlari birlashtiriladi. Qayerda ishlatiladi: lesson radar API."
      ],
      codeSamples: [
        {
          title: "analytics/models.py + services.py",
          language: "python",
          code: `from django.db import models

class ConfusionSignal(models.Model):
    session = models.ForeignKey("sessions.LessonSession", on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    score = models.DecimalField(max_digits=4, decimal_places=2)
    evidence = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

def compute_confusion_score(event_count, avg_quiz_score, ai_confidence):
    base = min(event_count / 20, 1.0)
    quiz_penalty = 1 - (avg_quiz_score / 100)
    score = (base * 0.5) + (quiz_penalty * 0.3) + (ai_confidence * 0.2)
    return round(score, 3)`
        }
      ]
    },
    {
      title: "10. Google GenAI integratsiyasi (prompt + JSON guard)",
      anchorId: "genai",
      tocLabel: "GenAI",
      body: [
        "Nima uchun: AI sizga qaysi topicda confusion borligini matndan ajratib beradi. Qayerda: ai/services.py da, background task ichida.",
        "Muhim: AI javobi doim JSON qaytishi shart emas. Shuning uchun JSON guard va fallback yozamiz."
      ],
      codeSamples: [
        {
          title: "google generative ai install",
          language: "bash",
          code: `pip install google-generativeai`
        },
        {
          title: "ai/clients.py",
          language: "python",
          code: `import google.generativeai as genai
from django.conf import settings

def get_genai_model():
    genai.configure(api_key=settings.GENAI_API_KEY)
    return genai.GenerativeModel("gemini-1.5-flash")`
        },
        {
          title: "ai/services.py",
          language: "python",
          code: `import json
from .clients import get_genai_model

def analyze_confusion(transcript, notes, questions):
    prompt = (
        "Analyze confusion hotspots. Return JSON with keys: signals, confidence. "
        "signals is list of {topic, evidence}."
    )
    payload_input = "\\n".join([
        "TRANSCRIPT:\\n" + transcript,
        "NOTES:\\n" + "\\n".join(notes),
        "QUESTIONS:\\n" + "\\n".join(questions)
    ])
    model = get_genai_model()
    response = model.generate_content(prompt + "\\n" + payload_input)
    raw = response.text or "{}"
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        payload = {"signals": [], "confidence": 0.0}
    return payload`
        }
      ]
    },
    {
      title: "11. Celery + Redis: asinxron AI pipeline",
      anchorId: "celery",
      tocLabel: "Celery",
      body: [
        "AI analizni request ichida bajarish sekin va qimmat. Shuning uchun Celery task orqali backgroundda ishlaymiz.",
        "Redis broker sifatida ishlaydi. Task retry va timeoutlar productionda juda muhim."
      ],
      codeSamples: [
        {
          title: "config/celery.py",
          language: "python",
          code: `import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.prod")

app = Celery("config")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()`
        },
        {
          title: "ai/tasks.py",
          language: "python",
          code: `from celery import shared_task
from apps.sessions.models import LessonSession
from apps.ai.services import analyze_confusion
from apps.analytics.services import persist_signals

@shared_task(bind=True, max_retries=3)
def analyze_session_task(self, session_id):
    session = LessonSession.objects.select_related("lesson").get(id=session_id)
    notes = list(session.lessonnote_set.values_list("text", flat=True))
    payload = analyze_confusion(session.transcript or "", notes, [])
    persist_signals(session, payload)`
        }
      ]
    },
    {
      title: "12. DRF API dizayni va endpointlar",
      anchorId: "api",
      tocLabel: "API",
      body: [
        "API dizaynida 2ta yo'l bor: admin panel uchun CRUD va teacher dashboard uchun read-only signal API. Biz viewsetlarni role bo'yicha ajratamiz.",
        "Endpointlar real mahsulot uchun minimal, ammo yetarli bo'lishi kerak. Hamma narsa ochiq bo'lsa xavfsizlik buziladi."
      ],
      codeSamples: [
        {
          title: "endpointlar ro'yxati",
          language: "text",
          code: `GET  /api/courses/
GET  /api/lessons/{id}/radar/
POST /api/sessions/{id}/notes/
POST /api/sessions/{id}/chat/
POST /api/sessions/{id}/quiz-attempts/
GET  /api/sessions/{id}/signals/`
        },
        {
          title: "api/views.py",
          language: "python",
          code: `from rest_framework.viewsets import ReadOnlyModelViewSet
from apps.analytics.models import ConfusionSignal
from .serializers import ConfusionSignalSerializer
from apps.accounts.permissions import IsTeacher

class LessonRadarViewSet(ReadOnlyModelViewSet):
    serializer_class = ConfusionSignalSerializer
    permission_classes = [IsTeacher]

    def get_queryset(self):
        lesson_id = self.kwargs["lesson_id"]
        return ConfusionSignal.objects.filter(session__lesson_id=lesson_id).order_by("-score")`
        }
      ]
    },
    {
      title: "13. ORM optimizatsiya va caching",
      anchorId: "orm",
      tocLabel: "ORM/Cache",
      body: [
        "N+1 muammosi: radar dashboard ko'p signal qaytarganda so'rovlar soni portlaydi. select_related va prefetch_related bilan buni yechamiz.",
        "Redis cache: teacher dashboard uchun 30-60 soniya cache qo'yish real trafficda katta farq qiladi."
      ],
      codeSamples: [
        {
          title: "selectors.py",
          language: "python",
          code: `from django.core.cache import cache
from apps.analytics.models import ConfusionSignal

def get_lesson_radar(lesson_id):
    cache_key = f"radar:lesson:{lesson_id}"
    data = cache.get(cache_key)
    if data is not None:
        return data
    queryset = (
        ConfusionSignal.objects
        .filter(session__lesson_id=lesson_id)
        .select_related("session", "session__lesson")
        .order_by("-score")
    )
    data = list(queryset.values("topic", "score", "created_at"))
    cache.set(cache_key, data, 60)
    return data`
        }
      ]
    },
    {
      title: "14. Migrationlar va data integrity",
      anchorId: "migrations",
      tocLabel: "Migrations",
      body: [
        "Migration - bu database tarixidir. Productionda migrationlarni ehtiyotkorlik bilan yozish kerak: data yo'qolmasligi va downtime bo'lmasligi kerak.",
        "RunPython orqali eski data uchun backfill qilish mumkin. UniqueConstraint va Indexlar performance va integrityni saqlaydi."
      ],
      codeSamples: [
        {
          title: "data migration",
          language: "python",
          code: `from django.db import migrations

def backfill_confusion(apps, schema_editor):
    LessonSession = apps.get_model("sessions", "LessonSession")
    ConfusionSignal = apps.get_model("analytics", "ConfusionSignal")
    for session in LessonSession.objects.all():
        ConfusionSignal.objects.create(
            session=session,
            topic="bootstrap",
            score=0,
            evidence={}
        )

class Migration(migrations.Migration):
    dependencies = [("analytics", "0001_initial")]
    operations = [migrations.RunPython(backfill_confusion, migrations.RunPython.noop)]`
        }
      ]
    },
    {
      title: "15. Testlar: API va servislar",
      anchorId: "tests",
      tocLabel: "Tests",
      body: [
        "Testlar - productionga chiqish uchun minimal kafolat. API testlar, service testlar va permission testlar bo'lishi kerak.",
        "pytest + pytest-django + factory_boy kombinatsiyasi backend uchun eng keng ishlatiladigan stack."
      ],
      codeSamples: [
        {
          title: "pytest.ini",
          language: "text",
          code: `[pytest]
DJANGO_SETTINGS_MODULE = config.settings.test
python_files = tests.py test_*.py`
        },
        {
          title: "tests/test_radar_api.py",
          language: "python",
          code: `def test_teacher_can_view_radar(api_client, teacher_user, lesson, confusion_signal):
    api_client.force_authenticate(user=teacher_user)
    response = api_client.get(f"/api/lessons/{lesson.id}/radar/")
    assert response.status_code == 200`
        }
      ]
    },
    {
      title: "16. Deploy va monitoring",
      anchorId: "deploy",
      tocLabel: "Deploy",
      body: [
        "Deployda asosiy fokus: gunicorn + env + migrations + static. Monitoring uchun esa logging va Sentry integratsiyasi yetarli boshlanishdir.",
        "Health check endpoint va slow query loglari productionda tezkor muammo topishga yordam beradi."
      ],
      codeSamples: [
        {
          title: "gunicorn start",
          language: "text",
          code: `gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3`
        },
        {
          title: "sentry init",
          language: "python",
          code: `import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=env("SENTRY_DSN", default=""),
    integrations=[DjangoIntegration()],
    traces_sample_rate=0.2
)`
        }
      ]
    }
  ],
  tips: [
    "AI javobini har doim raw ko'rinishda saqlang, keyin JSON parse qiling.",
    "Multi-tenant cheklovini har bir querysetda tekshiring (organization filter).",
    "Celery tasklarni request ichida emas, signal yoki webhook orqali ishga tushiring.",
    "Dashboard uchun cache TTL 30-60 soniya qo'ysangiz ham real tajribada katta foyda beradi."
  ],
  miniLab: {
    title: "Mini-lab",
    tasks: [
      "Course, Lesson, Session modellari va migrationlarni yozing.",
      "POST /api/sessions/{id}/notes/ endpointini yarating va test yozing.",
      "Celery task orqali analyze_confusion funksiyasini chaqiring.",
      "Teacher uchun /api/lessons/{id}/radar/ endpointini chiqaring."
    ],
    expectedOutput: [
      "ConfusionSignal jadvalida real data paydo bo'ladi.",
      "Teacher dashboardi uchun ishlaydigan JSON response."
    ]
  }
};
