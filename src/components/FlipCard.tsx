import { ElementRef, useRef } from "react";
import styled from "styled-components";

const FlipCardContainer = styled.div`
  background-color: ${(props) => props.backgroundColor ?? "#690912"};
  border-radius: 15px;
  width: 16em;
  height: 24em;
  perspective: 50rem;
  overflow: hidden;
  box-shadow: 0 -1.5rem 2rem -0.5rem rgba(255, 255, 255, 0.1);
  position: relative;
  transform: rotateX(var(--rotateX)) rotateY(var(--rotateY))
    translate3d(0, 2rem, -2rem);
`;

const FlipCardTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  inset: 0;
  font-size: 2rem;

  transform: rotateX(var(--rotateX)) rotateY(var(--rotateY))
    translate3d(0, 0, 6rem);
  z-index: 4;
`;

const FlipCardFrame = styled.div`
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 70%;
  background: transparent none;
  border: 10px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transform: rotateX(var(--rotateX)) rotateY(var(--rotateY))
    translate3d(0, 0, 3rem);
  z-index: 3;
  backface-visibility: hidden;
`;

export interface FlipCardProps {
  title: string;
  description?: string;
  svgIcon?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  showFrame?: boolean;
}

export const FlipCard = ({
  title,
  description,
  svgIcon,
  backgroundColor,
  width = "16em",
  height = "24em",
  showFrame = true,
}: FlipCardProps) => {
  const cardRef = useRef<ElementRef<"div">>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const mouseX = event.clientX - cardCenterX;
      const mouseY = event.clientY - cardCenterY;

      const rotateX = mouseY / 20;
      const rotateY = mouseX / 20;

      cardRef.current.style.setProperty("--rotateX", `${rotateX}deg`);
      cardRef.current.style.setProperty("--rotateY", `${rotateY}deg`);
    }
  };

  cardRef.current?.addEventListener("mousemove", () => {
    console.log("mouse move");
  });
  return (
    <FlipCardContainer ref={cardRef} onMouseMove={handleMouseMove}>
      {showFrame && <FlipCardFrame />}
      <FlipCardTitle>{title}</FlipCardTitle>
    </FlipCardContainer>
  );
};
