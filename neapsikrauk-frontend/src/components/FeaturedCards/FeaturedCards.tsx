import { FaBus, FaMapMarkerAlt } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";
import {
  CardHeading,
  FeaturesBtn,
  SubHeading,
} from "../LandingPageCard/LandingPageCard";
import { LandingPageCard } from "../LandingPageCard/LandingPageCard";
import type { JSX } from "react/jsx-runtime";

interface FeatureCard {
  color: "blue" | "red" | "green";
  icon: JSX.Element;
  heading: string;
  subHeading: string;
}

export const featureCards: FeatureCard[] = [
  {
    color: "blue",
    icon: <FaMapMarkerAlt color="#ffffff" size={24} strokeWidth={1} />,
    heading: "Darbai netoli tavęs",
    subHeading: "Matyk tikslią vietą ir atstumą žemėlapyje",
  },
  {
    color: "red",
    icon: <LuTriangleAlert color="#ffffff" size={24} />,
    heading: "Raudonos vėliavos",
    subHeading: "Informuojame apie įtartinus arba nepatikimus skelbimus",
  },
  {
    color: "green",
    icon: <FaBus color="#ffffff" size={24} />,
    heading: "Transportas",
    subHeading: "Autobusų maršrutai ir patogus priėjimas",
  },
];

const FeaturedCards = ({
  color,
  icon,
  heading,
  subHeading,
}: FeatureCard) => {
  return (
    <LandingPageCard color={color}>
      <FeaturesBtn color={color}>{icon}</FeaturesBtn>
      <CardHeading>{heading}</CardHeading>
      <SubHeading>{subHeading}</SubHeading>
    </LandingPageCard>
  );
};

export default FeaturedCards;
