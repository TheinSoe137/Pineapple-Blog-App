import React from "react";
import { useState, useEffect } from "react";
import "../../Css/About_Card.css";
import read from "../images/read.png";
import idea from "../images/idea.png";
import create from "../images/create.png";

const About = () => {
  const assets = [
    {
      title: "Read",
      illustration: read,
      description: "Immerse yourself in our engaging and informative blogs.",
    },
    {
      title: "Inspired",
      illustration: idea,
      description:
        " Our blog is a treasure of knowledge & inspiration, designed to ignite your passion.",
    },
    {
      title: "Create",
      illustration: create,
      description:
        " Express your thoughts, share your knowledge, create your own blog",
    },
  ];
  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCard((currentCard + 1) % assets.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [currentCard, assets.length]);
  return (
    <div className="about-card bg-blur">
      <text className="sub-heading card-title">
        {assets[currentCard].title}
      </text>
      <img
        src={assets[currentCard].illustration}
        className="illustration"
        alt="illustration"
      />
      <p className="text-regular">{assets[currentCard].description}</p>
    </div>
  );
};

export default About;
