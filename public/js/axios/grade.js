import axios from "axios";

export class Grades {
    static updateGrade = async function(nota, quiz, curso) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/api/v1/grades',
          data: { 
            quiz,
            nota, 
            curso
          }
        });
        // if (res.data.status === "success") {
        //   localStorage.setItem("result", `${correct} / ${quizquestions.length}`);
        //   window.setTimeout(() => {
        //     location.assign(`/quiz/view/${slug}`);
        //   }, 1000);
        // }
      }
      catch (err) {
        console.log(err);
      }
    }
}