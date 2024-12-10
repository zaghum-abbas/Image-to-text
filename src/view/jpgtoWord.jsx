import React from "react";
import Wrapper from "@/components/wrapper/wrapper2";
import { cards2, blogs2, faqData2 } from "../data/data";
import { Link } from "react-router-dom";

const jpgtoWord = () => {
  return (
    <>
      <Wrapper/>

      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {cards2.map((card, index) => (
              <Link key={index} to={card.to}>
                <div
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center 
                transition-transform duration-200 hover:scale-105 hover:border hover:border-gray-500"
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-12 h-12 mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-800">
                    {card.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center pb-4">
            <h1 className="text-3xl font-bold">JPG to Word Converter</h1>
          </div>
          <div>
            {faqData2.map((item, index) => (
              <div
                key={index}
                className="mb-6 p-6 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] rounded-lg"
              >
                <h2 className="text-2xl font-semibold text-dark-blue-700">
                  {item.question}
                </h2>
                <p className="text-lg font-semibold leading-relaxed text-gray-800 mt-2">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Related Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {blogs2.map((blog, index) => (
              <div
                key={index}
                className="border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={"/"}>
                  <img
                    src={blog.image}
                    alt={blog.heading}
                    className="w-full h-auto object-cover rounded-t-lg"
                  />
                </Link>
                <div className="p-4">
                  <Link to={"/"}>
                    <h3 className="text-lg font-bold mb-2">{blog.heading}</h3>
                  </Link>
                  <p className="text-gray-800 font-medium text-base">
                    {blog.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default jpgtoWord;