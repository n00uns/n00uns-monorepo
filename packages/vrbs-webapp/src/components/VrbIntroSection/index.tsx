/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './VrbIntroSection.module.css';
import Section from '../../layout/Section';
import { Col, Nav } from 'react-bootstrap';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
// import vrbsIosGif from '../../assets/vrbs-ios.gif';
// import dlFromAppStoreImg from '../../assets/download-on-app-store.svg';

const VrbIntroSection = () => {
  return (
    <>
      <Section fullWidth={false} className={classes.videoSection}>
        <Col lg={6}>
          <div className={classes.textWrapper}>
            <h1>
              <Trans>One Vrb, One Vote, One Action Filled Movement.</Trans>
            </h1>
            <p>
              <Trans>
                Behold, an infinite work of art! Vrbs is a community-owned brand that makes a
                positive impact by funding ideas and fostering collaboration. From collectors and
                technologists, to non-profits and brands, Vrbs is for everyone.
              </Trans>
            </p>
          </div>
        </Col>
        <Col lg={6} className={classes.embedContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CBmCAjOu_-A"
            title="This is Vrbs"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Col>
      </Section>

      {/* <Section fullWidth={false} className={classes.iosSection}>
        <Col lg={6} className={classes.iosImgContainer}>
          <img src={vrbsIosGif} className={classes.iosImg} alt="vrbs ios" />
        </Col>
        <Col lg={6}>
          <div className={classes.textWrapper}>
            <h1>
              <Trans>Download the Free iOS App</Trans>
            </h1>
            <p>
              <Trans>
                Every new Vrb pushed right to your pocket! View the current auction, remix your
                own Vrb, and explore the entire history directly from the app.
              </Trans>
              <br />
              <a
                href="https://apps.apple.com/us/app/vrbs-explore-create-play/id1592583925"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={dlFromAppStoreImg}
                  className={classes.dlFromAppStoreImg}
                  alt="download vrbs ios app from app store"
                />
              </a>
            </p>
          </div>
        </Col>
      </Section> */}
    </>
  );
};

export default VrbIntroSection;
