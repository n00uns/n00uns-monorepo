import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Holder.module.css';
import ShortAddress from '../ShortAddress';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';
import { useQuery } from '@apollo/client';
import { vrbQuery } from '../../wrappers/subgraph';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import React from 'react';
import Tooltip from '../Tooltip';

interface HolderProps {
  vrbId: number;
  isVrbs?: boolean;
}

const Holder: React.FC<HolderProps> = props => {
  const { vrbId, isVrbs } = props;

  const isCool = useAppSelector(state => state.application.isCoolBackground);

  const { loading, error, data } = useQuery(vrbQuery(vrbId.toString()));

  if (loading) {
    return <></>;
  } else if (error) {
    return (
      <div>
        <Trans>Failed to fetch Vrb info</Trans>
      </div>
    );
  }

  const holder = data && data.vrb.owner.id;

  const nonVrbderVrbContent = (
    <a
      href={buildEtherscanAddressLink(holder)}
      target={'_blank'}
      rel="noreferrer"
      className={classes.link}
    >
      <Tooltip
        tip="View on Etherscan"
        tooltipContent={(tip: string) => {
          return <Trans>View on Etherscan</Trans>;
        }}
        id="holder-etherscan-tooltip"
      >
        <ShortAddress size={40} address={holder} avatar={true} />
      </Tooltip>
    </a>
  );

  const founderVrbContent = 'vrbs.eth';

  return (
    <>
      <Row className={clsx(classes.wrapper, classes.section)}>
        <Col xs={5} lg={12} className={classes.leftCol}>
          <h4
            style={{
              color: isCool ? 'var(--brand-cool-light-text)' : 'var(--brand-warm-light-text)',
            }}
            className={classes.holderCopy}
          >
            <Trans>Held by</Trans>
          </h4>
        </Col>
        <Col xs={7} lg={12}>
          <h2
            className={classes.holderContent}
            style={{
              color: isCool ? 'var(--brand-cool-dark-text)' : 'var(--brand-warm-dark-text)',
            }}
          >
            {isVrbs ? founderVrbContent : nonVrbderVrbContent}
          </h2>
        </Col>
      </Row>
    </>
  );
};

export default Holder;
