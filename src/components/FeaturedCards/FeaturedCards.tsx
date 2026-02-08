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
    icon: <FaMapMarkerAlt color="#3B82F6" size={24} strokeWidth={1} />,
    heading: "Darbai netoli tavęs",
    subHeading: "Matyk tikslią vietą ir atstumą žemėlapyje",
  },
  {
    color: "red",
    icon: <LuTriangleAlert color="#d63d3d" size={24} />,
    heading: "Red Flag įspėjimai",
    subHeading: "Įspėjame apie įtartinus skelbimus",
  },
  {
    color: "green",
    icon: <FaBus color="#d63d3d" size={24} />,
    heading: "Susisiekimas",
    subHeading: "Autobusų maršrutai ir privažiavimas",
  },
];

const FeaturedCards = ({
  color,
  icon,
  heading,
  subHeading
}: FeatureCard) => {
  return (
    <LandingPageCard>
      <FeaturesBtn color={color}>{icon}</FeaturesBtn>
      <CardHeading>{heading}</CardHeading>
      <SubHeading>{subHeading}</SubHeading>
    </LandingPageCard>
  );
};

export default FeaturedCards;
