import { useState, useRef, useEffect } from "react";
import Card from "./card.jsx";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const info = [
  {
    company: "Certa",
    hyperlink: "https://www.getcerta.com/",
    imageSrc: "/Certa.svg",
    position: "Senior Frontend Engineer",
    duration: "Mar 2023 - Sep 2023",
    glintColor: "[--streak-color:30,94,255]",
    points: [
      "Lead the development of a robust data visualization tool that allowed customers to create dynamic visualizations for various business metrics.",
      "Undertook a massive codebase migration from Webpack to Vite. This reduced build times in the pipeline (thereby saving costs) and significantly improved DX by faster HMRs and reduced dev server start times.",
      "Actively contributed in implementing a highly customisable charting suite wrapped around D3.js.",
      "Collaborated with a Gen-AI startup to successfully integrate our tool with their solution, thus enabling customers to give prompts and generate visualizations on the fly with zero configuration.",
    ],
  },
  {
    company: "Autonom8",
    hyperlink: "https://autonom8.com/",
    imageSrc: "/A8.svg",
    position: "Senior Software Engineer",
    duration: "Jun 2020 - Jan 2023",
    glintColor: "[--streak-color:60,97,156]",
    points: [
      "Developed a low code form builder which lets users create dynamic forms using drag and drop. Other features include theming, custom layouts (powered by flex and grid configurations) and script support for implementing advanced flows.",
      "Worked on a WASM script inside web workers to offload form builder’s heavy computation tasks from the main thread.",
      "Developed an end-to-end RBAC system (similar to GCP), providing granular access control for all entities within the platform.",
      "Took various initiatives to benchmark application performance and optimize render cycles across the product",
      "Implemented secured execution of user written callbacks in a sandboxed context in the server.",
      "Developed an alternative solution for Strapi to achieve data independency.",
      "Implemented a fully fledged audit logger which captures user actions as metrics throughout the platform.",
      "Collaborated with other engineers in automating end to end tests in CI/CD pipeline.",
    ],
  },
  {
    company: "Incedo",
    hyperlink: "https://www.incedoinc.com/",
    imageSrc: "/Incedo.svg",
    position: "Software Engineer",
    duration: "Oct 2019 - Jun 2020",
    glintColor: "[--streak-color:238,73,34]",
    points: [
      "Worked as an interim module lead team taking up responsibilities such as requirement gathering and outlining roadmaps to the client.",
      "Handled all of the enhancements within the module and extended architectural support for other modules during their corresponding design phases.",
      "Prototyped various application MVP's to showcase and onboard new clients.",
      "Onboarded recruits and conducted training sessions on CSS, JS, React. This resulted in a conversion rate of 70% (trainees deployed to client projects).",
      "Collaborated closely with CTO and PM to develop an internal HR recruiting tool.",
    ],
  },
  {
    company: "Infosys",
    hyperlink: "https://www.infosys.com/",
    imageSrc: "/Infosys.svg",
    position: "Software Engineer",
    duration: "Jun 2017 - Oct 2019",
    glintColor: "[--streak-color:55,129,194]",
    points: [
      "Designed and managed wide variety of client web applications using HTML, CSS, JavaScript and JQuery.",
      "Actively worked in achieving responsiveness for various devices via CSS media queries and flexbox.",
      "Contributed in migrating existing client applications to React framework.",
      "Notable clients include P&G, Coca Cola and Vale.",
    ],
  },
];

export default () => {
  const [infoState, setInfoState] = useState(0);
  const zeroRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const timerRef = useRef(null);
  const nodeRef =
    infoState === 0
      ? zeroRef
      : infoState === 1
        ? oneRef
        : infoState === 2
          ? twoRef
          : threeRef;

  const { position, duration, points, glintColor, company, hyperlink } =
    info[infoState];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setInfoState((state) => {
        if (state === 3) {
          return 0;
        } else {
          return state + 1;
        }
      });
    }, 3000);
  }, []);

  return (
    <>
      <section id="work" className="py-16 md:py-20 px-6">
        <h2 className="text-5xl font-light text-gray-300 text-center flex flex-col gap-2">
          <span className="text-primary font-bold">Work</span>
          <span>Experiences</span>
        </h2>
        <div className="mx-auto max-w-7xl pt-12">
          <div className="flex flex-col gap-12 justify-between h-full">
            <div className="flex justify-evenly md:2 lg:mt-0">
              {info.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (timerRef?.current) {
                      clearInterval(timerRef.current);
                    }
                    setInfoState(index);
                  }}
                >
                  <img
                    className={`aspect-auto w-20 md:w-24 lg:w-36 ${
                      infoState === index
                        ? "opacity-100 saturate-100"
                        : "opacity-80 saturate-0"
                    } hover:opacity-80 saturate-0 duration-75 transition-opacity`}
                    src={item.imageSrc}
                  />
                </div>
              ))}
            </div>
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={infoState}
                nodeRef={nodeRef}
                addEndListener={(done) => {
                  nodeRef.current.addEventListener(
                    "transitionend",
                    done,
                    false,
                  );
                }}
                classNames="fade"
              >
                <div ref={nodeRef}>
                  <Card classes={`w-fit ${glintColor} glitter-border`}>
                    <div className=" flex flex-col items-center md:flex-row md:justify-start gap-4 md:items-baseline">
                      <a
                        className="font-semibold text-2xl text-[color:rgb(var(--streak-color))] hover:underline hover:underline-offset-4"
                        href={hyperlink}
                      >
                        {company}
                      </a>
                      <h3 className="font-semibold text-xl text-white">
                        {position}
                      </h3>
                      <span className="font-light text-xs text-gray-500">
                        {duration}
                      </span>
                    </div>
                    <ul className="mt-4 ml-4 max-w-[60ch] text-base text-gray-400 list-disc">
                      {points.map((point, index) => {
                        return <li key={index}>{point}</li>;
                      })}
                    </ul>
                  </Card>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </section>
    </>
  );
};