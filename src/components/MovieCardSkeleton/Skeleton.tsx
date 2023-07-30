import { css } from "@emotion/css";

const Skeleton = ({ width, height, borderRadius, animationDuration }: any) => {
  const skeletonStyles = css`
    background-color: #919191;
    width: ${width || "100%"};
    height: ${height || "40px"};
    border-radius: ${borderRadius || "4px"};
    animation: pulse   1.5s infinite linear;


    @keyframes leftToRightAnimation {
        from {
          transform: translateX(-200px);
        }
        to {
          transform: translateX(0);
        }
      }

    @keyframes pulse {
      0% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 0.6;
      }
    }
  `;

  return <div className={skeletonStyles} />;
};

export default Skeleton;
