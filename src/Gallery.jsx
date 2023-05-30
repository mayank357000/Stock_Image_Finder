import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;
  console.log(import.meta.env.VITE_API_KEY);

const Gallery = () => {
  const {searchTerm}=useGlobalContext();
  //and ReactQuery re-render tabhi krti hai ya update/del wali query se iski queryKey pr invalidateQueries() call
  //ho ya queryKey change ho, so ham searchTerm add kr denge queryKey main
  //also RQ cache krke rakhta hai values
  //so agr wapas cat call, then cached values used and in background refecth krke check ki values 
  //sahi hai ya nhi, nhi then change else not 
  const response = useQuery({
    queryKey: ["images",searchTerm],//so thoda boht dependancy array jaisa, iske item change bina re-render 
    //se queryFn wapadcall nhi hoga
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  // console.log(response);
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading....</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an Error....</h4>
      </section>
    );
  }
  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No Results Found...</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          ></img>
        );
      })}
    </section>
  );
};
export default Gallery;
