import axios from "axios";

export class Grades {
    static updateGrade = async function(quiz, nota, curso) {
        await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/api/v1/grades',
          data: { 
            quiz,
            nota,
            curso
          }
        });
      }
}