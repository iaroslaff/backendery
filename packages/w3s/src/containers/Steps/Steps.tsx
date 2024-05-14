import React, { FC } from "react"

import "./Steps.scss"

const Steps: FC = () => {
  return (
    <section className='steps__section'>
      <h2 className='steps__title'>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
        <span>Steps</span>
      </h2>
      <div className='steps__container'>
        <div className='steps__step steps__step--1'>
          <h4 className='steps__step-title'>
            <span>01</span> Analysis
          </h4>
          <p className='steps__step-description'>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className='steps__step steps__step--2'>
          <h4 className='steps__step-title'>
            <span>02</span> Development
          </h4>
          <p className='steps__step-description'>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className='steps__step steps__step--3'>
          <h4 className='steps__step-title'>
            <span>03</span> Testing
          </h4>
          <p className='steps__step-description'>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className='steps__step steps__step--4'>
          <h4 className='steps__step-title'>
            <span>04</span> Stagning
          </h4>
          <p className='steps__step-description'>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <div className='steps__step steps__step--5'>
          <h4 className='steps__step-title'>
            <span>05</span> Release
          </h4>
          <p className='steps__step-description'>
            At this stage, we analyze the task at hand, select the best ideas, solutions and tools to implement the
            project.
          </p>
        </div>
        <p className='steps__text'>
          We always try <br /> to follow <span>the sequence of work</span>
        </p>
      </div>
    </section>
  )
}

export default Steps
