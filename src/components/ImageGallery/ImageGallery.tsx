import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ApiImage } from "../../Photo-api";
import { FC } from "react";

export interface ImageGalleryProps {
  items: ApiImage[];
  openModal: (image: ApiImage) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {items.map((image, index) => (
        <ImageCard
          key={`${image.id}-${index}`}
          image={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
