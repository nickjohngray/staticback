import React from 'react';
import PdfViewer from 'components/PdfViewer';
import {faFacebook, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import {FontAwesomeIcon} from '@fortawesome/free-brands-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';

export default () => (
    <div className="page center-it">
        <div className="about-block">
            <h1 className="center-text">About us</h1>
            We are a Strongman Gym and cater to both female and male athletes.
            <br></br>We offer classes in the evening from 7.30pm to 9.30pm Monday to Friday, coached by Owner and
            Director of Strength Pit.
            <br></br>Online coaching and online programming.
            <p></p>Directors: Husband and Wife duo Afaese and Nippy Paea
            <h1>History</h1>
            Strength Pit Otara was born out of the passion to facilitate a safe place, tailored for Maori and Pasifika
            to be themselves, and grow their natural strength.
            <br></br>Coach Afaese Paea, born and bred in Otara, always had a interest in strength sports, powerlifting,
            martial arts and Rugby.
            <br></br>While browsing around the big boys toys one year he stumbled across a Strongman event at the Easter
            Show back in 2005 - 2006 and searched how to get involved in that sport.
            <p></p>
            And the rest is history, his first Novice competition he won without any training and then decided to pursue
            the NZ Strongman Arena.
            <br></br>Due to the events being few and far between it was difficult to train without the apparatus’s so we
            decided to offer strength training to a local Box Empire Training Box based in Otara back in 2014 and the
            word got around and some 10 poly boys started showing up after the Box had closed.
            <br></br>Thanks to a really good mate also born and bred in Otara Lama Saga loaned us his space until we out
            grew it.
            <p></p>We set up officially in June 2015, and operate online coaching, strength and conditioning workshops
            all over the country and have Athletes competing in Strongman both in NZ and Australia.
        </div>
        {/*here*/}
        <h2 className="center-text">Contact Us</h2>
        <div className="center-text social-icons">
            <a href="mailto:strengthpitotara@gmail.com">
                <FontAwesomeIcon size="1x" icon={faGoogle} />
                <span>StrengthPitOtara@gmail.com</span>
            </a>

            <a
                placeholder="Facebook Strength Pit Otara Limited"
                href="https://www.facebook.com/StrengthPitOtaraLimited"
                target="_new"
            >
                <FontAwesomeIcon size="1x" icon={faFacebook} />
                <span>StrengthPitOtaraLimited</span>{' '}
            </a>

            <a href="https://www.instagram.com/nzstrengthcoach/" target="_new">
                <FontAwesomeIcon size="1x" icon={faInstagram} />
                <span> NZStrengthCoach</span>{' '}
            </a>

            <a href="tel:0220122821" target="_new">
                <FontAwesomeIcon size="1x" icon={faPhone} />
                <span> (022) 012 2821 </span>{' '}
            </a>
        </div>
        <br></br>
        <h2>Athletes coached by NZ strength coach</h2>
        <h2 className="center-text">
            <a title="download" href="./../src/pdf/strength_pit_otara_strongman_athletes_board_2020.pdf" target="_new">
                Strong Man Athletes Board 2020
            </a>
        </h2>
        <PdfViewer file={'./../src/assets/strength_pit_otara_strongman_athletes_board_2020.pdf'} />
        <h2 className="center-text">
            <a
                title="download"
                href="./../src/assets/strength_pit_otara_strongwoman_athletes_board_2020.pdf"
                target="_new"
            >
                Strong Woman Athletes Board 2020
            </a>
        </h2>
        <PdfViewer file={'./../src/pdf/strength_pit_otara_strongwoman_athletes_board_2020.pdf'} />
    </div>
);
