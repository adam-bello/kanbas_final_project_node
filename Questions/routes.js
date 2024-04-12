import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  
  const createQuestion = async (req, res) => {
    const { title, points, question } = req.body;
    if (!title || !points || !question) {
      res.status(400).json({ message: "Please enter " });
    } else {
      const question = await dao.createQuestion(req.body);
      res.json(question);
    }
  };

  const deleteQuestion = async (req, res) => {
    const status = await dao.deleteQuestion(req.params.questionId);
    res.json(status);
  };

  const findAllQuestions = async (req, res) => {
    const questions = await dao.findAllQuestions();
    res.json(questions);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const questions = await dao.findQuestionById(questionId);
    res.json(questions);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    res.json(status);
  };

  app.post("/api/questions", createQuestion);
  app.get("/api/questions", findAllQuestions);
  app.get("/api/questions/:questionId", findQuestionById);
  app.put("/api/questions/:questionId", updateQuiz);
  app.delete("/api/questions/:questionId", deleteQuestion);
}
