"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        Antbuildz <br /> Platform
      </>
    ),
    description: "B2B Equipment Rental Platform",
    link: "https://antbuildz.com/",
    imageLink: "/img/projects/1.avif",
  },
  {
    title: (
      <>
        Igloovy <br /> Platform
      </>
    ),
    description: "AI-powered adaptive learning platforms ",
    link: "https://igloovy.com/",
    imageLink: "/img/projects/2.avif",
  },
  {
    title: (
      <>
        Didex <br /> Platform
      </>
    ),
    description: "cryptocurrency exchange",
    link: "https://didex.com/",
    imageLink: "/img/projects/3.avif",
  },
  {
    title: (
      <>
        Gonbad Kabud <br /> Application
      </>
    ),
    description: "Literacy platform",
    link: "#",
    imageLink: "/img/projects/4.avif",
  },

  {
    title: (
      <>
        Meerkat <br /> Application
      </>
    ),
    description: "adaptive learning",
    link: "#",
    imageLink: "/img/projects/5.avif",
  },
  {
    title: (
      <>
        Yobiti <br /> Platform
      </>
    ),
    description: "Website builder",
    link: "#",
    imageLink: "/img/projects/6.avif",
  },
];
//test
export default function WorkPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <div id="fullpage">
          <div className="background">
            PROJECTS
            <br />
            PROJECTS
          </div>

          {projectsData.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderWork>
    </>
  );
}
