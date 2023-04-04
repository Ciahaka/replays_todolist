import React from 'react';

export type EditFormType={
title:string

}

export const EditTitleForm = (props:EditFormType) => {
  return (
    <>
      <span>{props.title}</span>
    </>
  );
};

