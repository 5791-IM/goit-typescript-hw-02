import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { FC, useEffect, useRef, useState } from "react";
import getImages, { ApiImage } from "../../Photo-api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import css from "./App.module.css";

Modal.setAppElement("#root");

const App: FC = () => {
  const [images, setImages] = useState<ApiImage[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<ApiImage | null>(null);
  // const [modalIsOpen, setIsOpen] = useState(false);

  const onSubmit = (query: string) => {
    setPage(1);
    setImages([]);
    setSearchQuery(query);

    if (query === "") return toast.error("Write something to start searching");
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImages(searchQuery, page);
        setImages((prevState) => [...prevState, ...data]);
        if (page > 1 && bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: ApiImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <h1>Search images</h1>
      <SearchBar onSubmit={onSubmit} />
      {isError && (
        <ErrorMessage message="Oops! There was an error! Try again!" />
      )}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <div ref={bottomRef}></div>
      <Toaster position="top-right" />
      {selectedImage && (
        <ImageModal
          alt={selectedImage.alt_description}
          regular={selectedImage.urls.regular}
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
