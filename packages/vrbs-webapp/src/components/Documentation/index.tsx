import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';
import { Trans } from '@lingui/macro';
import pixel_border_reverse from '../../assets/pixel_border_reverse.svg';
import bg from '../../assets/home/home-sec2.png';

interface DocumentationProps {
  backgroundColor?: string;
}

const Documentation = (props: DocumentationProps = { backgroundColor: '#FFF' }) => {
  const cryptopunksLink = (
    <Link
      text={<Trans>Cryptopunks</Trans>}
      url="https://cryptopunks.app"
      leavesPage={true}
    />
  );
  const degodsLink = (
    <Link
      text={<Trans>Degods</Trans>}
      url="https://degods.com"
      leavesPage={true}
    />
  );
  const y00tsLink = (
    <Link
      text={<Trans>y00ts</Trans>}
      url="https://y00ts.com"
      leavesPage={true}
    />
  );
  const ombLink = (
    <Link
      text={<Trans>Ordinal Maxi Business</Trans>}
      url="https://twitter.com/OrdinalMaxiBiz"
      leavesPage={true}
    />
  );
  // const playgroundLink = (
  //   <Link text={<Trans>Playground</Trans>} url="/playground" leavesPage={false} />
  // );
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
      <Section
        fullWidth={true}
        className={classes.documentationBorderSection}
        style={{ background: props.backgroundColor }}
      >
        <img src={pixel_border_reverse} className={classes.documentationBorder} alt="border" />
      </Section>
      <Section
        fullWidth={false}
        className={classes.documentationSection}
        style={{ background: props.backgroundColor }}
      >
      <img src={bg} className={classes.documentationBg} alt="backgroundImage" />
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
                Where, projects such as {cryptopunksLink}, {degodsLink}, {y00tsLink}, and {ombLink} are
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
                    <Trans>
                      Vrbs artwork is the prototype of provenance, hand crafted for months by the
                      highest quality cross-chain artists such as Pencilz, Marcolino, Degen Poet and
                      more. The playful delight of each Vrb underscores it`s artistic origin,
                      everything from a keen focus on color theory via the y00ts artists to paying
                      homage to OG nouns traits. The art lives in the {publicDomainLink}.
                    </Trans>
                  </li>
                  <li>
                    <Trans>One Vrb is trustlessly auctioned every 24 hours.</Trans>
                  </li>
                  <li>
                    <Trans>
                      100% of Vrbs auction proceeds are trustlessly sent to the treasury, 80% for
                      DAO allocation, 20% for holder rewards and DAO expenses voted on by holders.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Settlement of one auction kicks off the next.</Trans>
                  </li>
                  <li>
                    <Trans>
                      All VRBs are members of an exclusive cohort known as the Vrbs DAO, which
                      consists of top-tier cross chain Artists, Creators, Venture Capitalists,
                      Whales, Founders, and Innovators.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Vrbs DAO uses a fork of {compoundGovLink}.</Trans>
                  </li>
                  <li>
                    <Trans>Vrbs DAO includes both Vrbs and y00t nouns. </Trans>
                    <ul>
                      <li>
                        <Trans>
                          One Vrb is equal to the write to make proposals and two votes.
                        </Trans>
                      </li>
                      <li>
                        <Trans>One y00t nouns is equal to one vote.</Trans>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Trans>The treasury is controlled exclusively by Vrbs via governance.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Artwork is hand-crafted 1/1s, stored directly on-chain (not IPFS).
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      No explicit rules exist for attribute scarcity; all Vrbs are equally rare.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Architects equal the developers of the DAO framework.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Builders equal the execution layer of the DAO responsible for everything
                      Vrbish (allocation of funds, onboarding new members, social media).
                    </Trans>
                  </li>
                  <li>
                    <Trans>Vrbs equal the individual voting members of the DAO.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Architects receive rewards in the form of Vrbs distributed on day 0, 10% of
                      the supply of each chain specific DAO when it launches. This allows the
                      Architects to experience the same level of dilution as every other holder, in
                      addition to giving them the votes to help curate the DAO in it’s infancy,
                      until critical consensus mass is reached.
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
                    The Vrbs Auction Contract will live in the public domain for fork-ability, and
                    act as a self-sufficient Vrb generation and distribution mechanism, auctioning
                    one Vrb every 24 hours, forever. 100% of auction proceeds (ETH) are
                    automatically deposited in the Vrbs DAO treasury, 80% to a decentralized
                    multisig for allocation to DAO proposals, 20% to a decentralized multisig for
                    allocation to DAO rewards (Vrb holders) and expenses. Both wallets will only
                    allocate funds when approved by the collective body of Vrbs owners.
                  </Trans>
                </p>

                <p className={classes.aboutText}>
                  <Trans>
                    Each time an auction is settled, the settlement transaction will also cause a
                    new Vrb to be minted and a new 24 hour auction to begin.
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
                <p>
                  <Trans>
                    Vrbs DAO utilizes a fork of {nounsLink} and {compoundGovLink} and is the main
                    governing body of the Vrbs ecosystem. The Vrbs DAO treasury receives 100% of ETH
                    proceeds from daily Vrbs auctions. Each Vrb is an irrevocable member of Vrbs DAO
                    and entitled to two vote in all governance matters and the right to draft
                    proposals for treasury allocations.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Vrbs votes are non-transferable (if you sell your Vrb the vote, and future
                    holder rewards goes with it) with no delegation to others.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Governance ‘Slow Start’</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    In addition to the security and precautions taken by Nouns DAO, Vrbs Developers,
                    and Compound Governance, the Architects have given themselves a special veto
                    right to ensure that no malicious proposals can be passed while the Vrbs supply
                    is low. This veto right will only be used if an obviously harmful governance
                    proposal has been passed, and is intended as a last resort.
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
                    The Architects consider the veto an emergency power that should not be exercised
                    in the normal course of business. Architects will veto proposals that introduce
                    non-trivial legal or existential risks to the DAO, including (but not
                    necessarily limited to) proposals that:
                  </Trans>
                </p>
                <ul>
                  <li>unequally withdraw the treasury for personal gain</li>
                  <li>bribe voters to facilitate withdraws of the treasury for personal gain</li>
                  <li>
                    attempt to alter Vrbs auction cadence for the purpose of maintaining or
                    acquiring a voting majority
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
                <Trans>Vrbs vs y00t Nouns</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The VRBs DAO`s virtuous cycle describes the cycle by which the incentivizing of
                    doing good leads to a greater collective good (which is compounded) through a
                    constant cycle of improvement.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    We accomplish this by taking Nouns orginal operating principles and improving on
                    them in a sort of nouns 2.0, which will proliferate all things VRBish, and
                    building from a solid foundation of experienced founders and a proven model. The
                    DAO exists for the proliferation of VRBs and for returning value back to its
                    members.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  The purchasing of a VRB NFT grants access to participate in the governance and rewards of the DAO. This governance is responsible for a community treasury, which is grown via a once-a-day auction model + contributions from previously backed projects.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  As the treasury grows, so do the proposals for funding, made by the members of the DAO, who aspire to proliferate VRBish ideals in the next generation tools, companies, events, and projects they build.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  These tools in turn help support the Ethereum/Solana/Polygon communities of builders and the broader in real life (IRL) communities around them, promoting a cycle of improvement that leads to viral growth.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Injecting the spirit of VRBs into Nouns ecosystem creates a powerful identity and further strengthens the need for action in this current environment. We are operating under a model of rapid decentralization, meaning, that this DAO framework was developed by a small group of Architects who laid the foundation for the DAO. Once the foundation was developed, a larger group of critically important entrepreneurs, investors, thinkers, and artists, known as the builders (council) further developed the idiosyncratic parts of the DAO.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Which brings us to today the VRBs and y00t noun communities will begin to build applications, rules, companies, games, art, and more within the framework (thought to life by the Architects, and developed on by the builders).
                  </Trans>
                </p>
                <p>
                  <Trans>
                  This is rapid decentralization.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  In short, as VRBs become a cultural tour de force, their value will increase and the treasury will grow. As the treasury grows, more ideas will be funded, leading to more projects created and more visions realized. In this way, the jovial characters boasting square-shaped glasses can be the catalyst of real-world changes and good in the world.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Both y00t nouns and VRBs are co-equal but serve different and distinct roles in the DAO. It is up to each individual to decide what path they take:
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Owning a VRB
                  <ul>
                    <li>
                      <Trans>Voting: Instant voting rights over treasury allocations from the DAO.</Trans>
                    </li>
                    <li>
                      <Trans>Proposals: Instant proposal rights in the DAO, allowing one to get their idea, project or company funded by the VRBs.</Trans>
                    </li>
                    <li>
                      <Trans>Multi-Chain: Each VRB will have the ability to transpose their NFT to future VRBs DAO (BTC, SOL, etc).</Trans>
                    </li>
                    <li>
                      <Trans>Gamification: Each VRB will have the ability of getting rewards from the treasury via participation in the governance.</Trans>
                    </li>
                    <li>
                      <Trans>Art: Each VRB is a 1/1 handcrafted piece by the marque names in the Solana and Ethereum ecosystems artists from marculino.png to Pencilx to DeGen Poet and many more.</Trans>
                    </li>
                  </ul>
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Owning a y00t Noun
                  <ul>
                    <li>
                      <Trans>Voting and Proposal via delegation rights post y00ts season II by the DeGods.</Trans>
                    </li>
                    <li>
                      <Trans>Access to VRBs community chats.</Trans>
                    </li>
                    <li>
                      <Trans>Stacking Points, IRL y00t events, and access to De the discord server.</Trans>
                    </li>
                    <li>
                      <Trans>Social clout and following from the main y00ts account.</Trans>
                    </li>
                    <li>
                      <Trans>Participation in the #1 collection on Polygon.</Trans>
                    </li>
                    <li>
                      <Trans>Brand Partnerships from the y00ts team.</Trans>
                    </li>
                  </ul>
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrbs Art</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                  Vrbs art is uniquely positioned at the intersection of governance and provenance. Each Vrb has be hand-crafted over the course of months by the most prolific artists in the NFT ecosystem. 
                  </Trans>
                </p>

                <p>
                  <Trans>
                  The cute but savage PFPs pay homage to the OG nouns but in a unique y00ts style.
                  </Trans>
                </p>
                <p>
                  <Trans>
                  Vrbs are selected randomly based Ethereum block hashes. There are no `if` statements or other rules governing Vrbs, which makes all Nouns equally rare.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6" className={classes.accordionItem}>
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
