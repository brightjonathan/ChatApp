import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import hero from '../../assets/chatHero.png'
import { useSelector } from 'react-redux';


const Homepage = () => {

  const {currentUser} = useSelector(state => state.user);


  return (
    <div className="home">
    <nav className='container --flex-between'>
    <div className="logo">
        {/* <img src={logo} alt="logo" className='w-[9vh] h-[9vh] lg:w-[15vh] lg:h-[15vh]' /> */}
        <h2 className='text-[green]'>Chatty app</h2>
      </div>

      <ul className="home-links">

        {!currentUser ? <li> <Link to="/register" >Register</Link> </li> : null }

          <li>
            <button className="--btn --btn-primary">
              <Link to="/chat" >chat with friends</Link>
            </button>
          </li>

       </ul>
    </nav>

    {/* hero section */}
    <section className="container hero">
      <div className="hero-text">
      <h2> Instant Communication for Seamless Connections</h2> 
      <p className='font-normal'>
       Chatty app is an instant messaging platform that enables users to exchange text messages seamlessly.
       Step into the world of Chatty, where seamless communication is at your fingertips! This innovative messaging app re-defines the way users connect by offering instant text messaging. Whether you're sharing quick updates or engaging in meaningful conversations, Chatty ensures a smooth and efficient exchange of thoughts and ideas. Join the conversation and experience the convenience of instant communication with the Chatty app!
        </p><div className="hero-buttons">
          <button className="--btn --btn-secondary">
            <Link to="/chat">Get started for Free</Link>
          </button>
        </div>
        <div className="--flex-start">
          <NumberText num="3K" text="Owners"/>
          <NumberText num="2K" text=" Users" />
          <NumberText num="50+" text="Partners" />
        </div>
      </div>
      <div className="hero-image">
        <img src={hero} alt="Inventory" />
      </div>
    </section>
  </div>
  )
}

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Homepage
