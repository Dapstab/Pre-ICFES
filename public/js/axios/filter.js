import axios from "axios";

export class Filter {
  static getData = async function (params, url) {
    try {
      const res = await axios({
        method: "POST",
        url: `http://127.0.0.1:5000/api/v1/questions/${url}`,
        data: {
          params,
        },
      });
      return res.data.locals;
    } catch (err) {
      console.log("Hubo un serio error gilipollas!!!");
    }
  };
}
