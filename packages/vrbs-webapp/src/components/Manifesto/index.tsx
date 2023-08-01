import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Manifesto.module.css';
import { Trans } from '@lingui/macro';
import bg from '../../assets/home/home-sec3.png';
import manifestoImg from '../../assets/manifesto.png';

interface ManifestoProps {
  backgroundColor?: string;
}

const Manifesto = (props: ManifestoProps = { backgroundColor: '#FFF' }) => {
  const weVrbs = (
    <span className={classes.aboutMedium}>We're Vrbs [DAO] ✌🏽.</span>
  );

  return (
    <>
      <Section
        fullWidth={false}
        className={classes.manifestoSection}
        style={{ background: props.backgroundColor }}
      >
        <img src={bg} className={classes.manifestoBg} alt="backgroundImage" />
        <Col lg={{ span: 10, offset: 1 }}>
          <div className={classes.headerWrapper}>
            <p className={classes.aboutText}>
              <Trans>Dear Internet 1.0-3.0,</Trans>
            </p>
            <p className={classes.aboutText} style={{ paddingBottom: '2rem' }}>
              <Trans>
                {weVrbs} We came together by the [mutual and ridiculous] conviction that
                NFTs can create and nurture strong communities and networks of people. Strong
                focused communities, with a treasury governed by outcome focused voting, have the
                potential to impact the world in small and big ways 🌎.
              </Trans>
            </p>
            <img src={manifestoImg} className={classes.manifestoImg} alt="manifestoImage" />
            <p className={classes.aboutMedium}>
              <Trans>What is Vrbs?</Trans>
            </p>
            <p className={classes.aboutText}>
              <Trans>
                Vrbs is a decentralized internet community on the blockchain. We are building a
                protocol for people, called Vrbs Protocol, that empowers voting, funding and
                incubating brilliant ideas. We are an ambitious group of entrepreneurs,
                technologists, investors, developers, engineers, business executives, and artists
                from around the world.
              </Trans>
            </p>
            <p className={classes.aboutMedium}>
              <Trans>What do Vrbs do?</Trans>
            </p>
            <p className={classes.aboutText}>
              <ol>
                <li>
                  <Trans>We share a community wallet that funds brilliant ideas and people.</Trans>
                </li>
                <li>
                  <Trans>Our Vrb NFTs are brought to life by talented artists.</Trans>
                </li>
                <li>
                  <Trans>
                    Our Vrb NFTs are brought to life by talented artists. Our community wallet is
                    funded by daily auctions of our Vrb NFTs.
                  </Trans>
                </li>
                <li>
                  <Trans>Participate and purchase an NFT through our daily auctions.</Trans>
                </li>
                <li>
                  <Trans>Your NFT is your membership into the DAO and your power to vote.</Trans>
                </li>
                <li>
                  <Trans>Collectively vote on which ideas to fund using the Vrbs Protocol.</Trans>
                </li>
              </ol>
            </p>
            <p className={classes.aboutText}>
              <Trans>Strong communities are the foundation of strong economies, vibrant nation states, and inspired generations. Strong communities activate participation, interest, and attention. And attention directed in the right places is a good thing.</Trans>
            </p>
            <p className={classes.aboutText}>
              <Trans>We believe the next internet has the potential to do a lot of great things. But it requires real people doing the work to steward its potential.</Trans>
            </p>
            <p className={classes.aboutText}>
              <Trans>So join us on this experiment and see what an ambitious and crazy group of people can build together. What will you build with the Vrbs?</Trans>
            </p>
          </div>
        </Col>
      </Section>
    </>
  );
};
export default Manifesto;
