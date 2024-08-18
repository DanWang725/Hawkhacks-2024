import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CardRow = ({ cardWidth, children }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardGap = 20;

  const maxWidthContainer = useRef(null);
  const cardRowRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (maxWidthContainer.current) {
        const rowWidth = maxWidthContainer.current.offsetWidth;
        const maxVisibleCards = Math.floor(rowWidth / (cardWidth + cardGap));
        cardRowRef.current.style.width = `${maxVisibleCards * (cardWidth + cardGap)}px`;
        setVisibleCount(maxVisibleCards);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardWidth]);

  const visibleChildren = React.Children.toArray(children).slice(
    scrollIndex, // start
    visibleCount + scrollIndex, // end
  );

  return (
    <div ref={maxWidthContainer} className="w-full">
      <div
        ref={cardRowRef}
        className="flex flex-col items-center justify-center relative"
      >
        <IconButton
          aria-label="scroll left"
          color="secondary"
          style={{ position: 'absolute', left: '-30px' }}
          disabled={scrollIndex === 0}
          onClick={() => setScrollIndex(scrollIndex - 1)}
        >
          <ArrowLeftIcon />
        </IconButton>
        <div className="w-full overflow-x-scroll scroll-smooth no-scrollbar overscroll-x-contain">
          <div
            className="w-full items-center flex p-[4px]"
            style={{ gap: cardGap }}
          >
            {visibleChildren}
          </div>
        </div>
        <IconButton
          aria-label="scroll right"
          color="secondary"
          onClick={() => setScrollIndex(scrollIndex + 1)}
          disabled={scrollIndex + visibleCount >= children.length}
          style={{ position: 'absolute', right: '-30px' }}
        >
          <ArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CardRow;
