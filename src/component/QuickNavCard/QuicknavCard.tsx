import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface IQuickNavCardProps {
  variant?: "default" | "secondary";
  title: string;
  description?: string;
  navigateTo: string;
}

const QuickNavCard = (props: IQuickNavCardProps) => {
  const { title, description, navigateTo } = props;
  const navigate = useNavigate();

  return (
    <div
      className="group flex h-28 w-full cursor-pointer items-center justify-between rounded-md border border-dark-oauth-btn-border p-6"
      onClick={() => {
        navigate(navigateTo);
      }}
    >
      <div className="flex max-w-65 flex-col gap-3">
        <div className="text-sm font-semibold leading-none text-dark-neutral-gray-900">{title}</div>

        <div className="overflow-scroll text-sm text-dark-neutral-gray-900">{description}</div>
      </div>

      <ArrowRightIcon className="flex h-6 w-6 items-start text-dark-neutral-gray-700 group-hover:text-dark-neutral-gray-900" />
    </div>
  );
};

export default QuickNavCard;
