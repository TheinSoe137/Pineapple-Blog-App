import React, { useEffect, useState } from "react";

function DailyQuote() {
  let [quote, setQuote] = useState([]);
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data) {
          // console.log(data);
          let random = Math.floor(Math.random() * 16);

          return setQuote(data[random].text);
          // return console.log(quote);
        }
        console.log("Quote not generated");
      })
      .catch((err) => {
        console.log("error in fetching", err);
      });
  }, []);

  return (
    <div className="hero-header bg-blur quote-card ">
      <text className="sub-heading">Today's Quote</text>
      <p className="text-regular">{quote}</p>
    </div>
  );
}
export default DailyQuote;
