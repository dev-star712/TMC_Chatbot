import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function TypingEffect({ text, scrollRef }) {
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(0);

  const components = {
    a: ({ href, children }) => (
      <Link to={href} style={{ textDecoration: "underline" }}>
        {children}
      </Link>
    ),
  };

  useEffect(() => {
    const sentenceEnd = ".?!".indexOf(text.charAt(index - 1)) !== -1
    console.log(sentenceEnd ? 150 : 0)
    const timer = setTimeout(() => {
      if (content.length < text.length) {
        setContent((content) => content + text.charAt(index));
        setIndex((index) => index + 1);

        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }, 33 + (sentenceEnd ? 700 : 0)); // The delay between each character here is 100ms. Adjust it as needed.

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, text]);

  // useEffect(() => {
  //   console.log(index);
  // }, [index]);

  // useEffect(() => {
  //   console.log(text);
  // }, [text]);

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
