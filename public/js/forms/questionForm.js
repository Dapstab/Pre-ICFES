import { Filter } from "../utils/filterTopics";
import { temas, subtemas } from "../utils/data";
import { resize } from "../utils/resize";
import { Question } from "../axios/question";
import { CreateQuiz } from "./quizForm.js";

console.log(CreateQuiz.quizId);

export const QuestionForm = () => {
  let stepIndex = 0;
  let counter = 0;
  const topics = document.querySelector("#topics");
  const subtopics = document.querySelector("#subtopics");
  const subject = document.querySelector("#subject");
  const textareas = document.querySelectorAll("textarea");
  const topicList = document.querySelector(".topics");
  const subTopicList = document.querySelector(".subtopics");
  const questionForm = document.getElementById("form__question");

  textareas.forEach((textarea) => resize(textarea));

  const steps = document.querySelectorAll("fieldset");
  const nextBtns = document.querySelectorAll(".nextBtn");
  const prevBtns = document.querySelectorAll(".prevBtn");
  currentPage(nextBtns, "+");
  currentPage(prevBtns, "-");

  removeData();
  showTopics();
  showSubTopics();
  closeTopic();
  sendQuestionData();
  function currentPage(domArray, inc) {
    domArray.forEach((button) =>
      button.addEventListener("click", () => {
        steps[stepIndex].classList.add("hidden");
        inc === "+" ? stepIndex++ : stepIndex--;
        steps[stepIndex].classList.remove("hidden");
      })
    );
  }
  function closeTopic(name, tag) {
    let data = document.createElement("li");
    data.innerHTML = `<span class="close-${counter}">X</span> ${name}`;
    data.classList.add(`${tag}-${counter}`);
    tag === "topic"
      ? topicList.appendChild(data)
      : subTopicList.appendChild(data);
    data = document.querySelector(`.${tag}-${counter}`);
    let close = document.querySelector(`.close-${counter}`);
    close.addEventListener("click", () => {
      data.remove();
    });
    counter++;
  }
  function removeData() {
    subject.addEventListener("change", () => {
      Filter.removeOptions(topics);
      Filter.removeOptions(subtopics);
    });
  }

  function showTopics() {
    subject.addEventListener("change", (e) => {
      Filter.removeOptions(topics);
      Filter.addOptions(topics, temas[e.target.value]);
    });
  }

  function showSubTopics() {
    topics.addEventListener("change", (e) => {
      closeTopic(e.target.value, "topic");
      Filter.removeOptions(subtopics);
      Filter.addOptions(subtopics, subtemas[e.target.value]);
    });
    subtopics.addEventListener("change", (e) => {
      closeTopic(e.target.value, "subtopic");
    });
  }

  function sendQuestionData() {
    questionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const asignatura = document.getElementById("subject").value;
      const temas = document.getElementById("topics").value;
      const subtemas = document.getElementById("subtopics").value;
      const dificultad = document.getElementById("difficulty").value;
      const pregunta = document.getElementById("question").value;
      let opciones = [];
      document
        .querySelectorAll(".options")
        .forEach((el) => opciones.push(el.value));
      let respuesta;
      document.querySelectorAll(".answers").forEach((ele) => {
        if (ele.checked) {
          respuesta = ele.value;
        }
      });
      console.log("hola desde questionForm", CreateQuiz.quizId);
      Question.createQuestion(
        pregunta,
        opciones,
        respuesta,
        asignatura,
        temas,
        subtemas,
        dificultad,
        CreateQuiz.quizId
      );
    });
  }
};
