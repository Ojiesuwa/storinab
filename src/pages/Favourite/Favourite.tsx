import LoadingBar from "../../components/LoadingBar/LoadingBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAccount from "../../hooks/useAccount";
import "./Favourite.css";
import useAuth from "../../hooks/useAuth";

const Favourite = () => {
  const { accountFavourites, handleFilterAccountFavoriteByKeyword } =
    useAccount();

  const { userCredential } = useAuth();

  return (
    <div className="favourite fade">
      <div className="top-bar fade-down">
        <h3>Favourites</h3>
        <div className="search-bar-wrapper">
          <SearchBar onSearch={handleFilterAccountFavoriteByKeyword} />
        </div>
      </div>
      {accountFavourites === null ? (
        <LoadingBar isVisible={true} />
      ) : accountFavourites?.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h4>No Favourites Added</h4>
        </div>
      ) : (
        <div className="main-wrapper fade-up">
          {accountFavourites?.map((data) => (
            <ProductCard
              data={data}
              handleUnFavorite={
                !userCredential && (() => window.location.reload())
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
