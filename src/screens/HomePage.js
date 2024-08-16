import '../styles/global.css';
import FeatureCard from '../components/FeatureCard.js';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  QuizPageIcon,
  MultipleChoiceIcon,
  DetailedFeedbackIcon,
} from '../svg/FeatureCardIcons';
import BrainSvg from '../svg/brain-computer.svg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex overflow-auto min-h-screen items-center flex-col">
      <div className="w-full h-[100vh] items-center flex">
        <div className="w-full flex items-center justify-center flex-col">
          <div className="flex items-center flex-col justify-start">
            <h1 className="pb-10 text-primary text-center text-6xl font-bold">
              Turn Your Notes into Quizzes
            </h1>
            <div className="gap-8 flex items-center flex-row">
              <Button
                variant="contained"
                color="tertiary"
                sx={{ color: 'white' }}
                className="buttonFilled white"
                onClick={() => {
                  navigate('/create');
                }}
              >
                Get Started
              </Button>
              <Button color="tertiary" variant="text">
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center animated-gradient-bg">
        {' '}
        {/* conic-gradient-bg */}
        <div className="w-full flex text-primary items-center flex-col justify-center">
          <div className="gap-16 flex items-center py-16 px-12 flex-col justify-start">
            <div className="flex items-center flex-col justify-start text-white">
              <p className="text-l uppercase pb-4">features</p>
              <h2 className="mb-8 text-4xl font-semibold text-center">
                Features to Enhance Your Study Experience
              </h2>
              <p className="text-l text-center font-medium">
                Explore the functionalities that make studying efficient and
                effective
              </p>
            </div>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8 flex text-black">
              <FeatureCard
                heading="Automatic Quiz Generation"
                subHeading="Turn your notes into a customized practice quiz instantly"
              >
                <QuizPageIcon />
              </FeatureCard>
              <FeatureCard
                heading="Adaptive Learning"
                subHeading="Receive questions based on your study progress and performance"
              >
                <img
                  src={BrainSvg}
                  alt="Brain Icon (among us reference)"
                  className="w-8 h-8 fill-current text-black mr-6 stroke-[4]"
                />
              </FeatureCard>
              <FeatureCard
                heading="Multiple Question Types"
                subHeading="Practice with various question formats like multiple choice, true/false, and more"
              >
                <MultipleChoiceIcon />
              </FeatureCard>
              <FeatureCard
                heading="Detailed Feedback"
                subHeading="Get immediate feedback on your answers to track your learning"
              >
                <DetailedFeedbackIcon />
              </FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="text-primary w-full flex items-center py-20 px-14 flex-col">
          <h1 className="mb-8 text-4xl font-semibold text-center">
            Effortless Quiz Creation
          </h1>
          <p className="text-l text-center mb-8">
            Transform your notes into interactive quizzes that help you retain
            information better. Our platform makes studying fun and effective.
          </p>
          <Button
            variant="contained"
            color="tertiary"
            sx={{ color: 'white' }}
            className="buttonFilled white"
          >
            Learn More
          </Button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center text-primary">
        <footer className="w-full justify-between py-6 px-10 flex-col flex">
          <div className="gap-6 flex items-center flex-col justify-start">
            <p className="text-4xl font-semibold text-center">Study Buddy</p>
            {/* Change name to Quizify? */}
            <div className="flex items-center flex-row">
              <p className="mx-3">Home</p>
              <p className="mx-3">How It Works</p>
              <p className="mx-3">Features</p>
              <p className="mx-3">FAQ</p>
              <p className="mx-3">Contact</p>
            </div>
          </div>
          <div className="w-full h-0 flex my-6 items-start border-[#d9d9d9] border-solid border-2" />
          <div className="w-full flex items-center justify-between md:flex-row lg:flex-row flex-col">
            <p className="bodySmall home-text89">
              © 2024 Study Buddy, All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
