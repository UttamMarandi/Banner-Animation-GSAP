import { useRef, useEffect } from "react";
import { TweenMax, TimelineLite, Power3 } from "gsap";

import "./App.css";

// images
import imgGirl from "./images/girl.webp";
import imgBoy from "./images/boy.webp";
import arrow from "./images/arrow-right.svg";
import agencyb from "./images/agencyb.webp";
import agencyg from "./images/agencyg.webp";

function App() {
  let app = useRef(null);
  let images = useRef(null);
  let content = useRef(null);

  //Create a timeline
  let tl = new TimelineLite({ delay: 0.5 });
  //every time we create a timeline we say tl
  //the purpose of timeline is to chain animation
  //delay:0.5 will run the tl animations after 0.5s after content is loaded

  useEffect(() => {
    //IMAGES VARS
    const girlImage = images.firstElementChild;
    //images target the .hero-iamges-inner div, so images.firstElementChild will target the first child element i.e .hero-iamge girl
    const boyImage = images.lastElementChild;
    //similar for lastElementChild

    //CONTETN VARS
    const headlineFirst = content.children[0].children[0]; //this will give the first children of the first children of the content
    console.log("headlinefiFirst", headlineFirst);
    const headlineSecond = content.children[0].children[1];
    console.log("headlinefiSecond", headlineSecond);
    const headlineThird = headlineSecond.nextSibling;
    console.log("headingthirrd", headlineThird);
    //there are multiple ways of targeting elements , Few learned are firstChildren, lastChildren, children[0](most flexible) , nextSibling
    const contentP = content.children[1];
    const contentButton = content.children[2];

    TweenMax.to(app, 0, { css: { visibility: "visible" } });
    // Tweenmax is depreceated so this is for learning purpose only
    //target the app element , animation duration is 0 , set the css of app element
    //now useEffect run once only after the dom is loaded. so we will not get flashing of content to user , instead there will be a smooth transition.
    //by default app is set to hidden in app.css

    //images animation
    tl.from(girlImage, 1.2, { y: 1280, ease: Power3.easeOut }, "Start")
      .from(
        girlImage.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      )
      .from(boyImage, 1.2, { y: 1280, ease: Power3.easeOut }, 0.2)
      .from(
        boyImage.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      );
    //tl.from is our initial state. Think of it like image is first present at position y:1280px bottom, the duration of animtion is 1.2 and animation type is easeOut.
    //our normal ui is the final state.so animation will go from bottom 1280 px to where the image is positioned

    //for the second "from" , we are targeting the actual image inside girlImage div, duration 2, intial scale is 1.6 , animation type Power3.easeOut. here 0.2 is the delay after which second from will run after first tl.from start running. by default second from will run only after first from is complete
    //so the image is scaled from the beggining and then set to scale:1 at final position

    //Content Animation
    tl.staggerFrom(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      1,
      {
        y: 44,
        ease: Power3.easeOut,
        delay: 0.8,
      },
      0.15,
      "Start"
    )
      .from(contentP, 1, { opacity: 0, y: 20, ease: Power3.easeOut }, 1.4)
      .from(contentButton, 1, { opacity: 0, y: 20, ease: Power3.easeOut }, 1.6);

    //stagggerFrom Tweens an array of targets from a common set of destination values (using the current values as the destination), but staggers their start times by a specified amount of time, creating an evenly-spaced sequence
    //we are accesing headlineFirst.children b.c we need to target the inner div
    //why? , b.c we have specified in app.css that .hero-content-line has height of 44px, so by targeting it's child div and setting it's inital postion to y:44 i.e 44px bottom , we can create a revealing effect
    //0.15 is the delay btwn first target element run to next target element start
    //delay : 0.8 is the delay after which .staggerFrom will run if chained whith other animation
    //In order to chain tl.from and t1.staggerFrom we can set a string "Start" to t1.staggerFrom and specify the same where we want to run the animation
    //So now both the top t1.from and t1.staggerFrom are running together and staggerFrom will run after delay of 0.8s. This will give us a smooth animation instead of waithing for one animation to finish
  });

  return (
    // set ref , so that we can target the hero div
    //I think el is the current target and we are setting app to el
    <div className="hero" ref={(el) => (app = el)}>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-content-inner " ref={(e) => (content = e)}>
              <h1>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">
                    The highest result of
                  </div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">education is</div>
                </div>
                <div className="hero-content-line">
                  <div className="hero-content-line-inner">tolerance.</div>
                </div>
              </h1>
              <p>
                There are many ways you can make an impact on the world. But
                there is no greater impact that you can make than spreading
                education.
              </p>
              <div className="btn-row">
                <button className="explore-button">
                  Explore
                  <div className="arrow-icon">
                    <img src={arrow} alt="row" />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-images">
            <div className="hero-images-inner" ref={(e) => (images = e)}>
              <div className="hero-image girl">
                <img src={agencyb} alt="girl" />
              </div>
              <div className="hero-image boy">
                <img src={agencyg} alt="boy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
