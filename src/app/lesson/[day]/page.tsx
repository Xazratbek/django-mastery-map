import Link from 'next/link';
import { notFound } from 'next/navigation';
import { roadmapData } from '@/data/roadmapData';

type LessonPageProps = {
  params: { day: string } | Promise<{ day: string }>;
};

const formatDay = (dayNumber: number) => `Day ${dayNumber}`;
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default async function LessonPage({ params }: LessonPageProps) {
  const { day } = await params;
  const dayNumber = Number(day);
  if (!Number.isFinite(dayNumber)) {
    notFound();
  }

  const stage = roadmapData.find((item) => item.dayNumber === dayNumber);
  if (!stage) {
    notFound();
  }

  const lesson = stage.lesson;
  const sectionItems = lesson?.sections?.map((section, index) => {
    const baseId = section.anchorId || slugify(section.title);
    const fallbackId = baseId ? `${baseId}-${index + 1}` : `section-${index + 1}`;
    return {
      id: section.anchorId || fallbackId,
      label: section.tocLabel || section.title,
    };
  }) ?? [];

  return (
    <main className="min-h-screen bg-navy-950 text-slate-100">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black tracking-widest uppercase bg-brand-500 text-white px-3 py-1 rounded-sm">
                {formatDay(stage.dayNumber)}
              </span>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-md px-3 py-1 font-semibold">
                {stage.difficulty}
              </span>
              <span className="text-xs text-slate-500 border border-slate-800 rounded-md px-3 py-1 font-semibold">
                {stage.category}
              </span>
            </div>
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
            >
              Roadmapga qaytish
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-widest font-bold text-slate-400">
            <a
              href="/cheatsheets"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              Cheat Sheets
            </a>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {stage.title}
          </h1>
          <p className="mt-3 text-base text-brand-200 font-medium max-w-3xl">
            {stage.shortDescription}
          </p>
          <p className="mt-4 text-sm text-slate-300 max-w-3xl leading-relaxed">
            {stage.longDescription}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-1">
                Today&apos;s Target
              </span>
              <p className="text-sm text-brand-200">{stage.todayFocus}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-1">
                Why it matters
              </span>
              <p className="text-sm text-indigo-200">{stage.whyItMatters}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {!lesson && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300">
            Bu kun uchun to&apos;liq dars kontenti hali yozilmagan.
          </div>
        )}

        {lesson && (
          <>
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">To&apos;liq dars</h2>
                <p className="text-base text-slate-200 leading-relaxed">{lesson.summary}</p>
              </div>
              <div className="bg-navy-900/60 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                  Nimani o&apos;rganasiz
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {lesson.goals.map((goal, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="space-y-6">
                {lesson.sections.map((section, index) => {
                  const sectionId = sectionItems[index]?.id || `section-${index + 1}`;
                  return (
                    <div
                      key={index}
                      id={sectionId}
                      className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 space-y-4 scroll-mt-24"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-black text-white">{section.title}</h3>
                        <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {section.body?.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-sm text-slate-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      {section.steps && section.steps.length > 0 && (
                        <ol className="space-y-2 list-decimal list-inside text-sm text-slate-300">
                          {section.steps.map((step, sIdx) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      )}
                      {section.codeSamples && section.codeSamples.length > 0 && (
                        <div className="space-y-3">
                          {section.codeSamples.map((sample, sIdx) => (
                            <div key={sIdx} className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                              <div className="flex items-center justify-between px-3 py-2 bg-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                <span>{sample.title}</span>
                                <span>{sample.language}</span>
                              </div>
                              <pre className="text-xs text-slate-200 font-mono p-3 overflow-x-auto whitespace-pre">
                                {sample.code}
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {sectionItems.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24 bg-navy-900/60 border border-white/10 rounded-2xl p-4 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Bo&apos;limlar</h3>
                    <nav className="space-y-2 text-sm text-slate-300">
                      {sectionItems.map((item, index) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-start gap-2 hover:text-white transition-colors"
                        >
                          <span className="text-[10px] text-slate-500 mt-0.5">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}
            </section>

            {lesson.miniLab && (
              <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-black/30 border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Mini-lab</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {lesson.miniLab.tasks.map((task, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-navy-900/60 border border-white/10 rounded-2xl p-6 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Kutilgan natija</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {lesson.miniLab.expectedOutput.map((item, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {lesson.quiz && lesson.quiz.length > 0 && (
              <section className="bg-navy-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Mini-quiz</h3>
                <div className="space-y-3">
                  {lesson.quiz.map((quiz, index) => (
                    <details key={index} className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <summary className="cursor-pointer text-sm font-semibold text-slate-200">
                        {index + 1}. {quiz.question}
                      </summary>
                      <p className="mt-2 text-sm text-slate-300">{quiz.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {lesson.projectMapping && lesson.projectMapping.length > 0 && (
              <section className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Project mapping</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {lesson.projectMapping.map((item, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {lesson.challengeTasks && lesson.challengeTasks.length > 0 && (
              <section className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-rose-300">Challenge tasks</h3>
                <ol className="space-y-2 list-decimal list-inside text-sm text-rose-100">
                  {lesson.challengeTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ol>
              </section>
            )}

            {lesson.tips && lesson.tips.length > 0 && (
              <section className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3">
                  Praktik maslahatlar
                </h3>
                <ul className="space-y-2 text-sm text-amber-200">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
