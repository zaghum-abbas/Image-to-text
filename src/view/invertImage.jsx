import React from "react";
import Wrapper from "@/components/wrapper/wrapper8";
import { faqData2 } from "../data/data";
import CardGrid from '../components/shared/cards';
import { cards7 } from "@/data/cardsData/cardsData";
import {blogs7} from '@/data/blogsData/blogsData';
import BlogsCards from '@/components/shared/blogs';

const invertImage = () => {
  return (
    <>
      <Wrapper />

      <CardGrid cards={cards7} />

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center pb-4">
            <h1 className="text-3xl font-bold">Invert Image Converter</h1>
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

      <BlogsCards blogs={blogs7}/>
    </>
  );
};

export default invertImage;