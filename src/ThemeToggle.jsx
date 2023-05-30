import { useGlobalContext } from "./context"
import {BsFillSunFill,BsFillMoonFill} from 'react-icons/bs';

const ThemeToggle = () => {
  // console.log(useGlobalContext())
  const {isDarkTheme,toggleDarkTheme}=useGlobalContext();
  return (
    <section className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillSunFill className="white-fill"></BsFillSunFill>
        ) : (
          <BsFillMoonFill></BsFillMoonFill>
        )}
      </button>
    </section>
  );
}
export default ThemeToggle