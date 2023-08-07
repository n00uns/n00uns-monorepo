/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImageData as data, getVrbData } from '@vrbs/assets';
import { useAppSelector } from '../../hooks';
import fomo from '../../assets/fomo.svg';
import { buildSVG } from '@vrbs/sdk';
import { BigNumber, BigNumber as EthersBN } from 'ethers';
import { IVrbSeed, useVrbSeed } from '../../wrappers/vrbsToken';
import Vrb from '../Vrb';
import { Link } from 'react-router-dom';
import classes from './StandaloneVrb.module.css';
import { useDispatch } from 'react-redux';
import { setOnDisplayAuctionVrbId } from '../../state/slices/onDisplayAuction';
import vrbClasses from '../Vrb/Vrb.module.css';
import Image from 'react-bootstrap/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
import 'swiper/modules/pagination/pagination.min.css';

interface StandaloneVrbProps {
  vrbId: EthersBN;
}
interface StandaloneCircularVrbProps {
  vrbId: EthersBN;
  border?: boolean;
}

interface StandaloneVrbWithSeedProps {
  vrbId: EthersBN;
  onLoadSeed?: (seed: IVrbSeed) => void;
  shouldLinkToProfile: boolean;
}

export const getVrb = (vrbId: string | EthersBN, seed: IVrbSeed) => {
  const id = vrbId.toString();
  const name = `Vrb ${id}`;
  const description = `Vrb ${id} is a member of the Vrbs DAO`;
  // console.log('getting vrb image from ' + id);

  const { fullImage } = getVrbData(id);

  // console.log(fullImage);
  return {
    fullImage,
  };
};

export const StandaloneVrbImage: React.FC<StandaloneVrbProps> = (props: StandaloneVrbProps) => {
  const { vrbId } = props;
  const seed = useVrbSeed(vrbId);
  const vrb = seed && getVrb(vrbId, seed);

  return <Image src={vrb ? vrb.fullImage : ''} fluid />;
};

const StandaloneVrb: React.FC<StandaloneVrbProps> = (props: StandaloneVrbProps) => {
  const { vrbId } = props;
  const seed = useVrbSeed(vrbId);
  const vrb = seed && getVrb(vrbId, seed);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionVrbId(vrbId.toNumber()));
  };

  return (
    <Link to={'/vrb/' + vrbId.toString()} className={classes.clickableVrb} onClick={onClickHandler}>
      <Vrb imgPath={vrb ? vrb.fullImage : ''} alt={'Vrb'} />
    </Link>
  );
};

export const StandaloneVrbCircular: React.FC<StandaloneCircularVrbProps> = (
  props: StandaloneCircularVrbProps,
) => {
  const { vrbId, border } = props;
  const seed = useVrbSeed(vrbId);
  const vrb = seed && getVrb(vrbId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionVrbId(vrbId.toNumber()));
  };

  if (!seed || !vrbId) return <Vrb imgPath="" alt="Vrb" />;

  return (
    <Link to={'/vrb/' + vrbId.toString()} className={classes.clickableVrb} onClick={onClickHandler}>
      <Vrb
        imgPath={vrb ? vrb.fullImage : ''}
        alt={'Vrb'}
        wrapperClassName={vrbClasses.circularVrbWrapper}
        className={border ? vrbClasses.circleWithBorder : vrbClasses.circular}
      />
    </Link>
  );
};

export const StandaloneVrbRoundedCorners: React.FC<StandaloneVrbProps> = (
  props: StandaloneVrbProps,
) => {
  const { vrbId } = props;
  const seed = useVrbSeed(vrbId);
  const vrb = seed && getVrb(vrbId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionVrbId(vrbId.toNumber()));
  };

  return (
    <Link to={'/vrb/' + vrbId.toString()} className={classes.clickableVrb} onClick={onClickHandler}>
      <Vrb imgPath={vrb ? vrb.fullImage : ''} alt={'Vrb'} className={vrbClasses.rounded} />
    </Link>
  );
};

export const StandaloneVrbWithSeed: React.FC<StandaloneVrbWithSeedProps> = (
  props: StandaloneVrbWithSeedProps,
) => {
  const { vrbId, onLoadSeed, shouldLinkToProfile } = props;
  const dispatch = useDispatch();
  const seed = useVrbSeed(vrbId);
  const seedIsInvalid = Object.values(seed || {}).every(v => v === 0);

  //prev seed
  // const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);
  // const prevID = BigNumber.from(vrbId.toNumber() - 1);
  // const prevSeed = useVrbSeed(prevID);
  // const prev: { image: string; description: string } = getVrb(prevID, prevSeed);
  // console.log(prev);

  //if (!seed || seedIsInvalid || !vrbId || !onLoadSeed) return <Vrb imgPath="" alt="Vrb" />;

  //onLoadSeed(seed);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionVrbId(vrbId.toNumber()));
  };

  const { fullImage } = getVrb(vrbId, seed);
  // // console.log(image);
  // // console.log(pastAuctions);
  // const slideData = [{}, {}, {}];

  // let slides = [
  //   <SwiperSlide key={0} className={classes.swiperSlide}>
  //     <Vrb imgPath={fomo} alt={description} />
  //   </SwiperSlide>,
  //   <SwiperSlide key={1} className={classes.swiperSlide}>
  //     <Vrb imgPath={image} alt={description} />
  //   </SwiperSlide>,
  //   <SwiperSlide key={2} className={classes.swiperSlide}>
  //     <Vrb imgPath={prev.image} alt={prev.description} />
  //   </SwiperSlide>,
  // ];

  // let i = 3;
  // let slidesMain = slideData.map(slide => (
  //   <SwiperSlide key={i++} className={classes.swiperSlide}>
  //     <Vrb imgPath={image} alt={description} />
  //   </SwiperSlide>
  // ));

  // slides.push(...slidesMain);

  // const swiperEl = (
  //   <Swiper
  //     onSwiper={swiper => {
  //       swiper.changeLanguageDirection('rtl');
  //     }}
  //     onSlideChange={swiper => {
  //       console.log(swiper);
  //       if (swiper.activeIndex > swiper.previousIndex) {
  //         onPrevAuctionClick();
  //       }
  //     }}
  //     initialSlide={1}
  //     effect={'coverflow'}
  //     grabCursor={true}
  //     centeredSlides={true}
  //     slidesPerView={'auto'}
  //     coverflowEffect={{
  //       rotate: 20,
  //       stretch: 0,
  //       depth: 250,
  //       modifier: 1,
  //       slideShadows: true,
  //     }}
  //     pagination={false}
  //     modules={[EffectCoverflow, Pagination]}
  //   >
  //     {slides}
  //   </Swiper>
  // );

  const vrb = <Vrb imgPath={fullImage} alt={'Vrb'} />;

  const vrbWithLink = (
    <Link to={'/vrb/' + vrbId.toString()} className={classes.clickableVrb} onClick={onClickHandler}>
      {/* {swiperEl} */}
      {vrb}
    </Link>
  );
  return shouldLinkToProfile ? vrbWithLink : vrb;
};

export default StandaloneVrb;
