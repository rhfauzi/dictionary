import React from 'react'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'
import Step5 from './step-5'
import Step6 from './step-6'
import Step7 from './step-7'
import Step8 from './step-8'
import Step9 from './step-9'
import Step10 from './step-10'
import Step11 from './step-11'
import Step12 from './step-12'
import Step13 from './step-13'

export default function PageQuestionCard(props: any) {
  const { questionStep, handleChange } = props

  const QuestionCard = () => {
    if (questionStep === 1) {
      return <Step1 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 2) {
      return <Step2 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 3) {
      return <Step3 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 4) {
      return <Step4 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 5) {
      return <Step5 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 6) {
      return <Step6 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 7) {
      return <Step7 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 8) {
      return <Step8 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 9) {
      return <Step9 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 10) {
      return <Step10 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 11) {
      return <Step11 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 12) {
      return <Step12 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 13) {
      return <Step13 questionStep={questionStep} handleChange={handleChange}/>
    }
    if (questionStep === 14) {
      return <></>
    }
  }

  return (<QuestionCard />)
}