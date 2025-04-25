import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube";
}
export const Card = ({ title, link, type }: CardProps) => {


  return (
    <div className="p-4">
      <div className="max-w-72 p-4 bg-white rounded-md border border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-md text-gray-500">
            <ShareIcon />
            {title}
          </div>
          <div className="flex itemse-center gap-2 text-gray-500">
            <a href={link}>
              <ShareIcon />
            </a>
          </div>
        </div>
        <div className="pt-4">
          {type === "Twitter" ? (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          ) : (
            <iframe
              className="w-full"
              src={link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};
