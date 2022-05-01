import { MouseEventHandler } from 'react';
import { HeartButton } from './Heart.styled';

interface HeartProps extends Props {
  fulfill?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Heart = ({ fulfill, onClick }: HeartProps = { fulfill: false }) => {
  return (
    <HeartButton onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M11.0055 2.11881C11.2061 2.11881 11.4067 2.11881 11.6742 2.19142C12.8111 2.48185 13.6804 3.42574 13.9479 4.66006C14.2154 5.82178 13.8142 6.9835 13.1454 7.70957L7.99612 13.3003L2.8468 7.70957C2.17806 6.9835 1.77681 5.82178 2.04431 4.66006C2.31181 3.42574 3.18117 2.48185 4.31804 2.19142C4.51866 2.11881 4.78616 2.11881 4.98678 2.11881C6.39114 2.11881 7.59487 3.20792 7.92924 4.58746C7.92924 4.66006 7.99612 4.66006 7.99612 4.66006C7.99612 4.66006 8.06299 4.66006 8.06299 4.58746C8.39736 3.20792 9.6011 2.11881 11.0055 2.11881ZM11.0055 0.666664C9.8686 0.666664 8.79861 1.17491 7.99612 1.97359C7.19363 1.17491 6.12364 0.666664 4.98678 0.666664C4.65241 0.666664 4.38491 0.666664 4.05054 0.739271C2.37868 1.17491 1.10807 2.55445 0.773702 4.29703C0.439331 5.89439 0.90745 7.56435 1.91056 8.72607L7.05988 14.3168L7.99612 15.3333L8.93236 14.3168L14.0817 8.72607C15.1517 7.56435 15.5529 5.96699 15.2185 4.29703C14.8842 2.48185 13.5467 1.10231 11.9417 0.739271C11.6073 0.666664 11.3398 0.666664 11.0055 0.666664Z"
          fill="#333333"
        />
        {fulfill && (
          <path
            d="M11.0054 2.11879C11.2061 2.11879 11.4067 2.11879 11.6742 2.1914C12.811 2.48183 13.6804 3.42572 13.9479 4.66004C14.2154 5.82176 13.8142 6.98348 13.1454 7.70955L7.99611 13.3003L2.84679 7.70955C2.17805 6.98348 1.7768 5.82176 2.0443 4.66004C2.3118 3.42572 3.18116 2.48183 4.31802 2.1914C4.51865 2.11879 4.78614 2.11879 4.98676 2.11879C6.39112 2.11879 7.59486 3.2079 7.92923 4.58744C7.92923 4.66004 7.99611 4.66004 7.99611 4.66004C7.99611 4.66004 8.06298 4.66004 8.06298 4.58744C8.39735 3.2079 9.60109 2.11879 11.0054 2.11879Z"
            fill="#E83A37"
          />
        )}
      </svg>
    </HeartButton>
  );
};

export default Heart;