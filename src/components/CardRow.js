import { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CardRow = ({ cardWidth, children }) => {
  const [scrollPosition, setScrollPosition] = useState(2);
  const cardGap = 20;

  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    scrollAmount > 0
      ? (scrollAmount += cardGap / 2)
      : (scrollAmount -= cardGap / 2);
    const newScrollPosition = scrollPosition + scrollAmount;
    if (
      newScrollPosition < 0 ||
      newScrollPosition > (children.length - 1) * cardWidth + 2
    ) {
      return;
    }

    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <IconButton
        aria-label="scroll left"
        color="secondary"
        style={{ position: 'absolute', left: '-30px' }}
        onClick={() => handleScroll(-cardWidth)}
      >
        <ArrowLeftIcon />
      </IconButton>
      <div
        ref={containerRef}
        className="w-full overflow-x-scroll scroll-smooth no-scrollbar overscroll-x-contain"
      >
        <div
          className="w-full items-center flex p-[4px]"
          style={{ gap: cardGap }}
        >
          {children}
        </div>
      </div>
      <IconButton
        aria-label="scroll right"
        color="secondary"
        onClick={() => handleScroll(cardWidth)}
        style={{ position: 'absolute', right: '-30px' }}
      >
        <ArrowRightIcon />
      </IconButton>
    </div>
  );
};

export default CardRow;
