import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';
import { Trans } from '@lingui/macro';
import pixel_border from '../../assets/pixel_border.svg';

interface DocumentationProps {
  backgroundColor?: string;
}

const Documentation = (props: DocumentationProps = { backgroundColor: '#FFF' }) => {
  // const cryptopunksLink = (
  //   <Link
  //     text={<Trans>Cryptopunks</Trans>}
  //     url="https://www.larvalabs.com/cryptopunks"
  //     leavesPage={true}
  //   />
  // );
  const playgroundLink = (
    <Link text={<Trans>Playground</Trans>} url="/playground" leavesPage={false} />
  );
  const publicDomainLink = (
    <Link
      text={<Trans>public domain</Trans>}
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  const compoundGovLink = (
    <Link
      text={<Trans>Compound Governance</Trans>}
      url="https://compound.finance/governance"
      leavesPage={true}
    />
  );
  const nounsLink = (
    <Link text={<Trans>Nouns.wtf</Trans>} url="https://nouns.wtf" leavesPage={true} />
  );
  return (
    <>
      {/* <img src={pixel_border} className={classes.documentationBorder} alt="border" /> */}

      <Section
        fullWidth={false}
        className={classes.documentationSection}
        style={{ background: props.backgroundColor }}
      >
        <Col lg={{ span: 10, offset: 1 }}>
          <div className={classes.headerWrapper}>
            <h1>
              <Trans>First Principals: Action</Trans>
            </h1>
            <p className={classes.aboutText}>
              <Trans>
                Vrbs are an experimental attempt to improve the organization and impact of on-chain
                avatar communities pioneered by {nounsLink}.
              </Trans>
            </p>
            <p className={classes.aboutText}>
              <Trans>
                Where, projects such as CryptoPunks, DeGods, y00ts, and Ordinal Maxi Business are
                pioneering onboaring chain specific digital community and identity.
              </Trans>
            </p>
            <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
              <Trans>
                The Vrbs are attempting to pioneer a new standard of, active communities, robust
                governance, art provenance, and a treasury that can be used by the members for the
                common good.
              </Trans>
            </p>
          </div>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Summary</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    <Trans>Vrbs artwork is in the {publicDomainLink}.</Trans>
                  </li>
                  <li>
                    <Trans>One Vrb is trustlessly auctioned every 24 hours.</Trans>
                  </li>
                  <li>
                    <Trans>
                      100% of Vrb auction proceeds are trustlessly sent to the treasury.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Settlement of one auction kicks off the next.</Trans>
                  </li>
                  <li>
                    <Trans>All Vrbs are members of Vrbs DAO.</Trans>
                  </li>
                  <li>
                    <Trans>Vrbs DAO uses a fork of {compoundGovLink}.</Trans>
                  </li>
                  <li>
                    <Trans>One Vrb is equal to one vote.</Trans>
                  </li>
                  <li>
                    <Trans>The treasury is controlled exclusively by Vrbs via governance.</Trans>
                  </li>
                  <li>
                    <Trans>Artwork is generative and stored directly on-chain (not IPFS).</Trans>
                  </li>
                  <li>
                    <Trans>
                      No explicit rules exist for attribute scarcity; all Vrbs are equally rare.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Vrbs receive rewards in the form of Vrbs (10% of supply for first 5 years).
                    </Trans>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Daily Auctions</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p className={classes.aboutText}>
                  <Trans>
                    The Vrbs Auction Contract will act as a self-sufficient Vrb generation and
                    distribution mechanism, auctioning one Vrb every 24 hours, forever. 100% of
                    auction proceeds (ETH) are automatically deposited in the Vrbs DAO treasury,
                    where they are governed by Vrb owners.
                  </Trans>
                </p>

                <p className={classes.aboutText}>
                  <Trans>
                    Each time an auction is settled, the settlement transaction will also cause a
                    new Vrb to be minted and a new 24 hour auction to begin.{' '}
                  </Trans>
                </p>
                <p>
                  <Trans>
                    While settlement is most heavily incentivized for the winning bidder, it can be
                    triggered by anyone, allowing the system to trustlessly auction Vrbs as long as
                    Ethereum is operational and there are interested bidders.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrbs DAO</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <Trans>
                  Vrbs DAO utilizes a fork of {compoundGovLink} and is the main governing body of
                  the Vrbs ecosystem. The Vrbs DAO treasury receives 100% of ETH proceeds from daily
                  Vrb auctions. Each Vrb is an irrevocable member of Vrbs DAO and entitled to one
                  vote in all governance matters. Vrb votes are non-transferable (if you sell your
                  Vrb the vote goes with it) but delegatable, which means you can assign your vote
                  to someone else as long as you own your Vrb.
                </Trans>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Governance ‘Slow Start’</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The proposal veto right was initially envisioned as a temporary solution to the
                    problem of ‘51% attacks’ on the Vrbs DAO treasury. While Vrbs initially believed
                    that a healthy distribution of Vrbs would be sufficient protection for the DAO,
                    a more complete understanding of the incentives and risks has led to general
                    consensus within the Vrbs, the Vrbs Foundation, and the wider community that a
                    more robust game-theoretic solution should be implemented before the right is
                    removed.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The Vrbs community has undertaken a preliminary exploration of proposal veto
                    alternatives (‘rage quit’ etc.), but it is now clear that this is a difficult
                    problem that will require significantly more research, development and testing
                    before a satisfactory solution can be implemented.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Consequently, the Vrbs Foundation anticipates being the steward of the veto
                    power until Vrbs DAO is ready to implement an alternative, and therefore wishes
                    to clarify the conditions under which it would exercise this power.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The Vrbs Foundation considers the veto an emergency power that should not be
                    exercised in the normal course of business. The Vrbs Foundation will veto
                    proposals that introduce non-trivial legal or existential risks to the Vrbs DAO
                    or the Vrbs Foundation, including (but not necessarily limited to) proposals
                    that:
                  </Trans>
                </p>
                <ul>
                  <li>unequally withdraw the treasury for personal gain</li>
                  <li>bribe voters to facilitate withdraws of the treasury for personal gain</li>
                  <li>
                    attempt to alter Vrb auction cadence for the purpose of maintaining or acquiring
                    a voting majority
                  </li>
                  <li>make upgrades to critical smart contracts without undergoing an audit</li>
                </ul>
                <p>
                  <Trans>
                    There are unfortunately no algorithmic solutions for making these determinations
                    in advance (if there were, the veto would not be required), and proposals must
                    be considered on a case by case basis.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrb Traits</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    Vrbs are generated randomly based Ethereum block hashes. There are no 'if'
                    statements or other rules governing Vrb trait scarcity, which makes all Vrbs
                    equally rare. As of this writing, Vrbs are made up of:
                  </Trans>
                </p>
                <ul>
                  <li>
                    <Trans>backgrounds (2) </Trans>
                  </li>
                  <li>
                    <Trans>bodies (30)</Trans>
                  </li>
                  <li>
                    <Trans>accessories (140) </Trans>
                  </li>
                  <li>
                    <Trans>heads (242) </Trans>
                  </li>
                  <li>
                    <Trans>glasses (23)</Trans>
                  </li>
                </ul>
                <Trans>
                  You can experiment with off-chain Vrb generation at the {playgroundLink}.
                </Trans>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>On-Chain Artwork</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    Vrbs are stored directly on Ethereum and do not utilize pointers to other
                    networks such as IPFS. This is possible because Vrb parts are compressed and
                    stored on-chain using a custom run-length encoding (RLE), which is a form of
                    lossless compression.
                  </Trans>
                </p>

                <p>
                  <Trans>
                    The compressed parts are efficiently converted into a single base64 encoded SVG
                    image on-chain. To accomplish this, each part is decoded into an intermediate
                    format before being converted into a series of SVG rects using batched, on-chain
                    string concatenation. Once the entire SVG has been generated, it is base64
                    encoded.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrb Seeder Contract</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The Vrb Seeder contract is used to determine Vrb traits during the minting
                    process. The seeder contract can be replaced to allow for future trait
                    generation algorithm upgrades. Additionally, it can be locked by the Vrbs DAO to
                    prevent any future updates. Currently, Vrb traits are determined using
                    pseudo-random number generation:
                  </Trans>
                </p>
                <code>keccak256(abi.encodePacked(blockhash(block.number - 1), vrbId))</code>
                <br />
                <br />
                <p>
                  <Trans>
                    Trait generation is not truly random. Traits can be predicted when minting a Vrb
                    on the pending block.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrbder's Reward</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    'Vrbs' are the group of ten builders that initiated Vrbs. Here are the Vrbs:
                  </Trans>
                </p>
                <ul>
                  <li>
                    <Link
                      text="@cryptoseneca"
                      url="https://twitter.com/cryptoseneca"
                      leavesPage={true}
                    />
                  </li>
                  <li>
                    <Link text="@gremplin" url="https://twitter.com/gremplin" leavesPage={true} />
                  </li>
                  <li>
                    <Link text="@punk4156" url="https://twitter.com/punk4156" leavesPage={true} />
                  </li>
                  <li>
                    <Link text="@eboyarts" url="https://twitter.com/eBoyArts" leavesPage={true} />
                  </li>
                  <li>
                    <Link text="@punk4464" url="https://twitter.com/punk4464" leavesPage={true} />
                  </li>
                  <li>
                    <Link
                      text="@_solimander_"
                      url="https://twitter.com/_solimander_"
                      leavesPage={true}
                    />
                  </li>
                  <li>
                    <Link text="@dhof" url="https://twitter.com/dhof" leavesPage={true} />
                  </li>
                  <li>
                    <Link
                      text="@devcarrot"
                      url="https://twitter.com/carrot_init"
                      leavesPage={true}
                    />
                  </li>
                  <li>
                    <Link text="@TimpersHD" url="https://twitter.com/TimpersHD" leavesPage={true} />
                  </li>
                  <li>
                    <Link
                      text="@lastpunk9999"
                      url="https://twitter.com/lastpunk9999"
                      leavesPage={true}
                    />
                  </li>
                </ul>
                <p>
                  <Trans>
                    Because 100% of Vrb auction proceeds are sent to Vrbs DAO, Vrbs have chosen to
                    compensate themselves with Vrbs. Every 10th Vrb for the first 5 years of the
                    project (Vrb ids #0, #10, #20, #30 and so on) will be automatically sent to the
                    Vrbder's multisig to be vested and shared among the founding members of the
                    project.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Vrbder distributions don't interfere with the cadence of 24 hour auctions. Vrbs
                    are sent directly to the Vrbder's Multisig, and auctions continue on schedule
                    with the next available Vrb ID.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Section>
    </>
  );
};
export default Documentation;
