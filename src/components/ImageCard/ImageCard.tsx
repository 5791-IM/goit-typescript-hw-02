import { FC } from "react";
import { ApiImage } from "../../Photo-api";
import css from "./ImageCard.module.css";

export interface ImageCardProps {
  image: ApiImage;
  openModal: (id: ApiImage) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  const {
    urls: { small },
    alt_description: alt,
  } = image;

  return (
    <div className={css.imageCard}>
      <img
        src={small}
        alt={alt || "image"}
        onClick={() => openModal(image)}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
