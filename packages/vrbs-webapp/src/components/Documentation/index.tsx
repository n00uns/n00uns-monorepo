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
    <Link text={<Trans>Cryptopunks</Trans>} url="https://cryptopunks.app" leavesPage={true} />
  );
  const degodsLink = (
    <Link text={<Trans>Degods</Trans>} url="https://degods.com" leavesPage={true} />
  );
  const y00tsLink = <Link text={<Trans>y00ts</Trans>} url="https://y00ts.com" leavesPage={true} />;
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
  // const publicDomainLink = (
  //   <Link
  //     text={<Trans>public domain</Trans>}
  //     url="https://creativecommons.org/publicdomain/zero/1.0/"
  //     leavesPage={true}
  //   />
  // );
  // const compoundGovLink = (
  //   <Link
  //     text={<Trans>Compound Governance</Trans>}
  //     url="https://compound.finance/governance"
  //     leavesPage={true}
  //   />
  // );
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
                Where, projects such as {cryptopunksLink}, {degodsLink}, {y00tsLink}, and {ombLink}{' '}
                are pioneering onboaring chain specific digital community and identity.
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
                <Trans>The Summary</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The Vrb characters are the prototype of provenance, whose artistic development
                    was led by the super-talented cross-chain and multidisciplinary artists Pencilx
                    and Marculino. The playful nature of each Vrb character underscores their
                    origins, paying homage to the CCO Nouns on Ethereum and the y00ts collection,
                    with a focus on creating a cast of digital pixel characters that could transcend
                    generative art.
                  </Trans>
                </p>
                <ul>
                  <li>
                    <Trans>One Vrb is trustlessly auctioned every 24 hours.</Trans>
                  </li>
                  <li>
                    <Trans>
                      100% of the proceeds from each auction are trustlessly sent to the DAO
                      treasury, where 80% is allocated for use by the DAO members and 20% for
                      community rewards and DAO expenses.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Settlement of one auction will automatically kick off the next auction.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      All Vrb NFT holders are members of Vrbs DAO, which consists of people from
                      around the world who are interested in making a broad impact on society. The
                      goal of the Vrb NFTs is to create, foster, and nurture a super community of
                      people. Current members include top-tier entrepreneurs, artists, creators,
                      developers, investors, and thought leaders in the web3 space.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Vrbs DAO uses a fork of Nouns DAO and compound governance. The treasury is
                      controlled exclusively by Vrbs and y00t Nouns via governance.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Vrbs DAO is made up of two types of members, Vrbs and y00t Nouns. Vrbs and
                      y00t Nouns are the individual voting members of the DAO.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Holding 1 Vrb gives members the right to make proposals and submit one vote
                      per proposal.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Holding 1 y00t Noun gives members the right to vote. Submission of proposals
                      is possible by pairing up with a fellow Vrb holder to co-submit proposals,
                      fostering community building between members.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      The Vrbs are hand-drawn 1/1 characters whose development was led by artists
                      Pencilx and Marculino. The artwork is stored directly on-chain (not IPFS). New
                      top-tier artists will reinterpret the Vrbs characters as time goes on.
                    </Trans>
                  </li>
                  <li>
                    <Trans>All Vrbs are equally rare.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Vrb Architects are the developers of the DAO vision, framework, and culture.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Vrb Builders are the execution layer of the DAO responsible for everything
                      Vrbish, including allocation of funds, scaling out operations, ideating new
                      ventures, and onboarding new members, etc.
                    </Trans>
                  </li>
                </ul>
                <p className={classes.subtitle}>
                  <Trans>Will Vrbs DAO continue to work like Nouns?</Trans>
                </p>
                <ul>
                  <li>
                    <Trans>
                      Vrbs DAO is a multi-chain DAO whose aim is to build and proliferate
                      culture-impacting ideas via the Nouns DAO protocol. We are a group of
                      ambitious founders, builders, artists and change makers brought together by
                      the mutual conviction that a DAO, that is empowered by a strong community,
                      funded by a sustainable treasury, and incentivized to do good, can have a
                      small and big impact on the communities around us.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      In the words of Punk 4156, “there are several things we could/would have done
                      differently with Nouns but hindsight is 20/20”.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      We have the benefit of hindsight, and have taken the time to evaluate all of
                      the pro's and con's of the DAO in order to make a “V2” of nouns that is
                      hyper-charged by a super community. We believe that we can have a meaningful
                      impact on society and the communities around us by combining the power of
                      people and communities with a decentralized governance structure that allows
                      for fast mobilization and capital deployment.
                    </Trans>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrbs DAO?</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    Vrbs DAO is an experimental decentralized autonomous organization (DAO)
                    attempting to bootstrap technology at the intersection of NFTs, DAOs, IP Rights,
                    and DeFi (treasury voting) to push the boundaries of NFT application and utility
                    in the real world.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Whereas CryptoPunks attempted to bootstrap digital community and identity to
                    much success. Whereas Nouns, took community and identity a step further,
                    layering on governance and a treasury that can be used by the community.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Vrbs is the next iteration in this lineup, bootstrapping everything that the
                    Nouns successfully pioneered, and overlaying a [super community with a culture
                    of action] on top of [identity, community, governance, and a shared treasury].
                  </Trans>
                </p>
                <p>
                  <Trans>
                    This experiment establishes a kind of modern day tribuni plebis, by which an
                    ordinary individual, as part of a broader community, holds the power to create
                    pervasive and lasting social good in the world without a central governing body
                    or authority.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    This ethos allows the DAO identity, community, governance, and treasury to be
                    determined by the holders and for the holders.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Each Vrb NFT & y00t Noun presents its owner with a key to cross chain (ETH
                    current state, Polygon and Solana future state) governance and ownership, that
                    is at the heart of the Vrbs mission. The DAO treasury exists to inspire the
                    community that created it as well as the world around it.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>The Auctions: How it Works</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p className={classes.subtitle}>
                  <Trans>Daily Auctions:</Trans>
                </p>
                <p className={classes.aboutText}>
                  <Trans>
                    The Nouns DAO model of a once a day auction is wildly successful and has become
                    a model by which communities can slowly onboard like minded individuals with
                    high conviction in what the DAO is building.
                  </Trans>
                </p>
                <p className={classes.aboutText}>
                  <Trans>
                    The Vrbs DAO community is one that is passionate about art, governance,
                    cross-chain innovation, and business. It takes what Nouns have bootstrapped with
                    digital identity, provenance, community, and a treasury, and overlaps a super
                    community of people who operate with a culture of action.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The Vrb auctions will take place daily on Ethereum, similar to the Nouns. The
                    auction smart contract will act as a self-sufficient Vrbs NFT generation and
                    distribution mechanism, auctioning one Vrb NFT every 24 hours.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The Vrbs artwork is the prototype of provenance as drawn by @Pencilx &
                    @Marculino. Each Vrb NFT represents a hand drawn piece of history and a stake in
                    the future of Vrbs DAO.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    100% of the proceeds from each auction are trustlessly sent to the DAO treasury,
                    where 80% is allocated for use by the DAO members and 20% for community rewards
                    and DAO expenses with 3 out of 5 signatures required from delegates who were
                    voted on by the community.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Each time an auction is settled, the settlement transaction will be followed by
                    a new Vrbs NFT being minted and a new 24 hour auction beginning.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The winner of the once-a-day auction will be granted access and rights into the
                    Vrbs DAO, allowing them to vote, draft proposals, receive community rewards, and
                    participate in the broader governance of the DAO.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Governance ‘Slow Start’</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p className={classes.subtitle}>
                  <Trans>Proposal Guidance Tooling</Trans>
                </p>
                <p>
                  <Trans>
                    We want to make it easy for DAO members to submit high quality proposals for the
                    DAO that are set up for success in execution and outcome. As a result, the DAO
                    will have what we are calling “Proposal Guidance Tooling”, which is a set of
                    documents and tools that will allow for fast and efficient proposal submission
                    and management.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    A Governance Team will also be a critically important part of the DAO, providing
                    leadership and mentorship on the drafting and execution of proposals.
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Small grants, expenses, retroactive and emergency proposals</Trans>
                </p>
                <p>
                  <Trans>
                    For grants that require small financial support (0.1 to 5 ETH), there is a
                    straightforward process that does not require the full DAO proposal process,
                    unless the grants committee believes that a public vote makes more sense given
                    the specific requirements of the proposal. This ensures that there is no waiting
                    for the whole Vrbs DAO to vote on proposals that contribute to the success or
                    long term viability of the DAO. A dedicated Grants Committee can approve these
                    requests for funding with 3 out of 5 signatures.
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Proposals</Trans>
                </p>
                <p>
                  <Trans>
                    Proposals are an important way for y00t Nouns and Vrbs to contribute to Vrbs DAO
                    and its mission. Proposals can range from different topics, including proposals
                    around governance, marketing, philanthropic initiatives, DAO development, etc.
                    Proposals have some requirements and a process to follow before they can be
                    approved or rejected by the Vrbs community.
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Requirements for Proposals</Trans>
                </p>
                <ul>
                  <li>
                    Only Vrbs or y00t Nouns that are co-authors with Vrbs can submit proposals.
                    y00ts need to have a Vrb sponsor (holder who holds a Vrb NFT).
                  </li>
                  <li>
                    Proposals need to have a clear and concise format that explains the project, its
                    goals, its budget, its timeline, and its success metrics.
                  </li>
                  <li>
                    Proposals will be posted on Discourse in the Vrbs forum, using the Proposal
                    category. They will be token gated, meaning only Vrbs holders can access them.
                  </li>
                  <li>
                    Proposals need to be either requesting more than 5 ETH in funding or proposing
                    fundamental changes in governance or other core elements in the DAO.
                  </li>
                </ul>
                <p className={classes.subtitle}>
                  <Trans>Process for Proposals</Trans>
                </p>
                <ul>
                  <li>
                    <Trans>
                      Proposals start as drafts on Discourse, where they can receive feedback and
                      suggestions from the Vrbs community. The proposers can refine their proposals
                      based on the input they receive.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Proposals then move to on-chain voting, where they are submitted to the Vrbs
                      DAO smart contract. They need to undergo a 7-day process that consists of two
                      phases: pending and active.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Pending phase: This is a 2-day window where the proposal is public but not
                      votable. This is an opportunity for more discussion and debate around the
                      proposal.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Active phase: This is a 3-day window where the proposal is open for voting by
                      Vrbs holders. The proposal will either succeed or fail based on the quorum and
                      majority thresholds set by the DAO.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      If the proposal succeeds, it will be executed by the proposers or the DAO,
                      depending on the nature of the proposal. If the proposal fails, it will be
                      archived and can be resubmitted later with modifications.
                    </Trans>
                  </li>
                  <li>
                    <Trans>The final 2 days are used to settle the proposal.</Trans>
                  </li>
                </ul>
                <p className={classes.subtitle}>
                  <Trans>Exceptions for Proposals</Trans>
                </p>
                <ul>
                  <li>
                    <Trans>
                      Some proposals may not fit the requirements or the process described above.
                      For example, small grants (between 0 and 5 ETH), emergency or retroactive
                      funding, or urgent matters that need immediate attention.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      For these cases, there is a Vrbs Grants Committee (GC) that controls a Safe
                      wallet with funds allocated by the DAO. The GCE consists of 5 Vrbs members who
                      are elected by the DAO and who can approve or reject grants requests with a 3
                      out of 5 majority.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Grants requests are submitted via a form and posted on the forum as well. The
                      GC reviews and discusses them and may ask for clarifications or changes from
                      the applicants. The GC votes and notifies the applicants of their decision. If
                      approved, the GC transfers the funds from the Safe to the applicants.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      In addition, the DAO Architects have veto rights with 3 out of 5 signatures.
                      They can veto any proposal that they consider to be malicious to Vrbs DAO, its
                      operations or community.
                    </Trans>
                  </li>
                </ul>
                <p>
                  <Trans>
                    The purpose of proposals and grants is to foster innovation, collaboration, and
                    growth within the Vrbs DAO and its ecosystem. They should align with the vision
                    and values of the Vrbs DAO and benefit its members and stakeholders.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Vrbs vs y00t nouns</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The Vrbs DAO’s virtuous cycle describes the cycle by which the incentivizing of
                    doing good leads to a greater collective good (which is compounded) through a
                    constant cycle of improvement.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    We accomplish this by taking Nouns original operating principles and elevating
                    them in a sort of Nouns 2.0 manner, which will proliferate all things related to
                    Vrbs, building from a solid foundation of experienced founders and a proven
                    model. The DAO exists for the proliferation of Vrbs and a net positive force in
                    the world.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    The purchasing of a Vrb NFT grants access to participate in the governance and
                    rewards of the DAO. This governance is responsible for a community treasury,
                    which is grown via a once-a-day auction model and contributions from previously
                    backed projects.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    As the treasury grows, so do the proposals for funding which will be made by the
                    members of the DAO. Aspiring to proliferate Vrb ideals in the next generation
                    tools, companies, events, and projects they build.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    These tools in turn help support the Ethereum/Solana/Polygon communities of
                    builders and the broader in real life (IRL) communities around them, promoting a
                    cycle of improvement that leads to viral growth.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Injecting the spirit of Vrbs into the Nouns ecosystem creates a powerful
                    identity and further strengthens the need for action in this current
                    environment.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    We operate under a model of rapid decentralization, meaning that this DAO
                    framework was developed by a small group of Vrb architects who laid the
                    foundation for the DAO. Once the foundation was developed, a larger group of
                    critically important entrepreneurs, investors, thinkers, and artists, known as
                    the builders (council) further developed the idiosyncratic parts of the DAO.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Which brings us to today. The Vrbs and y00t Noun members will begin to build
                    applications, rules, companies, games, art, and more within the framework
                    (thought to life by the Architects, and developed on by the builders).
                  </Trans>
                </p>
                <p>
                  <Trans>This is rapid decentralization.</Trans>
                </p>
                <p>
                  <Trans>
                    In short, as Vrbs become a cultural tour de force, their value will increase and
                    the treasury will grow. As the treasury grows, more ideas will be funded,
                    leading to more projects created and more visions realized. In this way, the
                    jovial characters boasting square-shaped glasses can be the catalyst of
                    real-world changes and good in the world.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Both y00t Nouns and Vrbs are co-equal but serve different and distinct roles in
                    the DAO.{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      It is up to each individual to decide what path they take:
                    </span>
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Owning a Vrb</Trans>
                </p>
                <ul>
                  <li>
                    <Trans>Voting: Voting rights over treasury allocations from the DAO.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Proposals: Proposal rights in the DAO, allowing one to get their idea, project
                      or company funded.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Multi-Chain: Each Vrb will have the ability to transpose their NFT to future
                      Vrbs DAOs.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Gamification: Each Vrb will have the ability to receive rewards from the
                      treasury via participation in the governance.
                    </Trans>
                  </li>
                  <li>
                    <Trans>
                      Art: Each Vrb is a 1/1 pixel character developed by the super talented
                      cross-chain and multidisciplinary artists @Pencilx and @Marculino. Future
                      artists will also contribute their talents to drawing additional Vrbs.
                    </Trans>
                  </li>
                </ul>
                <p className={classes.subtitle}>
                  <Trans>Owning a y00t Noun</Trans>
                </p>
                <ul>
                  <li>
                    <Trans>
                      Voting and Proposal rights via delegation post y00ts season II by the DeGods.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Access to VRBs community chats.</Trans>
                  </li>
                  <li>
                    <Trans>
                      Stacking y00t points, IRL y00t events, and access to the DeLabs Discord
                      server.
                    </Trans>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Artists</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    The Vrbs artwork pays homage to the OG Nouns on Ethereum and their pioneering
                    work in the formation of decentralized on-chain communities.
                  </Trans>
                </p>

                <p>
                  <Trans>
                    With that in mind, the Vrbs artwork has a different approach around on-chain
                    art, whereby instead of generating pixel art via randomly based Ethereum block
                    hashes, aka programmed code, the artwork are instead true 1/1 art characters,
                    whose development was led by two super talented blockchain-native artists
                    @Pencilx and @Marculino.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Art has the incredible super power of bringing people together and these
                    characters are meant to do exactly that.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Each Vrb takes on a whimsical life of its own, distinct by itself, yet part of a
                    broader diverse collection of characters that represent the diversity of the DAO
                    members. Each Vrb artistically carries a certain lean towards culture and
                    action, reflective of the DAO’s belief that cultivating a strong community can
                    in turn have a big and small impact in the world.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>The Team</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    'Vrbs' are the group of ten builders that initiated Vrbs. Here are the Vrbs:
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Pre Launch Structure: </Trans>
                </p>
                <p>
                  <Trans>
                    The DAO framework was developed by a small group of architects who laid the
                    foundational operating principles and vision for the DAO. Once the foundation
                    was developed, a larger group of critically important builders, known as the
                    Builders, have further scaled out critical operational parts of the DAO.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Architects: Developers of the vision and operational framework for the DAO.
                    Setters of culture and a value system for the community. They are also
                    responsible for developing the Vrbs Protocol, informing its development,
                    governance structure, and long term viability.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Builders: The larger group of critically important entrepreneurs, developers,
                    investors, thinkers, and artists who scaled out the operational capacity and
                    excellence of the DAO including governance, networks, socials, and art.
                  </Trans>
                </p>
                <p className={classes.subtitle}>
                  <Trans>Post Launch Structure:</Trans>
                </p>
                <p>
                  <Trans>
                    Post launch, the Vrbs and y00t Noun members will begin to build applications,
                    rules, companies, games, art, and more within the framework brought to life by
                    the architects and developed on by the builders.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Holders: After the launch of the DAO, there will be no delineation between
                    Architects, Builders, and Holders; everyone will have the same ability and
                    responsibility to build, vote, and participate in the growth of the DAO.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Meaning that each holder, regardless of early contribution, will only have one
                    vote per NFT and the right to submit proposals to the DAO.
                  </Trans>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7" className={classes.accordionItem}>
              <Accordion.Header className={classes.accordionHeader}>
                <Trans>Architects & Builder Rewards</Trans>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <Trans>
                    Vrb architects and builders will receive compensation in the form of Vrbs
                    distributed on Day 0, equivalent to 10% of the total supply of Vrbs on each
                    chain that the DAO launches on. Compensation is determined by proof of work put
                    in (e.g. how many hours were contributed to the DAO).
                  </Trans>
                </p>
                <p>
                  <Trans>
                    This allows the 15+ architects and builders to experience the same level of
                    dilution as every other holder, (which was one of the core pieces of advice
                    received from the ETH nounders).
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Lastly, this initial distribution will help limit or practically eliminate the
                    need to utilize the more centralized veto power of the DAO by allowing for a
                    dispersion of votes early on, that will help steward the DAO governance in its
                    infancy until critical mass consensus is reached.
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
