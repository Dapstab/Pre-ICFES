import { Filter } from "../utils/filterTopics";
import { temas, subtemas } from "../utils/data";
import { resize } from "../utils/resize";
import { Question } from "../axios/question";

export const QuestionForm = () => {
  let stepIndex = 0;
  const topics = document.querySelector("#topics");
  const subtopics = document.querySelector("#subtopics");
  const subject = document.querySelector("#subject");
  const textareas = document.querySelectorAll("textarea");
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
      Filter.removeOptions(subtopics);
      Filter.addOptions(subtopics, subtemas[e.target.value]);
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
      Question.createQuestion(
        pregunta,
        opciones,
        respuesta,
        asignatura,
        temas,
        subtemas,
        dificultad
      );
      e.stopImmediatePropagation();
    });

  }
};
