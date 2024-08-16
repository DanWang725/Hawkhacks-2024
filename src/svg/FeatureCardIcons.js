const QuizPageIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 fill-current text-black flex-shrink-0 mr-6"
    >
      <rect
        x="3"
        y="2"
        width="18"
        height="20"
        rx="2"
        ry="2"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
      <line x1="7" y1="7" x2="17" y2="7" stroke="#000000" strokeWidth="2" />
      <line x1="7" y1="11" x2="17" y2="11" stroke="#000000" strokeWidth="2" />
      <line x1="7" y1="15" x2="17" y2="15" stroke="#000000" strokeWidth="2" />
      <rect x="7" y="19" width="5" height="2" fill="#000000" />
    </svg>
  );
};

const MultipleChoiceIcon = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 fill-current text-black flex-shrink-0 mr-6"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="4"
        rx="1"
        ry="1"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="3"
        y="11"
        width="18"
        height="4"
        rx="1"
        ry="1"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="3"
        y="18"
        width="18"
        height="4"
        rx="1"
        ry="1"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="8" cy="6" r="1" fill="#000000" />
      <circle cx="8" cy="13" r="1" fill="#000000" />
      <circle cx="8" cy="20" r="1" fill="#000000" />
    </svg>
  );
};

const DetailedFeedbackIcon = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 fill-current text-black flex-shrink-0 mr-6"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
      <polyline
        points="6 12 10 16 18 8"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export { QuizPageIcon, MultipleChoiceIcon, DetailedFeedbackIcon };
