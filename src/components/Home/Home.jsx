import './Home.css'

const Home = () => {
    return (
      <div className="homeContainer">
        <div className="homeFirstDiv">
          <div className="homeFirstDivImageContainer">
            <img
              src={require("../../images/Organising1.png")}
              alt="oragnising 1"
            ></img>
          </div>
          <div className="homeFirstDivTextContainer">
            <h1>Taskify</h1>
            <h2>A Personal Dashboard for all your To-Dos</h2>
          </div>
        </div>
      </div>
    );
}

export default Home;