import React from "react";
import { Grid } from "semantic-ui-react";
import SportsCard from "../components/SportsCard";
import football from "../images/football.jpg";
import fieldhockey from "../images/field-hockey.jpg";
import icehockey from "../images/ice-hockey.jpg";
import athletics from "../images/athletics.jpg";
import american from "../images/american-football.jpg";
import badminton from "../images/badminton.jpg";
import gymnastics from "../images/gymnastics.jpg";
import baseball from "../images/baseball.jpg";
import boxing from "../images/boxing.jpg";
import basketball from "../images/basketball.jpg";
import cycling from "../images/cycling.jpg";
import cricket from "../images/cricket.jpg";
import diving from "../images/diving.jpg";
import formular1 from "../images/formular-1.jpg";
import golf from "../images/golf.jpg";
import handball from "../images/handball.jpg";
import mma from "../images/mma.jpg";
import motogp from "../images/motor-gp.jpg";
import nascar from "../images/nascar.jpg";
import rugby from "../images/rugby.jpg";
import skating from "../images/skating.jpg";
import swimming from "../images/swimming.jpg";
import tennis from "../images/tennis.jpg";
import volleyball from "../images/volleyball.jpg";
import weightlifting from "../images/weight-lifting.jpg";
// import  from '../images/'

function Sports() {
  return (
    <Grid columns={2}>
      <SportsCard image={football} title="Football" />
      <SportsCard image={basketball} title="Basketball" />
      <SportsCard image={tennis} title="Tennis" />
      <SportsCard image={cricket} title="Cricket" />
      <SportsCard image={formular1} title="Formula-1" />
      <SportsCard image={baseball} title="Baseball" />
      <SportsCard image={athletics} title="Athletics" />
      <SportsCard image={american} title="American-Football" />
      <SportsCard image={boxing} title="Boxing" />
      <SportsCard image={golf} title="Golf" />
      <SportsCard image={icehockey} title="Ice-Hockey" />
      <SportsCard image={volleyball} title="Volleyball" />
      <SportsCard image={badminton} title="Badminton" />
      <SportsCard image={cycling} title="Cycling" />
      <SportsCard image={rugby} title="Rugby" />
      <SportsCard image={swimming} title="Swimming" />
      <SportsCard image={mma} title="Mixed-Martial-Art" />
      <SportsCard image={motogp} title="Moto-GP" />
      <SportsCard image={fieldhockey} title="Field-Hockey" />
      <SportsCard image={nascar} title="Nascar" />
      <SportsCard image={handball} title="Handball" />
      <SportsCard image={gymnastics} title="Gymnastics" />
      <SportsCard image={skating} title="Skating" />
      <SportsCard image={diving} title="Diving" />
      <SportsCard image={weightlifting} title="Weight-Lifting" />
    </Grid>
  );
}

export default Sports;
