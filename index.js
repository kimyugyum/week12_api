const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const questions = [
  {
    id: 0,
    question: "HTML에서 링크를 만드는 태그는?",
    answers: ["<a>", "<link>", "<href>"],
  },
  {
    id: 1,
    question: "CSS에서 글자 색상을 지정하는 속성은?",
    answers: ["color", "font-color", "text-color"],
  },
  {
    id: 2,
    question: "JavaScript에서 배열의 마지막 요소를 제거하는 메서드는?",
    answers: ["pop()", "push()", "shift()"],
  },
  {
    id: 3,
    question: "CSS에서 Flexbox를 활성화하는 속성값은?",
    answers: ["display: flex", "display: grid", "display: block"],
  },
  {
    id: 4,
    question: "HTML에서 이미지를 삽입하는 태그는?",
    answers: ["<img>", "<image>", "<src>"],
  },
];

const correctAnswers = {
  0: "<a>",
  1: "color",
  2: "pop()",
  3: "display: flex",
  4: "<img>",
};

const resultMessages = {
  0: "😢 많이 틀렸어요. 다시 도전해보세요!",
  1: "😅 조금 더 공부해봐요!",
  2: "🙂 절반은 맞았어요!",
  3: "😊 꽤 잘했어요!",
  4: "👍 거의 다 맞았어요!",
  5: "🎉 완벽해요! 모두 맞았어요!",
};

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.post("/api/answers", (req, res) => {
  const { answers } = req.body;

  if (!answers || answers.length !== 5) {
    return res.status(400).json({ error: "정확히 5개의 답안을 제출해야 합니다." });
  }

  const results = answers.map(({ id, answer }) => ({
    id,
    correct: correctAnswers[id] === answer,
  }));

  res.json({ results });
});

app.get("/api/result", (req, res) => {
  const score = Number(req.query.score);

  if (isNaN(score) || score < 0 || score > 5) {
    return res.status(400).json({ error: "score는 0부터 5 사이의 숫자여야 합니다." });
  }

  res.json({ score, message: resultMessages[score] });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
