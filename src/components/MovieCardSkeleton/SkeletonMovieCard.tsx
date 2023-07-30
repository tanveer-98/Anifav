import { css } from "@emotion/css";
import Skeleton from "../MovieCardSkeleton/Skeleton";
const cardStyle = css`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  z-index: 1;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const imageContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  background-postition: center;
`;


const flexContainer = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap : 2px;
  margin: 5px 0px;
`;
interface ILoadedImg {
  id: string;
}
const SkeletonMovieCard = () => {
  return (
    <div className={cardStyle}>
      
        <div className={imageContainer}>
          {/* <LazyImage
        src={Poster!}// The actual image source
        alt="Image description"
        width="200px"
        height="150px"
        borderRadius="10px"
        placeholder={<Skeleton width="200px" height="20px" borderRadius="10px" />} // Your JSX placeholder element
      /> */}
          <Skeleton width="100%" height="300px" borderRadius="10px" />
        
        </div>
      
        <div className={flexContainer}>
          <Skeleton width="100%" height="40px" borderRadius="10px" />
          <Skeleton width="100%" height="40px" borderRadius="10px" />
          <Skeleton width="100%" height="40px" borderRadius="10px" />
          <Skeleton width="100%" height="40px" borderRadius="10px" />
        </div>
     
      <Skeleton width="100%" height="40px" className="" borderRadius="10px" />
    
    </div>
  );
};

export default SkeletonMovieCard;
