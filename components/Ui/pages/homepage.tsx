import React, { CSSProperties, useLayoutEffect} from 'react';
import { UseCases } from '@teambit/community.sections.use-cases';
import { CompleteSuite } from '@teambit/community.bit-cloud.complete-suite';
import { RippleCi } from '@teambit/community.bit-cloud.ripple-ci';
import { LogoShowcase } from '@teambit/community.ui.logo-showcase';
import { Closer } from '@teambit/community.sections.closer';
import { SectionCardGrid } from '@teambit/community.sections.section-card-grid';
import { Heading, Elements } from '@teambit/community.ui.heading';
import { SectionCard } from '@teambit/design.content.section-card';
import { Section } from '@teambit/design.sections.section';
import { AgendaFold } from '@teambit/design.sections.agenda-fold';
import { CaptionTitle } from '@teambit/design.content.caption-title';
import { ComponentDevLifecycle } from '@teambit/community.content.component-dev-lifecycle';
import {
  ComponentGraph,
  importGraphMock,
  laneGraphMock,
  activeLaneNodes,
  exportGraphMock,
  vueGraphMock,
  vueActiveNodes,
  activeNodes,
  Edge,
  ComponentGraphProps,
} from '@teambit/design.visuals.component-graph';
import classNames from 'classnames';
import { MeetBitComponent } from '@teambit/community.introduction.meet-bit-component';
import { useThemePicker } from '@teambit/community.themes.theme-switcher';
import { Hero } from '@teambit/community.ui.hero';
// import { clientLogos } from '@teambit/community.entity.images';
import { ComponentDistributionSection } from '@teambit/community.ui.sections.component-distribution';
import { componentsMock } from '@teambit/community.entity.compnent-distribution-graph';
import { mockBubbleGraph } from '@teambit/community.entity.graph.bubble-graph';
import { useXarrow } from 'react-xarrows';
import { excludeHighlighterAtt } from '@teambit/react.ui.component-highlighter';
import { Page } from '@teambit/base-react.pages.page';
import {
  NotePad,
  CliCommand,
  Pass,
  Import,
} from '@teambit/design.content.note-pad';
import { CopyBox } from '@teambit/documenter.ui.copy-box';
import { EnvGraph, TempaleGraph } from './env-graph';
import { StaticBubbleGrid } from './bubble-grid';
import {
  BulletSectionCard,
  updateContent,
  impactfulContributionContent,
  composableDevelopmentEnvironmentContent,
  externdingBit,
} from './bullet-section-card';
import { UseBoxMenu } from './use-box';
import screenshot from './component-graph.jpg';
import styles from './homepage.module.scss';

export type HomepageProps = {} & React.HTMLAttributes<HTMLDivElement>;

function HomepageComponentGraph({ className, ...rest }: ComponentGraphProps) {
  return (
    <ComponentGraph {...rest} className={classNames(styles.graph, className)} />
  );
}

const pageDescription =
  'Bit is build system for development of composable software.';

const distributionComponents = componentsMock();


// const composableUseCase = [
//   // <span className={styles.highlightText}>composable software</span>,
//   'micro services',
//   'micro frontends',
//   'component libraries',
//   'design systems',
//   'reusable utilities',
//   'composed apps',
//   'platforms',
//   // 'a monorepo',
//   // 'a multi-repo',
//   'a pluggable architecture',
// ];

