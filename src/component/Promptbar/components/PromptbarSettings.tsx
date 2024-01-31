import React, { FC } from 'react';

interface Props {
  someProp: string;
}

export const PromptbarSettings: FC<Props> = ({ someProp }) => {
  return <div>{someProp}</div>;
};
