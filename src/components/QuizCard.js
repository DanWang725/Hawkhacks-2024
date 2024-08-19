import React from 'react';
import propTypes from 'prop-types';
import { Skeleton } from '@mui/material';

const QuizCard = ({ test = {}, openTestFunc }) => {
  const {
    courseName,
    courseCode,
    date,
    university,
    units,
    questionAmount,
    authorName,
  } = test;
  let { name } = test;

  if (name.length > 30) {
    name = name.substring(0, 28) + '...';
  }

  return (
    <div className="min-w-[400px] max-w-[400px] min-h-[200px] max-h-[200px] rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      <button
        className="w-full h-full p-6 text-left"
        onClick={() => {
          openTestFunc(test);
        }}
      >
        <div className="font-bold text-xl mb-2 text-gray-800">{name}</div>
        <hr className="border-[#FFAD72] my-1 w-1/3" />
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Course: </span>
          {courseName} ({courseCode})
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">University: </span>
          {university}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Units: </span>
          {units} • <span className="font-semibold">Questions: </span>
          {questionAmount}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          <span className="font-semibold">Date: </span>
          {date.toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-semibold">Author: </span>
          {authorName}
        </p>
      </button>
    </div>
  );
};

QuizCard.propTypes = {
  id: propTypes.number,
  name: propTypes.string,
  date: propTypes.instanceOf(Date),
  courseName: propTypes.string,
  courseCode: propTypes.string,
  university: propTypes.string,
  units: propTypes.number,
  questionAmount: propTypes.number,
  authorName: propTypes.string,
  openTestFunc: propTypes.func,
};

const SkeletonQuizCard = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
      <Skeleton
        variant="rounded"
        width={400}
        height={200}
        style={{ minWidth: 400, minHeight: 200 }}
      />
    </>
  );
};

export { QuizCard, SkeletonQuizCard };