export function Homepage({ ...rest }: HomepageProps) {
  const bubbleGraph = mockBubbleGraph();
  // const [useCase, setUseCase] = useState(composableUseCase[0]);
  const themePicker = useThemePicker();
  const currentTheme = themePicker?.current?.themeName;

  // const sectionBackground = undefined;
  const sectionBackground =
    currentTheme === 'light'
      ? '#fff'
      : 'linear-gradient(183deg, #060414 3%, #0E1023 13%, #060414 97%)';
  // const sequence = [
  //   { content: 'modifying...', bubbleType: 'generic' },
  //   { content: '$ bit tag ui/heading', bubbleType: 'terminal' },
  // ];
  const updateXarrow = useXarrow();

  // const next = () => {
  //   const currentIndex = composableUseCase.indexOf(useCase);
  //   const nextItem = currentIndex === -1 ? 0 : currentIndex + 1;
  //   const nextUseCase = composableUseCase[nextItem];
  //   if (!nextUseCase) {
  //     setUseCase(composableUseCase[0]);
  //     return;
  //   }
  //   setUseCase(nextUseCase);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(next, 3000);
  //   return () => clearInterval(intervalId);
  // }, [next]);

  useLayoutEffect(() => {
    updateXarrow();
  }, []);

  return (
    <Page
      title="Bit. Composable software."
      description={pageDescription}
      className={styles.homepage}
      style={
        {
          '--homepage-content-background': sectionBackground,
        } as CSSProperties
      }
      // style={{ backgroundImage: `url(${background})` }}
      {...rest}
    >
      {/* <div className={styles.cloudMeta} onClick={() => {
        window.location.href = 'https://bit.cloud';
      }}>
        <Logo />
        <div className={styles.bitCloud}>
          bit.cloud
          <Icon className={styles.arrow} of='right-arrow' />
        </div>
        <span className={styles.cloudDescription}>
          A development platform for modern product teams
        </span>
        <img src={cloud} className={styles.cloudImg} />
      </div> */}
      <section
        className={classNames(
          styles.heroSection,
          currentTheme === 'light' && styles.lightHeroBackground
        )}
      >
        <div className={styles.grid}>
          <Hero
            bubbles={bubbleGraph}
            {...excludeHighlighterAtt}
            title={
              <div className={classNames(styles.bubble, styles.mainTitle)}>
                Software. <span className={styles.titleMain}>Composed.</span>
                {/* The dawn of decentralized <span className={styles.title}>software</span> */}
                {/* The dawn of decentralized software */}
                {/* <span></span> */}
              </div>
            }
            // teaser={<>Bit is the simplest way to build <span className={styles.highlightTextTitle}>composable software</span>. Build <span className={styles.highlightText}>{useCase}</span> at lightning speed.</>}
            teaser={<>Bit is the simplest way to build <span className={styles.highlightText}>composable software</span>. Build and reuse components at lightning speed.</>}
            // teaser="A next-generation build system for composable software."
          />
        </div>
      </section>
      <div style={{ background: sectionBackground }}>
        <LogoShowcase
          className={styles.imgStrip}
          title="Loved by developers from the world's best teams"
        />
        <ComponentDistributionSection
          title="From monolithic to composable software"
          components={distributionComponents}
        >
          <section>
            <div className={styles.meetBit}>
              {/* <div className={styles.meetComponent}>
            MEET THE <span className={styles.bitComponent}>BIT COMPONENT</span>
          </div> */}
              <CaptionTitle className={styles.meetComponent}>
                MEET THE <span>BIT COMPONENT</span>
              </CaptionTitle>
              <MeetBitComponent />
            </div>
            {/* </div> */}
          </section>
        </ComponentDistributionSection>
        {/* <FeaturesSection
            features={features}
            title="Build better software with components"
          /> */}
        {/* <UseCasesSection
            useCases={useCases}
            title="Make hard things simple"
            href="/docs/quick-start"
            linkText="See more use cases"
          /> */}
        {/* </div> */}

        <div>
          {/* <AgendaFold>Dev. Build. Collaborate.</AgendaFold> */}
          <UseCases className={styles.useCases} />
          {/* <Section
          title="Build in components"
          caption="dev"
          description="Use everywhere. Compose anything."
          className={styles.devSection}
        >
          <BuildInComponents />
        </Section> */}

          <Section
            caption="dev"
            title="Build components. Anywhere."
            // caption="distribute"
            description="Bit fits anywhere needed. Use it to start building components in your existing projects or for creating new composable projects."
          >
            <SectionCardGrid>
              <SectionCard
                title="Create new components "
                description="using pre-built or custom templates for any type of component."
              >
                <div className={styles.overflowingNotePad}>
                  <NotePad
                    withBackground
                    lines={[
                      <CliCommand
                        content="bit create react ui/button"
                        workspaceName="$"
                      />,
                      <Pass>1 component(s) were created</Pass>,
                      undefined,
                      'teambit.design/ui/button',
                      '    location: design/ui/button',
                      '    env:      teambit.react/react (set by template)',
                      '    package:  @teambit/design.ui.button',
                      undefined,
                      undefined,
                      undefined,
                    ]}
                  />
                </div>
              </SectionCard>
              <SectionCard
                title="Build components "
                description="of different types, using a unified dev experience."
              >
                <ComponentDevLifecycle
                  className={styles.componentDevLifecycle}
                />
              </SectionCard>
              <SectionCard
                title="Release component "
                description="changes and keep everyone up to date."
              >
                <NotePad
                  showLineNumbers={false}
                  showOverflowEffect
                  lines={[
                    <CliCommand
                      isTypeWriter
                      content="bit export"
                      workspaceName="$"
                    />,
                  ]}
                />
                <HomepageComponentGraph
                  rows={exportGraphMock} /* activeNodes={activeNodes} */
                />
              </SectionCard>
              <SectionCard
                title="Import components "
                description="to fork or change existing components."
              >
                <NotePad
                  showLineNumbers={false}
                  showOverflowEffect
                  lines={[
                    <CliCommand
                      content="bit import teambit.design/ui/cli-snippet"
                      workspaceName="$"
                    />,
                    undefined,
                    undefined,
                    undefined,
                  ]}
                />
                <HomepageComponentGraph
                  idPrefix="import"
                  rows={importGraphMock}
                  activeNodes={activeNodes}
                />
              </SectionCard>

            </SectionCardGrid>
          </Section>

          <RippleCi />

          <Section
            title={
              <>
                Dependencies.
                <br />
                Made simple.
              </>
            }
            // caption="distribute"
            description="Use dependencies. Stay decoupled. Seamless experience."
            className={styles.depMadeSimple}
          >
            <SectionCardGrid>
              <SectionCard
                title="Descriptive module names. "
                description="Use components through descriptive package names. No aliases required."
                className={classNames(styles.leftRight, styles.simpleImport)}
              >
                <NotePad
                  showLineNumbers={false}
                  showOverflowEffect
                  lines={[
                    <Import
                      what="Page"
                      from="@teambit/base-react.pages.page"
                    />,
                    <Import
                      what="SectionGrid"
                      from="@teambit/design.sections.section"
                    />,
                    <Import
                      what="Section"
                      from="@teambit/design.content.section-card"
                    />,
                    <Import
                      what="AgendaFold"
                      from="@teambit/design.sections.agenda-fold"
                    />,
                    <Import
                      what="CaptionTitle"
                      from="@teambit/design.content.caption-title"
                    />,
                    <Import
                      what="Closer"
                      from="@teambit/community.sections.closer"
                    />,
                  ]}
                />
              </SectionCard>
              <SectionCard
                className={styles.leftRight}
                title="Automatic dependency detection. "
                description="Say goodbye to cumbersome configuration files."
              >
                <ComponentGraph
                  className={styles.autoDepsGraph}
                  idPrefix="moduleNames"
                  Edge={(props) => {
                    return <Edge {...props} />;
                  }}
                  rows={[
                    [
                      {
                        id: 'teambit.community/ui/header@1.1.0',
                        icon: 'https://static.bit.dev/extensions-icons/react.svg',
                        dependencies: ['importLineAnchor'],
                      },
                      {
                        id: 'teambit.community/pages/homepage@1.1.0',
                        icon: 'https://static.bit.dev/extensions-icons/react.svg',
                        dependencies: ['importLineAnchor'],
                      },
                      {
                        id: 'teambit.community/constants/links@0.0.6',
                        icon: 'https://static.bit.dev/extensions-icons/node.svg',
                        dependencies: ['importLineAnchor'],
                      },
                    ],
                  ]}
                  activeNodes={activeNodes}
                >
                  <NotePad
                    className={styles.autoDepsNotePad}
                    showLineNumbers={false}
                    showOverflowEffect
                    lines={[
                      <div
                        style={{
                          margin: '40px auto',
                          zIndex: 102,
                          position: 'relative',
                          textAlign: 'center',
                        }}
                      >
                        Resolving to dependency type and version
                      </div>,
                      <div
                        id="moduleNames-importLineAnchor"
                        style={{ margin: '0 auto' }}
                      />,
                      <Import
                        what="Homepage"
                        from="@teambit/community.pages.homepage"
                      />,
                      <Import
                        what="links"
                        from="@teambit/community.constants.links"
                      />,
                      <Import
                        what="Header"
                        from="@teambit/community.ui.header"
                      />,
                    ]}
                  />
                </ComponentGraph>
              </SectionCard>
              <BulletSectionCard
                title="Update without breaking a thing. "
                description="Bit provides fluent control over your dependencies and dependents. At any depth."
                bullets={updateContent}
                className={classNames(
                  styles.leftRight,
                  styles.bullets,
                  styles.updateSection
                )}
              >
                <HomepageComponentGraph
                  idPrefix="export"
                  rows={vueGraphMock}
                  className={styles.vueGraph}
                  activeNodes={vueActiveNodes}
                />
              </BulletSectionCard>
            </SectionCardGrid>
          </Section>

          <Section
            caption="build"
            title={<>Your composable development environment.</>}
            // caption="distribute"
            description="Build and reuse your development environments and keep evolving your dev experience."
          >
            <SectionCardGrid className={styles.buildGraphSection}>
              <BulletSectionCard
                bullets={composableDevelopmentEnvironmentContent[0]}
                className={styles.envSection}
              >
                <EnvGraph />
              </BulletSectionCard>
              <BulletSectionCard
                bullets={composableDevelopmentEnvironmentContent[1]}
                className={classNames(styles.inverted, styles.envSection)}
              >
                <TempaleGraph />
              </BulletSectionCard>
            </SectionCardGrid>
          </Section>

          <Section
            caption="collaborate"
            title={<>Share. Use. Contribute.</>}
            // caption="distribute"
            // description="Use dependencies. Stay decoupled. Seamless experience."
          >
            <SectionCardGrid>
              <SectionCard
                title="Every component is an asset "
                description="with auto-generated docs and component previews."
                className={styles.screenshot}
              >
                <img src={screenshot} alt="Component page" />
              </SectionCard>
              <SectionCard
                className={styles.useBoxSection}
                title="Use components created by others "
                description="and consume them in any way you like."
              >
                <UseBoxMenu />
              </SectionCard>
              <BulletSectionCard
                title="Impactful contribution. Make simple changes."
                description=" Propose and change components to introduce new features, in collaboration with others."
                bullets={impactfulContributionContent}
                className={styles.impactfulSectionCard}
              >
                <div>
                  <NotePad
                    showLineNumbers={false}
                    showOverflowEffect
                    lines={[
                      <CliCommand
                        isTypeWriter
                        content="bit lane merge teambit.community/new-homepage"
                        workspaceName="$"
                      />,
                    ]}
                  />
                  <HomepageComponentGraph
                    displayActiveNodeStyles={false}
                    idPrefix="lane"
                    rows={laneGraphMock}
                    activeNodes={activeLaneNodes}
                  />
                </div>
              </BulletSectionCard>
            </SectionCardGrid>
          </Section>

          <CompleteSuite />

          <Section
            caption="extend"
            title={<>Extend Bit to meet every need</>}
            // // caption="distribute"
            description="Bit is entirely composable, and fully extensible. That's because Bit is built with Bit! Compose Bit into any workflow or tech stack."
          >
            <SectionCardGrid>
              <BulletSectionCard
                className={styles.extendSection}
                // title="Extending Bit. "
                // description="Bit is entirely composable, and fully extensible. That's because Bit is built with Bit! Compose Bit into any workflow or tech stack."
                bullets={externdingBit}
              >
                <StaticBubbleGrid />
              </BulletSectionCard>
            </SectionCardGrid>
          </Section>
          {/* <Section
            title={
              <>
                Devs <img src={heart} /> Bit
              </>
            }
          >
            <div className={styles.tweeterSection}>
              {tweets.map((card, index) => (
                <TwitterCard key={index} {...card} />
              ))}
            </div>
          </Section> */}
        </div>
        {/* <WideColumn> */}
        {/* <Heading highlight size="h1">Distribute. Collaborate. Standardize</Heading> */}

        {/* <StickyMenu
          links={[
            {
              href: '#distribution',
              text: 'Workspace',
            },
            {
              href: '#collaboration',
              text: 'Dependencies',
            },
            {
              href: '#collaboration',
              text: 'Collaboration',
            },
            {
              href: '#development',
              text: 'Development environments',
            },
            {
              href: '#extend',
              text: 'Extendability',
            },
          ]}
        /> */}

        <section>
          <Closer
            className={classNames(
              styles.closer,
              currentTheme === 'light' && styles.closerLight
            )}
            title={
              <Heading element={Elements.H2} className={styles.closerTitle}>
                Ready for a <b>fresh start?</b>
              </Heading>
            }
            secondaryCta={
              <CopyBox className={styles.copyBox}>
                npx @teambit/bvm install
              </CopyBox>
            }
          />
        </section>
        {/* <Distribution />
      <Collaboration />
      <Standardization />
      <Autonomy />
      <Extendability /> */}
      </div>
    </Page>
  );
}
