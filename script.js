const lessons = [
  {
    id: 1,
    title: 'أساسيات HTML',
    summary: 'هيكل الصفحات والوسوم الأساسية',
    description:
      'تعلّم كيفية بناء الصفحة باستخدام العناوين، الفقرات، القوائم، الروابط والصور. هذا الدرس يساعدك على فهم البنية الأساسية للويب.',
    points: ['العناوين من h1 إلى h6', 'الوسوم الأساسية مثل p و a و img', 'كيفية بناء قائمة منظمة وغير منظمة']
  },
  {
    id: 2,
    title: 'أساسيات CSS',
    summary: 'الألوان، المسافات، والتنسيق',
    description:
      'CSS يضيف الشكل والمظهر إلى HTML. ستتعلم الألوان، الحواف، الهوامش، والخلفيات وكيفية ترتيب العناصر داخل الصفحة.',
    points: ['اللون والخلفية', 'المسافات والهوامش', 'تصميم الأزرار والكروت']
  },
  {
    id: 3,
    title: 'JavaScript',
    summary: 'تفاعل الصفحة مع المستخدم',
    description:
      'JavaScript يضيف التفاعل، مثل النقرات، التحقق من المدخلات، وعرض الرسائل ديناميكيًا. هذا هو لبنة التطبيق التفاعلي.',
    points: ['المتغيرات والوظائف', 'الأحداث مثل click و submit', 'إظهار البيانات داخل الصفحة']
  }
];

const quizQuestions = [
  {
    question: 'ما هي لغة البرمجة المستخدمة في تصميم صفحات الويب؟',
    answers: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    correct: 2
  },
  {
    question: 'ما الذي يحدد شكل الصفحة ومظهرها؟',
    answers: ['HTML', 'CSS', 'Python', 'PHP'],
    correct: 1
  },
  {
    question: 'أي وسوم تستخدم لإنشاء الروابط؟',
    answers: ['<img>', '<a>', '<div>', '<p>'],
    correct: 1
  }
];

const lessonGrid = document.getElementById('lessonGrid');
const lessonTitle = document.getElementById('lessonTitle');
const lessonDescription = document.getElementById('lessonDescription');
const lessonPoints = document.getElementById('lessonPoints');

function renderLessons() {
  lessonGrid.innerHTML = '';

  lessons.forEach((lesson) => {
    const card = document.createElement('article');
    card.className = 'lesson-card active';
    card.innerHTML = `
      <h4>${lesson.title}</h4>
      <p>${lesson.summary}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.lesson-card').forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      showLessonDetails(lesson);
    });

    lessonGrid.appendChild(card);
  });

  showLessonDetails(lessons[0]);
}

function showLessonDetails(lesson) {
  lessonTitle.textContent = lesson.title;
  lessonDescription.textContent = lesson.description;
  lessonPoints.innerHTML = lesson.points.map((point) => `<li>${point}</li>`).join('');
}

const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach((button) => {
  button.addEventListener('click', () => {
    navItems.forEach((item) => item.classList.remove('active'));
    panels.forEach((panel) => panel.classList.remove('active-panel'));

    button.classList.add('active');
    const target = document.getElementById(button.dataset.target);
    target.classList.add('active-panel');
  });
});

const startLearningBtn = document.getElementById('startLearningBtn');
startLearningBtn.addEventListener('click', () => {
  navItems.forEach((item) => item.classList.remove('active'));
  panels.forEach((panel) => panel.classList.remove('active-panel'));
  document.querySelector('[data-target="lessons"]').classList.add('active');
  document.getElementById('lessons').classList.add('active-panel');
});

const questionText = document.getElementById('questionText');
const answersEl = document.getElementById('answers');
const quizResult = document.getElementById('quizResult');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

function renderQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  questionText.textContent = question.question;
  answersEl.innerHTML = '';
  quizResult.textContent = '';
  selectedAnswerIndex = null;

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;

    button.addEventListener('click', () => {
      selectedAnswerIndex = index;
      document.querySelectorAll('.answer-btn').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
    });

    answersEl.appendChild(button);
  });
}

nextQuestionBtn.addEventListener('click', () => {
  if (selectedAnswerIndex === null) {
    quizResult.textContent = 'اختر إجابة قبل المتابعة.';
    return;
  }

  const correctIndex = quizQuestions[currentQuestionIndex].correct;
  if (selectedAnswerIndex === correctIndex) {
    score += 1;
    quizResult.textContent = 'إجابة صحيحة!';
  } else {
    quizResult.textContent = `إجابة خاطئة. الإجابة الصحيحة هي: ${quizQuestions[currentQuestionIndex].answers[correctIndex]}`;
  }

  setTimeout(() => {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      questionText.textContent = `تم الانتهاء! نتيجتك: ${score} من ${quizQuestions.length}`;
      answersEl.innerHTML = '';
      quizResult.textContent = 'أحسنت! استمر بالتعلم.';
      nextQuestionBtn.textContent = 'إعادة الاختبار';
      nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        nextQuestionBtn.textContent = 'السؤال التالي';
        renderQuestion();
      }, { once: true });
    }
  }, 700);
});

renderLessons();
renderQuestion();

const progressBar = document.getElementById('progressBar');
const dailyProgress = document.getElementById('dailyProgress');

progressBar.style.width = '72%';
dailyProgress.textContent = '72%';
