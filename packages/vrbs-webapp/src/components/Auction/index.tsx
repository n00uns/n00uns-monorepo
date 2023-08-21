import { Col } from 'react-bootstrap';
import { StandaloneVrbWithSeed } from '../StandaloneVrb';
import AuctionActivity from '../AuctionActivity';
import { Row, Container } from 'react-bootstrap';
import { setStateBackgroundColor } from '../../state/slices/application';
import { LoadingVrb } from '../Vrb';
import { Auction as IAuction } from '../../wrappers/vrbsAuction';
import classes from './Auction.module.css';
// import { IVrbSeed } from '../../wrappers/vrbsToken';
import { ImageData } from '@vrbs/assets';
import FounderVrbContent from '../FounderVrbContent';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isFounderVrb } from '../../utils/founderVrb';
import {
  setNextOnDisplayAuctionVrbId,
  setPrevOnDisplayAuctionVrbId,
} from '../../state/slices/onDisplayAuction';
import { beige, grey } from '../../utils/vrbBgColors';
import pixel_border from '../../assets/pixel_border.svg';
import bg from '../../assets/home/home-sec1.png';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';

interface AuctionProps {
  auction?: IAuction;
}

const { bgcolors } = ImageData;

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  const lastVrbId = useAppSelector(state => state.onDisplayAuction.lastAuctionVrbId);
  const onDisplayAuction = useOnDisplayAuction();
  const onDisplayAuctionVrbId = onDisplayAuction?.vrbId.toNumber();

  const loadedVrbHandler = (seed: IAuction) => {
    // console.log('seed');
    // console.log(seed);
    dispatch(setStateBackgroundColor(bgcolors[seed.vrbId.toNumber()] === grey ? grey : beige));
  };

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionVrbId());
    currentAuction && history.push(`/vrb/${currentAuction.vrbId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionVrbId());
    currentAuction && history.push(`/vrb/${currentAuction.vrbId.toNumber() + 1}`);
  };

  const vrbContent = currentAuction && (
    <div className={classes.vrbWrapper}>
      {loadedVrbHandler(currentAuction)}
      <StandaloneVrbWithSeed vrbId={currentAuction.vrbId} shouldLinkToProfile={false} />
    </div>
  );

  const loadingVrb = (
    <div className={classes.vrbWrapper}>
      <LoadingVrb />
    </div>
  );

  const currentAuctionActivityContent = currentAuction && lastVrbId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.vrbId.eq(0)}
      isLastAuction={currentAuction.vrbId.eq(lastVrbId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
    />
  );
  const founderVrbContent = currentAuction && lastVrbId && (
    <FounderVrbContent
      mintTimestamp={currentAuction.startTime}
      vrbId={currentAuction.vrbId}
      isFirstAuction={currentAuction.vrbId.eq(0)}
      isLastAuction={currentAuction.vrbId.eq(lastVrbId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
    />
  );

  return (
    <div style={{ backgroundColor: stateBgColor }} className={classes.wrapper}>
      <img src={bg} className={classes.auctionBg} alt="backgroundImage" />
      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 6 }} className={classes.vrbContentCol}>
            {currentAuction ? vrbContent : loadingVrb}
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction &&
              (isFounderVrb(currentAuction.vrbId)
                ? founderVrbContent
                : currentAuctionActivityContent)}
          </Col>
        </Row>
        {onDisplayAuctionVrbId !== undefined && onDisplayAuctionVrbId !== lastVrbId && (
          <Row>
            <ProfileActivityFeed vrbId={onDisplayAuctionVrbId} />
          </Row>
        )}
      </Container>
      <img src={pixel_border} className={classes.auctionBorder} alt="border" />
    </div>
  );
};

export default Auction;
