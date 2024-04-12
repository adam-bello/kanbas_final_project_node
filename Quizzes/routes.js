import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  
  const createQuiz = async (req, res) => {
    const { name, points, numQuestions } = req.body;
    if (!name || !points || !numQuestions) {
      res.status(400).json({ message: "Please enter " });
    } else {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        const good_user = await dao.createUser(req.body);
        res.json(good_user);
      }
    }
  };

  const deleteQuiz = async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.json(status);
  };

  const findAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quizzes = await dao.findQuizById(quizId);
    res.json(quizzes);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.updateQuiz(quizId, req.body);
    res.json(status);
  };

  app.post("/api/quizzes", createQuiz);
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
