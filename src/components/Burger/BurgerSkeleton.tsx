import ContentLoader from "react-content-loader";

export const BurgerSkeleton = () => (
  <ContentLoader
    className="burgerSkeleton"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ebebeb"
  >
    <rect y="8" rx="3" ry="3" height="6" />
    <rect y="26" rx="3" ry="3" height="6" />
    <rect y="56" rx="3" ry="3" height="6" />
    <rect y="72" rx="3" ry="3" height="6" />
    <rect y="88" rx="3" ry="3" height="6" />
    <circle />
    <rect x="40" y="55" rx="57" ry="57" width="200" height="160" />
    <rect x="0" y="257" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="305" rx="10" ry="10" width="280" height="44" />
    <rect x="20" y="380" rx="10" ry="10" width="65" height="27" />
    <rect x="160" y="380" rx="21" ry="21" width="108" height="45" />
  </ContentLoader>
);
