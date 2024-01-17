import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function App() {
  const slides = [
    {
      url: "https://tse4.mm.bing.net/th?id=OIP.xkwjp0lwiKU6rCvWWuJtwAHaEo&pid=Api&P=0&h=180",
    },
    {
      url: "https://tse3.mm.bing.net/th?id=OIP.FI10TusgLXPZF3K39IGJWQHaEO&pid=Api&P=0&h=180",
    },
    {
      url: "https://tse3.mm.bing.net/th?id=OIP.qPSiYuPj0zyM4alriCiaeQHaE8&pid=Api&P=0&h=180",
    },
    {
      url: "https://tse4.mm.bing.net/th?id=OIP.jqbUkRu5ImLMKLj0DoqhBwHaEK&pid=Api&P=0&h=180",
    },
    {
      url: "https://tse2.mm.bing.net/th?id=OIP.ofgML91m6HXbbfLHtEZ8uQHaE8&pid=Api&P=0&h=180",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const startSlideshow = () => {
    setIsSlideshowRunning(true);
  };

  const stopSlideshow = () => {
    setIsSlideshowRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isSlideshowRunning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSlideshowRunning]);

  return (
    <div className="max-w-[1400px] h-[740px] w-full m-auto py-16 px-4 relative group">
      <div className="flex justify-center py-2">
        {isSlideshowRunning ? (
          <button onClick={stopSlideshow}>Stop Slideshow</button>
        ) : (
          <button onClick={startSlideshow}>Start Slideshow</button>
        )}
      </div>

      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>

      {/* left Arrow */}
      <div className="hidden group-hover:block absolute top[50%] -translate-x-0 translate-y-[-700%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top[50%] -translate-x-0 translate-y-[-700%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;