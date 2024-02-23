import { ElementRef, useRef, useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  height: 200px;
  perspective: 600px;
  margin: 20px auto;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;

  &:hover {
    transform: rotateY(5deg);
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  backface-visibility: hidden;
`;

const Title = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #4caf50; /* Example color */
  color: white;
  font-size: 24px;
  text-align: center;
  line-height: 200px; /* Vertically center text */
  border-radius: 10px;
  backface-visibility: hidden;
  transform: translateZ(6rem);
`;

const FlipCard2 = () => {
  const cardRef = useRef<ElementRef<'div'>>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (event) => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      setMouseX(event.clientX - cardCenterX);
      setMouseY(event.clientY - cardCenterY);
    }
  };

  return (
    <CardContainer onMouseMove={handleMouseMove} ref={cardRef}>
      <Card
        style={{
          transform: `rotateY(${mouseX / 50}deg) rotateX(${-mouseY / 50}deg)`
        }}
      >
        <Background>Background Content</Background>
        <Title>Card Title</Title>
      </Card>
    </CardContainer>
  );
};

export default FlipCard2;

