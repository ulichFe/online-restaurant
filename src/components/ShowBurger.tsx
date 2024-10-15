import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ShowBurger = () => {
  const [burger, setBurger] = useState<{
    imageUrl: string;
    price: string;
  }>();

  const { id } = useParams();

  useEffect(() => {
    async function fetchBurger() {
      try {
        const { data } = await axios.get(
          "https://6601410a87c91a11641a6ac6.mockapi.io/items/" + id
        );
        setBurger(data);
      } catch (error) {
        alert("error");
      }
    }
    fetchBurger();
  }, []);

  if (!burger) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <div className="show-burger">
        <div className="show-burger__img-container">
          <img
            className="show-burger__img"
            src={burger.imageUrl}
            alt="burger"
          />
        </div>

        <div className="show-burger__desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, esse
          vel necessitatibus possimus reiciendis libero dignissimos amet iste ea
          obcaecati quae est nemo quidem sapiente quia facilis. Aspernatur,
          harum corrupti.
        </div>

        <p className="show-burger__price">{burger.price} $</p>
      </div>
    </div>
  );
};
