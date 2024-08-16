import React from 'react';

const FeatureCard = ({
  heading = 'Lorem ipsum',
  subHeading = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.',
  children,
}) => {
  return (
    <div className="flex items-start justify-start p-6 bg-white rounded-lg w-full shadow-lg">
      {children}
      <div className="flex flex-col justify-center w-full text-primary">
        <h3 className="text-lg font-semibold leading-7">{heading}</h3>
        <span className="text-sm font-light leading-7">{subHeading}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
